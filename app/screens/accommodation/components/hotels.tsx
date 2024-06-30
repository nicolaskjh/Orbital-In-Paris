import React from 'react';
import { View, ScrollView } from 'react-native';
import Hotel from './hotel';

type HotelsProps = {
  hotels: any[];
  metadata : any
};

const Hotels = ({hotels, metadata}: HotelsProps) => {
  console.log(metadata)
  return (
    <View className="flex-1 flex-col w-full bg-white border-t mt-4">
      <ScrollView className="flex flex-col h-full w-full bg-white">
        {hotels.map((hotel, index) => (
          <Hotel key={index} hotel={hotel} metadata = {metadata}/>
        ))}
      </ScrollView>
    </View>
  )
};

export default Hotels;