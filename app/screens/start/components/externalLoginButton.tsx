import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook'
}

type ExternalLoginButtonProps = {
  icon: string,
  strategy: Strategy,
  onPress: () => void,
}

const ExternalLoginButton = ( {icon, strategy, onPress } : ExternalLoginButtonProps ) => {

  return (
    <TouchableOpacity className="border rounded-full mx-1.5 mb-10 p-2 items-center" onPress={onPress}>
      <AntDesign name={icon} size={35} />
    </TouchableOpacity>
  );
}

export default ExternalLoginButton;
export { Strategy };