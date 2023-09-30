// General imports
import { useState, useEffect } from "react";
import RoleService from "../services/role.service";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

// Custom components
import CreateRoleListingSkeleton from "../components/skeletons/CreateRoleListingSkeleton";

// Chakra imports
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  VStack,
  Button,
  Card,
  CardBody,
  SimpleGrid,
  Flex,
  Tag,
  HStack,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";

export default function CreateRoleListing() {
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const toast = useToast();

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
    employmentType: "",
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
    employmentType: Yup.string().required("Please enter the employment type"),
    requirement: Yup.string().required("Please enter the role requirement"),
    description: Yup.string().required("Please enter the role description"),
    hiring_manager: Yup.string().required("Please select the hiring manager"),
    deadline: Yup.date()
      .min(currentDate, "Deadline must not be a past date")
      .required("Please enter the role application deadline"),
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingSkeleton(false);
    }, 500);
  }, []);

  const createRoleListing = (formValue, actions) => {
    const {
      name,
      experience,
      location,
      department,
      employmentType,
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
      employment_type: employmentType,
      requirement: requirement,
      description: description,
      skills: selectedSkills,
      hiring_manager: hiring_manager,
      deadline: deadline,
    };

    RoleService.createRole(payload).then(
      (response) => {
        setIsLoading(false);
        toast({
          position: "top",
          status: "success",
          isClosable: true,
          title: "Role Listing Created",
          description: `${name} Role has been created successfully.`,
        });
        actions.resetForm();
        setSelectedSkills([]);
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
    <Box px={5} py={8} w={"full"}>
      {isLoadingSkeleton ? (
        <CreateRoleListingSkeleton />
      ) : (
        <Card
          variant={"outline"}
          backgroundColor={"gray.50"}
          _dark={{ backgroundColor: "gray.800" }}
        >
          <CardBody>
            <Heading
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"gray.700"}
              _dark={{ color: "gray.400" }}
              mb={5}
            >
              Create Role Listing
            </Heading>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => createRoleListing(values, actions)}
            >
              {({ errors, touched, isValid, dirty, resetForm }) => (
                <Form>
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
                            <Input
                              type="text"
                              placeholder="Enter Experience Level"
                              fontSize={"sm"}
                              maxLength={"50"}
                              focusBorderColor={"pink.300"}
                              variant="filled"
                              {...field}
                            />
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

                    <Field name="employmentType">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            errors.employmentType && touched.employmentType
                          }
                        >
                          <FormLabel fontSize={"sm"}>Employment Type</FormLabel>
                          <Input
                            type="text"
                            placeholder="Enter Employment Type"
                            fontSize={"sm"}
                            maxLength={"50"}
                            focusBorderColor={"pink.300"}
                            variant="filled"
                            {...field}
                          />
                          <FormErrorMessage name="employmentType">
                            {errors.employmentType}
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
                            <option value={"HTML"}>HTML</option>
                            <option value={"CSS"}>CSS</option>
                            <option value={"JavaScript"}>JavaScript</option>
                          </Select>
                          <FormErrorMessage name="skills">
                            {errors.skills}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <HStack w={"full"} spacing={2}>
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
                            <option>Tony Stark</option>
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

                    <Flex w={"full"} justifyContent={"end"} mt={6}>
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
                        isDisabled={!isValid}
                      >
                        Create Role Listing
                      </Button>
                    </Flex>
                  </VStack>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      )}
    </Box>
  );
}
