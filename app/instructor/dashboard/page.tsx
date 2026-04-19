'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockCourses, mockInstructorStats, mockInstructorCourses } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

interface CreateCourseFormData {
  title: string;
  description: string;
  price: string;
}

export default function InstructorDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<CreateCourseFormData>({
    title: '',
    description: '',
    price: '',
  });
  const [courses, setCourses] = useState<typeof mockCourses>([]);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'INSTRUCTOR')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Load instructor courses
  useEffect(() => {
    if (user?.id) {
      const instructorCourseIds = mockInstructorCourses[user.id as keyof typeof mockInstructorCourses] || [];
      const instructorCourses = mockCourses.filter((c) => instructorCourseIds.includes(c.id));
      setCourses(instructorCourses);
    }
  }, [user?.id]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user || user.role !== 'INSTRUCTOR') {
    return null;
  }

  const stats = mockInstructorStats[user.id as keyof typeof mockInstructorStats] || {
    totalStudents: 0,
    activeCourses: 0,
    totalRevenue: 0,
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    // Mock: Add new course (in real app, this would call API)
    const newCourse = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      instructorId: user.id,
      instructorName: user.name,
      thumbnail: '/images/new-course.jpg',
      level: 'Beginner',
      duration: '8 weeks',
    };

    setCourses([...courses, newCourse]);
    setFormData({ title: '', description: '', price: '' });
    setShowCreateModal(false);
    alert('Course created successfully!');
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((c) => c.id !== courseId));
      alert('Course deleted successfully!');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your courses and track student engagement</p>
        </div>

        {/* Content Area */}
        <div className="px-8 py-8">
          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 shadow-md border-l-4 border-indigo-600">
              <p className="text-gray-600 text-sm font-medium">Total Students</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalStudents}</p>
              <p className="text-xs text-gray-500 mt-2">Across all courses</p>
            </Card>

            <Card className="p-6 shadow-md border-l-4 border-green-600">
              <p className="text-gray-600 text-sm font-medium">Active Courses</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{stats.activeCourses}</p>
              <p className="text-xs text-gray-500 mt-2">Currently published</p>
            </Card>

            <Card className="p-6 shadow-md border-l-4 border-blue-600">
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">${stats.totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-2">From course sales</p>
            </Card>
          </div>

          {/* Courses Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Your Courses</h2>
                <p className="text-gray-600 text-sm mt-1">Manage and monitor your course offerings</p>
              </div>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Create Course</span>
              </Button>
            </div>

            {/* Courses Table */}
            {courses.length > 0 ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course Title</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Level</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-gray-900">{course.title}</p>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-1">{course.description}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-medium">
                              {course.level}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">${course.price.toFixed(2)}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-indigo-600">
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(course.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center shadow-md">
                <p className="text-gray-600 mb-4">You haven&apos;t created any courses yet.</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Create Your First Course
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Course</h2>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced React Patterns"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what students will learn..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="e.g., 49.99"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Create Course
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
