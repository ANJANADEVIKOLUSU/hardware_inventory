import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  BookMarked, 
  Users, 
  GraduationCap, 
  MessageSquare, 
  Bell, 
  User, 
  Settings,
  BarChart3,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth()
  const location = useLocation()

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', icon: Home, path: '/dashboard' },
      { name: 'Resources', icon: BookMarked, path: '/resources' },
      { name: 'Borrowed Items', icon: CheckCircle, path: '/borrowed' },
    ]

    if (user?.role === 'student') {
      return [
        ...baseItems,
        { name: 'Find Mentors', icon: Users, path: '/mentors' },
        { name: 'My Sessions', icon: GraduationCap, path: '/sessions' },
        { name: 'Chat', icon: MessageSquare, path: '/chat' },
        { name: 'Notifications', icon: Bell, path: '/notifications' },
        { name: 'Profile', icon: User, path: '/profile' },
        { name: 'Settings', icon: Settings, path: '/settings' },
      ]
    }

    if (user?.role === 'mentor') {
      return [
        ...baseItems,
        { name: 'My Students', icon: Users, path: '/mentors' },
        { name: 'Sessions', icon: GraduationCap, path: '/sessions' },
        { name: 'Chat', icon: MessageSquare, path: '/chat' },
        { name: 'Notifications', icon: Bell, path: '/notifications' },
        { name: 'Profile', icon: User, path: '/profile' },
        { name: 'Settings', icon: Settings, path: '/settings' },
      ]
    }

    if (user?.role === 'admin') {
      return [
        { name: 'Admin Dashboard', icon: BarChart3, path: '/admin-dashboard' },
        { name: 'Manage Resources', icon: BookMarked, path: '/resources' },
        { name: 'User Management', icon: Users, path: '/admin/users' },
        { name: 'Mentor Approvals', icon: GraduationCap, path: '/admin/mentors' },
        { name: 'Overdue Tracker', icon: CheckCircle, path: '/admin/overdue' },
        { name: 'Notifications', icon: Bell, path: '/notifications' },
        { name: 'Settings', icon: Settings, path: '/settings' },
      ]
    }

    return baseItems
  }

  const navigationItems = getNavigationItems()

  const isActiveRoute = (path) => {
    return location.pathname === path || 
           (path === '/dashboard' && (location.pathname === '/' || location.pathname === '/dashboard'))
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white shadow-2xl z-40 lg:relative lg:top-0 lg:h-screen lg:shadow-lg border-r border-gray-200"
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* User Info */}
              <div className="mb-8 p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
                    {user?.course && (
                      <p className="text-xs text-gray-500">{user?.course}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = isActiveRoute(item.path)
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                        isActive
                          ? 'bg-primary-100 text-primary-700 shadow-sm'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${
                        isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-primary-500'
                      }`} />
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-2 h-2 bg-primary-600 rounded-full ml-auto"
                        />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Quick Stats for Students/Mentors */}
              {user?.role !== 'admin' && (
                <div className="mt-8 p-4 bg-gray-50 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
                  <div className="space-y-3">
                    {user?.role === 'student' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Borrowed Items</span>
                          <span className="font-medium text-gray-900">3</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Upcoming Sessions</span>
                          <span className="font-medium text-gray-900">2</span>
                        </div>
                      </>
                    )}
                    {user?.role === 'mentor' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Active Students</span>
                          <span className="font-medium text-gray-900">12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">This Week Sessions</span>
                          <span className="font-medium text-gray-900">8</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar