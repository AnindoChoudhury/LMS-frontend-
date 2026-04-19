'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ModuleAccordion from '@/components/ModuleAccordion';
import { mockCourses, mockModules } from '@/lib/mockData';
import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface SelectedLesson {
  lessonId: string;
  moduleName: string;
}

export default function CourseViewer() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id as string;

  const [selectedLesson, setSelectedLesson] = useState<SelectedLesson | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  // Get course data
  const course = mockCourses.find((c) => c.id === courseId);
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  // Get modules for this course
  const courseModules = mockModules[courseId] || [];

  const handleSelectLesson = (lessonId: string, moduleName: string) => {
    setSelectedLesson({ lessonId, moduleName });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-indigo-600 hover:text-indigo-700 font-medium mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600">Taught by {course.instructorName}</p>
        </div>

        {/* Main Course Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player and Content (Main Column) */}
          <div className="lg:col-span-2">
            {/* Video Player Placeholder */}
            <div className="bg-black rounded-xl overflow-hidden shadow-lg mb-8">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <Play size={64} className="text-white mx-auto mb-4" fill="white" />
                  <p className="text-white text-lg">
                    {selectedLesson ? `Playing: ${selectedLesson.lessonId}` : 'Select a lesson to start learning'}
                  </p>
                </div>
              </div>
            </div>

            {/* Lesson Details */}
            {selectedLesson && (
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLesson.lessonId}</h2>
                <p className="text-gray-600">Module: {selectedLesson.moduleName}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700">
                    This is a placeholder for the lesson content. In a real application, the video player would stream
                    the course video here, and additional resources would be available for download.
                  </p>
                </div>
              </div>
            )}

            {!selectedLesson && (
              <div className="bg-white rounded-xl p-12 text-center shadow-md">
                <Play size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a lesson from the right panel to start learning</p>
              </div>
            )}
          </div>

          {/* Course Modules Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Modules</h3>

              {courseModules.length > 0 ? (
                <ModuleAccordion
                  modules={courseModules}
                  onSelectLesson={handleSelectLesson}
                  selectedLessonId={selectedLesson?.lessonId}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No modules available yet</p>
                </div>
              )}
            </div>

            {/* Course Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-md mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Course Info</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Level</p>
                  <p className="font-medium text-gray-900">{course.level}</p>
                </div>
                <div>
                  <p className="text-gray-600">Duration</p>
                  <p className="font-medium text-gray-900">{course.duration}</p>
                </div>
                <div>
                  <p className="text-gray-600">Price</p>
                  <p className="font-bold text-indigo-600 text-lg">${course.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
