import React from 'react'
import { NavLink } from 'react-router-dom'


function Item({ to, children }) {
return (
<NavLink to={to} className={({isActive}) => `block px-3 py-2 rounded ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-200 hover:bg-indigo-500 hover:text-white'}`}>
{children}
</NavLink>
)
}


export default function Sidebar({ role }) {
return (
<aside className="w-64 bg-gray-900 min-h-screen p-4">
<h2 className="text-white text-xl font-bold mb-6">{role?.toUpperCase() || 'Dashboard'}</h2>
<nav className="flex flex-col gap-2">
<Item to={`/${role}`}>Dashboard</Item>
{role === 'admin' && <>
<Item to="/admin/users">Manage Users</Item>
<Item to="/admin/labs">Manage Labs</Item>
</>}
{role === 'instructor' && <>
<Item to="/instructor/create-lab">Create Lab</Item>
<Item to="/instructor/submissions">Submissions</Item>
</>}
{role === 'student' && <>
<Item to="/student/mylabs">My Labs</Item>
</>}
</nav>
</aside>
)
}