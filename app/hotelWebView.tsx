import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

const HotelWebView = () => {
  const hotel = useLocalSearchParams();
  const url = hotel.url;

  return (
    <View className="flex-1">
      <WebView source={{uri: url}} style={{flex: 1}}/>
    </View>
  )
};

export default HotelWebView;