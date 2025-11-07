import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Auth/Login'
import NotFound from '../pages/NotFound'
import AdminRoutes from './AdminRoutes'
import InstructorRoutes from './InstructorRoutes'
import StudentRoutes from './StudentRoutes'


export default function AppRoutes(){
return (
<Routes>
<Route path="/" element={<Login />} />
<Route path="/admin/*" element={<AdminRoutes />} />
<Route path="/instructor/*" element={<InstructorRoutes />} />
<Route path="/student/*" element={<StudentRoutes />} />
<Route path="*" element={<NotFound />} />
</Routes>
)
}