import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Send, X, Star, Award, TrendingUp } from 'lucide-react';
import mentorPack1 from '../data/agnes/scenarios.module1';
import mentorPack2 from '../data/agnes/scenarios.module2';
import mentorPack3 from '../data/agnes/scenarios.module3';
import mentorPack4 from '../data/agnes/scenarios.module4';
import mentorPack5 from '../data/agnes/scenarios.module5';
import mentorPack6 from '../data/agnes/scenarios.module6';
import mentorPack7 from '../data/agnes/scenarios.module7';
import mentorPack8 from '../data/agnes/scenarios.module8';
import mentorPack9 from '../data/agnes/scenarios.module9';

interface RoleplayScenario {
  id: string;
  role: 'homeowner' | 'rep' | 'adjuster';
  context: string;
  agnesLine: string;
  expectedKeyPoints: string[];
  topAnswers: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface RoleplayResponse {
  userResponse: string;
  score: number;
  feedback: string;
  matchedKeyPoints: string[];
  missedKeyPoints: string[];
  strengths: string[];
  improvements: string[];
}

interface AgnesRoleplaySystemProps {
  moduleId: number;
  scenarios?: RoleplayScenario[];
  onComplete: (results: any) => void;
  onClose: () => void;
}

const AgnesRoleplaySystem: React.FC<AgnesRoleplaySystemProps> = ({
  moduleId,
  scenarios: providedScenarios,
  onComplete,
  onClose,
}) => {
  const [selectedRole, setSelectedRole] = useState<
    'homeowner' | 'rep' | 'adjuster' | null
  >(null);
  const [currentScenario, setCurrentScenario] =
    useState<RoleplayScenario | null>(null);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responses, setResponses] = useState<RoleplayResponse[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] =
    useState<RoleplayResponse | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');

