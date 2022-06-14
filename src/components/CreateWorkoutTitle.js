import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { createWorkoutTitle, updateUserTitles } from "../libs/firebase";
import * as ROUTES from "../constants/routes";
function CreateWorkoutTitle(props) {
  const user = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [error, setError] = useState(null);
  const isInvalid = title === "" && subtitle === "";
  const navigate = useNavigate();
  const onClose = () => {
    navigate(ROUTES.ALLWORKOUTS);
    props.onClose();
  };

  const createTitleHandler = (event) => {
    event.preventDefault();

    if (isInvalid) {
      setError("Cannot submit the form with empty fields");
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedSubtitle = subtitle.trim();
    createWorkoutTitle(
      trimmedTitle,
      trimmedSubtitle,
      user.user.uid,
      setTitle,
      setSubtitle,
      setError
    );

    updateUserTitles(user.user.uid, title);
    navigate("/workouts/" + title);
    props.onClose();
  };
  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col mx-auto max-w-screen-md bg-slate-700 px-4 rounded-2xl">
        {error && <p className="text-center text-red-500">{error}</p>}
        <h1 className="text-center text-purple-500 font-bold text-4xl py-2 mb-4">
          Create a title for your workouts!
        </h1>
        <form action="POST" onSubmit={createTitleHandler}>
          <input
            aria-label="Enter your title"
            type="text"
            placeholder="Title"
            className="text-sm text-gray-base w-full mr-3 px-4 h-2 py-5 border border-gray-primary rounded mb-6"
            autoComplete="on"
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
          <input
            aria-label="Enter your first workout title!"
            type="text"
            placeholder="First Workout Title"
            className="text-sm text-gray-base w-full mr-3 px-4 h-2 py-5 border border-gray-primary rounded mb-6"
            autoComplete="on"
            onChange={({ target }) => setSubtitle(target.value)}
            value={subtitle}
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
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default CreateWorkoutTitle;
