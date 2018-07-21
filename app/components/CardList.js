import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
import {
    CachedImage,
} from 'react-native-cached-image';
import realm from '../realm';
import CONSTANTS from '../constants';
import RaisedTextButton from 'react-native-material-buttons/src/components/raised-text-button/index';

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
            selectedButtons: [],
        };
        this._filterCards = this._filterCards.bind(this);
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
     * @param {object} item
     * @return {*}
     * @private
     */
    _renderItem(item) {
        return (
            <View>
                <CachedImage source={{uri: CONSTANTS.BASE_URL + item.imagesrc}}
                             style={{width: 100, height: 150}}/>
                <Text>{item.real_name}</Text>
                <Text>{item.faction_name}</Text>
                <Text>{item.type_name}</Text>
            </View>
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
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={{padding: 20}}>
                {
                    CONSTANTS.CARD_TYPES.map((cardType) => {
                        let filterPosition = this.state.selectedButtons.indexOf(cardType.type_code);
                        return <RaisedTextButton key={cardType.type_code}
                                                 title={cardType.type_name}
                                                 color={-1 === filterPosition ? '#c6c6c6' : '#7c7c7c'}
                                                 onPress={() => this._filterCards(cardType.type_code)}/>;
                    })
                }


                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => this._renderItem(item)}
                    refreshing={this.state.processing}
                    keyExtractor={(item) => item.code.toString()}
                />
            </View>
        );
    }
}


export default CardList;
