import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import { Routes, Route, Outlet } from "react-router-dom";
import CreateWorkoutTitle from "../components/CreateWorkoutTitle";
import { useNavigate } from "react-router-dom";
import WorkoutList from "../components/WorkoutList";
import AddWorkout from "../components/AddWorkout";
const allWorkouts = ["Back", "Legs", "Arms", "Chest", "Arms + Legs"];

function Workouts() {
  const navigate = useNavigate();
  const [workoutType, setWorkoutType] = useState("All");

  useEffect(() => {
    document.title = "Fitness Diaries - My Workouts";
  }, []);

  const createWorkoutTitleHandler = () => {
    navigate("create-title");
  };

  return (
    <>
      <div className="container mx-auto flex  items-center justify-between">
        <h1 className="text-center font-bold text-3xl mt-4">
          {workoutType} Workouts
        </h1>
        <Dropdown
          onOptionChange={setWorkoutType}
          options={allWorkouts}
          onCreateList={createWorkoutTitleHandler}
        />
      </div>
      <Outlet />
      <Routes>
        <Route
          path="/create-title"
          element={<CreateWorkoutTitle onClose={() => setWorkoutType("All")} />}
        />
        <Route path=":workoutTitle" element={<WorkoutList />}>
          <Route path="add-workout" element={<AddWorkout />} />
        </Route>
      </Routes>
    </>
  );
}

export default Workouts;
