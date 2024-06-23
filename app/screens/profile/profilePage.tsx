import React from 'react';
import { View, Text } from 'react-native';
import ProfilePicture from '@/components/profilePicture';
import Header from '@/components/header';
import Button from '@/components/button';
import NavigationBar from '@/components/navigationBar';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter, Link } from 'expo-router';
import { useEffect } from 'react';
import { getProfile } from '@/utils/supabaseRequests';

const ProfilePage = () => {
  const [profile, setProfile] = React.useState([]); 
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();
  const {signOut, isSignedIn, getToken, userId} = useAuth();
  const {user} = useUser();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
      const token = await getToken({ template: 'supabase' });
      const profile = await getProfile({userId, token});
      setProfile(profile);
      setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, []);

  if (!isSignedIn) {
    router.replace('/');
  }

  return (
    <View className="flex-1 justify-between pt-24 bg-white">
      {!isLoading && (
        <>
      <View className="flex flex-row items-center pl-4">
        <ProfilePicture size="default"/>
        <Header text={`${profile[0].name}`} size="xl"/>
      </View>
      <View className="flex flex-col h-1/2 pt-4">
        <Header text="Date of Birth:" size='lg' padding='left'/>
        <Text className="pl-8 pb-4">{profile[0].dateOfBirth}</Text>
        <Header text="Country:" size='lg' padding='left'/>
        <Text className="pl-8 pb-4">{profile[0].country}</Text>
        <Header text="Interests:" size='lg' padding='left'/>
        <Text className="pl-8 pb-4">{profile[0].interests}</Text>
      </View>    
      <View className='flex flex-col w-full items-center'>
        <Button text="Update Profile" type="plain" textType="normal" size="lg" corners="rounded" onPress={() => router.replace('onboarding')}/>
        <Button text="Log Out" type="borderless" textType="normal" size="lg" corners="squared" onPress={() => signOut()}/>
      </View>
      <NavigationBar/>
      </>
    )}
      {!isSignedIn &&
          <Link href={'/index'}>
              <Text>Login</Text>
          </Link>
        } 
    </View>
  );
}

export default ProfilePage;