import React, { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import { Routes, Route } from "react-router-dom";
import CreateWorkoutTitle from "../components/CreateWorkoutTitle";
import { useNavigate } from "react-router-dom";
const allWorkouts = ["All", "Back", "Legs", "Arms", "Chest", "Arms + Legs"];

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
    <div className="container mx-auto flex  items-center justify-between">
      <h1 className="text-center font-bold text-3xl mt-4">
        {workoutType} Workouts
      </h1>
      <Dropdown
        onOptionChange={setWorkoutType}
        options={allWorkouts}
        onCreateList={createWorkoutTitleHandler}
      />
      <Routes>
        <Route path="/create-title" element={<CreateWorkoutTitle />} />
        <Route
          path=":workoutTitle"
          element={<p className="block">Fuck especially you!</p>}
        />
      </Routes>
    </div>
  );
}

export default Workouts;
