// Make sure to import and assign the reducer in the reducers/index.js
import * as types from '../actions/types';
import initialState from './initialState';

/**
 * Manipulate the state based on the passed action
 * @param {object} state
 * @param {array} action
 * @return {*}
 */
export default function(state = initialState.cardsData, action) {
    switch (action.type) {
        case types.INVALIDATE_CARDS_DATA:
            return {
                ...state,
                didInvalidate: true,
            };
        case types.RECEIVE_CARDS_DATA:
            return {
                ...state,
                didInvalidate: false,
                isFetching: false,
                cards: action.cards,
                lastUpdated: action.receivedAt,
            };
        case types.REQUEST_CARDS_DATA:
            return {
                ...state,
                didInvalidate: false,
                isFetching: true,
            };
        default:
            return state;
    }
}

