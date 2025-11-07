import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminRoutes from "./routes/AdminRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import NotFound from "./pages/NotFound";

console.log("App component loaded");

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/instructor/*" element={<InstructorRoutes />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
