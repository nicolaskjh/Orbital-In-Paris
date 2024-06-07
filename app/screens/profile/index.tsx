import React from 'react';
import { View, Text } from 'react-native';
import ProfilePicture from '@/components/profilePicture';
import Header from '@/components/header';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter, Link } from 'expo-router';

type ProfilePageProps = {
  name: string,
};

const ProfilePage = ( {name}: ProfilePageProps ) => {
  const router = useRouter();
  const {signOut, isSignedIn} = useAuth();

  if (!isSignedIn) {
    router.replace('/');
  }

  return (
    <View className="flex-1 justify-between pt-24 bg-white">
      <View className="flex flex-row items-center pl-4">
        <ProfilePicture/>
        <Header text="Javier" size="xl"/>
      </View>
      <View className="flex flex-col h-1/2 pl-4">
        <Header text="Date of Birth:" size='lg'/>
        <Text className="pl-4">01.01.2001</Text>
        <Header text="Country:" size='lg'/>
        <Text className="pl-4">Singapore</Text>
        <Header text="Interests:" size='lg'/>
        <Text className="pl-4">Zazu</Text>
      </View>
      <View className='flex flex-col w-full items-center'>
        <Button text="Update Profile" type="plain" textType="normal" size="lg" corners="rounded" onPress={() => router.replace('login')}/>
        <Button text="Log Out" type="borderless" textType="normal" size="lg" corners="squared" onPress={()=> signOut()}/>
      </View>
      <NavigationBar/>
    </View>
  );
}

export default ProfilePage;