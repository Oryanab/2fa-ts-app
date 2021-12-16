import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const { state } = useLocation();
  const { username, twoFactorAuth } = state;

  let checkBox: any = document.getElementsByName("checkbox");
  checkBox.checked = twoFactorAuth;

  const toggleOnTFA = () => {
    fetch(`http://localhost:3001/users/two-factor-auth/${username}`, {
      method: "PATCH",
      headers: {},
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        checkBox.checked = data.twoFactorAuth;
      })
      .catch((err) => {
        alert("server error");
      });
  };

  return (
    <div className="proper-div">
      <h1>Dashboard Section</h1>
      <br />
      <h2>{`Hello, ${username}`}</h2>
      <p>Hello, welcome to the 2FA project im made the service available?</p>
      <label htmlFor="factorAuth"> I Want 2FA: </label>
      <input
        id="checkbox"
        type="checkbox"
        name="factorAuth"
        onChange={() => {
          toggleOnTFA();
        }}
      />
    </div>
  );
}
