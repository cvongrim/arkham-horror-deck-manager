import {combineReducers} from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import example from './example'
const config = {
    key: 'root',
    storage,
};

const rootReducer = persistCombineReducers(config, {
    example
});

export default rootReducer;