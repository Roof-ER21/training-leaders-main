/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Lightbulb,
  Trophy,
  RotateCcw,
  ChevronRight,
  GripVertical,
  Calculator,
  MessageSquare,
  Target,
  Brain,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Shuffle,
} from 'lucide-react';
import MultipleChoiceScenariosActivity from './MultipleChoiceScenariosActivity';
import ScenarioResponseActivity from './ScenarioResponseActivity';

// ========================================
// TYPES & INTERFACES
// ========================================

export interface BaseActivity {
  id: string;
  title: string;
  description: string;
  type:
    | 'drag-drop'
    | 'multiple-choice'
    | 'fill-blank'
    | 'scenario-tree'
    | 'calculation'
    | 'roleplay'
    | 'image-quiz'
    | 'branching-scenario'
    | 'timed-challenge'
    | 'calculator'
    | 'simulation'
    | 'matching'
    | 'scenario-response'
    | 'drag-drop-sequence'
    | 'multiple-choice-scenarios';
  points: number;
  agnesTip?: string;
}

export interface DragDropActivity extends BaseActivity {
  type: 'drag-drop';
  data: {
    items: Array<{
      id: string;
      text: string;
      category?: string;
    }>;
    correctOrder?: string[]; // For ordering tasks
    categories?: Array<{
      id: string;
      name: string;
      correctItems: string[];
    }>; // For categorization
  };
}

export interface MultipleChoiceActivity extends BaseActivity {
  type: 'multiple-choice';
  data: {
    question: string;
    options: Array<{
      id: string;
      text: string;
      isCorrect: boolean;
      explanation?: string;
    }>;
    allowMultiple?: boolean;
  };
}

export interface FillBlankActivity extends BaseActivity {
  type: 'fill-blank';
  data: {
    text: string; // Use {blank} for blank spots
    blanks: Array<{
      id: string;
      correctAnswers: string[]; // Multiple acceptable answers
      hint?: string;
    }>;
  };
}

export interface ScenarioTreeActivity extends BaseActivity {
  type: 'scenario-tree';
  data: {
    startNode: string;
    nodes: Array<{
      id: string;
      text: string;
      choices?: Array<{
        id: string;
        text: string;
        nextNode: string;
        isOptimal: boolean;
        feedback: string;
      }>;
      isEnding?: boolean;
      outcome?: 'success' | 'partial' | 'failure';
    }>;
  };
}

export interface CalculationActivity extends BaseActivity {
  type: 'calculation';
  data: {
    problem: string;
    variables: Array<{
      name: string;
      value: number;
      unit?: string;
    }>;
    formula: string;
    correctAnswer: number;
    tolerance?: number; // Allow for rounding
    steps?: string[];
  };
}

export interface RoleplayActivity extends BaseActivity {
  type: 'roleplay';
  data: {
    scenario: string;
    characterRole: string;
    objectivecriteria: string[];
    prompts: Array<{
      id: string;
      situation: string;
      expectedResponse: string;
      keywords: string[]; // Key phrases to look for
    }>;
  };
}

export interface ImageQuizActivity extends BaseActivity {
  type: 'image-quiz';
  data: {
    images: Array<{
      id: string;
      imageUrl?: string;
      description?: string;
      question: string;
      options?: string[]; // optional explicit choices
      correctAnswer: string;
      explanation?: string;
    }>;
  };
}

export interface BranchingScenarioActivity extends BaseActivity {
  type: 'branching-scenario';
  data: {
    startStage?: string;
    stages: Array<{
      stage: string;
      decision: string;
      options: Array<{
        choice: string;
        outcome: string;
        success: boolean;
      }>;
    }>;
  };
}

export interface TimedChallengeActivity extends BaseActivity {
  type: 'timed-challenge';
  data: {
    timeLimit?: number; // seconds per scenario
    scenarios: Array<{
      objection: string;
      correctResponse: string;
      incorrectResponses: string[];
    }>;
  };
}

export interface CalculatorActivity extends BaseActivity {
  type: 'calculator';
  data: {
    inputs: Array<{
      label: string;
      min: number;
      max: number;
      default: number;
      step?: number;
    }>;
    calculations?: string[];
  };
}

export interface SimulationActivity extends BaseActivity {
  type: 'simulation';
  data: {
    scenarios: Array<{
      time: string;
      task: string;
      options: string[];
      correctOption: number;
      feedback: string;
    }>;
  };
}

export interface MatchingActivity extends BaseActivity {
  type: 'matching';
  data: {
    pairs: Array<{
      id: string;
      left: string;
      right: string;
    }>;
    shuffleOptions?: boolean; // Default true
    showHints?: boolean; // Show hints after wrong attempts
    hintsAfterAttempts?: number; // Default 2
  };
}

// New activity types
export interface ScenarioResponseActivity extends BaseActivity {
  type: 'scenario-response';
  data: {
    scenario: string;
    correctPoints?: string[];
    correctApproach?: string[];
    sampleResponse?: string;
  };
}

export interface DragDropSequenceActivity extends BaseActivity {
  type: 'drag-drop-sequence';
  data: {
    items: Array<{ id: string; text: string; category?: string }>;
    correctOrder: string[];
  };
}

export interface MultipleChoiceScenariosActivityType extends BaseActivity {
  type: 'multiple-choice-scenarios';
  data: {
    scenarios: Array<{
      situation?: string;
      question?: string;
      prompt?: string;
      options: string[];
      correctAnswer: number | string;
      explanation?: string;
    }>;
  };
}

export type Activity =
  | DragDropActivity
  | MultipleChoiceActivity
  | FillBlankActivity
  | ScenarioTreeActivity
  | CalculationActivity
  | RoleplayActivity
  | ImageQuizActivity
  | BranchingScenarioActivity
  | TimedChallengeActivity
  | CalculatorActivity
  | SimulationActivity
  | MatchingActivity
  | ScenarioResponseActivity
  | DragDropSequenceActivity
  | MultipleChoiceScenariosActivityType;

interface InteractiveLearningActivityProps {
  activity: Activity;
  onComplete: (score: number, totalPoints: number) => void;
  onRetry?: () => void;
}

