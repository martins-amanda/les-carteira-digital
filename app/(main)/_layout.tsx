import React from 'react';
import { Tabs } from 'expo-router';
import {
  FontAwesome,
  FontAwesome5,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { theme } from '@global/theme';
import { Platform } from 'react-native';

const MainLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.icon,

        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: 55,

          paddingVertical: Platform.OS === 'ios' ? 15 : 0,
        },
      }}
    >
      <Tabs.Screen
        name="Home/index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-filled" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Notifications/index"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="NewTransaction/index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="dollar-sign" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard/index"
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="graph-pie" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile/index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={30} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="History/index"
        options={{
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
