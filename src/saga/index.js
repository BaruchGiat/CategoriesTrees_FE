import { takeLatest } from 'redux-saga/effects';
import sagaApp from './saga_app';
import sagaTrees from './saga_trees';

// Action types
import { AppTypes } from '../redux/app';
import { TreesTypes } from '../redux/app/trees';

function* mySaga() {
  yield takeLatest(AppTypes.GET_SUB_CATEGORIES, sagaApp.getSubCategories);
  yield takeLatest(AppTypes.ADD_SUB_CATEGORY, sagaApp.addSubCategory);
  yield takeLatest(AppTypes.UPDATE_SUB_CATEGORY_NAME, sagaApp.updateSubCategoryName);
  yield takeLatest(AppTypes.DELETE_CATEGORY, sagaApp.deleteCategory);

  yield takeLatest(TreesTypes.GET_ALL_TREES, sagaTrees.getAllTrees);
  yield takeLatest(TreesTypes.ADD_NEW_TREE, sagaTrees.addNewTree);
}

export default mySaga;
