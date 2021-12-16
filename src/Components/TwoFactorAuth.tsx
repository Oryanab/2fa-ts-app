import React, { useState, useEffect } from "react";
import { handleLocalStorage } from "../Helpers/helper";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export default function TwoFactorAuth({ setHasToken }: { setHasToken: any }) {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { username, token, qr } = state;

  const userSubmitCode = async () => {
    const form: HTMLFormElement = document.querySelector("#authForm")!;
    const formData = new FormData(form);
    fetch("http://localhost:3001/users/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        code: formData.get("code") as string,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleLocalStorage(data.token);
        setHasToken(data.token);
        navigate("/", {
          state: { username: username, twoFactorAuth: data.twoFactorAuth },
        });
      })
      .catch((err) => {
        alert("wrong Code");
      });
  };
  return (
    <div className="proper-div">
      <h1>Two Factor Auth Section</h1>
      <h4>{`Hello ${username}`}</h4>
      <p>
        since you have enabled the 2FA service im made, please scan the barcode!
      </p>
      <img src={qr} alt="Waiting for QR to Load..." /> <br />
      <form id="authForm">
        <label htmlFor="code">Enter Your Code: </label>
        <input type="number" name="code" />
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            userSubmitCode();
          }}
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
}
