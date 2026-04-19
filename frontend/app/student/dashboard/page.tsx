'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import CourseCard from '@/components/CourseCard';
import { mockCourses, mockEnrollments } from '@/lib/mockData';
import { useEffect } from 'react';

export default function StudentDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'STUDENT')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user || user.role !== 'STUDENT') {
    return null;
  }

  // Get enrolled courses with progress
  const enrolledCourseIds = mockEnrollments[user.id as keyof typeof mockEnrollments] || [];
  const enrolledCoursesData = enrolledCourseIds.map((enrollment) => {
    const course = mockCourses.find((c) => c.id === enrollment.courseId);
    return {
      ...course,
      progressPercentage: enrollment.progressPercentage,
    };
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
          <p className="text-gray-600 mt-1">Continue where you left off and explore new courses</p>
        </div>

        {/* Content Area */}
        <div className="px-8 py-8">
          {/* Enrolled Courses */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">My Courses</h2>
              <p className="text-gray-600 text-sm">You&apos;re enrolled in {enrolledCoursesData.length} course{enrolledCoursesData.length !== 1 ? 's' : ''}</p>
            </div>

            {enrolledCoursesData.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCoursesData.map((course) => (
                  <CourseCard
                    key={course.id}
                    courseId={course.id}
                    title={course.title}
                    description={course.description}
                    instructorName={course.instructorName}
                    price={course.price}
                    progressPercentage={course.progressPercentage}
                    level={course.level}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center shadow-md">
                <p className="text-gray-600 mb-4">You haven&apos;t enrolled in any courses yet.</p>
                <a
                  href="/"
                  className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Browse Courses
                </a>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-indigo-600">
              <p className="text-gray-600 text-sm font-medium">Total Hours Learned</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {enrolledCoursesData.reduce((total, course) => total + (course.progressPercentage || 0), 0) / 25}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
              <p className="text-gray-600 text-sm font-medium">Courses Completed</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {enrolledCoursesData.filter((c) => (c.progressPercentage || 0) === 100).length}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
              <p className="text-gray-600 text-sm font-medium">Average Progress</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {enrolledCoursesData.length > 0
                  ? Math.round(
                      enrolledCoursesData.reduce((total, course) => total + (course.progressPercentage || 0), 0) /
                        enrolledCoursesData.length
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
