import * as Immutable from 'seamless-immutable';
import {createSelector} from 'reselect';
import {createActions, createReducer, createTypes} from 'reduxsauce';

const ActionTypes = createTypes(`
  BOOTSTRAP
  BOOTSTRAP_SUCCESS
  BOOTSTRAP_FAILURE
`);

/* ------------- Types and Action Creators ------------- */
const {Creators} = createActions(
  {
    bootstrap: ['payload'],
    bootstrapSuccess: ['payload'],
    bootstrapFailure: ['payload'],
  },
  {},
);

export const BootstrapActions = Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable.from({
  bootstrapStatus: '',
  fetching: false,
});

/* ------------- Selectors ------------- */

export const BootstrapSelectors = {};

/* ------------- Hookup Reducers To Types ------------- */
const bootstrap = (state = INITIAL_STATE, action) => {
  return state.merge({
    fetching: true,
  });
};

const bootstrapSuccess = (state = INITIAL_STATE, action) => {
  return state.merge({
    fetching: false,
    bootstrapStatus: 'success',
  });
};

const bootstrapFailure = (state = INITIAL_STATE, action) => {
  return state.merge({
    fetching: false,
    bootstrapStatus: 'failure',
  });
};

export const HANDLERS = {
  [ActionTypes.BOOTSTRAP]: bootstrap,
  [ActionTypes.BOOTSTRAP_SUCCESS]: bootstrapSuccess,
  [ActionTypes.BOOTSTRAP_FAILURE]: bootstrapFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
