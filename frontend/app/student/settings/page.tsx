'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useEffect } from 'react';

export default function StudentSettings() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'STUDENT')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user || user.role !== 'STUDENT') return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 px-8 py-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
        <div className="px-8 py-8">
          <div className="max-w-2xl bg-white rounded-xl p-8 shadow-md">
            <p className="text-gray-600 mb-6">Manage your profile and preferences</p>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">Additional settings coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
