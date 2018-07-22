import reducer from '../../../app/reducers/cards';
import * as types from '../../../app/actions/types';

describe('reducer', () => {
    it('Test invalidating cards data', () => {
        const state = {
            didInvalidate: false,
            isFetching: false,
            lastUpdated: 12313213,
            cards: [{
                'pack_code': 'core',
                'pack_name': 'Core Set',
                'type_code': 'investigator',
                'type_name': 'Investigator',
                'faction_code': 'guardian',
                'faction_name': 'Guardian',
                'position': 1,
                'exceptional': false,
                'code': '01001',
                'name': 'Roland Banks',
                'real_name': 'Roland Banks',
                'subname': 'The Fed',
                'text': '[reaction] After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.',
                'real_text': '[reaction] After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.',
                'quantity': 1,
                'skill_willpower': 3,
                'skill_intellect': 3,
                'skill_combat': 4,
                'skill_agility': 2,
                'clues_fixed': false,
                'health': 9,
                'health_per_investigator': false,
                'sanity': 5,
                'deck_limit': 1,
                'traits': 'Agency. Detective.',
                'real_traits': 'Agency. Detective.',
                'deck_requirements': {
                    'size': 30,
                    'card': {
                        '01006': {
                            '98005': '98005',
                            '01006': '01006',
                        },
                        '01007': {
                            '98006': '98006',
                            '01007': '01007',
                        },
                    },
                    'random': [
                        {
                            'target': 'subtype',
                            'value': 'basicweakness',
                        },
                    ],
                },
                'deck_options': [
                    {
                        'faction': [
                            'guardian',
                            'neutral',
                        ],
                        'level': {
                            'min': 0,
                            'max': 5,
                        },
                    },
                    {
                        'faction': [
                            'seeker',
                        ],
                        'level': {
                            'min': 0,
                            'max': 2,
                        },
                    },
                ],
                'flavor': 'Everything by the book: every "i" dotted, every "t" crossed. It has worked, until now.',
                'illustrator': 'Magali Villeneuve',
                'is_unique': true,
                'exile': false,
                'hidden': false,
                'permanent': false,
                'double_sided': true,
                'back_text': '<b>Deck size</b>: 30.\n<b>Deckbuilding options</b>: Guardian cards ([guardian]) level 0-5, Seeker cards ([seeker]) level 0-2, Neutral cards level 0-5.\n<b>Deckbuilding requirements</b> (do not count toward deck size): Roland\'s .38 Special, Cover Up, 1 random basic weakness.',
                'back_flavor': 'Roland had always taken comfort in procedure and rules. As an agent in the Bureau, he was relieved to have guidelines to follow in any given situation. But lately, his Federal Agent\'s Handbook had been entirely unhelpful given the cases he\'d been assigned. Try as he might, Roland could find no mention of what to do when confronted with strange creatures, gates through time and space, or magic spells. If he hadn\'t seen it with his own eyes, he would never have believed it... and there\'s no way his superiors would understand. Roland knew he would have to handle this one himself.',
                'octgn_id': '25f013a5-4ca2-4a34-9d03-e11e8ed93aaf:87041f6f-a325-4b5f-92b6-2df4d01790b1',
                'url': 'https://arkhamdb.com/card/01001',
                'imagesrc': '/bundles/cards/01001.png',
                'backimagesrc': '/bundles/cards/01001b.png',
            }],
        };


        const action = {
            type: types.INVALIDATE_CARDS_DATA,
        };

        const expectedResult = {
            ...state,
            didInvalidate: true,
        };

        expect(reducer(state, action)).toEqual(expectedResult);
    });
});

