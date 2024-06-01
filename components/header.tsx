import React from "react";
import { Text } from "react-native";

type HeaderProps = {
  text: String,
  size: "sm" | "md" | "lg" | "xl",
  padding: "left" | "none"
}

const Header = ( {text, size, padding}: HeaderProps ) => {
  const fontSize = size === "sm" ? "text-md" : size === "md" ? "text-base" : size === "lg" ? "text-lg": "text-2xl";
  const paddings = padding === "left" ? "ml-8" : "ml-0";

  return (
    <Text className={`font-bold font-sans my-4 ${paddings} ${fontSize}`}>{text}</Text>
  );
}

export default Header;