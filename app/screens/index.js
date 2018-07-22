/* eslint-disable no-console */
/* global console */
import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import Menu from './Menu';
import DeckCreate from './DeckCreate';
import DeckList from './DeckList';
import DeckSingle from './DeckSingle';
import Cards from './Cards';

// TODO Remove areas that do not need redux passed
/**
 * register all screens of the app (including internal ones)
 * @param {object} store
 * @param {object} Provider
 */
export function registerScreens(store, Provider) {
    Navigation.registerComponent('screen.Menu', () => Menu, store, Provider);
    Navigation.registerComponent('screen.DeckCreate', () => DeckCreate, store, Provider);
    Navigation.registerComponent('screen.DeckList', () => DeckList, store, Provider);
    Navigation.registerComponent('screen.DeckSingle', () => DeckSingle, store, Provider);
    Navigation.registerComponent('screen.Cards', () => Cards, store, Provider);
}

/**
 * Logs the current screen actions to console
 */
export function registerScreenVisibilityListener() {
    new ScreenVisibilityListener({
        willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
        didAppear: (
            {screen, startTime, endTime, commandType}) => console.log('screenVisibility',
            `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
        willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
        didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`),
    }).register();
}