describe('reducer', () => {
    it('Test receive cards data', () => {
        const state = {
            didInvalidate: false,
            isFetching: true,
            lastUpdated: 12313213,
            cards: null,
        };


        const action = {
            type: types.RECEIVE_CARDS_DATA,
            cards: [{
                'pack_code': 'core',
                'pack_name': 'Core Set',
                'type_code': 'investigator',
                'type_name': 'Investigator',
                'faction_code': 'guardian',
                'faction_name': 'Guardian',
                'position': 1,
                'exceptional': false,
                'code': '01001',
                'name': 'Roland Banks',
                'real_name': 'Roland Banks',
                'subname': 'The Fed',
                'text': '[reaction] After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.',
                'real_text': '[reaction] After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.',
                'quantity': 1,
                'skill_willpower': 3,
                'skill_intellect': 3,
                'skill_combat': 4,
                'skill_agility': 2,
                'clues_fixed': false,
                'health': 9,
                'health_per_investigator': false,
                'sanity': 5,
                'deck_limit': 1,
                'traits': 'Agency. Detective.',
                'real_traits': 'Agency. Detective.',
                'deck_requirements': {
                    'size': 30,
                    'card': {
                        '01006': {
                            '98005': '98005',
                            '01006': '01006',
                        },
                        '01007': {
                            '98006': '98006',
                            '01007': '01007',
                        },
                    },
                    'random': [
                        {
                            'target': 'subtype',
                            'value': 'basicweakness',
                        },
                    ],
                },
                'deck_options': [
                    {
                        'faction': [
                            'guardian',
                            'neutral',
                        ],
                        'level': {
                            'min': 0,
                            'max': 5,
                        },
                    },
                    {
                        'faction': [
                            'seeker',
                        ],
                        'level': {
                            'min': 0,
                            'max': 2,
                        },
                    },
                ],
                'flavor': 'Everything by the book: every "i" dotted, every "t" crossed. It has worked, until now.',
                'illustrator': 'Magali Villeneuve',
                'is_unique': true,
                'exile': false,
                'hidden': false,
                'permanent': false,
                'double_sided': true,
                'back_text': '<b>Deck size</b>: 30.\n<b>Deckbuilding options</b>: Guardian cards ([guardian]) level 0-5, Seeker cards ([seeker]) level 0-2, Neutral cards level 0-5.\n<b>Deckbuilding requirements</b> (do not count toward deck size): Roland\'s .38 Special, Cover Up, 1 random basic weakness.',
                'back_flavor': 'Roland had always taken comfort in procedure and rules. As an agent in the Bureau, he was relieved to have guidelines to follow in any given situation. But lately, his Federal Agent\'s Handbook had been entirely unhelpful given the cases he\'d been assigned. Try as he might, Roland could find no mention of what to do when confronted with strange creatures, gates through time and space, or magic spells. If he hadn\'t seen it with his own eyes, he would never have believed it... and there\'s no way his superiors would understand. Roland knew he would have to handle this one himself.',
                'octgn_id': '25f013a5-4ca2-4a34-9d03-e11e8ed93aaf:87041f6f-a325-4b5f-92b6-2df4d01790b1',
                'url': 'https://arkhamdb.com/card/01001',
                'imagesrc': '/bundles/cards/01001.png',
                'backimagesrc': '/bundles/cards/01001b.png',
            }],
            receivedAt: 12313213,
        };

        const expectedResult = {
            didInvalidate: false,
            isFetching: false,
            lastUpdated: 12313213,
            cards: [{
                'pack_code': 'core',
                'pack_name': 'Core Set',
                'type_code': 'investigator',
                'type_name': 'Investigator',
                'faction_code': 'guardian',
                'faction_name': 'Guardian',
                'position': 1,
                'exceptional': false,
                'code': '01001',
                'name': 'Roland Banks',
                'real_name': 'Roland Banks',
                'subname': 'The Fed',
                'text': '[reaction] After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.',
                'real_text': '[reaction] After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.',
                'quantity': 1,
                'skill_willpower': 3,
                'skill_intellect': 3,
                'skill_combat': 4,
                'skill_agility': 2,
                'clues_fixed': false,
                'health': 9,
                'health_per_investigator': false,
                'sanity': 5,
                'deck_limit': 1,
                'traits': 'Agency. Detective.',
                'real_traits': 'Agency. Detective.',
                'deck_requirements': {
                    'size': 30,
                    'card': {
                        '01006': {
                            '98005': '98005',
                            '01006': '01006',
                        },
                        '01007': {
                            '98006': '98006',
                            '01007': '01007',
                        },
                    },
                    'random': [
                        {
                            'target': 'subtype',
                            'value': 'basicweakness',
                        },
                    ],
                },
                'deck_options': [
                    {
                        'faction': [
                            'guardian',
                            'neutral',
                        ],
                        'level': {
                            'min': 0,
                            'max': 5,
                        },
                    },
                    {
                        'faction': [
                            'seeker',
                        ],
                        'level': {
                            'min': 0,
                            'max': 2,
                        },
                    },
                ],
                'flavor': 'Everything by the book: every "i" dotted, every "t" crossed. It has worked, until now.',
                'illustrator': 'Magali Villeneuve',
                'is_unique': true,
                'exile': false,
                'hidden': false,
                'permanent': false,
                'double_sided': true,
                'back_text': '<b>Deck size</b>: 30.\n<b>Deckbuilding options</b>: Guardian cards ([guardian]) level 0-5, Seeker cards ([seeker]) level 0-2, Neutral cards level 0-5.\n<b>Deckbuilding requirements</b> (do not count toward deck size): Roland\'s .38 Special, Cover Up, 1 random basic weakness.',
                'back_flavor': 'Roland had always taken comfort in procedure and rules. As an agent in the Bureau, he was relieved to have guidelines to follow in any given situation. But lately, his Federal Agent\'s Handbook had been entirely unhelpful given the cases he\'d been assigned. Try as he might, Roland could find no mention of what to do when confronted with strange creatures, gates through time and space, or magic spells. If he hadn\'t seen it with his own eyes, he would never have believed it... and there\'s no way his superiors would understand. Roland knew he would have to handle this one himself.',
                'octgn_id': '25f013a5-4ca2-4a34-9d03-e11e8ed93aaf:87041f6f-a325-4b5f-92b6-2df4d01790b1',
                'url': 'https://arkhamdb.com/card/01001',
                'imagesrc': '/bundles/cards/01001.png',
                'backimagesrc': '/bundles/cards/01001b.png',
            }],
        };

        expect(reducer(state, action)).toEqual(expectedResult);
    });
});

