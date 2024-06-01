import React from "react";
import { View, Text } from "react-native";
import ExternalLoginButton from "./externalLoginButton";
import { useRouter } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook'
}

const ExternalLogin = () => {
  const router = useRouter();

  const { startOAuthFlow: googleAuth} = useOAuth({strategy: 'oauth_google'})
  const { startOAuthFlow: appleAuth} = useOAuth({strategy: 'oauth_apple'})
  const { startOAuthFlow: facebookAuth} = useOAuth({strategy: 'oauth_facebook'})

  const onSelectAuth = async (strategy:Strategy) => {
    const selectedAuth = {
      [Strategy.Google] : googleAuth,
      [Strategy.Apple] : appleAuth,
      [Strategy.Facebook] : facebookAuth,
    }[strategy];

    try {
      const {createdSessionId, setActive} = await selectedAuth();

      if (createdSessionId) {
        setActive!({session: createdSessionId});
        router.replace('home');
      } 
    } catch (err) {
        console.error('Auth error',err)
    }
  }

  return (
    <View className="flex flex-col w-full h-1/3 items-center p-2">
      <Text className="text-base mb-2">Continue with:</Text>
      <View className="flex flex-row justify-evenly items-center">
        <ExternalLoginButton icon="google" onPress={() => onSelectAuth(Strategy.Google)}/>
        <ExternalLoginButton icon="apple1" onPress={() => onSelectAuth(Strategy.Apple)}/>
        <ExternalLoginButton icon="facebook-square" onPress={() => onSelectAuth(Strategy.Facebook)}/>
      </View>
    </View>
  );
}

export default ExternalLogin;
