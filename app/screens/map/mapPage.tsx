import React from 'react';
import { View } from 'react-native';
import TextField from '@/components/textField';
import Header from '@/components/header';
import NavigationBar from '@/components/navigationBar';

const MapPage = () => {
  const [ location, setLocation ] = React.useState("");

  return (
    <View className="flex-1 flex-col justify-between items-center pt-20 bg-white">
      <TextField placeholder="Search" value={location} border="full" secureEntry={false} onChangeText={(location) => setLocation(location)}/>
      <NavigationBar/>
    </View>
  );
}

export default MapPage;