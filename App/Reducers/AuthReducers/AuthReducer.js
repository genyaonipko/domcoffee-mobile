import * as Immutable from 'seamless-immutable';
import {createSelector} from 'reselect';
import {createActions, createTypes, createReducer} from 'reduxsauce';

const ActionTypes = createTypes(`
  LOGIN
  LOGIN_SUCCESS
  LOGIN_FAILURE
  SET_LOGIN
  SET_PASSWORD
`);

/* ------------- Types and Action Creators ------------- */
const {Creators} = createActions(
  {
    login: [],
    loginSuccess: ['user'],
    loginFailure: ['error'],
    setLogin: ['email'],
    setPassword: ['password'],
  },
  {},
);

export const AuthActions = Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable.from({
  login: '',
  password: '',
  user: null,
  error: '',
  fetching: false,
  isAuthenticated: false,
});

/* ------------- Selectors ------------- */
const selectAuth = state => state.auth;
const selectAuthError = createSelector(
  selectAuth,
  auth => auth.error,
);
const selectAuthFetching = createSelector(
  selectAuth,
  auth => auth.fetching,
);

export const AuthSelectors = {
  selectAuth,
  selectAuthError,
  selectAuthFetching,
};

/* ------------- Hookup Reducers To Types ------------- */
const login = (state = INITIAL_STATE, action) => {
  return state.merge({
    fetching: true,
  });
};

const loginSuccess = (state = INITIAL_STATE, action) => {
  return state.merge({
    fetching: false,
    isAuthenticated: true,
    user: action.user,
  });
};

const loginFailure = (state = INITIAL_STATE, action) => {
  return state.merge({
    fetching: false,
    error: action.error,
    isAuthenticated: false,
  });
};

const setLogin = (state = INITIAL_STATE, action) => {
  return state.merge({
    login: action.email.toLowerCase(),
  });
};

const setPassword = (state = INITIAL_STATE, action) => {
  return state.merge({
    password: action.password,
  });
};

export const HANDLERS = {
  [ActionTypes.LOGIN]: login,
  [ActionTypes.LOGIN_SUCCESS]: loginSuccess,
  [ActionTypes.LOGIN_FAILURE]: loginFailure,
  [ActionTypes.SET_PASSWORD]: setPassword,
  [ActionTypes.SET_LOGIN]: setLogin,
}

export default createReducer(INITIAL_STATE, HANDLERS);
