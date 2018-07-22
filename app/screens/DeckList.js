// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import realm from '../realm';

// eslint-disable-next-line no-undef
const uuidv1 = require('uuid/v1');

// Actions
import * as cardsDataActions from '../actions/cards';

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
        leftButtons: [
            {
                title: 'Menu',
                id: 'menu',
                showAsAction: 'always',
            },
        ],
        rightButtons: [
            {
                title: 'Add Deck',
                id: CONSTANTS.screens.deckCreate.link,
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
            processing: true,
        };

        this.data_source = realm.objects('Deck').sorted('creationDate');
        this.data_source.addListener(this.onChange);

        if (this.data_source.length < 1) {
            try {
                realm.write(() => {
                    realm.create('Deck', {id: uuidv1(), name: 'Sample Deck', creationDate: new Date()}, true);
                });
            } catch (e) {
                Alert.alert('Error retrieving decks.');
            }
        }
        this.getData = this.getData.bind(this);
        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent.bind(this));
    }

    /**
     * Method that runs before the render() has launched
     */
    async componentDidMount() {
        await this.getData();
    }

    /**
     * Method that runs before the render() has launched
     */
    componentWillUnmount() {
        this.data_source.removeListener(this.onChange);
    }

    /**
     * Get data for the resource view
     */
    async getData() {
        await this.props.cardsDataActions.getAllCardData();
    }

    // TODO: Cleanup
    onChange = async (name, changes) => {
        this.setState({processing: true});
        await this.forceUpdate();
        this.setState({processing: false});
    };

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
            >
                <Text>{item.name}</Text>
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
                <FlatList
                    data={this.data_source}
                    renderItem={({item}) => this._renderItem(item)}
                    refreshing={this.state.processing}
                    keyExtractor={(item) => item.id.toString()}
                />
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
