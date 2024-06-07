import React from 'react';
import { View } from 'react-native';
import TripTab from './tripTab';

const itinerary = require('@/assets/images/trip-page/itinerary.png');
const budget = require('@/assets/images/trip-page/budget.png');
const flight = require('@/assets/images/trip-page/flight.png');
const group = require('@/assets/images/trip-page/group.png');

const TripTabs = () => {
  const Tabs = [
    {id: 0, name: 'Itinerary', logo: itinerary, path: 'itinerary'},
    {id: 1, name: 'Budget', logo: budget, path: 'budget'},
    {id: 2, name: 'Flight & Accommodation', logo: flight, path: 'itinerary'},
    {id: 3, name: 'Travel Group', logo: group, path: 'itinerary'}
  ]

  return (
    <View className="flex flex-col justify-end items-center h-3/5 w-full">
      {Tabs.map(tab => (
        <TripTab key={tab.id} text={tab.name} icon={tab.logo} path={tab.path}/>
      ))}
    </View>
  );
};

export default TripTabs;