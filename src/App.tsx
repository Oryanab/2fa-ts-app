import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import TwoFactorAuth from "./Components/TwoFactorAuth";

function App() {
  const [hasToken, setHasToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<TwoFactorAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
