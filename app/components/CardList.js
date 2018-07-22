// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Alert, FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import realm from '../realm';
import RaisedTextButton from 'react-native-material-buttons/src/components/raised-text-button/index';

// eslint-disable-next-line no-undef
const uuidv1 = require('uuid/v1');

// Constants
import CONSTANTS from '../constants';

// Components
import CardInfo from '../components/CardInfo';

// Styles
import STYLES_GENERAL from '../styles/general';
import COLORS from '../styles/colors';

/**
 * CardList
 */
class CardList extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.state = {
            processing: true,
            dataSource: realm.objects('Cards').filtered(this._defaultFilter()),
            deck: [],
            selectedButtons: [],
        };
        this._filterCards = this._filterCards.bind(this);
        this._renderItem = this._renderItem.bind(this);
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.setState({
            deck: this._getInitialCardsInDeck(),
        });
    }

    /**
     * Get the intial cards that were already selected in the deck
     * @return {Array}
     * @private
     */
    _getInitialCardsInDeck() {
        let deckCards = realm.objects('DeckCards');
        let deck = [];

        deckCards.forEach((item) => {
            deck.push(item.card.code);
        });

        return deck;
    }

    /**
     * Add the selected filter to the array of selected card types stored in state.
     * @param {string} selected The type_code to be added to the filter.
     * @private
     */
    _addSelectedFilter(selected) {
        this.setState({
            selectedButtons: this.state.selectedButtons.concat(selected),
        });
    }

    /**
     * Remove the selected filter from the array of selected card types stored in state.
     * @param {string} selected The type_code to be remove from the filter.
     * @private
     */
    _removeSelectedFilter(selected) {
        this.setState({
            selectedButtons: this._remove(this.state.selectedButtons, selected),
        });
    }


    /**
     * Build out the filter to be used in the Realm query.
     * @param {array} selectedButtons The array of all the currently selected buttons.
     * @return {string} The string to be used in the Realm query.
     * @private
     */
    _createFilter(selectedButtons) {
        let filter = this._defaultFilter();
        let iterationCount = 0;
        let selectButtonTotal = selectedButtons.length;

        if (selectButtonTotal > 0) {
            filter = '';
            selectedButtons.forEach(function(element) {
                filter += 'type_code = "' + element + '"';

                iterationCount++;

                if (iterationCount < selectButtonTotal) {
                    filter += ' OR ';
                }
            });
        }
        return filter;
    }


    /**
     * Query the realm database and add the results to the current state to be displayed.
     * @param {string} selected The type_code to be added or removed from the filter.
     * @private
     */
    _filterCards(selected) {
        let filterPosition = this.state.selectedButtons.indexOf(selected);

        if (-1 === filterPosition) {
            this._addSelectedFilter(selected);
        } else {
            this._removeSelectedFilter(selected);
        }

        let cards = realm.objects('Cards');
        let filter = this._createFilter(this.state.selectedButtons);

        this.setState({
            dataSource: cards.filtered(filter),
        });
    }

    /**
     * Create the default filter to use
     * @return {string} The string to be used when querying Cards
     * @private
     */
    _defaultFilter() {
        return 'type_code = "asset" OR type_code = "skill" OR type_code = "event"';
    }

    /**
     * Render the row in the resource feed
     * @param {object} card
     * @return {*}
     * @private
     */
    _renderItem(card) {
        return (
            <TouchableOpacity
                style={STYLES_GENERAL.cardContainer}
                onPress={() => this._addRemoveCard(card)}>
                <CardInfo
                    cardImage={card.imagesrc}
                    cardName={card.real_name}
                    cardClass={card.faction_name}
                    cardType={card.type_name}
                    selected={this.state.deck.indexOf(card.code) !== -1}
                />
            </TouchableOpacity>
        );
    }

    /**
     * Remove an element from an array
     * @param {array} array The array to remove the element from
     * @param {string} element The element to remove
     * @return {array} array The array with the element removed
     * @private
     */
    _remove(array, element) {
        // TODO: Move to helper library
        return array.filter((e) => e !== element);
    }


    /**
     * Add or remove a card to the deck.
     * @param {object} card The card to remove or add
     * @private
     */
    _addRemoveCard(card) {
        // TODO: Refactor
        if (this.state.deck.indexOf(card.code) === -1) {
            try {
                let id = uuidv1();
                realm.write(() => {
                    realm.create('DeckCards', {id: id, card: card, count: 1, deck: this.props.deck}, true);
                });
                this.setState({
                    deck: this.state.deck.concat(card.code),
                });
            } catch (e) {
                Alert.alert(
                    'Error adding card',
                    e.message,
                    [
                        {text: 'OK', onPress: () => null},
                    ],
                );
            }
        } else {
            try {
                let deckCard = realm.objects('DeckCards')
                    .filtered('card.code = "' + card.code + '" AND deck.id = "' + this.props.deck.id + '"');

                realm.write(() => {
                    realm.delete(deckCard);
                });
                this.setState({
                    deck: this._remove(this.state.deck, card.code),
                });
            } catch (e) {
                Alert.alert(
                    'Error removing card',
                    e.message,
                    [
                        {text: 'OK', onPress: () => null},
                    ],
                );
            }
        }
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={STYLES_GENERAL.container}>
                <View style={styles.containerButtons}>
                    {
                        CONSTANTS.CARD_TYPES.map((cardType) => {
                            let filterPosition = this.state.selectedButtons.indexOf(cardType.type_code);
                            return <RaisedTextButton
                                style={styles.button}
                                key={cardType.type_code}
                                rippleDuration={600}
                                rippleOpacity={0.54}
                                titleColor={COLORS.white}
                                title={cardType.type_name}
                                color={-1 === filterPosition ? COLORS.greenDark : COLORS.greenDarkSelected}
                                onPress={() => this._filterCards(cardType.type_code)}/>;
                        })
                    }
                </View>


                <FlatList
                    extraData={this.state}
                    data={this.state.dataSource}
                    renderItem={({item}) => this._renderItem(item)}
                    refreshing={this.state.processing}
                    keyExtractor={(item) => item.code.toString()}
                />
            </View>
        );
    }
}

CardList.propTypes = {
    deck: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    containerButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    button: {
        alignSelf: 'center',
        margin: 10,
    },
});

export default CardList;
