import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from 'cryptotracker/src/res/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const CoinsItem = ({ props, onPress }) => {

    const getImgArrow = (pct_change) => {
        let icon = null;

        if (parseFloat(pct_change) > 0) {
            icon = <FontAwesomeIcon icon={faArrowUp} color={Colors.green} />
        } else {
            icon = <FontAwesomeIcon icon={faArrowDown} color={Colors.red} />
        }

        return icon;
    }

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbol}>{props.item.symbol}</Text>
                <Text style={styles.text}>{props.item.name}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.priceText}>$ {props.item.price_usd}</Text>
                <Text
                    style={{
                        color: props.item.percent_change_1h > 0 ? Colors.green : Colors.red,
                        ...styles.percentText
                    }}
                >
                    {props.item.percent_change_1h} %
                </Text>
                { getImgArrow( props.item.percent_change_1h ) }
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        color: Colors.text,
        fontSize: 14,
        marginRight: 12,
    },
    symbol: {
        color: Colors.primary,
        fontWeight: "bold",
        fontSize: 16,
        marginRight: 12,
    },
    container: {
        flexDirection: "row",
        padding: 16,
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: Colors.secondary,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    percentText: {
        fontSize: 12,
        marginRight: 10,
    },
    priceText: {
        color: Colors.text,
        fontSize: 14,
        marginRight: 20
    }
})

export default CoinsItem;