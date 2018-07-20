import React, {Component} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import realm from '../realm';

const uuidv1 = require('uuid/v1');

// Helpers
import onNavigatorEvent from '../lib/onNavigatorEvent';
import CONSTANTS from '../constants';

class DeckList extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                title: 'Menu',
                id: 'menu',
                showAsAction: 'always',
            },
        ],
        rightButtons: [
            {
                title: 'Add Deck',
                id: CONSTANTS.screens.deckCreate.link,
                showAsAction: 'always',
            },
        ],
    };

    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            processing: true,
        };

        this.data_source = realm.objects('Deck').sorted('creationDate');
        this.data_source.addListener(this.onChange);

        if (this.data_source.length < 1) {
            try {
                realm.write(() => {
                    realm.create('Deck', {id: uuidv1(), name: 'Sample Deck', creationDate: new Date()}, true);
                });
            } catch (e) {
                Alert.alert('Error retrieving decks.');
            }
        }

        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent.bind(this));
    }

    componentWillUnmount() {
        this.data_source.removeListener(this.on_change);
    }

    onChange = async (name, changes) => {
        this.setState({processing: true});
        await this.forceUpdate();
        this.setState({processing: false});
    };

    /**
     * Render the row in the resource feed
     * @param {object} item
     * @return {*}
     * @private
     */
    _renderItem(item) {
        return (
            <TouchableOpacity
                onPress={() => this._navigateToDeck(item)}
                accessibilityLabel={'Open to Media' + item.name}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    /**
     * Open a deck single view with the passed object
     * @private
     */
    _navigateToDeck(deck) {
        this.props.navigator.push({
            screen: CONSTANTS.screens.deckSingle.screen,
            title: deck.name,
            passProps: {
                deck: deck,
            },
        });
    }

    /**
     * Render the viewitem.name
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <FlatList
                    data={this.data_source}
                    renderItem={({item}) => this._renderItem(item)}
                    refreshing={this.state.processing}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

export default DeckList;
