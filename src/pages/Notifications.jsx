import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Calendar, MessageCircle, Book, Award, Settings, Check, X, MoreHorizontal } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const Notifications = () => {
  const [filter, setFilter] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'session',
      icon: Calendar,
      iconColor: 'text-blue-600 bg-blue-100',
      title: 'Session Reminder',
      message: 'Your session with Dr. Sarah Wilson is starting in 30 minutes',
      timestamp: '2025-09-20T13:30:00Z',
      isRead: false,
      actionable: true,
      actions: [
        { label: 'Join Session', variant: 'primary', action: 'join' },
        { label: 'Reschedule', variant: 'secondary', action: 'reschedule' }
      ]
    },
    {
      id: 2,
      type: 'message',
      icon: MessageCircle,
      iconColor: 'text-green-600 bg-green-100',
      title: 'New Message',
      message: 'Prof. Michael Chen sent you a message about your career consultation',
      timestamp: '2025-09-20T12:15:00Z',
      isRead: false,
      actionable: true,
      actions: [
        { label: 'Reply', variant: 'primary', action: 'reply' }
      ]
    },
    {
      id: 3,
      type: 'resource',
      icon: Book,
      iconColor: 'text-purple-600 bg-purple-100',
      title: 'Resource Available',
      message: 'The book "Clean Code" you requested is now available for pickup',
      timestamp: '2025-09-20T10:45:00Z',
      isRead: true,
      actionable: true,
      actions: [
        { label: 'View Details', variant: 'primary', action: 'view' }
      ]
    },
    {
      id: 4,
      type: 'session',
      icon: Calendar,
      iconColor: 'text-blue-600 bg-blue-100',
      title: 'Session Confirmed',
      message: 'Your session request with Emily Rodriguez has been confirmed for Sep 25, 10:00 AM',
      timestamp: '2025-09-20T09:30:00Z',
      isRead: true,
      actionable: false
    },
    {
      id: 5,
      type: 'achievement',
      icon: Award,
      iconColor: 'text-yellow-600 bg-yellow-100',
      title: 'Achievement Unlocked',
      message: 'You\'ve completed 5 mentoring sessions! Keep up the great work!',
      timestamp: '2025-09-19T16:20:00Z',
      isRead: true,
      actionable: false
    },
    {
      id: 6,
      type: 'resource',
      icon: Book,
      iconColor: 'text-purple-600 bg-purple-100',
      title: 'Return Reminder',
      message: 'Don\'t forget to return "Introduction to Algorithms" by Sep 22',
      timestamp: '2025-09-19T14:00:00Z',
      isRead: false,
      actionable: true,
      actions: [
        { label: 'Extend Loan', variant: 'primary', action: 'extend' },
        { label: 'Mark Returned', variant: 'secondary', action: 'return' }
      ]
    },
    {
      id: 7,
      type: 'message',
      icon: MessageCircle,
      iconColor: 'text-green-600 bg-green-100',
      title: 'Session Feedback',
      message: 'Please rate your recent session with Dr. James Kumar',
      timestamp: '2025-09-19T11:30:00Z',
      isRead: true,
      actionable: true,
      actions: [
        { label: 'Rate Session', variant: 'primary', action: 'rate' }
      ]
    }
  ])

  const filterTabs = [
    { key: 'all', label: 'All', count: notifications.length },
    { key: 'unread', label: 'Unread', count: notifications.filter(n => !n.isRead).length },
    { key: 'session', label: 'Sessions', count: notifications.filter(n => n.type === 'session').length },
    { key: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { key: 'resource', label: 'Resources', count: notifications.filter(n => n.type === 'resource').length }
  ]

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.isRead
    return notification.type === filter
  })

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const handleAction = (notificationId, action) => {
    console.log('Handling action:', action, 'for notification:', notificationId)
    markAsRead(notificationId)
    
    // Handle different actions
    switch (action) {
      case 'join':
        // Redirect to session
        break
      case 'reply':
        // Open chat
        break
      case 'view':
        // View resource details
        break
      default:
        break
    }
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now - time) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with your mentoring activities</p>
        </div>
        <div className="flex items-center space-x-3">
          {notifications.some(n => !n.isRead) && (
            <Button variant="secondary" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
          <Button variant="secondary" icon={Settings}>
            Settings
          </Button>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex space-x-1 overflow-x-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  filter === tab.key
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    filter === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Notifications List */}
      <motion.div variants={itemVariants} className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'You\'re all caught up!' 
                : `No ${filter === 'unread' ? 'unread' : filter} notifications.`
              }
            </p>
          </Card>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon
            return (
              <motion.div
                key={notification.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className={`relative ${!notification.isRead ? 'ring-2 ring-primary-200' : ''}`}
              >
                <Card className={`transition-all ${
                  !notification.isRead ? 'bg-primary-50' : ''
                }`}>
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mb-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>

                        {/* Actions Menu */}
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-green-600 rounded transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => dismissNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                            title="Dismiss"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {notification.actionable && notification.actions && (
                        <div className="flex items-center space-x-2 mt-3">
                          {notification.actions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant={action.variant}
                              onClick={() => handleAction(notification.id, action.action)}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })
        )}
      </motion.div>

      {/* Load More */}
      {filteredNotifications.length > 0 && (
        <motion.div variants={itemVariants} className="text-center">
          <Button variant="secondary">
            Load More Notifications
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Notifications