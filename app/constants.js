/* global module */
'use strict';

const BASE_URL = 'https://arkhamdb.com/'; // Production

module.exports = {
    API_URL: BASE_URL + 'api/',
    BASE_URL: BASE_URL,
    CARD_TYPES: [
        {
            type_code: 'asset',
            type_name: 'Asset',
        },
        {
            type_code: 'event',
            type_name: 'Event',
        },
        {
            type_code: 'skill',
            type_name: 'Skill',
        },
    ],
    menuData: [
        {
            icon: 'add',
            key: 'deckCreate',
            label: 'Create Deck',
            link: 'deckCreate',
        },
        {
            icon: 'list',
            key: 'deckList',
            label: 'Deck List',
            link: 'deckList',
        },
    ],
    RELEASE: true, // Set to True when release the app to an app / play store.
    // This is the content used to connect a screen with a link
    menuBarButtons: {
        menu: {
            component: 'ButtonNavBar',
            id: 'menu',
            showAsAction: 'always',
            passProps: {
                icon: 'menu',
                link: 'menu',
                label: 'Menu',
            },
        },
        addDeck: {
            component: 'ButtonNavBar',
            id: 'deckCreate',
            showAsAction: 'always',
            passProps: {
                icon: 'add',
                link: 'deckCreate',
                label: 'Deck Create',
            },
        },
    },
    screens:
        {
            deckCreate: {
                link: 'deckCreate',
                screen: 'screen.DeckCreate',
                title: 'Deck Create',
            },
            deckEdit: {
                link: 'deckEdit',
                screen: 'screen.DeckEdit',
                title: 'Deck Edit',
            },
            deckList: {
                link: 'deckList',
                screen: 'screen.DeckList',
                title: 'Deck List',
            },
            deckSingle: {
                link: 'deckSingle',
                screen: 'screen.DeckSingle',
            },
            cards: {
                link: 'cards',
                screen: 'screen.Cards',
            },
            menuScreen: {
                link: 'menu',
                screen: 'menu',
                title: '',
            },
        },
};
