// General imports
import { useState, useEffect } from "react";
import RoleService from "../services/role.service";

// Chakra imports
import { Grid, GridItem, Flex, VStack, Tag } from "@chakra-ui/react";

// Custom components
import RoleListing from "../components/RoleListing";
import PreviewRoleListing from "../components/PreviewRoleListing";
import RoleListingSkeleton from "../components/skeletons/RoleListingSkeleton";
import PreviewRoleListingSkeleton from "../components/skeletons/PreviewRoleListingSkeleton";

export default function Main() {
  const calculatedMaxHeight = `calc(100vh - 80px - 4rem)`;
  const numberOfSkeletons = 3;
  const skeletons = [];

  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewLoading, setIsPreviewLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [roles, setRoles] = useState([]);
  const [previewRole, setPreviewRole] = useState({});

  useEffect(() => {
    fetchActiveRoles();
  }, []);

  const fetchActiveRoles = () => {
    RoleService.getActiveRoles().then(
      (response) => {
        const rolesData = response.data.data.roles;
        setRoles(rolesData);
        fetchRoleById(rolesData[0]?.role_id);
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 500);
      },
      (error) => {
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 500);
        setIsError(true);
        setRoles([]);
      }
    );
  };

  const fetchRoleById = (roleId) => {
    RoleService.getRoleById(roleId).then(
      (response) => {
        setPreviewRole(response.data.data);
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 500);
      },
      (error) => {
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 500);
        setIsError(true);
        setPreviewRole([]);
      }
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
    }, 500);
  };

  return (
    <Flex px={5} py={8} flexDirection={"column"} h={"full"}>
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
              ) : isError ? (
                <Tag colorScheme={"red"} py={2} px={3}>
                  Something went wrong...
                </Tag>
              ) : roles.length === 0 ? (
                <Tag colorScheme={"facebook"} py={2} px={3}>
                  No Roles found...
                </Tag>
              ) : (
                roles.map((role) => (
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
            ) : isError ? (
              <></>
            ) : roles.length === 0 ? (
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
