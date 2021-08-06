/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from 'cryptotracker/src/components/coins/CoinsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from 'cryptotracker/src/res/colors.js';
import FavouritesStack from 'cryptotracker/src/components/favourites/FavouritesStack';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.text,
          tabBarStyle: {
            backgroundColor: Colors.backgroundAccent,
          },
        }}
      >
        <Tab.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('cryptotracker/src/assets/bank.png')}
              />
            )
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouritesStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{ tintColor: color, width: size, height: size }}
                source={require('cryptotracker/src/assets/bank.png')}
              />
            )
          }}
        />
      </Tab.Navigator>

    </NavigationContainer>
  );
};

export default App;
