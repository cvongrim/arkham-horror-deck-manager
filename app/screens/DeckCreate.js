import React, {Component} from 'react';
import {Button, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import realm from '../realm';

class DeckCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {text: "Enter New Test Data"};

        // This is a Results object, which will live-update.
        this.deckLists = realm.objects('Deck').sorted('creationDate');
        if (this.deckLists.length < 1) {
            realm.write(() => {
                realm.create('Deck', { name: 'SampleDeck', creationDate: new Date() });
            });
        }

        this._addNewDeck = this._addNewDeck.bind(this);
    }

    _addNewDeck(text) {
        realm.write(() => {
            realm.create('Deck', { name: text, creationDate: new Date() });
        });

        let decks = realm.objects('Deck');
        console.log(decks);
    }

    render() {
        return (
            <View style={{padding: 20}}>
                <TextInput
                    style={{borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Button
                    onPress={() => this._addNewDeck(this.state.text)}
                    title="Add Deck"
                    color="#841584"
                    accessibilityLabel="Add Deck"
                />
            </View>
        );
    }
}


export default connect()(DeckCreate);
