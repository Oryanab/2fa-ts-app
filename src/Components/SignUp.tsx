import React, { useState, useEffect } from "react";

export default function SignUp() {
  return (
    <div className="proper-div">
      <h1>Sign-Up Section</h1>
      <br />
      <p>
        Hello, welcome to the 2FA project im made, if you have an account ,
        Login
      </p>
      <form>
        <label htmlFor="username">Enter Your Username: </label>
        <input type="text" name="username" />
        <br />
        <label htmlFor="email">Enter Your Email: </label>
        <input type="email" name="email" />
        <br />
        <label htmlFor="password">Enter Your password: </label>
        <input type="text" name="password" />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
