'use strict';

import Realm from 'realm';

/**
 * Class to store a user's saved decks
 */
class Deck extends Realm.Object {
}

Deck.schema = {
    name: 'Deck',
    primaryKey: 'id',
    properties: {
        id: 'string',
        creationDate: 'date',
        name: 'string',
        investigator: {type: 'Cards'},
    },
};

/**
 * Class to store a decks's saved cards
 */
class DeckCards extends Realm.Object {
}

DeckCards.schema = {
    name: 'DeckCards',
    primaryKey: 'id',
    properties: {
        id: 'string',
        card: {type: 'Cards'},
        count: 'int',
        deck: {type: 'Deck'},

    },
};

/**
 * Class to store all the cards from the ArkhamDB API. We save them locally because the API has no implementation
 * for filtering. Saving it to Realm let's us make use of it's filtering capabilities.
 */
class Cards extends Realm.Object {
}

Cards.schema = {
    name: 'Cards',
    primaryKey: 'code',
    properties: {
        'pack_code': 'string',
        'pack_name': 'string',
        'type_code': 'string',
        'type_name': 'string',
        'faction_code': 'string',
        'faction_name': 'string',
        'position': 'int',
        'exceptional': 'bool',
        'code': 'string',
        'name': 'string',
        'real_name': 'string',
        'subname': 'string',
        'text': 'string',
        'real_text': 'string',
        'quantity': 'int',
        'skill_willpower': 'int?',
        'skill_intellect': 'int?',
        'skill_combat': 'int?',
        'skill_agility': 'int?',
        'clues_fixed': 'bool',
        'health': 'int?',
        'health_per_investigator': 'bool?',
        'sanity': 'int?',
        'deck_limit': 'int',
        'traits': 'string',
        'real_traits': 'string',
        'flavor': 'string',
        'illustrator': 'string',
        'is_unique': 'bool',
        'exile': 'bool',
        'hidden': 'bool',
        'permanent': 'bool',
        'double_sided': 'bool',
        'back_text': 'string',
        'back_flavor': 'string',
        'url': 'string',
        'imagesrc': 'string',
        'backimagesrc': 'string',
    },
};

export default new Realm({schema: [Cards, DeckCards, Deck]});
