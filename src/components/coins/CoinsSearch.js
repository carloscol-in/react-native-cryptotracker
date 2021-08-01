import React, { Component } from 'react';
import { TextInput, Platform, View, StyleSheet } from 'react-native';
import Colors from 'cryptotracker/src/res/colors';

class CoinsSearch extends Component {

    state = {
        query: '',
    }

    handleText = (query) => {
        this.setState({ query });

        if(this.props.onChange){
            this.props.onChange(query);
        }
    }
    
    render() {

        const { query } = this.state;

        return (
            <View style={styles.view}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.handleText}
                    value={query}
                    placeholder="Search Coin"
                    placeholderTextColor={Colors.primary}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.secondary,
        paddingLeft: 16,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8,
        borderRadius: 16,
        borderBottomColor: Colors.primary,
        color: Colors.text,
    },
    view: {
        shadowColor: Colors.primary,
    }
})

export default CoinsSearch;