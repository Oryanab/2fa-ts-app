import React, { useState, useEffect } from "react";

export default function Dashboard() {
  return (
    <div className="proper-div">
      <h1>Dashboard Section</h1>
      <br />
      <p>Hello, welcome to the 2FA project im made the service available?</p>
      <label htmlFor="factorAuth"> I Want 2FA: </label>
      <input
        type="checkbox"
        name="factorAuth"
        onChange={() => {
          alert("change");
        }}
      />
    </div>
  );
}
