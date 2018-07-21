/* global module */
'use strict';


const BASE_URL = 'https://arkhamdb.com/'; // Production

module.exports = {
    API_URL: BASE_URL + 'api/',
    BASE_URL: BASE_URL,
    release: true, // Set to True when release the app to an app / play store.
    // This is the content used to connect a screen with a link
    screens:
        {
            deckCreate: {
                link: 'deckCreate',
                screen: 'screen.DeckCreate',
                title: 'Deck Create',
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
        },
};
