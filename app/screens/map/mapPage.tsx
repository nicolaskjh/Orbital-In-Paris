import React, { useEffect, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import TextField from '@/components/textField';
import Header from '@/components/header';
import NavigationBar from '@/components/navigationBar';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import GooglePlacesInput from './components/autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';

const MapPage = () => {
  const [ location, setLocation ] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ origin, setOrigin ] = React.useState();
  const [ dest, setDest ] = React.useState();

  const mapRef = useRef(null);
  const GOOGLE_MAPS_API = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  const setOriginState = (location) => {
    console.log("setting lcoation")
    setOrigin(location);
  }

  const setDestState = (location) => {  
    setDest(location);
  }

  return (
    <View className="flex-1 flex-col justify-between items-center pt-20 bg-white">
      {/* <TextField placeholder="Search" value={location} type="full" secureEntry={false} onChangeText={(location) => setLocation(location)}/> */}
      <View className="flex-1 flex-col items-center">
          <View style = {{zIndex: 3, flex: 0.2, alignItems: 'center'}}>
            <GooglePlacesInput placeholder="Origin" mapRef = {mapRef} func ={setOriginState}/>
          </View>
          <View style = {{zIndex:2, flex: 0.2, alignItems: 'center'}}>
            <GooglePlacesInput placeholder="Destination" mapRef = {mapRef} func = {setDestState}/>
          </View>
        <View style = {{flex : 1, flexDirection:'row',zIndex:0}}>
          <MapView ref = {mapRef} style={{width: '100%', height: '100%'}} showsUserLocation={true} loadingEnabled={true} showsPointsOfInterest={true}>
          {origin != undefined ? <Marker coordinate={origin} title = "Origin"/> : null}
          {dest != undefined ? <Marker coordinate={dest} title = "Destination"/> : null}
          {origin != undefined && dest != undefined ? <MapViewDirections
            origin={origin}
            destination={dest}
            apikey= {GOOGLE_MAPS_API}
            strokeColor='red'
            strokeWidth={5}
          />: null}
          </MapView>
        </View>
      </View>
      <NavigationBar/>
    </View>
  );
}

export default MapPage;