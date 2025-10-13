import React, { useMemo, useState } from 'react';

interface ScenarioResponseData {
  scenario: string;
  correctPoints?: string[]; // aka key points to hit
  correctApproach?: string[]; // alternate field name in some modules
  sampleResponse?: string;
}

interface ScenarioResponseActivityProps {
  activity: {
    id: string;
    title: string;
    description?: string;
    points: number;
    data: ScenarioResponseData;
  };
  onComplete: (score: number, totalPoints: number) => void;
}

const stopwords = new Set([
  'the','and','for','with','that','from','this','your','you','are','was','were','their','they','them','have','has','had','but','not','just','only','very','into','onto','about','over','under','more','most','less','least','than','then','also','can','will','would','should','could','might','may','a','an','to','in','of','on','as','by','or','is','it','be','at','we','our','us'
]);

const extractKeywords = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 4 && !stopwords.has(w));
};

const ScenarioResponseActivity: React.FC<ScenarioResponseActivityProps> = ({ activity, onComplete }) => {
  const { scenario, correctPoints = [], correctApproach = [], sampleResponse } = activity.data || ({} as ScenarioResponseData);
  const rubric = useMemo(() => (correctPoints.length ? correctPoints : correctApproach), [correctPoints, correctApproach]);

  const rubricKeywords = useMemo(() => {
    return rubric.map(point => ({
      point,
      keywords: Array.from(new Set(extractKeywords(point))).slice(0, 6),
    }));
  }, [rubric]);

  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [matches, setMatches] = useState<boolean[]>(Array(rubric.length).fill(false));

  const handleSubmit = () => {
    const respKw = new Set(extractKeywords(response));
    const matched = rubricKeywords.map(({ keywords }) => keywords.some(k => respKw.has(k)));
    const matchedCount = matched.filter(Boolean).length;
    const earned = Math.round((matchedCount / Math.max(1, rubric.length)) * activity.points);
    setMatches(matched);
    setSubmitted(true);
    onComplete(earned, activity.points);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">Read the scenario and write your response. We’ll check for key points.</p>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Scenario</h4>
        <p className="text-gray-800 whitespace-pre-wrap">{scenario}</p>
      </div>

      <div>
        <label htmlFor={`scenario-response-${activity.id}`} className="block text-sm font-semibold text-gray-700 mb-2">Your Response</label>
        <textarea
          id={`scenario-response-${activity.id}`}
          className={`w-full min-h-[140px] p-3 border-2 rounded-lg focus:outline-none ${submitted ? 'bg-gray-50 border-gray-300' : 'border-gray-300 focus:border-purple-500'}`}
          value={response}
          onChange={e => setResponse(e.target.value)}
          disabled={submitted}
          placeholder="Write how you would respond..."
        />
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!response.trim()}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Check Response
        </button>
      )}

      {submitted && (
        <div className="space-y-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h5 className="font-semibold text-green-900 mb-2">Key Points Matched</h5>
            <ul className="space-y-2">
              {rubric.map((point, i) => (
                <li key={i} className={`p-2 rounded ${matches[i] ? 'bg-green-100' : 'bg-red-50'}`}>
                  <span className="text-gray-900">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {sampleResponse && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
              <h5 className="font-semibold text-yellow-900 mb-2">Sample Response</h5>
              <p className="text-gray-800 whitespace-pre-wrap">{sampleResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScenarioResponseActivity;

