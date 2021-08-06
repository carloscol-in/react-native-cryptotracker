import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FavouritesEmptyState from './FavouritesEmptyState';
import Colors from 'cryptotracker/src/res/colors';
import Storage from 'cryptotracker/src/libs/storage';
import CoinsItem from 'cryptotracker/src/components/coins/CoinsItem';

class FavouritesScreen extends Component {

    state = {
        favourites: [],
    }

    componentDidMount() {
        this.getFavourites();

        this.props.navigation.addListener("focus", this.getFavourites);
    }

    componentWillUnmount() {
        this.props.navigation.removeListener("focus", this.getFavourites);
    }

    getFavourites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();

            const keys = allKeys.filter((key) => key.includes("favourite-"))

            const favs = await Storage.instance.multiGet(keys);

            const favourites = favs.map((fav) => JSON.parse(fav[1]));

            this.setState({ favourites });
        } catch {
            console.error(err);
        }
    }

    handlePress = (item) => {
        this.props.navigation.navigate("CoinDetail", { item: item });
    }

    render() {
        const { favourites } = this.state;
        return (
            <View style={styles.container}>
                {
                    favourites.length == 0 ?
                    <FavouritesEmptyState /> :
                    <FlatList
                        data={favourites}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => {
                            return <CoinsItem
                                        item={item}
                                        onPress={() => this.handlePress(item)}
                                    />
                        }}
                    />
                }
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