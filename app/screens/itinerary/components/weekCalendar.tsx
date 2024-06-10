import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { addDays, subDays, format, getDate, startOfWeek, endOfWeek, isSameDay, isWithinInterval } from 'date-fns';
import { AntDesign } from '@expo/vector-icons';

type WeekCalendarProps = {
  date: Date;
  tripStart: Date;
  tripEnd: Date;
  onSelectDate: (date: Date) => void;
}

type Week = {
  dayOfWeek: string,
  date: Date,
  day: number
}

const WeekCalendar = ({date, tripStart, tripEnd, onSelectDate}: WeekCalendarProps) => {
  const [week, setWeek] = useState<Week[]>([]);

  useEffect (() => {
    const days = getWeekDays(date);
    setWeek(days);
  }, [date]);

  const previousWeek = () => {
    const newDate = subDays(date, 7);
    if (endOfWeek(newDate) >= tripStart) {
      onSelectDate(endOfWeek(newDate));
    }
  };
  
  const nextWeek = () => {
    const newDate = addDays(date, 7);
    if (startOfWeek(newDate) <= tripEnd) {
      onSelectDate(startOfWeek(newDate));
    }
  };

  const dateInRange = (day: Date) => {
    return isWithinInterval(day, { start: tripStart, end: tripEnd })
  }

  return (
    <View className="flex flex-row items-center justify-between px-6 pt-4 pb-2">
      <TouchableOpacity 
        className="flex items-center justify-center p-2"
        onPress={() => previousWeek()}>
        <AntDesign name="left" size={20} color="black"/>
      </TouchableOpacity>
      {week.map((day) => {
        const isSelected = isSameDay(day.date, date)
        const isWithinRange = dateInRange(day.date)

        return (
          <TouchableOpacity 
            key={day.day}
            className={`items-center justify-center rounded-full w-10 h-10 p-1 ${isSelected ? 'bg-gray-300' : ''}`}
            onPress={() => isWithinRange && onSelectDate(day.date)}
            disabled={!isWithinRange}>
            <Text className={`font-bold ${!isWithinRange ? 'text-gray-300' : ''}`}>{day.dayOfWeek}</Text>
            <Text className={`${!isWithinRange ? 'text-gray-300' : ''}`}>{day.day}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity 
        className="flex items-center justify-center p-2"
        onPress={() => nextWeek()}>
        <AntDesign name="right" size={20} color="black"/>
      </TouchableOpacity>
    </View>
  )
};

export const getWeekDays = (date: Date) => {
  const start = startOfWeek(date);
  const week = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    week.push({
      dayOfWeek: format(date, 'EEEEE'),
      date,
      day: getDate(date)
    });
  }

  return week;
};

export default WeekCalendar;