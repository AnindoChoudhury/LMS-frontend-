'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { mockCourses } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, BookOpen, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  // Show only featured courses on landing page
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-balance">
                Learn From Industry Experts
              </h1>
              <p className="text-xl text-gray-600 text-balance">
                Access world-class courses on programming, design, and business. Learn at your own pace with video lessons and interactive modules.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <>
                    <Link href={user.role === 'STUDENT' ? '/student/dashboard' : '/instructor/dashboard'}>
                      <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                        Go to Dashboard
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/register">
                      <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                        Start Learning
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button size="lg" variant="outline">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl p-8 text-white flex items-center justify-center h-96">
              <div className="text-center">
                <BookOpen size={80} className="mx-auto mb-4 opacity-80" />
                <p className="text-lg font-semibold">Premium Online Courses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-3xl font-bold">
                <span>500+</span>
              </div>
              <p className="text-indigo-100">Courses Available</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-3xl font-bold">
                <span>50K+</span>
              </div>
              <p className="text-indigo-100">Active Learners</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-3xl font-bold">
                <span>100+</span>
              </div>
              <p className="text-indigo-100">Expert Instructors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
          <p className="text-lg text-gray-600">Explore our most popular courses</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.id}
              courseId={course.id}
              title={course.title}
              description={course.description}
              instructorName={course.instructorName}
              price={course.price}
              level={course.level}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="outline" size="lg">
              Browse All Courses
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Why Learn with EduHub?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-indigo-100 rounded-lg p-4 inline-block">
                <BookOpen size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Learn Your Way</h3>
              <p className="text-gray-600">Study at your own pace with lifetime access to course materials.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-indigo-100 rounded-lg p-4 inline-block">
                <Users size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with real-world experience.</p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-indigo-100 rounded-lg p-4 inline-block">
                <TrendingUp size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Track Progress</h3>
              <p className="text-gray-600">Monitor your learning with detailed progress tracking and certificates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 EduHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
