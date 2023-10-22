// General imports
import { useState, useEffect, useRef } from "react";
import SkillService from "../services/skill.service";

// Chakra imports
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";

// Icons
import { BiX } from "react-icons/bi";
import { PiSlidersHorizontal } from "react-icons/pi";

export default function FilterBar(props) {
  const { maxHeight, onApplyFilter } = props;
  const initRef = useRef();

  const [skills, setSkills] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDeadlineFrom, setSelectedDeadlineFrom] = useState("");
  const [selectedDeadlineTo, setSelectedDeadlineTo] = useState("");

  useEffect(() => {
    fetchSkillNames();
  }, []);

  const fetchSkillNames = () => {
    SkillService.getSkillNames().then(
      (response) => {
        setSkills(response.data.data.skill_names);
      },
      (error) => {
        setSkills([]);
      }
    );
  };

  const today = new Date();
  const currentDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const resetFields = () => {
    setSelectedLocations([]);
    setSelectedDepartments([]);
    setSelectedEmploymentTypes([]);
    setSelectedExperiences([]);
    setSelectedSkills([]);
    setSelectedDeadlineFrom("");
    setSelectedDeadlineTo("");
    onApplyFilter([], [], [], [], [], "", "");
  };

  const handleApplyClick = () => {
    onApplyFilter(
      selectedLocations,
      selectedDepartments,
      selectedEmploymentTypes,
      selectedExperiences,
      selectedSkills,
      selectedDeadlineFrom,
      selectedDeadlineTo
    );
  };

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;

    if (selectedLocation === "") {
      return;
    }

    if (!selectedLocations.includes(selectedLocation)) {
      setSelectedLocations([...selectedLocations, selectedLocation]);
    }
  };

  const handleRemoveLocation = (location) => {
    const updatedLocations = selectedLocations.filter((l) => l !== location);
    setSelectedLocations(updatedLocations);
  };

  const handleDepartmentChange = (event) => {
    const selectedDepartment = event.target.value;

    if (selectedDepartment === "") {
      return;
    }

    if (!selectedDepartments.includes(selectedDepartment)) {
      setSelectedDepartments([...selectedDepartments, selectedDepartment]);
    }
  };

  const handleRemoveDepartment = (department) => {
    const updatedDepartments = selectedDepartments.filter(
      (d) => d !== department
    );
    setSelectedDepartments(updatedDepartments);
  };

  const handleEmploymentTypeChange = (event) => {
    const selectedEmploymentType = event.target.value;

    if (selectedEmploymentType === "") {
      return;
    }

    if (!selectedEmploymentTypes.includes(selectedEmploymentType)) {
      setSelectedEmploymentTypes([
        ...selectedEmploymentTypes,
        selectedEmploymentType,
      ]);
    }
  };

  const handleRemoveEmploymentType = (employmentType) => {
    const updatedEmploymentTypes = selectedEmploymentTypes.filter(
      (e) => e !== employmentType
    );
    setSelectedEmploymentTypes(updatedEmploymentTypes);
  };

  const handleExperienceChange = (event) => {
    const selectedExperience = event.target.value;

    if (selectedExperience === "") {
      return;
    }

    if (!selectedExperiences.includes(selectedExperience)) {
      setSelectedExperiences([...selectedExperiences, selectedExperience]);
    }
  };

  const handleRemoveExperience = (experience) => {
    const updatedExperiences = selectedExperiences.filter(
      (e) => e !== experience
    );
    setSelectedExperiences(updatedExperiences);
  };

  const handleSkillChange = (event) => {
    const selectedSkill = event.target.value;

    if (selectedSkill === "") {
      return;
    }

    if (!selectedSkills.includes(selectedSkill)) {
      setSelectedSkills([...selectedSkills, selectedSkill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
  };

  return (
    <Popover closeOnBlur={true} initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              leftIcon={<PiSlidersHorizontal size={"18"} />}
              variant={"outline"}
              w={"full"}
              size={"md"}
              fontSize={"xs"}
              fontWeight={"medium"}
              backgroundColor={"gray.50"}
              color={"gray.600"}
              _dark={{
                color: "gray.400",
                backgroundColor: "gray.700",
              }}
              borderRadius={"md"}
            >
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent
            fontSize={"sm"}
            maxH={maxHeight}
            maxW={"100vw"}
            w={"50vw"}
          >
            <PopoverArrow />
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              _dark={{ borderColor: "gray.600" }}
            >
              <PopoverHeader
                borderBottom={"none"}
                fontSize={"sm"}
                fontWeight={"medium"}
                color={"gray.600"}
                _dark={{
                  color: "gray.400",
                }}
              >
                Filter
              </PopoverHeader>
              <IconButton
                variant={"unstyled"}
                aria-label="Close Filter"
                icon={<BiX />}
                fontSize={"1.2rem"}
                color={"gray.500"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                onClick={onClose}
                ref={initRef}
              />
            </Flex>
            <Divider
              borderColor={"gray.300"}
              _dark={{ borderColor: "gray.500" }}
            />
            <PopoverBody w={"full"} mb={2} overflowY={"scroll"}>
              <VStack spacing={2.5}>
                <SimpleGrid columns={2} w={"full"} spacing={5}>
                  <Flex flexDirection={"column"} w={"full"}>
                    <FormControl>
                      <FormLabel
                        fontSize={"xs"}
                        color={"gray.600"}
                        _dark={{
                          color: "gray.400",
                        }}
                      >
                        Location
                      </FormLabel>
                      <Select
                        placeholder="Select Location"
                        size={"sm"}
                        fontSize={"xs"}
                        borderRadius={"md"}
                        color={"gray.500"}
                        focusBorderColor={"pink.300"}
                        onChange={handleLocationChange}
                        value={""}
                      >
                        <option value={"Singapore"}>Singapore</option>
                        <option value={"Malaysia"}>Malaysia</option>
                        <option value={"Japan"}>Japan</option>
                        <option value={"South Korea"}>South Korea</option>
                        <option value={"Hong Kong"}>Hong Kong</option>
                        <option value={"Thailand"}>Thailand</option>
                        <option value={"Indonesia"}>Indonesia</option>
                        <option value={"Philippines"}>Philippines</option>
                      </Select>
                    </FormControl>
                    <Flex flexWrap="wrap" w={"full"} spacing={2}>
                      {selectedLocations.map((location) => (
                        <Tag
                          key={location}
                          size={"sm"}
                          variant="subtle"
                          colorScheme="linkedin"
                          color={"blue.500"}
                          py={1}
                          px={2}
                          me={2}
                          mt={2.5}
                        >
                          <TagLabel fontSize={"2xs"}>{location}</TagLabel>
                          <TagCloseButton
                            fontSize={"sm"}
                            onClick={() => handleRemoveLocation(location)}
                          />
                        </Tag>
                      ))}
                    </Flex>
                  </Flex>

                  <Flex flexDirection={"column"} w={"full"}>
                    <FormControl>
                      <FormLabel
                        fontSize={"xs"}
                        color={"gray.600"}
                        _dark={{
                          color: "gray.400",
                        }}
                      >
                        Department
                      </FormLabel>
                      <Select
                        placeholder="Select Department"
                        size={"sm"}
                        fontSize={"xs"}
                        borderRadius={"md"}
                        color={"gray.500"}
                        focusBorderColor={"pink.300"}
                        onChange={handleDepartmentChange}
                        value={""}
                      >
                        <option value={"Information Technology"}>
                          Information Technology
                        </option>
                        <option value={"Marketing"}>
                          Marketing
                        </option>
                        <option value={"Sales"}>
                          Sales
                        </option>
                        <option value={"Finance"}>
                          Finance
                        </option>
                        <option value={"Human Resources"}>
                          Human Resources
                        </option>
                        <option value={"Operations"}>
                          Operations
                        </option>
                      </Select>
                    </FormControl>
                    <Flex flexWrap="wrap" w={"full"} spacing={2}>
                      {selectedDepartments.map((department) => (
                        <Tag
                          key={department}
                          size={"sm"}
                          variant="subtle"
                          colorScheme="linkedin"
                          color={"blue.500"}
                          py={1}
                          px={2}
                          me={2}
                          mt={2.5}
                        >
                          <TagLabel fontSize={"2xs"}>{department}</TagLabel>
                          <TagCloseButton
                            fontSize={"sm"}
                            onClick={() => handleRemoveDepartment(department)}
                          />
                        </Tag>
                      ))}
                    </Flex>
                  </Flex>
                </SimpleGrid>

                <SimpleGrid columns={2} w={"full"} spacing={5}>
                  <Flex flexDirection={"column"} w={"full"}>
                    <FormControl>
                      <FormLabel
                        fontSize={"xs"}
                        color={"gray.600"}
                        _dark={{
                          color: "gray.400",
                        }}
                      >
                        Employment Type
                      </FormLabel>
                      <Select
                        placeholder="Select Employment Type"
                        size={"sm"}
                        fontSize={"xs"}
                        borderRadius={"md"}
                        color={"gray.500"}
                        focusBorderColor={"pink.300"}
                        onChange={handleEmploymentTypeChange}
                        value={""}
                      >
                        <option value={"Full Time"}>Full Time</option>
                        <option value={"Part Time"}>Part Time</option>
                      </Select>
                    </FormControl>
                    <Flex flexWrap="wrap" w={"full"} spacing={2}>
                      {selectedEmploymentTypes.map((employmentType) => (
                        <Tag
                          key={employmentType}
                          size={"sm"}
                          variant="subtle"
                          colorScheme="linkedin"
                          color={"blue.500"}
                          py={1}
                          px={2}
                          me={2}
                          mt={2.5}
                        >
                          <TagLabel fontSize={"2xs"}>{employmentType}</TagLabel>
                          <TagCloseButton
                            fontSize={"sm"}
                            onClick={() =>
                              handleRemoveEmploymentType(employmentType)
                            }
                          />
                        </Tag>
                      ))}
                    </Flex>
                  </Flex>

                  <Flex flexDirection={"column"} w={"full"}>
                    <FormControl>
                      <FormLabel
                        fontSize={"xs"}
                        color={"gray.600"}
                        _dark={{
                          color: "gray.400",
                        }}
                      >
                        Experience
                      </FormLabel>
                      <Select
                        placeholder="Select Experience"
                        size={"sm"}
                        fontSize={"xs"}
                        borderRadius={"md"}
                        color={"gray.500"}
                        focusBorderColor={"pink.300"}
                        onChange={handleExperienceChange}
                        value={""}
                      >
                        <option value={"Entry Level"}>Entry Level</option>
                        <option value={"Junior Level"}>Junior Level</option>
                        <option value={"Mid Level"}>Mid Level</option>
                        <option value={"Senior Level"}>Senior Level</option>
                        <option value={"Director Level"}>Director Level</option>
                      </Select>
                    </FormControl>
                    <Flex flexWrap="wrap" w={"full"} spacing={2}>
                      {selectedExperiences.map((experience) => (
                        <Tag
                          key={experience}
                          size={"sm"}
                          variant="subtle"
                          colorScheme="linkedin"
                          color={"blue.500"}
                          py={1}
                          px={2}
                          me={2}
                          mt={2.5}
                        >
                          <TagLabel fontSize={"2xs"}>{experience}</TagLabel>
                          <TagCloseButton
                            fontSize={"sm"}
                            onClick={() => handleRemoveExperience(experience)}
                          />
                        </Tag>
                      ))}
                    </Flex>
                  </Flex>
                </SimpleGrid>

                <SimpleGrid columns={2} w={"full"} spacing={5}>
                  <Flex flexDirection={"column"} w={"full"}>
                    <FormControl>
                      <FormLabel
                        fontSize={"xs"}
                        color={"gray.600"}
                        _dark={{
                          color: "gray.400",
                        }}
                      >
                        Skill
                      </FormLabel>
                      <Select
                        placeholder="Select Skill"
                        size={"sm"}
                        fontSize={"xs"}
                        borderRadius={"md"}
                        color={"gray.500"}
                        focusBorderColor={"pink.300"}
                        onChange={handleSkillChange}
                        value={""}
                      >
                        {skills.map((skill) => (
                          <option key={skill} value={skill}>
                            {skill}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <Flex flexWrap="wrap" w={"full"} spacing={2}>
                      {selectedSkills.map((skill) => (
                        <Tag
                          key={skill}
                          size={"sm"}
                          variant="subtle"
                          colorScheme="linkedin"
                          color={"blue.500"}
                          py={1}
                          px={2}
                          me={2}
                          mt={2.5}
                        >
                          <TagLabel fontSize={"2xs"}>{skill}</TagLabel>
                          <TagCloseButton
                            fontSize={"sm"}
                            onClick={() => handleRemoveSkill(skill)}
                          />
                        </Tag>
                      ))}
                    </Flex>
                  </Flex>
                </SimpleGrid>

                <FormControl>
                  <FormLabel
                    fontSize={"xs"}
                    color={"gray.600"}
                    _dark={{
                      color: "gray.400",
                    }}
                  >
                    Deadline
                  </FormLabel>
                  <HStack>
                    <Input
                      type="date"
                      placeholder="From"
                      min={currentDate}
                      size={"sm"}
                      fontSize={"xs"}
                      borderRadius={"md"}
                      focusBorderColor={"pink.300"}
                      color={"gray.500"}
                      onChange={(event) =>
                        setSelectedDeadlineFrom(event.target.value)
                      }
                      value={selectedDeadlineFrom}
                    />
                    <Text fontSize={"xs"} color={"gray.500"}>
                      -
                    </Text>
                    <Input
                      type="date"
                      placeholder="To"
                      min={currentDate}
                      size={"sm"}
                      fontSize={"xs"}
                      borderRadius={"md"}
                      focusBorderColor={"pink.300"}
                      color={"gray.500"}
                      onChange={(event) =>
                        setSelectedDeadlineTo(event.target.value)
                      }
                      value={selectedDeadlineTo}
                    />
                  </HStack>
                </FormControl>
              </VStack>
            </PopoverBody>

            <Divider
              borderColor={"gray.300"}
              _dark={{ borderColor: "gray.500" }}
            />
            <Flex justifyContent={"end"} p={3}>
              <HStack spacing={2}>
                <Button
                  variant={"solid"}
                  size={"sm"}
                  fontSize={"2xs"}
                  fontWeight={"medium"}
                  color={"gray.600"}
                  _dark={{
                    color: "gray.400",
                  }}
                  onClick={resetFields}
                >
                  Reset
                </Button>
                <Button
                  variant={"solid"}
                  size={"sm"}
                  fontSize={"2xs"}
                  fontWeight={"medium"}
                  colorScheme={"teal"}
                  onClick={handleApplyClick}
                >
                  Apply
                </Button>
              </HStack>
            </Flex>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
