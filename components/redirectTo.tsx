import React from "react";
import { View, Text } from "react-native";
import Button from "@/components/button";
import { useRouter } from 'expo-router';

type RedirectToProps = {
  redirect: "login" | "signup"
}

const RedirectTo = ( {redirect}: RedirectToProps ) => {
  const router = useRouter();
  const text = redirect === "login" ? "Already have an account?" : "Don't have an account?"
  const buttonText = redirect === "login" ? "Login Here!" : "Signup Here!"
  const path = redirect === "login" ? 'login' : 'signup'

  return (
    <View className="flex flex-col w-full items-center m-10">
      <Text className="text-base mb-2">{text}</Text>
      <Button text={buttonText} textType="normal" size="lg" type="plain" corners="rounded" onPress={() => router.replace(`${path}`)}/>
    </View>
  );
}

export default RedirectTo;