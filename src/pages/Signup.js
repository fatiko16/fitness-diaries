import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../libs/firebase";
import * as ROUTES from "../constants/routes";
import { invalidReasonSignUp } from "../utils/authUtils";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const isInvalidForm =
    email === "" ||
    password === "" ||
    username === "" ||
    password !== passwordConfirmation;

  async function signUpHandler(event) {
    event.preventDefault();
    if (isInvalidForm) {
      console.log(email);
      setError(
        invalidReasonSignUp(email, password, passwordConfirmation, username)
      );
      return;
    }
    await signUp(
      email,
      password,
      passwordConfirmation,
      username,
      setEmail,
      setPassword,
      setPasswordConfirmation,
      setUsername,
      setError
    );
    navigate(ROUTES.DASHBOARD);
  }

  useEffect(() => {
    document.title = "Fitness Diaries - Sign Up";
  }, []);
  return (
    <div className="container flex mx-auto items-center justify-center h-screen max-w-screen-xl ">
      <div className="mr-6 flex w-2/5 ml-6">
        <img
          src="/images/bodybuilderwithzbar.jpeg"
          alt="Bodybuilder with a Z-bar"
          className="rounded"
        />
      </div>
      <div className="flex w-2/5 flex-col max-w-screen-sm items-center bg-blue-300 p-4 rounded">
        <h1 className="text-green-600 mb-4 text-2xl font-bold">
          Welcome To Fitness Diaries
        </h1>
        {error && <p className="text-2xl text-red-500 mb-2">{error}</p>}
        <form action="POST" onSubmit={signUpHandler}>
          <input
            type="text"
            aria-label="Enter your user name"
            placeholder="Username"
            className="w-full border rounded-sm border-lime-500 mx-auto h-8 mb-2 py-5 px-1 bg-slate-100"
            autoComplete="on"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
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
          <input
            type="password"
            aria-label="Password Confirmation"
            placeholder="Password Confirmation"
            className="w-full border rounded-sm border-lime-500 mx-auto h-8 mb-2 py-5 px-1 bg-slate-100"
            autoComplete="on"
            onChange={({ target }) => setPasswordConfirmation(target.value)}
            value={passwordConfirmation}
          />
          <button className="w-full bg-lime-300 text-xl mx-auto py-2 mb-2 ">
            Sign Up
          </button>
        </form>
        <div>
          <p>
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
