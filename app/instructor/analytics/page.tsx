'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useEffect } from 'react';

export default function InstructorAnalytics() {
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
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        </div>
        <div className="px-8 py-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Engagement</h3>
              <div className="h-40 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Chart placeholder</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
              <div className="h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">Chart placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
