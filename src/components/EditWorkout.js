import React, { useContext, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

function EditWorkout(props) {
  const [searchParams] = useSearchParams();
  const workout = props.workouts
    .get(searchParams.get("main").trim())
    .filter((workout) => workout.subtitle === searchParams.get("title"))[0];
  const location = useLocation();
  const navigate = useNavigate();
  console.log(workout);
  const [title, setTitle] = useState(workout.subtitle);
  const [description, setDescription] = useState(workout.description);
  const [moves, setMoves] = useState(workout.moves);

  console.log(title, description, moves);

  console.log(searchParams.get("main"));
  console.log(searchParams.get("title"));
  const closeModalHandler = () => {
    const locationDismantled = location.pathname.split("/");
    const originalLocation = `/workouts/${locationDismantled[2]}`;
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
          aria-label="Enter your title"
          type="text"
          placeholder="Title"
          className="text-sm text-gray-base w-full mr-3 px-4 h-2 py-5 border border-gray-primary rounded mb-6"
        />
        <input
          aria-label="Enter your description"
          type="text"
          placeholder="Description"
          className="text-sm text-gray-base w-full mr-3 px-4 h-2 py-5 border border-gray-primary rounded mb-6"
        />
        <div className="flex justify-between">
          <button
            className="bg-slate-300 p-2 rounded mb-4 font-bold"
            type="submit"
          >
            Create Title
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
