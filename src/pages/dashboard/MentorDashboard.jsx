import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, MessageSquare, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationContext'
import Card from '../../components/Card'
import Button from '../../components/Button'

const MentorDashboard = () => {
  const { user } = useAuth()
  const { unreadCount } = useNotifications()

  const stats = [
    {
      title: 'Active Students',
      value: '12',
      change: '+2 this month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'This Week Sessions',
      value: '8',
      change: '3 today',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Session Requests',
      value: '5',
      change: 'Pending approval',
      icon: MessageSquare,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    }
  ]

  const sessionRequests = [
    {
      id: 1,
      studentName: 'Alex Johnson',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      topic: 'React Performance Optimization',
      requestedDate: 'Sept 24, 2:00 PM',
      duration: '60 min',
      message: 'Need help with optimizing my React app performance'
    },
    {
      id: 2,
      studentName: 'Sarah Williams',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      topic: 'Machine Learning Basics',
      requestedDate: 'Sept 25, 10:00 AM',
      duration: '90 min',
      message: 'Introduction to ML algorithms and practical applications'
    }
  ]

  const upcomingSessions = [
    {
      id: 1,
      studentName: 'Mike Chen',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      topic: 'Web Development',
      date: 'Today',
      time: '3:00 PM',
      duration: '60 min'
    },
    {
      id: 2,
      studentName: 'Emma Davis',
      studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      topic: 'Data Science',
      date: 'Tomorrow',
      time: '11:00 AM',
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
              src={user?.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name}
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
              <p className="text-primary-100">
                {user?.expertise?.join(', ')} • {user?.experience}
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
        {/* Session Requests */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Session Requests</h2>
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {sessionRequests.length} pending
              </span>
            </div>
            <div className="space-y-4">
              {sessionRequests.map((request) => (
                <div key={request.id} className="p-4 border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={request.studentAvatar}
                      alt={request.studentName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{request.studentName}</p>
                      <p className="text-sm text-gray-600">{request.topic}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{request.requestedDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{request.duration}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{request.message}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="success">Accept</Button>
                    <Button size="sm" variant="secondary">Reschedule</Button>
                    <Button size="sm" variant="danger">Decline</Button>
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
              <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
              <Button variant="ghost" size="sm">View Calendar</Button>
            </div>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 transition-colors">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={session.studentAvatar}
                      alt={session.studentName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{session.studentName}</p>
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
                    <Button size="sm">Start Session</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Availability and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Availability Calendar */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">This Week Availability</h2>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <div className="space-y-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{day}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">9:00 AM - 5:00 PM</span>
                    <div className={`w-3 h-3 rounded-full ${
                      index < 3 ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" className="h-20 flex-col space-y-2">
                <Calendar className="w-6 h-6" />
                <span>Set Availability</span>
              </Button>
              <Button variant="secondary" className="h-20 flex-col space-y-2">
                <MessageSquare className="w-6 h-6" />
                <span>Message Students</span>
              </Button>
              <Button variant="secondary" className="h-20 flex-col space-y-2">
                <TrendingUp className="w-6 h-6" />
                <span>View Analytics</span>
              </Button>
              <Button variant="secondary" className="h-20 flex-col space-y-2">
                <Users className="w-6 h-6" />
                <span>Student Directory</span>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MentorDashboard