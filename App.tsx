import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Details from './src/pages/Details';
import { MenuProvider } from 'react-native-popup-menu';

// React Navigation library
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ title: 'Todo Lists' }} />
          <Stack.Screen name="Items" component={Details} options={{ title: 'Todo Items' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
