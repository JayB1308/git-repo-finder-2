import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
const Switch = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:name" element={<Profile />} />
    </Routes>
  );
};

export default Switch;
