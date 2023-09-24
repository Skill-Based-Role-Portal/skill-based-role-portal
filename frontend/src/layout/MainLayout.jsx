import { Outlet, useOutlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { ChakraProvider, theme, Flex } from '@chakra-ui/react';

export default function MainLayout() {
  const { props } = useOutlet();

  return (
    <ChakraProvider theme={theme}>
      <Flex
        position="relative"
        bgColor="gray.100"
        color="gray.700"
        _dark={{ bgColor: 'gray.800', color: 'gray.300' }}
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
