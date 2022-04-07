import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckENVRoute from "./CheckENVRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CheckENVRoute />}>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
