// General imports
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Chakra imports
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

// Custom components
import { logout } from "../slices/auth";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

// Icons
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Navbar(props) {
  const { routeName } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
    navigate(0);
    navigate("/login");
  }, [dispatch]);

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
        <Heading
          fontSize={"sm"}
          fontWeight={"semibold"}
          color={"gray.600"}
          _dark={{ color: "gray.400" }}
        >
          {routeName}
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
                name={`${currentUser?.first_name} ${currentUser?.last_name}`}
                mr={1}
              />
            }
            rightIcon={<ChevronDownIcon />}
            variant={"none"}
            fontSize={"sm"}
          >
            <Flex flexDirection={"column"} alignItems={"start"} mr={1}>
              <Text fontSize={"sm"} fontWeight={"semibold"} mb={0.5}>
                {currentUser?.first_name} {currentUser?.last_name}
              </Text>
              <Flex>
                <Text fontSize={"xs"} fontWeight={"medium"} color={"gray.500"}>
                  {currentUser?.access_rights}
                </Text>
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList fontSize={"sm"}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
