// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {CachedImage} from 'react-native-cached-image';

// Styles
import CONSTANTS from '../constants';
import COLORS from '../styles/colors';
import TYPES from '../styles/types';

/**
 * DeckInfo
 */
class DeckInfo extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={styles.container}>
                    <CachedImage source={{uri: CONSTANTS.BASE_URL + this.props.cardImage}}
                                 style={styles.cardImage}/>
                <View style={styles.containerInfo}>
                    <Text numberOfLines={3} style={TYPES.header}>{this.props.deckName}</Text>
                    <Text numberOfLines={1} style={TYPES.body}>{this.props.deckInvestigator}</Text>
                    <Text numberOfLines={1} style={TYPES.body}>{this.props.deckType}</Text>
                </View>
            </View>
        );
    }
}

DeckInfo.propTypes = {
    cardImage: PropTypes.string,
    deckName: PropTypes.string,
    deckInvestigator: PropTypes.string,
    deckType: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    containerInfo: {
        backgroundColor: COLORS.white,
        paddingLeft: 10,
    },
    cardImage: {
        height: 72,
        width: 100,
    },
    textDeckName: {
        fontSize: 16,
    },
    textGeneral: {
        fontSize: 12,
    },
});

export default DeckInfo;
