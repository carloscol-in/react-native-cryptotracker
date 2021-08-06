import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from 'cryptotracker/src/res/colors';

const CoinMarketDetail = ({item}) => {
    return(
        <View style={styles.container}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.priceText}>{item.price_usd}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderColor: Colors.primaryVariant,
        borderWidth: 1,
        padding: 16,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    nameText: {
        color: Colors.text,
        fontWeight: "bold"
    },
    priceText: {
        color: Colors.text,
    },
    iconImg: {
        width: 25,
        height: 25,
    }
})

export default CoinMarketDetail;