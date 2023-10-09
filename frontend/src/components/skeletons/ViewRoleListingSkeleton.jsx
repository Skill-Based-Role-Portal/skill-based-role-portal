// Chakra imports
import {
  Box,
  Flex,
  Card,
  CardBody,
  VStack,
  HStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

export default function ViewRoleListingSkeleton() {
  return (
    <Flex h={"full"}>
      <Card
        p={2.5}
        w={"full"}
        variant={"outline"}
        backgroundColor={"gray.50"}
        _dark={{ backgroundColor: "gray.800" }}
      >
        <CardBody
          color={"gray.700"}
          _dark={{ color: "gray.400" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Flex flexDirection={"column"}>
            <Flex justifyContent={"space-between"} alignItems={"center"} mb={6}>
              <Flex>
                <Skeleton h={"28px"} w={"180px"} />
              </Flex>

              <Flex>
                <Skeleton h={"34px"} w={"120px"} />
              </Flex>
            </Flex>
            <Flex justifyContent={"space-between"} mb={4}>
              <Box>
                <Skeleton h={"22px"} w={"180px"} mb={2} />
                <Skeleton h={"28px"} w={"250px"} mb={2.5} />
                <Skeleton h={"20px"} w={"120px"} />
              </Box>
            </Flex>
            <Flex
              mb={10}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex>
                <Skeleton h={"24px"} w={"100px"} mr={2} />
                <Skeleton h={"24px"} w={"100px"} />
              </Flex>
              <Flex>
                <Skeleton h={"20px"} w={"175px"} />
              </Flex>
            </Flex>
            <VStack spacing={5} alignItems={"start"}>
              <Flex flexDirection="column" w="full">
                <Skeleton h={"18px"} w={"150px"} mb={2} />
                <SkeletonText
                  noOfLines={2}
                  spacing="2"
                  skeletonHeight="4"
                  w={"full"}
                />
              </Flex>
              <Flex flexDirection="column" w="full">
                <Skeleton h={"18px"} w={"150px"} mb={2} />
                <SkeletonText
                  noOfLines={2}
                  spacing="2"
                  skeletonHeight="4"
                  w={"full"}
                />
              </Flex>
              <Flex flexDirection="column">
                <Skeleton h={"18px"} w={"45px"} mb={2} />
                <HStack spacing={2.5}>
                  <Skeleton h={"20px"} w={"60px"} />
                  <Skeleton h={"20px"} w={"60px"} />
                  <Skeleton h={"20px"} w={"60px"} />
                </HStack>
              </Flex>
            </VStack>
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"end"}
          >
            <Flex mb={1.5}>
              <Skeleton h={"16px"} w={"150px"} />
            </Flex>
            <Flex>
              <Skeleton h={"16px"} w={"200px"} />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
