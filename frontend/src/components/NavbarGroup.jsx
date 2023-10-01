// Chakra imports
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

export default function NavbarGroup(props) {
  const { groupName, children } = props;

  return (
    <Box>
      <Text
        fontSize={"sm"}
        fontWeight={"medium"}
        color={"gray.400"}
        _dark={{ color: "gray.400" }}
      >
        {groupName}
      </Text>
      <Flex ms={2.5} mt={2.5} flexDirection={"column"}>
        <VStack alignItems={"start"} spacing={2.5}>
          {children}
        </VStack>
      </Flex>
    </Box>
  );
}
