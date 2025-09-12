import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('token'))

    // Configure axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [token])

    // Check if user is authenticated on app load
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                try {
                    const response = await axios.get('/api/auth/verify')
                    if (response.data.valid) {
                        const profileResponse = await axios.get('/api/auth/profile')
                        setUser(profileResponse.data)
                    } else {
                        localStorage.removeItem('token')
                        setToken(null)
                    }
                } catch (error) {
                    console.error('Auth verification failed:', error)
                    localStorage.removeItem('token')
                    setToken(null)
                }
            }
            setLoading(false)
        }

        checkAuth()
    }, [token])

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', {
                username,
                password
            })

            const { access_token, user: userData } = response.data
            localStorage.setItem('token', access_token)
            setToken(access_token)
            setUser(userData)

            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed'
            }
        }
    }

    const register = async (username, email, password) => {
        try {
            const response = await axios.post('/api/auth/register', {
                username,
                email,
                password
            })

            const { access_token, user: userData } = response.data
            localStorage.setItem('token', access_token)
            setToken(access_token)
            setUser(userData)

            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Registration failed'
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        delete axios.defaults.headers.common['Authorization']
    }

    const updateProfile = async (profileData) => {
        try {
            const response = await axios.put('/api/auth/profile', profileData)
            setUser(prev => ({
                ...prev,
                profile: response.data.profile
            }))
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Profile update failed'
            }
        }
    }

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
