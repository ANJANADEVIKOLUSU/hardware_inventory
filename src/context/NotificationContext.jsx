import React, { createContext, useContext, useState, useEffect } from 'react'

const NotificationContext = createContext({})

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  // Dummy notifications for development
  useEffect(() => {
    const dummyNotifications = [
      {
        id: '1',
        type: 'due',
        title: 'Book Due Tomorrow',
        message: 'Your borrowed book "React Patterns" is due tomorrow',
        timestamp: Date.now() - 3600000, // 1 hour ago
        read: false,
        icon: 'BookOpen'
      },
      {
        id: '2',
        type: 'session',
        title: 'Session Confirmed',
        message: 'Your mentoring session with Dr. Sarah Wilson is confirmed for tomorrow at 2 PM',
        timestamp: Date.now() - 7200000, // 2 hours ago
        read: false,
        icon: 'Calendar'
      },
      {
        id: '3',
        type: 'overdue',
        title: 'Overdue Item',
        message: 'Your borrowed laptop is 2 days overdue. Please return it immediately.',
        timestamp: Date.now() - 86400000, // 1 day ago
        read: true,
        icon: 'AlertTriangle'
      },
      {
        id: '4',
        type: 'message',
        title: 'New Message',
        message: 'You have a new message from Alex Johnson',
        timestamp: Date.now() - 1800000, // 30 minutes ago
        read: false,
        icon: 'MessageCircle'
      }
    ]
    setNotifications(dummyNotifications)
  }, [])

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      read: false,
      ...notification
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}