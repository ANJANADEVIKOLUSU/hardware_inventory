import React from 'react'
import { motion } from 'framer-motion'
import { Users, BookMarked, AlertTriangle, TrendingUp, Calendar, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Card from '../../components/Card'
import Button from '../../components/Button'

const AdminDashboard = () => {
  const { user } = useAuth()

  const stats = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+45 this month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Resources',
      value: '89',
      change: '12 borrowed',
      icon: BookMarked,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Overdue Items',
      value: '7',
      change: 'Needs attention',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Sessions This Month',
      value: '156',
      change: '+23% from last month',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const overdueItems = [
    {
      id: 1,
      resourceName: 'iPad Pro 12.9"',
      borrower: 'Sarah Williams',
      dueDate: '2025-09-18',
      daysOverdue: 3,
      contact: 'sarah.w@student.com'
    },
    {
      id: 2,
      resourceName: 'Canon EOS R5',
      borrower: 'Mike Johnson',
      dueDate: '2025-09-19',
      daysOverdue: 2,
      contact: 'mike.j@student.com'
    }
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: 'mentor',
      name: 'Dr. James Wilson',
      email: 'james.wilson@university.edu',
      expertise: 'Machine Learning, AI',
      experience: '10 years',
      submittedDate: '2025-09-20'
    },
    {
      id: 2,
      type: 'resource',
      name: 'New 3D Printer Request',
      requester: 'Engineering Dept',
      category: 'Equipment',
      cost: '$2,500',
      submittedDate: '2025-09-19'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'user_joined',
      message: 'New student Alex Johnson registered',
      time: '10 minutes ago'
    },
    {
      id: 2,
      type: 'resource_borrowed',
      message: 'MacBook Pro borrowed by Emma Davis',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'mentor_approved',
      message: 'Dr. Sarah Wilson mentor application approved',
      time: '2 hours ago'
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
              src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'}
              alt={user?.name}
              className="w-16 h-16 rounded-full border-4 border-white/20"
            />
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-primary-100">
                Welcome back, {user?.name}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
        {/* Overdue Items */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Overdue Items</h2>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {overdueItems.length} items
              </span>
            </div>
            <div className="space-y-4">
              {overdueItems.map((item) => (
                <div key={item.id} className="p-4 border border-red-200 bg-red-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{item.resourceName}</h3>
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                      {item.daysOverdue} days overdue
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Borrower: {item.borrower}</p>
                    <p>Due: {item.dueDate}</p>
                    <p>Contact: {item.contact}</p>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="danger">Send Reminder</Button>
                    <Button size="sm" variant="secondary">Contact</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Pending Approvals */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Pending Approvals</h2>
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {pendingApprovals.length} pending
              </span>
            </div>
            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div key={approval.id} className="p-4 border border-amber-200 bg-amber-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{approval.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{approval.type} Application</p>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
                      Pending
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    {approval.type === 'mentor' ? (
                      <>
                        <p>Email: {approval.email}</p>
                        <p>Expertise: {approval.expertise}</p>
                        <p>Experience: {approval.experience}</p>
                      </>
                    ) : (
                      <>
                        <p>Requested by: {approval.requester}</p>
                        <p>Category: {approval.category}</p>
                        <p>Estimated Cost: {approval.cost}</p>
                      </>
                    )}
                    <p>Submitted: {approval.submittedDate}</p>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="success">Approve</Button>
                    <Button size="sm" variant="danger">Reject</Button>
                    <Button size="sm" variant="secondary">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

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
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg mt-1 ${
                    activity.type === 'user_joined' ? 'bg-green-100 text-green-600' :
                    activity.type === 'resource_borrowed' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'user_joined' && <Users className="w-4 h-4" />}
                    {activity.type === 'resource_borrowed' && <BookMarked className="w-4 h-4" />}
                    {activity.type === 'mentor_approved' && <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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
                <Users className="w-6 h-6" />
                <span>Manage Users</span>
              </Button>
              <Button variant="secondary" className="h-20 flex-col space-y-2">
                <BookMarked className="w-6 h-6" />
                <span>Add Resource</span>
              </Button>
              <Button variant="secondary" className="h-20 flex-col space-y-2">
                <TrendingUp className="w-6 h-6" />
                <span>View Analytics</span>
              </Button>
              <Button variant="secondary" className="h-20 flex-col space-y-2">
                <AlertTriangle className="w-6 h-6" />
                <span>System Alerts</span>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard