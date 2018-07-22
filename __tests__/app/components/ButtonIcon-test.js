/* global test expect */
/* eslint-disable no-console */
import 'react-native';
import React from 'react';
import ButtonIcon from '../../../app/components/ButtonIcon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import colorStyles from '../../../app/styles/colors';

test('ButtonIcon renders correctly', () => {
    const tree = renderer.create(<ButtonIcon
        action={(link) => console.log('Tap!')}
        color={colorStyles.grey}
        icon={'menu'}
        key={'menu'}
        label={'Menu'}
        link={'menu'}/>).toJSON();
    expect(tree).toMatchSnapshot();
});
