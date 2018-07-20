// Make sure to import and assign the reducer in the reducers/rootReducer.js
import * as types from '../actions/types'
import initialState from './initialState';

export default function (state = initialState.exampleData, action) {
    switch (action.type) {

        case types.SET_EXAMPLE_DATA:
            return {
                ...state,
                details: action.data
            };

        default:
            return state;
    }
}