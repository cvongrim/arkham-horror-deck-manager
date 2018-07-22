// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View} from 'react-native';

// Components
import CardList from '../components/CardList';

// Styles
import STYLES_GENERAL from '../styles/general';

/**
 * DeckCreate
 */
class Cards extends Component {
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
            <View style={STYLES_GENERAL.container}>
                <CardList deck={this.props.deck}/>
            </View>
        );
    }
}

Cards.propTypes = {
    deck: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
};

export default Cards;
