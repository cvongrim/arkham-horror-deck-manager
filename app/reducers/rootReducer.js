import {persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import cards from './cards';

const config = {
    key: 'root',
    storage,
};

const rootReducer = persistCombineReducers(config, {
    cards,
});

export default rootReducer;