  const recognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);

  // Default scenarios for each module if not provided
  const defaultScenarios: { [key: number]: RoleplayScenario[] } = {
    1: [
      {
        id: 'initial-pitch-1',
        role: 'homeowner',
        context:
          "You're at the door. The homeowner just opened and looks suspicious.",
        agnesLine:
          '"We\'re not interested in any sales. We already have a roofer."',
        expectedKeyPoints: [
          'Acknowledge their statement respectfully',
          "Mention you're not selling, you're inspecting for storm damage",
          'Reference recent storm in the area',
          'Emphasize free inspection with no obligation',
          'Build trust and credibility',
        ],
        topAnswers: [
          "I completely understand, and I appreciate you letting me know. I'm actually not here to sell you anything today. We're in your neighborhood because of the recent hail storm on [date], and we're offering free storm damage inspections. Many homes in your area have damage they don't even know about. Would you mind if I took just 15 minutes to check your roof? There's no obligation whatsoever.",
          "That's totally fine! I'm not here to sell you a roof today. We're certified storm damage inspectors working with insurance companies after the storm on [date]. I just want to make sure your home wasn't affected. If there's no damage, great! If there is, I'll document it for you at no cost. Can I take a quick look?",
        ],
        difficulty: 'beginner',
      },
      {
        id: 'initial-pitch-2',
        role: 'homeowner',
        context:
          'Homeowner is busy and trying to end the conversation quickly.',
        agnesLine:
          '"I\'m really busy right now. Can you just leave me some information?"',
        expectedKeyPoints: [
          'Respect their time',
          'Emphasize the brief nature of inspection',
          'Create urgency around storm damage timeline',
          'Offer specific time commitment',
          'Position value of in-person inspection vs. brochure',
        ],
        topAnswers: [
          "I completely respect your time! The inspection only takes 15-20 minutes, and honestly, a brochure won't show you if you have storm damage. The recent storm on [date] caused damage to many homes in this neighborhood. If you have damage and don't file a claim soon, you could miss your window with insurance. How about I come back at a time that works better for you? What does your schedule look like tomorrow?",
          "I totally understand you're busy. Here's why I'd rather not just leave information: if your roof has storm damage from [date], time is critical for filing an insurance claim. A brochure can't tell you if you have damage, but I can in just 15 minutes. Would right now work, or would 4pm today be better?",
        ],
        difficulty: 'beginner',
      },
      {
        id: 'pricing-objection-1',
        role: 'homeowner',
        context: 'Homeowner is concerned about costs and deductible.',
        agnesLine: '"I just don\'t want to spend any money on this right now."',
        expectedKeyPoints: [
          'Acknowledge and validate concern',
          'Explain deductible vs. full replacement cost',
          'Position insurance as designed for this situation',
          'Offer financing options for deductible if needed',
          'Navigate to inspection scheduling',
        ],
        topAnswers: [
          'I completely understand wanting to avoid unexpected expenses. The good news is, with approved storm damage, your insurance covers the roof replacement—your only cost is the deductible. Most homeowners pay around $1,000–$2,500. We even have financing options for the deductible if that helps. The first step is a quick inspection so you know exactly where you stand—would today at 4pm or tomorrow morning work better?',
          "That makes sense—nobody wants surprise costs. With storm damage, your policy is designed to cover the replacement, and you only handle the deductible. If there's no damage, you owe nothing. If there is, we'll document it and guide you through next steps. Can we take a quick 15-minute look now so you have clarity?",
        ],
        difficulty: 'beginner',
      },
      {
        id: 'scheduling-followup-1',
        role: 'homeowner',
        context: 'Homeowner is agreeable but noncommittal about scheduling.',
        agnesLine: '"Maybe later this week. I\'m pretty busy."',
        expectedKeyPoints: [
          'Offer two specific time options',
          'Keep it brief and convenient',
          'Reinforce value and no-obligation nature',
          'Confirm contact and leave professional next step',
        ],
        topAnswers: [
          "Totally understood—let's make it super easy. I'm in your area Thursday at 5pm or Friday at 10am. Which time is better for a quick 15-minute check? No obligation—just peace of mind either way.",
          "I can work around your schedule. I'll be nearby tomorrow and can swing by at either 12:15 or 6:00pm. The inspection is quick and you'll know for sure if there's anything to address. Which works better?",
        ],
        difficulty: 'beginner',
      },
    ],
    2: [
      {
        id: 'inspection-findings-1',
        role: 'homeowner',
        context:
          "You've completed the inspection and found significant hail damage. The homeowner is skeptical.",
        agnesLine:
          '"Are you sure that\'s actually damage? It looks fine to me from here."',
        expectedKeyPoints: [
          'Show photo evidence on tablet',
          'Explain what hail damage looks like',
          'Compare damaged vs. undamaged areas',
          'Educate on why damage matters',
          'Build confidence in your expertise',
        ],
        topAnswers: [
          "Great question! Let me show you exactly what I found. [Show tablet photos] See these circular impressions on the shingle granules? That's textbook hail damage from the storm on [date]. Here's an undamaged area for comparison - notice the difference? This damage compromises your roof's warranty and can lead to leaks. I found [X] impact points across your roof. Your insurance covers this - that's why you pay for coverage.",
          "I'm glad you asked! From the ground, hail damage is almost impossible to see - that's why we do these inspections. Look at these photos on my tablet. These circular bruises in the shingles are hail impacts. I found them consistently across your entire roof, which means this is legitimate storm damage, not wear and tear. Your insurance policy covers this exact scenario.",
        ],
        difficulty: 'intermediate',
      },
      {
        id: 'inspection-findings-2',
        role: 'homeowner',
        context: 'Homeowner is worried about their insurance rates going up.',
        agnesLine: '"If I file a claim, won\'t my insurance rates skyrocket?"',
        expectedKeyPoints: [
          'Address the myth directly',
          'Explain weather-related claims vs. negligence',
          'Emphasize this is why they have insurance',
          'Mention potential rate increases are minimal',
          'Create urgency around not filing',
        ],
        topAnswers: [
          "That's one of the biggest myths in the industry! Weather-related claims like hail damage typically don't increase your rates significantly because they're considered \"acts of God\" - not your fault. This is literally what you pay insurance for. What WILL increase your rates is if you don't file and the damage gets worse, leading to water damage or structural issues. That's when insurance sees it as negligence. You're protected here.",
          "I hear this concern all the time, and I get it. Here's the truth: storm damage claims rarely cause major rate increases because it's not your fault - it's an act of nature. Insurance companies expect these claims after storms. What they don't like is when homeowners ignore damage and it becomes a bigger, more expensive problem later. You're doing the right thing by addressing this now.",
        ],
        difficulty: 'intermediate',
      },
    ],
    3: [
      {
        id: 'agreement-signing-1',
        role: 'homeowner',
        context:
          "You're explaining the contingency agreement. The homeowner is hesitant to sign.",
        agnesLine:
          '"I don\'t like signing contracts on the spot. Can I think about it?"',
        expectedKeyPoints: [
          'Validate their caution (good practice)',
          "Explain exactly what they're signing",
          'Emphasize no-obligation nature',
          'Highlight protection it provides',
          'Offer to review line by line',
        ],
        topAnswers: [
          "I really appreciate that you're being careful - that shows good judgment! Let me explain exactly what this agreement says so you feel 100% comfortable. This is a contingency agreement, which means you only work with us IF your claim gets approved. If insurance denies it, you owe nothing. It simply gives us permission to work on your behalf with your insurance company. Would you like me to go through it line by line with you right now?",
          "That's actually very smart - you should never sign something you don't understand! Here's what this agreement does: it authorizes us to represent you with your insurance company and manage the claim process. It's contingent on approval, so if insurance says no, you don't owe us anything. Think of it as hiring an advocate who only gets paid if they win. What specific concerns do you have about it?",
        ],
        difficulty: 'intermediate',
      },
    ],
    4: [
      {
        id: 'learn-framework-1',
        role: 'homeowner',
        context:
          'Homeowner raises a budget objection during the L.E.A.R.N. framework practice.',
        agnesLine:
          '"This all sounds expensive. We can\'t afford a new roof right now."',
        expectedKeyPoints: [
          'Listen and acknowledge',
          'Empathize with concern',
          'Ask clarifying questions',
          'Respond with insurance coverage',
          'Navigate to next step',
        ],
        topAnswers: [
          "I completely understand that concern - a new roof is a major investment. [LISTEN] Can I ask what specifically you're worried about cost-wise? [ASK] The great news is that if your claim is approved, your insurance covers the roof replacement minus your deductible. Most homeowners are surprised that their out-of-pocket cost is just the deductible - typically $1,000-$2,500. We also offer financing options for that. Does that help address your concern? [NAVIGATE]",
          "That makes total sense, and I appreciate you being upfront about it. [EMPATHIZE] Are you concerned about the full cost, or just how much you'd need to pay out of pocket? [ASK] Here's the key: your insurance policy is designed to cover this exact situation. You'll pay your deductible - usually around $1,500 - and insurance covers the rest. We can even help with financing for the deductible if needed. [RESPOND] Would you like me to explain how the insurance process works? [NAVIGATE]",
        ],
        difficulty: 'advanced',
      },
    ],
    5: [
      {
        id: 'insurance-adjuster-1',
        role: 'adjuster',
        context:
          "You're meeting the insurance adjuster on-site. They seem to be rushing and might lowball the damage.",
        agnesLine:
          '"I\'ve looked at the roof. I see some wear and tear, but I\'m not seeing significant storm damage here."',
        expectedKeyPoints: [
          'Stay professional and respectful',
          'Reference specific photo evidence',
          'Point out test squares if completed',
          'Cite storm date and documentation',
          "Collaborate, don't confront",
        ],
        topAnswers: [
          "I appreciate you coming out today. I'd like to walk through what I documented during my inspection. [Show tablet] In the test square I completed on the north slope, you can see clear hail impact points - I counted [X] hits per square. These circular impressions are consistent with the [size] hail reported on [storm date]. Would you mind if we go up together and I show you these areas? I want to make sure we're both seeing the same damage.",
          "Thanks for being here. I understand these inspections can be subjective sometimes. Let me show you the specific areas of concern. [Pull up photos] These impact points on the shingles match the hail pattern from the storm on [date]. I've marked several test squares that show consistent damage across multiple slopes. I'd be happy to go through each one with you so we're aligned on what qualifies as storm damage versus normal wear.",
        ],
        difficulty: 'advanced',
      },
    ],
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcriptText = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setTranscript(transcriptText);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        setIsListening(false);
      };
    }
  }, []);

  // Get scenarios for current module and enrich with mentor pack
  const baseScenarios =
    providedScenarios || defaultScenarios[moduleId] || defaultScenarios[1];
  const mentorPack =
    moduleId === 2
      ? mentorPack2
      : moduleId === 3
        ? mentorPack3
        : moduleId === 4
          ? mentorPack4
          : moduleId === 5
            ? mentorPack5
            : moduleId === 6
              ? mentorPack6
              : moduleId === 7
                ? mentorPack7
                : moduleId === 8
                  ? mentorPack8
                  : moduleId === 9
                    ? mentorPack9
                    : mentorPack1;
  const mentorMapped: RoleplayScenario[] = mentorPack.scenarios.map(s => ({
    id: s.id,
    role: s.role,
    context: 'Homeowner scenario: ' + s.prompt,
    agnesLine: '"' + s.prompt + '"',
    expectedKeyPoints: s.expectedKeyPoints,
    topAnswers: [],
    difficulty: 'intermediate',
  }));
  const availableScenarios = [...baseScenarios, ...mentorMapped];
  const [showTrainerTips, setShowTrainerTips] = useState(false);

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIsListening(false);
      if (transcript) {
        setUserInput(transcript);
      }
    }
  };

  const analyzeResponse = (
    userResponse: string,
    scenario: RoleplayScenario
  ): RoleplayResponse => {
    const lowerResponse = userResponse.toLowerCase();
    const matchedKeyPoints: string[] = [];
    const missedKeyPoints: string[] = [];

    // Check which key points were addressed
    scenario.expectedKeyPoints.forEach(point => {
      const keywords = point
        .toLowerCase()
        .split(' ')
        .filter(word => word.length > 4);
      const matched = keywords.some(keyword => lowerResponse.includes(keyword));
      if (matched) {
        matchedKeyPoints.push(point);
      } else {
        missedKeyPoints.push(point);
      }
    });

    // Calculate base score
    const keyPointScore =
      (matchedKeyPoints.length / scenario.expectedKeyPoints.length) * 70;

    // Check similarity to top answers (remaining 30 points)
    let similarityScore = 0;
    scenario.topAnswers.forEach(topAnswer => {
      const topAnswerWords = topAnswer
        .toLowerCase()
        .split(' ')
        .filter(word => word.length > 4);
      const matchingWords = topAnswerWords.filter(word =>
        lowerResponse.includes(word)
      );
      const similarity = (matchingWords.length / topAnswerWords.length) * 100;
      similarityScore = Math.max(similarityScore, similarity);
    });

    const finalScore = Math.min(
      100,
      Math.round(keyPointScore + similarityScore * 0.3)
    );

    // Generate constructive feedback
    const strengths: string[] = [];
    const improvements: string[] = [];

    if (matchedKeyPoints.length >= scenario.expectedKeyPoints.length * 0.7) {
      strengths.push('You covered most of the essential points!');
    }
    if (
      lowerResponse.includes('understand') ||
      lowerResponse.includes('appreciate')
    ) {
      strengths.push('Great empathy and acknowledgment of concerns.');
    }
    if (lowerResponse.length > 150) {
      strengths.push('Thorough and detailed response.');
    }

    if (missedKeyPoints.length > 0) {
      improvements.push(`Consider mentioning: ${missedKeyPoints[0]}`);
    }
    if (finalScore < 70) {
      improvements.push(
        'Try to address more of the key points from the training materials.'
      );
    }
    if (lowerResponse.length < 80) {
      improvements.push(
        'Provide more detail to build confidence and credibility.'
      );
    }

    let feedback = '';
    if (finalScore >= 85) {
      feedback =
        'Excellent response! You demonstrated strong understanding and communication skills.';
    } else if (finalScore >= 70) {
      feedback =
        'Good response! You hit most of the key points. A few areas could be strengthened.';
    } else if (finalScore >= 55) {
      feedback =
        "Solid attempt! You're on the right track. Focus on covering more of the essential points.";
    } else {
      feedback =
        'This is a learning opportunity. Review the key points and try to incorporate them more directly.';
    }

    return {
      userResponse,
      score: finalScore,
      feedback,
      matchedKeyPoints,
      missedKeyPoints,
      strengths,
      improvements,
    };
  };

  const handleSubmitResponse = () => {
    if (!currentScenario || !userInput.trim()) return;

    const analysis = analyzeResponse(userInput, currentScenario);
    setCurrentFeedback(analysis);
    setResponses([...responses, analysis]);
    setShowFeedback(true);
    setUserInput('');
    setTranscript('');
  };

  const handleNextScenario = () => {
    setShowFeedback(false);
    setCurrentFeedback(null);

    const filteredScenarios = availableScenarios.filter(
      s => s.role === selectedRole
    );

    if (scenarioIndex + 1 < filteredScenarios.length) {
      setScenarioIndex(scenarioIndex + 1);
      setCurrentScenario(filteredScenarios[scenarioIndex + 1]);
    } else {
      // Session complete
      setSessionComplete(true);
      const avgScore =
        responses.reduce((sum, r) => sum + r.score, 0) / responses.length;
      onComplete({
        role: selectedRole,
        averageScore: Math.round(avgScore),
        totalScenarios: responses.length,
        responses,
      });
    }
  };

  const handleRoleSelection = (role: 'homeowner' | 'rep' | 'adjuster') => {
    setSelectedRole(role);
    const filteredScenarios = availableScenarios.filter(s => s.role === role);
    if (filteredScenarios.length > 0) {
      setCurrentScenario(filteredScenarios[0]);
      setScenarioIndex(0);
    }
  };

  const calculateSessionStats = () => {
    if (responses.length === 0)
      return { avgScore: 0, topScore: 0, improvement: 0 };

    const scores = responses.map(r => r.score);
    const avgScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length
    );
    const topScore = Math.max(...scores);
    const improvement =
      responses.length > 1
        ? responses[responses.length - 1].score - responses[0].score
        : 0;

    return { avgScore, topScore, improvement };
  };

  if (sessionComplete) {
    const stats = calculateSessionStats();

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Session Complete!
            </h2>
            <p className="text-gray-600 mb-8">
              Great work on your roleplay training
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stats.avgScore}
                </div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {stats.topScore}
                </div>
                <div className="text-sm text-gray-600">Top Score</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {stats.improvement > 0 ? '+' : ''}
                  {stats.improvement}
                </div>
                <div className="text-sm text-gray-600">Improvement</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">
                Performance Summary
              </h3>
              {responses.map((response, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0"
                >
                  <span className="text-sm text-gray-600">
                    Scenario {idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(response.score / 20)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {response.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Training Debrief */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">
                Agnes Debrief
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-800 mb-2">
                    Top strengths
                  </h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    {Array.from(new Set(responses.flatMap(r => r.strengths)))
                      .slice(0, 5)
                      .map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-800 mb-2">
                    Focus areas
                  </h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    {Array.from(
                      new Set([
                        ...responses.flatMap(r => r.improvements),
                        ...responses.flatMap(r => r.missedKeyPoints),
                      ])
                    )
                      .slice(0, 5)
                      .map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-indigo-800 mb-2">
                  Recommended next practice
                </h4>
                {mentorPack.practiceSequences &&
                mentorPack.practiceSequences.length > 0 ? (
                  <div className="border border-indigo-200 rounded-lg p-3">
                    <div className="font-semibold text-indigo-900">
                      {mentorPack.practiceSequences[0].title}
                    </div>
                    <div className="text-sm text-indigo-800">
                      {mentorPack.practiceSequences[0].steps.join(' → ')}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">
                    Practice a new scenario focusing on your lowest-scoring
                    skills.
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Complete Training
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (!selectedRole) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Agnes21 Roleplay Training
              </h2>
              <p className="text-gray-600">
                Choose who Agnes will play in this training scenario
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRoleSelection('homeowner')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Homeowner</h3>
              <p className="text-blue-100 text-sm mb-4">
                Practice your pitch, objection handling, and relationship
                building with skeptical homeowners.
              </p>
              <div className="text-xs text-blue-200">
                {availableScenarios.filter(s => s.role === 'homeowner').length}{' '}
                scenarios available
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRoleSelection('rep')}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Sales Rep</h3>
              <p className="text-purple-100 text-sm mb-4">
                Agnes plays a fellow rep. Practice team collaboration, knowledge
                sharing, and coaching.
              </p>
              <div className="text-xs text-purple-200">
                {availableScenarios.filter(s => s.role === 'rep').length}{' '}
                scenarios available
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRoleSelection('adjuster')}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Insurance Adjuster</h3>
              <p className="text-green-100 text-sm mb-4">
                Handle adjuster meetings, defend your findings, and navigate
                claim negotiations professionally.
              </p>
              <div className="text-xs text-green-200">
                {availableScenarios.filter(s => s.role === 'adjuster').length}{' '}
                scenarios available
              </div>
            </motion.button>
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">💡</span>
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">
                  Training Tips
                </h4>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>
                    • Use voice or text input - choose what's comfortable for
                    you
                  </li>
                  <li>
                    • Scoring is constructive - focus on learning, not
                    perfection
                  </li>
                  <li>
                    • Reference the training materials and key talking points
                  </li>
                  <li>• Take your time to craft thoughtful responses</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-blue-100 mb-1">
                Agnes21 Roleplay Training
              </div>
              <h2 className="text-2xl font-bold">
                {selectedRole === 'homeowner' && '🏠 Homeowner Scenario'}
                {selectedRole === 'rep' && '💼 Sales Rep Scenario'}
                {selectedRole === 'adjuster' && '🔍 Adjuster Scenario'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTrainerTips(s => !s)}
                className="bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-1 rounded-lg"
              >
                {showTrainerTips ? 'Hide Tips' : 'Trainer Tips'}
              </button>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>
                Scenario {scenarioIndex + 1} of{' '}
                {availableScenarios.filter(s => s.role === selectedRole).length}
              </span>
            </div>
            {responses.length > 0 && (
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                <span>
                  Avg Score:{' '}
                  {Math.round(
                    responses.reduce((sum, r) => sum + r.score, 0) /
                      responses.length
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {showTrainerTips && (
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h4 className="font-semibold text-amber-900 mb-2">
                  Trainer Tips
                </h4>
                <ul className="list-disc pl-5 text-amber-800 space-y-1">
                  {mentorPack.trainerTips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <h4 className="font-semibold text-indigo-900 mb-2">
                  Suggested Practice Sequences
                </h4>
                <ul className="space-y-2">
                  {mentorPack.practiceSequences.map(seq => (
                    <li
                      key={seq.id}
                      className="border border-indigo-200 rounded-lg p-3"
                    >
                      <div className="font-semibold text-indigo-900">
                        {seq.title}
                      </div>
                      <div className="text-sm text-indigo-800">
                        {seq.steps.join(' → ')}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {!showFeedback ? (
            <>
              {/* Scenario Context */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="text-sm font-semibold text-gray-500 mb-2">
                  SCENARIO CONTEXT
                </div>
                <p className="text-gray-700">{currentScenario?.context}</p>
              </div>

              {/* Agnes Line */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6 border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">A21</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-purple-700 mb-1">
                      Agnes says:
                    </div>
                    <p className="text-gray-800 text-lg">
                      {currentScenario?.agnesLine}
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Mode Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setInputMode('text')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    inputMode === 'text'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Text Input
                </button>
                <button
                  onClick={() => setInputMode('voice')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    inputMode === 'voice'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Voice Input
                </button>
              </div>

              {/* Response Input */}
              <div className="mb-6">
                <label
                  htmlFor="response-input"
                  className="text-sm font-semibold text-gray-700 mb-2 block"
                >
                  Your Response:
                </label>

                {inputMode === 'text' ? (
                  <textarea
                    id="response-input"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    placeholder="Type your response here... Remember to address the key points from your training!"
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                    <div className="text-center">
                      {isRecording ? (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                          >
                            <Mic className="w-8 h-8 text-white" />
                          </motion.div>
                          <p className="text-red-600 font-semibold mb-2">
                            Recording...
                          </p>
                          <p className="text-sm text-gray-600 mb-4">
                            {transcript || 'Speak now...'}
                          </p>
                          <button
                            onClick={stopRecording}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                          >
                            Stop Recording
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mic className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-gray-700 font-semibold mb-2">
                            Ready to record
                          </p>
                          <p className="text-sm text-gray-600 mb-4">
                            {transcript || userInput
                              ? 'Recorded: ' + (userInput || transcript)
                              : 'Click to start speaking'}
                          </p>
                          <button
                            onClick={startRecording}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                          >
                            Start Recording
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitResponse}
                disabled={!userInput.trim() && !transcript.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Response
              </button>
            </>
          ) : (
            /* Feedback View */
            <div className="space-y-6">
              {/* Score Display */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="inline-block"
                >
                  <div
                    className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      currentFeedback!.score >= 85
                        ? 'bg-green-100'
                        : currentFeedback!.score >= 70
                          ? 'bg-blue-100'
                          : currentFeedback!.score >= 55
                            ? 'bg-yellow-100'
                            : 'bg-orange-100'
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`text-4xl font-bold ${
                          currentFeedback!.score >= 85
                            ? 'text-green-600'
                            : currentFeedback!.score >= 70
                              ? 'text-blue-600'
                              : currentFeedback!.score >= 55
                                ? 'text-yellow-600'
                                : 'text-orange-600'
                        }`}
                      >
                        {currentFeedback!.score}
                      </div>
                      <div className="text-sm text-gray-600">/ 100</div>
                    </div>
                  </div>
                </motion.div>

                <p className="text-lg text-gray-700 font-medium">
                  {currentFeedback!.feedback}
                </p>
              </div>

              {/* Strengths */}
              {currentFeedback!.strengths.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    Strengths
                  </h4>
                  <ul className="space-y-1">
                    {currentFeedback!.strengths.map((strength, idx) => (
                      <li key={idx} className="text-green-800 text-sm">
                        • {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Points */}
              <div className="grid md:grid-cols-2 gap-4">
                {currentFeedback!.matchedKeyPoints.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      ✓ Points Covered
                    </h4>
                    <ul className="space-y-1">
                      {currentFeedback!.matchedKeyPoints.map((point, idx) => (
                        <li key={idx} className="text-blue-800 text-sm">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentFeedback!.missedKeyPoints.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="font-semibold text-amber-900 mb-2">
                      ○ Points to Add
                    </h4>
                    <ul className="space-y-1">
                      {currentFeedback!.missedKeyPoints.map((point, idx) => (
                        <li key={idx} className="text-amber-800 text-sm">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Improvements */}
              {currentFeedback!.improvements.length > 0 && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    Growth Opportunities
                  </h4>
                  <ul className="space-y-1">
                    {currentFeedback!.improvements.map((improvement, idx) => (
                      <li key={idx} className="text-purple-800 text-sm">
                        • {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Button */}
              <button
                onClick={handleNextScenario}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
              >
                {scenarioIndex + 1 <
                availableScenarios.filter(s => s.role === selectedRole).length
                  ? 'Next Scenario'
                  : 'Complete Session'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AgnesRoleplaySystem;
