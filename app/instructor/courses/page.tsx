'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useEffect } from 'react';

export default function InstructorCourses() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'INSTRUCTOR')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user || user.role !== 'INSTRUCTOR') return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
        </div>
        <div className="px-8 py-8">
          <div className="bg-white rounded-xl p-8 shadow-md text-center">
            <p className="text-gray-600">Manage your courses here. Go to Dashboard to create or edit courses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
