// General imports
import { Link as ReactRouterLink } from "react-router-dom";

// Chakra imports
import { Flex, VStack, Link, Text, Image } from "@chakra-ui/react";

// Custom components
import Logo from "../assets/logo.svg";
import NavbarGroup from "./NavbarGroup";
import NavbarLink from "./NavbarLink";

// Icons
import { BiHomeAlt, BiTable, BiAddToQueue } from "react-icons/bi";

export default function Sidebar() {
  return (
    <Flex
      bgColor={"gray.50"}
      _dark={{ bgColor: "gray.700", borderColor: "gray.600" }}
      borderRight={"1.5px"}
      borderStyle={"solid"}
      borderColor={"gray.200"}
      minW={"250px"}
      flexDirection={"column"}
    >
      <Flex
        minH={"80px"}
        borderBottom={"1.5px"}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        _dark={{ borderColor: "gray.600" }}
        alignItems={"center"}
        px={7}
      >
        <Link
          as={ReactRouterLink}
          to={"/"}
          fontSize={"lg"}
          fontWeight={"bold"}
          _hover={{}}
        >
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Image src={Logo} alt="Hero" mr={2} />
            <Text>Role Portal</Text>
          </Flex>
        </Link>
      </Flex>
      <Flex flexDirection={"column"} h={"full"} py={5} px={7}>
        <VStack alignItems={"start"} spacing={8}>
          <NavbarGroup groupName={"Pages"}>
            <NavbarLink name={"Home"} route={""} icon={BiHomeAlt} />
          </NavbarGroup>

          <NavbarGroup groupName={"Role Listing"}>
            <NavbarLink
              name={"Role Listings"}
              route={"role-listings"}
              icon={BiTable}
            />

            {/* <NavbarLink
              name={"Create Role"}
              route={"create-role-listing"}
              icon={BiAddToQueue}
            /> */}
          </NavbarGroup>
        </VStack>
      </Flex>
    </Flex>
  );
}
