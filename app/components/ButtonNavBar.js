// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Constants and Styles
import colors from '../styles/colors';

/**
 * Create custom buttons to display in the Nav bar
 */
class ButtonNavBar extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
    }

    /**
     * Render the button
     * @return {*}
     */
    render() {
        let firstStyling = {};
        let osIconStyling = {};
        let osButtonContainerStyling = {};

        // Style the first button (Farthest Right) only on Android
        // If we don't add this, is will be flush with the edge of the screen
        if (this.props.first && Platform.OS === 'android') {
            firstStyling = {
                left: -5,
            };
        }

        // Android needs some special styling to center the buttons
        if (Platform.OS === 'android') {
            osIconStyling = {
                top: 5,
            };
            osButtonContainerStyling = {
                width: 50,
            };
        }

        return (
            <TouchableOpacity
                accessible={true}
                accessibilityLabel={'Open ' + this.props.label}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                onPress={() => Navigation.handleDeepLink({link: this.props.link})}
                style={[styles.buttonContainer, osButtonContainerStyling]}
            >
                <Icon
                    style={[styles.button, firstStyling, osIconStyling]}
                    color={'#ffffff'}
                    name={this.props.icon}
                    size={30}

                />
            </TouchableOpacity>
        );
    }
}

ButtonNavBar.propTypes = {
    first: PropTypes.bool,
    icon: PropTypes.string,
    link: PropTypes.string,
    label: PropTypes.string,
};

ButtonNavBar.defaultProps = {
    color: colors.black,
    first: false,
};

const styles = StyleSheet.create({
    button: {
        height: 30,
        width: 30,
    },
    buttonContainer: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        width: 30,
    },
});

export default ButtonNavBar;
