import React from "react";
import Modal from "../UI/Modal";
function CreateWorkoutTitle() {
  console.log("Why am I not visible mfs?");
  return (
    <Modal>
      <div className="flex flex-col mx-auto max-w-screen-md">
        <h1 className="">Create a title for your workouts!</h1>
        <form action="POST">
          <input
            aria-label="Enter your title"
            type="text"
            placeholder="Title"
            className="text-sm text-gray-base w-full mr-3 px-4 h-2 py-5 border border-gray-primary rounded mb-2"
          />
        </form>
      </div>
    </Modal>
  );
}

export default CreateWorkoutTitle;
