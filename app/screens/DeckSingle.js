// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';
import {RaisedTextButton} from 'react-native-material-buttons';
import CONSTANTS from '../constants';
import realm from '../realm';

// Styles
import STYLES_GENERAL from '../styles/general';

/**
 * DeckSingle
 */
class DeckSingle extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Delete deck
     * @param {object} deck
     * @private
     */
    _deleteDeck(deck) {
        // TODO: Move?
        try {
            realm.write(() => {
                realm.delete(deck);
            });
            this._returnToDeckList();
        } catch (e) {
            Alert.alert(
                'Error deleting the deck',
                e.message,
                [
                    {text: 'OK', onPress: () => null},
                ],
            );
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
                <Text>{this.props.deck.name}</Text>
                <RaisedTextButton title='Delete Deck' onPress={() => this._deleteDeck(this.props.deck)}/>
            </View>
        );
    }
}

DeckSingle.propTypes = {
    deck: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
};

export default DeckSingle;
