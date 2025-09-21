import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Calendar, Clock, MessageCircle, MapPin, GraduationCap, Briefcase, Globe, Award } from 'lucide-react'
import { dummyMentors } from '../../data/dummyData'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

const MentorProfile = () => {
  const [activeTab, setActiveTab] = useState('about')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [sessionTopic, setSessionTopic] = useState('')

  // For demo purposes, using the first mentor
  const mentor = dummyMentors[0]

  const tabs = [
    { id: 'about', name: 'About', icon: GraduationCap },
    { id: 'availability', name: 'Availability', icon: Calendar },
    { id: 'reviews', name: 'Reviews', icon: Star }
  ]

  const reviews = [
    {
      id: 1,
      student: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      date: '2025-09-15',
      comment: 'Dr. Wilson is an exceptional mentor! Her explanations are clear and she provides excellent resources. Really helped me understand complex ML concepts.'
    },
    {
      id: 2,
      student: 'Sarah Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      date: '2025-09-10',
      comment: 'Amazing session! Very knowledgeable and patient. Would definitely book again.'
    },
    {
      id: 3,
      student: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      date: '2025-09-05',
      comment: 'Great mentor with deep expertise in AI/ML. Helped me with my capstone project.'
    }
  ]

  const availableSlots = [
    { date: '2025-09-22', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
    { date: '2025-09-23', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
    { date: '2025-09-24', slots: ['10:00 AM', '1:00 PM', '5:00 PM'] },
    { date: '2025-09-25', slots: ['9:00 AM', '2:00 PM', '4:00 PM'] }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleBookSession = () => {
    // Handle booking logic here
    console.log('Booking session:', { selectedDate, selectedTime, sessionTopic })
    setShowBookingModal(false)
    // Reset form
    setSelectedDate('')
    setSelectedTime('')
    setSessionTopic('')
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
      {/* Cover and Profile Header */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden" padding="p-0">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-700"></div>
          
          {/* Profile Info */}
          <div className="p-6 relative">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4 md:mb-0">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute -bottom-2 -right-2">
                  <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                    mentor.availability === 'available' ? 'bg-green-500' : 'bg-amber-500'
                  }`}>
                    <span className="text-xs">
                      {mentor.availability === 'available' ? '🟢' : '🟡'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">{mentor.name}</h1>
                <p className="text-gray-600 mb-2">{mentor.company}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex">{renderStars(Math.floor(mentor.rating))}</div>
                    <span className="font-medium">{mentor.rating}</span>
                    <span>({mentor.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Response time: {mentor.responseTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button variant="secondary" icon={MessageCircle}>
                  Message
                </Button>
                {mentor.availability === 'available' && (
                  <Button 
                    icon={Calendar}
                    onClick={() => setShowBookingModal(true)}
                    className="animate-pulse"
                  >
                    Book Session
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div variants={itemVariants}>
        <Card padding="p-0">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary-700 border-b-2 border-primary-700 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </div>
        </Card>
      </motion.div>

      {/* Tab Content */}
      <motion.div variants={itemVariants}>
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bio and Experience */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {mentor.bio}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="font-medium text-gray-900">Education:</span>
                      <span className="text-gray-700 ml-2">{mentor.education}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="font-medium text-gray-900">Experience:</span>
                      <span className="text-gray-700 ml-2">{mentor.experience}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-primary-600" />
                    <div>
                      <span className="font-medium text-gray-900">Languages:</span>
                      <span className="text-gray-700 ml-2">{mentor.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                <div className="grid grid-cols-2 gap-3">
                  {mentor.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <Award className="w-4 h-4 text-primary-600" />
                      <span className="text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Stats and Quick Info */}
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mentoring Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sessions</span>
                    <span className="font-semibold text-gray-900">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Rating</span>
                    <span className="font-semibold text-gray-900">{mentor.rating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Rate</span>
                    <span className="font-semibold text-gray-900">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold text-gray-900">Jan 2024</span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-semibold capitalize ${
                      mentor.availability === 'available' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {mentor.availability}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Available</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(mentor.nextAvailable).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timezone</span>
                    <span className="font-semibold text-gray-900">PST</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'availability' && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Time Slots</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableSlots.map((day) => (
                <div key={day.date} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </h4>
                  <div className="space-y-2">
                    {day.slots.map((slot) => (
                      <button
                        key={slot}
                        className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'reviews' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Reviews & Ratings</h3>
              <div className="text-sm text-gray-500">
                {reviews.length} reviews
              </div>
            </div>
            
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.student}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.student}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </motion.div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Book a Session"
        maxWidth="max-w-md"
        footer={
          <div className="flex space-x-3 justify-end">
            <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleBookSession}>
              Book Session
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Choose a date</option>
              {availableSlots.map((day) => (
                <option key={day.date} value={day.date}>
                  {new Date(day.date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Choose a time</option>
                {availableSlots
                  .find(day => day.date === selectedDate)
                  ?.slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Topic
            </label>
            <textarea
              value={sessionTopic}
              onChange={(e) => setSessionTopic(e.target.value)}
              placeholder="What would you like to discuss?"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default MentorProfile