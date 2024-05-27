import React from "react";
import { View, Image } from "react-native";

const background = require('@/assets/images/background.png')

const Background = () => {
  return (
    <View className="flex-1">
      <Image source={background} className="object-cover bg-fixed"/>
    </View>
  );
}

export default Background;