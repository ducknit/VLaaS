import React from 'react'
import { useAuth } from '../context/AuthContext'


export default function Navbar() {
const { user, logout } = useAuth()
return (
<header className="flex items-center justify-between p-4 bg-white shadow">
<div className="flex items-center gap-3">
<img src="/src/assets/logo.svg" alt="logo" className="h-8 w-8" />
<h1 className="font-bold">VLaaS</h1>
</div>
<div className="flex items-center gap-4">
{user && <span className="text-sm">{user.name} • {user.role}</span>}
{user && (
<button onClick={logout} className="px-3 py-1 bg-gray-200 rounded">Logout</button>
)}
</div>
</header>
)
}