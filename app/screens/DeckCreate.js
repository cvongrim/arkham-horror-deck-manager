import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class DeckCreate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{padding: 20}}>
                <Text>Screen Two</Text>
            </View>
        );
    }
}


export default connect()(DeckCreate);
