import React from "react";
import { TextInput } from "react-native";

type TextFieldProps = {
  placeholder: string,
  value: string,
  secureEntry: boolean
  onChangeText: (text: string) => void
}

const TextField = ( {placeholder, value, secureEntry, onChangeText}: TextFieldProps ) => {
  return (
    <TextInput 
      className="w-3/4 m-2 border-b"
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
