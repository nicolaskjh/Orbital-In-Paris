import React from "react";
import { View } from "react-native";
import ExternalLoginButton, { Strategy } from "./externalLoginButton";

const ExternalLogin = () => {
  return (
    <View className="flex flex-row justify-evenly items-center">
      <ExternalLoginButton icon="google" strategy={Strategy.Google}/>
      <ExternalLoginButton icon="apple1" strategy={Strategy.Apple}/>
      <ExternalLoginButton icon="facebook-square" strategy={Strategy.Facebook}/>
    </View>
  );
}

export default ExternalLogin;
