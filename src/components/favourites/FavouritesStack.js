import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavouritesScreen from './FavouritesScreen';
import Colors from "cryptotracker/src/res/colors.js";

const Stack = createStackNavigator();

const FavouritesStack = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.backgroundAccent,
                    shadowColor: Colors.secondary,
                },
                headerTintColor: Colors.primaryVariant
            }}
        >
            <Stack.Screen
                name="Favourites"
                component={FavouritesScreen}
            />
        </Stack.Navigator>
    )
}

export default FavouritesStack;