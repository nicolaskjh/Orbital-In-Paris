import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import TextField from '@/components/textField';
import Header from '@/components/header';
import NavigationBar from '@/components/navigationBar';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';

const MapPage = () => {
  const [ location, setLocation ] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(true);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    getCurrentPosition();
    setIsLoading(false);
  }, []);

  return (
    <View className="flex-1 flex-col justify-between items-center pt-20 bg-white">
      <TextField placeholder="Search" value={location} type="full" secureEntry={false} onChangeText={(location) => setLocation(location)}/>
      <Text>Coming soon!</Text>
      <MapView showsUserLocation = {true} loadingEnabled={true}></MapView>
      <NavigationBar/>
    </View>
  );
}

export default MapPage;