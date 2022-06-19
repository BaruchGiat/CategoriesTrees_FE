import { put } from 'redux-saga/effects';
import { collection, addDoc, query, getDocs, orderBy } from 'firebase/firestore';
import treesAction from '../redux/app/trees';
import db from '../services/fireBase/firebaseDBconnect';

function* getAllTrees() {
  try {
    const q = query(collection(db, 'TREES'), orderBy('name'));
    const querySnapshot = yield getDocs(q);
    const treeArr = [];
    querySnapshot.forEach((docInstance) => treeArr.push(
      {
        ...docInstance.data(),
        id: docInstance.id,
      },
    ));
    yield put(treesAction.getAllTreesSuccess(treeArr));
  } catch (e) {
    console.error('Error get all tree: ', e);
  }
}

function* addNewTree(action) {
  try {
    const { treeName } = action;
    yield put(treesAction.setLoaders('addNewTree', true));
    const newTreeRef = yield addDoc(collection(db, 'TREES'), {
      name: treeName,
    });
    yield put(treesAction.setLoaders('addNewTree', false));
    yield put(treesAction.addNewTreeSuccess({ id: newTreeRef.id, name: treeName }));
  } catch (e) {
    console.error('Error adding new tree: ', e);
  }
}

export default {
  getAllTrees,
  addNewTree,
};
