import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducers';

const middlewares = [];

const store = configureStore({
    reducer: rootReducer(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(middlewares),
    devTools: process.env.NODE_ENV === 'development',
});

store.asyncReducers = {};

store.subscribe(() => {
    // console.log('State changed:', store.getState());
});

export const injectReducer = (key, reducer) => {
    if (store.asyncReducers[key]) {
        return false;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(rootReducer(store.asyncReducers));
    return store;
};

export default store;
