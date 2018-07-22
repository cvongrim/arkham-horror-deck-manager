/* global module */
'use strict';


const BASE_URL = 'https://arkhamdb.com/'; // Production

module.exports = {
    API_URL: BASE_URL + 'api/',
    BASE_URL: BASE_URL,
    CARD_CLASSES: ['Guardian, Mystic, Rogue, Seeker, Survivor'], // TODO: Setup
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
    RELEASE: true, // Set to True when release the app to an app / play store.
    // This is the content used to connect a screen with a link
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
        },
};
