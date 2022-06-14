import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import UserContext from "../contexts/UserContext";

const workoutsColRef = collection(db, "workouts");
const usersColRef = collection(db, "users");

function useWorkouts() {
  const user = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const [titles, setTitles] = useState([]);

  const workoutMap = new Map();
  titles.forEach((title) => {
    const workoutsUnderTitle = [];
    workouts.forEach((workout) => {
      if (workout.title.trim() === title.trim()) {
        workoutsUnderTitle.push(workout);
      }
      workoutMap.set(title.trim(), workoutsUnderTitle);
    });
  });

  //Get all the workouts associated with the user
  useEffect(() => {
    const q = query(
      workoutsColRef,
      where("userID", "==", user.user.uid),
      orderBy("dateCreated")
    );
    const unsuscribe = onSnapshot(q, (querySnapShot) => {
      const data = [];
      querySnapShot.forEach((doc) => {
        // console.log(doc.data());
        data.push({ ...doc.data(), id: doc.id });
      });
      setWorkouts(data);
    });

    return unsuscribe;
  }, [user.user.uid]);

  //Get all the titles under the user
  useEffect(() => {
    const q = query(usersColRef, where("userId", "==", user.user.uid));
    const unsuscribe = onSnapshot(q, (querySnapShot) => {
      let titles = [];
      titles = querySnapShot.docs[0].data().titles;
      setTitles(titles);
    });

    return unsuscribe;
  }, [user.user.uid]);

  return { workouts, titles, workoutMap };
}

export default useWorkouts;
