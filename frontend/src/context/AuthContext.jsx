// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved user
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    
    // Check for dark mode preference
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setDarkMode(savedTheme === 'true')
      if (savedTheme === 'true') {
        document.documentElement.classList.add('dark')
      }
    }
    
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password && password.length >= 6) {
          const userData = {
            id: Date.now(),
            email,
            name: email.split('@')[0],
            role: email.includes('admin') ? 'admin' : 'user'
          }
          localStorage.setItem('user', JSON.stringify(userData))
          setUser(userData)
          toast.success('Login successful!')
          resolve({ success: true, user: userData })
        } else {
          toast.error('Invalid credentials')
          reject({ success: false, error: 'Invalid credentials' })
        }
      }, 1000)
    })
  }

  const signup = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.password !== userData.confirmPassword) {
          toast.error('Passwords do not match')
          reject({ success: false, error: 'Passwords do not match' })
        } else if (userData.password.length < 6) {
          toast.error('Password must be at least 6 characters')
          reject({ success: false, error: 'Password too short' })
        } else {
          const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: 'user'
          }
          localStorage.setItem('user', JSON.stringify(newUser))
          setUser(newUser)
          toast.success('Account created successfully!')
          resolve({ success: true, user: newUser })
        }
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Logged out successfully')
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', !darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    darkMode,
    toggleDarkMode
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}