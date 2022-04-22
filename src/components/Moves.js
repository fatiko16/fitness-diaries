import React, { useContext } from "react";
import MoveDropdown from "./MoveDropdown";
import { useMoves } from "../contexts/MovesContext";
const moves = [
  { title: "Squat", sets: ["15x135", "10x185", "8x185", "8x185"] },
  {
    title: "Leg Press",
    sets: ["15x135", "10x185", "8x185", "8x185"],
  },
];
function Moves() {
  const { moves, setMoves } = useMoves();
  console.log(moves);
  return (
    <div>{moves && moves.map((move) => <MoveDropdown moveInfo={move} />)}</div>
  );
}

export default Moves;
