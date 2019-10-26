import * as Immutable from 'seamless-immutable';
import {createAction} from '..';

export const ActionTypes = {
  login: '@@auth/login',
  loginSuccess: '@@auth/loginSuccess',
  loginFailure: '@@auth/loginFailure',
  clearLoginFailure: '@@auth/clearLoginFailure',
  signOut: '@@auth/signOutAction',
  signOutSuccess: '@@auth/signOutSuccessAction',
  setLogin: '@@auth/setLogin',
  setPassword: '@@auth/setPassword',
};
/* ------------- Types and Action Creators ------------- */
const login = () => createAction(ActionTypes.login, {});

const loginSuccess = user => createAction(ActionTypes.loginSuccess, {user});

const loginFailure = error => createAction(ActionTypes.loginFailure, {error});

const setLogin = email => createAction(ActionTypes.setLogin, email);

const setPassword = password => createAction(ActionTypes.setPassword, password);

const actions = {
  setLogin,
  setPassword,
  login,
  loginSuccess,
  loginFailure,
};

export const AuthActions = actions;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable.from({
  login: '',
  password: '',
  user: null,
  error: '',
});

/* ------------- Selectors ------------- */
const selectAuth = state => state.auth;

/* ------------- Hookup Reducers To Types ------------- */
export const AuthReducer = (state = INITIAL_STATE, action) => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case ActionTypes.setLogin:
      return state.merge({
        login: action.payload.toLowerCase(),
      });
    case ActionTypes.setPassword:
      return state.merge({
        password: action.payload,
      });

    case ActionTypes.login:
      return state.merge({
        fetching: true,
      });

    case ActionTypes.loginSuccess: {
      const {user} = action.payload;

      return state.merge({
        fetching: false,
        isAuthenticated: true,
        user,
      });
    }

    case ActionTypes.loginFailure:
      return state.merge({
        fetching: false,
        error: action.payload.error,
        isAuthenticated: false,
      });

    case ActionTypes.signOutSuccess:
      return state.merge({
        ...INITIAL_STATE.asMutable(),
      });

    default:
      return state;
  }
};
export default AuthReducer;
