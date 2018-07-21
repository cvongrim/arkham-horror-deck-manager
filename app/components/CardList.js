import React, {Component} from 'react';
import {FlatList, Text, View} from 'react-native';
import {
    CachedImage,
} from 'react-native-cached-image';
import realm from '../realm';
import CONSTANTS from '../constants';

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

        this.data_source = realm.objects('Cards');
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
                       style={{width: 150, height: 50}} />
                <Text>{item.real_name}</Text>
                <Text>{item.faction_name}</Text>
                <Text>{CONSTANTS.API_URL + item.imagesrc}</Text>
            </View>
        );
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={{padding: 20}}>
                <FlatList
                    data={this.data_source}
                    renderItem={({item}) => this._renderItem(item)}
                    keyExtractor={(item) => item.code.toString()}
                />
            </View>
        );
    }
}


export default CardList;
