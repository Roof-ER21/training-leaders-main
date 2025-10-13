import React, { useState } from 'react';
import InteractiveLearningActivity from '../components/InteractiveLearningActivity';
import {
  roofingTermsMatching,
  companyValuesMatching,
  damageTypesMatching,
  salesCycleMatching,
  objectionResponseMatching,
  commissionTiersMatching,
  allSampleMatchingActivities
} from '../data/sampleMatchingActivities';

/**
 * Matching Game Demo Page
 *
 * This page demonstrates all the matching game activities
 * Use this for testing and showcasing the matching game functionality
 */

const MatchingGameDemo: React.FC = () => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  const currentActivity = allSampleMatchingActivities[currentActivityIndex];

  const handleComplete = (score: number, totalPoints: number) => {
    console.log(`Activity ${currentActivity.id} completed: ${score}/${totalPoints} points`);
    setCompletedActivities(prev => {
      const next = new Set(Array.from(prev));
      next.add(currentActivity.id);
      return next;
    });
  };

  const handleNext = () => {
    if (currentActivityIndex < allSampleMatchingActivities.length - 1) {
      setCurrentActivityIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex(prev => prev - 1);
    }
  };

  const handleSelectActivity = (index: number) => {
    setCurrentActivityIndex(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Matching Game Demo
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive matching activities for Training Leaders
          </p>
        </div>
      </div>

      {/* Activity Selector */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allSampleMatchingActivities.map((activity, index) => {
              const isActive = index === currentActivityIndex;
              const isCompleted = completedActivities.has(activity.id);

              return (
                <button
                  key={activity.id}
                  onClick={() => handleSelectActivity(index)}
                  className={`
                    p-4 rounded-lg border-2 text-left transition-all duration-200
                    ${isActive
                      ? 'bg-gray-50 border-gray-300 shadow-md'
                      : isCompleted
                        ? 'bg-gray-50 border-green-300 hover:border-green-500'
                        : 'bg-white border-gray-200 hover:border-purple-300'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        isActive ? 'text-gray-900' : isCompleted ? 'text-green-900' : 'text-gray-900'
                      }`}>
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {activity.data.pairs.length} pairs • {activity.points} pts
                      </p>
                    </div>
                    {isCompleted && (
                      <div className="ml-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Activity */}
        <InteractiveLearningActivity
          activity={currentActivity}
          onComplete={handleComplete}
          onRetry={() => {
            setCompletedActivities(prev => {
              const newSet = new Set(prev);
              newSet.delete(currentActivity.id);
              return newSet;
            });
          }}
        />

        {/* Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentActivityIndex === 0}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous Activity
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Activity {currentActivityIndex + 1} of {allSampleMatchingActivities.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {completedActivities.size} completed
            </p>
          </div>

          <button
            onClick={handleNext}
            disabled={currentActivityIndex === allSampleMatchingActivities.length - 1}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next Activity
          </button>
        </div>

        {/* Info Panel */}
        <div className="mt-6 bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Play</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click on an item from the left column to select it</li>
            <li>Then click on its matching pair from the right column</li>
            <li>Correct matches will lock in place with green highlighting</li>
            <li>Incorrect matches will shake and flash red</li>
            <li>Complete all matches to submit your score!</li>
          </ol>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Automatic shuffling of right column for variety</li>
              <li>Smart hints after multiple incorrect attempts</li>
              <li>Progress tracking with visual progress bar</li>
              <li>Celebration animation when all pairs matched</li>
              <li>Detailed results summary after submission</li>
              <li>Mobile-responsive design</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingGameDemo;
