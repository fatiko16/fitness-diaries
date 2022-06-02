import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Moves from "./Moves";
import { MovesProvider } from "../contexts/MovesContext";
import { updateWorkout, updateMoves } from "../libs/firebase";
import { arrayUnion } from "firebase/firestore";

function EditWorkout(props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const workout = props.workouts
    .get(searchParams.get("main").trim())
    .filter((workout) => workout.subtitle === searchParams.get("title"))[0];

  //CONTINUE FROM HERE
  const [addMove, setAddMove] = useState(false);
  const [newMove, setNewMove] = useState("");
  const [title, setTitle] = useState(workout.subtitle);
  const [description, setDescription] = useState(workout.description);
  const [moves, setMoves] = useState(workout.moves);

  const closeModalHandler = () => {
    const originalLocation = `/workouts/${workout.title}`;
    navigate(originalLocation);
  };

  const editWorkoutHandler = (event) => {
    event.preventDefault();
    console.log("editWorkoutHandler");
    const newValues = {
      ...workout,
      subtitle: title,
      description: description,
    };
    updateWorkout(workout.id, newValues);
  };

  const addMoveHandler = (event) => {
    event.preventDefault();
    const newValue = {
      title: newMove,
      sets: [],
    };
    const newValues = {
      ...workout,
      moves: arrayUnion(newValue),
    };
    updateWorkout(workout.id, newValues);
  };

  const editMovesHandler = (moveName, newMoveInfo) => {
    const updatedMoves = workout.moves.filter(
      (workout) => workout.title !== moveName
    );
    updatedMoves.push(newMoveInfo);
    const newValues = {
      ...workout,
      moves: updatedMoves,
    };
    updateWorkout(workout.id, newValues);
  };

  return (
    <div className="flex flex-col mx-auto max-w-screen-md bg-emerald-600 px-4 rounded-2xl mt-4">
      <h1 className="text-center text-white font-bold text-4xl py-2 mb-4">
        Edit your workout
      </h1>
      <form onSubmit={editWorkoutHandler}>
        <input
          aria-label="Your workout title"
          type="text"
          placeholder="Title"
          className="text-sm text-gray-base w-full mr-3 px-4 h-2 py-5 border border-gray-primary rounded mb-6"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          aria-label="Enter your description"
          type="text"
          placeholder="Description"
          className="text-sm text-gray-base w-full mr-3 px-4 h-2 py-5 border border-gray-primary rounded mb-6"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div>
          <h1 className="text-2xl text-yellow-50 font-bold">Moves</h1>
          {/* LOOKS LIKE I DONT NEED THE MOVESPROVIDER */}
          {/* <MovesProvider moves={workout.moves} workoutID={workout.id}> */}
          <Moves
            moves={workout.moves}
            workoutID={workout.id}
            editMovesHandler={editMovesHandler}
          />
          {/* </MovesProvider> */}
          <button
            className="text-xl text-yellow-50 px-2 py-2 bg-green-800 rounded my-3"
            onClick={() => setAddMove(!addMove)}
          >
            Add a new move
            <PlusIcon className="-mr-1 ml-2 h-5 w-5 inline" />
          </button>
          {addMove && (
            <div>
              <input
                aria-label="Enter your move name"
                type="text"
                placeholder="Move Name"
                className="mb-2 p-1 rounded"
                value={newMove}
                onChange={(event) => setNewMove(event.target.value)}
              />
              <button
                className="ml-2 border-2 border-black px-2 rounded bg-slate-50 hover:bg-slate-400"
                onClick={addMoveHandler}
                type="button"
              >
                Add
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-slate-300 p-2 rounded mb-4 font-bold"
            type="submit"
            onClick={editWorkoutHandler}
          >
            Save
          </button>
          <button
            className="bg-slate-300 p-2 rounded mb-4 font-bold"
            onClick={closeModalHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditWorkout;
