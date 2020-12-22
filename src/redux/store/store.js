import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import {persistStore} from 'redux-persist'

import rootReducer from '../root-reducer'


const middlewares=[];

if(process.env.NODE_ENV==='development')
{
    middlewares.push(logger);
}

export const store=createStore(rootReducer,applyMiddleware(...middlewares))

export const persistor=persistStore(store);
// export default {store,persistor}; 

// @param reducer
// A function that returns the next state tree, given the current state tree and the action to handle.

// @param preloadedState
// The initial state. You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session. If you use combineReducers to produce the root reducer function, this must be an object with the same shape as combineReducers keys.

// @param enhancer
// The store enhancer. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is applyMiddleware().

// @returns
// A Redux store that lets you read the state, dispatch actions and subscribe to changes.

