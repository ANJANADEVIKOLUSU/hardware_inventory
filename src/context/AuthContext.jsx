import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

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

  // Dummy user data for development
  const dummyUsers = {
    'student@demo.com': {
      id: '1',
      email: 'student@demo.com',
      name: 'Alex Johnson',
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      course: 'Computer Science',
      year: 'Final Year'
    },
    'mentor@demo.com': {
      id: '2',
      email: 'mentor@demo.com',
      name: 'Dr. Sarah Wilson',
      role: 'mentor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      expertise: ['AI/ML', 'Web Development', 'Data Science'],
      experience: '8 years'
    },
    'admin@demo.com': {
      id: '3',
      email: 'admin@demo.com',
      name: 'John Admin',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  }

  useEffect(() => {
    // Simulate checking for existing auth
    const savedUser = localStorage.getItem('dreambuild_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const userData = dummyUsers[email]
      if (userData && password === 'demo123') {
        setUser(userData)
        localStorage.setItem('dreambuild_user', JSON.stringify(userData))
        return { success: true, user: userData }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signup = async (userData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        avatar: `https://images.unsplash.com/photo-${Date.now() % 10 + 1472099645785}?w=150&h=150&fit=crop&crop=face`
      }
      
      setUser(newUser)
      localStorage.setItem('dreambuild_user', JSON.stringify(newUser))
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dreambuild_user')
  }

  const googleSignIn = async () => {
    try {
      // Simulate Google sign-in
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const googleUser = {
        id: 'google_' + Date.now(),
        email: 'demo@gmail.com',
        name: 'Demo User',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        course: 'Engineering',
        year: 'Third Year'
      }
      
      setUser(googleUser)
      localStorage.setItem('dreambuild_user', JSON.stringify(googleUser))
      return { success: true, user: googleUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    login,
    signup,
    logout,
    googleSignIn,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}