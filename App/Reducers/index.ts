import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import AuthReducer from './AuthReducers/AuthReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
})

const middleware: any[] = [];
const enhancers: any[] = [];

enhancers.push(applyMiddleware(...middleware));

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
