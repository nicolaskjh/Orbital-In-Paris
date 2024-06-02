import React from "react";
import { View, Image } from "react-native";

const logo = require('@/assets/images/logo.png');

const Logo = () => {
  return (
    <Image source={logo} className="w-80 h-60 scale-90 mt-40"/>
  );
};

export default Logo;