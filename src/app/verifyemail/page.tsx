"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function page() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const verifyEmail = async () => {
            const token = new URLSearchParams(window.location.search).get('token')
            if (!token) {
                setError('No verification token found in URL. Please check your email link and try again.')
                return
            }

            setLoading(true)
            try {
                const response = await axios.post('/api/users/verifyemail', { token })
                if (response.status === 200) {
                    setSuccess(true)
                    setTimeout(() => {
                        router.push('/login')
                    }, 5000) // Redirect after 2 seconds
                }
            } catch (err) {
                setError('Verification failed')
            } finally {
                setLoading(false)
            }
        }

        verifyEmail()
    }, [router])

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Email verified successfully! Redirecting to login...</p>}
        </div>
    )
}

export default page