import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Calculator,
  Camera,
  Clipboard,
  DollarSign,
  Target,
  FileText,
  Lightbulb,
} from 'lucide-react';

// ========================================
// TYPES & INTERFACES
// ========================================

export interface EstimationCalculatorActivity {
  id: string;
  title: string;
  description: string;
  type: 'estimation-calculator';
  points: number;
  agnesTip?: string;
  data: {
    calculationType: 'roof-measurement' | 'material-estimate' | 'labor-cost' | 'total-project';
    inputs: Array<{
      id: string;
      label: string;
      type: 'number' | 'select' | 'range';
      unit?: string;
      min?: number;
      max?: number;
      default?: number;
      options?: string[];
      helpText?: string;
    }>;
    formulas: Array<{
      name: string;
      formula: string;
      display: string;
    }>;
    targetResult?: {
      value: number;
      tolerance: number;
      unit: string;
    };
  };
}

export interface DamageAssessmentActivity {
  id: string;
  title: string;
  description: string;
  type: 'damage-assessment';
  points: number;
  agnesTip?: string;
  data: {
    scenario: string;
    assessmentCriteria: Array<{
      id: string;
      criterion: string;
      options: Array<{
        value: string;
        isCorrect: boolean;
        feedback: string;
      }>;
    }>;
    photoAnalysis?: {
      imageUrl: string;
      damageIndicators: string[];
    };
  };
}

export interface PhotoAnalysisActivity {
  id: string;
  title: string;
  description: string;
  type: 'photo-analysis';
  points: number;
  agnesTip?: string;
  data: {
    images: Array<{
      id: string;
      imageUrl: string;
      description: string;
      questions: Array<{
        question: string;
        correctAnswer: string;
        options?: string[];
        pointsOfInterest?: Array<{
          x: number;
          y: number;
          label: string;
        }>;
      }>;
    }>;
  };
}

export interface PriceQuoteExerciseActivity {
  id: string;
  title: string;
  description: string;
  type: 'price-quote-exercise';
  points: number;
  agnesTip?: string;
  data: {
    customerScenario: string;
    projectDetails: {
      roofSize: number;
      pitchFactor: number;
      materialType: string;
      complexity: 'simple' | 'moderate' | 'complex';
    };
    costFactors: {
      materialCostPerSq: number;
      laborCostPerSq: number;
      permitFees: number;
      disposalCost: number;
      profitMargin: number;
    };
    expectedRange: {
      min: number;
      max: number;
    };
  };
}

export interface WorkflowSimulatorActivity {
  id: string;
  title: string;
  description: string;
  type: 'workflow-simulator';
  points: number;
  agnesTip?: string;
  data: {
    workflowSteps: Array<{
      id: string;
      step: string;
      correctOrder: number;
      duration: string;
      dependencies?: string[];
      tips: string[];
    }>;
    scenario: string;
    timeLimit?: number;
  };
}

export type SkillBuildingActivity =
  | EstimationCalculatorActivity
  | DamageAssessmentActivity
  | PhotoAnalysisActivity
  | PriceQuoteExerciseActivity
  | WorkflowSimulatorActivity;

interface AgnesSkillBuildersProps {
  activity: SkillBuildingActivity;
  onComplete: (score: number, totalPoints: number) => void;
  onRetry?: () => void;
}

// ========================================
// MAIN COMPONENT
// ========================================

