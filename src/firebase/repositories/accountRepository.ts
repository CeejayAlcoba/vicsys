import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  IUser,
  IUserLogin,
  IUserPublic,
} from "../../interfaces/firebase/IUser";
import { doc, setDoc } from "firebase/firestore";
import genericRepository from "./genericRepository";
import userRepository from "./userRepository";

export default function accountRepository() {
  const _genericRepository = genericRepository<IUser>("users");
  const _userRepository = userRepository();
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

  const profileUpdate = async (data: IUserPublic) => {
    if (auth.currentUser) {
      await _userRepository.update(auth.currentUser.uid, data);
      await verifyBeforeUpdateEmail(auth.currentUser, data.email);
    }
  };
  const changePassword = async (newPassword: string) => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    }
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

  const emailVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };
  const isEmailVerified = (): boolean => {
    return !!auth.currentUser?.emailVerified;
  };

  const getCurrentUser = async () => {
    return await auth.currentUser;
  };

  return {
    getCurrentUser,
    isEmailVerified,
    profileUpdate,
    changePassword,
    login,
    signup,
    logout,
    emailVerification,
  };
}
