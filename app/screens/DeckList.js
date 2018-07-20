import React, {Component} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as exampleActions from '../actions/example';

// Helpers
import onNavigatorEvent from '../lib/onNavigatorEvent';
import CONSTANTS from '../constants';

class FirstTabScreen extends Component {

    static navigatorButtons = {
        leftButtons: [
            {
                title: 'Menu',
                id: 'menu',
                showAsAction: 'always'
            }
        ],
        rightButtons: [
            {
                title: 'Add Deck',
                id: CONSTANTS.screens.deckCreate.link,
                showAsAction: 'always'
            }
        ]
    };

    static navigatorStyle = {
        navBarHidden: false
    };

    constructor(props) {
        super(props);

        this.state = {text: "Enter New Test Data"};

        this._updateExampleReduxData = this._updateExampleReduxData.bind(this);
        this.props.navigator.setOnNavigatorEvent(onNavigatorEvent.bind(this));
    }

    _updateExampleReduxData(text) {
        this.props.actions.setExampleData(text);
    }

    render() {
        const {example} = this.props;
        return (
            <View style={{flex: 1, padding: 20}}>
                <Text>Props Data</Text>
                <Text>{example.details}</Text>
                <TextInput
                    style={{borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Button
                    onPress={() => this._updateExampleReduxData(this.state.text)}
                    title="Update State"
                    color="#841584"
                    accessibilityLabel="Update State"
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    const {example} = state;
    return {example}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(exampleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstTabScreen);
