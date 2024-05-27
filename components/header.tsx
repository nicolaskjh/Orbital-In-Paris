import React from "react";
import { Text } from "react-native";

type HeaderProps = {
  text: String,
  size: "sm" | "md" | "lg" | "xl"
}

const Header = ( {text, size}: HeaderProps ) => {
  const fontSize = size === "sm" ? "text-md" : size === "md" ? "text-base" : size === "lg" ? "text-lg": "text-2xl";

  return (
    <Text className={`font-bold font-sans m-4 ${fontSize}`}>{text}</Text>
  );
}

export default Header;