// General imports
import { useRef } from "react";

// Chakra imports
import {
  Heading,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  VStack,
  SimpleGrid,
  Flex,
  Tag,
  HStack,
  TagLabel,
  TagLeftIcon,
  Text,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

// Icons
import { BiCheckCircle, BiX, BiXCircle } from "react-icons/bi";

export default function ViewApplicantModal(props) {
  const {
    staffId,
    firstName,
    lastName,
    location,
    department,
    email,
    skills,
    roleSkills,
  } = props;

  const modalSize = "6xl";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeModal = () => {
    onClose();
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const scrollBehavior = "inside";

  return (
    <>
      <Button
        size={"sm"}
        fontSize={"xs"}
        color={"gray.600"}
        _dark={{ color: "gray.400" }}
        onClick={onOpen}
        ref={finalRef}
      >
        View
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        scrollBehavior={scrollBehavior}
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={closeModal}
        size={modalSize}
      >
        <ModalOverlay />

        <ModalContent
          _dark={{ color: "gray.400", backgroundColor: "gray.800" }}
          color={"gray.700"}
          py={2}
        >
          <ModalHeader>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Heading
                fontSize={"2xl"}
                fontWeight={"semibold"}
                color={"gray.700"}
                _dark={{ color: "gray.400" }}
              >
                Applicant Information
              </Heading>
              <IconButton
                variant={"outline"}
                aria-label="Close Modal"
                size={"lg"}
                icon={<BiX />}
                fontSize={"1.5rem"}
                color={"gray.500"}
                onClick={closeModal}
              />
            </Flex>
          </ModalHeader>
          <ModalBody>
            <VStack
              spacing={5}
              color={"gray.600"}
              _dark={{ color: "gray.500" }}
            >
              <SimpleGrid columns={2} w={"full"} spacing={5}>
                <FormControl>
                  <FormLabel fontSize={"sm"}>First Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="First Name"
                    fontSize={"sm"}
                    focusBorderColor={"pink.300"}
                    variant="filled"
                    value={firstName}
                    isReadOnly={true}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Last Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    fontSize={"sm"}
                    focusBorderColor={"pink.300"}
                    variant="filled"
                    value={lastName}
                    isReadOnly={true}
                  />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={2} w={"full"} spacing={5}>
                <FormControl>
                  <FormLabel fontSize={"sm"}>Location</FormLabel>
                  <Input
                    type="text"
                    placeholder="Location"
                    fontSize={"sm"}
                    focusBorderColor={"pink.300"}
                    variant="filled"
                    value={location}
                    isReadOnly={true}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Department</FormLabel>
                  <Input
                    type="text"
                    placeholder="Department"
                    fontSize={"sm"}
                    focusBorderColor={"pink.300"}
                    variant="filled"
                    value={department}
                    isReadOnly={true}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize={"sm"}>Email Address</FormLabel>
                <Input
                  type="text"
                  placeholder="Email Address"
                  fontSize={"sm"}
                  focusBorderColor={"pink.300"}
                  variant="filled"
                  value={email}
                  isReadOnly={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"sm"}>
                  <Flex alignItems={"center"}>
                    <Text me={1}>Applicant Skills</Text>
                    {roleSkills && roleSkills.length !== 0 ? (
                      <Text fontSize={"xs"} fontWeight={"semibold"}>
                        {`(${
                          roleSkills.filter((skill) => skills?.includes(skill))
                            .length
                        } of ${roleSkills.length} match)`}
                      </Text>
                    ) : (
                      <></>
                    )}
                  </Flex>
                </FormLabel>
                <HStack flexWrap="wrap" w={"full"} spacing={2}>
                  {skills && skills.length !== 0 ? (
                    skills.sort().map((skill) => (
                      <Tag
                        key={skill}
                        size="md"
                        fontSize={"xs"}
                        variant="subtle"
                        colorScheme="gray"
                        backgroundColor={"gray.100"}
                        color={"gray.600"}
                        _dark={{
                          color: "gray.400",
                          backgroundColor: "gray.700",
                        }}
                        py={1.5}
                        px={2.5}
                      >
                        {roleSkills?.includes(skill) ? (
                          <TagLeftIcon
                            as={BiCheckCircle}
                            fontSize={"sm"}
                            color={"green.400"}
                            me={1.5}
                          />
                        ) : (
                          <></>
                        )}
                        <TagLabel _dark={{ color: "gray.500" }}>
                          {skill}
                        </TagLabel>
                      </Tag>
                    ))
                  ) : (
                    <Text fontSize={"sm"} fontWeight={"regular"}>
                      No Skills
                    </Text>
                  )}
                </HStack>
              </FormControl>

              {roleSkills &&
                roleSkills.length !== 0 &&
                roleSkills.filter((skill) => !skills?.includes(skill))
                  .length && (
                  <FormControl>
                    <FormLabel fontSize={"sm"}>
                      <Flex alignItems={"center"}>
                        <Text me={1}>Applicant Skills Missing</Text>
                        {roleSkills && roleSkills.length !== 0 ? (
                          <Text fontSize={"xs"} fontWeight={"semibold"}>
                            {`(${
                              roleSkills.filter(
                                (skill) => !skills?.includes(skill)
                              ).length
                            } of ${roleSkills.length} missing)`}
                          </Text>
                        ) : (
                          <></>
                        )}
                      </Flex>
                    </FormLabel>
                    <HStack flexWrap="wrap" w={"full"} spacing={2}>
                      {roleSkills && roleSkills.length !== 0 ? (
                        roleSkills
                          ?.filter((skill) => !skills?.includes(skill))
                          .sort()
                          .map((skill) => (
                            <Tag
                              key={skill}
                              size="md"
                              fontSize={"xs"}
                              variant="subtle"
                              colorScheme="gray"
                              backgroundColor={"gray.100"}
                              color={"gray.600"}
                              _dark={{
                                color: "gray.400",
                                backgroundColor: "gray.700",
                              }}
                              py={1.5}
                              px={2.5}
                            >
                              {roleSkills?.includes(skill) ? (
                                <TagLeftIcon
                                  as={BiXCircle}
                                  fontSize={"sm"}
                                  color={"red.400"}
                                  me={1.5}
                                />
                              ) : (
                                <></>
                              )}
                              <TagLabel _dark={{ color: "gray.500" }}>
                                {skill}
                              </TagLabel>
                            </Tag>
                          ))
                      ) : (
                        <Text fontSize={"sm"} fontWeight={"regular"}>
                          No Skills
                        </Text>
                      )}
                    </HStack>
                  </FormControl>
                )}
            </VStack>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
