// General imports
import { useState, useEffect } from "react";
import RoleService from "../../services/role.service";

// Chakra imports
import { Grid, GridItem, Flex, VStack, Tag } from "@chakra-ui/react";

// Custom components
import SearchBar from "../../components/SearchBar"
import RoleListing from "../../components/RoleListing";
import PreviewRoleListing from "../../components/PreviewRoleListing";
import RoleListingSkeleton from "../../components/skeletons/RoleListingSkeleton";
import PreviewRoleListingSkeleton from "../../components/skeletons/PreviewRoleListingSkeleton";

export default function Main() {
  const calculatedMaxHeight = `calc(100vh - 80px - 4rem - 4rem)`;
  const numberOfSkeletons = 3;
  const skeletons = [];

  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [previewRole, setPreviewRole] = useState({});

  useEffect(() => {
    fetchActiveRoles();
  }, []);

  const handleSearchChange = (value) => {
    const newFilteredRoles = roles.filter((role) =>
      Object.values(role).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilteredRoles(newFilteredRoles);
    fetchRoleById(newFilteredRoles[0]?.role_id);
  };

  const fetchActiveRoles = () => {
    RoleService.getActiveRoles().then(
      (response) => {
        const rolesData = response.data.data.roles;
        setRoles(rolesData);
        setFilteredRoles(rolesData);
        fetchRoleById(rolesData[0]?.role_id);
      },
      (error) => {
        setRoles([]);
      }).finally(
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 600)
      )
  };

  const fetchRoleById = (roleId) => {
    RoleService.getRoleById(roleId).then(
      (response) => {
        setPreviewRole(response.data.data);
      },
      (error) => {
        setPreviewRole([]);
      }
    ).finally(
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

  return (
    <Flex px={5} py={8} flexDirection={"column"} h={"full"}>
      <Flex mb={4}>
        <SearchBar onSearchChange={handleSearchChange} />
      </Flex>
      <Flex flexDirection={"column"} h={"full"}>
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
              <PreviewRoleListing previewRole={previewRole} />
            )}
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}
