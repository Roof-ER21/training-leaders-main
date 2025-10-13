/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Lightbulb,
  Trophy,
  RotateCcw,
  Brain,
  Sparkles,
  
  Award,
  Flame,
  Clock,
} from 'lucide-react';

// ========================================
// TYPES & INTERFACES
// ========================================

export interface FlashcardActivity {
  id: string;
  title: string;
  description: string;
  type: 'flashcards';
  points: number;
  agnesTip?: string;
  data: {
    cards: Array<{
      id: string;
      front: string;
      back: string;
      category?: string;
      difficulty?: 'easy' | 'medium' | 'hard';
    }>;
    studyMode?: 'sequential' | 'random' | 'spaced-repetition';
  };
}

export interface QuickQuizActivity {
  id: string;
  title: string;
  description: string;
  type: 'quick-quiz';
  points: number;
  agnesTip?: string;
  data: {
    questions: Array<{
      id: string;
      question: string;
      answer: string;
      options?: string[];
      explanation?: string;
      agnesHint?: string;
    }>;
    timeLimit?: number; // seconds per question
    passingScore?: number;
  };
}

export interface ConceptMatchingActivity {
  id: string;
  title: string;
  description: string;
  type: 'concept-matching';
  points: number;
  agnesTip?: string;
  data: {
    pairs: Array<{
      id: string;
      concept: string;
      definition: string;
      category?: string;
    }>;
    timeLimit?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
  };
}

export interface TrueFalseChallengeActivity {
  id: string;
  title: string;
  description: string;
  type: 'true-false-challenge';
  points: number;
  agnesTip?: string;
  data: {
    statements: Array<{
      id: string;
      statement: string;
      isTrue: boolean;
      explanation: string;
      agnesFeedback?: string;
    }>;
    rapidFire?: boolean;
    timePerQuestion?: number;
  };
}

export interface MemoryGameActivity {
  id: string;
  title: string;
  description: string;
  type: 'memory-game';
  points: number;
  agnesTip?: string;
  data: {
    items: Array<{
      id: string;
      content: string;
      pairId: string;
      category?: string;
    }>;
    gridSize?: '4x4' | '4x5' | '6x6';
    timeLimit?: number;
  };
}

export type KnowledgeActivity =
  | FlashcardActivity
  | QuickQuizActivity
  | ConceptMatchingActivity
  | TrueFalseChallengeActivity
  | MemoryGameActivity;

interface AgnesKnowledgeActivitiesProps {
  activity: KnowledgeActivity;
  onComplete: (score: number, totalPoints: number) => void;
  onRetry?: () => void;
}

// ========================================
// MAIN COMPONENT
// ========================================

