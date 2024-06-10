import React from 'react';
import { View } from 'react-native';
import Header from '@/components/header';
import ProfilePicture from '@/components/profilePicture';
import Button from '@/components/button';
import TextField from '@/components/textField';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const OnboardingPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState(''); 
  const [interests, setInterests] = useState('');

  return (
    <View className="flex flex-col h-full w-full items-center justify-between bg-white pt-20">
      <Header text="Tell us more about yourself!" size="xl"/>
      <View className="flex justify-center items-center h-1/3 pt-8">
        <ProfilePicture size="lg"/>
        <Button text="Upload profile picture" type="borderless" size="fit"/>
      </View>
      <View className="flex flex-col h-1/4 w-full justify-center items-center">
        <TextField placeholder="Name" value={name} onChangeText={(name) => setName(name)}/>
        <TextField placeholder="Date of birth" value={dateOfBirth} onChangeText={(dateOfBirth) => setDateOfBirth(dateOfBirth)}/>
        <TextField placeholder="Country" value={country} onChangeText={(country) => setCountry(country)}/>
        <TextField placeholder="Interests" value={interests} onChangeText={(interests) => setInterests(interests)}/>
      </View>
      <View className="flex h-1/3 w-full items-center">
        <Button text="Complete signup" type="plain" size="lg" corners="rounded" onPress={() => router.replace('home')}/>
      </View>
    </View>
  );
};

export default OnboardingPage