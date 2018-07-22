// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import ModalSelector from 'react-native-modal-selector';
import {RaisedTextButton} from 'react-native-material-buttons';

import realm from '../realm';

// eslint-disable-next-line no-undef
const uuidv1 = require('uuid/v1');

// Styles
import STYLES_GENERAL from '../styles/general';

// Helpers
import CONSTANTS from '../constants';
import onNavigatorEvent from '../lib/onNavigatorEvent';

/**
 * DeckCreate
 */
class DeckCreate extends Component {
    static navigatorButtons = {
        rightButtons: [
            CONSTANTS.menuBarButtons.menu,
        ],
    };

    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            investigator: '',
        };

        this.investigator_data_source = realm.objects('Cards').filtered('type_code = "investigator"');
        this._saveNewDeck = this._saveNewDeck.bind(this);
        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent.bind(this));
    }

    /**
     * Save a new deck
     * @param {string} text
     * @private
     */
    _saveNewDeck(text) {
        try {
            let id = uuidv1();
            realm.write(() => {
                let investigatorCard = realm.objectForPrimaryKey('Cards', this.state.investigator);
                realm.create('Deck', {id: id, name: text, investigator: investigatorCard, creationDate: new Date()}, true);
            });
            this._goToDeckSingleScreen(realm.objectForPrimaryKey('Deck', id));
        } catch (e) {
            Alert.alert('Error on creation');
        }
    }

    /**
     * Go to deck edit screen
     * @param {object} deck The newly created deck to load on the single screen.
     * @private
     */
    _goToDeckSingleScreen(deck) {
        this.props.navigator.resetTo({
            screen: CONSTANTS.screens.deckSingle.screen,
            title: deck.name,
            passProps: {
                deck: deck,
            },
        });
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        // TODO: Add Form Validation
        let investigatorData = [];
        this.investigator_data_source.map((investigator) => {
            investigatorData.push({key: investigator.code, label: investigator.name});
        });
        return (
            <View style={STYLES_GENERAL.container}>
                <TextField
                    label='Deck Name'
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <ModalSelector
                    data={investigatorData}
                    initValue="Select an Investigator"
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option) => {
                        this.setState({investigator: option.key});
                    }}/>


                <RaisedTextButton title='Save Deck' onPress={() => this._saveNewDeck(this.state.text)}/>
            </View>
        );
    }
}

DeckCreate.propTypes = {
    navigator: PropTypes.object.isRequired,
};

export default DeckCreate;
