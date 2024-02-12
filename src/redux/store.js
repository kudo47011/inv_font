import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import usersReducer from "./slices/users";
import branchReducer from "./slices/branchs";
import reportReducer from "./slices/report";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    users: usersReducer,
    branchs: branchReducer,
    report: reportReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store
