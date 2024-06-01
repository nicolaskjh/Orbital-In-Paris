import React from "react";
import { TextInput } from "react-native";

type TextFieldProps = {
  placeholder: string,
  value: string,
  secureEntry: boolean
  border: "full" | "bottom"
  onChangeText: (text: string) => void
}

const TextField = ( {placeholder, value, secureEntry, border, onChangeText}: TextFieldProps ) => {
  const borders = border === "full" ? "border rounded-full p-2 pl-2" : "border-b";
  const width = border === "full" ? "w-4/5" : "w-3/4";
  const height = border === "full" ? "h-10" : ""

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
