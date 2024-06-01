import React from 'react';
import { View, Text } from 'react-native';
import Header from '@/components/header';
import Button from '@/components/button';
import TextField from '@/components/textField';
import NavigationBar from '@/components/navigationBar';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const NewTripPage = () => {
  const router = useRouter();
  const[country, setCountry] = useState("");
  const[city, setCity] = useState("");
  const[startDate, setStartDate] = useState("");
  const[endDate, setEndDate] = useState("");

  return (
    <View className="flex flex-col h-full justify-between bg-white pt-24">
      <Header text="Plan a New Trip!" size="xl" padding="left"/>
      <View className="flex flex-col h-3/5 w-full items-center pt-10">
        <TextField placeholder="Country" value={country} onChangeText={setCountry}/>
        <TextField placeholder="City" value={city} onChangeText={setCity}/>
        <TextField placeholder="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate}/>
        <TextField placeholder="End Date (YYYY-MM-DD)" value={endDate} onChangeText={setEndDate}/>
      </View>
      <View className="flex h-1/6 w-full items-center">
        <Button text="Create Trip" type="plain" textType="bold" size="lg" corners="rounded" onPress={() => router.replace('trip')}/>
      </View>
      <NavigationBar/>
    </View>
  )
}

export default NewTripPage;