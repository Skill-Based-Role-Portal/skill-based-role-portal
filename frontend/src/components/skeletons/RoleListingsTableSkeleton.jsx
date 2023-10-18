// Chakra imports
import { Flex, Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoleListingsTableSkeleton() {
  return (
    <Flex w={"full"}>
      <Card
        w={"full"}
        variant={"outline"}
        backgroundColor={"gray.50"}
        _dark={{ backgroundColor: "gray.800" }}
      >
        <CardBody color={"gray.700"} _dark={{ color: "gray.400" }}>
          <Flex justifyContent={"space-between"} mt={1} mb={8}>
            <Skeleton h={"26px"} w={"160px"} />
            <Skeleton h={"35px"} w={"140px"} />
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"} mb={8}>
            <Flex>
              <Skeleton h={"20px"} w={"175px"} />
            </Flex>
            <Flex>
              <Skeleton h={"30px"} w={"200px"} />
            </Flex>
          </Flex>
          <Flex flexDirection={"column"} mb={2}>
            <Skeleton h={"20px"} w={"full"} mb={4} />
            <Skeleton h={"32px"} w={"full"} mb={5} />
            <Skeleton h={"32px"} w={"full"} mb={5} />
            <Skeleton h={"32px"} w={"full"} mb={5} />
            <Skeleton h={"32px"} w={"full"} mb={5} />
            <Skeleton h={"32px"} w={"full"} mb={5} />
            <Skeleton h={"32px"} w={"full"} mb={5} />
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Skeleton h={"22px"} w={"150px"} />
            <Flex>
              <Skeleton h={"25px"} w={"25px"} mr={2.5} />
              <Skeleton h={"25px"} w={"25px"} mr={2.5} />
              <Skeleton h={"25px"} w={"25px"} />
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
