import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useRef } from 'react';

type GooglePlacesInputProps = { 
  placeholder: string,
  mapRef: any,
  func: any
}

const GooglePlacesInput = ({placeholder,mapRef,func}: GooglePlacesInputProps) => {
  async function moveToLocation(latitude,longitude,mapRef) {
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },2000);
    const location = {
      latitude,
      longitude
    }
    func(location);
  }

  return (
    <GooglePlacesAutocomplete
      placeholder="Hello"
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        moveToLocation(details?.geometry?.location.lat,details?.geometry?.location.lng ,mapRef);
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        language: 'en',
      }}
      styles={{
        container: {
          flex: 1,
        },
        textInputContainer: {
          width: '100%',
          borderWidth: 1,
          borderRadius: 24,
          paddingHorizontal: 8,
          paddingTop: 4,
          
        },
        textInput: {
          height: 38,
          color: 'black',
          fontSize: 14,
          placeholder: "hello",
          placeholderTextColor: 'black'
        },
        listView: {
        },
        row: {
          backgroundColor: 'white',
          padding: 13,
          height: 44,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
  );
};

export default GooglePlacesInput;