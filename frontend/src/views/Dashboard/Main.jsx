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
import FilterBar from "../../components/FilterBar";
import SortBar from "../../components/SortBar";
import RoleListing from "../../components/RoleListing";
import PreviewRoleListing from "../../components/PreviewRoleListing";
import RoleListingSkeleton from "../../components/skeletons/RoleListingSkeleton";
import PreviewRoleListingSkeleton from "../../components/skeletons/PreviewRoleListingSkeleton";

export default function Main() {
  const calculatedMaxHeight = `calc(100vh + 30vh)`;
  const numberOfSkeletons = 3;
  const skeletons = [];

  const [refresh, setRefresh] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [searchedRoles, setSearchedRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [resultRoles, setResultRoles] = useState([]);
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
      const newSearchedRoles = filteredRoles.filter((role) =>
        Object.values(role).some((field) =>
          String(field).toLowerCase().includes(value.toLowerCase())
        )
      );

      const combinedResults = applySort(newSearchedRoles, sortOption);

      setSearchedRoles(newSearchedRoles);
      setResultRoles(combinedResults);
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
    setResultRoles(sortedRoles);
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

  const handleFilterChange = (
    locations,
    departments,
    employmentTypes,
    experiences,
    skills,
    deadlineFrom,
    deadlineTo
  ) => {
    setIsLoading(true);
    setIsPreviewLoading(true);

    const filteredRoles = roles.filter((role) => {
      const deadlineDate = role.deadline && new Date(role.deadline);
      const formattedDeadlineFrom = deadlineFrom && new Date(deadlineFrom);
      const formattedDeadlineTo = deadlineTo && new Date(deadlineTo);

      const locationMatch =
        locations.length === 0 || locations.includes(role.location);
      const departmentMatch =
        departments.length === 0 || departments.includes(role.department);
      const employmentTypeMatch =
        employmentTypes.length === 0 ||
        employmentTypes.includes(role.employment_type);
      const experienceMatch =
        experiences.length === 0 || experiences.includes(role.experience);
      const skillsMatch =
        skills.length === 0 ||
        skills.every((skill) => role.skills.includes(skill));
      const deadlineMatch =
        (!formattedDeadlineFrom || deadlineDate >= formattedDeadlineFrom) &&
        (!formattedDeadlineTo || deadlineDate <= formattedDeadlineTo);

      return (
        locationMatch &&
        departmentMatch &&
        employmentTypeMatch &&
        experienceMatch &&
        skillsMatch &&
        deadlineMatch
      );
    });

    const sortedRoles = applySort(filteredRoles, sortOption);

    setSearchedRoles(sortedRoles);
    setFilteredRoles(sortedRoles);
    setResultRoles(sortedRoles);
    fetchRoleById(sortedRoles[0]?.role_id);

    setTimeout(() => {
      setIsLoading(false);
      setIsPreviewLoading(false);
    }, 600);
  };

  const fetchActiveRoles = () => {
    RoleService.getActiveRoles()
      .then(
        (response) => {
          const rolesData = response.data.data.roles;
          setRoles(rolesData);
          setSearchedRoles(rolesData);
          setFilteredRoles(rolesData);
          setResultRoles(rolesData);
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
          <GridItem colSpan={"10"}>
            <SearchBar onSearchChange={handleSearchChange} />
          </GridItem>
          <GridItem colSpan={"auto"}>
            <SortBar onSortChange={handleSortChange} />
          </GridItem>
          <GridItem colSpan={"auto"}>
            <FilterBar
              maxHeight={calculatedMaxHeight}
              onApplyFilter={handleFilterChange}
            />
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
            `Available Roles (${resultRoles.length})`
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
              ) : resultRoles.length === 0 ? (
                <Tag colorScheme={"facebook"} py={2} px={3}>
                  No Roles found...
                </Tag>
              ) : (
                resultRoles.map((role) => (
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
            ) : resultRoles.length === 0 ? (
              <></>
            ) : (
              <PreviewRoleListing
                previewRole={previewRole}
                roleApplicationIds={roleApplicationIds}
                staffId={currentUser?.staff_id}
                staffSkills={currentUser?.skills}
                refresh={refreshData}
              />
            )}
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}
