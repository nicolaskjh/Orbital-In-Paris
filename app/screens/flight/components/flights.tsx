import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/components/header';
import { FontAwesome } from '@expo/vector-icons';

const Flights = () => {
  return (
    <View className="flex h-1/2 w-full pt-8 pb-4 px-8">
      <View className="flex flex-row justify-start items-center w-full border">
        <FontAwesome name="plane" size={30} color="black" style={{paddingHorizontal: 16}}/>
        <Header text="Flights" size="md" padding="none"/>
      </View>
      <ScrollView className="flex-1 border-x border-b">
      </ScrollView>
    </View>
  );
};

export default Flights;