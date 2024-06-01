import React from "react";
import { View, Text } from "react-native";

type WelcomeMessageProps = {
  name: string
}

const WelcomeMessage = ( {name} : WelcomeMessageProps ) => {
  return (
    <View className="flex flex-col h-1/2 pt-24 pl-8">
      {name == 'null' && (<Text className="text-3xl font-bold">Welcome!</Text>)}
      {name != 'null' && (<Text className="text-3xl font-bold">Welcome, {name}!</Text>)}
    </View>
  );
}

export default WelcomeMessage;