import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FavouritesEmptyState from './FavouritesEmptyState';
import Colors from "cryptotracker/src/res/colors.js";

class FavouritesScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FavouritesEmptyState />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    }
})

export default FavouritesScreen;