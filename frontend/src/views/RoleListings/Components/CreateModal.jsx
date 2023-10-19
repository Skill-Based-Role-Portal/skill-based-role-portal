// General imports
import { useState, useEffect, useRef } from "react";
import RoleService from "../../../services/role.service";
import SkillService from "../../../services/skill.service";
import StaffService from "../../../services/staff.service";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Chakra imports
import {
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  VStack,
  SimpleGrid,
  Flex,
  Tag,
  HStack,
  TagLabel,
  TagCloseButton,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

// Icons
import { BiX } from "react-icons/bi";

export default function CreateModal({ refresh }) {
  const modalSize = "6xl";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const closeModal = () => {
    setSelectedSkills([]);
    onClose();
  };

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const scrollBehavior = "inside";

  const [isLoading, setIsLoading] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [managerOptions, setManagerOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchSkillNames();
    fetchManagers();
  }, []);

  const fetchSkillNames = () => {
    SkillService.getSkillNames().then(
      (response) => {
        setSkillOptions(response.data.data.skill_names);
      },
      (error) => {
        setSkillOptions([]);
      }
    );
  };

  const fetchManagers = () => {
    StaffService.getManagers().then(
      (response) => {
        setManagerOptions(response.data.data.staffs);
      },
      (error) => {
        setManagerOptions([]);
      }
    );
  };

  const today = new Date();
  const currentDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const initialValues = {
    name: "",
    experience: "",
    location: "",
    department: "",
    employment_type: "",
    requirement: "",
    description: "",
    skills: "",
    hiring_manager: "",
    deadline: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter the role name"),
    experience: Yup.string().required("Please enter the experience level"),
    location: Yup.string().required("Please enter the location"),
    department: Yup.string().required("Please enter the department"),
    employment_type: Yup.string().required("Please enter the employment type"),
    requirement: Yup.string().required("Please enter the role requirement"),
    description: Yup.string().required("Please enter the role description"),
    hiring_manager: Yup.string().required("Please select the hiring manager"),
    deadline: Yup.date()
      .min(currentDate, "Deadline must not be a past date")
      .required("Please enter the role application deadline"),
  });

  const createRoleListing = (formValue, actions) => {
    const {
      name,
      experience,
      location,
      department,
      employment_type,
      requirement,
      description,
      hiring_manager,
      deadline,
    } = formValue;
    setIsLoading(true);

    const payload = {
      name: name,
      experience: experience,
      location: location,
      department: department,
      employment_type: employment_type,
      requirement: requirement,
      description: description,
      skills: selectedSkills,
      hiring_manager: hiring_manager,
      deadline: deadline,
    };

    RoleService.createRole(payload).then(
      (response) => {
        setIsLoading(false);
        refresh();
        toast({
          position: "top",
          status: "success",
          isClosable: true,
          title: "Role Listing Created",
          description: `${name} Role has been created successfully.`,
        });
        actions.resetForm();
        setSelectedSkills([]);
        onClose();
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

  const resetFields = (resetForm) => {
    resetForm();
    setSelectedSkills([]);
  };

  const handleSkillChange = (e, setFieldValue) => {
    const selectedSkill = e.target.value;

    if (selectedSkill === "") {
      return;
    }

    if (!selectedSkills.includes(selectedSkill)) {
      setSelectedSkills([...selectedSkills, selectedSkill]);
      setFieldValue("skills", "");
    }
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
  };

  return (
    <>
      <Button
        size={"md"}
        fontSize={"xs"}
        colorScheme={"teal"}
        onClick={onOpen}
        ref={finalRef}
      >
        Create Role Listing
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => createRoleListing(values, actions)}
        >
          {({ errors, touched, isValid, dirty, resetForm }) => (
            <Form>
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
                      Create Role Listing
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
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl isInvalid={errors.name && touched.name}>
                            <FormLabel fontSize={"sm"}>Role Name</FormLabel>
                            <Input
                              type="text"
                              placeholder="Enter Role Name"
                              fontSize={"sm"}
                              maxLength={"20"}
                              focusBorderColor={"pink.300"}
                              variant="filled"
                              {...field}
                            />
                            <FormErrorMessage name="name">
                              {errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="experience">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={errors.experience && touched.experience}
                          >
                            <FormLabel fontSize={"sm"}>
                              Experience Level
                            </FormLabel>
                            <Select
                              placeholder="Select Experience Level"
                              fontSize={"sm"}
                              focusBorderColor={"pink.300"}
                              variant="filled"
                              {...field}
                            >
                              <option value={"Entry Level"}>Entry Level</option>
                              <option value={"Junior Level"}>
                                Junior Level
                              </option>
                              <option value={"Mid Level"}>Mid Level</option>
                              <option value={"Senior Level"}>
                                Senior Level
                              </option>
                              <option value={"Director Level"}>
                                Director Level
                              </option>
                            </Select>
                            <FormErrorMessage name="experience">
                              {errors.experience}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>

                    <SimpleGrid columns={2} w={"full"} spacing={5}>
                      <Field name="location">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={errors.location && touched.location}
                          >
                            <FormLabel fontSize={"sm"}>Location</FormLabel>
                            <Input
                              type="text"
                              placeholder="Enter Location"
                              fontSize={"sm"}
                              maxLength={"50"}
                              focusBorderColor={"pink.300"}
                              variant="filled"
                              {...field}
                            />
                            <FormErrorMessage name="location">
                              {errors.location}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="department">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={errors.department && touched.department}
                          >
                            <FormLabel fontSize={"sm"}>Department</FormLabel>
                            <Input
                              type="text"
                              placeholder="Enter Department"
                              fontSize={"sm"}
                              maxLength={"50"}
                              focusBorderColor={"pink.300"}
                              variant="filled"
                              {...field}
                            />
                            <FormErrorMessage name="department">
                              {errors.department}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>

                    <Field name="employment_type">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            errors.employment_type && touched.employment_type
                          }
                        >
                          <FormLabel fontSize={"sm"}>Employment Type</FormLabel>
                          <Select
                            placeholder="Select Employment Type"
                            fontSize={"sm"}
                            focusBorderColor={"pink.300"}
                            variant="filled"
                            {...field}
                          >
                            <option value={"Full Time"}>Full Time</option>
                            <option value={"Part Time"}>Part Time</option>
                          </Select>
                          <FormErrorMessage name="employment_type">
                            {errors.employment_type}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="requirement">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={errors.requirement && touched.requirement}
                        >
                          <FormLabel fontSize={"sm"}>Requirement</FormLabel>
                          <Textarea
                            placeholder="Enter Requirement"
                            fontSize={"sm"}
                            maxLength={"256"}
                            focusBorderColor={"pink.300"}
                            variant="filled"
                            {...field}
                          />
                          <FormErrorMessage name="requirement">
                            {errors.requirement}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={errors.description && touched.description}
                        >
                          <FormLabel fontSize={"sm"}>Description</FormLabel>
                          <Textarea
                            placeholder="Enter Description"
                            fontSize={"sm"}
                            maxLength={"256"}
                            focusBorderColor={"pink.300"}
                            variant="filled"
                            {...field}
                          />
                          <FormErrorMessage name="description">
                            {errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="skills">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={errors.skills && touched.skills}
                        >
                          <FormLabel fontSize={"sm"}>Skills</FormLabel>
                          <Select
                            placeholder="Select Skill"
                            fontSize={"sm"}
                            focusBorderColor={"pink.300"}
                            variant="filled"
                            onChange={(e) =>
                              handleSkillChange(e, form.setFieldValue)
                            }
                            value={field.value}
                          >
                            {skillOptions.map((skill) => (
                              <option key={skill} value={skill}>
                                {skill}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage name="skills">
                            {errors.skills}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <HStack flexWrap="wrap" w={"full"} spacing={2}>
                      {selectedSkills.map((skill) => (
                        <Tag
                          key={skill}
                          size="sm"
                          variant="subtle"
                          colorScheme="linkedin"
                          color={"blue.500"}
                          py={1}
                          px={2}
                        >
                          <TagLabel>{skill}</TagLabel>
                          <TagCloseButton
                            onClick={() => handleRemoveSkill(skill)}
                          />
                        </Tag>
                      ))}
                    </HStack>

                    <Field name="hiring_manager">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            errors.hiring_manager && touched.hiring_manager
                          }
                        >
                          <FormLabel fontSize={"sm"}>Hiring Manager</FormLabel>
                          <Select
                            placeholder="Select Manager"
                            fontSize={"sm"}
                            focusBorderColor={"pink.300"}
                            variant="filled"
                            {...field}
                          >
                            {managerOptions.map((manager) => (
                              <option key={manager} value={manager}>
                                {manager}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage name="hiring_manager">
                            {errors.hiring_manager}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="deadline">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={errors.deadline && touched.deadline}
                        >
                          <FormLabel fontSize={"sm"}>
                            Application Deadline
                          </FormLabel>
                          <Input
                            type="date"
                            placeholder="Select Application Deadline"
                            min={currentDate}
                            fontSize={"sm"}
                            focusBorderColor={"pink.300"}
                            variant="filled"
                            {...field}
                          />
                          <FormErrorMessage name="deadline">
                            {errors.deadline}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Flex w={"full"} justifyContent={"end"} mt={6}></Flex>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme={"gray"}
                    size={"md"}
                    fontSize={"sm"}
                    mr={2.5}
                    onClick={() => resetFields(resetForm)}
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    colorScheme={"teal"}
                    size={"md"}
                    fontSize={"sm"}
                    isLoading={isLoading}
                  >
                    Create
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
