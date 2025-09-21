import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Search, Image, File } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const chats = [
    {
      id: 1,
      type: 'mentor',
      participant: {
        name: 'Dr. Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        company: 'Google AI',
        status: 'online'
      },
      lastMessage: {
        text: 'Great! I\'ll review your project proposal and get back to you with feedback.',
        timestamp: '2025-09-20T15:30:00Z',
        isOwn: false
      },
      unreadCount: 2,
      session: {
        date: '2025-09-23',
        time: '2:00 PM'
      }
    },
    {
      id: 2,
      type: 'mentor',
      participant: {
        name: 'Prof. Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        company: 'Stanford University',
        status: 'away'
      },
      lastMessage: {
        text: 'Thanks for sending the resume. I have some suggestions for improvement.',
        timestamp: '2025-09-20T10:15:00Z',
        isOwn: false
      },
      unreadCount: 0
    },
    {
      id: 3,
      type: 'student',
      participant: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        company: 'Computer Science Student',
        status: 'online'
      },
      lastMessage: {
        text: 'Hey! Did you check out that React tutorial I mentioned?',
        timestamp: '2025-09-19T18:45:00Z',
        isOwn: true
      },
      unreadCount: 1
    }
  ]

  const messages = [
    {
      id: 1,
      text: 'Hi Dr. Wilson! Thank you for accepting my mentoring request.',
      timestamp: '2025-09-20T14:00:00Z',
      isOwn: true,
      type: 'text'
    },
    {
      id: 2,
      text: 'Hello! I\'m excited to work with you. I\'ve reviewed your background and I think we can make great progress together.',
      timestamp: '2025-09-20T14:05:00Z',
      isOwn: false,
      type: 'text'
    },
    {
      id: 3,
      text: 'I\'ve been working on a machine learning project for my final year. Could you help me review the approach?',
      timestamp: '2025-09-20T14:10:00Z',
      isOwn: true,
      type: 'text'
    },
    {
      id: 4,
      text: 'Absolutely! Please share your project proposal and any code you\'ve written so far.',
      timestamp: '2025-09-20T14:12:00Z',
      isOwn: false,
      type: 'text'
    },
    {
      id: 5,
      text: 'Here\'s my project proposal document',
      timestamp: '2025-09-20T14:15:00Z',
      isOwn: true,
      type: 'file',
      file: {
        name: 'ML_Project_Proposal.pdf',
        size: '2.4 MB',
        type: 'pdf'
      }
    },
    {
      id: 6,
      text: 'Great! I\'ll review your project proposal and get back to you with feedback.',
      timestamp: '2025-09-20T15:30:00Z',
      isOwn: false,
      type: 'text'
    }
  ]

  const emojis = ['😊', '👍', '❤️', '😂', '🎉', '👏', '🙏', '💡']

  useEffect(() => {
    if (chats.length > 0 && !selectedChat) {
      setSelectedChat(chats[0])
    }
  }, [chats, selectedChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log('Uploading file:', file.name)
    }
  }

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const filteredChats = chats.filter(chat =>
    chat.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      className="h-[calc(100vh-120px)] flex"
    >
      {/* Chat List Sidebar */}
      <motion.div variants={itemVariants} className="w-80 border-r border-gray-200 flex flex-col">
        <Card className="flex-shrink-0 border-b border-gray-200 rounded-none" padding="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </Card>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: '#f9fafb' }}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedChat?.id === chat.id ? 'bg-primary-50 border-primary-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.participant.avatar}
                    alt={chat.participant.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(chat.participant.status)}`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.participant.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(chat.lastMessage.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-1">{chat.participant.company}</p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate flex-1">
                      {chat.lastMessage.isOwn ? 'You: ' : ''}
                      {chat.lastMessage.text}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="ml-2 bg-primary-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Session Info */}
                  {chat.session && (
                    <div className="mt-2 text-xs text-primary-600 bg-primary-50 rounded px-2 py-1">
                      Session: {chat.session.date} at {chat.session.time}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <motion.div variants={itemVariants}>
              <Card className="flex-shrink-0 border-b border-gray-200 rounded-none" padding="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedChat.participant.avatar}
                        alt={selectedChat.participant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(selectedChat.participant.status)}`}></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedChat.participant.name}</h3>
                      <p className="text-sm text-gray-600">{selectedChat.participant.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'order-2' : 'order-1'}`}>
                      {!msg.isOwn && (
                        <div className="flex items-center space-x-2 mb-1">
                          <img
                            src={selectedChat.participant.avatar}
                            alt={selectedChat.participant.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs text-gray-600">{selectedChat.participant.name}</span>
                        </div>
                      )}
                      
                      <div className={`rounded-lg px-4 py-2 ${
                        msg.isOwn
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {msg.type === 'text' ? (
                          <p className="text-sm">{msg.text}</p>
                        ) : msg.type === 'file' ? (
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <File className="w-8 h-8 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{msg.file.name}</p>
                              <p className="text-xs opacity-75">{msg.file.size}</p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      
                      <div className={`mt-1 text-xs text-gray-500 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <motion.div variants={itemVariants}>
              <Card className="flex-shrink-0 border-t border-gray-200 rounded-none" padding="p-4">
                <div className="flex items-end space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      style={{ minHeight: '40px', maxHeight: '120px' }}
                    />
                    
                    {/* Emoji and Attachment Buttons */}
                    <div className="absolute right-2 top-2 flex items-center space-x-1">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                      >
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                      >
                        <Smile className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                      <div className="absolute bottom-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 grid grid-cols-4 gap-1">
                        {emojis.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => addEmoji(emoji)}
                            className="p-2 hover:bg-gray-100 rounded text-lg"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    icon={Send}
                    className="flex-shrink-0"
                  >
                    Send
                  </Button>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
              </Card>
            </motion.div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Chat