const AgnesKnowledgeActivities: React.FC<AgnesKnowledgeActivitiesProps> = ({
  activity,
  onComplete,
  onRetry,
}) => {
  
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const renderActivity = () => {
    switch (activity.type) {
      case 'flashcards':
        return (
          <FlashcardsComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'quick-quiz':
        return (
          <QuickQuizComponent activity={activity} onComplete={handleComplete} />
        );
      case 'concept-matching':
        return (
          <ConceptMatchingComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'true-false-challenge':
        return (
          <TrueFalseChallengeComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      case 'memory-game':
        return (
          <MemoryGameComponent
            activity={activity}
            onComplete={handleComplete}
          />
        );
      default:
        return <div>Unknown activity type</div>;
    }
  };

  const handleComplete = (earnedScore: number, totalPoints: number) => {
    setScore(earnedScore);
    setShowFeedback(true);
    onComplete(earnedScore, totalPoints);
  };

  const handleRetry = () => {
    setShowFeedback(false);
    setScore(0);
    if (onRetry) onRetry();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
            <p className="text-indigo-100">{activity.description}</p>
          </div>
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <Brain className="w-5 h-5" />
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
              <div className="text-center mb-4">
                {score >= activity.points * 0.8 ? (
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
                ) : (
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {score >= activity.points * 0.8
                    ? 'Knowledge Mastered!'
                    : 'Good Progress!'}
                </h3>

                <p className="text-gray-600 mb-4">
                  You earned{' '}
                  <span className="font-bold text-roofRed">{score}</span> out
                  of <span className="font-bold">{activity.points}</span> points
                </p>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / activity.points) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                  />
                </div>
              </div>

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
// FLASHCARDS COMPONENT
// ========================================

const FlashcardsComponent: React.FC<{
  activity: FlashcardActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [needsReview, setNeedsReview] = useState<Set<string>>(new Set());
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentCard = activity.data.cards[currentIndex];
  const totalCards = activity.data.cards.length;

  const handleKnow = () => {
    setKnownCards(prev => new Set(prev).add(currentCard.id));
    nextCard();
  };

  const handleReview = () => {
    setNeedsReview(prev => new Set(prev).add(currentCard.id));
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      const score = Math.round(
        (knownCards.size / totalCards) * activity.points
      );
      setSessionComplete(true);
      onComplete(score, activity.points);
    }
  };

  return (
    <div className="space-y-6">
      {!sessionComplete ? (
        <>
          {/* Progress */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Card {currentIndex + 1} of {totalCards}
            </span>
            <div className="flex items-center space-x-4">
              <span className="text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                {knownCards.size} known
              </span>
              <span className="text-orange-600 flex items-center">
                <RotateCcw className="w-4 h-4 mr-1" />
                {needsReview.size} review
              </span>
            </div>
          </div>

          {/* Flashcard */}
          <motion.div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative h-64 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl border-2 border-indigo-300 p-8 flex items-center justify-center"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  {currentCard.front}
                </p>
                <p className="text-sm text-indigo-600">Click to flip</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300 p-8 flex items-center justify-center"
              animate={{ rotateY: isFlipped ? 0 : -180 }}
              transition={{ duration: 0.6 }}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center" style={{ transform: 'rotateY(180deg)' }}>
                <p className="text-xl text-gray-900">{currentCard.back}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Actions */}
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-4"
            >
              <button
                onClick={handleReview}
                className="flex-1 bg-orange-100 text-orange-700 py-3 rounded-lg font-semibold hover:bg-orange-200 transition-colors"
              >
                Need Review
              </button>
              <button
                onClick={handleKnow}
                className="flex-1 bg-green-100 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-200 transition-colors"
              >
                I Know This
              </button>
            </motion.div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Flashcard Session Complete!
          </h3>
          <p className="text-gray-600">
            You knew {knownCards.size} out of {totalCards} cards
          </p>
        </div>
      )}
    </div>
  );
};

// ========================================
// QUICK QUIZ COMPONENT
// ========================================

const QuickQuizComponent: React.FC<{
  activity: QuickQuizActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(activity.data.timeLimit || 300);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = activity.data.questions[currentIndex];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const submitQuiz = () => {
    let correct = 0;
    activity.data.questions.forEach(q => {
      if (userAnswers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
        correct++;
      }
    });

    const score = Math.round(
      (correct / activity.data.questions.length) * activity.points
    );
    setQuizComplete(true);
    onComplete(score, activity.points);
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    if (currentIndex < activity.data.questions.length - 1) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 500);
    } else {
      setTimeout(() => submitQuiz(), 500);
    }
  };

  return (
    <div className="space-y-6">
      {!quizComplete ? (
        <>
          {/* Timer and Progress */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Question {currentIndex + 1} of {activity.data.questions.length}
            </span>
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <p className="text-xl font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </p>
            {currentQuestion.agnesHint && (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm text-gray-700 flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <span>{currentQuestion.agnesHint}</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options ? (
              currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 bg-white border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-lg transition-all"
                >
                  {option}
                </button>
              ))
            ) : (
              <input
                type="text"
                placeholder="Type your answer..."
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    handleAnswer((e.target as HTMLInputElement).value);
                  }
                }}
                className="w-full p-4 border-2 border-gray-200 focus:border-indigo-400 rounded-lg"
              />
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <Award className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h3>
        </div>
      )}
    </div>
  );
};

// ========================================
// CONCEPT MATCHING COMPONENT
// ========================================

const ConceptMatchingComponent: React.FC<{
  activity: ConceptMatchingActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [completed, setCompleted] = useState(false);

  const shuffledDefinitions = [...activity.data.pairs].sort(
    () => Math.random() - 0.5
  );

  const handleMatch = (defId: string) => {
    if (!selectedConcept) return;

    const pair = activity.data.pairs.find(p => p.id === selectedConcept);
    if (pair && pair.definition === defId) {
      setMatches(prev => ({ ...prev, [selectedConcept]: defId }));
      setSelectedConcept(null);

      if (Object.keys(matches).length + 1 === activity.data.pairs.length) {
        setTimeout(() => {
          setCompleted(true);
          onComplete(activity.points, activity.points);
        }, 500);
      }
    } else {
      setSelectedConcept(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 font-medium">
          Click a concept, then click its matching definition. Get all pairs correct!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Concepts Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm">Concepts</h4>
          {activity.data.pairs.map(pair => (
            <button
              key={pair.id}
              onClick={() => setSelectedConcept(pair.id)}
              disabled={!!matches[pair.id]}
              className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                matches[pair.id]
                  ? 'bg-green-100 text-green-800 border-2 border-green-400'
                  : selectedConcept === pair.id
                    ? 'bg-indigo-200 text-indigo-900 border-2 border-indigo-500'
                    : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
              }`}
            >
              {pair.concept}
            </button>
          ))}
        </div>

        {/* Definitions Column */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm">Definitions</h4>
          {shuffledDefinitions.map(pair => (
            <button
              key={pair.definition}
              onClick={() => handleMatch(pair.definition)}
              disabled={Object.values(matches).includes(pair.definition)}
              className={`w-full p-4 rounded-lg text-left text-sm transition-all ${
                Object.values(matches).includes(pair.definition)
                  ? 'bg-green-100 text-green-800 border-2 border-green-400'
                  : 'bg-white border-2 border-gray-200 hover:border-indigo-300'
              }`}
            >
              {pair.definition}
            </button>
          ))}
        </div>
      </div>

      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center"
        >
          <Sparkles className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900">Perfect Match!</h3>
          <p className="text-gray-600">All concepts matched correctly</p>
        </motion.div>
      )}
    </div>
  );
};

// ========================================
// TRUE/FALSE CHALLENGE COMPONENT
// ========================================

const TrueFalseChallengeComponent: React.FC<{
  activity: TrueFalseChallengeActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);

  const currentStatement = activity.data.statements[currentIndex];

  const handleAnswer = (answer: boolean) => {
    const correct = answer === currentStatement.isTrue;
    setLastCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setCorrectCount(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(Math.max(maxStreak, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < activity.data.statements.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        const score = Math.round(
          (correctCount / activity.data.statements.length) * activity.points
        );
        onComplete(score, activity.points);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Streak Display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-semibold text-gray-700">
            Streak: {streak} (Max: {maxStreak})
          </span>
        </div>
        <span className="text-sm text-gray-600">
          {currentIndex + 1} of {activity.data.statements.length}
        </span>
      </div>

      {/* Statement */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-roofRed/30">
        <p className="text-2xl font-bold text-gray-900 text-center">
          {currentStatement.statement}
        </p>
      </div>

      {/* True/False Buttons */}
      {!showFeedback ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 rounded-xl text-xl transition-all transform hover:scale-105"
          >
            TRUE
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 rounded-xl text-xl transition-all transform hover:scale-105"
          >
            FALSE
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-6 border-2 ${
            lastCorrect
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}
        >
          <div className="flex items-center space-x-3 mb-3">
            {lastCorrect ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <h4 className="text-xl font-bold">
              {lastCorrect ? 'Correct!' : 'Not quite!'}
            </h4>
          </div>
          <p className="text-gray-700">{currentStatement.explanation}</p>
          {currentStatement.agnesFeedback && (
            <div className="mt-3 bg-white bg-opacity-50 rounded-lg p-3 text-sm">
              <span className="font-semibold">Agnes says: </span>
              {currentStatement.agnesFeedback}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// ========================================
// MEMORY GAME COMPONENT
// ========================================

const MemoryGameComponent: React.FC<{
  activity: MemoryGameActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [firstCard, setFirstCard] = useState<string | null>(null);
  const [moves, setMoves] = useState(0);

  const handleCardClick = (id: string) => {
    if (flipped.has(id) || matched.has(id)) return;

    const newFlipped = new Set(flipped);
    newFlipped.add(id);
    setFlipped(newFlipped);

    if (!firstCard) {
      setFirstCard(id);
    } else {
      setMoves(prev => prev + 1);
      const firstItem = activity.data.items.find(i => i.id === firstCard);
      const secondItem = activity.data.items.find(i => i.id === id);

      if (firstItem?.pairId === secondItem?.pairId) {
        setMatched(prev => new Set(prev).add(firstCard).add(id));
        setFirstCard(null);

        if (matched.size + 2 === activity.data.items.length) {
          const score = Math.max(
            activity.points - Math.floor(moves / 2),
            activity.points / 2
          );
          setTimeout(() => onComplete(score, activity.points), 500);
        }
      } else {
        setTimeout(() => {
          setFlipped(new Set());
          setFirstCard(null);
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Moves: {moves}</span>
        <span className="text-sm text-gray-600">
          Matched: {matched.size / 2} / {activity.data.items.length / 2}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {activity.data.items.map(item => (
          <motion.button
            key={item.id}
            onClick={() => handleCardClick(item.id)}
            whileHover={{ scale: matched.has(item.id) ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square rounded-xl flex items-center justify-center text-center p-4 font-semibold transition-all ${
              matched.has(item.id)
                ? 'bg-green-500 text-white'
                : flipped.has(item.id)
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-400'
            }`}
          >
            {flipped.has(item.id) || matched.has(item.id) ? item.content : '?'}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default AgnesKnowledgeActivities;
