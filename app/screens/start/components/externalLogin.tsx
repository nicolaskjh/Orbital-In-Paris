import React from "react";
import { View, Text } from "react-native";
import ExternalLoginButton, {Strategy} from "./externalLoginButton";

const ExternalLogin = () => {
  return (
    <View className="flex flex-col w-full h-1/3 items-center p-2">
      <Text className="text-base mb-2">Continue with:</Text>
        <View className="flex flex-row justify-evenly items-center">
          <ExternalLoginButton icon="google" strategy={Strategy.Google}/>
          <ExternalLoginButton icon="apple1" strategy={Strategy.Apple}/>
          <ExternalLoginButton icon="facebook-square" strategy={Strategy.Facebook}/>
        </View>
    </View>
  );
}

export default ExternalLogin;
