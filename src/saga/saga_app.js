import { put } from 'redux-saga/effects';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import appAction from '../redux/app';
import db from '../services/fireBase/firebaseDBconnect';
import { deleteCategoryChildren, updateChildCount } from './genericOperation';

function* getSubCategories(action) {
  try {
    const { treeId, categoryId } = action;
    yield put(appAction.setLoadersFlag(categoryId, true));
    const q = query(collection(db, treeId), where('parent', '==', categoryId));
    const querySnapshot = yield getDocs(q);
    yield put(appAction.setLoadersFlag(categoryId, false));
    const subCategoriesArray = [];
    querySnapshot.forEach((docInstance) => subCategoriesArray.push(
      {
        ...docInstance.data(),
        id: docInstance.id,
      },
    ));
    yield put(appAction.getSubCategoriesSuccess(treeId, categoryId, subCategoriesArray));
  } catch (e) {
    console.error('Error get categories: ', e);
  }
}

function* addSubCategory(action) {
  try {
    const { treeId, categoryIdParent, name } = action;
    yield put(appAction.setLoadersFlag(`${categoryIdParent}_new`, true));
    yield addDoc(collection(db, treeId), {
      name,
      parent: categoryIdParent,
      childCount: 0,
    });
    yield updateChildCount(treeId, categoryIdParent, 1);
    yield put(appAction.setLoadersFlag(`${categoryIdParent}_new`, false));
    yield put(appAction.addSubCategorySuccess(treeId, categoryIdParent, name));
    yield put(appAction.getSubCategories(treeId, categoryIdParent));
  } catch (e) {
    console.error('Error adding category: ', e);
  }
}

function* updateSubCategoryName(action) {
  try {
    const { treeId, parentId, categoryId, newName } = action;
    yield put(appAction.setLoadersFlag(categoryId, true));
    const docRef = doc(db, treeId, categoryId);
    yield updateDoc(docRef, {
      name: newName,
    });

    yield put(appAction.updateSubCategoryNameSuccess(treeId, parentId, categoryId, newName));
    yield put(appAction.setLoadersFlag(categoryId, false));
  } catch (e) {
    console.error('Error update sub category name: ', e);
  }
}

function* deleteCategory(action) {
  try {
    const { treeId, parentId, categoryId } = action;
    yield put(appAction.setLoadersFlag(categoryId, true));
    // First delete children
    yield deleteCategoryChildren(treeId, categoryId);

    // Delete parent
    const docRef = doc(db, treeId, categoryId);
    yield deleteDoc(docRef);

    yield put(appAction.setLoadersFlag(categoryId, false));
    yield put(appAction.deleteCategorySuccess(treeId, parentId, categoryId));
    yield updateChildCount(treeId, parentId, -1);
  } catch (e) {
    console.error('Error delete category: ', e);
  }
}

export default {
  getSubCategories,
  addSubCategory,
  deleteCategory,
  updateSubCategoryName,
};
