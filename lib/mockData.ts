// Mock users
export const mockUsers = {
  student: {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@test.com',
    role: 'STUDENT' as const,
  },
  instructor: {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@test.com',
    role: 'INSTRUCTOR' as const,
  },
};

// Mock courses
export const mockCourses = [
  {
    id: '1',
    title: 'Advanced Java Programming',
    description: 'Master advanced Java concepts including concurrency, design patterns, and performance optimization.',
    price: 49.99,
    instructorId: '2',
    instructorName: 'Bob Smith',
    thumbnail: '/images/java-course.jpg',
    level: 'Advanced',
    duration: '12 weeks',
  },
  {
    id: '2',
    title: 'React Masterclass',
    description: 'Learn React from basics to advanced patterns. Build production-ready applications with modern React.',
    price: 39.99,
    instructorId: '2',
    instructorName: 'Bob Smith',
    thumbnail: '/images/react-course.jpg',
    level: 'Intermediate',
    duration: '8 weeks',
  },
  {
    id: '3',
    title: 'Web Design Fundamentals',
    description: 'Create beautiful, responsive websites using HTML, CSS, and modern design principles.',
    price: 29.99,
    instructorId: '2',
    instructorName: 'Bob Smith',
    thumbnail: '/images/design-course.jpg',
    level: 'Beginner',
    duration: '6 weeks',
  },
  {
    id: '4',
    title: 'Node.js & Express API Development',
    description: 'Build scalable backend services with Node.js and Express. Learn REST APIs, databases, and deployment.',
    price: 44.99,
    instructorId: '2',
    instructorName: 'Bob Smith',
    thumbnail: '/images/nodejs-course.jpg',
    level: 'Intermediate',
    duration: '10 weeks',
  },
];

// Mock modules with rich lesson data
export const mockModules = {
  '1': [ // Advanced Java Programming
    {
      id: '1-1',
      title: 'Module 1: Concurrency Basics',
      lessons: [
        { id: '1-1-1', title: 'Introduction to Threads', duration: 15, completed: true },
        { id: '1-1-2', title: 'Thread Lifecycle', duration: 20, completed: true },
        { id: '1-1-3', title: 'Synchronization Fundamentals', duration: 25, completed: false },
      ],
    },
    {
      id: '1-2',
      title: 'Module 2: Advanced Concurrency',
      lessons: [
        { id: '1-2-1', title: 'Locks and Conditions', duration: 30, completed: false },
        { id: '1-2-2', title: 'Thread Pools and Executors', duration: 25, completed: false },
        { id: '1-2-3', title: 'Atomic Operations', duration: 20, completed: false },
      ],
    },
    {
      id: '1-3',
      title: 'Module 3: Design Patterns',
      lessons: [
        { id: '1-3-1', title: 'Singleton Pattern', duration: 15, completed: false },
        { id: '1-3-2', title: 'Factory Pattern', duration: 18, completed: false },
        { id: '1-3-3', title: 'Observer Pattern', duration: 22, completed: false },
      ],
    },
  ],
  '2': [ // React Masterclass
    {
      id: '2-1',
      title: 'Module 1: React Fundamentals',
      lessons: [
        { id: '2-1-1', title: 'Introduction to React', duration: 20, completed: true },
        { id: '2-1-2', title: 'JSX and Components', duration: 25, completed: true },
        { id: '2-1-3', title: 'Props and State', duration: 30, completed: true },
      ],
    },
    {
      id: '2-2',
      title: 'Module 2: Hooks and Effects',
      lessons: [
        { id: '2-2-1', title: 'useState Hook', duration: 20, completed: true },
        { id: '2-2-2', title: 'useEffect Hook', duration: 25, completed: false },
        { id: '2-2-3', title: 'Custom Hooks', duration: 30, completed: false },
      ],
    },
  ],
  '3': [], // Web Design Fundamentals
  '4': [], // Node.js & Express
};

// Mock enrollments - tracks which student is enrolled in which course and progress
export const mockEnrollments = {
  '1': [ // Alice (student) is enrolled in:
    {
      courseId: '1',
      enrolledAt: '2024-01-15',
      progressPercentage: 45, // 3 out of 9 lessons completed
      lastAccessed: '2024-03-10',
    },
    {
      courseId: '2',
      enrolledAt: '2024-02-01',
      progressPercentage: 67, // 4 out of 6 lessons completed
      lastAccessed: '2024-03-09',
    },
  ],
};

// Mock instructor courses (courses created by instructor)
export const mockInstructorCourses = {
  '2': ['1', '2', '3', '4'], // Bob created all 4 courses
};

// Mock revenue data
export const mockInstructorStats = {
  '2': {
    totalStudents: 156,
    activeCourses: 4,
    totalRevenue: 4234.50,
  },
};
