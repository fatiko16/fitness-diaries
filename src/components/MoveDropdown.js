import React, { useEffect, useState } from "react";
import { ChevronDoubleRightIcon, XIcon } from "@heroicons/react/solid";
import Move from "./Move";
//Component Under Moves
function MoveDropdown(props) {
  const moveInfo = props.moveInfo;
  const [sets, setSets] = useState(moveInfo.sets);
  const [isOpen, setIsOpen] = useState(false);
  const [newSetRep, setNewSetRep] = useState("");
  const [newSetWeight, setNewSetWeight] = useState("");

  const handleChange = (i, e) => {
    let originalSet = sets[i];
    let value = e.target.value;
    let newSet;
    if (e.target.name === "repetition") {
      //prettier-ignore
      newSet = value + originalSet.substring(originalSet.split("x")[0].length,originalSet.length);
      console.log(newSet);
    } else {
      //prettier-ignore
      newSet = originalSet.substring(0,originalSet.length - originalSet.split("x")[1].length) + value;
      console.log(newSet);
    }
    let newSets = [...sets];
    newSets[i] = newSet;
    setSets(newSets);
  };

  useEffect(() => {
    setSets(moveInfo.sets);
    console.log("useEffect is running in movedropdown");
  }, [moveInfo]);

  const newSetHandler = () => {
    const newSet = `${newSetRep}x${newSetWeight}`;
    const newSets = [...sets, newSet];
    const newMoveInfo = { ...moveInfo, sets: newSets };
    props.editMovesHandler(moveInfo.title, newMoveInfo);
    setNewSetRep("");
    setNewSetWeight("");
  };

  const iconClasses = isOpen ? "w-6 rotate-90" : "w-6";

  return (
    <div className="flex flex-col w-3/6 mdm:w-full mt-4">
      <div className="flex mb-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex"
        >
          {moveInfo.title} <ChevronDoubleRightIcon className={iconClasses} />
        </button>
      </div>

      <div className={isOpen ? "flex flex-col w-5/6" : " w-5/6 hidden"}>
        {sets &&
          sets.map((set, index) => {
            const repetition = set.split("x")[0];
            const weight = set.split("x")[1];
            return (
              <div className="flex gap-3 mb-2" key={index}>
                <input
                  type="text"
                  className="w-1/6 rounded text-center"
                  name="repetition"
                  value={repetition}
                  onChange={(event) => handleChange(index, event)}
                />
                <XIcon className="w-6" />
                <input
                  type="text"
                  className="w-1/6 rounded text-center"
                  name="weight"
                  value={weight}
                  onChange={(event) => handleChange(index, event)}
                />
              </div>
            );
          })}
        <div className="flex gap-3 mb-2">
          <input
            type="text"
            className="w-1/6 rounded text-center"
            name="repetition"
            value={newSetRep}
            onChange={(event) => setNewSetRep(event.target.value)}
          />
          <XIcon className="w-6" />
          <input
            type="text"
            className="w-1/6 rounded text-center"
            name="weight"
            value={newSetWeight}
            onChange={(event) => setNewSetWeight(event.target.value)}
          />
          <button
            className="text-center bg-white w-2/12 rounded"
            onClick={newSetHandler}
            type="button"
          >
            Add
          </button>
        </div>
        <button className="text-center bg-white w-2/12 rounded">Save</button>
      </div>
    </div>
  );
}

export default MoveDropdown;
