import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function SignUp() {
  let navigate = useNavigate();
  const userSignUp = () => {
    const form: HTMLFormElement = document.querySelector("#signupForm")!;
    const formData = new FormData(form);
    fetch("http://localhost:3001/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.get("username") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="proper-div">
      <h1>Sign-Up Section</h1>
      <br />
      <p>
        Hello, welcome to the 2FA project im made, if you have an account ,
        <Link to="/">Login</Link>
      </p>
      <form id="signupForm">
        <label htmlFor="username">Enter Your Username: </label>
        <input type="text" name="username" />
        <br />
        <label htmlFor="email">Enter Your Email: </label>
        <input type="email" name="email" />
        <br />
        <label htmlFor="password">Enter Your password: </label>
        <input type="text" name="password" />
        <br />
        <button
          onClick={(event) => {
            event.preventDefault();
            userSignUp();
          }}
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
}
