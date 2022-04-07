import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoute from "./ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route> */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
