import {Component} from 'react';
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

/**
 * App
 */
class App extends Component {
    /**
     * Constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.startApp();
    }

    /**
     * Start our app!
     */
    startApp() {
        persistStore(store, null, () => {
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'screen.DeckList', // unique ID registered with Navigation.registerScreen
                },
                drawer: { // optional, add this if you want a side menu drawer in your app
                    left: { // optional, define if you want a drawer from the left
                        screen: 'screen.Menu', // unique ID registered with Navigation.registerScreen
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
