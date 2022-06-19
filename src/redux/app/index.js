import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  setLoadersFlag: ['loaderName', 'isLoad'],

  // Get categories
  getSubCategoriesSuccess: ['treeId', 'categoryId', 'data'],
  getSubCategories: ['treeId', 'categoryId'],

  // Add (creation)
  addSubCategory: ['treeId', 'categoryIdParent', 'name'],
  addSubCategorySuccess: ['treeId', 'parentId', 'name'],

  // Update
  updateSubCategoryName: ['treeId', 'parentId', 'categoryId', 'newName'],
  updateSubCategoryNameSuccess: ['treeId', 'parentId', 'categoryId', 'newName'],
  updateCategoryData: ['treeId', 'categoryId', 'data'],

  // Delete
  deleteCategory: ['treeId', 'parentId', 'categoryId'],
  deleteCategorySuccess: ['treeId', 'parentId', 'categoryId'],
});

export const AppTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  loaders: {},
  newSubCategorySuccess: {},
  nodesMap: {},
};

/* ------------- Selectors ------------- */
export const appSelectors = {
  isLoaderObj: (state) => state.app.loaders,
  subNodes: (tagLabelName, state) => state.app.nodesMap[tagLabelName],
  nodesMap: (state) => state.app.nodesMap,
  newSubCategorySuccess: (state) => state.app.newSubCategorySuccess,
};

/* ------------- Reducers ------------- */
export const setLoadersFlagReducer = (state = INITIAL_STATE, action) => {
  const { isLoad, loaderName } = action;
  return {
    ...state,
    loaders: {
      ...state.loaders,
      [loaderName]: isLoad,
    },
  };
};

export const getSubCategoriesSuccessReducer = (state = INITIAL_STATE, action) => {
  const { treeId, data, categoryId } = action;
  return {
    ...state,
    nodesMap: {
      ...state.nodesMap,
      [treeId]: {
        ...state.nodesMap[treeId],
        [categoryId]: data,
      },
    },
  };
};

export const addSubCategorySuccessReducer = (state = INITIAL_STATE, action) => {
  const { treeId, parentId, name } = action;
  return {
    ...state,
    newSubCategorySuccess: {
      ...state.newSubCategorySuccess,
      [treeId]: {
        ...state.newSubCategorySuccess[treeId],
        [parentId]: name,
      },
    },
  };
};

export const updateSubCategoryNameSuccessReducer = (state = INITIAL_STATE, action) => {
  const { treeId, parentId, categoryId, newName } = action;
  const categoryArr = (state.nodesMap[treeId] && state.nodesMap[treeId][parentId]) || [];
  return {
    ...state,
    nodesMap: { ...state.nodesMap,
      [treeId]: {
        ...state.nodesMap[treeId],
        [parentId]: categoryArr.map(
          (cat) => (cat.id === categoryId ? { ...cat, name: newName } : cat),
        ),
      } },
  };
};

export const updateCategoryDataReducer = (state = INITIAL_STATE, action) => {
  const { treeId, categoryId, data } = action;
  const categoryArr = (state.nodesMap[treeId] && state.nodesMap[treeId][data.parent]) || [];
  return {
    ...state,
    nodesMap: { ...state.nodesMap,
      [treeId]: {
        ...state.nodesMap[treeId],
        [data.parent]: categoryArr.map(
          (cat) => (cat.id === categoryId ? { ...cat, ...data } : cat),
        ),
      } },
  };
};

export const deleteCategorySuccessReducer = (state = INITIAL_STATE, action) => {
  const { treeId, parentId, categoryId } = action;
  const categoryArr = (state.nodesMap[treeId] && state.nodesMap[treeId][parentId]) || [];
  return {
    ...state,
    nodesMap: { ...state.nodesMap,
      [treeId]: {
        ...state.nodesMap[treeId],
        [parentId]: categoryArr.filter((cat) => cat.id !== categoryId),
        [categoryId]: null,
      } },
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducerApp = createReducer(INITIAL_STATE, {
  [Types.SET_LOADERS_FLAG]: setLoadersFlagReducer,
  [Types.GET_SUB_CATEGORIES_SUCCESS]: getSubCategoriesSuccessReducer,
  [Types.ADD_SUB_CATEGORY_SUCCESS]: addSubCategorySuccessReducer,
  [Types.UPDATE_SUB_CATEGORY_NAME_SUCCESS]: updateSubCategoryNameSuccessReducer,
  [Types.UPDATE_CATEGORY_DATA]: updateCategoryDataReducer,
  [Types.DELETE_CATEGORY_SUCCESS]: deleteCategorySuccessReducer,
});
