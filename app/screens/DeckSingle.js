// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, View} from 'react-native';


/**
 * DeckSingle
 */
class DeckSingle extends Component {
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
            <View style={{padding: 20}}>
                <Text>{this.props.deck.name}</Text>
            </View>
        );
    }
}

DeckSingle.propTypes = {
    deck: PropTypes.object.isRequired,
};

export default DeckSingle;
