import React, {Component} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as exampleActions from '../actions/example';

class FirstTabScreen extends Component {

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Menu',
                id: 'menu',
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
        this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    }

    _updateExampleReduxData(text) {
        this.props.actions.setExampleData(text);
    }

    /**
     *
     * This may need to be moved to it's own class so it can be used it more than one screen
     *
     * **/
    _onNavigatorEvent(event) {
        switch (event.type) {
            case 'NavBarButtonPress':
                if (event.id === 'menu') { // this is the same id field from the static navigatorButtons definition
                    this.props.navigator.toggleDrawer({
                        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                    });
                }
                break;
            case 'DeepLink':
                const parts = event.link.split('/'); // Link parts
                const payload = event.payload; // (optional) The payload

                switch (parts[0]) {
                    case 'logout':
                        this.props.navigator.resetTo({
                            screen: 'example.LoginScreen'
                        });
                        break;
                    case 'secondScreen':
                        this.props.navigator.push({
                            screen: 'example.SecondScreen',
                            title: 'Passed ID: ' + parts[1]
                        });
                        break;
                }
                break;
        }
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