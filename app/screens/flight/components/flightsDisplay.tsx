import React from 'react';
import { View, Text } from 'react-native';
import Header from '@/components/header';
import SearchButton from './searchButton';
import { FontAwesome } from '@expo/vector-icons';

type FlightsDisplayProps = {
  booking: any;
  isPopupVisible: boolean;
  setPopupVisible:  React.Dispatch<React.SetStateAction<boolean>>;
};

const FlightsDisplay = ({booking, isPopupVisible, setPopupVisible}: FlightsDisplayProps) => {
  return (
    <View className="flex h-1/3 w-full pt-8 pb-4 px-8">
      <View className="flex flex-row justify-start items-center w-full border">
        <FontAwesome name="plane" size={30} color="black" style={{paddingHorizontal: 16}}/>
        <Header text="Flight" size="md" padding="none"/>
        <SearchButton onPress={() => setPopupVisible(!isPopupVisible)}/>
      </View>
      {!booking &&
        <View className="flex h-2/3 items-center justify-center border-x border-b">
          <Text className="text-center text-gray-500">No flight booked</Text>
          <Text className="text-center text-gray-500">Click the search button to find a flight!</Text>
        </View>
      } 
    </View>
  );
};

export default FlightsDisplay;