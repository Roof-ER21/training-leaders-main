import React, { useState, useEffect, useCallback } from 'react';

interface LiveFeedbackPanelProps {
  userResponse: string;
  expectedKeyPoints: string[];
  rubricKeywords?: string[];
  passThreshold?: number;
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

interface ScoreResult {
  score: number;
  matchedPoints: string[];
}

type ToneType = 'positive' | 'neutral' | 'negative';

const LiveFeedbackPanel: React.FC<LiveFeedbackPanelProps> = ({
  userResponse,
  expectedKeyPoints,
  rubricKeywords = [],
  passThreshold = 70,
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
}) => {
  const [score, setScore] = useState(0);
  const [matchedPoints, setMatchedPoints] = useState<string[]>([]);
  const [tone, setTone] = useState<ToneType>('neutral');
  const [confidence, setConfidence] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Determine if we're using controlled or uncontrolled collapse state
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  // Load collapse preference from localStorage on mount
  useEffect(() => {
    if (controlledCollapsed === undefined) {
      const savedState = localStorage.getItem('live-feedback-panel-collapsed');
      if (savedState === 'true') {
        setInternalCollapsed(true);
      }
    }
  }, [controlledCollapsed]);

  // Analyze tone of response
  const analyzeTone = useCallback((text: string): ToneType => {
    const lowerText = text.toLowerCase();

    const positiveWords = [
      'great', 'excellent', 'wonderful', 'happy', 'glad',
      'appreciate', 'thank', 'perfect', 'absolutely', 'understand', 'help'
    ];
    const negativeWords = [
      'no', 'not', 'never', "can't", "won't", "don't",
      'bad', 'unfortunately', 'problem', 'issue'
    ];

    let positiveCount = 0;
    let negativeCount = 0;

    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveCount++;
    });

    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeCount++;
    });

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }, []);

  // Analyze confidence level based on language patterns
  const analyzeConfidence = useCallback((text: string): number => {
    let confidenceScore = 50; // Base confidence

    const lowerText = text.toLowerCase();

    // Confident language increases score
    const confidentPhrases = [
      'i can', 'i will', 'absolutely', 'definitely', 'certainly',
      'guarantee', 'ensure'
    ];
    confidentPhrases.forEach(phrase => {
      if (lowerText.includes(phrase)) confidenceScore += 5;
    });

    // Weak language decreases score
    const weakPhrases = [
      'maybe', 'might', 'perhaps', 'i think', 'possibly',
      'i guess', 'kind of', 'sort of'
    ];
    weakPhrases.forEach(phrase => {
      if (lowerText.includes(phrase)) confidenceScore -= 5;
    });

    // Good length indicates confidence
    const words = text.split(/\s+/).length;
    if (words >= 50 && words <= 150) {
      confidenceScore += 10;
    } else if (words < 30) {
      confidenceScore -= 10;
    } else if (words > 200) {
      confidenceScore -= 5;
    }

    return Math.max(0, Math.min(100, confidenceScore));
  }, []);

  // Score the response
  const scoreResponse = useCallback((
    response: string,
    keyPoints: string[],
    keywords: string[]
  ): ScoreResult => {
    const lowerResponse = response.toLowerCase();
    const matched: string[] = [];

    // Check which key points were addressed
    keyPoints.forEach(point => {
      const pointKeywords = point
        .toLowerCase()
        .split(' ')
        .filter(word => word.length > 3);

      const isMatched = pointKeywords.some(keyword =>
        lowerResponse.includes(keyword)
      );

      if (isMatched) {
        matched.push(point);
      }
    });

    // Calculate score based on matched key points
    const keyPointScore = keyPoints.length > 0
      ? (matched.length / keyPoints.length) * 70
      : 0;

    // Bonus points for rubric keywords
    let keywordScore = 0;
    if (keywords.length > 0) {
      const matchedKeywords = keywords.filter(keyword =>
        lowerResponse.includes(keyword.toLowerCase())
      );
      keywordScore = (matchedKeywords.length / keywords.length) * 30;
    }

    const finalScore = Math.min(100, Math.round(keyPointScore + keywordScore));

    return {
      score: finalScore,
      matchedPoints: matched,
    };
  }, []);

  // Update all metrics when user response changes
  useEffect(() => {
    if (!userResponse.trim()) {
      // Reset to initial state if empty
      setScore(0);
      setMatchedPoints([]);
      setTone('neutral');
      setConfidence(0);
      setWordCount(0);
      return;
    }

    // Calculate metrics
    const scoreResult = scoreResponse(userResponse, expectedKeyPoints, rubricKeywords);
    setScore(scoreResult.score);
    setMatchedPoints(scoreResult.matchedPoints);
    setTone(analyzeTone(userResponse));
    setConfidence(analyzeConfidence(userResponse));
    setWordCount(userResponse.split(/\s+/).length);
  }, [userResponse, expectedKeyPoints, rubricKeywords, scoreResponse, analyzeTone, analyzeConfidence]);

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;

    if (onToggleCollapse) {
      onToggleCollapse(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
      localStorage.setItem('live-feedback-panel-collapsed', String(newCollapsed));
    }
  };

  const getScoreClass = () => {
    if (score < 70) return 'score-low';
    if (score < 85) return 'score-medium';
    return 'score-high';
  };

  const getToneLabel = () => {
    const labels = {
      positive: 'Positive & Professional',
      neutral: 'Neutral',
      negative: 'Needs Improvement'
    };
    return labels[tone];
  };

  return (
    <div className={`live-feedback-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="panel-header">
        <h3>Live Feedback</h3>
        <button
          className="panel-toggle-btn"
          onClick={handleToggleCollapse}
          aria-label={isCollapsed ? 'Expand panel' : 'Collapse panel'}
        >
          {isCollapsed ? '+' : '−'}
        </button>
      </div>

      <div className="panel-content">
        {/* Live Score Circle */}
        <div className="live-score-display">
          <div className={`live-score-circle ${getScoreClass()}`} id="live-score-circle">
            {Math.round(score)}
          </div>
          <div className="score-label">Current Score</div>
        </div>

        {/* Key Points Checklist */}
        <div className="key-points-live">
          <h4>
            <span>✓</span>
            Key Points
          </h4>
          <ul className="points-list" id="live-key-points">
            {expectedKeyPoints.map((point, index) => {
              const isMatched = matchedPoints.some(mp =>
                point.toLowerCase().includes(mp.toLowerCase()) ||
                mp.toLowerCase().includes(point.toLowerCase())
              );

              return (
                <li
                  key={index}
                  className={`point-item ${isMatched ? 'matched' : 'missing'}`}
                  data-point={point}
                >
                  <span className="point-icon">
                    {isMatched ? '✓' : '○'}
                  </span>
                  <span>{point}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tone Indicator */}
        <div className="tone-indicator">
          <h4>Tone</h4>
          <div className="tone-bar-container">
            <div className={`tone-bar ${tone}`} id="tone-bar">
              {getToneLabel()}
            </div>
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="confidence-meter">
          <h4>Confidence Level</h4>
          <div className="confidence-bar-container">
            <div
              className="confidence-bar"
              id="confidence-bar"
              style={{ width: `${confidence}%` }}
              data-confidence={confidence}
            />
          </div>
        </div>

        {/* Word Count */}
        <div className="word-count-indicator">
          Words: <strong id="live-word-count">{wordCount}</strong>
        </div>
      </div>
    </div>
  );
};

export default LiveFeedbackPanel;
