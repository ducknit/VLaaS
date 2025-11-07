import { Routes, Route } from "react-router-dom";
import InstructorLayout from "../layouts/InstructorLayout";
import Dashboard from "../pages/Instructor/Dashboard";
import CreateLab from "../pages/Instructor/CreateLab";

export default function InstructorRoutes() {
  return (
    <Routes>
      <Route element={<InstructorLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="create-lab" element={<CreateLab />} />
      </Route>
    </Routes>
  );
}
