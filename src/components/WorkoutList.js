import React from "react";
import WorkoutPreview from "./WorkoutPreview";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import * as ROUTES from "../constants/routes";

function WorkoutList(props) {
  const navigate = useNavigate();
  const params = useParams();

  let workouts = [];
  const isDefault = params.workoutTitle === "All" ? true : false;

  if (isDefault) {
    props.workouts.forEach((titleWorkouts) => {
      titleWorkouts.forEach((workout) => workouts.push(workout));
    });
  } else {
    workouts = props.workouts.get(params.workoutTitle);
  }
  return (
    <div className="container mt-6 mx-auto max-w-screen-md">
      <Outlet />
      {workouts &&
        workouts.map((workout) => {
          return (
            <WorkoutPreview
              key={workout.id}
              itemID={workout.id}
              title={workout.subtitle}
              description={workout.description}
              moves={workout.moves}
              mainTitle={workout.title}
            />
          );
        })}
      {!isDefault && (
        <div
          className="bg-emerald-600 py-2 px-1 rounded"
          onClick={() => navigate(ROUTES.ADD_WORKOUT)}
        >
          <button className="p-1 text-white font-bold">
            + Add New Workout
          </button>
        </div>
      )}
    </div>
  );
}

export default WorkoutList;
