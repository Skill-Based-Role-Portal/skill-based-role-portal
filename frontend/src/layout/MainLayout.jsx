// General imports
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useOutlet, useNavigate } from "react-router-dom";

// Chakra imports
import { ChakraProvider, theme, Flex } from "@chakra-ui/react";

// Custom components
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const { props } = useOutlet();
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Flex
        position="relative"
        bgColor="gray.100"
        color="gray.700"
        _dark={{ bgColor: "gray.800", color: "gray.300" }}
        minH="100vh"
      >
        <Sidebar />
        <Flex width="full" flexDirection="column">
          <Navbar routeName={props?.children?.props?.children?.props?.name} />
          <Outlet />
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
