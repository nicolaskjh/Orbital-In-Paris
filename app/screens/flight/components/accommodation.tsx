import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import Header from '@/components/header';

const icon = require('@/assets/images/budget-page/accommodation.png');

const Accommodation = () => {
  return (
    <View className="flex h-1/2 w-full pt-4 pb-8 px-8">
      <View className="flex flex-row justify-start items-center w-full border">
        <Image source={icon} className="w-10 h-10 mx-2"/>
        <Header text="Accommodation" size="md" padding="none"/>
      </View>
      <ScrollView className="flex-1 border-x border-b">
      </ScrollView>
    </View>
  );
};

export default Accommodation;