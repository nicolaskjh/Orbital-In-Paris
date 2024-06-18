import React from 'react';
import { View } from 'react-native';
import Button from '@/components/button';

type BudgetTabsProps = {
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
};

const BudgetTabs = ( {display, setDisplay}: BudgetTabsProps ) => {
  return (
    <View className="flex flex-row w-full items-center justify-between pt-2 px-8">
      <Button text="View Expenses" type="plain" textType="normal" fontSize="sm" corners="rounded" size="fitPadding" onPress={() => setDisplay('expenses')}/>
      <Button text="Balances" type="plain" textType="normal" fontSize="sm" corners="rounded" size="fitPadding" onPress={() => setDisplay('balances')}/>
      <Button text="Total Expenses" type="plain" textType="normal" fontSize="sm" corners="rounded" size="fitPadding" onPress={() => setDisplay('total')}/>
    </View>
  );
}

export default BudgetTabs;