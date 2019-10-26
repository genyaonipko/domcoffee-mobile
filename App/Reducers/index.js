import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import AuthReducer from './AuthReducers/AuthReducer';
import thunk from 'redux-thunk';
import {
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import AppNavigation from '../Navigation/AppNavigation';

const navReducer = createNavigationReducer(AppNavigation);

const navigationMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
);

const rootReducer = combineReducers({
  auth: AuthReducer,
  nav: navReducer,
});

const middleware = [thunk, navigationMiddleware];
const enhancers = [];

enhancers.push(applyMiddleware(...middleware));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(...enhancers));

export const createAction = (type, payload) => ({
  type,
  payload,
});

export default store;
