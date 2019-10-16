import {Reducer} from 'redux';
import * as Immutable from 'seamless-immutable';
import {createStandardAction} from 'typesafe-actions';

export enum ActionTypes {
  login = 'login',
  loginSuccess = 'loginSuccess',
  loginFailure = 'loginFailure',
  clearLoginFailure = 'clearLoginFailure',
  signOut = 'signOutAction',
  signOutSuccess = 'signOutSuccessAction',
}
/* ------------- Types and Action Creators ------------- */
export interface LoginParams {
  login: string;
  password: string;
}
export const login = createStandardAction(ActionTypes.login)<LoginParams>();

export interface LoginSuccessParams {
  accessToken?: string;
  refreshToken?: string;
  authenticatedAs: string;
  method?: 'Direct' | 'RememberMe';
}
export const loginSuccess = createStandardAction(ActionTypes.loginSuccess)<
  LoginSuccessParams
>();

export interface LoginFailureParams {
  error: string;
}
export const loginFailure = createStandardAction(ActionTypes.loginFailure)<
  LoginFailureParams
>();

export interface SignOutParams {
  silent?: boolean;
  keepPrevState?: boolean;
}
export const signOut = createStandardAction(ActionTypes.signOut)<
  SignOutParams
>();

export interface SignOutSuccessParams {
  keepPrevState?: boolean;
}
export const signOutSuccess = createStandardAction(ActionTypes.signOutSuccess)<
  SignOutSuccessParams
>();

const actions = {
  login,
  loginSuccess,
  loginFailure,
  signOut,
  signOutSuccess,
};

export const AuthActions = actions;

export interface AuthState {
  user: any
  error?: string;
  fetching?: boolean;
  isAuthenticated?: boolean;
  authenticatedAs?: string; // msisdn
}

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable.from({
  error: null,
  fetching: null,
  user: null
});

/* ------------- Selectors ------------- */
const selectAuth = (state) => state.auth;

/* ------------- Hookup Reducers To Types ------------- */
export const AuthReducer = (
  state = INITIAL_STATE,
  action,
) => {
  if (!action) return state;
  switch (action.type) {
    case ActionTypes.login:
      return state.merge({
        fetching: true,
      });

    case ActionTypes.loginSuccess: {
      const {accessToken, refreshToken, authenticatedAs} = action.payload;
      return state.merge({
        fetching: false,
        isAuthenticated: true,
        authenticatedAs,
        tokens: {
          accessToken,
          refreshToken,
        },
      });
    }

    case ActionTypes.loginFailure:
      return state.merge({
        fetching: false,
        error: action.payload.error,
        isAuthenticated: false,
        authenticatedAs: null,
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
