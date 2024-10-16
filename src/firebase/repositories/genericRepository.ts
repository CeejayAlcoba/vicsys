import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function genericRepository<T>(documentName: string) {
  const myCollections = collection(db, documentName);

  const add = async (data: T) => {
    const tCollections = collection(db, "users");
    await addDoc(tCollections, data as { [key: string]: any });
  };
  const getAll = async () => {
    const snapshot = await getDocs(myCollections);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  };

  const getById = async (id: string) => {
    const singleBook = doc(myCollections, id);
    const { data } = await getDoc(singleBook);
    return data();
  };

  const update = async (id: string, data: Partial<T>) => {
    const dataRef = doc(myCollections, id);
    await updateDoc(dataRef, data as { [key: string]: any });
  };
  const deleteById = async (id: string) => {
    const docRef = doc(myCollections, id);
    await deleteDoc(docRef);
  };

  return { myCollections, add, getAll, getById, update, deleteById };
}
