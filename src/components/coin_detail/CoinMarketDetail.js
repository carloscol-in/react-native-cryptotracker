import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
        borderColor: Colors.backgroundAccent,
        borderWidth: 1,
        padding: 16,
        marginRight: 16,
        alignItems: "center",
    },
    nameText: {
        color: Colors.text,
        fontWeight: "bold"
    },
    priceText: {
        color: Colors.text,
    }
})

export default CoinMarketDetail;