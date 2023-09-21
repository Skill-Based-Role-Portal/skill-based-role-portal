import { useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import {
  Flex,
  Text,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex
      bgColor={"gray.50"}
      _dark={{ bgColor: "gray.700", borderColor: "gray.600" }}
      borderBottom={"1.5px"}
      borderStyle={"solid"}
      borderColor={"gray.200"}
      alignItems={"center"}
      justifyContent={{ base: "space-between" }}
      minH={"80px"}
      px={8}
    >
      <Flex>
        <Heading fontSize={"md"} fontWeight={"semibold"}>
          Home
        </Heading>
      </Flex>
      <Flex>
        <ColorModeSwitcher
          mr={3}
          color={"gray.500"}
          _dark={{ color: "gray.400" }}
        />
        <Divider orientation={"vertical"} height={"40px"} />
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={
              <Avatar
                size={"sm"}
                name={"Peter Parker"}
                src={"https://bit.ly/kent-c-dodds"}
                mr={1}
              />
            }
            rightIcon={<BiChevronDown />}
            variant={"none"}
            fontSize={"sm"}
          >
            <Flex flexDirection={"column"} alignItems={"start"} mr={1}>
              <Text fontSize={"sm"} fontWeight={"semibold"} mb={0.5}>
                Peter Parker
              </Text>
              <Flex>
                <Text
                  fontSize={"xs"}
                  fontWeight={"medium"}
                  mr={0.5}
                  color={"gray.500"}
                >
                  Role:
                </Text>
                <Text fontSize={"xs"} fontWeight={"medium"} color={"gray.500"}>
                  Staff
                </Text>
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList fontSize={"sm"}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
