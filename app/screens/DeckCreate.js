import React, {Component} from 'react';
import {Button, TextInput, View} from 'react-native';
import realm from '../realm';

const uuidv1 = require('uuid/v1');

class DeckCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {text: 'Enter New Test Data'};

        this._addNewDeck = this._addNewDeck.bind(this);
    }

    _addNewDeck(text) {
        try {
            realm.write(() => {
                realm.create('Deck', {id: uuidv1(), name: text, creationDate: new Date()}, true);
            });
        } catch (e) {
            console.log('Error on creation');
        }
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


export default DeckCreate;
