"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
function page() {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()  
    useEffect(() => {
        const checkAuth = async () => {
            const response = await axios.get("/api/users/me")
            console.log("profile response", response);
            setUser(response.data.data._id);
        }
        checkAuth()
    }, [])
    const logout = async () => {
        try {
            setLoading(true);
            await axios.get('/api/users/logout');
            router.push('/login');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>Profile</h1>
    {loading ? (
        <p>Loading...</p>
    ) : (
        <div className="flex flex-col items-center">
            {user &&  <Link href={`/profile/${user}`}><h2>User ID: {user}</h2></Link>}
            {error && <p className="text-red-500">{error}</p>}
            <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Logout
            </button>
        </div>
    )}
</div>
  )
}

export default page