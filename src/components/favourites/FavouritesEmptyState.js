import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from 'cryptotracker/src/res/colors.js';

const FavouritesEmptyState = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                You don't have any favourites yet.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
    text: {
        color: Colors.text,
        fontWeight: "bold",
        fontSize: 22,
        alignSelf: "center",
        textAlign: "center",
    }
});

export default FavouritesEmptyState;