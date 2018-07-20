import React, {Component} from 'react';
import {Text, View} from 'react-native';

class DeckSingle extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{padding: 20}}>
                <Text>{this.props.deck.name}</Text>
            </View>
        );
    }
}


export default DeckSingle;
