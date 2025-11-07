import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, ChevronRight, ChevronLeft, Award, Sparkles } from 'lucide-react';
import { usePoints } from '../../contexts/PointsContext';
import { useBadges } from '../../contexts/BadgeContext';

export interface MicroModuleContent {
  id: string;
  title: string;
  objective: string;
  estimatedTime: number; // in minutes (3-5)
  slides: MicroSlide[];
  quickWin?: {
    title: string;
    description: string;
    points: number;
  };
}

export interface MicroSlide {
  id: string;
  type: 'text' | 'image' | 'video' | 'interactive' | 'quiz';
  title?: string;
  content: string;
  image?: string;
  video?: string;
  quiz?: QuickQuiz;
  keyTakeaway?: string;
}

interface QuickQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface MicroModuleProps {
  content: MicroModuleContent;
  onComplete: (score: number, timeSpent: number) => void;
  onClose: () => void;
}

const MicroModule: React.FC<MicroModuleProps> = ({ content, onComplete, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startTime] = useState(Date.now());
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const { addPoints } = usePoints();
  const { checkBadgeUnlock } = useBadges();

  const slide = content.slides[currentSlide];
  const progress = ((currentSlide + 1) / content.slides.length) * 100;
  const isLastSlide = currentSlide === content.slides.length - 1;
  const timeElapsed = Math.floor((Date.now() - startTime) / 60000); // minutes

  useEffect(() => {
    // Track time and award bonus for completing within estimated time
    if (completed) {
      const timeSpent = Math.floor((Date.now() - startTime) / 60000);
      const withinTime = timeSpent <= content.estimatedTime;

      if (withinTime && content.quickWin) {
        addPoints(content.quickWin.points, `Quick Win: ${content.quickWin.title}`);
      }
    }
  }, [completed]);

  const handleNext = () => {
    if (isLastSlide) {
      handleComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleQuizAnswer = (selectedAnswer: number) => {
    const isCorrect = selectedAnswer === slide.quiz?.correctAnswer;
    setQuizAnswers(prev => ({ ...prev, [slide.id]: selectedAnswer }));

    if (isCorrect) {
      setScore(prev => prev + 10);
      addPoints(10, 'Quiz Answer Correct');
    }
  };

  const handleComplete = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 60000);
    const finalScore = score + 50; // Base completion points

    addPoints(50, `Completed Micro-Module: ${content.title}`);
    setCompleted(true);

    // Check for badge unlocks
    setTimeout(() => {
      onComplete(finalScore, timeSpent);
    }, 2000);
  };

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'text':
        return (
          <div className="space-y-4">
            {slide.title && (
              <h3 className="text-2xl font-bold text-gray-900">{slide.title}</h3>
            )}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">{slide.content}</p>
            </div>
            {slide.keyTakeaway && (
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Key Takeaway</p>
                    <p className="text-sm text-blue-800 mt-1">{slide.keyTakeaway}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            {slide.title && (
              <h3 className="text-2xl font-bold text-gray-900">{slide.title}</h3>
            )}
            {slide.image && (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={slide.image}
                  alt={slide.title || 'Module content'}
                  className="w-full h-auto"
                />
              </div>
            )}
            {slide.content && (
              <p className="text-gray-700 mt-4">{slide.content}</p>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">{slide.quiz?.question}</h3>
            <div className="space-y-3">
              {slide.quiz?.options.map((option, index) => {
                const isSelected = quizAnswers[slide.id] === index;
                const isCorrect = index === slide.quiz?.correctAnswer;
                const showResult = quizAnswers[slide.id] !== undefined;

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !showResult && handleQuizAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-50'
                          : isSelected
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                        : 'border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            {quizAnswers[slide.id] !== undefined && slide.quiz?.explanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded"
              >
                <p className="text-sm font-semibold text-blue-900 mb-1">Explanation</p>
                <p className="text-sm text-blue-800">{slide.quiz.explanation}</p>
              </motion.div>
            )}
          </div>
        );

      default:
        return <p className="text-gray-700">{slide.content}</p>;
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Award className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Module Complete!</h2>
          <p className="text-gray-600 mb-6">{content.quickWin?.description}</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-around">
              <div>
                <p className="text-3xl font-bold text-blue-600">{score}</p>
                <p className="text-sm text-gray-600">Points Earned</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">{timeElapsed}</p>
                <p className="text-sm text-gray-600">Minutes</p>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Learning
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-colors"
              >
                ×
              </button>
              <div>
                <h2 className="text-lg font-bold">{content.title}</h2>
                <p className="text-sm text-blue-200">{content.objective}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>{content.estimatedTime} min</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="absolute inset-y-0 left-0 bg-white rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-blue-200 mt-1">
            Slide {currentSlide + 1} of {content.slides.length}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="h-[calc(100vh-180px)] overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSlideContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentSlide === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold">{score} points</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <span>{isLastSlide ? 'Complete' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MicroModule;