// ========================================
// MAIN COMPONENT
// ========================================

const InteractiveLearningActivity: React.FC<
  InteractiveLearningActivityProps
> = ({ activity, onComplete, onRetry }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const renderActivity = () => {
    switch (activity.type) {
      case 'drag-drop':
        return (
          <DragDropActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'drag-drop-sequence':
        // Reuse drag-drop component for sequence ordering
        return (
          <DragDropActivityComponent
            activity={activity as unknown as DragDropActivity}
            onComplete={handleComplete}
          />
        );
      case 'multiple-choice':
        return (
          <MultipleChoiceActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'multiple-choice-scenarios':
        return (
          <MultipleChoiceScenariosActivity
            activity={activity as unknown as any}
            onComplete={handleComplete}
          />
        );
      case 'fill-blank':
        return (
          <FillBlankActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'scenario-tree':
        return (
          <ScenarioTreeActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'calculation':
        return (
          <CalculationActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'roleplay':
        return (
          <RoleplayActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'image-quiz':
        return (
          <ImageQuizActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'branching-scenario':
        return (
          <BranchingScenarioActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'timed-challenge':
        return (
          <TimedChallengeActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'calculator':
        return (
          <CalculatorActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'simulation':
        return (
          <SimulationActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'matching':
        return (
          <MatchingGameActivityComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'scenario-response':
        return (
          <ScenarioResponseActivity
            activity={activity as unknown as any}
            onComplete={handleComplete}
          />
        );
      default:
        return <div>Unknown activity type</div>;
    }
  };

  const handleComplete = (earnedScore: number, totalPoints: number) => {
    setScore(earnedScore);
    setIsCompleted(true);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);
    onComplete(earnedScore, totalPoints);
  };

  const handleRetry = () => {
    setIsCompleted(false);
    setShowFeedback(false);
    setScore(0);
    if (onRetry) onRetry();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-neutral-900 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
            <p className="text-gray-300">{activity.description}</p>
          </div>
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <Trophy className="w-5 h-5" />
            <span className="font-semibold">{activity.points} pts</span>
          </div>
        </div>

        {/* Agnes Tip */}
        {activity.agnesTip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-yellow-400 text-gray-900 rounded-lg p-4 flex items-start space-x-3"
          >
            <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Agnes says:</p>
              <p className="text-sm">{activity.agnesTip}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Activity Content */}
      <div className="p-6">{renderActivity()}</div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[110] p-4"
            onClick={() => setShowFeedback(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl"
            >
              {/* Success/Partial/Failure Icon */}
              <div className="text-center mb-4">
                {score >= activity.points * 0.8 ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                ) : score >= activity.points * 0.5 ? (
                  <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-3" />
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {score >= activity.points * 0.8
                    ? 'Excellent Work!'
                    : score >= activity.points * 0.5
                      ? 'Good Effort!'
                      : 'Keep Practicing!'}
                </h3>

                <p className="text-gray-600 mb-4">
                  You earned{' '}
                  <span className="font-bold text-roofRed">{score}</span> out
                  of <span className="font-bold">{activity.points}</span> points
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / activity.points) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-3 rounded-full ${
                      score >= activity.points * 0.8
                        ? 'bg-green-500'
                        : score >= activity.points * 0.5
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                  />
                </div>

                {attempts > 1 && (
                  <p className="text-sm text-gray-500">Attempt #{attempts}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                {score < activity.points && (
                  <button
                    onClick={() => {
                      setShowFeedback(false);
                      handleRetry();
                    }}
                    className="flex-1 bg-roofRed text-white py-3 rounded-lg font-semibold hover:bg-roofRed-dark transition-colors flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Again</span>
                  </button>
                )}
                <button
                  onClick={() => setShowFeedback(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ========================================
// DRAG & DROP COMPONENT
// ========================================

const DragDropActivityComponent: React.FC<{
  activity: DragDropActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [items, setItems] = useState(activity.data.items);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleDragStart = (itemId: string) => {
    setDraggedItem(itemId);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);

    const newItems = [...items];
    [newItems[draggedIndex], newItems[targetIndex]] = [
      newItems[targetIndex],
      newItems[draggedIndex],
    ];

    setItems(newItems);
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    if (!activity.data.correctOrder) return;

    const currentOrder = items.map(item => item.id);
    const correctCount = activity.data.correctOrder.reduce(
      (count, correctId, index) => {
        return currentOrder[index] === correctId ? count + 1 : count;
      },
      0
    );

    const score = Math.round(
      (correctCount / activity.data.correctOrder.length) * activity.points
    );
    setSubmitted(true);
    onComplete(score, activity.points);
  };

  const getItemClass = (item: any, index: number) => {
    if (!submitted) return 'bg-white border-2 border-gray-300';

    const isCorrect =
      activity.data.correctOrder &&
      activity.data.correctOrder[index] === item.id;
    return isCorrect
      ? 'bg-green-50 border-2 border-green-500'
      : 'bg-red-50 border-2 border-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 font-medium">
          Drag and drop the items to arrange them in the correct order. The
          sequence matters!
        </p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            draggable={!submitted}
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={e => handleDragOver(e, item.id)}
            onDrop={e => handleDrop(e, item.id)}
            className={`${getItemClass(item, index)} rounded-lg p-4 cursor-move transition-all duration-200 hover:shadow-md`}
            whileHover={!submitted ? { scale: 1.02 } : {}}
            whileTap={!submitted ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {submitted ? (
                  activity.data.correctOrder &&
                  activity.data.correctOrder[index] === item.id ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )
                ) : (
                  <GripVertical className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-500">
                    #{index + 1}
                  </span>
                  <span className="text-gray-900 font-medium">{item.text}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={checkAnswer}
          className="w-full bg-roofRed text-white py-3 rounded-lg font-semibold hover:bg-roofRed-dark transition-colors flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Submit Answer</span>
        </button>
      )}

      {submitted && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Correct Order:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            {activity.data.correctOrder?.map(id => {
              const item = activity.data.items.find(i => i.id === id);
              return <li key={id}>{item?.text}</li>;
            })}
          </ol>
        </div>
      )}
    </div>
  );
};

// ========================================
// MULTIPLE CHOICE COMPONENT
// ========================================

const MultipleChoiceActivityComponent: React.FC<{
  activity: MultipleChoiceActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Reset state when activity changes
  useEffect(() => {
    setSelectedOptions([]);
    setSubmitted(false);
  }, [activity.id]);

  const toggleOption = (optionId: string) => {
    if (submitted) return;

    if (activity.data.allowMultiple) {
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      // For single-choice, always set to array with just this option
      setSelectedOptions([optionId]);
    }
  };

  const checkAnswer = () => {
    const correctOptions = activity.data.options
      .filter(opt => opt.isCorrect)
      .map(opt => opt.id);

    const correctSelections = selectedOptions.filter(id =>
      correctOptions.includes(id)
    ).length;

    const incorrectSelections = selectedOptions.filter(
      id => !correctOptions.includes(id)
    ).length;

    const missedSelections = correctOptions.filter(
      id => !selectedOptions.includes(id)
    ).length;

    // Calculate score: full points if all correct, partial credit based on accuracy
    let score = 0;
    if (incorrectSelections === 0 && missedSelections === 0) {
      score = activity.points;
    } else {
      const accuracy =
        correctSelections /
        (correctSelections + incorrectSelections + missedSelections);
      score = Math.round(accuracy * activity.points);
    }

    setSubmitted(true);
    onComplete(score, activity.points);
  };

  const getOptionClass = (option: any) => {
    if (!submitted) {
      return selectedOptions.includes(option.id)
        ? 'bg-purple-50 border-2 border-purple-500'
        : 'bg-white border-2 border-gray-300';
    }

    if (option.isCorrect) {
      return 'bg-green-50 border-2 border-green-500';
    }

    if (selectedOptions.includes(option.id)) {
      return 'bg-red-50 border-2 border-red-500';
    }

    return 'bg-gray-50 border-2 border-gray-300';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-lg font-semibold text-gray-900 mb-2">
          {activity.data.question}
        </p>
        <p className="text-sm text-blue-800">
          {activity.data.allowMultiple
            ? 'Select all that apply'
            : 'Select the best answer'}
        </p>
      </div>

      <div className="space-y-3">
        {activity.data.options.map(option => {
          const isSelected = selectedOptions.includes(option.id);
          return (
            <motion.div
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`${getOptionClass(option)} rounded-lg p-4 cursor-pointer transition-all duration-200`}
              whileHover={!submitted ? { scale: 1.02 } : {}}
              whileTap={!submitted ? { scale: 0.98 } : {}}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {submitted ? (
                    option.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
                    )
                  ) : (
                    <div
                      className={`w-5 h-5 rounded-full border-2 ${
                        isSelected
                          ? 'bg-roofRed border-purple-600'
                          : 'border-gray-400'
                      } flex items-center justify-center`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{option.text}</p>
                  {submitted && option.explanation && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-gray-600 mt-2"
                    >
                      {option.explanation}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={checkAnswer}
          disabled={selectedOptions.length === 0}
          className="w-full bg-roofRed text-white py-3 rounded-lg font-semibold hover:bg-roofRed-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Submit Answer</span>
        </button>
      )}
    </div>
  );
};

// ========================================
// FILL IN THE BLANK COMPONENT
// ========================================

const FillBlankActivityComponent: React.FC<{
  activity: FillBlankActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const textParts = activity.data.text.split(/{blank}/);
  const blanks = activity.data.blanks;

  const handleAnswerChange = (blankId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [blankId]: value }));
  };

  const checkAnswer = () => {
    let correctCount = 0;

    blanks.forEach(blank => {
      const userAnswer = answers[blank.id]?.trim().toLowerCase() || '';
      const isCorrect = blank.correctAnswers.some(
        correctAnswer => correctAnswer.toLowerCase() === userAnswer
      );
      if (isCorrect) correctCount++;
    });

    const score = Math.round((correctCount / blanks.length) * activity.points);
    setSubmitted(true);
    onComplete(score, activity.points);
  };

  const isAnswerCorrect = (blankId: string) => {
    const userAnswer = answers[blankId]?.trim().toLowerCase() || '';
    const blank = blanks.find(b => b.id === blankId);
    return blank?.correctAnswers.some(
      correctAnswer => correctAnswer.toLowerCase() === userAnswer
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 font-medium">
          Fill in the blanks to complete the text. Type your answers carefully!
        </p>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
        <div className="text-lg leading-relaxed">
          {textParts.map((part, index) => (
            <React.Fragment key={index}>
              <span>{part}</span>
              {index < blanks.length && (
                <span className="inline-flex items-center mx-1">
                  <input
                    type="text"
                    value={answers[blanks[index].id] || ''}
                    onChange={e =>
                      handleAnswerChange(blanks[index].id, e.target.value)
                    }
                    disabled={submitted}
                    className={`inline-block w-40 px-3 py-1 border-b-2 focus:outline-none transition-colors ${
                      submitted
                        ? isAnswerCorrect(blanks[index].id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-purple-500 focus:border-purple-700'
                    }`}
                    placeholder="..."
                  />
                  {submitted && !isAnswerCorrect(blanks[index].id) && (
                    <span className="ml-2 text-sm text-gray-600">
                      ({blanks[index].correctAnswers[0]})
                    </span>
                  )}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {!submitted && blanks.some(blank => blank.hint) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2" />
            Hints:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {blanks.map(blank =>
              blank.hint ? <li key={blank.id}>{blank.hint}</li> : null
            )}
          </ul>
        </div>
      )}

      {!submitted && (
        <button
          onClick={checkAnswer}
          disabled={Object.keys(answers).length < blanks.length}
          className="w-full bg-roofRed text-white py-3 rounded-lg font-semibold hover:bg-roofRed-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Submit Answers</span>
        </button>
      )}
    </div>
  );
};

// ========================================
// SCENARIO TREE COMPONENT (Choose Your Own Adventure)
// ========================================

const ScenarioTreeActivityComponent: React.FC<{
  activity: ScenarioTreeActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [currentNodeId, setCurrentNodeId] = useState(activity.data.startNode);
  const [pathTaken, setPathTaken] = useState<string[]>([
    activity.data.startNode,
  ]);
  const [finished, setFinished] = useState(false);

  const currentNode = activity.data.nodes.find(
    node => node.id === currentNodeId
  );

  const handleChoice = (choiceId: string, nextNodeId: string) => {
    setCurrentNodeId(nextNodeId);
    setPathTaken(prev => [...prev, nextNodeId]);

    const nextNode = activity.data.nodes.find(node => node.id === nextNodeId);
    if (nextNode?.isEnding) {
      // Calculate score based on optimal choices
      const optimalChoicesCount = pathTaken.reduce((count, nodeId) => {
        const node = activity.data.nodes.find(n => n.id === nodeId);
        const wasOptimal = node?.choices?.some(
          c =>
            c.nextNode === pathTaken[pathTaken.indexOf(nodeId) + 1] &&
            c.isOptimal
        );
        return wasOptimal ? count + 1 : count;
      }, 0);

      const totalChoices = pathTaken.length - 1; // Exclude start node
      const score = Math.round(
        (optimalChoicesCount / totalChoices) * activity.points
      );

      setFinished(true);
      setTimeout(() => onComplete(score, activity.points), 1000);
    }
  };

  const restartScenario = () => {
    setCurrentNodeId(activity.data.startNode);
    setPathTaken([activity.data.startNode]);
    setFinished(false);
  };

  if (!currentNode) return <div>Error: Node not found</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-roofRed/30 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <MessageSquare className="w-6 h-6 text-roofRed flex-shrink-0 mt-1" />
          <div>
            <p className="text-gray-900 text-lg leading-relaxed whitespace-pre-wrap">
              {currentNode.text}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center space-x-2">
        <Brain className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">
          Step {pathTaken.length} of your journey
        </span>
      </div>

      {/* Choices */}
      {currentNode.choices && !finished && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">What do you do?</p>
          {currentNode.choices.map(choice => (
            <motion.button
              key={choice.id}
              onClick={() => handleChoice(choice.id, choice.nextNode)}
              className="w-full text-left bg-white border-2 border-purple-300 hover:border-purple-500 rounded-lg p-4 transition-all duration-200 group"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-medium group-hover:text-purple-700">
                  {choice.text}
                </span>
                <ChevronRight className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Ending */}
      {currentNode.isEnding && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`border-2 rounded-lg p-6 ${
            currentNode.outcome === 'success'
              ? 'bg-green-50 border-green-500'
              : currentNode.outcome === 'partial'
                ? 'bg-yellow-50 border-yellow-500'
                : 'bg-red-50 border-red-500'
          }`}
        >
          <div className="flex items-center space-x-3 mb-4">
            {currentNode.outcome === 'success' ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : currentNode.outcome === 'partial' ? (
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <h3 className="text-xl font-bold text-gray-900">
              {currentNode.outcome === 'success'
                ? 'Great Job!'
                : currentNode.outcome === 'partial'
                  ? 'Not Bad!'
                  : 'Learning Experience'}
            </h3>
          </div>

          <button
            onClick={restartScenario}
            className="w-full bg-roofRed text-white py-3 rounded-lg font-semibold hover:bg-roofRed-dark transition-colors flex items-center justify-center space-x-2 mt-4"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Different Choices</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ========================================
// CALCULATION COMPONENT
// ========================================

const CalculationActivityComponent: React.FC<{
  activity: CalculationActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const checkAnswer = () => {
    const answer = parseFloat(userAnswer);
    const tolerance = activity.data.tolerance || 0.01;
    const isCorrect =
      Math.abs(answer - activity.data.correctAnswer) <= tolerance;

    const score = isCorrect ? activity.points : 0;
    setSubmitted(true);
    onComplete(score, activity.points);
  };

  const isAnswerCorrect = () => {
    const answer = parseFloat(userAnswer);
    const tolerance = activity.data.tolerance || 0.01;
    return Math.abs(answer - activity.data.correctAnswer) <= tolerance;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Calculator className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">Problem:</h4>
            <p className="text-gray-800 text-lg">{activity.data.problem}</p>
          </div>
        </div>
      </div>

      {/* Variables */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Given Information:</h4>
        <div className="grid grid-cols-2 gap-3">
          {activity.data.variables.map(variable => (
            <div
              key={variable.name}
              className="bg-gray-50 rounded-lg p-3 border border-gray-300"
            >
              <p className="text-sm text-gray-600">{variable.name}</p>
              <p className="text-lg font-semibold text-gray-900">
                {variable.value.toLocaleString()}
                {variable.unit && (
                  <span className="text-sm ml-1">{variable.unit}</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="bg-purple-50 border-2 border-roofRed/30 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Formula:</h4>
        <code className="text-purple-800 font-mono text-sm bg-white px-3 py-2 rounded block">
          {activity.data.formula}
        </code>
      </div>

      {/* Answer Input */}
      <div className="space-y-3">
        <label
          htmlFor={`calculation-answer-${activity.id}`}
          className="block text-sm font-semibold text-gray-700"
        >
          Your Answer:
        </label>
        <input
          type="number"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          disabled={submitted}
          placeholder="Enter your calculated answer..."
          id={`calculation-answer-${activity.id}`}
          className={`w-full px-4 py-3 text-lg border-2 rounded-lg focus:outline-none transition-colors ${
            submitted
              ? isAnswerCorrect()
                ? 'border-green-500 bg-green-50'
                : 'border-red-500 bg-red-50'
              : 'border-gray-300 focus:border-purple-500'
          }`}
        />
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 rounded-lg p-4 ${
            isAnswerCorrect()
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}
        >
          <p className="font-semibold text-gray-900 mb-2">
            {isAnswerCorrect() ? 'Correct!' : 'Not quite right'}
          </p>
          <p className="text-gray-700">
            The correct answer is:{' '}
            <span className="font-bold">
              {activity.data.correctAnswer.toLocaleString()}
            </span>
          </p>

          {activity.data.steps && (
            <div className="mt-4">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="text-roofRed hover:text-purple-700 font-semibold text-sm flex items-center space-x-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showSteps ? 'Hide' : 'Show'} Step-by-Step Solution</span>
              </button>

              {showSteps && (
                <motion.ol
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="list-decimal list-inside mt-3 space-y-2 text-sm text-gray-700"
                >
                  {activity.data.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </motion.ol>
              )}
            </div>
          )}
        </motion.div>
      )}

      {!submitted && (
        <button
          onClick={checkAnswer}
          disabled={!userAnswer}
          className="w-full bg-roofRed text-white py-3 rounded-lg font-semibold hover:bg-roofRed-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Check Answer</span>
        </button>
      )}
    </div>
  );
};

// ========================================
// ROLEPLAY COMPONENT
// ========================================

const RoleplayActivityComponent: React.FC<{
  activity: RoleplayActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentPrompt = activity.data.prompts[currentPromptIndex];

  const handleSubmitResponse = () => {
    setResponses(prev => [...prev, userResponse]);
    setUserResponse('');

    if (currentPromptIndex < activity.data.prompts.length - 1) {
      setCurrentPromptIndex(prev => prev + 1);
    } else {
      // Calculate score based on keyword matching
      let totalKeywordMatches = 0;
      let totalKeywords = 0;

      responses.forEach((response, index) => {
        const prompt = activity.data.prompts[index];
        const matchedKeywords = prompt.keywords.filter(keyword =>
          response.toLowerCase().includes(keyword.toLowerCase())
        ).length;
        totalKeywordMatches += matchedKeywords;
        totalKeywords += prompt.keywords.length;
      });

      // Include final response
      const finalMatches = currentPrompt.keywords.filter(keyword =>
        userResponse.toLowerCase().includes(keyword.toLowerCase())
      ).length;
      totalKeywordMatches += finalMatches;
      totalKeywords += currentPrompt.keywords.length;

      const score = Math.round(
        (totalKeywordMatches / totalKeywords) * activity.points
      );
      setFinished(true);
      onComplete(score, activity.points);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Implement actual voice recording logic here
    console.log('Voice recording started');
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Implement stopping and transcription logic here
    console.log('Voice recording stopped');
  };

  const speakPrompt = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentPrompt.situation);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Scenario Setup */}
      {currentPromptIndex === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-roofRed/30 rounded-lg p-6"
        >
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Your Role:
          </h4>
          <p className="text-gray-800 mb-4">{activity.data.characterRole}</p>

          <h4 className="font-semibold text-gray-900 mb-2">Scenario:</h4>
          <p className="text-gray-800 mb-4">{activity.data.scenario}</p>

          <h4 className="font-semibold text-gray-900 mb-2">
            Success Criteria:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {activity.data.objectivecriteria.map(
              (criterion: string, index: number) => (
                <li key={index}>{criterion}</li>
              )
            )}
          </ul>
        </motion.div>
      )}

      {/* Current Prompt */}
      {!finished && (
        <>
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">
                    Customer says:
                  </span>
                </div>
                <p className="text-gray-800 text-lg">
                  {currentPrompt.situation}
                </p>
              </div>
              <button
                onClick={speakPrompt}
                className="ml-4 p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                title="Hear this prompt"
              >
                {isSpeaking ? (
                  <VolumeX className="w-5 h-5 text-blue-600" />
                ) : (
                  <Volume2 className="w-5 h-5 text-blue-600" />
                )}
              </button>
            </div>

            {/* Progress */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>
                Prompt {currentPromptIndex + 1} of{' '}
                {activity.data.prompts.length}
              </span>
            </div>
          </div>

          {/* Response Input */}
          <div className="space-y-3">
            <label
              htmlFor={`response-input-${activity.id}`}
              className="block text-sm font-semibold text-gray-700"
            >
              Your Response:
            </label>
            <textarea
              value={userResponse}
              onChange={e => setUserResponse(e.target.value)}
              placeholder="Type what you would say..."
              rows={4}
              id={`response-input-${activity.id}`}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
            />

            <div className="flex items-center space-x-3">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {isRecording ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Voice Response</span>
                  </>
                )}
              </button>

              <button
                onClick={handleSubmitResponse}
                disabled={!userResponse.trim()}
                className="flex-1 bg-roofRed text-white py-3 rounded-lg font-semibold hover:bg-roofRed-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <ChevronRight className="w-5 h-5" />
                <span>Continue</span>
              </button>
            </div>
          </div>

          {/* Expected Response Hint */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              Key Points to Include:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {currentPrompt.keywords.map((keyword, index) => (
                <li key={index}>{keyword}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Completion Summary */}
      {finished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border-2 border-green-500 rounded-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Roleplay Complete!
            </h3>
          </div>

          <p className="text-gray-700 mb-4">
            Great job working through this scenario! Review your responses and
            see how you can improve.
          </p>

          <div className="space-y-4">
            {responses.map((response, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-300"
              >
                <p className="font-semibold text-gray-900 mb-2">
                  Prompt {index + 1}: {activity.data.prompts[index].situation}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Your response:</span>{' '}
                  {response}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Expected:</span>{' '}
                  {activity.data.prompts[index].expectedResponse}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ========================================
// IMAGE QUIZ COMPONENT
// ========================================

const ImageQuizActivityComponent: React.FC<{
  activity: ImageQuizActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const current = activity.data.images[currentIndex];

  // Derive options: use provided or sensible defaults
  const defaultBank = [
    'Hail impact',
    'Wind damage',
    'No damage',
    'Wear and tear',
  ];
  const options =
    current.options && current.options.length > 0
      ? current.options
      : Array.from(new Set([current.correctAnswer, ...defaultBank])).slice(
          0,
          4
        );

  const handleSubmit = () => {
    if (submitted) return;
    const correct = selected === current.correctAnswer;
    if (correct)
      setScore(
        s => s + Math.round(activity.points / activity.data.images.length)
      );
    setSubmitted(true);
  };

  const next = () => {
    if (currentIndex < activity.data.images.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      onComplete(score, activity.points);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 w-full">
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border">
            {current.imageUrl ? (
              <img
                src={current.imageUrl}
                alt={current.description || 'Quiz image'}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image
              </div>
            )}
          </div>
          {current.description && (
            <p className="mt-2 text-sm text-gray-600">{current.description}</p>
          )}
        </div>
        <div className="md:w-1/2 w-full">
          <h4 className="font-semibold text-gray-900 mb-3">
            {current.question}
          </h4>
          <div className="space-y-2">
            {options.map(opt => (
              <label
                key={opt}
                className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                  submitted
                    ? opt === current.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : selected === opt
                        ? 'bg-red-50 border-red-500'
                        : 'bg-gray-50 border-gray-200'
                    : selected === opt
                      ? 'bg-purple-50 border-purple-500'
                      : 'bg-white border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={`imgq-${current.id}`}
                  className="mr-3"
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                  aria-label={opt}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="px-4 py-2 bg-roofRed hover:bg-roofRed-dark disabled:bg-gray-300 text-white rounded-lg font-semibold"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={next}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
              >
                {currentIndex < activity.data.images.length - 1
                  ? 'Next'
                  : 'Finish'}
              </button>
            )}
          </div>
          {submitted && current.explanation && (
            <p className="mt-3 text-sm text-gray-700">
              <strong>Explanation:</strong> {current.explanation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ========================================
// BRANCHING SCENARIO COMPONENT (linear stages)
// ========================================

const BranchingScenarioActivityComponent: React.FC<{
  activity: BranchingScenarioActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [progress, setProgress] = useState<{ success: number; total: number }>({
    success: 0,
    total: activity.data.stages.length,
  });
  const stage = activity.data.stages[index];

  const submit = () => {
    if (selected == null) return;
    const opt = stage.options[selected];
    if (opt.success) setProgress(p => ({ ...p, success: p.success + 1 }));
    if (index < activity.data.stages.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
    } else {
      // Score proportional to successes
      const earned = Math.round(
        (progress.success / progress.total) * activity.points
      );
      onComplete(earned, activity.points);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 border-gray-200 border rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Stage {index + 1} of {activity.data.stages.length}:{' '}
          <strong>{stage.stage}</strong>
        </p>
      </div>
      <h4 className="font-semibold text-gray-900">{stage.decision}</h4>
      <div className="space-y-2">
        {stage.options.map((o, i) => (
          <label
            key={i}
            className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer ${selected === i ? 'bg-purple-50 border-purple-500' : 'bg-white border-gray-300'}`}
          >
            <input
              type="radio"
              name={`branch-${index}`}
              className="mt-1"
              checked={selected === i}
              onChange={() => setSelected(i)}
              aria-label={o.choice}
            />
            <div>
              <p className="text-gray-900">{o.choice}</p>
              <p className="text-sm text-gray-600">{o.outcome}</p>
            </div>
          </label>
        ))}
      </div>
      <div>
        <button
          onClick={submit}
          disabled={selected == null}
          className="px-4 py-2 bg-roofRed hover:bg-roofRed-dark disabled:bg-gray-300 text-white rounded-lg font-semibold"
        >
          {index < activity.data.stages.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

// ========================================
// TIMED CHALLENGE COMPONENT
// ========================================

const TimedChallengeActivityComponent: React.FC<{
  activity: TimedChallengeActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(activity.data.timeLimit || 30);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const scenario = activity.data.scenarios[index];
  const options = React.useMemo(() => {
    const opts = [scenario.correctResponse, ...scenario.incorrectResponses];
    // shuffle
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [index, scenario.correctResponse, scenario.incorrectResponses]);

  const handleSubmit = React.useCallback(() => {
    const chosen = selected != null ? options[selected] : null;
    const correct = chosen === scenario.correctResponse;
    if (correct)
      setScore(
        s => s + Math.round(activity.points / activity.data.scenarios.length)
      );
    if (index < activity.data.scenarios.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
    } else {
      onComplete(score, activity.points);
    }
  }, [
    selected,
    options,
    scenario.correctResponse,
    activity.points,
    activity.data.scenarios.length,
    index,
    onComplete,
    score,
  ]);

  // countdown
  useEffect(() => {
    setTimeLeft(activity.data.timeLimit || 30);
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [index, activity.data.timeLimit, handleSubmit]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">
          Respond to the objection within {activity.data.timeLimit || 30}s
        </h4>
        <span
          className={`px-3 py-1 rounded-lg text-white text-sm ${timeLeft <= 5 ? 'bg-red-600' : 'bg-gray-800'}`}
        >
          ⏱ {timeLeft}s
        </span>
      </div>
      <div className="bg-yellow-50 border-yellow-200 border rounded-lg p-4">
        <p className="text-gray-900">
          <span className="font-semibold">Homeowner:</span> {scenario.objection}
        </p>
      </div>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <label
            key={i}
            className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer ${selected === i ? 'bg-purple-50 border-purple-500' : 'bg-white border-gray-300'}`}
          >
            <input
              type="radio"
              name={`timed-${index}`}
              className="mt-1"
              checked={selected === i}
              onChange={() => setSelected(i)}
              aria-label={`Option ${i + 1}`}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
        >
          {index < activity.data.scenarios.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

// ========================================
// CALCULATOR COMPONENT (Commission Model)
// ========================================

const CalculatorActivityComponent: React.FC<{
  activity: CalculatorActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [values, setValues] = useState(() =>
    activity.data.inputs.reduce((acc: any, input) => {
      acc[input.label] = input.default;
      return acc;
    }, {})
  );

  const get = (label: string) => Number(values[label] ?? 0);
  const labels = activity.data.inputs.map(i => i.label);
  // Commission model (Module 1)
  const signups = get('Sign-ups this month');
  const avgTicket = get('Average ticket value');
  const completions = get('Completions this month');
  const hasCommissionModel =
    labels.includes('Sign-ups this month') &&
    labels.includes('Average ticket value');
  const tier = hasCommissionModel
    ? signups >= 20
      ? 0.16
      : signups >= 10
        ? 0.1
        : 0.06
    : 0;
  const downpayment = hasCommissionModel ? signups * 1000 : 0;
  const completionCommissions = hasCommissionModel
    ? completions * avgTicket * tier
    : 0;
  const bonus = hasCommissionModel
    ? signups >= 30
      ? 4000
      : signups >= 20
        ? 2000
        : signups >= 10
          ? 500
          : 0
    : 0;
  const commissionTotal = downpayment + completionCommissions + bonus;
  // ACV/RCV model (Module 5)
  const rcv = get('Replacement Cost Value (RCV)') || get('RCV (Total Claim)');
  const depreciation = get('Depreciation');
  const deductible = get('Deductible');
  const acv = rcv - depreciation;
  const homeownerOOP = deductible || 0;
  const finalPaymentAfterCompletion = depreciation;

  const update = (label: string, v: number) =>
    setValues((prev: any) => ({ ...prev, [label]: v }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activity.data.inputs.map(inp => (
          <div
            key={inp.label}
            className="bg-white border-2 border-gray-200 rounded-xl p-4"
          >
            <label
              className="block text-sm font-semibold text-gray-700 mb-2"
              htmlFor={`calc-${activity.id}-${inp.label}`}
            >
              {inp.label}
            </label>
            <input
              id={`calc-${activity.id}-${inp.label}`}
              type="range"
              min={inp.min}
              max={inp.max}
              step={inp.step ?? 1}
              value={values[inp.label]}
              onChange={e => update(inp.label, Number(e.target.value))}
              className="w-full"
            />
            <div className="mt-2 text-sm text-gray-800 font-semibold">
              {values[inp.label]}
            </div>
          </div>
        ))}
      </div>

      {hasCommissionModel ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-50 border-2 border-roofRed/30 rounded-xl p-4">
            <p className="text-sm text-purple-800">Commission Tier</p>
            <p className="text-2xl font-bold text-purple-900">
              {Math.round(tier * 100)}%
            </p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-800">Downpayment Commissions</p>
            <p className="text-2xl font-bold text-green-900">
              ${downpayment.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">Completion Commissions</p>
            <p className="text-2xl font-bold text-blue-900">
              ${Math.round(completionCommissions).toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-yellow-800">Monthly Bonus</p>
            <p className="text-2xl font-bold text-yellow-900">
              ${bonus.toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-50 border-2 border-roofRed/30 rounded-xl p-4">
            <p className="text-sm text-purple-800">RCV</p>
            <p className="text-2xl font-bold text-purple-900">
              ${Math.round(rcv).toLocaleString()}
            </p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-800">Depreciation</p>
            <p className="text-2xl font-bold text-green-900">
              ${Math.round(depreciation).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">ACV (Initial Payment)</p>
            <p className="text-2xl font-bold text-blue-900">
              ${Math.round(acv).toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-yellow-800">Homeowner Deductible</p>
            <p className="text-2xl font-bold text-yellow-900">
              ${Math.round(homeownerOOP).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      <div className="bg-gray-900 text-white rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">
            {hasCommissionModel
              ? 'Total Potential Earnings'
              : 'Final Payment After Completion'}
          </p>
          <p className="text-3xl font-extrabold">
            {hasCommissionModel
              ? `$${Math.round(commissionTotal).toLocaleString()}`
              : `$${Math.round(finalPaymentAfterCompletion).toLocaleString()}`}
          </p>
        </div>
        <button
          onClick={() => onComplete(activity.points, activity.points)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-bold"
        >
          Mark Explored
        </button>
      </div>

      {activity.data.calculations && activity.data.calculations.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-2">
            How this is calculated
          </h4>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {activity.data.calculations.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ========================================
// SIMULATION COMPONENT (Day-in-life)
// ========================================

const SimulationActivityComponent: React.FC<{
  activity: SimulationActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const scenario = activity.data.scenarios[index];

  const submit = () => {
    if (selected == null) return;
    const correct = selected === scenario.correctOption;
    if (correct)
      setScore(
        s => s + Math.round(activity.points / activity.data.scenarios.length)
      );
    if (index < activity.data.scenarios.length - 1) {
      setIndex(i => i + 1);
      setSelected(null);
    } else {
      onComplete(score, activity.points);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4">
        <p className="text-sm text-indigo-800">
          <strong>{scenario.time}</strong>
        </p>
        <p className="text-gray-900">{scenario.task}</p>
      </div>
      <div className="space-y-2">
        {scenario.options.map((opt, i) => (
          <label
            key={i}
            className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer ${selected === i ? 'bg-purple-50 border-purple-500' : 'bg-white border-gray-300'}`}
          >
            <input
              type="radio"
              name={`sim-${index}`}
              className="mt-1"
              checked={selected === i}
              onChange={() => setSelected(i)}
              aria-label={opt}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <p className="text-sm text-gray-600">{scenario.feedback}</p>
      <div>
        <button
          onClick={submit}
          disabled={selected == null}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-semibold"
        >
          {index < activity.data.scenarios.length - 1 ? 'Next' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

// ========================================
// MATCHING GAME COMPONENT
// ========================================

const MatchingGameActivityComponent: React.FC<{
  activity: MatchingActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  // Shuffle array utility
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize shuffled options
  const [leftItems] = useState(
    activity.data.pairs.map(pair => ({ id: pair.id, text: pair.left }))
  );

  const [rightItems] = useState(() => {
    const items = activity.data.pairs.map(pair => ({ id: pair.id, text: pair.right }));
    return activity.data.shuffleOptions !== false ? shuffleArray(items) : items;
  });

  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [matchAnimations, setMatchAnimations] = useState<{ [key: string]: 'correct' | 'incorrect' | null }>({});
  const [showCelebration, setShowCelebration] = useState(false);

  // Handle selection
  const handleLeftClick = (leftId: string) => {
    if (submitted || matches[leftId]) return;
    setSelectedLeft(leftId);
  };

  const handleRightClick = (rightId: string) => {
    if (submitted || !selectedLeft) return;

    const isCorrect = selectedLeft === rightId;

    if (isCorrect) {
      // Correct match!
      setMatches(prev => ({ ...prev, [selectedLeft]: rightId }));
      setMatchAnimations(prev => ({ ...prev, [selectedLeft]: 'correct' }));

      // Check if all matched
      if (Object.keys(matches).length + 1 === activity.data.pairs.length) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }

      setTimeout(() => {
        setMatchAnimations(prev => ({ ...prev, [selectedLeft]: null }));
      }, 600);
    } else {
      // Incorrect match
      setMatchAnimations(prev => ({ ...prev, [selectedLeft]: 'incorrect' }));
      setWrongAttempts(prev => prev + 1);

      setTimeout(() => {
        setMatchAnimations(prev => ({ ...prev, [selectedLeft]: null }));
      }, 600);
    }

    setSelectedLeft(null);
  };

  const checkAnswer = () => {
    const correctMatches = Object.entries(matches).filter(
      ([leftId, rightId]) => leftId === rightId
    ).length;

    const totalPairs = activity.data.pairs.length;
    const score = Math.round((correctMatches / totalPairs) * activity.points);

    setSubmitted(true);
    onComplete(score, activity.points);
  };

  const isLeftMatched = (leftId: string) => !!matches[leftId];
  const isRightMatched = (rightId: string) => Object.values(matches).includes(rightId);

  const shouldShowHints =
    activity.data.showHints &&
    wrongAttempts >= (activity.data.hintsAfterAttempts || 2);

  const allMatched = Object.keys(matches).length === activity.data.pairs.length;

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-roofRed/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-5 h-5 text-roofRed flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">How to Play:</p>
            <p className="text-sm text-gray-700">
              Click on an item from the left column, then click on its matching pair from the right column.
              Find all correct matches!
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Matched: {Object.keys(matches).length} / {activity.data.pairs.length}
          </span>
        </div>
        {wrongAttempts > 0 && (
          <span className="text-sm text-red-600">
            {wrongAttempts} incorrect attempt{wrongAttempts > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(Object.keys(matches).length / activity.data.pairs.length) * 100}%` }}
          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Items</h4>
          {leftItems.map((item) => {
            const isMatched = isLeftMatched(item.id);
            const isSelected = selectedLeft === item.id;
            const animation = matchAnimations[item.id];

            return (
              <motion.div
                key={item.id}
                onClick={() => handleLeftClick(item.id)}
                className={`
                  relative rounded-lg p-4 cursor-pointer transition-all duration-200 border-2
                  ${isMatched
                    ? 'bg-green-50 border-green-500 cursor-default'
                    : isSelected
                      ? 'bg-purple-100 border-purple-500 shadow-lg'
                      : 'bg-white border-gray-300 hover:border-purple-400 hover:shadow-md'
                  }
                `}
                whileHover={!isMatched && !submitted ? { scale: 1.02, x: 5 } : {}}
                whileTap={!isMatched && !submitted ? { scale: 0.98 } : {}}
                animate={{
                  x: animation === 'correct' ? [0, 10, -10, 10, 0] : animation === 'incorrect' ? [0, -10, 10, -10, 0] : 0,
                  backgroundColor: animation === 'correct'
                    ? ['#ffffff', '#10b981', '#ffffff']
                    : animation === 'incorrect'
                      ? ['#ffffff', '#ef4444', '#ffffff']
                      : undefined
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {isMatched ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </motion.div>
                    ) : isSelected ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center">
                        <span className="text-xs text-gray-500">{leftItems.indexOf(item) + 1}</span>
                      </div>
                    )}
                  </div>
                  <p className={`flex-1 font-medium ${isMatched ? 'text-green-900' : 'text-gray-900'}`}>
                    {item.text}
                  </p>
                </div>

                {/* Hint indicator */}
                {shouldShowHints && !isMatched && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-1 right-1"
                  >
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Matches</h4>
          {rightItems.map((item) => {
            const isMatched = isRightMatched(item.id);
            const canSelect = !isMatched && selectedLeft !== null;

            return (
              <motion.div
                key={item.id}
                onClick={() => handleRightClick(item.id)}
                className={`
                  rounded-lg p-4 transition-all duration-200 border-2
                  ${isMatched
                    ? 'bg-green-50 border-green-500 cursor-default'
                    : canSelect
                      ? 'bg-purple-50 border-purple-300 hover:border-purple-500 hover:shadow-md cursor-pointer'
                      : 'bg-gray-50 border-gray-300 cursor-not-allowed opacity-60'
                  }
                `}
                whileHover={canSelect && !submitted ? { scale: 1.02, x: -5 } : {}}
                whileTap={canSelect && !submitted ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {isMatched ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </motion.div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-400" />
                    )}
                  </div>
                  <p className={`flex-1 font-medium ${isMatched ? 'text-green-900' : 'text-gray-900'}`}>
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Hints section */}
      {shouldShowHints && !allMatched && !submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4"
        >
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 mb-2">Need a hint?</p>
              <p className="text-sm text-gray-700">
                Look carefully at the meaning and context of each item. Take your time to think about the connections!
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-8 shadow-2xl"
            >
              <Trophy className="w-20 h-20 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      {allMatched && !submitted && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={checkAnswer}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Trophy className="w-6 h-6" />
          <span className="text-lg">Complete and Submit!</span>
          <Sparkles className="w-6 h-6" />
        </motion.button>
      )}

      {/* Shuffle Button (only if not all matched) */}
      {!allMatched && !submitted && Object.keys(matches).length === 0 && (
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
        >
          <Shuffle className="w-5 h-5" />
          <span>Restart Game</span>
        </button>
      )}

      {/* Results Summary */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-indigo-300 rounded-lg p-6"
        >
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-indigo-600" />
            Your Results
          </h4>
          <div className="space-y-2">
            {activity.data.pairs.map(pair => {
              const userMatched = matches[pair.id] === pair.id;
              return (
                <div
                  key={pair.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    userMatched ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {userMatched ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium text-gray-900">{pair.left}</span>
                  </div>
                  <span className="text-gray-700">=</span>
                  <span className="font-medium text-gray-900">{pair.right}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveLearningActivity;
