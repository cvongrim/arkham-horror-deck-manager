import * as types from './types';
import CONSTANTS from '../constants';
import realm from '../realm';

/**
 * Invalidate card data
 * @return {{type: string}}
 */
export function invalidateCardData() {
    return {
        type: types.INVALIDATE_CARDS_DATA,
    };
}

/**
 * Request card data. This sets the isFetching to true so that we know to not make a request again
 * @return {{type: string}}
 */
export function requestCardData() {
    return {
        type: types.REQUEST_CARDS_DATA,
    };
}

/**
 * Set the card data to the local store
 * @return {{type: string, media: *, receivedAt: number}}
 */
export function receiveCardData() {
    return {
        type: types.RECEIVE_CARDS_DATA,
        receivedAt: Date.now(),
    };
}

/**
 * Get card data
 * @return {Function}
 */
export function getAllCardData() {
    return async (dispatch, getState) => {
        try {
            dispatch(requestCardData());
            let cards = await _fetchAllCardData();

            // TODO: Break out?
            realm.write(() => {
                cards.forEach(function(card){
                    try {
                        realm.create('Cards', card, true);
                    } catch (e) {
                        console.log(e);
                    }
                });
            });

            dispatch(receiveCardData());
            return cards;
        } catch (error) {
            return error;
        }
    };
}

/**
 * Fetch cards from API
 * @return {Promise<*>}
 */
function _fetchAllCardData() {
    return fetch(CONSTANTS.API_URL + 'public/cards/core.json', {method: 'GET'}).then((response) => response.json());
}
