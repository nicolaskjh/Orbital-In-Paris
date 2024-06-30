import React from 'react';
import { View, Text, Image } from 'react-native';
import Header from '@/components/header';
import SearchButton from './searchButton';
import { FontAwesome } from '@expo/vector-icons';
import { format } from 'date-fns';

type FlightsDisplayProps = {
  booking: any;
  isPopupVisible: boolean;
  setPopupVisible:  React.Dispatch<React.SetStateAction<boolean>>;
};

const FlightsDisplay = ({booking, isPopupVisible, setPopupVisible}: FlightsDisplayProps) => {
  console.log(booking);

  return (
    <View className="flex h-2/5 w-full pt-8 pb-4 px-8">
      <View className="flex flex-row justify-start items-center w-full border">
        <FontAwesome name="plane" size={30} color="black" style={{paddingHorizontal: 16}}/>
        <Header text="Flight" size="md" padding="none"/>
        <SearchButton onPress={() => setPopupVisible(!isPopupVisible)}/>
      </View>
      {!booking &&
        <View className="flex h-3/4 items-center justify-center border-x border-b">
          <Text className="text-center text-gray-500">No flight booked</Text>
          <Text className="text-center text-gray-500">Click the search button to find a flight!</Text>
        </View>
      }
      {booking && 
        <View className="flex flex-row h-3/4 border-x border-b ">
          <View className="flex flex-col items-center justify-center w-full px-2">
            <View className="flex flex-row items-center justify-start w-full h-1/2 border-b border-gray-300">
              <Image source={{uri: booking[0].logo_outbound}} className="h-10 w-10 m-2"/>
              <View className="flex flex-col justify-center pl-2">
                <Text className="font-bold">{booking[0].origin_outbound} - {booking[0].destination_outbound} | {booking[0].airline_outbound}</Text>
                <Text className="text-xs">{format(new Date(booking[0].depature_outbound), 'd MMM yy')}</Text>
                <Text className="text-xs">{format(new Date(booking[0].depature_outbound), "HH:mm")} - {format(new Date(booking[0].arrival_outbound), "HH:mm")}</Text>
              </View>
            </View>
            <View className="flex flex-row items-center justify-start w-full h-1/2">
              <Image source={{uri: booking[0].logo_inbound}} className="h-10 w-10 m-2"/>
              <View className="flex flex-col justify-center pl-2">
                <Text className="font-bold">{booking[0].origin_inbound} - {booking[0].destination_inbound} | {booking[0].airline_inbound}</Text>
                <Text className="text-xs">{format(new Date(booking[0].depature_inbound), 'd MMM yy')}</Text>
                <Text className="text-xs">{format(new Date(booking[0].depature_inbound), "HH:mm")} - {format(new Date(booking[0].arrival_inbound), "HH:mm")}</Text>
              </View>
            </View>
          </View>
        </View>
      } 
    </View>
  );
};

export default FlightsDisplay;