import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { logIn } from "../libs/firebase";
import { invalidReasonLogIn } from "../utils/authUtils";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalidForm = email === "" || password === "";
  const logInHandler = async (event) => {
    event.preventDefault();
    if (isInvalidForm) {
      setError(invalidReasonLogIn(email, password));
      return;
    }
    await logIn(email, password, setEmail, setPassword, setError);
    navigate(ROUTES.DASHBOARD);
  };

  useEffect(() => {
    document.title = "Fitness Diaries - Sign Up";
  }, []);
  return (
    <div className="container flex mx-auto items-center justify-center h-screen maw-w-screen-xl">
      <div
        className="hidden w-2/5 mx-6 md:flex
      "
      >
        <img
          src="/images/bodybuilderwithzbar.jpeg"
          alt="Bodybuilder with a Z-bar"
          className="rounded"
        />
      </div>
      <div className="flex w-3/5 md:w-2/5 flex-col max-w-screen-sm items-center bg-blue-300 p-4 rounded">
        <h1 className="text-green-600 mb-4 text-2xl font-bold">
          Welcome To Fitness Diaries
        </h1>
        <form action="POST" onSubmit={logInHandler}>
          <input
            type="text"
            aria-label="Enter your email adress"
            placeholder="Email adress"
            className="w-full border rounded-sm border-lime-500 mx-auto h-8 mb-2 py-5 px-1 bg-slate-100"
            autoComplete="on"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />
          <input
            type="password"
            aria-label="Password"
            placeholder="Password"
            className="w-full border rounded-sm border-lime-500 mx-auto h-8 mb-2 py-5 px-1 bg-slate-100"
            autoComplete="on"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button className="w-full bg-lime-300 text-xl mx-auto py-2 mb-2 ">
            Log In
          </button>
        </form>
        <div>
          <p>
            Does not have an account?{" "}
            <Link to={ROUTES.SIGN_UP} className="font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
