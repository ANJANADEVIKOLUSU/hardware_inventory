import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Clock, MessageCircle, Calendar, MapPin } from 'lucide-react'
import { dummyMentors } from '../../data/dummyData'
import Card from '../../components/Card'
import Button from '../../components/Button'

const MentorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState('all')
  const [selectedAvailability, setSelectedAvailability] = useState('all')

  const expertiseOptions = ['all', 'AI/ML', 'Web Development', 'Mobile Development', 'Data Science', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'UI/UX Design']
  const availabilityOptions = ['all', 'available', 'busy']

  const filteredMentors = useMemo(() => {
    return dummyMentors.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           mentor.bio.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesExpertise = selectedExpertise === 'all' || mentor.expertise.includes(selectedExpertise)
      const matchesAvailability = selectedAvailability === 'all' || mentor.availability === selectedAvailability

      return matchesSearch && matchesExpertise && matchesAvailability
    })
  }, [searchTerm, selectedExpertise, selectedAvailability])

  const getAvailabilityBadge = (availability) => {
    return availability === 'available' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-amber-100 text-amber-800'
  }

  const getAvailabilityIcon = (availability) => {
    return availability === 'available' ? '🟢' : '🟡'
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
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Find a Mentor</h1>
            <p className="text-gray-600 mt-2">Connect with experienced professionals to guide your learning journey</p>
          </div>
          <div className="text-sm text-gray-500">
            {filteredMentors.length} of {dummyMentors.length} mentors
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants}>
        <Card>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search mentors by name, expertise, or bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-4">
              {/* Expertise Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Expertise:</span>
                <div className="flex flex-wrap gap-2">
                  {expertiseOptions.map((expertise) => (
                    <button
                      key={expertise}
                      onClick={() => setSelectedExpertise(expertise)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        selectedExpertise === expertise
                          ? 'bg-primary-100 text-primary-700 border border-primary-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                      }`}
                    >
                      {expertise === 'all' ? 'All Areas' : expertise}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Availability:</span>
                <div className="flex flex-wrap gap-2">
                  {availabilityOptions.map((availability) => (
                    <button
                      key={availability}
                      onClick={() => setSelectedAvailability(availability)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all capitalize ${
                        selectedAvailability === availability
                          ? 'bg-primary-100 text-primary-700 border border-primary-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                      }`}
                    >
                      {availability === 'all' ? 'All' : availability}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Mentor Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredMentors.map((mentor) => (
          <motion.div
            key={mentor.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="h-full hover:shadow-2xl transition-all duration-300">
              {/* Header */}
              <div className="relative mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1">
                      <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs ${
                        mentor.availability === 'available' ? 'bg-green-500' : 'bg-amber-500'
                      }`}>
                        {getAvailabilityIcon(mentor.availability)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{mentor.company}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{mentor.rating}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{mentor.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityBadge(mentor.availability)}`}>
                    {mentor.availability}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 line-clamp-3">
                  {mentor.bio}
                </p>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {mentor.expertise.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {mentor.expertise.length > 3 && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                    +{mentor.expertise.length - 3} more
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium text-gray-900">{mentor.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Response time:</span>
                  <span className="font-medium text-gray-900">{mentor.responseTime}</span>
                </div>
                {mentor.nextAvailable && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next available:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(mentor.nextAvailable).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Languages */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Languages:</span>
                  <span className="font-medium">{mentor.languages.join(', ')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2 border-t border-gray-200">
                <Button size="sm" className="flex-1">
                  View Profile
                </Button>
                <Button size="sm" variant="secondary" icon={MessageCircle}>
                  Message
                </Button>
                {mentor.availability === 'available' && (
                  <Button size="sm" variant="success" icon={Calendar}>
                    Book Session
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredMentors.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="secondary" 
              onClick={() => {
                setSearchTerm('')
                setSelectedExpertise('all')
                setSelectedAvailability('all')
              }}
            >
              Clear Filters
            </Button>
          </Card>
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              Want to become a mentor?
            </h3>
            <p className="text-primary-700 mb-4">
              Share your expertise and help the next generation of learners
            </p>
            <Button variant="primary">
              Apply to be a Mentor
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default MentorDirectory