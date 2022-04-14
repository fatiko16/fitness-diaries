import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";

const userColRef = collection(db, "users");
const workoutsColsRef = collection(db, "workouts");
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

export async function createWorkoutTitle(
  title,
  subtitle,
  userID,
  setTitle,
  setSubtitle,
  setError
) {
  try {
    await addDoc(workoutsColsRef, {
      title: title,
      subtitle: subtitle,
      description: "",
      moves: [],
      userID: userID,
    });
    setTitle("");
    setSubtitle("");
  } catch (error) {
    setError(error.message);
    console.log("Something went wrong while creating a new title");
  }
}

export async function getDocsOnce(userID) {
  const q = query(collection(db, "workouts"), where("userID", "==", userID));

  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });
  return data;
}
