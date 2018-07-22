// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import {RaisedTextButton} from 'react-native-material-buttons';
import CONSTANTS from '../constants';
import realm from '../realm';
import {
    CachedImage,
} from 'react-native-cached-image';

// Helpers
import onNavigatorEvent from '../lib/onNavigatorEvent';

// Styles
import STYLES_GENERAL from '../styles/general';

/**
 * DeckSingle
 */
class DeckSingle extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                title: 'Menu',
                id: 'menu',
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
            processing: false,
        };

        this.data_source = realm.objects('DeckCards').filtered('deck.id = "' + this.props.deck.id + '"');
        this.data_source.addListener(this.onChange);
        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent.bind(this));
    }

    /**
     * Method that runs before the render() has launched
     */
    componentWillUnmount() {
        this.data_source.removeListener(this.onChange);
    }

    // TODO: Cleanup
    onChange = async (name, changes) => {
        this.setState({processing: true});
        await this.forceUpdate();
        this.setState({processing: false});
    };


    /**
     * Delete deck
     * @param {object} deck
     * @private
     */
    _deleteDeck(deck) {
        // TODO: Move?
        try {
            this._returnToDeckList();
            realm.write(() => {
                realm.delete(deck);
            });
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
     * Go to cards screen
     * @private
     */
    _goToCardsScreen() {
        this.props.navigator.push({
            screen: CONSTANTS.screens.cards.screen,
            title: CONSTANTS.screens.cards.title,
            passProps: {
                deck: this.props.deck,
            },
        });
    }

    /**
     * Render the row in the resource feed
     * @param {object} deckCard
     * @return {*}
     * @private
     */
    _renderItem(deckCard) {
        return (
            <View>
                <CachedImage source={{uri: CONSTANTS.BASE_URL + deckCard.card.imagesrc}}
                             style={{width: 100, height: 150}}/>
                <Text>{deckCard.card.real_name}</Text>
                <Text>{deckCard.card.faction_name}</Text>
                <Text>{deckCard.card.type_name}</Text>
            </View>
        );
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={STYLES_GENERAL.container}>
                <Text>{this.props.deck.name}</Text>
                <FlatList
                    data={this.data_source}
                    renderItem={({item}) => this._renderItem(item)}
                    refreshing={this.state.processing}
                    keyExtractor={(item) => item.id.toString()}
                />
                <RaisedTextButton title='Add Cards' onPress={() => this._goToCardsScreen()}/>
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
