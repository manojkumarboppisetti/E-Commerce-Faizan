import {compose, legacy_createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import {rootReducer} from "./root-reducer";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import {rootSaga} from "./root-saga";
import createSagaMiddleware from "redux-saga";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const sagaMiddleware=createSagaMiddleware();


const middleWares = [process.env.NODE_ENV === 'development' && logger,sagaMiddleware
].filter(
    Boolean
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = (process.env.NODE_ENV === 'development' && window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);