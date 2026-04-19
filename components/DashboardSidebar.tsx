'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, BookOpen, Settings, LogOut, BarChart3 } from 'lucide-react';

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isStudent = user?.role === 'STUDENT';
  const baseRoute = isStudent ? '/student' : '/instructor';

  const studentLinks = [
    { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/student/my-courses', label: 'My Courses', icon: BookOpen },
    { href: '/student/settings', label: 'Settings', icon: Settings },
  ];

  const instructorLinks = [
    { href: '/instructor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/instructor/courses', label: 'Manage Courses', icon: BookOpen },
    { href: '/instructor/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/instructor/settings', label: 'Settings', icon: Settings },
  ];

  const links = isStudent ? studentLinks : instructorLinks;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col shadow-md">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            📚
          </div>
          <span className="font-bold text-lg text-indigo-600">EduHub</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="text-sm">
          <p className="font-semibold text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
          <p className="text-xs text-indigo-600 font-medium mt-1 capitalize">{user?.role.toLowerCase()}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <button
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === href
                  ? 'bg-indigo-100 text-indigo-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
