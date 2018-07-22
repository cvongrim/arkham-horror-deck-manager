// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import ModalSelector from 'react-native-modal-selector';
import {RaisedTextButton} from 'react-native-material-buttons';

import realm from '../realm';

// eslint-disable-next-line no-undef
const uuidv1 = require('uuid/v1');

// CONSTANTS
import CONSTANTS from '../constants';

// Helpers
import onNavigatorEvent from '../lib/onNavigatorEvent';

// Styles
import STYLES_GENERAL from '../styles/general';
import COLORS from '../styles/colors';


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
     * @param {string} investigator
     * @private
     */
    _saveNewDeck(text, investigator) {
        if (text && investigator) {
            try {
                let id = uuidv1();
                realm.write(() => {
                    let investigatorCard = realm.objectForPrimaryKey('Cards', investigator);
                    realm.create('Deck', {
                        id: id,
                        name: text,
                        investigator: investigatorCard,
                        creationDate: new Date(),
                    }, true);
                });
                this._goToDeckSingleScreen(realm.objectForPrimaryKey('Deck', id));
            } catch (e) {
                Alert.alert(
                    'Error creating deck.',
                    e.message,
                    [
                        {text: 'OK', onPress: () => null},
                    ],
                );
            }
        } else {
            Alert.alert(
                'All fields required.',
                'You must give the deck a name and select an investigator.',
                [
                    {text: 'OK', onPress: () => null},
                ],
            );
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
        let investigatorData = [];
        this.investigator_data_source.map((investigator) => {
            investigatorData.push({key: investigator.code, label: investigator.name});
        });
        return (
            <View style={STYLES_GENERAL.container}>
                <View style={STYLES_GENERAL.cardContainer}>
                    <TextField
                        label='Deck Name'
                        baseColor={COLORS.grey}
                        tintColor={COLORS.greenDark}
                        keyboardType={'default'}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                    />

                    <ModalSelector
                        style={styles.investigatorSelector}
                        data={investigatorData}
                        initValue="Select an Investigator"
                        cancelButtonAccessibilityLabel={'Cancel Button'}
                        onChange={(option) => {
                            this.setState({investigator: option.key});
                        }}/>


                    <RaisedTextButton title='Save Deck' color={COLORS.greenDark} rippleDuration={600}
                                      rippleOpacity={0.54} titleColor={COLORS.white}
                                      onPress={() => this._saveNewDeck(this.state.text, this.state.investigator)}/>
                </View>
            </View>
        );
    }
}

DeckCreate.propTypes = {
    navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    investigatorSelector: {
        marginVertical: 20,
    },
});

export default DeckCreate;
