import React, {Component} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import realm from '../realm';

// eslint-disable-next-line no-undef
const uuidv1 = require('uuid/v1');

/**
 * DeckCreate
 */
class DeckCreate extends Component {

    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {text: 'Enter New Test Data'};

        this._addNewDeck = this._addNewDeck.bind(this);
    }

    /**
     * Add a new deck
     * @param {string} text
     * @private
     */
    _addNewDeck(text) {
        try {
            realm.write(() => {
                realm.create('Deck', {id: uuidv1(), name: text, creationDate: new Date()}, true);
            });
        } catch (e) {
            Alert.alert('Error on creation');
        }
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
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
