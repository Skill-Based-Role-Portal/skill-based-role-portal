// Chakra imports
import {
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  Heading,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Icon,
} from "@chakra-ui/react";

// Helpers
import TimeAgo from "../helper/TimeAgo";

// Icons
import { BiBookmark, BiBriefcase, BiMap, BiTimeFive } from "react-icons/bi";

export default function RoleListing(props) {
  const { role, clickedId } = props;

  const handleClick = () => {
    clickedId(role.role_id);
  };

  return (
    <Flex w={"full"} cursor="pointer" onClick={handleClick}>
      <Card
        w={"full"}
        variant={"outline"}
        backgroundColor={"gray.50"}
        _dark={{ backgroundColor: "gray.800" }}
      >
        <CardBody color={"gray.700"} _dark={{ color: "gray.400" }}>
          <Flex justifyContent={"space-between"} mb={4}>
            <Box>
              <Text
                fontSize={"sm"}
                fontWeight={"medium"}
                mb={0.5}
                color={"gray.500"}
              >
                {role.department}
              </Text>
              <Heading fontSize={"lg"} fontWeight={"semibold"} mb={1}>
                {role.name}
              </Heading>
              <Flex
                alignItems={"center"}
                color={"gray.600"}
                _dark={{ color: "gray.500" }}
              >
                <Icon as={BiMap} mr={0.5} w={4} h={4} />
                <Text fontSize={"sm"} fontWeight={"medium"}>
                  {role.location}
                </Text>
              </Flex>
            </Box>
            <IconButton
              variant={"outline"}
              aria-label="Bookmark role listing"
              size={"sm"}
              icon={<BiBookmark />}
              color={"gray.500"}
            />
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex>
              <Tag
                size={"sm"}
                variant={"subtle"}
                px={2.5}
                py={1.5}
                colorScheme={"gray"}
                backgroundColor={"gray.200"}
                color={"gray.600"}
                _dark={{ color: "gray.400", backgroundColor: "gray.700" }}
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
                px={2.5}
                py={1.5}
                colorScheme={"gray"}
                backgroundColor={"gray.200"}
                color={"gray.600"}
                _dark={{ color: "gray.400", backgroundColor: "gray.700" }}
              >
                <TagLeftIcon as={BiTimeFive} />
                <TagLabel fontWeight={"semibold"} fontSize={"xs"}>
                  {role.employment_type}
                </TagLabel>
              </Tag>
            </Flex>
            <Text fontSize={"xs"} fontWeight={"medium"} color={"gray.500"}>
              {TimeAgo(role.created)}
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
