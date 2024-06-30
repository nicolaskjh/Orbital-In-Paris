import React from 'react';
import { View, Image, Text } from 'react-native';
import Button from '@/components/button';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { setAccoms } from '@/utils/supabaseRequests';
import { set } from 'date-fns';
import { de } from 'date-fns/locale';

type HotelProps = {
  hotel: any;
  metadata : any
};

const Hotel = ({hotel, metadata}: HotelProps) => {
  const router = useRouter();
  const {userId, getToken} = useAuth();

  const handleOnPress = async () => {
    const token = await getToken({ template: 'supabase' });
    const details = {
      name : hotel.hotel_name,
      address : hotel.address,
      image : hotel.max_1440_photo_url,
      checkin_date : metadata.checkin_date,
      checkout_date : metadata.checkout_date,
      itinerary : metadata.itinerary_id,
    }
    const trips = {
      city : metadata.city,
      country : metadata.country,
      start_date : metadata.start_date,
      end_date : metadata.end_date,
      id : metadata.itinerary_id
    }
    console.log(trips)
    const res = await setAccoms({token, details, userId});
    router.push({pathname: 'flight', params: trips});
  }

  return (
    <View className="flex flex-row justify-between w-full bg-white border-b border-gray-500 p-2">
      <View className="flex flex-col items-center justify-center w-1/4">
        <Image source={{uri: hotel.max_1440_photo_url}} className="h-20 w-20"/>
      </View>
      <View className="flex flex-col w-1/2 px-2">
       <Text className="text-sm font-bold">{hotel.accommodation_type_name}</Text>
       <Text className="text-xs">{hotel.hotel_name}</Text>
       <Text className="text-xs">{hotel.address}, {hotel.zip}</Text>
      </View>
      <View className="flex flex-col items-center justify-center w-1/4">
        <Text className="text-xs font-bold">{hotel.price_breakdown.all_inclusive_price} {hotel.price_breakdown.currency}</Text>
        <Text className="text-xs pb-1">{hotel.review_score}/10</Text>
        <Button text="Book Now!" fontSize="sm" type="borderless" size="fit" corners="rounded" margins={false} onPress={() => router.push({pathname: 'hotelWebView', params: {url: hotel.url}})}/>
        <Button text="Add to Trip" fontSize="sm" type="borderless" size="fit" corners="rounded" margins={false} onPress = {handleOnPress}/>
      </View>
    </View>
  )
};

export default Hotel;