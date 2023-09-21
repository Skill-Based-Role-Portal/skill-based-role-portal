import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { BiMoon, BiSun } from "react-icons/bi";

export const ColorModeSwitcher = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(BiMoon, BiSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} mode`}
      variant="none"
      color="gray.600"
      _dark={{ color: "gray.50" }}
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};
