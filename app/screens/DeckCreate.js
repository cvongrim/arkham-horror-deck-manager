// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import {RaisedTextButton} from 'react-native-material-buttons';
import realm from '../realm';

// eslint-disable-next-line no-undef
const uuidv1 = require('uuid/v1');

// Styles
import STYLES_GENERAL from '../styles/general';

import CardList from '../components/CardList';
import CONSTANTS from '../constants';

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

        this.state = {text: ''};
        this._addNewDeck = this._addNewDeck.bind(this);
    }

    /**
     * Add a new deck
     * @param {string} text
     * @private
     */
    _addNewDeck(text) {
        // TODO: Move?
        try {
            realm.write(() => {
                realm.create('Deck', {id: uuidv1(), name: text, creationDate: new Date()}, true);
            });
            this._returnToDeckList();
        } catch (e) {
            Alert.alert('Error on creation');
        }
    }

    /**
     * Return to decklist
     * @private
     */
    _returnToDeckList() {
        this.props.navigator.resetTo({
            screen: CONSTANTS.screens.deckList.screen,
            title: CONSTANTS.screens.deckList.title,
        });
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={STYLES_GENERAL.container}>
                <CardList />
                <TextField
                    label='Deck Name'
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <RaisedTextButton title='Add Deck' onPress={() => this._addNewDeck(this.state.text)}/>
            </View>
        );
    }
}

DeckCreate.propTypes = {
    navigator: PropTypes.object.isRequired,
};

export default DeckCreate;
