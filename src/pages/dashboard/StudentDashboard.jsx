import React from 'react'
import { motion } from 'framer-motion'
import { BookMarked, Calendar, Bell, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationContext'
import Card from '../../components/Card'
import Button from '../../components/Button'

const StudentDashboard = () => {
  const { user } = useAuth()
  const { unreadCount } = useNotifications()

  const stats = [
    {
      title: 'Borrowed Resources',
      value: '3',
      change: '+1 this week',
      icon: BookMarked,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Upcoming Sessions',
      value: '2',
      change: 'Next: Tomorrow 2 PM',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Notifications',
      value: unreadCount.toString(),
      change: 'New updates',
      icon: Bell,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'borrowed',
      title: 'Borrowed MacBook Pro 16"',
      time: '2 hours ago',
      dueDate: 'Due: Sept 25, 2025',
      status: 'active'
    },
    {
      id: 2,
      type: 'session',
      title: 'ML Session with Dr. Sarah Wilson',
      time: '1 day ago',
      dueDate: 'Completed',
      status: 'completed'
    },
    {
      id: 3,
      type: 'returned',
      title: 'Returned Arduino Kit',
      time: '3 days ago',
      dueDate: 'On time',
      status: 'completed'
    }
  ]

  const upcomingSessions = [
    {
      id: 1,
      mentorName: 'Dr. Sarah Wilson',
      mentorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      topic: 'Machine Learning Fundamentals',
      date: 'Tomorrow',
      time: '2:00 PM',
      duration: '60 min'
    },
    {
      id: 2,
      mentorName: 'Alex Rodriguez',
      mentorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      topic: 'React Best Practices',
      date: 'Sept 25',
      time: '10:00 AM',
      duration: '90 min'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name}
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-primary-100">
                {user?.course} • {user?.year}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'borrowed' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'session' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.type === 'borrowed' && <BookMarked className="w-4 h-4" />}
                    {activity.type === 'session' && <Calendar className="w-4 h-4" />}
                    {activity.type === 'returned' && <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <span className="text-xs text-gray-300">•</span>
                      <p className={`text-xs ${
                        activity.status === 'active' ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        {activity.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
              <Button variant="ghost" size="sm">Schedule New</Button>
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 transition-colors">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={session.mentorAvatar}
                      alt={session.mentorName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{session.mentorName}</p>
                      <p className="text-sm text-gray-600">{session.topic}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <BookMarked className="w-6 h-6" />
              <span>Browse Resources</span>
            </Button>
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <Calendar className="w-6 h-6" />
              <span>Schedule Session</span>
            </Button>
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <TrendingUp className="w-6 h-6" />
              <span>Find Mentors</span>
            </Button>
            <Button variant="secondary" className="h-20 flex-col space-y-2">
              <Bell className="w-6 h-6" />
              <span>Notifications</span>
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default StudentDashboard