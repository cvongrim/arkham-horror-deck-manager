// React Library Imports
import React, {Component} from 'react';
import {
    FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

// Constants and Styles
import CONSTANTS from '../constants';
import COLORS from '../styles/colors';

// Components
import ButtonIcon from '../components/ButtonIcon';


/**
 * The Side Bar Menu
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
            side: 'left',
        });
    }

    /**
     * Open a Screen
     * @param {string} link the screen to open
     */
    async goToLink(link) {
        this._closeMenu();
        this.props.navigator.handleDeepLink({
            link: link,
        });
    }

    /**
     * Render the Menu
     * @return {*}
     */
    render() {
        return (<View style={styles.menuContainer}>
            <View style={styles.headerContainer}>
                <Text
                    allowFontScaling={false}
                    style={[styles.headerText]}>Arkham Horror Deck Manager</Text>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={'Close Menu'}
                    hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                    onPress={() => this._closeMenu()}
                    style={styles.buttonClose}>
                    <Icon
                        color={COLORS.white}
                        name={'close'}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={CONSTANTS.menuData}
                style={styles.list}
                renderItem={({item}) => <ButtonIcon
                    action={(link) => this.goToLink(link)}
                    color={COLORS.grey}
                    icon={item.icon}
                    key={item.label}
                    label={item.label}
                    link={item.link}/>}
            />
        </View>);
    }
}

Menu.propTypes = {
    navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    buttonClose: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerContainer: {
        backgroundColor: COLORS.brown,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    headerText: {
        color: COLORS.white,
        lineHeight: 28,
    },
    list: {
        flex: 1,
    },
    menuContainer: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
});

export default Menu;
