import { Routes, Route } from "react-router-dom";
import StudentLayout from "../layouts/StudentLayout";
import Dashboard from "../pages/Student/Dashboard";
import MyLabs from "../pages/Student/MyLabs";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="mylabs" element={<MyLabs />} />
      </Route>
    </Routes>
  );
}
