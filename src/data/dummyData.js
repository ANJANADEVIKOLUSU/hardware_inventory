export const dummyResources = [
  {
    id: '1',
    name: 'MacBook Pro 16" M3',
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    availability: 'available',
    location: 'Tech Lab - Room 201',
    description: 'High-performance laptop with M3 chip, perfect for development and design work.',
    specs: ['16GB RAM', '512GB SSD', 'M3 Pro Chip'],
    borrowedBy: null,
    dueDate: null
  },
  {
    id: '2',
    name: 'Canon EOS R5 Camera',
    category: 'Camera',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    availability: 'borrowed',
    location: 'Media Lab - Room 105',
    description: 'Professional mirrorless camera for photography and videography projects.',
    specs: ['45MP Sensor', '8K Video', 'IS Stabilization'],
    borrowedBy: 'Alex Johnson',
    dueDate: '2025-09-25'
  },
  {
    id: '3',
    name: 'Arduino Uno R3 Kit',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop',
    availability: 'available',
    location: 'Electronics Lab - Room 301',
    description: 'Complete Arduino starter kit with sensors and components.',
    specs: ['Microcontroller Board', '20+ Sensors', 'Breadboard & Cables'],
    borrowedBy: null,
    dueDate: null
  },
  {
    id: '4',
    name: 'React Design Patterns Book',
    category: 'Book',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    availability: 'available',
    location: 'Library - Section A2',
    description: 'Comprehensive guide to React design patterns and best practices.',
    specs: ['480 Pages', 'Latest Edition', 'Code Examples'],
    borrowedBy: null,
    dueDate: null
  },
  {
    id: '5',
    name: 'iPad Pro 12.9" with Apple Pencil',
    category: 'Tablet',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    availability: 'overdue',
    location: 'Design Lab - Room 102',
    description: 'Professional tablet for digital art and design work.',
    specs: ['12.9" Display', 'Apple Pencil Gen 2', '256GB Storage'],
    borrowedBy: 'Sarah Williams',
    dueDate: '2025-09-18'
  },
  {
    id: '6',
    name: '3D Printer - Prusa i3 MK3S+',
    category: 'Equipment',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=300&fit=crop',
    availability: 'reserved',
    location: 'Maker Space - Room 401',
    description: 'High-quality 3D printer for prototyping and projects.',
    specs: ['210×210×210mm Build', 'PLA/PETG Compatible', 'Auto Bed Leveling'],
    borrowedBy: null,
    dueDate: null,
    reservedBy: 'Mike Chen',
    reservedUntil: '2025-09-23'
  }
]

export const dummyMentors = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    expertise: ['AI/ML', 'Data Science', 'Python'],
    experience: '8 years',
    rating: 4.9,
    reviewCount: 47,
    availability: 'available',
    bio: 'Machine Learning researcher with expertise in deep learning and computer vision. Published 25+ papers in top-tier conferences.',
    education: 'PhD Computer Science - Stanford University',
    company: 'Google Research',
    nextAvailable: '2025-09-22T14:00:00',
    hourlyRate: null,
    responseTime: '< 2 hours',
    languages: ['English', 'Spanish'],
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV']
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    expertise: ['Web Development', 'React', 'Node.js'],
    experience: '5 years',
    rating: 4.8,
    reviewCount: 32,
    availability: 'busy',
    bio: 'Full-stack developer passionate about modern web technologies and mentoring the next generation of developers.',
    education: 'MS Software Engineering - UC Berkeley',
    company: 'Meta',
    nextAvailable: '2025-09-25T10:00:00',
    hourlyRate: null,
    responseTime: '< 4 hours',
    languages: ['English', 'French'],
    skills: ['React', 'Node.js', 'GraphQL', 'AWS']
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    expertise: ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
    experience: '10 years',
    rating: 4.9,
    reviewCount: 28,
    availability: 'available',
    bio: 'Cybersecurity expert with extensive experience in penetration testing and security architecture.',
    education: 'PhD Cybersecurity - MIT',
    company: 'CyberSec Solutions',
    nextAvailable: '2025-09-22T16:00:00',
    hourlyRate: null,
    responseTime: '< 1 hour',
    languages: ['English', 'Mandarin'],
    skills: ['Penetration Testing', 'Security Architecture', 'Incident Response', 'Compliance']
  }
]

export const dummySessions = [
  {
    id: '1',
    mentorId: '1',
    mentorName: 'Dr. Sarah Wilson',
    mentorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to ML algorithms and practical applications',
    scheduledDate: '2025-09-22T14:00:00',
    duration: 60,
    status: 'confirmed',
    type: 'video',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    agenda: ['Overview of ML types', 'Linear regression basics', 'Q&A session'],
    notes: ''
  },
  {
    id: '2',
    mentorId: '2',
    mentorName: 'Alex Rodriguez',
    mentorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    title: 'React Best Practices',
    description: 'Advanced React patterns and performance optimization',
    scheduledDate: '2025-09-25T10:00:00',
    duration: 90,
    status: 'pending',
    type: 'video',
    meetingLink: null,
    agenda: ['Component composition', 'State management', 'Performance tips'],
    notes: ''
  },
  {
    id: '3',
    mentorId: '1',
    mentorName: 'Dr. Sarah Wilson',
    mentorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    title: 'Deep Learning Workshop',
    description: 'Hands-on neural network implementation',
    scheduledDate: '2025-09-18T15:00:00',
    duration: 120,
    status: 'completed',
    type: 'video',
    meetingLink: 'https://meet.google.com/xyz-uvwx-yzab',
    agenda: ['Neural network basics', 'TensorFlow implementation', 'Project discussion'],
    notes: 'Great session! Student showed excellent progress on the image classification project.'
  }
]

export const dummyChats = [
  {
    id: '1',
    participantId: '1',
    participantName: 'Dr. Sarah Wilson',
    participantAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Great question about neural networks! Let me send you some resources.',
    lastMessageTime: Date.now() - 1800000, // 30 minutes ago
    unreadCount: 2,
    type: 'mentor'
  },
  {
    id: '2',
    participantId: '2',
    participantName: 'Alex Rodriguez',
    participantAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'The React component we discussed is working perfectly now. Thanks!',
    lastMessageTime: Date.now() - 3600000, // 1 hour ago
    unreadCount: 0,
    type: 'mentor'
  },
  {
    id: '3',
    participantId: '3',
    participantName: 'Study Group - CS101',
    participantAvatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Don\'t forget about tomorrow\'s project presentation!',
    lastMessageTime: Date.now() - 7200000, // 2 hours ago
    unreadCount: 5,
    type: 'group'
  }
]

export const dummyMessages = {
  '1': [
    {
      id: '1',
      senderId: 'current-user',
      senderName: 'You',
      content: 'Hi Dr. Wilson! I have a question about the neural network assignment.',
      timestamp: Date.now() - 7200000,
      type: 'text'
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'Dr. Sarah Wilson',
      content: 'Hello! I\'d be happy to help. What specific part are you struggling with?',
      timestamp: Date.now() - 7000000,
      type: 'text'
    },
    {
      id: '3',
      senderId: 'current-user',
      senderName: 'You',
      content: 'I\'m having trouble understanding backpropagation. Could you explain it again?',
      timestamp: Date.now() - 6800000,
      type: 'text'
    },
    {
      id: '4',
      senderId: '1',
      senderName: 'Dr. Sarah Wilson',
      content: 'Great question about neural networks! Let me send you some resources.',
      timestamp: Date.now() - 1800000,
      type: 'text'
    }
  ]
}