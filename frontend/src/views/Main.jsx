import { useState, useEffect } from 'react';

import { Grid, GridItem, Flex, VStack, Tag } from '@chakra-ui/react';

import RoleService from '../services/role.service';

import RoleListing from '../components/RoleListing';
import PreviewRoleListing from '../components/PreviewRoleListing';

import PreviewRoleListingSkeleton from '../components/skeletons/PreviewRoleListingSkeleton';

import { Box, Grid, GridItem, Flex, VStack } from "@chakra-ui/react";

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
    fetchRoles();
    fetchRoleById(1);
  }, []);

  const fetchRoles = () => {
    RoleService.getRoles().then(
      response => {
        setRoles(response.data.data.roles);
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 500);
      },
      error => {
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 500);
        setIsError(true);
        setRoles([]);
      }
    );
  };

  const fetchRoleById = roleId => {
    RoleService.getRoleById(roleId).then(
      response => {
        setPreviewRole(response.data.data);
        setTimeout(() => {
          setIsLoading(false);
          setIsPreviewLoading(false);
        }, 500);
      },
      error => {
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

  const handleRoleClick = roleId => {
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
            <VStack spacing={2.5} h={"full"}>
              <RoleListing/>
              <RoleListing/>
              <RoleListing/>
              <RoleListing/>
              <RoleListing/>
              <RoleListing/>
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
