import React from "react";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";

function WorkoutPreview(props) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-emerald-600 pt-2 pb-4 px-1 rounded mb-2 max-w-full cursor-pointer hover:m-10"
      onClick={() => navigate(ROUTES.DASHBOARD)}
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
    </div>
  );
}

export default WorkoutPreview;
