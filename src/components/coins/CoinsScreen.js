import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';

import Http from 'cryptotracker/src/libs/http.js';

// Components
import CoinsItem from './CoinsItem';


const CoinsScreen = (props) => {

    const [coins, setCoins] = useState([]);

    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        let res = await Http.instance.get(`https://api.coinlore.net/api/tickers/`);
        setCoins(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <View style={styles.container}>
            {
                loading ?
                    <ActivityIndicator
                        style={styles.loader}
                        color="#fff"
                        size="large"
                    />
                    : null
            }
            <FlatList
                data={coins}
                renderItem={({item}) =>
                    <CoinsItem item={item} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    titleText: {
        color: "#fff",
        textAlign: "center",
    },
    btn: {
        padding: 8,
        backgroundColor: "blue",
        borderRadius: 8,
        margin: 16,
    },
    btnText: {
        color: "#fff",
        textAlign: "center"
    },
    loader: {
        marginTop: 60
    }
})

export default CoinsScreen;