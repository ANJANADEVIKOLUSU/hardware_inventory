import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Video, MessageCircle, MoreVertical, Star, MapPin, CheckCircle } from 'lucide-react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

const MySessions = () => {
  const [filter, setFilter] = useState('all')
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const sessions = [
    {
      id: 1,
      mentor: {
        name: 'Dr. Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        company: 'Google AI'
      },
      topic: 'Machine Learning Project Review',
      date: '2025-09-23',
      time: '2:00 PM',
      duration: '60 minutes',
      status: 'confirmed',
      meetingLink: 'https://meet.google.com/abc-def-ghi',
      notes: 'Discuss project architecture and model optimization strategies.'
    },
    {
      id: 2,
      mentor: {
        name: 'Prof. Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        company: 'Stanford University'
      },
      topic: 'Career Path Discussion',
      date: '2025-09-25',
      time: '10:00 AM',
      duration: '45 minutes',
      status: 'requested',
      notes: 'Exploring opportunities in tech industry and PhD programs.'
    },
    {
      id: 3,
      mentor: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        company: 'Microsoft'
      },
      topic: 'Frontend Development Best Practices',
      date: '2025-09-18',
      time: '3:00 PM',
      duration: '60 minutes',
      status: 'completed',
      meetingLink: 'https://meet.google.com/xyz-abc-def',
      notes: 'Review React project and discuss modern development practices.',
      rating: 5,
      feedback: 'Excellent session! Very helpful guidance on React patterns.'
    },
    {
      id: 4,
      mentor: {
        name: 'Dr. James Kumar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        company: 'Amazon Web Services'
      },
      topic: 'Cloud Architecture Design',
      date: '2025-09-15',
      time: '1:00 PM',
      duration: '90 minutes',
      status: 'completed',
      notes: 'Deep dive into AWS services and scalable architecture patterns.',
      rating: 4,
      feedback: 'Great insights into cloud design patterns.'
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      requested: { color: 'bg-amber-100 text-amber-800', text: 'Requested', icon: Clock },
      confirmed: { color: 'bg-green-100 text-green-800', text: 'Confirmed', icon: CheckCircle },
      completed: { color: 'bg-gray-100 text-gray-800', text: 'Completed', icon: CheckCircle }
    }
    
    const config = statusConfig[status]
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4" />
        <span>{config.text}</span>
      </span>
    )
  }

  const renderStars = (currentRating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          i < currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
        onClick={() => setRating(i + 1)}
      />
    ))
  }

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true
    return session.status === filter
  })

  const handleCancelSession = () => {
    console.log('Canceling session:', selectedSession.id)
    setShowCancelModal(false)
    setSelectedSession(null)
  }

  const handleSubmitRating = () => {
    console.log('Submitting rating:', { sessionId: selectedSession.id, rating, review })
    setShowRatingModal(false)
    setSelectedSession(null)
    setRating(0)
    setReview('')
  }

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
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Sessions</h1>
          <p className="text-gray-600">Manage your mentoring sessions</p>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex space-x-1">
            {[
              { key: 'all', label: 'All Sessions' },
              { key: 'requested', label: 'Requested' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'completed', label: 'Completed' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Sessions Timeline */}
      <motion.div variants={itemVariants} className="space-y-4">
        {filteredSessions.length === 0 ? (
          <Card className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-600">
              {filter === 'all' ? 'You haven\'t booked any sessions yet.' : `No ${filter} sessions found.`}
            </p>
          </Card>
        ) : (
          filteredSessions.map((session, index) => (
            <motion.div
              key={session.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="relative"
            >
              <Card className="overflow-hidden">
                <div className="flex items-start space-x-4">
                  {/* Timeline Indicator */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-600" />
                    </div>
                    {index < filteredSessions.length - 1 && (
                      <div className="absolute top-12 left-6 w-0.5 h-16 bg-gray-200"></div>
                    )}
                  </div>

                  {/* Session Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{session.topic}</h3>
                          {getStatusBadge(session.status)}
                        </div>

                        <div className="flex items-center space-x-6 text-gray-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <img
                              src={session.mentor.avatar}
                              alt={session.mentor.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>{session.mentor.name}</span>
                            <span className="text-gray-400">•</span>
                            <span>{session.mentor.company}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(session.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{session.duration}</span>
                          </div>
                        </div>

                        {session.notes && (
                          <p className="text-gray-700 mb-4">{session.notes}</p>
                        )}

                        {/* Completed Session Feedback */}
                        {session.status === 'completed' && session.rating && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium text-gray-700">Your Rating:</span>
                              <div className="flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < session.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            {session.feedback && (
                              <p className="text-sm text-gray-600">{session.feedback}</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {session.status === 'confirmed' && session.meetingLink && (
                          <Button
                            size="sm"
                            icon={Video}
                            onClick={() => window.open(session.meetingLink, '_blank')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Join
                          </Button>
                        )}
                        
                        {(session.status === 'requested' || session.status === 'confirmed') && (
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={MessageCircle}
                          >
                            Chat
                          </Button>
                        )}

                        {session.status === 'completed' && !session.rating && (
                          <Button
                            size="sm"
                            icon={Star}
                            onClick={() => {
                              setSelectedSession(session)
                              setShowRatingModal(true)
                            }}
                          >
                            Rate
                          </Button>
                        )}

                        {(session.status === 'requested' || session.status === 'confirmed') && (
                          <button
                            onClick={() => {
                              setSelectedSession(session)
                              setShowCancelModal(true)
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Cancel Session Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Session"
        maxWidth="max-w-md"
        footer={
          <div className="flex space-x-3 justify-end">
            <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
              Keep Session
            </Button>
            <Button variant="danger" onClick={handleCancelSession}>
              Cancel Session
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to cancel your session with{' '}
            <span className="font-medium">{selectedSession?.mentor.name}</span>?
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Canceling within 24 hours of the session may affect your booking privileges.
            </p>
          </div>
        </div>
      </Modal>

      {/* Rating Modal */}
      <Modal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Rate Your Session"
        maxWidth="max-w-md"
        footer={
          <div className="flex space-x-3 justify-end">
            <Button variant="secondary" onClick={() => setShowRatingModal(false)}>
              Skip
            </Button>
            <Button onClick={handleSubmitRating} disabled={rating === 0}>
              Submit Rating
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            How was your session with{' '}
            <span className="font-medium">{selectedSession?.mentor.name}</span>?
          </p>
          
          <div className="text-center">
            <div className="flex justify-center space-x-1 mb-4">
              {renderStars(rating)}
            </div>
            <p className="text-sm text-gray-600">
              {rating === 0 && 'Click to rate'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share your experience (optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you learn? How was the mentor?"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default MySessions