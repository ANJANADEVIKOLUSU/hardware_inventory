import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

// Auth Pages
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

// Dashboard Pages
import StudentDashboard from './pages/dashboard/StudentDashboard'
import MentorDashboard from './pages/dashboard/MentorDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'

// Resource Pages
import ResourceListing from './pages/resources/ResourceListing'
import ResourceDetails from './pages/resources/ResourceDetails'
import BorrowedResources from './pages/resources/BorrowedResources'

// Mentoring Pages
import MentorDirectory from './pages/mentoring/MentorDirectory'
import MentorProfile from './pages/mentoring/MentorProfile'
import MySessions from './pages/mentoring/MySessions'

// Other Pages
import Chat from './pages/Chat'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                {/* Dashboard Routes */}
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="mentor-dashboard" element={<MentorDashboard />} />
                <Route path="admin-dashboard" element={<AdminDashboard />} />
                
                {/* Resource Routes */}
                <Route path="resources" element={<ResourceListing />} />
                <Route path="resources/:id" element={<ResourceDetails />} />
                <Route path="borrowed" element={<BorrowedResources />} />
                
                {/* Mentoring Routes */}
                <Route path="mentors" element={<MentorDirectory />} />
                <Route path="mentors/:id" element={<MentorProfile />} />
                <Route path="sessions" element={<MySessions />} />
                
                {/* Other Routes */}
                <Route path="chat" element={<Chat />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App