import { put } from 'redux-saga/effects';
import { collection, updateDoc, writeBatch, doc, query, where, getDocs, getDoc } from 'firebase/firestore';
import appAction from '../redux/app';
import db from '../services/fireBase/firebaseDBconnect';

export function* updateChildCount(treeId, catId, count) {
  const docIns = doc(db, treeId, catId);
  const docRef = yield getDoc(docIns);
  const data = docRef.data();
  if (!data || (count < 0 && data.childCount <= 0)) return;
  data.childCount += count;
  yield updateDoc(docIns, data);
  yield put(appAction.updateCategoryData(treeId, catId, data));
}

export async function deleteCategoryChildren(treeId, categoryId) {
  const q = query(collection(db, treeId), where('parent', '==', categoryId));
  const snapshot = await getDocs(q);

  let numDeleted = 0;
  if (snapshot.size > 0) {
    // Delete documents in a batch
    const batch = writeBatch(db);
    snapshot.docs.forEach((docIns) => {
      batch.delete(docIns.ref);
    });

    await batch.commit();
    numDeleted = snapshot.size;
  }
  return numDeleted;
}
