import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import db from './firebaseDBconnect';

async function getDocsData(collectionId, filter, orderBy) {
  const [field, op, value] = filter || [];
  const q = query(collection(db, collectionId),
    filter ? where(field, op, value) : null,
    orderBy ? orderBy('name') : null);
  const querySnapshot = await getDocs(q);
  const resultDocsArr = [];
  querySnapshot.forEach((docInstance) => resultDocsArr.push(
    {
      ...docInstance.data(),
      id: docInstance.id,
    },
  ));
  return resultDocsArr;
}

export default { getDocsData };
