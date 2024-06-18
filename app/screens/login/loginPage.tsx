import React from "react";
import { View } from "react-native";
import Logo from "@/components/logo";
import Header from "@/components/header";
import TextField from "@/components/textField";
import ForgotPassword from "./components/forgotPassword";
import Button from "@/components/button";
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const LoginPage = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();

  const [ emailAddress, setEmailAddress ] = React.useState("");
  const [ password, setPassword ] = React.useState("");


  const onLoginPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
      router.replace('home');
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  }

  return (
    <View className="flex-1 flex-col justify-between items-center bg-white">
      <Logo/>
      <Header text="Login Here!" size="lg"/>
      <View className="flex w-full h-2/5 items-center">
        <TextField placeholder="Email" value={emailAddress} secureEntry={false} onChangeText={(emailAddress) => setEmailAddress(emailAddress)}/>
        <TextField placeholder="Password" value={password} secureEntry={true} onChangeText={(password) => setPassword(password)}/>
        <View className="flex flex-row w-3/4 justify-between">
          <ForgotPassword/>
          <Button type="plain" text="Login" textType="normal" size="sm" corners="rounded" onPress={onLoginPress}/>
        </View>
        <Button type="borderless" text="Don't have an account?" textType="normal" size="lg" corners="rounded" onPress={() => router.replace('signup')}/>
      </View>  
    </View>
  );
};

export default LoginPage;