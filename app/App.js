import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';

import {registerScreens, registerScreenVisibilityListener} from './screens/index';
import configureStore from './store/configureStore';

const store = configureStore();

// Constants and Styles
import colors from './styles/colors';

registerScreens(store, Provider);
registerScreenVisibilityListener();

class App extends Component {
    constructor(props) {
        super(props);
        this.startApp();
    }

    startApp() {
        persistStore(store, null, () => {
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'screen.DeckList', // unique ID registered with Navigation.registerScreen
                },
                drawer: { // optional, add this if you want a side menu drawer in your app
                    left: { // optional, define if you want a drawer from the left
                        screen: 'screen.Menu', // unique ID registered with Navigation.registerScreen
                        passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                        disableOpenGesture: true, // can the drawer be opened with a swipe instead of button (optional, Android only)
                        fixedWidth: 500, // a fixed width you want your left drawer to have (optional)
                    },
                    style: { // ( iOS only )
                        drawerShadow: true,
                        contentOverlayColor: 'rgba(0,0,0,0.25)',
                    },
                    type: 'MMDrawer',
                    animationType: 'slide',
                    disableOpenGesture: true,
                },
                appStyle: {
                    drawUnderStatusBar: true,
                    navBarTextColor: colors.white,
                    navBarBackgroundColor: colors.brown,
                    navBarButtonColor: colors.white,
                    navBarTitleTextCentered: true,
                    orientation: 'portrait',
                    screenBackgroundColor: colors.beige,
                    statusBarColor: colors.brown,
                    statusBarTextColorScheme: 'dark',
                },
            });
        });
    }
}

export default App;
