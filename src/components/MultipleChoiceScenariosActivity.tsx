import React, { useMemo, useState } from 'react';

interface ScenarioItem {
  situation?: string;
  question?: string;
  prompt?: string;
  options: string[];
  correctAnswer: number | string; // index or value
  explanation?: string;
}

interface MultipleChoiceScenariosActivityProps {
  activity: {
    id: string;
    title: string;
    description?: string;
    points: number;
    data: {
      scenarios: ScenarioItem[];
    };
  };
  onComplete: (score: number, totalPoints: number) => void;
}

const MultipleChoiceScenariosActivity: React.FC<MultipleChoiceScenariosActivityProps> = ({ activity, onComplete }) => {
  const scenarios = activity.data.scenarios || [];
  const [answers, setAnswers] = useState<Array<number | null>>(Array(scenarios.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const prompts = useMemo(() => {
    return scenarios.map(s => {
      if (s.prompt) return s.prompt;
      const parts = [s.situation, s.question].filter(Boolean);
      return parts.join('\n');
    });
  }, [scenarios]);

  const isCorrect = (idx: number): boolean => {
    const scenario = scenarios[idx];
    const ans = answers[idx];
    if (ans == null) return false;
    if (typeof scenario.correctAnswer === 'number') {
      return ans === scenario.correctAnswer;
    }
    const val = scenario.options[ans] || '';
    return val === scenario.correctAnswer;
  };

  const handleSelect = (scenarioIndex: number, optionIndex: number) => {
    if (submitted) return;
    const next = [...answers];
    next[scenarioIndex] = optionIndex;
    setAnswers(next);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    scenarios.forEach((_, i) => {
      if (isCorrect(i)) correctCount += 1;
    });
    const earned = Math.round((correctCount / Math.max(1, scenarios.length)) * activity.points);
    setSubmitted(true);
    onComplete(earned, activity.points);
  };

  return (
    <div className="multiple-choice-scenarios-activity space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900">Scenario Quiz</h3>
        <p className="text-sm text-blue-800">Read each scenario and select the best answer.</p>
      </div>

      {scenarios.map((scenario, index) => (
        <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-4">
          <div className="mb-3">
            <p className="font-semibold text-gray-900 whitespace-pre-wrap">{prompts[index]}</p>
          </div>
          <div className="space-y-2">
            {scenario.options.map((opt, optIndex) => {
              const selected = answers[index] === optIndex;
              const correct = submitted && typeof scenario.correctAnswer === 'number' ? optIndex === scenario.correctAnswer : submitted && typeof scenario.correctAnswer !== 'number' ? opt === scenario.correctAnswer : false;
              return (
                <label
                  key={optIndex}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                    submitted
                      ? correct
                        ? 'bg-green-50 border-green-500'
                        : selected
                          ? 'bg-red-50 border-red-500'
                          : 'bg-gray-50 border-gray-200'
                      : selected
                        ? 'bg-purple-50 border-purple-500'
                        : 'bg-white border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`scenario-${index}`}
                    className="mr-3"
                    checked={selected}
                    onChange={() => handleSelect(index, optIndex)}
                    aria-label={opt}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
          {submitted && scenario.explanation && (
            <p className="mt-3 text-sm text-gray-700">
              <strong>Explanation:</strong> {scenario.explanation}
            </p>
          )}
        </div>
      ))}

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={answers.some(a => a == null)}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit Answers
        </button>
      )}
    </div>
  );
};

export default MultipleChoiceScenariosActivity;

