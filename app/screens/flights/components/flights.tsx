import React from 'react';
import { View, ScrollView } from 'react-native';
import Flight from './flight';

type FlightsProps = {
  flights: any[],
  trip : any
};

const Flights = ({flights, trip}: FlightsProps) => {
  console.log(trip)
  return (
    <View className="flex-1 flex-col w-full bg-white border-t mt-4">
      <ScrollView className="flex flex-col h-full w-full bg-white">
        {flights.map((flight, index) => (
          <Flight key={index} flight={flight} trip = {trip}/>
        ))}
      </ScrollView>
    </View>
  )
};

export default Flights;