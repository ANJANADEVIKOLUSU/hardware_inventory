import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Edit3, Save, X, User, Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'
import Button from '../components/Button'
import Modal from '../components/Modal'

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || 'Alex Johnson',
    email: user?.email || 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Computer Science student passionate about machine learning and web development. Always eager to learn new technologies and connect with mentors in the field.',
    university: 'University of California, Berkeley',
    major: 'Computer Science',
    year: 'Senior (4th Year)',
    gpa: '3.8',
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 'SQL'],
    interests: ['AI/ML', 'Web Development', 'Data Science', 'Mobile App Development'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    cover: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1200&h=400&fit=crop',
    joinDate: '2024-01-15',
    role: user?.role || 'student'
  })

  const [editedProfile, setEditedProfile] = useState(profile)
  const [newSkill, setNewSkill] = useState('')
  const [newInterest, setNewInterest] = useState('')

  const stats = [
    { label: 'Sessions Attended', value: '12', icon: Calendar },
    { label: 'Resources Borrowed', value: '8', icon: GraduationCap },
    { label: 'Mentors Connected', value: '5', icon: User },
    { label: 'Profile Views', value: '23', icon: Briefcase }
  ]

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const addSkill = () => {
    if (newSkill.trim() && !editedProfile.skills.includes(newSkill.trim())) {
      setEditedProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove) => {
    setEditedProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const addInterest = () => {
    if (newInterest.trim() && !editedProfile.interests.includes(newInterest.trim())) {
      setEditedProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }))
      setNewInterest('')
    }
  }

  const removeInterest = (interestToRemove) => {
    setEditedProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }))
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
          <div className="relative h-48 bg-gradient-to-r from-primary-600 to-primary-700">
            <img
              src={profile.cover}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            {isEditing && (
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg text-white hover:bg-opacity-30 transition-all"
              >
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Profile Info */}
          <div className="p-6 relative">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-20 mb-4 md:mb-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                {isEditing && (
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="absolute bottom-2 right-2 p-2 bg-primary-600 rounded-full text-white hover:bg-primary-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-gray-600 text-lg">{profile.university}</p>
                    <p className="text-gray-500">{profile.major} • {profile.year}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {!isEditing ? (
                      <Button
                        icon={Edit3}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          icon={X}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                        <Button
                          icon={Save}
                          onClick={handleSave}
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={index} className="text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mx-auto mb-2">
                          <Icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{profile.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{profile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{profile.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                ) : (
                  <p className="text-gray-900 leading-relaxed">{profile.bio}</p>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.university}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, university: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <span className="text-gray-900">{profile.university}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Major
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.major}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, major: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <span className="text-gray-900">{profile.major}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                {isEditing ? (
                  <select
                    value={editedProfile.year}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, year: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Freshman (1st Year)">Freshman (1st Year)</option>
                    <option value="Sophomore (2nd Year)">Sophomore (2nd Year)</option>
                    <option value="Junior (3rd Year)">Junior (3rd Year)</option>
                    <option value="Senior (4th Year)">Senior (4th Year)</option>
                    <option value="Graduate Student">Graduate Student</option>
                  </select>
                ) : (
                  <span className="text-gray-900">{profile.year}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.gpa}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, gpa: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                ) : (
                  <span className="text-gray-900">{profile.gpa}</span>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Skills and Interests */}
        <motion.div variants={itemVariants} className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile.skills : profile.skills).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
                  >
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 text-primary-500 hover:text-primary-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <Button size="sm" onClick={addSkill}>
                    Add
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile.interests : profile.interests).map((interest, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                  >
                    <span>{interest}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeInterest(interest)}
                        className="ml-1 text-green-500 hover:text-green-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    placeholder="Add an interest"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <Button size="sm" onClick={addInterest}>
                    Add
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Role</span>
                <span className="font-medium text-gray-900 capitalize">{profile.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium text-gray-900">
                  {new Date(profile.joinDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Profile Completion</span>
                <span className="font-medium text-green-600">85%</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Image Upload Modal */}
      <Modal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        title="Update Profile Picture"
        maxWidth="max-w-md"
        footer={
          <div className="flex space-x-3 justify-end">
            <Button variant="secondary" onClick={() => setShowImageModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowImageModal(false)}>
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
            <Button variant="secondary">
              Choose File
            </Button>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Upload a square image for best results. Maximum file size: 5MB
          </p>
        </div>
      </Modal>
    </motion.div>
  )
}

export default Profile