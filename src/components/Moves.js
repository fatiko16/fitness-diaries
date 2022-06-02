import React from "react";
import MoveDropdown from "./MoveDropdown";
import { useMoves } from "../contexts/MovesContext";
//Component under EditWorkout

function Moves(props) {
  return (
    <div>
      {props.moves &&
        props.moves.map((move) => (
          <MoveDropdown
            moveInfo={move}
            key={move.title}
            workoutID={props.workoutID}
            editMovesHandler={props.editMovesHandler}
          />
        ))}
    </div>
  );
}

export default Moves;
