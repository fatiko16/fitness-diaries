import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

function WorkoutPreview(props) {
  const navigate = useNavigate();

  const openEditPageHandler = () => {
    navigate({
      pathname: "/workouts" + ROUTES.EDIT_WORKOUT,
      search: createSearchParams({
        main: props.mainTitle,
        title: props.title,
      }).toString(),
    });
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    console.log(props);
  };
  return (
    <div
      className="bg-emerald-600 pt-2 pb-4 px-1 rounded mb-2 max-w-full cursor-pointer hover:m-10"
      onClick={openEditPageHandler}
    >
      <div className="ml-2 ">
        <p className="text-xl">
          <strong className="text-2xl">Title:</strong> {props.title}
        </p>
      </div>
      <div className="ml-2">
        <p className="text-xl">
          <strong className="text-2xl">Description:</strong> {props.description}
        </p>
      </div>
      <div className="ml-2">
        <p className="text-xl">
          <strong className="text-2xl">Moves:</strong> {props.moves}
        </p>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-white mt-2 mr-2 px-2 py-1 rounded"
          onClick={openEditPageHandler}
        >
          Edit
        </button>
        <button
          className="bg-white px-2 py-1 rounded mt-2"
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default WorkoutPreview;
