import { createContext } from "react";

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

const WorkoutContext = createContext(null);

export default WorkoutContext;
