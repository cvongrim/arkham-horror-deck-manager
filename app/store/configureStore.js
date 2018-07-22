import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

let middleware = [thunk];

// eslint-disable-next-line no-undef
if (__DEV__) {
// eslint-disable-next-line no-undef
    const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
    middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
    middleware = [...middleware];
}

/**
 * Set up our redux store
 * @param {object} initialState
 * @return {Store<S>}
 */
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
}
