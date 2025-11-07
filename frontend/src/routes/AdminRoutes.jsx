import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import AdminDashboard from '../pages/Admin/Dashboard'
import ManageUsers from '../pages/Admin/ManageUsers'
import ManageLabs from '../pages/Admin/ManageLabs'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="labs" element={<ManageLabs />} />
      </Route>
    </Routes>
  )
}
