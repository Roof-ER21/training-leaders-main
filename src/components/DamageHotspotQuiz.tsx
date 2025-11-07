import React, { useState, useEffect, useRef } from 'react';

interface Hotspot {
  x: number;
  y: number;
  radius: number;
}

interface QuizQuestion {
  questionNumber: number;
  damageType: 'hail' | 'wind' | 'mixed';
  title: string;
  instruction: string;
  imageSrc: string;
  hotspots: string; // Format: "x,y,radius;x,y,radius;..."
  totalSpots: number;
  hint: string;
}

interface DamageHotspotQuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, totalPossible: number) => void;
}

interface Marker {
  id: string;
  x: number;
  y: number;
  type: 'correct' | 'incorrect' | 'duplicate';
}

const DamageHotspotQuiz: React.FC<DamageHotspotQuizProps> = ({
  questions,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foundHotspots, setFoundHotspots] = useState<Set<string>>(new Set());
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const foundCount = Array.from(foundHotspots).filter((id) =>
    id.startsWith(`q${currentQuestion.questionNumber}-`)
  ).length;

  // Parse hotspots from string format
  const parseHotspots = (hotspotsData: string): Hotspot[] => {
    return hotspotsData.split(';').map((spot) => {
      const [x, y, radius] = spot.split(',').map(Number);
      return { x, y, radius };
    });
  };

  // Calculate distance between two points
  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // Handle image click
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || isComplete) return;

    const rect = imageRef.current.getBoundingClientRect();
    const clickX = ((event.clientX - rect.left) / rect.width) * 100;
    const clickY = ((event.clientY - rect.top) / rect.height) * 100;

    const hotspots = parseHotspots(currentQuestion.hotspots);

    // Check if click is within any hotspot
    let hitHotspotIndex = -1;
    for (let i = 0; i < hotspots.length; i++) {
      const hotspot = hotspots[i];
      const distance = calculateDistance(clickX, clickY, hotspot.x, hotspot.y);

      if (distance <= hotspot.radius) {
        hitHotspotIndex = i;
        break;
      }
    }

    const hotspotId = `q${currentQuestion.questionNumber}-spot${hitHotspotIndex}`;

    if (hitHotspotIndex >= 0) {
      if (foundHotspots.has(hotspotId)) {
        // Already found - show duplicate marker
        const markerId = `duplicate-${Date.now()}`;
        setMarkers((prev) => [
          ...prev,
          { id: markerId, x: clickX, y: clickY, type: 'duplicate' },
        ]);

        // Remove duplicate marker after 1 second
        setTimeout(() => {
          setMarkers((prev) => prev.filter((m) => m.id !== markerId));
        }, 1000);
      } else {
        // Correct hit - add to found hotspots
        setFoundHotspots((prev) => new Set([...prev, hotspotId]));
        setMarkers((prev) => [
          ...prev,
          { id: hotspotId, x: clickX, y: clickY, type: 'correct' },
        ]);

        // Check if all spots found for this question
        const newFoundCount = foundCount + 1;
        if (newFoundCount >= currentQuestion.totalSpots) {
          setTimeout(() => {
            alert(
              `🎉 Excellent! You found all ${currentQuestion.totalSpots} damage spots!`
            );
          }, 300);
        }
      }
    } else {
      // Incorrect - add red X marker
      const markerId = `incorrect-${Date.now()}`;
      setMarkers((prev) => [
        ...prev,
        { id: markerId, x: clickX, y: clickY, type: 'incorrect' },
      ]);

      // Remove incorrect marker after 1.5 seconds
      setTimeout(() => {
        setMarkers((prev) => prev.filter((m) => m.id !== markerId));
      }, 1500);
    }
  };

  // Reset current question
  const handleReset = () => {
    // Clear markers and found hotspots for current question
    const questionPrefix = `q${currentQuestion.questionNumber}-`;
    setFoundHotspots((prev) => {
      const updated = new Set(prev);
      Array.from(updated).forEach((id) => {
        if (id.startsWith(questionPrefix)) {
          updated.delete(id);
        }
      });
      return updated;
    });
    setMarkers((prev) =>
      prev.filter((m) => !m.id.startsWith(questionPrefix))
    );
    setShowHint(false);
  };

  // Go to next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowHint(false);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Complete quiz
  const handleComplete = () => {
    const total = questions.reduce((sum, q) => sum + q.totalSpots, 0);
    const score = foundHotspots.size;
    setTotalScore(score);
    setIsComplete(true);

    if (onComplete) {
      onComplete(score, total);
    }
  };

  // Restart quiz
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setFoundHotspots(new Set());
    setMarkers([]);
    setShowHint(false);
    setIsComplete(false);
    setTotalScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get performance feedback
  const getPerformanceFeedback = (): string => {
    const total = questions.reduce((sum, q) => sum + q.totalSpots, 0);
    const percentage = (totalScore / total) * 100;

    if (percentage === 100) {
      return '🏆 Perfect score! You have an excellent eye for damage identification!';
    } else if (percentage >= 80) {
      return '🌟 Great job! You identified most of the damage accurately!';
    } else if (percentage >= 60) {
      return '👍 Good effort! Review the images again to improve your damage recognition skills.';
    } else {
      return '📚 Keep practicing! Review the damage type descriptions and try again.';
    }
  };

  // Check if current question is complete
  const isQuestionComplete = foundCount >= currentQuestion.totalSpots;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (isComplete) {
    const total = questions.reduce((sum, q) => sum + q.totalSpots, 0);
    return (
      <div id="quiz-complete-message" className="my-8">
        <div className="success-banner">
          <h3>🎉 Congratulations!</h3>
          <p>You've completed the Damage Identification Challenge!</p>
          <p className="final-score">
            Your Score: <span id="final-score">{totalScore}</span> /{' '}
            <span id="total-possible">{total}</span>
          </p>
          <p className="performance-feedback">{getPerformanceFeedback()}</p>
          <button
            className="btn-restart-quiz"
            onClick={handleRestart}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="hotspot-quiz-container" className="my-8">
      <div
        className="hotspot-quiz-question"
        data-question={currentQuestion.questionNumber}
        data-damage-type={currentQuestion.damageType}
      >
        <h3>{currentQuestion.title}</h3>
        <p className="quiz-instruction">{currentQuestion.instruction}</p>

        <div className="quiz-image-container">
          <img
            ref={imageRef}
            src={currentQuestion.imageSrc}
            alt="Roof damage identification"
            className="clickable-quiz-image"
            onClick={handleImageClick}
            data-hotspots={currentQuestion.hotspots}
            data-total-spots={currentQuestion.totalSpots}
          />
          <div className="hotspot-markers">
            {markers
              .filter((m) =>
                m.id.startsWith(`q${currentQuestion.questionNumber}-`)
              )
              .map((marker) => (
                <div
                  key={marker.id}
                  className={`hotspot-marker ${marker.type}`}
                  style={{
                    left: `${marker.x}%`,
                    top: `${marker.y}%`,
                  }}
                  data-hotspot-id={marker.id}
                >
                  {marker.type === 'correct' && '✓'}
                  {marker.type === 'incorrect' && '✗'}
                  {marker.type === 'duplicate' && '⟳'}
                </div>
              ))}
          </div>
        </div>

        <div className="quiz-feedback">
          <p className="quiz-score">
            Found: <span className="found-count">{foundCount}</span> /{' '}
            <span className="total-count">{currentQuestion.totalSpots}</span>
          </p>
          {showHint && (
            <p className="quiz-hint">💡 Hint: {currentQuestion.hint}</p>
          )}
          <div className="quiz-actions">
            <button className="btn-hint" onClick={() => setShowHint(!showHint)}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <button className="btn-reset" onClick={handleReset}>
              Try Again
            </button>
            {isQuestionComplete && !isLastQuestion && (
              <button className="btn-next" onClick={handleNext}>
                Next Challenge →
              </button>
            )}
            {isQuestionComplete && isLastQuestion && (
              <button className="btn-complete" onClick={handleComplete}>
                Complete Quiz 🎉
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamageHotspotQuiz;
