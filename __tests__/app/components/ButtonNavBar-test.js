/* global test expect */
import 'react-native';
import React from 'react';
import ButtonNavBar from '../../../app/components/ButtonNavBar';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import colorStyles from '../../../app/styles/colors';

test('ButtonNavBar renders correctly', () => {
    const tree = renderer.create(<ButtonNavBar
        color={colorStyles.black}
        icon={'menu'}
        link={'menuScreen'}
        label={'Menu'}
        first={true} />).toJSON();
    expect(tree).toMatchSnapshot();
});
