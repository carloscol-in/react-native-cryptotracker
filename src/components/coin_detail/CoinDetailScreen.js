import React, { Component } from 'react';
import { View, Image, Text, SectionList, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import Colors from 'cryptotracker/src/res/colors';
import Http from 'cryptotracker/src/libs/http';
import CoinMarketDetail from './CoinMarketDetail';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Storage from 'cryptotracker/src/libs/storage.js';


class CoinDetailScreen extends Component {
    
    state = {
        coin: {},
        markets: [],
        isFavourite: false,
    }

    componentDidMount() {
        const { coin } =  this.props.route.params;

        this.props.navigation.setOptions({title: coin.symbol})

        this.getMarkets(coin.id);

        this.setState({ coin }, () => {
            this.getFavourite();
        });
    }

    getSymbolIcon = (name) => {
        if (name) {
            return `https://c1.coinlore.com/img/25x25/${name}.png`;
        }
    }

    getSections = (coin) => {
        const sections = [
            {
                title: "Market Cap",
                data: [coin.market_cap_usd]
            },
            {
                title: "Volume",
                data: [coin.volume24]
            },
            {
                title: "Change 24h",
                data: [coin.percent_change_24h]
            }
        ];

        return sections;
    }

    getMarkets = async (coinId) => {

        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const markets = await Http.instance.get(url);

        this.setState({ markets });

    }

    toggleFavourites = async () => {
        if (this.state.isFavourite) {

            this.removeFavourite();

        } else {

            this.addFavourite();

        }
    }

    addFavourite = async () => {
        const coin = JSON.stringify(this.state.coin);
        const key = `favourite-${this.state.coin.id}`;

        const stored = await Storage.instance.store(key, coin);

        if (stored) {
            this.setState({ isFavourite: true });
        }
    }

    removeFavourite = async () => {
        Alert.alert("Remove favourite", "Are you sure?", [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                    const key = `favourite-${this.state.coin.id}`;

                    const removed = await Storage.instance.remove(key);

                    if (removed) {
                        this.setState({ isFavourite: false });
                    }
                },
                style: "destructive"
            }
        ]);
    }

    getFavourite = async () => {
        try {
            const key = `favourite-${this.state.coin.id}`;

            const coin = await Storage.instance.get(key);

            if (coin) {
                this.setState({ isFavourite: true });
            }
        } catch {
            console.error(err);
        }
    }
    
    render() {

        const { coin, markets, isFavourite } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <View style={styles.subHeaderCoin}>
                        <Image
                            style={styles.iconImg}
                            source={{ uri: this.getSymbolIcon(coin.nameid) }}
                        />
                        <Text style={styles.titleText}>{ coin.name }</Text>
                    </View>

                    <View>
                        <Pressable 
                            onPress={() => this.toggleFavourites()}
                            style={
                                {
                                    backgroundColor: isFavourite ? Colors.darkRed : Colors.darkGreen, 
                                    ...styles.addFavsBtn
                                }
                            }
                        >
                            <FontAwesomeIcon icon={ isFavourite ? faMinus : faPlus } color={Colors.text} />
                            
                            <Text style={styles.addFavsBtnText}>
                                { isFavourite ? "Remove from Favourite" : "Add to Favourites" }
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <SectionList
                    style={styles.section}
                    sections={this.getSections(coin)}
                    keyExtractor={(item) => item}
                    renderItem={({item}) =>
                        <View style={styles.sectionItem}>
                            <Text style={styles.itemText}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({ section }) => 
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionText}>{section.title}</Text>
                        </View>
                    }
                />

                <Text style={styles.marketsTitle}>Markets</Text>

                <FlatList
                    style={styles.list}
                    horizontal={true}
                    data={markets}
                    keyExtractor={(item, index) => `${item.name}-${item.base}-${index}`}
                    renderItem={({ item }) => <CoinMarketDetail item={item} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    subHeaderCoin: {
        flexDirection: "row"
    },
    iconImg: {
        width: 25,
        height: 25,
    },
    titleText: {
        color: Colors.primary,
        fontSize: 18,
        marginLeft: 12,
    },
    addFavsBtn: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        zIndex: 1,
        borderRadius: 12,
    },
    addFavsBtnText: {
        zIndex: 999,
        color: Colors.text,
        marginLeft: 8, 
    },
    section: {
        maxHeight: 220,
    },
    sectionHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 8,
    },
    sectionItem: {
        padding: 8,
    },
    itemText: {
        color: Colors.text,
        fontSize: 14,
        marginLeft: 8,
    },
    sectionText: {
        color: Colors.text,
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 8,
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16,
    },
    marketsTitle: {
        color: Colors.text,
        fontSize: 16,
        marginTop: 24,
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: "bold",
    }
});

export default CoinDetailScreen;