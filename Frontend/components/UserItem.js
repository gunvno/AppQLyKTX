import React from 'react';
import { View, Text } from 'react-native';

export default function UserItem({ user }) {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>Email: {user.email}</Text>
    </View>
  );
}
