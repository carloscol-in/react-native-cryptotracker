import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';

import Http from 'cryptotracker/src/libs/http.js';

// Components
import CoinsItem from './CoinsItem';
import Colors from 'cryptotracker/src/res/colors';
import CoinsSearch from './CoinsSearch';


const CoinsScreen = (props) => {

    const [coins, setCoins] = useState([]);
    
    const [allCoins, setAllCoins] = useState([]);

    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        let res = await Http.instance.get(`https://api.coinlore.net/api/tickers/`);
        setCoins(res.data);
        setAllCoins(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    const handlePress = (coin) => {
        props.navigation.navigate('CoinDetail', { coin });
    }
    
    const handleSearch = (query) => {
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
             coin.symbol.toLowerCase().includes(query.toLowerCase());
        });

        setCoins(coinsFiltered);
    }

    return(
        <View style={styles.container}>
            <CoinsSearch onChange={handleSearch} />
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
                    <CoinsItem item={item} onPress={() => handlePress(item)} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
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