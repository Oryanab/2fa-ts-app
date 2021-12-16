import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { deleteAllCookies, delete_cookie } from "../Helpers/helper";

export default function Dashboard() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const { username, twoFactorAuth } = state;
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    const connecedUser = document.getElementById("connectedUser")?.innerText;
    fetch(`http://localhost:3001/users/info/${connecedUser}`)
      .then((response) => response.json())
      .then((data) => {
        data.twoFactorAuth === true ? setChecked(true) : setChecked(false);
      })
      .catch((err) => {});
  }, []);

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
        data.twoFactorAuth === true ? setChecked(true) : setChecked(false);
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
        checked={checked}
        name="factorAuth"
        onChange={() => {
          toggleOnTFA();
        }}
      />
      <br />
      <br />
      <br />
      <br />
      <button
        onClick={(e) => {
          //e.preventDefault();
          delete_cookie("token");
          navigate("/");
        }}
        id="logout"
        type="button"
      >
        Logout
      </button>
    </div>
  );
}
