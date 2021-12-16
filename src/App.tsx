import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import TwoFactorAuth from "./Components/TwoFactorAuth";
import { getCookie } from "./Helpers/helper";

function App() {
  const [hasToken, setHasToken] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        {hasToken.length > 0 && <Route path="/" element={<Dashboard />} />}
        {hasToken.length === 0 && (
          <Route path="/" element={<Login setHasToken={setHasToken} />} />
        )}
        <Route path="/auth" element={<TwoFactorAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
