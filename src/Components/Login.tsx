import React, { useState, useEffect, useRef } from "react";
import { handleLocalStorage } from "../Helpers/helper";
import { returnedLogin } from "../Types/types";

export default function Login() {
  const userLogin = () => {
    const form: HTMLFormElement = document.querySelector("#loginForm")!;
    const formData = new FormData(form);

    fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleLocalStorage(data.token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="proper-div">
      <h1>Login Section</h1>
      <br />
      <p>
        Hello, welcome to the 2FA project im made, if you dont have an account
        yet, sign-up
      </p>
      <form id="loginForm">
        <label htmlFor="email">Enter Your Email: </label>
        <input id="email" type="email" name="email" />
        <br />
        <label htmlFor="password">Enter Your password: </label>
        <input id="password" type="text" name="password" />
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            userLogin();
            document.getElementById("email")!.innerText = "";
            document.getElementById("password")!.innerText = "";
          }}
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
}
