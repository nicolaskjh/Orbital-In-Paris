import React from 'react';
import { View, Text, Image } from 'react-native';
import Button from '@/components/button';
import { format } from 'date-fns';

type FlightProps = {
  flight: any;
};

/* 
  Data Schema:
  Price = flight.price.formatted
  (Outbound)
  Origin airport = flight.legs[0].origin.id
  Destination airport = flight.legs[0].destination.id
  Depature dateTime = flight.legs[0].depature
  Arrival dateTime = flight.legs[0].arrival
  Airline = flight.legs[0].carriers.marketing[0].name
  AirlineLogo = flight.legs[0].carriers.marketing[0].logoUrl
  (Inbound)
  Origin airport = flight.legs[1].origin.id
  Destination airport = flight.legs[1].destination.id
  Depature dateTime = flight.legs[1].depature
  Arrival dateTime = flight.legs[1].arrival
  Airline = flight.legs[1].carriers.marketing[0].name
  AirlineLogo = flight.legs[1].carriers.marketing[0].logoUrl
  */

const Flight = ({flight}: FlightProps) => {
  return (
    <View className="flex flex-row w-full border-b border-gray-500 px-4 py-2">
      <View className="flex flex-col justify-between items-center w-3/4 pr-2">
        <View className="flex flex-row justify-start items-center w-full border-b border-gray-300 pb-1">
          <Image source={{uri: flight.legs[0].carriers.marketing[0].logoUrl}} className="h-10 w-10 m-2"/>
          <View className="flex flex-col w-full px-4">
            <Text className="text-sm font-bold">{flight.legs[0].origin.id} - {flight.legs[0].destination.id} | {flight.legs[0].carriers.marketing[0].name}</Text>
            <Text className="text-xs">{format(new Date(flight.legs[0].departure), 'd MMM yy')}</Text>
            <Text className="text-xs">{format(new Date(flight.legs[0].departure), "HH:mm")} - {format(new Date(flight.legs[0].arrival), "HH:mm")}</Text>
          </View>
        </View>
        <View className="flex flex-row justify-start items-center w-full pt-1">
          <Image source={{uri: flight.legs[1].carriers.marketing[0].logoUrl}} className="h-10 w-10 m-2"/>
          <View className="flex flex-col w-full px-4">
            <Text className="text-sm font-bold">{flight.legs[1].origin.id} - {flight.legs[1].destination.id} | {flight.legs[1].carriers.marketing[0].name}</Text>
            <Text className="text-xs">{format(new Date(flight.legs[1].departure), 'd MMM yy')}</Text>
            <Text className="text-xs">{format(new Date(flight.legs[1].departure), "HH:mm")} - {format(new Date(flight.legs[1].arrival), "HH:mm")}</Text>
          </View>
        </View>
      </View>
      <View className="flex flex-col justify-center items-center w-1/4">
        <Text className="text-sm font-bold">{flight.price.formatted}</Text>
        <Button text="Add to Trip" fontSize="sm" type="borderless" size="fit" corners="rounded" margins={false} onPress={() => {}}/>
      </View>
    </View>
  );
};

export default Flight;
