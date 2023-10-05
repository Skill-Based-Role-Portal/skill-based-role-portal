// General imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Custom components
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { ColorModeSwitcher } from "../../components/ColorModeSwitcher";
import HeroImage from "../../assets/hero.svg";

// Chakra imports
import {
  ChakraProvider,
  Box,
  Checkbox,
  Grid,
  theme,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  HStack,
  Heading,
  GridItem,
  Image,
  Show,
  Flex,
  Link,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";

// Icons
import { BiHide, BiShow, BiX } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }

    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email Address is required"),
    password: Yup.string().required("Password is required"),
  });

  const onClick = () => setError(false);

  const handleLogin = (formValue, actions) => {
    const { email, password } = formValue;
    setIsLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate(0);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(true);
      });
  };

  return (
    <ChakraProvider theme={theme}>
      <Grid
        templateColumns={"repeat(8, 1fr)"}
        position={"relative"}
        bgColor={"gray.50"}
        _dark={{ bgColor: "gray.800" }}
        minH={"100vh"}
      >
        {error ? (
          <Flex
            position={"absolute"}
            zIndex={2}
            w={"full"}
            h={"65px"}
            backgroundColor={"red.300"}
            justifyContent={"center"}
            alignItems={"center"}
            fontWeight={"medium"}
            color={"white"}
          >
            <Text>{message}</Text>
            <Button
              position={"absolute"}
              right={"2"}
              aria-label={"Close Alert"}
              variant={"unstyled"}
              size={"md"}
              onClick={onClick}
            >
              <Center>
                <BiX h={10} w={10} />
              </Center>
            </Button>
          </Flex>
        ) : null}
        <ColorModeSwitcher
          position={"absolute"}
          top={4}
          right={4}
          color={"gray.50"}
          _dark={{ color: "gray.50" }}
        />

        <GridItem
          colSpan={{ base: 8, lg: 4, xl: 3 }}
          alignItems="center"
          justifyItems="center"
          px={16}
          my="auto"
        >
          <Box mb={12}>
            <Heading
              size="sm"
              fontWeight="semibold"
              color="gray.700"
              _dark={{ color: "gray.300" }}
              mb={1.5}
            >
              Skill Based Role Portal
            </Heading>
            <Heading
              size="xl"
              fontWeight="semibold"
              color="gray.700"
              _dark={{ color: "gray.200" }}
            >
              Login to your account
            </Heading>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => handleLogin(values, actions)}
          >
            {({ errors, touched, isValid, dirty, resetForm }) => (
              <Form>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={errors.email && touched.email}
                      mb="5"
                    >
                      <FormLabel>Email Address</FormLabel>
                      <InputGroup>
                        <Input
                          variant={"filled"}
                          focusBorderColor={"pink.300"}
                          {...field}
                          type="email"
                          placeholder="Enter Email Address"
                          autoComplete="off"
                          fontSize={"sm"}
                        />
                        <InputRightElement>
                          <Button
                            variant={"unstyled"}
                            color={"gray.500"}
                            _dark={{ color: "gray.400" }}
                            cursor={"default"}
                            _focus={{
                              boxShadow: "none",
                            }}
                          >
                            <Center>
                              <MdAlternateEmail />
                            </Center>
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={errors.password && touched.password}
                      mb="5"
                    >
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          variant={"filled"}
                          focusBorderColor={"pink.300"}
                          {...field}
                          type={show ? "text" : "password"}
                          placeholder="Enter Password"
                          autoComplete="off"
                          fontSize={"sm"}
                        />
                        <InputRightElement>
                          <Button
                            variant={"unstyled"}
                            onClick={handleClick}
                            color={"gray.500"}
                            _dark={{ color: "gray.400" }}
                            _focus={{
                              boxShadow: "none",
                            }}
                          >
                            <Center>{show ? <BiHide /> : <BiShow />}</Center>
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Flex justifyContent={"space-between"} my={2}>
                  <Checkbox size="md" colorScheme="teal" variant="filled">
                    <Text
                      fontSize={"sm"}
                      color={"gray.500"}
                      _dark={{ color: "gray.400" }}
                    >
                      Remember me
                    </Text>
                  </Checkbox>
                  <Link
                    color="teal.500"
                    _dark={{ color: "teal.300" }}
                    href="#forgot-password"
                    fontSize={"sm"}
                  >
                    Forgot Password?
                  </Link>
                </Flex>

                <Button
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  w="full"
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </GridItem>
        <Show above="lg">
          <GridItem
            colSpan={{ base: 0, lg: 4, xl: 5 }}
            bgColor="teal.900"
            _dark={{ bgColor: "teal.700" }}
          >
            <Flex
              flexDirection="column"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Image src={HeroImage} alt="Hero" width="60%" mb={2} />
              <HStack
                color="gray.100"
                fontSize={{ base: "xl", xl: "2xl" }}
                fontWeight="semibold"
                spacing={8}
              >
                <Box>Discover</Box>
                <Box
                  minW="8px"
                  minH="8px"
                  bgColor="gray.100"
                  borderRadius="full"
                ></Box>
                <Box>Learn</Box>
                <Box
                  minW="8px"
                  minH="8px"
                  bgColor="gray.100"
                  borderRadius="full"
                ></Box>
                <Box>Grow</Box>
              </HStack>
            </Flex>
          </GridItem>
        </Show>
      </Grid>
    </ChakraProvider>
  );
}
