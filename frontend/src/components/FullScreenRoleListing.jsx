// General imports
import SimpleDate from "../helper/SimpleDate";

// Chakra imports
import {
  Box,
  Flex,
  Text,
  Heading,
  Icon,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Button,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";

// Icons
import {
  BiBookmark,
  BiBriefcase,
  BiMap,
  BiTimeFive,
  BiX,
} from "react-icons/bi";

export default function PreviewRoleListing(props) {
  const {
    previewRole,
    isOpen,
    onClose,
    initialRef,
    finalRef,
    scrollBehavior,
    modalSize,
  } = props;

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      scrollBehavior={scrollBehavior}
      closeOnOverlayClick={true}
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent
        _dark={{ color: "gray.400", backgroundColor: "gray.800" }}
        color={"gray.700"}
        py={2}
      >
        <ModalHeader mb={2.5}>
          <Flex justifyContent={"space-between"} mb={4}>
            <Box>
              <Text
                fontSize={"lg"}
                fontWeight={"medium"}
                mb={0.5}
                color={"gray.500"}
              >
                {previewRole.department}
              </Text>
              <Heading fontSize={"3xl"} fontWeight={"semibold"} mb={1}>
                {previewRole.name}
              </Heading>
              <Flex
                alignItems={"center"}
                color={"gray.600"}
                _dark={{ color: "gray.500" }}
              >
                <Icon as={BiMap} mr={1} w={5} h={5} />
                <Text fontSize={"lg"} fontWeight={"medium"}>
                  {previewRole.location}
                </Text>
              </Flex>
            </Box>
            <Flex>
              <Button
                colorScheme={"teal"}
                size={"lg"}
                fontSize={"md"}
                px={4}
                mr={2.5}
              >
                Apply
              </Button>
              <IconButton
                variant={"outline"}
                aria-label="Bookmark role listing"
                size={"lg"}
                icon={<BiBookmark />}
                color={"gray.500"}
                mr={2.5}
              />
              <IconButton
                variant={"outline"}
                aria-label="Bookmark role listing"
                size={"lg"}
                icon={<BiX />}
                fontSize={"1.5rem"}
                color={"gray.500"}
                onClick={onClose}
              />
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex>
              <Tag
                size={"md"}
                variant={"subtle"}
                px={3.5}
                py={2.5}
                colorScheme={"gray"}
                backgroundColor={"gray.200"}
                color={"gray.600"}
                _dark={{ color: "gray.400", backgroundColor: "gray.700" }}
                mr={2}
              >
                <TagLeftIcon as={BiBriefcase} />
                <TagLabel fontWeight={"semibold"} fontSize={"sm"}>
                  {previewRole.experience}
                </TagLabel>
              </Tag>
              <Tag
                size={"md"}
                variant={"subtle"}
                px={3.5}
                py={2.5}
                colorScheme={"gray"}
                backgroundColor={"gray.200"}
                color={"gray.600"}
                _dark={{ color: "gray.400", backgroundColor: "gray.700" }}
              >
                <TagLeftIcon as={BiTimeFive} />
                <TagLabel fontWeight={"semibold"} fontSize={"sm"}>
                  {previewRole.employment_type}
                </TagLabel>
              </Tag>
            </Flex>
            <Flex>
              <Flex alignItems={"center"}>
                <Text fontSize={"md"} fontWeight={"semibold"} mr={1.5}>
                  Hiring Manager:
                </Text>
                <Tag
                  fontSize={"sm"}
                  fontWeight={"medium"}
                  borderRadius={"full"}
                  variant={"subtle"}
                  colorScheme={"orange"}
                  px={3}
                  py={2}
                >
                  {previewRole.hiring_manager}
                </Tag>
              </Flex>
            </Flex>
          </Flex>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={6} alignItems={"start"}>
            <Flex flexDirection="column">
              <Heading fontSize={"md"} fontWeight={"semibold"} mb={2}>
                Requirements
              </Heading>
              <Text fontSize={"md"} fontWeight={"regular"}>
                {previewRole.requirement}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Heading fontSize={"md"} fontWeight={"semibold"} mb={2}>
                Description
              </Heading>
              <Text fontSize={"md"} fontWeight={"regular"}>
                {previewRole.description}
              </Text>
            </Flex>
            <Flex flexDirection="column">
              <Heading fontSize={"md"} fontWeight={"semibold"} mb={2.5}>
                Skills
              </Heading>
              <HStack spacing={2.5}>
                {previewRole.skills && previewRole.skills.length !== 0 ? (
                  previewRole.skills.map((skill) => (
                    <Tag
                      key={skill}
                      size={"md"}
                      variant={"subtle"}
                      px={3}
                      py={2}
                      colorScheme={"gray"}
                      backgroundColor={"gray.100"}
                      color={"gray.600"}
                      _dark={{
                        color: "gray.400",
                        backgroundColor: "gray.700",
                      }}
                    >
                      <TagLabel fontWeight={"semibold"}>{skill}</TagLabel>
                    </Tag>
                  ))
                ) : (
                  <Text fontSize={"md"} fontWeight={"regular"}>
                    No Skills Required
                  </Text>
                )}
              </HStack>
            </Flex>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"end"}
          >
            <Flex>
              <Text fontSize={"sm"} fontWeight={"semibold"} mr={1}>
                Created On:
              </Text>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                {SimpleDate(previewRole.created)}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"sm"} fontWeight={"semibold"} mr={1}>
                Application Deadline:
              </Text>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                {SimpleDate(previewRole.deadline)}
              </Text>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
