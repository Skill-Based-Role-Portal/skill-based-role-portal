// General imports
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoleService from "../../services/role.service";
import ApplicationService from "../../services/application.service";

// Chakra imports
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";

// Custom components
import DynamicTable from "../../components/DynamicTable";
import ViewRoleListingSkeleton from "../../components/skeletons/ViewRoleListingSkeleton";
import ViewApplicantModal from "./Components/ViewApplicantModal";

// Helpers
import SimpleDate from "../../helper/SimpleDate";

// Icons
import { BiBriefcase, BiChevronLeft, BiMap, BiTimeFive } from "react-icons/bi";

export default function RoleListing() {
  let { roleId } = useParams();
  const navigate = useNavigate();

  const applicantsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState({});
  const [roleApplicants, setRoleApplicants] = useState([]);

  useEffect(() => {
    fetchRoleById(roleId);
    fetchApplicantsByRoleId(roleId);
  }, []);

  const redirectToRoleListings = () => {
    navigate("/role-listings");
  };

  const contactStaff = (email) => {
    window.location.href = "mailto:" + email;
  };

  const scrollToApplicantsComponent = () => {
    if (applicantsRef.current) {
      applicantsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchRoleById = (roleId) => {
    RoleService.getRoleById(roleId)
      .then(
        (response) => {
          setRole(response.data.data);
        },
        (error) => {
          setRole({});
        }
      )
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 600)
      );
  };

  const fetchApplicantsByRoleId = (roleId) => {
    ApplicationService.getApplicantsByRoleId(roleId).then(
      (response) => {
        setRoleApplicants(response.data.data.applicants);
      },
      (error) => {
        setRoleApplicants([]);
      }
    );
  };

  const columnsData = [
    {
      Header: "STAFF ID",
      accessor: "staff_id",
      Cell: ({ row }) => <Text>{row.original.staff_id}</Text>,
    },
    {
      Header: "FIRST NAME",
      accessor: "first_name",
      Cell: ({ row }) => <Text>{row.original.first_name}</Text>,
    },
    {
      Header: "LAST NAME",
      accessor: "last_name",
      Cell: ({ row }) => <Text>{row.original.last_name}</Text>,
    },
    {
      Header: "LOCATION",
      accessor: "location",
      Cell: ({ row }) => <Text>{row.original.location}</Text>,
    },
    {
      Header: "DEPARTMENT",
      accessor: "department",
      Cell: ({ row }) => <Text>{row.original.department}</Text>,
    },
    {
      Header: "EMAIL",
      accessor: "email",
      Cell: ({ row }) => <Text>{row.original.email}</Text>,
    },
    {
      Header: "ACTIONS",
      disableSortBy: true,
      Cell: ({ row }) => (
        <Flex>
          <HStack spacing={2}>
            <ViewApplicantModal
              staffId={row.original.staff_id}
              firstName={row.original.first_name}
              lastName={row.original.last_name}
              location={row.original.location}
              department={row.original.department}
              email={row.original.email}
              skills={row.original.skills}
            />

            <Button
              size={"sm"}
              fontSize={"xs"}
              color={"gray.600"}
              _dark={{ color: "gray.400" }}
              onClick={() => contactStaff(row.original.email)}
            >
              Contact
            </Button>
          </HStack>
        </Flex>
      ),
    },
  ];

  return (
    <Flex px={5} py={8} flexDirection={"column"} h={"full"}>
      {isLoading ? (
        <ViewRoleListingSkeleton />
      ) : (
        <Flex flexDirection={"column"}>
          <Card
            variant={"outline"}
            backgroundColor={"gray.50"}
            _dark={{ backgroundColor: "gray.800" }}
            overflowX={{ sm: "scroll", xl: "hidden" }}
            mb={"22px"}
          >
            <Flex direction={"column"} w={"full"}>
              <CardBody
                flexDirection={"column"}
                color={"gray.700"}
                _dark={{ color: "gray.400" }}
              >
                <Flex
                  p={"6px 0px 6px 0px"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Button
                    display={"flex"}
                    alignItems={"center"}
                    leftIcon={<BiChevronLeft size={18} />}
                    variant={"unstyled"}
                    size={"sm"}
                    fontWeight={"medium"}
                    iconSpacing={1}
                    color={"gray.600"}
                    _dark={{ color: "gray.400" }}
                    onClick={redirectToRoleListings}
                  >
                    Back to Role Listings
                  </Button>

                  <Button
                    size={"md"}
                    fontSize={"xs"}
                    color={"gray.600"}
                    _dark={{ color: "gray.400" }}
                    onClick={scrollToApplicantsComponent}
                  >
                    View Applicants
                  </Button>
                </Flex>

                <Flex flexDirection={"column"} p={3}>
                  <Flex justifyContent={"space-between"} mb={4}>
                    <Box>
                      <Text
                        fontSize={"md"}
                        fontWeight={"medium"}
                        mb={1}
                        color={"gray.500"}
                      >
                        {role.department}
                      </Text>
                      <Heading
                        fontSize={"2xl"}
                        fontWeight={"semibold"}
                        mb={1.5}
                      >
                        {role.name}
                      </Heading>
                      <Flex
                        alignItems={"center"}
                        color={"gray.600"}
                        _dark={{ color: "gray.500" }}
                      >
                        <Icon as={BiMap} mr={1} w={5} h={5} />
                        <Text fontSize={"md"} fontWeight={"medium"}>
                          {role.location}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mb={8}
                  >
                    <Flex>
                      <Tag
                        size={"sm"}
                        variant={"subtle"}
                        px={3}
                        py={2}
                        colorScheme={"gray"}
                        backgroundColor={"gray.200"}
                        color={"gray.600"}
                        _dark={{
                          color: "gray.400",
                          backgroundColor: "gray.700",
                        }}
                        mr={2}
                      >
                        <TagLeftIcon as={BiBriefcase} />
                        <TagLabel fontWeight={"semibold"} fontSize={"xs"}>
                          {role.experience}
                        </TagLabel>
                      </Tag>
                      <Tag
                        size={"sm"}
                        variant={"subtle"}
                        px={3}
                        py={2}
                        colorScheme={"gray"}
                        backgroundColor={"gray.200"}
                        color={"gray.600"}
                        _dark={{
                          color: "gray.400",
                          backgroundColor: "gray.700",
                        }}
                      >
                        <TagLeftIcon as={BiTimeFive} />
                        <TagLabel fontWeight={"semibold"} fontSize={"xs"}>
                          {role.employment_type}
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
                          px={3}
                          py={2}
                        >
                          {role.hiring_manager}
                        </Tag>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex>
                    <VStack spacing={6} alignItems={"start"}>
                      <Flex flexDirection="column">
                        <Heading fontSize={"sm"} fontWeight={"semibold"} mb={2}>
                          Requirements
                        </Heading>
                        <Text
                          fontSize={"sm"}
                          fontWeight={"regular"}
                          wordBreak={"break-word"}
                        >
                          {role.requirement}
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
                          {role.description}
                        </Text>
                      </Flex>
                      <Flex flexDirection="column">
                        <Heading
                          fontSize={"sm"}
                          fontWeight={"semibold"}
                          mb={2.5}
                        >
                          Skills
                        </Heading>
                        <HStack spacing={2.5}>
                          {role.skills && role.skills.length !== 0 ? (
                            role.skills.map((skill) => (
                              <Tag
                                key={skill}
                                size={"sm"}
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
                                <TagLabel fontWeight={"semibold"}>
                                  {skill}
                                </TagLabel>
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
                        {SimpleDate(role.created)}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text fontSize={"xs"} fontWeight={"semibold"} mr={1}>
                        Application Deadline:
                      </Text>
                      <Text fontSize={"xs"} fontWeight={"medium"}>
                        {SimpleDate(role.deadline)}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </CardBody>
            </Flex>
          </Card>

          <DynamicTable
            innerRef={applicantsRef}
            title="Applicants"
            tableData={roleApplicants}
            columnsData={columnsData}
          />
        </Flex>
      )}
    </Flex>
  );
}
