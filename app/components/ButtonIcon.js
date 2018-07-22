// React Library Imports
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

// Styles
import COLORS from '../styles/colors';

/**
 * Render a button that has an Icon and Label
 */
class ButtonIcon extends Component {
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
        return (
            <TouchableOpacity
                accessible={true}
                accessibilityLabel={'Open ' + this.props.label}
                style={styles.buttonContainer}
                onPress={() => this.props.action(this.props.link)}>
                {ButtonIcon._renderIcon(this.props.icon, this.props.color)}
                <Text allowFontScaling={false} style={[styles.buttonText]}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }

    /**
     * Render the icon if available
     *
     * @param {string} icon
     * @param {string} color Color Hex to make icon
     * @return {*}
     * @private
     */
    static _renderIcon(icon = null, color = COLORS.white) {
        if (icon) {
            return (
                <Icon
                    color={color}
                    name={icon}
                    size={30}
                />);
        }
    }
}

ButtonIcon.propTypes = {
    action: PropTypes.func.isRequired,
    color: PropTypes.string,
    icon: PropTypes.string,
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingVertical: 8,
    },
    buttonText: {
        alignSelf: 'center',
        flex: 1,
        marginLeft: 12,
    },
});

export default ButtonIcon;
