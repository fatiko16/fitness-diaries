import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
  writeBatch,
  arrayUnion,
} from "firebase/firestore";

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
      userId: createdUser.user.uid.trim(),
      username: username.toLowerCase().trim(),
      emailAdress: email.toLowerCase().trim(),
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
    await signInWithEmailAndPassword(auth, email.trim(), password.trim());
    setEmail("");
    setPassword("");
  } catch (error) {
    setEmail("");
    setPassword("");
    setError(error.message);
  }
}

//Used in CreateWorkoutTitle.js
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
      title: title.trim(),
      subtitle: subtitle.trim(),
      description: "",
      moves: [],
      userID: userID.trim(),
      dateCreated: Date.now(),
    });

    setTitle("");
    setSubtitle("");
  } catch (error) {
    setError(error.message);
    console.log("Something went wrong while creating a new title");
  }
}
//Can add this function to create Workout Title
export async function updateUserTitles(userId, title) {
  //Need to update titles array in user for new titles
  try {
    const q = query(userColRef, where("userId", "==", userId));
    const data = await getDocs(q);
    const docRef = data.docs[0].ref;
    await updateDoc(docRef, {
      titles: arrayUnion(title.trim()),
    });
  } catch (error) {
    console.log(error);
    console.log(
      "Something went wrong updating user titles while creating a new title"
    );
  }
}

//Used in AddWorkout.js
export async function createNewWorkout(
  mainTitle,
  title,
  description,
  userID,
  setError
) {
  try {
    await addDoc(workoutsColsRef, {
      title: mainTitle.trim(),
      subtitle: title.trim(),
      description: description.trim(),
      moves: [],
      userID,
      dateCreated: Date.now(),
    });
  } catch (error) {
    setError(error.message);
    console.log("Something went wrong while adding new workout");
  }
}

export async function deleteWorkout(id) {
  const docRef = doc(workoutsColsRef, id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.log("Something went wrong while deleting data");
    console.log(error);
  }
}

export async function deleteTitle(title, userID) {
  try {
    console.log(title);
    const q = query(workoutsColsRef, where("title", "==", title));
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);
    querySnapshot.forEach((data) => {
      console.log(data.data(), data.id);
      if (data.id) {
        const docRef = doc(workoutsColsRef, data.id);
        deleteDoc(docRef);
      }
    });

    const q1 = query(userColRef, where("userId", "==", userID));
    const data = await getDocs(q1);
    const docRef = data.docs[0].ref;
    await updateDoc(docRef, {
      titles: arrayRemove(title),
    });
    await batch.commit();
  } catch (error) {
    console.log(
      "Something went wrong while deleting all workouts under a title"
    );
    console.log(error);
  }
}

export async function updateWorkout(id, newValues) {
  const docRef = doc(workoutsColsRef, id);
  // console.log("updateWorkout ran");

  try {
    await updateDoc(docRef, newValues);
  } catch (error) {
    console.log("Something went wrong while updating a document.");
    console.log(error);
  }
}

export async function updateMoves(id, moveName, newValue) {
  const docRef = doc(workoutsColsRef, id);

  try {
    await updateDoc(docRef, {
      moves: arrayRemove(moveName),
    });
    // await updateDoc(docRef, {
    //   moves: arrayUnion(newValue),
    // });
  } catch (error) {
    console.log("Something went wrong while updating a document.");
    console.log(error);
  }
}