describe('reducer', () => {
    it('Test request card data', () => {
        const state = {
            didInvalidate: false,
            isFetching: false,
            lastUpdated: 12313213,
            cards: [{
                'pack_code': 'core',
                'pack_name': 'Core Set',
                'type_code': 'investigator',
                'type_name': 'Investigator',
                'faction_code': 'guardian',
                'faction_name': 'Guardian',
                'position': 1,
                'exceptional': false,
                'code': '01001',
                'name': 'Roland Banks',
                'real_name': 'Roland Banks',
                'subname': 'The Fed',
                'text': '[reaction] After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.',
                'real_text': '[reaction] After you defeat an enemy: Discover 1 clue at your location. (Limit once per round.)\n[elder_sign] effect: +1 for each clue on your location.',
                'quantity': 1,
                'skill_willpower': 3,
                'skill_intellect': 3,
                'skill_combat': 4,
                'skill_agility': 2,
                'clues_fixed': false,
                'health': 9,
                'health_per_investigator': false,
                'sanity': 5,
                'deck_limit': 1,
                'traits': 'Agency. Detective.',
                'real_traits': 'Agency. Detective.',
                'deck_requirements': {
                    'size': 30,
                    'card': {
                        '01006': {
                            '98005': '98005',
                            '01006': '01006',
                        },
                        '01007': {
                            '98006': '98006',
                            '01007': '01007',
                        },
                    },
                    'random': [
                        {
                            'target': 'subtype',
                            'value': 'basicweakness',
                        },
                    ],
                },
                'deck_options': [
                    {
                        'faction': [
                            'guardian',
                            'neutral',
                        ],
                        'level': {
                            'min': 0,
                            'max': 5,
                        },
                    },
                    {
                        'faction': [
                            'seeker',
                        ],
                        'level': {
                            'min': 0,
                            'max': 2,
                        },
                    },
                ],
                'flavor': 'Everything by the book: every "i" dotted, every "t" crossed. It has worked, until now.',
                'illustrator': 'Magali Villeneuve',
                'is_unique': true,
                'exile': false,
                'hidden': false,
                'permanent': false,
                'double_sided': true,
                'back_text': '<b>Deck size</b>: 30.\n<b>Deckbuilding options</b>: Guardian cards ([guardian]) level 0-5, Seeker cards ([seeker]) level 0-2, Neutral cards level 0-5.\n<b>Deckbuilding requirements</b> (do not count toward deck size): Roland\'s .38 Special, Cover Up, 1 random basic weakness.',
                'back_flavor': 'Roland had always taken comfort in procedure and rules. As an agent in the Bureau, he was relieved to have guidelines to follow in any given situation. But lately, his Federal Agent\'s Handbook had been entirely unhelpful given the cases he\'d been assigned. Try as he might, Roland could find no mention of what to do when confronted with strange creatures, gates through time and space, or magic spells. If he hadn\'t seen it with his own eyes, he would never have believed it... and there\'s no way his superiors would understand. Roland knew he would have to handle this one himself.',
                'octgn_id': '25f013a5-4ca2-4a34-9d03-e11e8ed93aaf:87041f6f-a325-4b5f-92b6-2df4d01790b1',
                'url': 'https://arkhamdb.com/card/01001',
                'imagesrc': '/bundles/cards/01001.png',
                'backimagesrc': '/bundles/cards/01001b.png',
            }],
        };


        const action = {
            type: types.REQUEST_CARDS_DATA,
        };

        const expectedResult = {
            ...state,
            didInvalidate: false,
            isFetching: true,
        };

        expect(reducer(state, action)).toEqual(expectedResult);
    });
});

