import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AgnesScrollTrigger, { AgnesTriggerPoint } from './AgnesScrollTrigger';
import AgnesChat from './AgnesChat';
import { BookOpen, CheckCircle } from 'lucide-react';

interface LessonWithAgnesProps {
  moduleId: number;
  moduleName: string;
  lessonContent: React.ReactNode;
  onComplete?: () => void;
}

/**
 * Example component showing how to integrate Agnes into lesson content
 * with scroll-triggered appearances at key learning points
 */
const LessonWithAgnes: React.FC<LessonWithAgnesProps> = ({
  moduleId,
  moduleName,
  lessonContent,
  onComplete,
}) => {
  const [showAgnesChat, setShowAgnesChat] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState<any>(null);

  // Define trigger points for this lesson
  const triggerPoints = [
    {
      id: `module-${moduleId}-intro`,
      message: `Welcome to ${moduleName}! I'm here to guide you through this section.`,
      tip: 'Take your time and ask me anything as you go through the material.',
      suggestedAction: 'Start Learning',
    },
    {
      id: `module-${moduleId}-midpoint`,
      message: "Great progress! You're halfway through this module.",
      tip: 'Remember, practice makes perfect. Consider trying the VR simulation after this section.',
      suggestedAction: 'Continue',
    },
    {
      id: `module-${moduleId}-completion`,
      message: 'Excellent work completing this module!',
      tip: 'Ready to test your knowledge with a quick quiz?',
      suggestedAction: 'Take Quiz',
    },
  ];

  const handleTrigger = (trigger: any) => {
    setActiveTrigger(trigger);
  };

  const handleChatOpen = () => {
    setShowAgnesChat(true);
  };

  const handleActionClick = (triggerId: string) => {
    console.log('Action clicked for trigger:', triggerId);
    if (triggerId.includes('completion') && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Lesson Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">{moduleName}</h1>
          </div>
        </div>
      </div>

      {/* Lesson Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Introduction Section with Trigger */}
        <AgnesTriggerPoint
          triggerId={`module-${moduleId}-intro`}
          message={`Welcome to ${moduleName}! I'm here to guide you through this section.`}
          tip="Take your time and ask me anything as you go through the material."
          suggestedAction="Start Learning"
          onTrigger={handleTrigger}
          threshold={0.5}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Introduction
            </h2>
            <div className="prose prose-purple max-w-none">
              <p className="text-gray-700 leading-relaxed">
                In this module, you'll learn essential skills that will help you
                excel in your roofing career. Agnes will appear at key points to
                provide guidance and answer your questions.
              </p>
            </div>
          </motion.div>
        </AgnesTriggerPoint>

        {/* Main Lesson Content */}
        <div className="space-y-8">{lessonContent}</div>

        {/* Midpoint Section with Trigger */}
        <AgnesTriggerPoint
          triggerId={`module-${moduleId}-midpoint`}
          message="Great progress! You're halfway through this module."
          tip="Remember, practice makes perfect. Consider trying the VR simulation after this section."
          suggestedAction="Continue"
          onTrigger={handleTrigger}
          threshold={0.4}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200 my-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Checkpoint: You're Doing Great!
              </h3>
            </div>
            <p className="text-gray-700">
              You've covered a lot of material. Take a moment to review what
              you've learned, and feel free to ask Agnes any questions.
            </p>
          </motion.div>
        </AgnesTriggerPoint>

        {/* Completion Section with Trigger */}
        <AgnesTriggerPoint
          triggerId={`module-${moduleId}-completion`}
          message="Excellent work completing this module!"
          tip="Ready to test your knowledge with a quick quiz?"
          suggestedAction="Take Quiz"
          onTrigger={handleTrigger}
          threshold={0.3}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 mt-8"
          >
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Module Complete!
              </h3>
              <p className="text-gray-700 mb-6">
                You've successfully completed this module. Great job!
              </p>
              <button
                onClick={onComplete}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Continue to Next Module
              </button>
            </div>
          </motion.div>
        </AgnesTriggerPoint>
      </div>

      {/* Agnes Scroll Trigger System */}
      <AgnesScrollTrigger
        triggerPoints={triggerPoints}
        onChatOpen={handleChatOpen}
        onActionClick={handleActionClick}
        enableIdleTrigger={true}
        idleTimeMs={15000}
        enablePercentageTrigger={true}
        percentageTriggers={[
          {
            percentage: 25,
            message: "You're making good progress! Keep going!",
            tip: "Remember to take breaks if you need them.",
          },
          {
            percentage: 50,
            message: "Halfway there! You're doing great!",
            tip: "This is a good point to review what you've learned so far.",
          },
          {
            percentage: 75,
            message: "Almost done! You're doing fantastic!",
            tip: "Just a little more to go - stay focused!",
          },
        ]}
      />

      {/* Agnes Chat Modal */}
      {showAgnesChat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAgnesChat(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-4xl h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            <AgnesChat
              currentModule={`module${moduleId}`}
              currentLesson={moduleName}
              onModuleRecommendation={module => console.log('Recommended:', module)}
              onVRDemoRequest={() => console.log('VR Demo requested')}
              className="h-full"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LessonWithAgnes;
