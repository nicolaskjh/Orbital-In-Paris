import React from 'react';
import { View, Image, Text } from 'react-native';
import Button from '@/components/button';
import { useRouter } from 'expo-router';

type HotelProps = {
  hotel: any;
};

const Hotel = ({hotel}: HotelProps) => {
  const router = useRouter();

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
        <Button text="Add to Trip" fontSize="sm" type="borderless" size="fit" corners="rounded" margins={false}/>
      </View>
    </View>
  )
};

export default Hotel;