// General imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoleService from "../../services/role.service";

// Chakra imports
import { Button, Flex, HStack, Text, Tag } from "@chakra-ui/react";

// Custom components
import DynamicTable from "../../components/DynamicTable";
import CreateModal from "./Components/CreateModal";
import EditModal from "./Components/EditModal";
import RoleListingSkeleton from "../../components/skeletons/RoleListingsTableSkeleton";

// Helper
import SimpleDate from "../../helper/SimpleDate";

export default function RoleListings() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [roles, setRoles] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const refreshData = () => {
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    fetchRoles();
  }, [refresh]);

  const redirectToRoleListing = (roleId) => {
    navigate("/role-listing/" + roleId);
  };

  const fetchRoles = () => {
    RoleService.getRoles()
      .then(
        (response) => {
          const rolesData = response.data.data.roles;
          setRoles(rolesData);
        },
        (error) => {
          setIsError(true);
          setRoles([]);
        }
      )
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 600)
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
      Header: "DEADLINE",
      accessor: "deadline",
      Cell: ({ row }) => <Text>{SimpleDate(row.original.deadline)}</Text>,
    },
    {
      Header: "ACTIONS",
      disableSortBy: true,
      accessor: "skills",
      Cell: ({ row }) => (
        <Flex>
          <HStack spacing={2}>
            <Button
              size={"sm"}
              fontSize={"xs"}
              color={"gray.600"}
              _dark={{ color: "gray.400" }}
              onClick={() => redirectToRoleListing(row.original.role_id)}
            >
              View
            </Button>
            <EditModal
              refresh={refreshData}
              key={row.original.role_id}
              role_id={row.original.role_id}
              name={row.original.name}
              experience={row.original.experience}
              location={row.original.location}
              department={row.original.department}
              employment_type={row.original.employment_type}
              requirement={row.original.requirement}
              description={row.original.description}
              hiring_manager={row.original.hiring_manager}
              deadline={new Date(row.original.deadline)}
              skills={row.original.skills}
              modified={row.original.modified}
            />
          </HStack>
        </Flex>
      ),
    },
  ];

  return (
    <Flex px={5} py={8} flexDirection={"column"} h={"full"}>
      {isLoading ? (
        <RoleListingSkeleton />
      ) : (
        <DynamicTable
          title="Role Listings"
          createItem={<CreateModal refresh={refreshData} />}
          tableData={roles}
          columnsData={columnsData}
        />
      )}
    </Flex>
  );
}
