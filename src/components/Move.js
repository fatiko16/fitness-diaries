import React, { useState, useContext } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useMoves } from "../contexts/MovesContext";
function Move(props) {
  const { moves, setMoves } = useMoves();
  const sets = moves.filter((move) => {
    return move.title === props.moveTitle;
  })[0].sets;

  const [repetition, setRepetition] = useState(props.repetition);
  const [weight, setWeight] = useState(props.weight);

  return (
    <div className="flex gap-3 mb-2">
      <input
        type="text"
        className="w-1/6 rounded text-center"
        value={repetition}
        onChange={(event) => setRepetition(event.target.value)}
      />
      <XIcon className="w-6" />
      <input
        type="text"
        className="w-1/6 rounded text-center"
        value={weight}
        onChange={(event) => setWeight(event.target.value)}
      />
    </div>
  );
}

export default Move;
