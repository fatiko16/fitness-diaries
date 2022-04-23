import React, { useState } from "react";
import { ChevronDoubleRightIcon, XIcon } from "@heroicons/react/solid";
import Move from "./Move";
//Component Under Moves
function MoveDropdown(props) {
  const moveInfo = props.moveInfo;
  const [isOpen, setIsOpen] = useState(false);
  console.log(moveInfo);

  const iconClasses = isOpen ? "w-6 rotate-90" : "w-6";

  return (
    <div className="flex flex-col w-3/6 mdm:w-full mt-4">
      <div className="flex mb-2">
        <button onClick={() => setIsOpen(!isOpen)} className="flex">
          {moveInfo.title} <ChevronDoubleRightIcon className={iconClasses} />
        </button>
      </div>

      <div className={isOpen ? "flex flex-col w-5/6" : " w-5/6 hidden"}>
        {moveInfo.sets.map((set, index) => {
          const repetition = set.split("x")[0];
          const weight = set.split("x")[1];
          return (
            <Move
              repetition={repetition}
              weight={weight}
              index={index}
              key={moveInfo.title + index}
              moveTitle={moveInfo.title}
            />
          );
        })}
        <div className="flex gap-3 mb-2">
          <input type="text" className="w-1/6 rounded text-center" />
          <XIcon className="w-6" />
          <input type="text" className="w-1/6 rounded text-center" />
          <p>Add one more set</p>
        </div>
        <button className="text-center bg-white w-2/12 rounded">Save</button>
      </div>
    </div>
  );
}

export default MoveDropdown;
