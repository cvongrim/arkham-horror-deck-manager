// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
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
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={styles.container}>
                <CachedImage source={{uri: CONSTANTS.BASE_URL + this.props.cardImage}}
                             style={styles.cardImage}/>
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
    cardImage: PropTypes.string,
    cardName: PropTypes.string,
    cardClass: PropTypes.string,
    cardType: PropTypes.string,
    selected: PropTypes.bool,
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
        width: 52,
    },
});

export default CardInfo;
