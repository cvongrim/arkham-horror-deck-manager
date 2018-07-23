/* eslint-disable no-undef */
// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {CachedImage} from 'react-native-cached-image';

// CONSTANTS
import CONSTANTS from '../constants';

// Helpers
import onNavigatorEvent from '../lib/onNavigatorEvent';

// Styles
import STYLES_GENERAL from '../styles/general';

/**
 * Card
 */
class Card extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent.bind(this));
    }


    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={STYLES_GENERAL.container}>
                <CachedImage defaultSource={require('../img/card-placeholder.jpg')}
                             fallbackSource={require('../img/card-placeholder.jpg')}
                             source={{uri: CONSTANTS.BASE_URL + this.props.cardImage}}
                             style={styles.cardImage}/>
            </View>
        );
    }
}

Card.propTypes = {
    navigator: PropTypes.object.isRequired,
    cardImage: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    cardImage: {
        alignSelf: 'center',
        height: 418,
        width: 300,
    },
});

export default Card;
