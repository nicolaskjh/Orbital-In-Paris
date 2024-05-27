import React from "react";
import { View, Text } from "react-native";
import Logo from "@/components/logo";
import Header from "@/components/header";
import Button from "@/components/button";
import ExternalLogin from "./components/externalLogin";
import { useRouter } from 'expo-router';

const StartPage = () => {
  const router = useRouter();

  return (
    <View className="flex flex-col justify-between items-center h-full bg-white">
      <Logo/>
      <Header text="Your all in one travel essentials app" size="lg"/>
      <View className="flex flex-col w-full h-1/10 items-center justify-between">
        <Button type="plain" text="Login" textType="solid" size="lg" onPress={() => router.push('login')}/>
        <Button type="plain" text="Signup" textType="solid" size="lg" onPress={() => router.push('signup')}/>
      </View>
      <View className="flex w-full h-1/3 items-center">
        <Text className="text-base mb-2">Continue with:</Text>
        <ExternalLogin/>
      </View>
    </View>
  );
};

export default StartPage;