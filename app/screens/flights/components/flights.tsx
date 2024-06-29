import React from 'react';
import { View, ScrollView } from 'react-native';
import Flight from './flight';

type FlightsProps = {
  flights: any[];
};

const Flights = ({flights}: FlightsProps) => {
  return (
    <View className="flex-1 flex-col w-full bg-white border-t mt-4">
      <ScrollView className="flex flex-col h-full w-full bg-white">
        {flights.map((flight, index) => (
          <Flight key={index} flight={flight}/>
        ))}
      </ScrollView>
    </View>
  )
};

export default Flights;