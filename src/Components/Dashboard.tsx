import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const { state } = useLocation();
  const { username, twoFactorAuth } = state;
  const [note, setChecked] = useState("checked");

  const checkedButton = () => {
    const connecedUser = document.getElementById("connectedUser")?.innerText;
    fetch(`http://localhost:3001/users/info/${connecedUser}`)
      .then((response) => response.json())
      .then((data) => {
        data.twoFactorAuth
          ? document.getElementById("checkbox")?.setAttribute("checked", "true")
          : document.getElementById("checkbox")?.removeAttribute("checked");
      })
      .catch((err) => {});
  };

  const toggleOnTFA = () => {
    const connecedUser = document.getElementById("connectedUser")?.innerText;
    fetch(`http://localhost:3001/users/two-factor-auth/${connecedUser}`, {
      method: "PATCH",
      headers: {},
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // data.twoFactorAuth
        //   ? document.getElementById("checkbox")?.setAttribute("checked", "true")
        //   : document.getElementById("checkbox")?.removeAttribute("checked");
      })
      .catch((err) => {
        alert("server error");
      });
  };

  return (
    <div className="proper-div">
      <h1>Dashboard Section</h1>
      <br />
      <h2>
        Hello <span id="connectedUser">{username}</span>
      </h2>
      <p>Hello, welcome to the 2FA project im made the service available?</p>
      <label htmlFor="factorAuth"> I Want 2FA: </label>
      <input
        id="checkbox"
        type="checkbox"
        name="factorAuth"
        onChange={() => {
          console.log("hey");
          toggleOnTFA();
          checkedButton();
        }}
      />
      <br />
      <br />
      <br />
      <br />
      <button id="logout" type="button">
        Logout
      </button>
    </div>
  );
}
