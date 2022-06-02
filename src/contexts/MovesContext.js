import { createContext, useContext, useState } from "react";

const MovesContext = createContext(null);
const fetchedData = [
  { title: "Squat", sets: ["15x135", "10x185", "8x185", "8x185"] },
  {
    title: "Leg Press",
    sets: ["15x135", "10x185", "8x185", "8x185"],
  },
];

export function MovesProvider(props) {
  const [moves, setMoves] = useState(props.moves);

  return (
    <MovesContext.Provider value={{ moves, setMoves }}>
      {props.children}
    </MovesContext.Provider>
  );
}

export const useMoves = () => useContext(MovesContext);