const AgnesSkillBuilders: React.FC<AgnesSkillBuildersProps> = ({
  activity,
  onComplete,
  onRetry,
}) => {
  const renderActivity = () => {
    switch (activity.type) {
      case 'estimation-calculator':
        return (
          <EstimationCalculatorComponent
            activity={activity}
            onComplete={onComplete}
          />
        );
      case 'damage-assessment':
        return (
          <DamageAssessmentComponent
            activity={activity}
            onComplete={onComplete}
          />
        );
      case 'photo-analysis':
        return (
          <PhotoAnalysisComponent activity={activity} onComplete={onComplete} />
        );
      case 'price-quote-exercise':
        return (
          <PriceQuoteExerciseComponent
            activity={activity}
            onComplete={onComplete}
          />
        );
      case 'workflow-simulator':
        return (
          <WorkflowSimulatorComponent
            activity={activity}
            onComplete={onComplete}
          />
        );
      default:
        return <div>Unknown activity type</div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
            <p className="text-emerald-100">{activity.description}</p>
          </div>
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <Target className="w-5 h-5" />
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
    </div>
  );
};

// ========================================
// ESTIMATION CALCULATOR COMPONENT
// ========================================

const EstimationCalculatorComponent: React.FC<{
  activity: EstimationCalculatorActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [inputs, setInputs] = useState<{ [key: string]: number | string }>(() => {
    const initial: { [key: string]: number | string } = {};
    activity.data.inputs.forEach(input => {
      initial[input.id] = input.default || input.min || '';
    });
    return initial;
  });
  const [result, setResult] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const calculateResult = () => {
    // Example: roof area = length × width × pitch factor
    let calculatedResult = 0;

    if (activity.data.calculationType === 'roof-measurement') {
      const length = Number(inputs.length) || 0;
      const width = Number(inputs.width) || 0;
      const pitchFactor = Number(inputs.pitchFactor) || 1.0;
      calculatedResult = length * width * pitchFactor;
    } else if (activity.data.calculationType === 'material-estimate') {
      const roofArea = Number(inputs.roofArea) || 0;
      const wasteFactor = Number(inputs.wasteFactor) || 1.1;
      calculatedResult = (roofArea / 100) * wasteFactor * 3; // 3 bundles per square
    }

    setResult(calculatedResult);
    return calculatedResult;
  };

  const handleSubmit = () => {
    const calculated = calculateResult();
    setSubmitted(true);

    if (activity.data.targetResult) {
      const { value, tolerance } = activity.data.targetResult;
      const isCorrect = Math.abs(calculated - value) <= tolerance;
      const score = isCorrect ? activity.points : Math.floor(activity.points * 0.5);
      onComplete(score, activity.points);
    } else {
      onComplete(activity.points, activity.points);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Calculation Guide</h4>
        <p className="text-sm text-blue-800">
          Enter the measurements and values below. Agnes will help you calculate
          the correct result.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activity.data.inputs.map(input => (
          <div key={input.id} className="bg-white border-2 border-gray-200 rounded-xl p-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {input.label} {input.unit && <span className="text-gray-500">({input.unit})</span>}
            </label>

            {input.type === 'number' && (
              <input
                type="number"
                value={inputs[input.id]}
                onChange={e => setInputs({ ...inputs, [input.id]: Number(e.target.value) })}
                min={input.min}
                max={input.max}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            )}

            {input.type === 'range' && (
              <div>
                <input
                  type="range"
                  value={inputs[input.id]}
                  onChange={e => setInputs({ ...inputs, [input.id]: Number(e.target.value) })}
                  min={input.min}
                  max={input.max}
                  className="w-full"
                />
                <div className="text-right text-sm font-semibold text-gray-700 mt-1">
                  {inputs[input.id]} {input.unit}
                </div>
              </div>
            )}

            {input.type === 'select' && (
              <select
                value={inputs[input.id]}
                onChange={e => setInputs({ ...inputs, [input.id]: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {input.options?.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {input.helpText && (
              <p className="text-xs text-gray-500 mt-2">{input.helpText}</p>
            )}
          </div>
        ))}
      </div>

      {/* Formulas Reference */}
      {activity.data.formulas.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Formulas
          </h4>
          <div className="space-y-2">
            {activity.data.formulas.map((formula, idx) => (
              <div key={idx} className="text-sm">
                <span className="font-semibold text-purple-800">{formula.name}: </span>
                <code className="bg-white px-2 py-1 rounded text-purple-900">
                  {formula.display}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result Display */}
      {result !== null && submitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-800 mb-1">Calculated Result</p>
              <p className="text-3xl font-bold text-emerald-900">
                {result.toFixed(2)}
                {activity.data.targetResult?.unit && (
                  <span className="text-xl ml-2">{activity.data.targetResult.unit}</span>
                )}
              </p>
            </div>
            <CheckCircle className="w-12 h-12 text-emerald-600" />
          </div>

          {activity.data.targetResult && (
            <div className="mt-4 pt-4 border-t border-emerald-200">
              <p className="text-sm text-emerald-800">
                Target Range: {activity.data.targetResult.value - activity.data.targetResult.tolerance} -{' '}
                {activity.data.targetResult.value + activity.data.targetResult.tolerance}{' '}
                {activity.data.targetResult.unit}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          <Calculator className="w-5 h-5" />
          <span>Calculate & Submit</span>
        </button>
      )}
    </div>
  );
};

// ========================================
// DAMAGE ASSESSMENT COMPONENT
// ========================================

const DamageAssessmentComponent: React.FC<{
  activity: DamageAssessmentActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [assessments, setAssessments] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  // Remove unused local score state; compute finalScore and pass to onComplete

  const handleSubmit = () => {
    let correct = 0;
    activity.data.assessmentCriteria.forEach(criterion => {
      const selected = assessments[criterion.id];
      const correctOption = criterion.options.find(opt => opt.isCorrect);
      if (selected === correctOption?.value) {
        correct++;
      }
    });

    const finalScore = Math.round(
      (correct / activity.data.assessmentCriteria.length) * activity.points
    );
    setSubmitted(true);
    onComplete(finalScore, activity.points);
  };

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
        <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
          <Clipboard className="w-5 h-5 mr-2" />
          Scenario
        </h4>
        <p className="text-gray-800">{activity.data.scenario}</p>
      </div>

      {/* Photo Analysis (if available) */}
      {activity.data.photoAnalysis && (
        <div className="bg-gray-100 rounded-xl p-4">
          <img
            src={activity.data.photoAnalysis.imageUrl}
            alt="Damage Assessment"
            className="w-full rounded-lg mb-4"
          />
          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 mb-2">Key Indicators to Look For:</h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {activity.data.photoAnalysis.damageIndicators.map((indicator, idx) => (
                <li key={idx}>{indicator}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Assessment Criteria */}
      <div className="space-y-4">
        {activity.data.assessmentCriteria.map(criterion => (
          <div key={criterion.id} className="bg-white border-2 border-gray-200 rounded-xl p-5">
            <p className="font-semibold text-gray-900 mb-3">{criterion.criterion}</p>
            <div className="space-y-2">
              {criterion.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    assessments[criterion.id] === option.value
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={criterion.id}
                    value={option.value}
                    checked={assessments[criterion.id] === option.value}
                    onChange={e =>
                      setAssessments({ ...assessments, [criterion.id]: e.target.value })
                    }
                    className="mr-3"
                  />
                  <span className="text-gray-800">{option.value}</span>
                </label>
              ))}
            </div>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900"
              >
                {criterion.options.find(opt => opt.value === assessments[criterion.id])?.feedback}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(assessments).length < activity.data.assessmentCriteria.length}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Submit Assessment
        </button>
      )}
    </div>
  );
};

// ========================================
// PHOTO ANALYSIS COMPONENT
// ========================================

const PhotoAnalysisComponent: React.FC<{
  activity: PhotoAnalysisActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const currentImage = activity.data.images[currentImageIndex];

  const handleNextImage = () => {
    if (currentImageIndex < activity.data.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      // Calculate score and complete
      let correct = 0;
      let total = 0;
      activity.data.images.forEach(image => {
        image.questions.forEach(q => {
          total++;
          if (answers[`${image.id}-${q.question}`] === q.correctAnswer) {
            correct++;
          }
        });
      });

      const finalScore = Math.round((correct / total) * activity.points);
      setShowResults(true);
      onComplete(finalScore, activity.points);
    }
  };

  return (
    <div className="space-y-6">
      {!showResults ? (
        <>
          {/* Image Display */}
          <div className="relative">
            <img
              src={currentImage.imageUrl}
              alt={currentImage.description}
              className="w-full rounded-xl shadow-lg"
            />
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg text-sm font-semibold">
              Image {currentImageIndex + 1} of {activity.data.images.length}
            </div>
          </div>

          <p className="text-gray-700 italic">{currentImage.description}</p>

          {/* Questions */}
          <div className="space-y-4">
            {currentImage.questions.map((question, qIdx) => {
              const answerId = `${currentImage.id}-${question.question}`;
              return (
                <div key={qIdx} className="bg-white border-2 border-gray-200 rounded-xl p-5">
                  <p className="font-semibold text-gray-900 mb-3">{question.question}</p>
                  {question.options ? (
                    <div className="space-y-2">
                      {question.options.map((option, oIdx) => (
                        <label
                          key={oIdx}
                          className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            answers[answerId] === option
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={answerId}
                            value={option}
                            checked={answers[answerId] === option}
                            onChange={e => setAnswers({ ...answers, [answerId]: e.target.value })}
                            className="mr-3"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Type your answer..."
                      value={answers[answerId] || ''}
                      onChange={e => setAnswers({ ...answers, [answerId]: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <button
            onClick={handleNextImage}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-colors"
          >
            {currentImageIndex < activity.data.images.length - 1
              ? 'Next Image'
              : 'Complete Analysis'}
          </button>
        </>
      ) : (
        <div className="text-center py-8">
          <Camera className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete!</h3>
          <p className="text-gray-600">Great work analyzing all the photos.</p>
        </div>
      )}
    </div>
  );
};

// ========================================
// PRICE QUOTE EXERCISE COMPONENT
// ========================================

const PriceQuoteExerciseComponent: React.FC<{
  activity: PriceQuoteExerciseActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [quoteAmount, setQuoteAmount] = useState<string>('');
  const [breakdown, setBreakdown] = useState<{ [key: string]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  const calculateRecommendedQuote = () => {
    const { roofSize, pitchFactor } = activity.data.projectDetails;
    const { materialCostPerSq, laborCostPerSq, permitFees, disposalCost, profitMargin } =
      activity.data.costFactors;

    const squares = (roofSize / 100) * pitchFactor;
    const materialCost = squares * materialCostPerSq;
    const laborCost = squares * laborCostPerSq;
    const subtotal = materialCost + laborCost + permitFees + disposalCost;
    const total = subtotal * (1 + profitMargin);

    return {
      materialCost,
      laborCost,
      permitFees,
      disposalCost,
      subtotal,
      total,
    };
  };

  const handleSubmit = () => {
    const quote = Number(quoteAmount);
    const recommended = calculateRecommendedQuote();
    const { min, max } = activity.data.expectedRange;

    const isInRange = quote >= min && quote <= max;
    const score = isInRange ? activity.points : Math.floor(activity.points * 0.5);

    setBreakdown(recommended);
    setSubmitted(true);
    onComplete(score, activity.points);
  };

  return (
    <div className="space-y-6">
      {/* Customer Scenario */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Customer Scenario
        </h4>
        <p className="text-gray-800 mb-4">{activity.data.customerScenario}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Roof Size:</span>
            <span className="ml-2 font-semibold">
              {activity.data.projectDetails.roofSize} sq ft
            </span>
          </div>
          <div>
            <span className="text-gray-600">Pitch Factor:</span>
            <span className="ml-2 font-semibold">
              {activity.data.projectDetails.pitchFactor}x
            </span>
          </div>
          <div>
            <span className="text-gray-600">Material:</span>
            <span className="ml-2 font-semibold">
              {activity.data.projectDetails.materialType}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Complexity:</span>
            <span className="ml-2 font-semibold capitalize">
              {activity.data.projectDetails.complexity}
            </span>
          </div>
        </div>
      </div>

      {/* Quote Input */}
      <div>
        <label htmlFor="quote-amount" className="block text-sm font-semibold text-gray-700 mb-2">
          Your Quote Amount
        </label>
        <div className="relative">
          <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            id="quote-amount"
            type="number"
            value={quoteAmount}
            onChange={e => setQuoteAmount(e.target.value)}
            disabled={submitted}
            placeholder="Enter total quote"
            className="w-full pl-12 pr-4 py-4 text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      {/* Breakdown (shown after submit) */}
      {submitted && Object.keys(breakdown).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 border-gray-200 rounded-xl p-6"
        >
          <h4 className="font-semibold text-gray-900 mb-4">Recommended Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Materials:</span>
              <span className="font-semibold">${breakdown.materialCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Labor:</span>
              <span className="font-semibold">${breakdown.laborCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Permits:</span>
              <span className="font-semibold">${breakdown.permitFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Disposal:</span>
              <span className="font-semibold">${breakdown.disposalCost.toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-lg">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="font-bold text-emerald-600">${breakdown.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
            <p className="text-gray-700">
              <span className="font-semibold">Your quote: </span>${Number(quoteAmount).toFixed(2)}
            </p>
            <p className="text-gray-700 mt-1">
              <span className="font-semibold">Acceptable range: </span>$
              {activity.data.expectedRange.min.toFixed(2)} - $
              {activity.data.expectedRange.max.toFixed(2)}
            </p>
          </div>
        </motion.div>
      )}

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!quoteAmount}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Submit Quote
        </button>
      )}
    </div>
  );
};

// ========================================
// WORKFLOW SIMULATOR COMPONENT
// ========================================

const WorkflowSimulatorComponent: React.FC<{
  activity: WorkflowSimulatorActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [orderedSteps, setOrderedSteps] = useState<string[]>([]);
  const [availableSteps, setAvailableSteps] = useState(activity.data.workflowSteps);
  const [submitted, setSubmitted] = useState(false);

  const handleAddStep = (stepId: string) => {
    setOrderedSteps([...orderedSteps, stepId]);
    setAvailableSteps(availableSteps.filter(s => s.id !== stepId));
  };

  const handleRemoveStep = (stepId: string) => {
    const step = activity.data.workflowSteps.find(s => s.id === stepId);
    if (step) {
      setOrderedSteps(orderedSteps.filter(id => id !== stepId));
      setAvailableSteps([...availableSteps, step]);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    orderedSteps.forEach((stepId, idx) => {
      const step = activity.data.workflowSteps.find(s => s.id === stepId);
      if (step && step.correctOrder === idx + 1) {
        correct++;
      }
    });

    const score = Math.round((correct / activity.data.workflowSteps.length) * activity.points);
    setSubmitted(true);
    onComplete(score, activity.points);
  };

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
        <h4 className="font-semibold text-purple-900 mb-2">Workflow Scenario</h4>
        <p className="text-gray-800">{activity.data.scenario}</p>
      </div>

      {/* Ordered Steps */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Your Workflow (Drag to Reorder)</h4>
        <div className="space-y-2 bg-emerald-50 border-2 border-dashed border-emerald-300 rounded-xl p-4 min-h-[200px]">
          {orderedSteps.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Drag steps here to build your workflow</p>
          ) : (
            orderedSteps.map((stepId, idx) => {
              const step = activity.data.workflowSteps.find(s => s.id === stepId);
              return step ? (
                <div
                  key={stepId}
                  className="bg-white border-2 border-emerald-200 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{step.step}</p>
                      <p className="text-sm text-gray-600">{step.duration}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveStep(stepId)}
                    disabled={submitted}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ) : null;
            })
          )}
        </div>
      </div>

      {/* Available Steps */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Available Steps</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableSteps.map(step => (
            <button
              key={step.id}
              onClick={() => handleAddStep(step.id)}
              disabled={submitted}
              className="bg-white border-2 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 rounded-lg p-4 text-left transition-all"
            >
              <p className="font-semibold text-gray-900 mb-1">{step.step}</p>
              <p className="text-sm text-gray-600">{step.duration}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={orderedSteps.length < activity.data.workflowSteps.length}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Submit Workflow
        </button>
      )}

      {submitted && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h5 className="font-semibold text-blue-900 mb-2">Correct Order:</h5>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
            {activity.data.workflowSteps
              .sort((a, b) => a.correctOrder - b.correctOrder)
              .map(step => (
                <li key={step.id}>{step.step}</li>
              ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default AgnesSkillBuilders;
