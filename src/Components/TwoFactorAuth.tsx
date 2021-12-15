import React, { useState, useEffect } from "react";

export default function TwoFactorAuth() {
  return (
    <div className="proper-div">
      <h1>Two Factor Auth Section</h1>
      <br />
      <p>
        Hello, since you have enabled the 2FA service im made, please scan the
        barcode!
      </p>
      <img
        src="https://upload.wikimedia.org/wikipedia/he/2/23/Qr_%D7%A7%D7%95%D7%93.JPG"
        alt=""
      />{" "}
      <br />
      <label htmlFor="code">Enter Your Code: </label>
      <input type="number" name="code" />
      <br />
      <button type="submit">submit</button>
    </div>
  );
}
