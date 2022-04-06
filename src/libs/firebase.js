import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const userColRef = collection(db, "users");
export async function signUp(
  email,
  password,
  passwordConfirmation,
  username,
  setEmail,
  setPassword,
  setPasswordConfirmation,
  setUsername,
  setError
) {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(createdUser.user, {
      displayName: username,
    });
    await addDoc(userColRef, {
      userId: createdUser.user.uid,
      username: username.toLowerCase(),
      emailAdress: email.toLowerCase(),
      dateCreated: Date.now(),
    });
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setUsername("");
  } catch (error) {
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setUsername("");
    setError(error.message);
  }
}

export async function logIn(email, password, setEmail, setPassword, setError) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setEmail("");
    setPassword("");
  } catch (error) {
    setEmail("");
    setPassword("");
    setError(error.message);
  }
}
