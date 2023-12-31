// General imports
import { Link as ReactRouterLink } from "react-router-dom";

// Chakra imports
import { Link, Icon, Flex, Text } from "@chakra-ui/react";

export default function NavbarLinks(props) {
  const { name, route, icon } = props;

  return (
    <Link
      as={ReactRouterLink}
      to={`/${route}`}
      fontSize={"xs"}
      fontWeight={"medium"}
      color={"gray.500"}
      _dark={{ color: "gray.400" }}
      _hover={{}}
    >
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Icon as={icon} mr={2.5} w={5} h={5} />
        <Text>{name}</Text>
      </Flex>
    </Link>
  );
}
