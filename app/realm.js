'use strict';

import Realm from 'realm';

class Deck extends Realm.Object {}
Deck.schema = {
    name: 'Deck',
    properties: {
        name: 'string',
        creationDate: 'date',
    },
};

export default new Realm({schema: [Deck]});
