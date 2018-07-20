import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    _closeMenu() {
        this.props.navigator.toggleDrawer({
            side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        });
    }

    _secondScreen() {
        this._closeMenu();
        this.props.navigator.handleDeepLink({
            link: 'screen.DeckCreate',
        });
    }


    render() {
        return (
            <View style={{backgroundColor: '#c6c6c6', flex: 1, padding: 20}}>
                <Text>Logout</Text>
                <Button
                    onPress={() => this._closeMenu()}
                    title="Close Menu"
                    color="#841584"
                    accessibilityLabel="Close Menu"
                />
                <Button
                    onPress={() => this._secondScreen()}
                    title="Second Screen"
                    color="#841584"
                    accessibilityLabel="Second Screen"
                />
            </View>
        );
    }
}

export default connect()(Menu);
