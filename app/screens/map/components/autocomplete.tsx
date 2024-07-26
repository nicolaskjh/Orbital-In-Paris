import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

type GooglePlacesInputProps = { 
  placeholder: string
}

const GooglePlacesInput = ({placeholder}: GooglePlacesInputProps) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
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
          width: '80%',
          borderWidth: 1,
          borderRadius: 24,
          paddingHorizontal: 8,
          paddingTop: 4,
        },
        textInput: {
          height: 38,
          color: 'black',
          fontSize: 14,
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