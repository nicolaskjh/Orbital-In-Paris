import React from "react";
import { View, Image } from "react-native";

const logo = require('@/assets/images/logo.png');

const Logo = () => {
  return (
    <Image source={logo} className="object-scale-down overflow-visible w-3/5 h-1/4 mt-40"/>
  );
};

export default Logo;