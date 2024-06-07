import React from "react";
import { Text } from "react-native";

type HeaderProps = {
  text: String,
  size: "sm" | "md" | "lg" | "xl",
  padding: "left" | "none"
  verticalPadding: true | false
}

const Header = ( {text, size, padding, verticalPadding}: HeaderProps ) => {
  const fontSize = size === "sm" ? "text-md" : size === "md" ? "text-base" : size === "lg" ? "text-lg": "text-2xl";
  const paddings = padding === "left" ? "ml-8" : "ml-0";
  const verticalPaddings = verticalPadding === false ? "" : "py-4";

  return (
    <Text className={`font-bold font-sans ${verticalPaddings} ${paddings} ${fontSize}`}>{text}</Text>
  );
}

export default Header;