import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import UserContext from "../contexts/UserContext";

const workoutsColRef = collection(db, "workouts");

function useWorkouts() {
  const user = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const titles = [];

  for (let i = 0; i < workouts.length; i++) {
    if (!titles.includes(workouts[i].title)) {
      titles.push(workouts[i].title.trim());
    }
  }
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

  useEffect(() => {
    const q = query(workoutsColRef, where("userID", "==", user.user.uid));
    const unsuscribe = onSnapshot(q, (querySnapShot) => {
      const data = [];
      querySnapShot.forEach((doc) => {
        data.push(doc.data());
      });
      setWorkouts(data);
    });

    return unsuscribe;
  }, [user.user.uid]);

  return { workouts, titles, workoutMap };
}

export default useWorkouts;
