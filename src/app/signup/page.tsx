"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
function page() {
  const [formData, setFormData] = useState({
    email:"",
    username : "",
    password:"",
    confirmPassword:"",
  })

  const [disabled, setDisabled] = useState(true)

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onSignup = async () => {
    try {
      setLoading(true)
      const signupData = {
        email: formData.email,
        username: formData.username,
        password: formData.password
      }
      const response = await axios.post("/api/users/signup", signupData)
      console.log("signup response", response);
      router.push("/login")
    } catch (error: any) {
      console.log("signup error", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
  if(formData.password === formData.confirmPassword && formData.email !== "" && formData.username !== "" && formData.password !== ""  ){
      setDisabled(false)
    }
  }, [formData])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={onSignup}
              disabled={disabled || loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${disabled ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default page