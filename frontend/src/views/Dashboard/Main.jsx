// General imports
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RoleService from "../../services/role.service";
import ApplicationService from "../../services/application.service";

// Chakra imports
import {
  Flex,
  Grid,
  GridItem,
  Heading,
  VStack,
  Tag,
  Skeleton,
} from "@chakra-ui/react";

// Custom components
import SearchBar from "../../components/SearchBar";
import SortBar from "../../components/SortBar";
import RoleListing from "../../components/RoleListing";
import PreviewRoleListing from "../../components/PreviewRoleListing";
import RoleListingSkeleton from "../../components/skeletons/RoleListingSkeleton";
import PreviewRoleListingSkeleton from "../../components/skeletons/PreviewRoleListingSkeleton";

export default function Main() {
  const calculatedMaxHeight = `calc(100vh - 80px - 4rem - 1.5rem)`;
  const numberOfSkeletons = 3;
  const skeletons = [];

  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [searchedRoles, setSearchedRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [previewRole, setPreviewRole] = useState({});
  const [sortOption, setSortOption] = useState("Default");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [roleApplications, setRoleApplications] = useState([]);
  const [roleApplicationIds, setRoleApplicationIds] = useState([]);

  const { user: currentUser } = useSelector((state) => state.auth);

  const refreshData = () => {
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    fetchActiveRoles();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchApplicationsByStaffId(currentUser?.staff_id);
    }
  }, [refresh]);

  const handleSearchChange = (value) => {
    setIsLoading(true);
    setIsPreviewLoading(true);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      const newSearchedRoles = roles.filter((role) =>
        Object.values(role).some((field) =>
          String(field).toLowerCase().includes(value.toLowerCase())
        )
      );

      const combinedResults = applySort(newSearchedRoles, sortOption);

      setSearchedRoles(newSearchedRoles);
      setFilteredRoles(combinedResults);
      fetchRoleById(combinedResults[0]?.role_id);

      setIsLoading(false);
      setIsPreviewLoading(false);
    }, 600);

    setSearchTimeout(newTimeout);
  };

  const handleSortChange = (value) => {
    setIsLoading(true);
    setIsPreviewLoading(true);

    const sortedRoles = applySort(searchedRoles, value);

    setSortOption(value);
    setFilteredRoles(sortedRoles);
    fetchRoleById(sortedRoles[0]?.role_id);

    setTimeout(() => {
      setIsLoading(false);
      setIsPreviewLoading(false);
    }, 600);
  };

  const applySort = (rolesToSort, sortOption) => {
    switch (sortOption) {
      case "Default":
        return [...rolesToSort];
      case "Recommended":
        return [...rolesToSort].sort((a, b) => a.name.localeCompare(b.name));
      case "Name (Ascending)":
        return [...rolesToSort].sort((a, b) => a.name.localeCompare(b.name));
      case "Name (Descending)":
        return [...rolesToSort].sort((a, b) => b.name.localeCompare(a.name));
      case "Created (Most Recent)":
        return [...rolesToSort].sort(
          (a, b) => new Date(b.created) - new Date(a.created)
        );
      case "Created (Oldest)":
        return [...rolesToSort].sort(
          (a, b) => new Date(a.created) - new Date(b.created)
        );
      case "Deadline (Most Recent)":
        return [...rolesToSort].sort(
          (a, b) => new Date(a.deadline) - new Date(b.deadline)
        );
      case "Deadline (Oldest)":
        return [...rolesToSort].sort(
          (a, b) => new Date(b.deadline) - new Date(a.deadline)
        );

      default:
        return [...rolesToSort];
    }
  };

  const fetchActiveRoles = () => {
    RoleService.getActiveRoles()
      .then(
        (response) => {
          const rolesData = response.data.data.roles;
          setRoles(rolesData);
          setSearchedRoles(rolesData);
          setFilteredRoles(rolesData);
          fetchRoleById(rolesData[0]?.role_id);
        },
        (error) => {
          setRoles([]);
        }
      )
      .finally(
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 600)
      );
  };

  const fetchRoleById = (roleId) => {
    RoleService.getRoleById(roleId)
      .then(
        (response) => {
          setPreviewRole(response.data.data);
        },
        (error) => {
          setPreviewRole({});
        }
      )
      .finally(
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 600)
      );
  };

  for (let i = 0; i < numberOfSkeletons; i++) {
    skeletons.push(<RoleListingSkeleton key={i} />);
  }

  const handleRoleClick = (roleId) => {
    setIsPreviewLoading(true);
    fetchRoleById(roleId);
    setTimeout(() => {
      setIsPreviewLoading(false);
    }, 600);
  };

  const fetchApplicationsByStaffId = (staffId) => {
    ApplicationService.getApplicationByStaffId(staffId).then(
      (response) => {
        const applicationsData = response.data.data.applications;
        const roleApplicationIds = applicationsData.map(
          (application) => application.role_id
        );
        setRoleApplications(applicationsData);
        setRoleApplicationIds(roleApplicationIds);
      },
      (error) => {
        setRoleApplications([]);
        setRoleApplicationIds([]);
      }
    );
  };

  return (
    <Flex px={5} py={6} flexDirection={"column"} h={"full"}>
      <Flex mb={3}>
        <Grid templateColumns="repeat(12, 1fr)" gap={3} w={"full"}>
          <GridItem colSpan={"11"}>
            <SearchBar onSearchChange={handleSearchChange} />
          </GridItem>
          <GridItem colSpan={"auto"}>
            <SortBar onSortChange={handleSortChange} />
          </GridItem>
        </Grid>
      </Flex>
      <Flex flexDirection={"column"} h={"full"}>
        <Heading
          py={2}
          px={3}
          mb={1}
          fontSize={"lg"}
          fontWeight={"semibold"}
          color={"gray.600"}
          _dark={{ color: "gray.400" }}
        >
          {isLoading ? (
            <Skeleton h={"22px"} w={"180px"} />
          ) : (
            `Available Roles (${filteredRoles.length})`
          )}
        </Heading>

        <Grid
          templateColumns={"repeat(12, 1fr)"}
          gap={4}
          h={"full"}
          maxHeight={calculatedMaxHeight}
        >
          <GridItem colSpan={{ base: 4 }} h={"full"} overflowY={"scroll"}>
            <VStack
              spacing={2.5}
              h={"full"}
              justifyContent={"start"}
              alignItems={"start"}
            >
              {isLoading ? (
                skeletons
              ) : filteredRoles.length === 0 ? (
                <Tag colorScheme={"facebook"} py={2} px={3}>
                  No Roles found...
                </Tag>
              ) : (
                filteredRoles.map((role) => (
                  <RoleListing
                    key={role.role_id}
                    role={role}
                    roleApplicationIds={roleApplicationIds}
                    clickedId={handleRoleClick}
                  />
                ))
              )}
            </VStack>
          </GridItem>
          <GridItem colSpan={{ base: 8 }}>
            {isLoading || isPreviewLoading ? (
              <PreviewRoleListingSkeleton />
            ) : filteredRoles.length === 0 ? (
              <></>
            ) : (
              <PreviewRoleListing
                previewRole={previewRole}
                roleApplicationIds={roleApplicationIds}
                staffId={currentUser?.staff_id}
                refresh={refreshData}
              />
            )}
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}
