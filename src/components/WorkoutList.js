import React from "react";
import WorkoutPreview from "./WorkoutPreview";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const DUMMY_WORKOUTS = [
  {
    title: "Legs",
    subtitle: "Quads + Calves",
    description:
      "General Leg workout with squad, leg press plus calves and arms",
    moves: [
      "Squat",
      "Leg Press",
      "Calves with Leg Press Machine",
      "Bicep Curls",
      "Rope Pull Down",
    ],
    Squat: ["15x135", "10x185", "10x185", "10x185"],
    userID: "Pkkaq8smAKUL2DhmabidDzQjPRT2",
  },
  {
    title: "Arms",
    subtitle: "Biceps + Triceps",
    description:
      "General Leg workout with squad, leg press plus calves and arms",
    moves: [
      "Squat",
      "Leg Press",
      "Calves with Leg Press Machine",
      "Bicep Curls",
      "Rope Pull Down",
    ],
    Squat: ["15x135", "10x185", "10x185", "10x185"],
    userID: "Pkkaq8smAKUL2DhmabidDzQjPRT2",
  },
  {
    title: "Back",
    subtitle: "Row",
    description:
      "General Leg workout with squad, leg press plus calves and arms",
    moves: [
      "Squat",
      "Leg Press",
      "Calves with Leg Press Machine",
      "Bicep Curls",
      "Rope Pull Down",
    ],
    Squat: ["15x135", "10x185", "10x185", "10x185"],
    userID: "Pkkaq8smAKUL2DhmabidDzQjPRT2",
  },
  {
    title: "Chest",
    subtitle: "Bench",
    description:
      "General Leg workout with squad, leg press plus calves and arms",
    moves: [
      "Squat",
      "Leg Press",
      "Calves with Leg Press Machine",
      "Bicep Curls",
      "Rope Pull Down",
    ],
    Squat: ["15x135", "10x185", "10x185", "10x185"],
    userID: "Pkkaq8smAKUL2DhmabidDzQjPRT2",
  },
];
function WorkoutList(props) {
  const navigate = useNavigate();
  const params = useParams();
  console.log(props.workouts, "props.workouts");
  console.log(params.workoutTitle, "params,workoutTitle");
  const isDefault = params.workoutTitle === "All" ? true : false;
  const workouts = props.workouts.get(params.workoutTitle);
  console.log(workouts);

  return (
    <div className="container mt-6 mx-auto max-w-screen-md">
      <Outlet />
      {workouts &&
        workouts.map((workout) => {
          return (
            <WorkoutPreview
              key={workout.subtitle}
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
