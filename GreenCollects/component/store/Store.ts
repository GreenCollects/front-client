import { compose, applyMiddleware, createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authentication from './reducers/authentication'

const persistConfig = {
    key: 'greencollect-root',
    storage,
};

const rootReducers = persistCombineReducers(
    persistConfig,
    {authentication: authentication}
)

export default () => {
    let store = createStore(rootReducers)
    let persistor = persistStore(store)
    return { store, persistor }
};