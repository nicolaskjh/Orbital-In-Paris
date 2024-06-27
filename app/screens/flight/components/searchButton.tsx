import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

type SearchButtonProps = {
  onPress: any;
};

const SearchButton = ({ onPress }: SearchButtonProps) => {
  return (
    <View className="flex-1 justify-center items-end px-4">
      <TouchableOpacity onPress={onPress} className="flex bg-white justify-center items-center">
        <EvilIcons name="search" size={30} color="black"/>
      </TouchableOpacity>
    </View>
  );
};

export default SearchButton;