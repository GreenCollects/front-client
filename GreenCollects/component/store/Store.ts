import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
// import storage from "redux-persist/es/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authenticationReducer from './reducers/authentication'

const persistConfig = {
    key: 'greencollect-root',
    storage: AsyncStorage,
};

const rootReducers = persistCombineReducers(
    persistConfig,
    {authentication: authenticationReducer}
);
export type RootState = ReturnType<typeof rootReducers>

export default () => {
    let store = createStore(rootReducers)
    let persistor = persistStore(store)
    return { store, persistor }
};