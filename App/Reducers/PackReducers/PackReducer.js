import * as Immutable from 'seamless-immutable';
import {createSelector} from 'reselect';
import {createActions, createReducer, createTypes} from 'reduxsauce';
import {mergeWith, add} from 'ramda';

const ActionTypes = createTypes(`
  PACK_INIT
  PACK_SUCCESS
  PACK_FAILURE
  SELECT_PACK_ID
`);

/* ------------- Types and Action Creators ------------- */
const {Creators} = createActions(
  {
    packInit: ['payload'],
    packSuccess: ['payload'],
    packFailure: ['payload'],
    selectPackId: ['payload'],
  },
  {},
);

export const PackActions = Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable.from({
  data: [],
  fetching: false,
  error: '',
  selectedPackId: 'pack_0',
});

/* ------------- Selectors ------------- */

const selectPack = state => state.pack;
const selectFetching = createSelector(
  selectPack,
  pack => pack.fetching,
);
const selectPackData = createSelector(
  selectPack,
  packs => {
    let obj = {};
    packs.data.forEach(item => {
      obj = mergeWith(add, obj, item.data);
    });
    return Object.keys(obj).map(item => {
      return {
        value: obj[item],
        name: item,
      };
    });
  },
);

const getSelectedPackId = createSelector(
  selectPack,
  pack => pack.selectedPackId,
);

export const PackSelectors = {
  selectPack,
  selectFetching,
  selectPackData,
  getSelectedPackId,
};

/* ------------- Hookup Reducers To Types ------------- */
const packInit = (state = INITIAL_STATE, action) => {
  return state.merge({
    fetching: true,
  });
};

const packSuccess = (state = INITIAL_STATE, action) => {
  return state.merge({
    fetching: false,
    data: action.payload,
  });
};

const packFailure = (state = INITIAL_STATE, action) => {
  return state.merge({
    fetching: false,
    error: action.payload,
  });
};

const selectPackId = (state = INITIAL_STATE, action) => {
  return state.merge({
    selectedPackId: action.payload,
  });
};

export const HANDLERS = {
  [ActionTypes.PACK_INIT]: packInit,
  [ActionTypes.PACK_SUCCESS]: packSuccess,
  [ActionTypes.PACK_FAILURE]: packFailure,
  [ActionTypes.SELECT_PACK_ID]: selectPackId,
};

export default createReducer(INITIAL_STATE, HANDLERS);
