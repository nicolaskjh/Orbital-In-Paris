import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { eachDayOfInterval, eachWeekOfInterval, addDays, subDays, format } from 'date-fns';
import PagerView from 'react-native-pager-view';
import { AntDesign } from '@expo/vector-icons';

const dates = eachWeekOfInterval({
  start: subDays(new Date(), 14),
  end: addDays(new Date(), 14)
}).reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({ 
    start: cur, 
    end: addDays(cur, 6) 
  });

  acc.push(allDays);

  return acc;
}, []);

const DateSlider = () => {
  return (
    <PagerView style={{height: "60%"}}>
      {dates.map((week, index) => {
        return ( 
          <View key={index}>
            <View className="flex flex-row items-center justify-between px-8">
              <AntDesign name="left" size={20} color="black" />
              {week.map((day, index) => {
                const dayOfWeek = format(day, 'EEEEE')
                
                return (
                  <TouchableOpacity key={index} className="items-center justify-center rounded-full w-10 h-10 p-1">
                    <Text className="font-bold">{dayOfWeek}</Text>
                    <Text>{day.getDate()}</Text>
                  </TouchableOpacity>
                )
              })}
              <AntDesign name="right" size={0} color="black" />
            </View>
          </View>
        )
      })}
    </PagerView>
  )
}

export default DateSlider;