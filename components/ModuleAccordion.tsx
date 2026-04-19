'use client';

import { useState } from 'react';
import { ChevronDown, Play, CheckCircle2 } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface ModuleAccordionProps {
  modules: Module[];
  onSelectLesson: (lessonId: string, moduleName: string) => void;
  selectedLessonId?: string;
}

export default function ModuleAccordion({
  modules,
  onSelectLesson,
  selectedLessonId,
}: ModuleAccordionProps) {
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(
    modules.length > 0 ? modules[0].id : null
  );

  return (
    <div className="space-y-2">
      {modules.map((module) => (
        <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Module Header */}
          <button
            onClick={() =>
              setExpandedModuleId(expandedModuleId === module.id ? null : module.id)
            }
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1">
              <ChevronDown
                size={20}
                className={`text-gray-600 transition-transform ${
                  expandedModuleId === module.id ? 'rotate-180' : ''
                }`}
              />
              <h3 className="font-semibold text-gray-900 text-left">{module.title}</h3>
            </div>
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
              {module.lessons.length} lessons
            </span>
          </button>

          {/* Lessons List */}
          {expandedModuleId === module.id && (
            <div className="divide-y divide-gray-200 bg-white">
              {module.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => onSelectLesson(lesson.id, module.title)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                    selectedLessonId === lesson.id
                      ? 'bg-indigo-50 border-l-4 border-indigo-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Lesson Icon */}
                  <div className="flex-shrink-0">
                    {lesson.completed ? (
                      <CheckCircle2 size={20} className="text-green-500" />
                    ) : (
                      <Play size={20} className="text-indigo-600" />
                    )}
                  </div>

                  {/* Lesson Info */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{lesson.title}</p>
                    <p className="text-xs text-gray-500">{lesson.duration} min</p>
                  </div>

                  {/* Completion Status */}
                  {lesson.completed && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                      Completed
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
