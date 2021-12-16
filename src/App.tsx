import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import TwoFactorAuth from "./Components/TwoFactorAuth";
import { getCookie } from "./Helpers/helper";

function App() {
  const [hasToken, setHasToken] = useState("");

  useEffect(() => {
    try {
      setHasToken(getCookie("token"));
    } catch (err) {
      setHasToken("");
    }
  }, []);
  // window.addEventListener("load", () => {
  //   try {
  //     setHasToken(getCookie("token"));
  //   } catch (err) {
  //     setHasToken("");
  //   }
  // });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        {hasToken.length > 0 && <Route path="/" element={<Dashboard />} />}
        {hasToken.length === 0 && (
          <Route path="/" element={<Login setHasToken={setHasToken} />} />
        )}
        <Route
          path="/auth"
          element={<TwoFactorAuth setHasToken={setHasToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
