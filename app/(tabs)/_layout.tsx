import 'react-native-gesture-handler'; // Vigtigt at importere først
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme(); 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[(colorScheme ?? 'light') as 'light' | 'dark'].tint,
          headerShown: false,
        }}
      
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
       <Tabs.Screen
          name="login"
          options={{
            title: 'Log ind',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="reviews"
          options={{
            title: 'Reviews',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'star' : 'star-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="sell"
          options={{
            title: 'Sælg bøger',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'book' : 'book-outline'} color={color} />
            ),
          }}
        />
        
      </Tabs>
    </GestureHandlerRootView>
  );
}
