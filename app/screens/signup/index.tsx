import React from "react";
import { View } from "react-native";
import Logo from "@/components/logo";
import Header from "@/components/header";
import TextField from "@/components/textField";
import Button from "@/components/button";
import RedirectTo from "@/components/redirectTo";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from 'expo-router';

const SignupPage = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignupPress = async () => {
      if (!isLoaded) {
        return;
      }
  
      try {
        await signUp.create({
          emailAddress,
          password,
        });
  
        // send the email.
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
  
        // change the UI to our pending section.
        setPendingVerification(true);
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
      }
    };
  
    // This verifies the user using email code that is delivered.
    const onPressVerify = async () => {
      if (!isLoaded) {
        return;
      }
  
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        });
  
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('home')
      } catch (err: any) {
        alert(err.errors[0].message);
      }
    };

  return (
    <View>
      {!pendingVerification && (
        <View className="flex flex-col justify-between items-center h-full bg-white">
          <Logo/>
          <Header text="Signup Here!" size="lg"/>
          <View className="flex w-full h-2/5 items-center">
            <TextField placeholder="Email" value={emailAddress} secureEntry={false} borders="bottom" onChangeText={(emailAddress) => setEmailAddress(emailAddress)}/>
            <TextField placeholder="Password" value={password} secureEntry={true} borders="bottom" onChangeText={(password) => setPassword(password)}/>
            <View className="flex w-3/4 items-end">
              <Button type="plain" text="Signup" textType="normal" size="sm" corners="rounded" onPress={onSignupPress}/>
            </View>
            <RedirectTo redirect="login"/>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View className="flex flex-col justify-between items-center h-full bg-white">
          <Logo/>
          <Header text="Verify Your Email" size="lg"/>
          <View className="flex w-full h-2/5 items-center">
            <TextField placeholder="Verification Code" value={code} secureEntry={false} borders="bottom" onChangeText={(code) => setCode(code)}/>
            <View className="flex w-3/4 items-end">
              <Button type="plain" text="Verify Email" textType="normal" size="fit" corners="rounded" onPress={onPressVerify}/>
            </View>
          </View>
        </View>
      )}
  </View>
  );
}

export default SignupPage;