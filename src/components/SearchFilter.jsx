import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'

const SearchFilter = ({ 
  searchPlaceholder = 'Search...', 
  onSearch, 
  onFilter, 
  filters = [], 
  selectedFilters = [], 
  showFilters = true,
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch && onSearch(value)
  }

  const handleFilterToggle = (filterValue) => {
    const newFilters = selectedFilters.includes(filterValue)
      ? selectedFilters.filter(f => f !== filterValue)
      : [...selectedFilters, filterValue]
    
    onFilter && onFilter(newFilters)
  }

  const clearFilters = () => {
    onFilter && onFilter([])
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm"
        />
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-all duration-200 ${
              isFilterOpen || selectedFilters.length > 0
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            {selectedFilters.length > 0 && (
              <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.25rem] h-5 flex items-center justify-center">
                {selectedFilters.length}
              </span>
            )}
          </motion.button>

          {/* Active Filter Tags */}
          <AnimatePresence>
            {selectedFilters.map((filter) => (
              <motion.div
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center space-x-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{filter}</span>
                <button
                  onClick={() => handleFilterToggle(filter)}
                  className="text-primary-600 hover:text-primary-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Clear All Filters */}
          {selectedFilters.length > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </motion.button>
          )}
        </div>
      )}

      {/* Filter Dropdown */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-4"
          >
            <h3 className="font-medium text-gray-900 mb-3">Filter Options</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filters.map((filter) => (
                <label
                  key={filter.value}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(filter.value)}
                    onChange={() => handleFilterToggle(filter.value)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{filter.label}</span>
                  {filter.count && (
                    <span className="text-xs text-gray-500">({filter.count})</span>
                  )}
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchFilter