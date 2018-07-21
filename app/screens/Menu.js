// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';

// Constants
import CONSTANTS from '../constants';

/**
 * Menu
 */
class Menu extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Close the menu
     * @private
     */
    _closeMenu() {
        this.props.navigator.toggleDrawer({
            side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        });
    }

    /**
     * Go to create deck screen
     * @private
     */
    _createDeck() {
        this._closeMenu();
        this.props.navigator.handleDeepLink({
            screen: CONSTANTS.screens.deckCreate.screen,
            title: CONSTANTS.screens.deckCreate.title,
        });
    }

    /**
     * Render the view
     * @return {object} Return JSX Object to render
     */
    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this._createDeck()}
                    title="Add Deck"
                    color="#841584"
                    accessibilityLabel="Add Deck"
                />
                <Button
                    onPress={() => this._closeMenu()}
                    title="Close Menu"
                    color="#841584"
                    accessibilityLabel="Close Menu"
                />
            </View>
        );
    }
}

Menu.propTypes = {
    navigator: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default Menu;
