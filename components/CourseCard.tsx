import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface CourseCardProps {
  courseId: string;
  title: string;
  description: string;
  instructorName: string;
  price: number;
  thumbnail?: string;
  progressPercentage?: number;
  level?: string;
}

export default function CourseCard({
  courseId,
  title,
  description,
  instructorName,
  price,
  thumbnail,
  progressPercentage,
  level,
}: CourseCardProps) {
  return (
    <Link href={`/course/${courseId}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Thumbnail */}
        <div className="w-full h-40 bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-3xl">
          {thumbnail ? thumbnail : '🎓'}
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{title}</h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          {/* Level Badge */}
          {level && (
            <div className="inline-block">
              <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                {level}
              </span>
            </div>
          )}

          {/* Instructor */}
          <p className="text-sm text-gray-600">by {instructorName}</p>

          {/* Progress Bar */}
          {progressPercentage !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Price */}
          <div className="pt-2 border-t border-gray-200">
            <p className="font-bold text-indigo-600">${price.toFixed(2)}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
