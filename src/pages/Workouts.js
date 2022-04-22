import React, { useEffect, useState } from "react";
import Dropdown from "../components/WorkoutTitleDropdown";
import { Routes, Route, Outlet } from "react-router-dom";
import CreateWorkoutTitle from "../components/CreateWorkoutTitle";
import { useNavigate } from "react-router-dom";
import WorkoutList from "../components/WorkoutList";
import AddWorkout from "../components/AddWorkout";
import useWorkouts from "../hooks/use-workouts";
import * as ROUTES from "../constants/routes";
import EditWorkout from "../components/EditWorkout";

function Workouts() {
  const { workouts, titles, workoutMap } = useWorkouts();
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
          options={titles}
          onCreateList={createWorkoutTitleHandler}
        />
      </div>
      <Outlet />
      <Routes>
        <Route
          path="/create-title"
          element={<CreateWorkoutTitle onClose={() => setWorkoutType("All")} />}
        />

        <Route
          path=":workoutTitle"
          element={<WorkoutList workouts={workoutMap} />}
        >
          <Route path="add-workout" element={<AddWorkout />} />
        </Route>
        <Route
          path={ROUTES.EDIT_WORKOUT}
          element={
            workoutMap.size > 0 ? (
              <EditWorkout workouts={workoutMap} />
            ) : (
              <h1 className="text-center text-2xl">Loading...</h1>
            )
          }
        ></Route>
      </Routes>
    </>
  );
}

export default Workouts;
