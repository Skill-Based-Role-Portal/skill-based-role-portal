// General imports
import { useState, useEffect } from "react";
import RoleService from "../services/role.service";

// Chakra imports
import { Flex, Text, Tag } from "@chakra-ui/react";

// Custom components
import DynamicTable from "../components/DynamicTable";
import SimpleDate from "../helper/SimpleDate";

export default function RoleListings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    RoleService.getRoles().then(
      (response) => {
        const rolesData = response.data.data.roles;
        setRoles(rolesData);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      },
      (error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        setIsError(true);
        setRoles([]);
      }
    );
  };

  const columnsData = [
    {
      Header: "ROLE ID",
      accessor: "role_id",
      Cell: ({ row }) => <Text>{row.original.role_id}</Text>,
    },
    {
      Header: "NAME",
      accessor: "name",
      Cell: ({ row }) => <Text>{row.original.name}</Text>,
    },
    {
      Header: "EXPERIENCE",
      accessor: "experience",
      Cell: ({ row }) => <Text>{row.original.experience}</Text>,
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
      Header: "EMPLOYMENT TYPE",
      accessor: "employment_type",
      Cell: ({ row }) => <Text>{row.original.employment_type}</Text>,
    },
    {
      Header: "HIRING MANAGER",
      accessor: "hiring_manager",
      Cell: ({ row }) => <Text>{row.original.hiring_manager}</Text>,
    },
    {
      Header: "STATUS",
      accessor: "status",
      Cell: ({ row }) =>
        row.original.status === "Active" ? (
          <Tag colorScheme={"whatsapp"} size={"sm"} fontSize={"2xs"}>
            Active
          </Tag>
        ) : (
          <Tag colorScheme={"orange"} size={"sm"} fontSize={"2xs"}>
            Expired
          </Tag>
        ),
    },
    {
      Header: "CREATED",
      accessor: "created",
      Cell: ({ row }) => <Text>{SimpleDate(row.original.created)}</Text>,
    },
    {
      Header: "DEADLINE",
      accessor: "deadline",
      Cell: ({ row }) => <Text>{SimpleDate(row.original.deadline)}</Text>,
    },
  ];

  return (
    <Flex px={5} py={8} flexDirection={"column"} h={"full"}>
      <DynamicTable
        title="Role Listings Table"
        tableData={roles}
        columnsData={columnsData}
      />
    </Flex>
  );
}
