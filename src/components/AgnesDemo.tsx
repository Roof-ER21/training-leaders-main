import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AgnesAvatar from './AgnesAvatar';
import AgnesScrollTrigger, { AgnesTriggerPoint } from './AgnesScrollTrigger';
import AgnesChat from './AgnesChat';
import {
  BookOpen,
  Shield,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
} from 'lucide-react';

/**
 * Demo page showcasing Agnes capabilities and integration patterns
 */
const AgnesDemo: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState<any>(null);
  const [demoVariant, setDemoVariant] = useState<'full' | 'compact' | 'mini'>(
    'full'
  );
  const [demoPosition, setDemoPosition] = useState<
    'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  >('bottom-right');
  const [showStandaloneAgnes, setShowStandaloneAgnes] = useState(false);

  const handleTrigger = (trigger: any) => {
    setActiveTrigger(trigger);
    console.log('Trigger activated:', trigger);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Agnes AI Demo
              </h1>
              <p className="text-gray-600">
                Interactive demonstration of Agnes chatbot capabilities
              </p>
            </div>
            <button
              onClick={() => setShowChat(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Open Agnes Chat
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Agnes Controls
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Variant Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variant
              </label>
              <select
                value={demoVariant}
                onChange={e => setDemoVariant(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="full">Full (with message card)</option>
                <option value="compact">Compact (smaller)</option>
                <option value="mini">Mini (avatar only)</option>
              </select>
            </div>

            {/* Position Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                value={demoPosition}
                onChange={e => setDemoPosition(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>

            {/* Show/Hide Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Standalone Agnes
              </label>
              <button
                onClick={() => setShowStandaloneAgnes(!showStandaloneAgnes)}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  showStandaloneAgnes
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {showStandaloneAgnes ? 'Hide Agnes' : 'Show Agnes'}
              </button>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200">
            <Zap className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Scroll Triggers
            </h3>
            <p className="text-gray-600 text-sm">
              Agnes appears automatically when you scroll to important sections
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200">
            <Target className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Idle Detection
            </h3>
            <p className="text-gray-600 text-sm">
              If you stop scrolling for 10+ seconds, Agnes offers help
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200">
            <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Smart Guidance
            </h3>
            <p className="text-gray-600 text-sm">
              Context-aware tips and suggestions based on lesson progress
            </p>
          </div>
        </div>

        {/* Trigger Point 1: Introduction */}
        <AgnesTriggerPoint
          triggerId="demo-intro"
          message="Welcome to the Agnes Demo! I'll appear at key points as you scroll."
          tip="Scroll down slowly to see how I trigger at different sections."
          suggestedAction="Continue Exploring"
          onTrigger={handleTrigger}
          threshold={0.5}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Section 1: Introduction to Roofing Safety
              </h2>
            </div>
            <div className="prose prose-purple max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Safety is the cornerstone of every roofing operation. Before
                stepping onto any roof, you must understand and implement proper
                safety protocols to protect yourself and your team.
              </p>
              <p className="text-gray-700 leading-relaxed">
                In this section, we'll cover essential safety equipment,
                fall protection systems, and OSHA requirements that every
                roofer must know.
              </p>
            </div>
          </motion.div>
        </AgnesTriggerPoint>

        {/* Content Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Essential Safety Equipment
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Shield className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-semibold text-gray-900 mb-2">
                Fall Protection
              </h4>
              <p className="text-gray-700 text-sm">
                Full-body harness, anchor points, and lifelines are mandatory
                for work above 6 feet.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-semibold text-gray-900 mb-2">
                Personal Protective Equipment
              </h4>
              <p className="text-gray-700 text-sm">
                Hard hat, safety glasses, gloves, and non-slip footwear are
                required at all times.
              </p>
            </div>
          </div>
        </div>

        {/* Trigger Point 2: Important Warning */}
        <AgnesTriggerPoint
          triggerId="demo-warning"
          message="⚠️ This is a critical safety warning section!"
          tip="Never skip safety protocols - your life depends on it."
          suggestedAction="Review Safety Video"
          onTrigger={handleTrigger}
          threshold={0.4}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg border-2 border-red-300 mb-8"
          >
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-12 h-12 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-3">
                  Critical Safety Warning
                </h3>
                <p className="text-red-800 leading-relaxed mb-4">
                  Falls are the leading cause of fatalities in roofing. Every
                  year, dozens of roofers lose their lives due to inadequate
                  fall protection.
                </p>
                <ul className="space-y-2 text-red-800">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-red-600" />
                    Always inspect equipment before use
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-red-600" />
                    Never work alone on a roof
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-red-600" />
                    Be aware of weather conditions
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </AgnesTriggerPoint>

        {/* More Content */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            OSHA Requirements
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Occupational Safety and Health Administration (OSHA) has
            specific requirements for roofing work. Understanding and complying
            with these regulations is not just required by law - it's essential
            for your safety.
          </p>
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-800">
                <strong>29 CFR 1926.501:</strong> Fall protection requirements
                for work on roofs
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-800">
                <strong>29 CFR 1926.502:</strong> Fall protection systems
                criteria and practices
              </p>
            </div>
          </div>
        </div>

        {/* Trigger Point 3: Completion */}
        <AgnesTriggerPoint
          triggerId="demo-completion"
          message="Great job! You've reached the end of this demo section."
          tip="Try scrolling back up, or explore other features!"
          suggestedAction="Continue Learning"
          onTrigger={handleTrigger}
          threshold={0.3}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg border border-green-300 mb-8"
          >
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Demo Section Complete!
              </h3>
              <p className="text-gray-700 mb-6">
                You've seen how Agnes appears at key points during lessons.
                She'll guide you through your training journey with helpful
                tips and suggestions.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowChat(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Chat with Agnes
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Scroll to Top
                </button>
              </div>
            </div>
          </motion.div>
        </AgnesTriggerPoint>

        {/* Feature Explanation */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How Agnes Works
          </h3>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Scroll Triggers:</strong> Agnes appears when you scroll
              to specific sections marked with trigger points.
            </p>
            <p>
              <strong>Idle Detection:</strong> If you stop interacting with the
              page for 10+ seconds, Agnes offers help.
            </p>
            <p>
              <strong>Percentage Triggers:</strong> Agnes appears at 25%, 50%,
              and 75% scroll progress.
            </p>
            <p>
              <strong>Smart Dismissal:</strong> Once dismissed, Agnes won't
              reappear for the same trigger point during this session.
            </p>
          </div>
        </div>
      </div>

      {/* Standalone Agnes (controlled by demo controls) */}
      {showStandaloneAgnes && (
        <AgnesAvatar
          isVisible={true}
          message="I'm a standalone Agnes avatar! Try different variants and positions using the controls above."
          tip="You can customize my appearance, position, and behavior."
          suggestedAction="Explore Features"
          onClose={() => setShowStandaloneAgnes(false)}
          onChatClick={() => setShowChat(true)}
          position={demoPosition}
          variant={demoVariant}
        />
      )}

      {/* Agnes Scroll Trigger System */}
      <AgnesScrollTrigger
        onChatOpen={() => setShowChat(true)}
        enableIdleTrigger={true}
        idleTimeMs={10000}
        enablePercentageTrigger={true}
        percentageTriggers={[
          {
            percentage: 25,
            message: "You're making good progress through the demo!",
            tip: 'Keep scrolling to see more trigger points.',
          },
          {
            percentage: 50,
            message: "Halfway through! You're doing great!",
            tip: 'Notice how I appear at strategic moments.',
          },
          {
            percentage: 75,
            message: 'Almost at the end! Great job exploring!',
            tip: "Don't forget to try the chat feature.",
          },
        ]}
      />

      {/* Agnes Chat Modal */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowChat(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-4xl h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            <AgnesChat
              currentModule="demo"
              currentLesson="Agnes Demo"
              onModuleRecommendation={module =>
                console.log('Recommended:', module)
              }
              onVRDemoRequest={() => console.log('VR Demo requested')}
              className="h-full"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AgnesDemo;
