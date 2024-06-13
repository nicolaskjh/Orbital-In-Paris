import React from "react";
import { View, Text } from "react-native";
import Logo from "@/components/logo";
import Header from "@/components/header";
import Button from "@/components/button";
import { useRouter } from 'expo-router';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'

const StartPage = () => {
  useWarmUpBrowser();
  const router = useRouter();

  return (
    <View className="flex flex-col justify-between items-center h-full bg-white">
      <Logo/>
      <View className="flex flex-col justify-start items-center h-1/2 w-full">
        <Header text="Your all in one travel essentials app" size="lg"/>
        <Button type="plain" text="Login" textType="bold" size="lg" corners="squared" onPress={() => router.replace('login')}/>
        <Button type="plain" text="Signup" textType="bold" size="lg" corners="squared" onPress={() => router.replace('signup')}/>
      </View>
    </View>
  );
};

export default StartPage;