// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';

// Helpers
import onNavigatorEvent from '../lib/onNavigatorEvent';

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

        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent.bind(this));
    }

    /**
     * Close the menu
     * @private
     */
    _closeMenu() {
        this.props.navigator.toggleDrawer({
            side: 'left',
        });
    }

    /**
     * Go to create deck screen
     * @private
     */
    _createDeck() {
        this._closeMenu();
        this.props.navigator.handleDeepLink({
            link: 'deckCreate',
        });
    }

    /**
     * Go to create deck screen
     * @private
     */
    _showDecks() {
        this._closeMenu();
        this.props.navigator.handleDeepLink({
            link: 'deckList',
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
                    onPress={() => this._showDecks()}
                    title="Deck List"
                    color="#841584"
                    accessibilityLabel="Deck List"
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
