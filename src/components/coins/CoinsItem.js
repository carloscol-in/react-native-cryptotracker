import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CoinsItem = (props) => {
    return (
        <View>
            <Text style={styles.text}>{props.item.name}</Text>
            <Text style={styles.text}>{props.item.symbol}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "#621940"
    }
})

export default CoinsItem;