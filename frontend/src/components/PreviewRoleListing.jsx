// General imports
import { useState, useRef } from "react";
import ApplicationService from "../services/application.service";

// Chakra imports
import {
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  Heading,
  Icon,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Button,
  VStack,
  HStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

// Custom components
import FullScreenRoleListing from "./FullScreenRoleListing";

// Helpers
import SimpleDate from "../helper/SimpleDate";

// Icons
import {
  BiBookmark,
  BiCheckCircle,
  BiBriefcase,
  BiMap,
  BiTimeFive,
  BiExpandAlt,
  BiXCircle,
} from "react-icons/bi";

export default function PreviewRoleListing(props) {
  const { previewRole, roleApplicationIds, staffId, staffSkills, refresh } =
    props;

  const modalSize = "6xl";
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const scrollBehavior = "inside";

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const applicationStatus = roleApplicationIds?.includes(previewRole.role_id);

  const createRoleListing = () => {
    const payload = {
      staff_id: staffId,
      role_id: previewRole.role_id,
      status: "Applied",
    };

    ApplicationService.createApplication(payload).then(
      (response) => {
        setIsLoading(false);
        refresh();
        toast({
          position: "top",
          status: "success",
          isClosable: true,
          title: "Role Applied",
          description: `${previewRole.name} Role has been applied successfully.`,
        });
      },
      (error) => {
        setIsLoading(false);
        toast({
          position: "top",
          status: "error",
          isClosable: true,
          title: "Error Occured",
          description: error.response.data.message,
        });
      }
    );
  };

  return (
    <Flex h={"full"}>
      <Card
        p={0.5}
        w={"full"}
        variant={"outline"}
        backgroundColor={"gray.50"}
        _dark={{ backgroundColor: "gray.800" }}
      >
        <CardBody
          color={"gray.700"}
          _dark={{ color: "gray.400" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Flex flexDirection={"column"} mb={10}>
            <Flex justifyContent={"space-between"} mb={4}>
              <Box>
                <Text
                  fontSize={"md"}
                  fontWeight={"medium"}
                  mb={1}
                  color={"gray.500"}
                >
                  {previewRole.department}
                </Text>
                <Heading fontSize={"2xl"} fontWeight={"semibold"} mb={1.5}>
                  {previewRole.name}
                </Heading>
                <Flex
                  alignItems={"center"}
                  color={"gray.600"}
                  _dark={{ color: "gray.500" }}
                >
                  <Icon as={BiMap} mr={1} w={5} h={5} />
                  <Text fontSize={"md"} fontWeight={"medium"}>
                    {previewRole.location}
                  </Text>
                </Flex>
              </Box>
              <Flex>
                <Button
                  colorScheme={"teal"}
                  size={"md"}
                  fontSize={"sm"}
                  mr={2.5}
                  isDisabled={applicationStatus}
                  isLoading={isLoading}
                  onClick={createRoleListing}
                >
                  {applicationStatus ? "Applied" : "Apply"}
                </Button>
                <IconButton
                  variant={"outline"}
                  aria-label="Bookmark role listing"
                  size={"md"}
                  icon={<BiBookmark />}
                  color={"gray.500"}
                  mr={2.5}
                />
                <IconButton
                  variant={"outline"}
                  aria-label="Preview role listing"
                  size={"md"}
                  icon={<BiExpandAlt />}
                  color={"gray.500"}
                  onClick={onOpen}
                  ref={finalRef}
                />
              </Flex>
            </Flex>
            <Flex mb={8} justifyContent={"space-between"} alignItems={"center"}>
              <Flex>
                <Tag
                  size={"md"}
                  variant={"subtle"}
                  px={3}
                  py={2}
                  colorScheme={"gray"}
                  backgroundColor={"gray.200"}
                  color={"gray.600"}
                  _dark={{ color: "gray.400", backgroundColor: "gray.700" }}
                  mr={2}
                >
                  <TagLeftIcon as={BiBriefcase} />
                  <TagLabel fontWeight={"semibold"} fontSize={"xs"}>
                    {previewRole.experience}
                  </TagLabel>
                </Tag>
                <Tag
                  size={"md"}
                  variant={"subtle"}
                  px={3}
                  py={2}
                  colorScheme={"gray"}
                  backgroundColor={"gray.200"}
                  color={"gray.600"}
                  _dark={{ color: "gray.400", backgroundColor: "gray.700" }}
                >
                  <TagLeftIcon as={BiTimeFive} />
                  <TagLabel fontWeight={"semibold"} fontSize={"xs"}>
                    {previewRole.employment_type}
                  </TagLabel>
                </Tag>
              </Flex>
              <Flex>
                <Flex alignItems={"center"}>
                  <Text fontSize={"sm"} fontWeight={"semibold"} mr={1.5}>
                    Hiring Manager:
                  </Text>
                  <Tag
                    fontSize={"xs"}
                    fontWeight={"medium"}
                    borderRadius={"full"}
                    variant={"subtle"}
                    colorScheme={"orange"}
                    px={2.5}
                    py={1.5}
                  >
                    {previewRole.hiring_manager}
                  </Tag>
                </Flex>
              </Flex>
            </Flex>
            <VStack spacing={5} alignItems={"start"}>
              <Flex flexDirection="column">
                <Heading fontSize={"sm"} fontWeight={"semibold"} mb={2}>
                  Requirements
                </Heading>
                <Text
                  fontSize={"sm"}
                  fontWeight={"regular"}
                  wordBreak={"break-word"}
                >
                  {previewRole.requirement}
                </Text>
              </Flex>
              <Flex flexDirection="column">
                <Heading fontSize={"sm"} fontWeight={"semibold"} mb={2}>
                  Description
                </Heading>
                <Text
                  fontSize={"sm"}
                  fontWeight={"regular"}
                  wordBreak={"break-word"}
                >
                  {previewRole.description}
                </Text>
              </Flex>
              <Flex flexDirection="column">
                <Flex alignItems={"center"} mb={2.5}>
                  <Heading fontSize={"sm"} fontWeight={"semibold"} me={1}>
                    Skills
                  </Heading>
                  {previewRole.skills && previewRole.skills.length !== 0 ? (
                    <Text fontSize={"xs"} fontWeight={"semibold"}>
                      {`(${
                        previewRole.skills.filter((skill) =>
                          staffSkills?.includes(skill)
                        ).length
                      } of ${previewRole.skills.length} match)`}
                    </Text>
                  ) : (
                    <></>
                  )}
                </Flex>
                <HStack flexWrap="wrap" w={"full"} spacing={2.5}>
                  {previewRole.skills && previewRole.skills.length !== 0 ? (
                    previewRole.skills.map((skill) => (
                      <Tag
                        key={skill}
                        size={"sm"}
                        variant={"subtle"}
                        px={2.5}
                        py={1.5}
                        colorScheme={"gray"}
                        backgroundColor={"gray.100"}
                        color={"gray.600"}
                        _dark={{
                          color: "gray.400",
                          backgroundColor: "gray.700",
                        }}
                      >
                        {staffSkills?.includes(skill) ? (
                          <TagLeftIcon
                            as={BiCheckCircle}
                            fontSize={"sm"}
                            color={"green.400"}
                            me={1}
                          />
                        ) : (
                          <TagLeftIcon
                            as={BiXCircle}
                            fontSize={"sm"}
                            color={"red.400"}
                            me={1}
                          />
                        )}
                        <TagLabel fontWeight={"semibold"}>{skill}</TagLabel>
                      </Tag>
                    ))
                  ) : (
                    <Text fontSize={"sm"} fontWeight={"regular"}>
                      No Skills Required
                    </Text>
                  )}
                </HStack>
              </Flex>
            </VStack>
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"end"}
          >
            <Flex>
              <Text fontSize={"xs"} fontWeight={"semibold"} mr={1}>
                Created On:
              </Text>
              <Text fontSize={"xs"} fontWeight={"medium"}>
                {SimpleDate(previewRole.created)}
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"xs"} fontWeight={"semibold"} mr={1}>
                Application Deadline:
              </Text>
              <Text fontSize={"xs"} fontWeight={"medium"}>
                {SimpleDate(previewRole.deadline)}
              </Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <FullScreenRoleListing
        previewRole={previewRole}
        isOpen={isOpen}
        onClose={onClose}
        initialRef={initialRef}
        finalRef={finalRef}
        scrollBehavior={scrollBehavior}
        modalSize={modalSize}
        staffId={staffId}
        applicationStatus={applicationStatus}
        staffSkills={staffSkills}
        refresh={refresh}
      />
    </Flex>
  );
}
