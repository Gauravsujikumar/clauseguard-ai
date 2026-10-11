import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { MobileLoginScreen } from '../screens/MobileLoginScreen';
import { MobileHomeScreen } from '../screens/MobileHomeScreen';
import { MobileDocumentsScreen } from '../screens/MobileDocumentsScreen';
import { MobileInsightsScreen } from '../screens/MobileInsightsScreen';
import { MobileSettingsScreen } from '../screens/MobileSettingsScreen';

const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  const [user, setUser] = useState<any>(null);

  if (!user) {
    return <MobileLoginScreen onLogin={setUser} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#0066FF',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: {
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
            backgroundColor: '#FFFFFF',
            borderTopColor: '#F1F5F9',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 10
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarIcon: ({ focused, color }) => {
            let icon = '🏠';
            if (route.name === 'Home') icon = '🏠';
            else if (route.name === 'My Contracts') icon = '📄';
            else if (route.name === 'Insights') icon = '📊';
            else if (route.name === 'Settings') icon = '⚙️';
            return <Text style={{ fontSize: 18 }}>{icon}</Text>;
          }
        })}
      >
        <Tab.Screen name="Home" component={MobileHomeScreen} />
        <Tab.Screen name="My Contracts" component={MobileDocumentsScreen} />
        <Tab.Screen name="Insights" component={MobileInsightsScreen} />
        <Tab.Screen name="Settings" component={MobileSettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
