// General imports
import { useState } from "react";

// Chakra imports
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

// Icons
import { BiSearch, BiX } from "react-icons/bi";

export default function SearchBar({ onSearchChange, resetSearchChange }) {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSearchChange(newValue);
  };

  const resetSearch = () => {
    setValue("");
    onSearchChange("");
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" color="gray.500">
        <BiSearch />
      </InputLeftElement>
      <Input
        value={value}
        onChange={handleChange}
        variant={"outline"}
        size={"md"}
        fontSize={"sm"}
        placeholder={"Search..."}
        backgroundColor={"gray.50"}
        _dark={{
          backgroundColor: "gray.700",
          _placeholder: { color: "gray.400" },
        }}
        focusBorderColor={"pink.300"}
        _placeholder={{ opacity: 0.7, color: "gray.500" }}
        borderRadius={"md"}
      />
      {value && (
        <InputRightElement
          color="gray.500"
          fontSize={"lg"}
          onClick={resetSearch}
          cursor={"pointer"}
        >
          <BiX />
        </InputRightElement>
      )}
    </InputGroup>
  );
}
