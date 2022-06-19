import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getAllTrees: [],
  getAllTreesSuccess: ['data'],

  addNewTree: ['treeName'],
  addNewTreeSuccess: ['data'],

  setLoaders: ['key', 'isLoad'],
});

export const TreesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  loaders: {},
  treesList: [],
};

/* ------------- Selectors ------------- */
export const treesSelectors = {
  treesList: (state) => state.trees.treesList,
  isLoading: (key, state) => state.trees.loaders[key],
};

/* ------------- Reducers ------------- */
export const getAllTreesSuccessReducer = (state = INITIAL_STATE, action) => {
  const { data } = action;
  return {
    ...state,
    treesList: data,
  };
};

export const addNewTreeSuccessReducer = (state = INITIAL_STATE, action) => {
  const { data } = action;
  const arr = state.treesList;
  arr.push(data);
  return {
    ...state,
    treesList: arr,
  };
};

export const setLoadersReducer = (state = INITIAL_STATE, action) => {
  const { key, isLoad } = action;
  return {
    ...state,
    loaders: {
      ...state.loaders,
      [key]: isLoad,
    },
  };
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducerTrees = createReducer(INITIAL_STATE, {
  [Types.GET_ALL_TREES_SUCCESS]: getAllTreesSuccessReducer,
  [Types.ADD_NEW_TREE_SUCCESS]: addNewTreeSuccessReducer,
  [Types.SET_LOADERS]: setLoadersReducer,
});
