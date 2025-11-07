import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar role="student" />
      <div style={{ flex: 1 }}>
        <Navbar />
        <main style={{ padding: "2rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
