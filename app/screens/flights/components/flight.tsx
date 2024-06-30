import React from 'react';
import { View, Text, Image } from 'react-native';
import Button from '@/components/button';
import { format } from 'date-fns';
import { useAuth } from '@clerk/clerk-react';
import { setFlights } from '@/utils/supabaseRequests';
import Flights from './flights';
import { useRouter } from 'expo-router';

type FlightProps = {
  flight: any,
  trip: any
};

const Flight = ({flight, trip}: FlightProps) => {
  const router = useRouter();
  const {userId, getToken} = useAuth();
  const handleOnPress = async () => {
    const token = await getToken({ template: 'supabase' });
    const details = {
      itinerary: trip.id,
      origin_outbound: flight.legs[0].origin.id,
      destination_outbound: flight.legs[0].destination.id ,
      depature_outbound: flight.legs[0].departure ,
      arrival_outbound: flight.legs[0].arrival ,
      airline_outbound: flight.legs[0].carriers.marketing[0].name,
      logo_outbound : flight.legs[0].carriers.marketing[0].logoUrl,
      origin_inbound: flight.legs[1].origin.id,
      destination_inbound: flight.legs[1].destination.id,
      depature_inbound: flight.legs[1].departure,
      arrival_inbound: flight.legs[1].arrival,
      airline_inbound: flight.legs[1].carriers.marketing[0].name,
      logo_inbound : flight.legs[1].carriers.marketing[0].logoUrl,
      price : flight.price.formatted
    }
    const res = await setFlights({token, details, userId});
    router.push({pathname: 'flight', params: trip});
  }

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
        <Button text="Add to Trip" fontSize="sm" type="borderless" size="fit" corners="rounded" margins={false} onPress={handleOnPress}/>
      </View>
    </View>
  );
};

export default Flight;
