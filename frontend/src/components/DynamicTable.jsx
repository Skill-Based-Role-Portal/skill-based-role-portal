// General imports
import { useMemo } from "react";

// Chakra imports
import {
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Card,
  CardBody,
} from "@chakra-ui/react";

// Custom components
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Icons
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";

export default function DynamicTable(props) {
  const { title, createItem, columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    pageCount,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    setGlobalFilter,
    state,
  } = tableInstance;

  const createPages = (count) => {
    let arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <Card
      variant={"outline"}
      backgroundColor={"gray.50"}
      _dark={{ backgroundColor: "gray.800" }}
      mb={"22px"}
      overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      <Flex direction={"column"} w={"full"}>
        <CardBody flexDirection={"column"}>
          <Flex p={"6px 0px 6px 0px"} justifyContent={"space-between"}>
            <Heading
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"gray.700"}
              _dark={{ color: "gray.400" }}
            >
              {title}
            </Heading>
            {createItem}
          </Flex>
          <Flex justifyContent={"space-between"} alignItems="center" w={"full"}>
            <Stack
              direction={{ sm: "row", md: "row" }}
              spacing={{ sm: "4px", md: "12px" }}
              alignItems={"center"}
              me={"12px"}
              my={5}
              minW={{ sm: "100px", md: "200px" }}
            >
              <Select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                color={"gray.500"}
                size={"xs"}
                borderRadius={"full"}
                maxW={"56px"}
                cursor={"pointer"}
                focusBorderColor={"pink.300"}
              >
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
              </Select>
              <Text fontSize={"xs"} color={"gray.400"} fontWeight={"normal"}>
                entries per page
              </Text>
            </Stack>
            {/* <Input
              type={"text"}
              placeholder={"Search..."}
              minW={"75px"}
              maxW={"175px"}
              fontSize={"xs"}
              focusBorderColor={"pink.300"}
              onChange={(e) => setGlobalFilter(e.target.value)}
              size={"sm"}
              borderRadius={"md"}
            /> */}
          </Flex>
          <Table
            {...getTableProps()}
            variant={"simple"}
            color={"gray.500"}
            mb={"24px"}
          >
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      // {...column.getHeaderProps(column.getSortByToggleProps())}
                      ps={"0px"}
                    >
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        fontSize={"2xs"}
                        color={"gray.400"}
                      >
                        {column.render("Header")}
                        {/* {column.canSort ? (
                          <Icon
                            w={{ sm: "10px", md: "12px" }}
                            h={{ sm: "10px", md: "12px" }}
                            color={columns.isSorted ? "gray.500" : "gray.400"}
                            float={"right"}
                            as={
                              column.isSorted
                                ? column.isSortedDesc
                                  ? TiArrowSortedDown
                                  : TiArrowSortedUp
                                : TiArrowUnsorted
                            }
                          />
                        ) : null} */}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()} fontSize={"xs"} px={"0px"}>
                          {cell.render("Cell")}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Flex
            direction={{ sm: "column", md: "row" }}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
          >
            <Text fontSize={"xs"} color={"gray.500"} fontWeight={"normal"}>
              Showing {pageSize * pageIndex + 1} to{" "}
              {pageSize * (pageIndex + 1) <= tableData.length
                ? pageSize * (pageIndex + 1)
                : tableData.length}{" "}
              of {tableData.length} entries
            </Text>
            <Stack
              flexDirection={"row"}
              alignSelf={"flex-end"}
              spacing={"4px"}
              ms={"auto"}
            >
              <Button
                variant={"no-hover"}
                onClick={() => previousPage()}
                transition={"all .5s ease"}
                size={"sm"}
                borderRadius={"full"}
                p={0}
                display={
                  pageSize === 5 ? "none" : canPreviousPage ? "flex" : "none"
                }
                color={"gray.400"}
                _hover={{
                  color: "gray.500",
                }}
              >
                <Icon as={IoChevronBackOutline} w={"14px"} h={"14px"} />
              </Button>
              {pageSize === 5 ? (
                <NumberInput
                  max={pageCount - 1}
                  min={1}
                  w={"50px"}
                  mx={"6px"}
                  defaultValue={"1"}
                  onChange={(e) => gotoPage(e)}
                  size={"xs"}
                  focusBorderColor={"pink.300"}
                >
                  <NumberInputField fontSize={"2xs"} borderRadius={"md"} />
                  <NumberInputStepper>
                    <NumberIncrementStepper onClick={() => nextPage()} />
                    <NumberDecrementStepper onClick={() => previousPage()} />
                  </NumberInputStepper>
                </NumberInput>
              ) : (
                createPages(pageCount).map((pageNumber) => {
                  return (
                    <Button
                      key={pageNumber}
                      variant={"no-hover"}
                      transition={"all .5s ease"}
                      onClick={() => gotoPage(pageNumber - 1)}
                      size={"sm"}
                      borderRadius={"md"}
                      bg={pageNumber === pageIndex + 1 ? "teal.500" : "gray.50"}
                      color={pageNumber === pageIndex + 1 ? "#fff" : "gray.600"}
                      _hover={{
                        bg: "teal.500",
                        opacity: "0.6",
                        color: "#fff",
                      }}
                    >
                      <Text fontSize={"2xs"}>{pageNumber}</Text>
                    </Button>
                  );
                })
              )}
              <Button
                variant={"no-hover"}
                onClick={() => nextPage()}
                transition={"all .5s ease"}
                size={"sm"}
                borderRadius={"full"}
                p={0}
                display={
                  pageSize === 5 ? "none" : canNextPage ? "flex" : "none"
                }
                color={"gray.400"}
                _hover={{
                  color: "gray.500",
                }}
              >
                <Icon as={IoChevronForwardOutline} w={"14px"} h={"14px"} />
              </Button>
            </Stack>
          </Flex>
        </CardBody>
      </Flex>
    </Card>
  );
}
