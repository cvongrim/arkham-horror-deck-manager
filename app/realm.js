'use strict';

import Realm from 'realm';

class Deck extends Realm.Object {
}

Deck.schema = {
    name: 'Deck',
    primaryKey: 'id',
    properties: {
        creationDate: 'date',
        name: 'string',
        id: 'string',
    },
};

export default new Realm({schema: [Deck]});
