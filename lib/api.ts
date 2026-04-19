import axios from 'axios';

// Create an Axios instance pointing to the backend API
// Ready to swap out mock data for real API calls
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Courses API
export const coursesApi = {
  getAll: () => apiClient.get('/courses'),
  getById: (id: string) => apiClient.get(`/courses/${id}`),
  create: (courseData: any) => apiClient.post('/courses', courseData),
  update: (id: string, courseData: any) => apiClient.put(`/courses/${id}`, courseData),
  delete: (id: string) => apiClient.delete(`/courses/${id}`),
};

// Enrollments API
export const enrollmentsApi = {
  getStudentEnrollments: (studentId: string) => apiClient.get(`/students/${studentId}/enrollments`),
  enroll: (studentId: string, courseId: string) => apiClient.post(`/students/${studentId}/enrollments`, { courseId }),
  updateProgress: (enrollmentId: string, progressData: any) => apiClient.put(`/enrollments/${enrollmentId}`, progressData),
};

// Users API
export const usersApi = {
  getUser: (id: string) => apiClient.get(`/users/${id}`),
  login: (email: string, password: string) => apiClient.post('/auth/login', { email, password }),
  register: (userData: any) => apiClient.post('/auth/register', userData),
};

// Instructor API
export const instructorApi = {
  getStats: (instructorId: string) => apiClient.get(`/instructors/${instructorId}/stats`),
  getCourses: (instructorId: string) => apiClient.get(`/instructors/${instructorId}/courses`),
  deleteCourse: (courseId: string) => apiClient.delete(`/courses/${courseId}`),
};

// Modules API
export const modulesApi = {
  getByCourseId: (courseId: string) => apiClient.get(`/courses/${courseId}/modules`),
  getById: (id: string) => apiClient.get(`/modules/${id}`),
};

export default apiClient;
