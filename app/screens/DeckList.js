// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import realm from '../realm';

// Actions
import * as cardsDataActions from '../actions/cards';

// Components
import DeckInfo from '../components/DeckInfo';

// Helpers
import onNavigatorEvent from '../lib/onNavigatorEvent';
import CONSTANTS from '../constants';

// Styles
import STYLES_GENERAL from '../styles/general';

/**
 * DeckList
 */
class DeckList extends Component {
    static navigatorButtons = {
        rightButtons: [
            CONSTANTS.menuBarButtons.menu,
            CONSTANTS.menuBarButtons.addDeck,
        ],
    };

    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.data_source = realm.objects('Deck').sorted('creationDate');
        this.getData = this.getData.bind(this);
        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent.bind(this));
    }

    /**
     * Method that runs before the render() has launched
     */
    async componentWillMount() {
        await this.getData();
    }

    /**
     * Get data for the resource view
     */
    async getData() {
        await this.props.cardsDataActions.getAllCardData();
    }

    /**
     * Render the row in the resource feed
     * @param {object} item
     * @return {*}
     * @private
     */
    _renderItem(item) {
        return (
            <TouchableOpacity
                onPress={() => this._navigateToDeck(item)}
                accessibilityLabel={'Open to Media' + item.name}
                style={STYLES_GENERAL.cardContainer}
            >
                <DeckInfo
                    cardImage={item.investigator.imagesrc}
                    deckName={item.name}
                    deckInvestigator={item.investigator.real_name}
                    deckType={item.investigator.faction_name}/>
            </TouchableOpacity>
        );
    }

    /**
     * Open a deck single view with the passed object
     * @param {object} deck
     * @private
     */
    _navigateToDeck(deck) {
        this.props.navigator.push({
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
        return (
            <View style={STYLES_GENERAL.container}>
                {this.data_source.length > 0 ?
                    <FlatList
                        data={this.data_source}
                        renderItem={({item}) => this._renderItem(item)}
                        keyExtractor={(item) => item.id.toString()}
                    /> :
                    null}
            </View>
        );
    }
}

/**
 * Retrieve data from redux
 * @param {object} state
 * @return {{example: *}}
 */
function mapStateToProps(state) {
    const {cardsData} = state;
    return {cardsData};
}

// I can't get this line to not give a jsdoc error : (
// eslint-disable-next-line valid-jsdoc
/**
 * Set up actions so they can be used in the component
 * @param dispatch
 * @returns {{actions: {setExampleData?}|ActionCreator<any>|ActionCreatorsMapObject}}
 */
function mapDispatchToProps(dispatch) {
    return {
        cardsDataActions: bindActionCreators(cardsDataActions, dispatch),
    };
}

DeckList.propTypes = {
    cardsDataActions: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
