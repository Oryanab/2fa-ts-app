import React, { useState, useEffect, useRef } from "react";
import { handleLocalStorage, AddMinutesToDate } from "../Helpers/helper";
import { returnedLogin } from "../Types/types";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login({ setHasToken }: { setHasToken: any }) {
  let navigate = useNavigate();
  const userLogin = async () => {
    const form: HTMLFormElement = document.querySelector("#loginForm")!;
    const formData = new FormData(form);

    try {
      const loggedUser = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        }),
      });
      const loggedUserJson = await loggedUser.json();
      if (loggedUserJson.twoFactorAuth === true) {
        navigate("/auth", {
          state: { username: loggedUserJson.username, qr: loggedUserJson.qr },
        });
      } else {
        setHasToken(loggedUserJson.token);
        handleLocalStorage(loggedUserJson.token);
        navigate("/", {
          state: {
            username: loggedUserJson.username,
            twoFactorAuth: loggedUserJson.twoFactorAuth,
          },
        });
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="proper-div">
      <h1>Login Section</h1>
      <br />
      <p>
        Hello, welcome to the 2FA project im made, if you dont have an account
        yet, <Link to="/sign-up">sign-up</Link>
      </p>
      <form id="loginForm">
        <label htmlFor="email">Enter Your Email: </label>
        <input id="email" type="email" name="email" />
        <br />
        <label htmlFor="password">Enter Your password: </label>
        <input id="password" type="text" name="password" />
        <br />
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            userLogin();
            document.getElementById("email")!.innerText = "";
            document.getElementById("password")!.innerText = "";
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
}
