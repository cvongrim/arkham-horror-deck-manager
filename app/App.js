import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import { persistStore } from 'redux-persist';

import {registerScreens, registerScreenVisibilityListener} from './screens/index';
import configureStore from './store/configureStore';

const store = configureStore();

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
                        drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                        contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
                        leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
                        rightDrawerWidth: 50 // optional, add this if you want a define right drawer width (50=percent)
                    },
                    type: 'TheSideBar', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
                    animationType: 'door', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
                    // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
                    disableOpenGesture: true // optional, can the drawer, both right and left, be opened with a swipe instead of button
                },
            });
        })
    }
}

export default App;
