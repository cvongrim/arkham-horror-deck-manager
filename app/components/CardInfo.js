/* eslint-disable no-undef */
// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {CachedImage} from 'react-native-cached-image';

// Constants
import CONSTANTS from '../constants';

// Styles
import COLORS from '../styles/colors';
import TYPES from '../styles/types';


/**
 * CardInfo
 */
class CardInfo extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Navigate to the view card screen
     * @param {string} cardImage
     * @private
     */
    _viewCard(cardImage) {
        this.props.navigator.push({
            screen: CONSTANTS.screens.card.screen,
            title: this.props.cardName,
            passProps: {
                cardImage: cardImage,
            },
        });
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View onPress={() => this._viewCard(this.props.cardImage)} style={styles.container}>
                <TouchableOpacity onPress={() => this._viewCard(this.props.cardImage)} style={styles.container}>
                <CachedImage defaultSource={require('../img/card-placeholder.jpg')}
                             fallbackSource={require('../img/card-placeholder.jpg')}
                             source={{uri: CONSTANTS.BASE_URL + this.props.cardImage}}
                             style={styles.cardImage}/>
                </TouchableOpacity>
                <View style={styles.containerInfo}>
                    <Text numberOfLines={3} style={TYPES.header}>{this.props.cardName}</Text>
                    <Text numberOfLines={1} style={TYPES.body}>{this.props.cardClass}</Text>
                    <Text numberOfLines={1} style={TYPES.body}>{this.props.cardType}</Text>
                    {this.props.selected ? <Text>Selected</Text> : null}
                </View>
            </View>
        );
    }
}

CardInfo.propTypes = {
    navigator: PropTypes.object.isRequired,
    cardImage: PropTypes.string.isRequired,
    cardName: PropTypes.string.isRequired,
    cardClass: PropTypes.string.isRequired,
    cardType: PropTypes.string.isRequired,
    selected: PropTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    containerInfo: {
        backgroundColor: COLORS.white,
        paddingLeft: 10,
        flex: 1,
    },
    cardImage: {
        height: 72,
        width: 52,
    },
});

export default CardInfo;
