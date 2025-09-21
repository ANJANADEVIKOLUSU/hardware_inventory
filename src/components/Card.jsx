import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'p-6',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-2xl shadow-lg transition-all duration-300 ease-in-out'
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-105' : ''
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { scale: 1.05 } : {}}
      className={`${baseClasses} ${hoverClasses} ${padding} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card