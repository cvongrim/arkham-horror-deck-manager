// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {RaisedTextButton} from 'react-native-material-buttons';
import CONSTANTS from '../constants';
import realm from '../realm';

// Components
import DeckInfo from '../components/DeckInfo';
import CardInfo from '../components/CardInfo';

// Helpers
import onNavigatorEvent from '../lib/onNavigatorEvent';

// Styles
import STYLES_GENERAL from '../styles/general';
import COLORS from '../styles/colors';
import TYPES from '../styles/types';


/**
 * DeckSingle
 */
class DeckSingle extends Component {
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
     * @return {object} JSX Object
     * @private
     */
    _renderItem(deckCard) {
        return (
            <CardInfo
                cardImage={deckCard.card.imagesrc}
                cardName={deckCard.card.real_name}
                cardClass={deckCard.card.faction_name}
                cardType={deckCard.card.type_name}
                selected={false}
            />
        );
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={STYLES_GENERAL.container}>
                <View style={STYLES_GENERAL.cardContainer}>
                    <DeckInfo
                        cardImage={this.props.deck.investigator.imagesrc}
                        deckName={this.props.deck.name}
                        deckInvestigator={this.props.deck.investigator.name}
                        deckType={this.props.deck.investigator.faction_name}

                    />
                    <Text style={[TYPES.header, styles.textCardsHeader]}>Cards ( {this.data_source.length} )</Text>
                    <FlatList
                        data={this.data_source}
                        renderItem={({item}) => this._renderItem(item)}
                        refreshing={this.state.processing}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.list}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                    <View style={styles.containerButtons}>
                        <RaisedTextButton style={styles.button} color={COLORS.greenDark} rippleDuration={600}
                                          rippleOpacity={0.54} titleColor={COLORS.white} title='Add Cards'
                                          onPress={() => this._goToCardsScreen()}/>
                        <RaisedTextButton style={styles.button} color={COLORS.red} rippleDuration={600}
                                          rippleOpacity={0.54} titleColor={COLORS.white} title='Delete Deck'
                                          onPress={() => this._deleteDeck(this.props.deck)}/>
                    </View>
                </View>
            </View>
        );
    }
}

DeckSingle.propTypes = {
    deck: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    containerButtons: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: STYLES_GENERAL.generalSpacing,
    },
    button: {
        alignSelf: 'center',
        margin: STYLES_GENERAL.generalSpacing,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.brown,
        marginVertical: 10,
    },
    textCardsHeader: {
        borderBottomWidth: 1,
        paddingVertical: STYLES_GENERAL.generalSpacing,
        marginBottom: STYLES_GENERAL.generalSpacing,
    },
    list: {
        flex: 1,
        padding: STYLES_GENERAL.generalSpacing,
    },
});

export default DeckSingle;
