import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPassword from "../pages/ForgetPassword";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import TaskManager from "../pages/TaskManager";

const SiteRoute = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
    </Routes>
    <Routes>
      <Route path="signup" element={<Signup />} />
    </Routes>
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
    <Routes>
      <Route path="forget-password" element={<ForgetPassword />} />
    </Routes>
    <Routes>
      <Route path="taskmanager" element={<TaskManager />} />
    </Routes>
  </BrowserRouter>
  )
}

export default SiteRoute







