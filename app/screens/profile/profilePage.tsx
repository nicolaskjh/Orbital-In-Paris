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
  const {user} = useUser();

  if (!isSignedIn) {
    router.replace('/');
  }

  return (
    <View className="flex-1 justify-between pt-20 bg-white">
      <View className="flex flex-row items-center pl-4">
        <ProfilePicture/>
        <Header text={`${user?.username == null ? "Update your username!" : user.username}`} size="xl"/>
      </View>
      <View className="flex flex-col h-1/2">
        <Header text="Date of Birth:" size='lg' padding='left'/>
        <Text className="pl-8">01.01.2001</Text>
        <Header text="Country:" size='lg' padding='left'/>
        <Text className="pl-8">Singapore</Text>
        <Header text="Interests:" size='lg' padding='left'/>
        <Text className="pl-8">Hiking, shopping, food</Text>
      </View>
      <View className='flex flex-col w-full items-center'>
        <Button text="Update Profile" type="plain" textType="normal" size="lg" corners="rounded"/>
        <Button text="Log Out" type="borderless" textType="normal" size="lg" corners="squared" onPress={()=> signOut()}/>
      </View>
      {!isSignedIn &&
          <Link href={'/index'}>
              <Text>Login</Text>
          </Link>
        } 
      <NavigationBar/>
    </View>
  );
}

export default ProfilePage;