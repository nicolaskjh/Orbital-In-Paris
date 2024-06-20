import React from 'react';
import { View, Text } from 'react-native';

type BalancePreviewProps = {
  balance: number;
}

const BalancePreview = ( {balance}: BalancePreviewProps ) => {
  return (
    <View className="flex flex-col justify-start w-full bg-white pt-2 pl-8">
      {balance < 0 ? (
        <Text className={`text-base font-bold text-red-500`}>You owe ${Math.abs(balance)} overall</Text>
      ) : balance > 0 ? (
        <Text className={`text-base font-bold text-green-500`}>You are owed ${balance} overall</Text>
      ) : (
        <Text className={`text-base font-bold`}>You owe ${balance} overall</Text>
      )}
    </View>
  )
}

export default BalancePreview;