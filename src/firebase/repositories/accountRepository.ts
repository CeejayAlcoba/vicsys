import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  IUser,
  IUserLogin,
  IUserPublic,
} from "../../interfaces/firebase/IUser";
import { doc, setDoc } from "firebase/firestore";
import genericRepository from "./genericRepository";

export default function accountRepository() {
  const _genericRepository = genericRepository<IUser>("users");

  const login = async (data: IUserLogin) => {
    const { email, password } = data;
    return await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { uid } = userCredential.user;
        const user = (await _genericRepository.getAll()).find(
          (c) => c.id == uid
        );
        return user as IUserPublic;
      })
      .catch(() => {
        throw new Error("Invalid email or password.");
      });
  };

  const signup = async (data: IUser) => {
    const { email, password, birthday, name } = data;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      birthday: birthday,
      userId: user.uid,
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { login, signup, logout };
}
