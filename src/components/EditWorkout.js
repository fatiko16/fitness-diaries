import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Moves from "./Moves";
import { MovesProvider } from "../contexts/MovesContext";

function EditWorkout(props) {
  const [searchParams] = useSearchParams();
  const workout = props.workouts
    .get(searchParams.get("main").trim())
    .filter((workout) => workout.subtitle === searchParams.get("title"))[0];
  const navigate = useNavigate();

  const [title, setTitle] = useState(workout.subtitle);
  const [description, setDescription] = useState(workout.description);

  const closeModalHandler = () => {
    const originalLocation = `/workouts/${workout.title}`;
    navigate(originalLocation);
  };
  const createTitleHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col mx-auto max-w-screen-md bg-emerald-600 px-4 rounded-2xl mt-4">
      <h1 className="text-center text-white font-bold text-4xl py-2 mb-4">
        Edit your workout
      </h1>
      <form action="POST" onSubmit={createTitleHandler}>
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
          <MovesProvider>
            <Moves />
          </MovesProvider>
          <button className="text-xl text-yellow-50 px-2 py-2 bg-green-800 rounded my-3">
            Add a new one <PlusIcon className="-mr-1 ml-2 h-5 w-5 inline" />
          </button>

          <button></button>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-slate-300 p-2 rounded mb-4 font-bold"
            type="submit"
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
