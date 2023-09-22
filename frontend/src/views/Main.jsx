import {useState, useEffect} from "react";

import RoleListing from '../components/RoleListing';

import { Box, Grid, GridItem, Flex, VStack } from "@chakra-ui/react";

export default function Main() {
  const calculatedMaxHeight = `calc(100vh - 80px - 4rem)`;

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
            Listing
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}
