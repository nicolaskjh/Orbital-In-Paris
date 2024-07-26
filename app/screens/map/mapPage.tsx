import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import TextField from '@/components/textField';
import Header from '@/components/header';
import NavigationBar from '@/components/navigationBar';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import GooglePlacesInput from './components/autocomplete';

const MapPage = () => {
  const [ location, setLocation ] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(true);

  return (
    <View className="flex-1 flex-col justify-between items-center pt-20 bg-white">
      {/* <TextField placeholder="Search" value={location} type="full" secureEntry={false} onChangeText={(location) => setLocation(location)}/> */}
      <GooglePlacesInput placeholder="Origin"/>
      <GooglePlacesInput placeholder="Destination"/>
      <MapView style={{width: '100%', height: '82.5%'}} showsUserLocation={true} loadingEnabled={true}/>
      <NavigationBar/>
    </View>
  );
}

export default MapPage;