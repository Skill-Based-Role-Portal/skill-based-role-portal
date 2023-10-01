// Chakra imports
import {
  VStack,
  Card,
  CardBody,
  SimpleGrid,
  Flex,
  Skeleton,
} from "@chakra-ui/react";

export default function CreateRoleListingSkeleton() {
  return (
    <Card
      variant={"outline"}
      backgroundColor={"gray.50"}
      _dark={{ backgroundColor: "gray.800" }}
    >
      <CardBody>
        <Skeleton h={"30px"} w={"180px"} mb={5} />

        <VStack spacing={5}>
          <SimpleGrid columns={2} w={"full"} spacing={5}>
            <Flex flexDirection={"column"}>
              <Skeleton h={"18px"} w={"100px"} mb={2.5} />
              <Skeleton h={"32px"} w={"full"} />
            </Flex>
            <Flex flexDirection={"column"}>
              <Skeleton h={"18px"} w={"100px"} mb={2.5} />
              <Skeleton h={"32px"} w={"full"} />
            </Flex>
          </SimpleGrid>
          <SimpleGrid columns={2} w={"full"} spacing={5}>
            <Flex flexDirection={"column"}>
              <Skeleton h={"18px"} w={"100px"} mb={2.5} />
              <Skeleton h={"32px"} w={"full"} />
            </Flex>
            <Flex flexDirection={"column"}>
              <Skeleton h={"18px"} w={"100px"} mb={2.5} />
              <Skeleton h={"32px"} w={"full"} />
            </Flex>
          </SimpleGrid>

          <Flex flexDirection={"column"} w={"full"}>
            <Skeleton h={"18px"} w={"100px"} mb={2.5} />
            <Skeleton h={"32px"} w={"full"} />
          </Flex>

          <Flex flexDirection={"column"} w={"full"}>
            <Skeleton h={"18px"} w={"100px"} mb={2.5} />
            <Skeleton h={"80px"} w={"full"} />
          </Flex>

          <Flex flexDirection={"column"} w={"full"}>
            <Skeleton h={"18px"} w={"100px"} mb={2.5} />
            <Skeleton h={"80px"} w={"full"} />
          </Flex>

          <Flex flexDirection={"column"} w={"full"}>
            <Skeleton h={"18px"} w={"100px"} mb={2.5} />
            <Skeleton h={"32px"} w={"full"} />
          </Flex>

          <Flex flexDirection={"column"} w={"full"}>
            <Skeleton h={"18px"} w={"100px"} mb={2.5} />
            <Skeleton h={"32px"} w={"full"} />
          </Flex>

          <Flex flexDirection={"column"} w={"full"}>
            <Skeleton h={"18px"} w={"100px"} mb={2.5} />
            <Skeleton h={"32px"} w={"full"} />
          </Flex>

          <Flex w={"full"} justifyContent={"end"} mt={6}>
            <Skeleton h={"32px"} w={"80px"} mr={2.5} />
            <Skeleton h={"32px"} w={"120px"} />
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
}
