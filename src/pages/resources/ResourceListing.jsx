import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Calendar, Eye } from 'lucide-react'
import { dummyResources } from '../../data/dummyData'
import Card from '../../components/Card'
import Button from '../../components/Button'

const ResourceListing = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAvailability, setSelectedAvailability] = useState('all')

  const categories = ['all', 'Laptop', 'Camera', 'Electronics', 'Book', 'Tablet', 'Equipment']
  const availabilityOptions = ['all', 'available', 'borrowed', 'overdue', 'reserved']

  const filteredResources = useMemo(() => {
    return dummyResources.filter(resource => {
      const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
      const matchesAvailability = selectedAvailability === 'all' || resource.availability === selectedAvailability

      return matchesSearch && matchesCategory && matchesAvailability
    })
  }, [searchTerm, selectedCategory, selectedAvailability])

  const getAvailabilityBadge = (availability) => {
    const badges = {
      available: 'bg-green-100 text-green-800',
      borrowed: 'bg-blue-100 text-blue-800',
      overdue: 'bg-red-100 text-red-800',
      reserved: 'bg-amber-100 text-amber-800'
    }
    return badges[availability] || 'bg-gray-100 text-gray-800'
  }

  const getAvailabilityIcon = (availability) => {
    if (availability === 'available') return '🟢'
    if (availability === 'borrowed') return '🔵'
    if (availability === 'overdue') return '🔴'
    if (availability === 'reserved') return '🟡'
    return '⚪'
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
            <h1 className="text-3xl font-bold text-gray-900">Resource Library</h1>
            <p className="text-gray-600 mt-2">Browse and borrow resources for your projects</p>
          </div>
          <div className="text-sm text-gray-500">
            {filteredResources.length} of {dummyResources.length} resources
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
                placeholder="Search resources by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-primary-100 text-primary-700 border border-primary-300'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                      }`}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Status:</span>
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
                      {availability === 'all' ? 'All Status' : availability}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Resource Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredResources.map((resource) => (
          <motion.div
            key={resource.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group"
          >
            <Card className="h-full hover:shadow-2xl transition-all duration-300">
              {/* Image */}
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={resource.image}
                  alt={resource.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAvailabilityBadge(resource.availability)}`}>
                    <span className="mr-1">{getAvailabilityIcon(resource.availability)}</span>
                    {resource.availability}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {resource.name}
                  </h3>
                  <p className="text-sm text-gray-600">{resource.category}</p>
                </div>

                <p className="text-sm text-gray-700 line-clamp-2">
                  {resource.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-1">
                  {resource.specs.slice(0, 2).map((spec, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                  {resource.specs.length > 2 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      +{resource.specs.length - 2} more
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{resource.location}</span>
                </div>

                {/* Borrowed Info */}
                {resource.borrowedBy && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {resource.availability === 'overdue' 
                        ? `Overdue since ${resource.dueDate}`
                        : `Due: ${resource.dueDate}`
                      }
                    </span>
                  </div>
                )}

                {/* Reserved Info */}
                {resource.reservedBy && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Reserved until {resource.reservedUntil}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" icon={Eye} className="flex-1">
                    View Details
                  </Button>
                  {resource.availability === 'available' && (
                    <Button size="sm" variant="success" className="flex-1">
                      Borrow
                    </Button>
                  )}
                  {resource.availability === 'borrowed' && resource.borrowedBy !== 'Current User' && (
                    <Button size="sm" variant="secondary" className="flex-1">
                      Reserve
                    </Button>
                  )}
                  {resource.availability === 'borrowed' && resource.borrowedBy === 'Current User' && (
                    <Button size="sm" variant="danger" className="flex-1">
                      Return
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredResources.length === 0 && (
        <motion.div variants={itemVariants}>
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="secondary" 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedAvailability('all')
              }}
            >
              Clear Filters
            </Button>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ResourceListing