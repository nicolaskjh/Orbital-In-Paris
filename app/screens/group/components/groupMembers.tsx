import React from 'react';
import { ScrollView, Text } from 'react-native';
import GroupMember from './groupMember';

const GroupMembers = () => {
  const members = [
    { id:0, name: 'Jerry' },
    { id:1, name: 'Tom' },
  ]

  return (
    <ScrollView className="flex flex-col w-full bg-white border-t">
      {members.map((member) => {
        return (
          <GroupMember key={member.id} name={member.name}/>
      )})}
    </ScrollView>
  );
}

export default GroupMembers;