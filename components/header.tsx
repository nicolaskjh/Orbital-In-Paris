import React from "react";
import { Text } from "react-native";

type HeaderProps = {
  text: String,
  size: "sm" | "md" | "lg"
}

const Header = ( {text, size}: HeaderProps ) => {
  const fontSize = size === "sm" ? "text-md" : size === "md" ? "text-base" : "text-lg";

  return (
    <Text className={`font-bold font-sans m-4 ${fontSize}`}>{text}</Text>
  );
}

export default Header;