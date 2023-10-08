// General imports
import { useState } from "react";

// Chakra imports
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
} from "@chakra-ui/react";

// Icons
import { BiChevronDown } from "react-icons/bi";

export default function SortBar({ onSortChange }) {
  const [value, setValue] = useState("Default");

  const handleChange = (newValue) => {
    setValue(newValue);
    onSortChange(newValue);
  };

  return (
    <Menu closeOnSelect={true}>
      <MenuButton
        as={Button}
        rightIcon={<BiChevronDown size={"18"} />}
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
        Sort By: {value}
      </MenuButton>
      <MenuList fontSize={"sm"}>
        <MenuOptionGroup
          defaultValue="asc"
          fontSize={"xs"}
          type="radio"
          value={value}
          onChange={(newValue) => handleChange(newValue)}
        >
          <MenuItemOption value="Default">Default</MenuItemOption>
          <MenuItemOption value="Recommended">Recommended</MenuItemOption>
          <MenuItemOption value="Name (Ascending)">
            Name (Ascending)
          </MenuItemOption>
          <MenuItemOption value="Name (Descending)">
            Name (Descending)
          </MenuItemOption>
          <MenuItemOption value="Created (Most Recent)">
            Created (Most Recent)
          </MenuItemOption>
          <MenuItemOption value="Created (Oldest)">
            Created (Oldest)
          </MenuItemOption>
          <MenuItemOption value="Deadline (Most Recent)">
            Deadline (Most Recent)
          </MenuItemOption>
          <MenuItemOption value="Deadline (Oldest)">
            Deadline (Oldest)
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
