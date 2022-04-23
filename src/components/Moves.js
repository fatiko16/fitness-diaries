import React from "react";
import MoveDropdown from "./MoveDropdown";
import { useMoves } from "../contexts/MovesContext";
//Component under EditWorkout

function Moves() {
  const { moves, setMoves } = useMoves();
  return (
    <div>
      {moves &&
        moves.map((move) => <MoveDropdown moveInfo={move} key={move.title} />)}
    </div>
  );
}

export default Moves;
