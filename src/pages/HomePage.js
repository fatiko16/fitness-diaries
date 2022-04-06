import React from "react";
import Header from "../components/Header";
import useAuthListener from "../hooks/use-auth-listener";
function HomePage() {
  const user = useAuthListener();
  console.log(user);
  return <div></div>;
}

export default HomePage;
