import React from "react";
import { TextInput } from "react-native";

type TextFieldProps = {
  placeholder: string,
  value: string,
  secureEntry: boolean
  type: "full" | "sm" | "default"
  onChangeText: (text: string) => void
}

const TextField = ( {placeholder, value, secureEntry, type, onChangeText}: TextFieldProps ) => {
  const borders = type === "full" ? "border rounded-full p-2 pl-2" : "border-b";
  const width = type === "full" ? "w-4/5" : type === "sm" ? "w-1/5" : "w-3/4";
  const height = type === "full" ? "h-10" : ""

  return (
    <TextInput 
      className={`m-2 ${height} ${width} ${borders}`}
      autoCapitalize="none"
      placeholder={placeholder}
      placeholderTextColor="grey"
      value={value}
      secureTextEntry={secureEntry}
      onChangeText={onChangeText}
    />
  );
}

export default TextField;
