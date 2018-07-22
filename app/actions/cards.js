import * as types from './types';
import CONSTANTS from '../constants';
import realm from '../realm';
import moment from 'moment';

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
 * @param {object} cards
 * @return {{type: string, cards: *, receivedAt: number}}
 */
export function receiveCardData(cards) {
    return {
        type: types.RECEIVE_CARDS_DATA,
        cards: cards,
        receivedAt: Date.now(),
    };
}

/**
 * Checks if the data is less than 7 days old, if so, we use the data saved to redux.
 * @param {object} state
 * @return {boolean}
 */
function shouldFetchCards(state) {
    const cards = state.cards;

    if (!cards) {
        return true;
    } else if (cards.isFetching) {
        return false;
    } else if (cards.lastUpdated && moment(cards.lastUpdated, 'x').isAfter(moment().subtract(7, 'days'))) {
        // We return the stored data if it's been less than a day
        return false;
    } else {
        return true;
    }
}

/**
 * Get card data
 * @return {Function}
 */
export function getAllCardData() {
    return async (dispatch, getState) => {
        if (shouldFetchCards(getState())) {
            try {
                dispatch(requestCardData());
                let cards = await _fetchAllCardData();


                realm.write(() => {
                    cards.forEach(function(card) {
                        try {
                            realm.create('Cards', card, true);
                        } catch (e) {
                            // eslint-disable-next-line no-console,no-undef
                            console.log(e);
                        }
                    });
                });

                dispatch(receiveCardData(cards));
                return cards;
            } catch (error) {
                return error;
            }
        }
    };
}

/**
 * Fetch cards from API
 * @return {Promise<*>}
 */
function _fetchAllCardData() {
    // eslint-disable-next-line no-undef
    return fetch(CONSTANTS.API_URL + 'public/cards/core.json', {method: 'GET'}).then((response) => response.json());
}
