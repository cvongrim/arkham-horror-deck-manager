import React, {Component} from 'react';
import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
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

    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                {!this.state.processing ?
                    <FlatList
                        data={this.data_source}
                        renderItem={({item}) => <Text>{item.name}</Text>}
                        keyExtractor={(item) => item.id.toString()}
                    /> :
                    <ActivityIndicator size="small" color="#00ff00"/>}
            </View>
        );
    }
}

export default DeckList;
