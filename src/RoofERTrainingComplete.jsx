import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Award, Trophy, Star, CheckCircle, Lock, Target, Zap, BookOpen, Users, MessageSquare, Camera, FileText, Phone, AlertTriangle, TrendingUp, Mic, MicOff, Bot, User, Send, Brain, Video, Gamepad2, Download, Upload, Eye, MessageCircle, HelpCircle, Lightbulb, ThumbsUp, ThumbsDown, Home, Search, Shield, Settings, BarChart3, Clock, X } from 'lucide-react';

// Roof-ER Brand Colors and Logo Component
const RoofErLogo = ({ size = "w-8 h-8" }) => (
  <div className="flex items-center space-x-2">
    <div className={`${size} bg-gradient-to-br from-gray-600 via-gray-400 to-gray-300 rounded-full flex items-center justify-center border-2 border-red-600`}>
      <Eye className="w-4 h-4 text-white" />
    </div>
    <div className="text-gray-800 font-bold">
      <div className="text-red-600 text-lg">RoofER</div>
      <div className="text-gray-600 text-xs">The Roof Docs</div>
    </div>
  </div>
);

// Enhanced Agnes AI Personality and Advanced Coaching Engine
class AgnesAI {
  constructor() {
    this.personality = {
      name: "Agnes",
      role: "Advanced AI Learning Coach",
      traits: ["patient", "insightful", "encouraging", "strategic"],
      expertise: ["roofing industry", "sales psychology", "adult learning", "skill development"]
    };

    this.teachingPrinciples = {
      socraticMethod: true,
      scaffoldedLearning: true,
      adaptiveResponse: true,
      practiceOriented: true
    };

    this.errorPatterns = {
      technical: ["shingle", "flashing", "material", "installation"],
      sales: ["objection", "pitch", "close", "rapport"],
      communication: ["tone", "body language", "listen", "question"]
    };
  }

  generateResponse(userInput, context, learningState) {
    const { currentModule, userLevel, previousAttempts, strengths, weaknesses } = learningState;

    // Advanced coaching logic based on pedagogical principles
    if (this.shouldUseLeadingQuestions(context)) {
      return this.generateLeadingQuestion(userInput, context);
    }

    if (this.needsConceptBreakdown(userInput)) {
      return this.breakDownConcept(userInput, context);
    }

    if (this.detectsError(userInput, context)) {
      return this.generateCorrectionGuidance(userInput, context);
    }

    return this.generateAdaptiveResponse(userInput, context, learningState);
  }

  shouldUseLeadingQuestions(context) {
    return context.questionType === 'conceptual' || context.hasConfusion || context.needsDeepening;
  }

  generateLeadingQuestion(userInput, context) {
    const questions = {
      pitchPractice: [
        "Before we dive into your pitch, what do you think the homeowner is most concerned about when they see a roofer at their door?",
        "In that response, I noticed you covered most points well. Which of the 5 Non-Negotiables do you think could use more emphasis?",
        "What does your body language and tone tell the homeowner about Roof-ER's professionalism?",
        "How would you adapt that approach for a homeowner who seems rushed or distracted?"
      ],
      damageAssessment: [
        "When you see this type of marking on a shingle, what story does it tell about the weather event?",
        "Why do you think we photograph collateral damage even when it seems minor?",
        "What questions would an adjuster ask about this damage pattern?",
        "How does the age of this damage affect your inspection strategy?"
      ],
      objectionHandling: [
        "Before responding to that objection, what underlying concern do you think the homeowner is really expressing?",
        "How does understanding their perspective change your approach?",
        "What Roof-ER value would be most important to demonstrate in this situation?",
        "What would success look like in this conversation?"
      ],
      technical: [
        "What would happen if we didn't address this flashing issue?",
        "How would you explain this technical concept to a homeowner in simple terms?",
        "What evidence would support your assessment here?"
      ],
      legal: [
        "What are the potential consequences if we don't follow proper procedures here?",
        "How does this regulation protect both the homeowner and Roof-ER?",
        "What documentation would you need in this situation?"
      ]
    };

    return questions[context.moduleType]?.[Math.floor(Math.random() * questions[context.moduleType].length)] ||
           "That's an interesting approach. What led you to handle it that way?";
  }

  detectsError(userInput, context) {
    const commonErrors = {
      technical: ["aluminum flashing", "3-tab replacement", "spray foam repair"],
      sales: ["guaranteed approval", "insurance will pay", "no cost to you"],
      legal: ["promise specific outcomes", "guarantee coverage", "speak for insurance"]
    };

    return Object.values(commonErrors).some(errorList =>
      errorList.some(error => userInput.toLowerCase().includes(error))
    );
  }

  generateCorrectionGuidance(userInput, context) {
    return "I notice there might be a compliance issue there. Let's think through this together. What are the key principles we need to follow in this situation, and how might we adjust the approach to stay within best practices?";
  }

  generateAdaptiveResponse(userInput, context, learningState) {
    // Personalized feedback based on user's learning pattern
    const responses = {
      encouragement: [
        "You're developing strong instincts for this work. Let's refine that approach further.",
        "I can see you're thinking like a professional Roof-ER rep. Here's how we can sharpen that skill.",
        "That shows good understanding of the fundamentals. Ready for the next level?",
        "Excellent progress! Your confidence is building in exactly the right areas."
      ],
      correction: [
        "I appreciate your thinking there. Let's explore why that approach might create challenges.",
        "That's a common first instinct. In the field, we've learned that this approach works better because...",
        "Good attempt. Let me share what experienced reps have discovered about that situation.",
        "Close! Let's adjust one key element to make this even more effective."
      ],
      deepening: [
        "You've got the technique down. Now let's explore the psychology behind why it works.",
        "Excellent execution. What do you think the homeowner is experiencing during that interaction?",
        "Perfect! Now, how would you adapt that approach for different personality types?",
        "Outstanding! That's exactly how top performers handle this situation."
      ]
    };

    const responseType = this.determineResponseType(userInput, learningState);
    return responses[responseType][Math.floor(Math.random() * responses[responseType].length)];
  }

  determineResponseType(userInput, learningState) {
    if (learningState.confidence < 0.6) return 'encouragement';
    if (learningState.hasErrors) return 'correction';
    return 'deepening';
  }

  needsConceptBreakdown(userInput) {
    const confusionIndicators = ['confused', 'don\'t understand', 'not sure', 'what do you mean', 'can you explain', 'help me'];
    return confusionIndicators.some(indicator => userInput.toLowerCase().includes(indicator));
  }

  breakDownConcept(userInput, context) {
    return "I can see you'd like more clarity on this. Let me break it down into simpler steps. First, let's focus on the core principle here, then we'll build up to the full application...";
  }
}

// Enhanced Quiz Component with Module-Specific Questions
const QuizComponent = ({ module, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Comprehensive quiz questions for all 10 modules
  const allQuizQuestions = {
    1: [ // Foundation & Company Culture
      {
        question: "What is Roof-ER's core mission?",
        options: [
          "To be the biggest roofing company",
          "To hold a fiduciary responsibility to our customers",
          "To provide the cheapest roofing services",
          "To work with as many insurance companies as possible"
        ],
        correct: 1,
        explanation: "Our mission is to hold a fiduciary responsibility to our customers - plain and simple."
      },
      {
        question: "What percentage of roofing companies does Roof-ER's quality standards place us in?",
        options: ["Top 5%", "Elite 2%", "Top 10%", "Top 1%"],
        correct: 1,
        explanation: "Our confidence in our craft propels us into the elite 2% of all roofing companies in the entire nation."
      },
      {
        question: "Which of these is NOT one of Roof-ER's core values?",
        options: ["Integrity", "Quality", "Simplicity", "Profitability"],
        correct: 3,
        explanation: "Our three core values are Integrity, Quality, and Simplicity."
      }
    ],
    2: [ // Initial Pitch Mastery
      {
        question: "How many Non-Negotiables must be included in every initial pitch?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation: "There are 5 Non-Negotiables that must be included in every pitch."
      },
      {
        question: "What should you do when a homeowner says 'I'm not interested' before you finish?",
        options: [
          "Leave immediately",
          "React positively with an agreeable response",
          "Argue with them",
          "Hand them a business card and leave"
        ],
        correct: 1,
        explanation: "Always react positively with an agreeable response and attitude."
      },
      {
        question: "When should you ask for the homeowner's insurance company?",
        options: [
          "At the very beginning",
          "After the roof inspection",
          "During the handshake and name exchange",
          "Only if they seem interested"
        ],
        correct: 2,
        explanation: "Ask for their insurance company during the handshake close: 'Oh and by the way do you know who your insurance company is?'"
      }
    ],
    3: [ // Roofing Fundamentals & Technical Mastery
      {
        question: "What causes 90% of roof leaks?",
        options: ["Shingle damage", "Flashing failures", "Poor installation", "Age of materials"],
        correct: 1,
        explanation: "Flashing failures cause 90% of roof leaks - often more critical than shingle condition."
      },
      {
        question: "What is the most common roofing material for residential properties?",
        options: ["Metal", "Cedar", "Asphalt architectural shingles", "TPO"],
        correct: 2,
        explanation: "Asphalt architectural shingles are the most common roofing material."
      },
      {
        question: "Where two roof planes meet at an angle, creating a water collection point, is called a:",
        options: ["Ridge", "Eave", "Valley", "Rake"],
        correct: 2,
        explanation: "A valley is where two roof planes meet at an angle and serves as a water collection point."
      }
    ],
    4: [ // Storm Damage Assessment & Documentation
      {
        question: "What are the three types of storm damage that qualify for insurance claims?",
        options: [
          "Wind, hail, lightning",
          "Hail, wind, tornado",
          "Wind, hail, rain",
          "Hail, wind, falling objects"
        ],
        correct: 0,
        explanation: "The three qualifying types are wind damage, hail damage, and lightning damage."
      },
      {
        question: "What is the minimum hail size that typically causes damage to architectural shingles?",
        options: ["Pea size (1/4 inch)", "Nickel size (7/8 inch)", "Quarter size (1 inch)", "Golf ball size (1.75 inch)"],
        correct: 1,
        explanation: "Nickel-sized hail (7/8 inch) typically begins to cause damage to architectural shingles."
      },
      {
        question: "When documenting hail damage, what pattern should you look for on shingles?",
        options: [
          "Circular marks with exposed granules",
          "Linear cracks",
          "Curled edges",
          "Color fading"
        ],
        correct: 0,
        explanation: "Hail damage appears as circular marks where granules have been knocked off, exposing the asphalt mat."
      }
    ],
    5: [ // Insurance Process & Claims Management
      {
        question: "What is an insurance deductible?",
        options: [
          "The total cost of the claim",
          "The amount the homeowner pays out of pocket",
          "The insurance company's profit",
          "The contractor's fee"
        ],
        correct: 1,
        explanation: "The deductible is the amount the homeowner must pay out of pocket before insurance coverage begins."
      },
      {
        question: "Who determines the scope of work for an insurance claim?",
        options: [
          "The contractor",
          "The homeowner",
          "The insurance adjuster",
          "Roof-ER management"
        ],
        correct: 2,
        explanation: "The insurance adjuster determines what damage qualifies for coverage and the scope of work."
      },
      {
        question: "What should you NEVER guarantee to a homeowner?",
        options: [
          "Quality workmanship",
          "Professional service",
          "Insurance approval",
          "Timely completion"
        ],
        correct: 2,
        explanation: "Never guarantee insurance approval - only the insurance company can make coverage decisions."
      }
    ],
    6: [ // Advanced Objection Handling
      {
        question: "When a homeowner says 'I need to think about it,' what is their likely underlying concern?",
        options: [
          "They don't trust contractors",
          "They need to discuss with spouse/family",
          "They're worried about cost",
          "All of the above"
        ],
        correct: 3,
        explanation: "This objection can mask various concerns including trust, family consultation, or financial worries."
      },
      {
        question: "What is the best response to 'My roof is only 10 years old'?",
        options: [
          "That's too old, you need a new roof",
          "Age doesn't matter if there's storm damage",
          "You're right, storm damage doesn't affect newer roofs",
          "We only work on older roofs"
        ],
        correct: 1,
        explanation: "Storm damage can affect roofs of any age - the age doesn't prevent damage from occurring."
      },
      {
        question: "What is the key principle when handling any objection?",
        options: [
          "Argue until they agree",
          "Leave immediately",
          "React positively and ask questions",
          "Offer a discount"
        ],
        correct: 2,
        explanation: "Always react positively with an agreeable response and ask questions to understand their concern."
      }
    ],
    7: [ // Legal Compliance & Ethics
      {
        question: "What is prohibited when discussing insurance claims with homeowners?",
        options: [
          "Explaining the claims process",
          "Guaranteeing specific claim outcomes",
          "Providing documentation",
          "Answering questions about damage"
        ],
        correct: 1,
        explanation: "You cannot guarantee specific insurance outcomes as only the insurance company makes coverage decisions."
      },
      {
        question: "What must be included in all written estimates?",
        options: [
          "Company name and license number",
          "Detailed scope of work",
          "Material specifications",
          "All of the above"
        ],
        correct: 3,
        explanation: "Professional estimates must include all these elements for legal compliance and transparency."
      },
      {
        question: "When is it appropriate to speak directly to an insurance adjuster?",
        options: [
          "Only with homeowner permission",
          "Anytime during business hours",
          "Only after the claim is approved",
          "Never - only homeowners can speak to adjusters"
        ],
        correct: 0,
        explanation: "Always get explicit homeowner permission before communicating directly with their insurance adjuster."
      }
    ],
    8: [ // Customer Communication & Relationship Management
      {
        question: "What is the most important element of professional communication?",
        options: [
          "Using technical terms",
          "Speaking quickly to save time",
          "Active listening and clear explanations",
          "Always agreeing with the customer"
        ],
        correct: 2,
        explanation: "Active listening and providing clear, understandable explanations build trust and ensure proper communication."
      },
      {
        question: "When should you follow up with a customer after initial contact?",
        options: [
          "Only if they call you",
          "Within 24-48 hours",
          "After one week",
          "When the insurance adjuster schedules"
        ],
        correct: 1,
        explanation: "Professional follow-up within 24-48 hours shows reliability and maintains momentum."
      },
      {
        question: "How should you handle a frustrated or upset customer?",
        options: [
          "Match their energy level",
          "Defend company policies",
          "Listen actively and empathize",
          "Transfer them to management"
        ],
        correct: 2,
        explanation: "Active listening and empathy help de-escalate situations and build understanding."
      }
    ],
    9: [ // Quality Control & Project Management
      {
        question: "What is the primary purpose of quality control inspections?",
        options: [
          "To find problems with workers",
          "To ensure work meets Roof-ER standards",
          "To delay project completion",
          "To justify higher prices"
        ],
        correct: 1,
        explanation: "Quality control ensures all work meets Roof-ER's elite 2% standards and customer expectations."
      },
      {
        question: "When should project timelines be communicated to homeowners?",
        options: [
          "After work begins",
          "During initial consultation",
          "When materials arrive",
          "Only if they ask"
        ],
        correct: 1,
        explanation: "Clear timeline communication during initial consultation sets proper expectations and demonstrates professionalism."
      },
      {
        question: "What should be done if unexpected issues are discovered during installation?",
        options: [
          "Fix them without telling anyone",
          "Stop work immediately",
          "Document and communicate with homeowner promptly",
          "Wait until project completion to mention them"
        ],
        correct: 2,
        explanation: "Prompt documentation and communication maintains trust and ensures proper handling of unexpected issues."
      }
    ],
    10: [ // Advanced Sales Techniques & Professional Development
      {
        question: "What is the key to building long-term professional success?",
        options: [
          "Closing every deal",
          "Working the most hours",
          "Building genuine relationships and maintaining integrity",
          "Having the lowest prices"
        ],
        correct: 2,
        explanation: "Long-term success comes from building genuine relationships while maintaining integrity and professional standards."
      },
      {
        question: "What should drive continuous improvement in your professional development?",
        options: [
          "Company requirements only",
          "Customer feedback and industry changes",
          "Personal comfort level",
          "Competitor activities"
        ],
        correct: 1,
        explanation: "Customer feedback and industry changes should drive continuous learning and improvement."
      },
      {
        question: "What is the ultimate measure of success for a Roof-ER representative?",
        options: [
          "Number of leads generated",
          "Speed of sales process",
          "Customer satisfaction and successful claim outcomes",
          "Commission earned"
        ],
        correct: 2,
        explanation: "True success is measured by customer satisfaction and helping homeowners achieve successful claim outcomes."
      }
    ]
  };

  const questions = allQuizQuestions[module.id] || [];

  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);

    if (finalScore >= 80) {
      onComplete(module.id, finalScore);
    }
  };

  if (showResults) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold mb-4 ${score >= 80 ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {score >= 80 ? 'Congratulations!' : 'Keep Learning!'}
            </h3>
            <p className="text-gray-600">
              {score >= 80
                ? 'You\'ve mastered this module!'
                : 'Review the material and try again. You need 80% to pass.'}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {questions.map((question, index) => {
              const isCorrect = answers[index] === question.correct;
              return (
                <div key={index} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="font-medium mb-2">{question.question}</div>
                  <div className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    Your answer: {question.options[answers[index]] || 'No answer'}
                  </div>
                  {!isCorrect && (
                    <div className="text-sm text-green-700 mt-1">
                      Correct: {question.options[question.correct]}
                    </div>
                  )}
                  <div className="text-xs text-gray-600 mt-2">{question.explanation}</div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
            {score < 80 && (
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers({});
                  setShowResults(false);
                  setScore(0);
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <h3 className="text-xl font-bold mb-4">Quiz Not Available</h3>
          <p className="text-gray-600 mb-6">Quiz questions for this module are coming soon!</p>
          <button
            onClick={onClose}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">{module.title} - Quiz</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-medium mb-4">{questions[currentQuestion]?.question}</h4>
          <div className="space-y-3">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion, index)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  answers[currentQuestion] === index
                    ? 'bg-red-50 border-red-600 text-red-700'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== questions.length}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={answers[currentQuestion] === undefined}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Agnes Practice Area Component
const AgnesPracticeArea = ({ module, isOpen, onClose, userProgress, setUserProgress }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [practiceMode, setPracticeMode] = useState('guided'); // guided, freeform, scenario
  const messagesEndRef = useRef(null);
  const agnesAI = useRef(new AgnesAI());

  const scenarios = module?.content?.agnesCoaching?.scenarios || [
    {
      title: "Practice Scenario",
      setup: "Let's practice the key concepts from this module.",
      agnesPrompt: "What aspect of this module would you like to work on first?"
    }
  ];

  useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      initializeAgnesSession();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeAgnesSession = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'agnes',
      content: `Hi! I'm Agnes, your AI learning coach for ${module.title}. I'm here to help you practice and deepen your understanding through guided conversation.

I believe in learning through questions and reflection rather than just giving you answers. Think of me as your thinking partner who will help you develop mastery through practice.

${scenarios[currentScenario] ? `Let's start with this scenario: ${scenarios[currentScenario].setup}

${scenarios[currentScenario].agnesPrompt}` : "What aspect of this module would you like to practice first?"}`,
      timestamp: new Date(),
      personality: 'encouraging'
    };

    setChatMessages([welcomeMessage]);
    setUserProgress(prev => ({
      ...prev,
      agnesInteractions: prev.agnesInteractions + 1
    }));
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate Agnes thinking time
    setTimeout(() => {
      const context = {
        currentModule: module,
        userLevel: userProgress.level,
        moduleType: module.gameType || 'general',
        questionType: inputMessage.includes('?') ? 'question' : 'response',
        needsGuidance: inputMessage.length < 30,
        hasConfusion: inputMessage.toLowerCase().includes('confused') || inputMessage.toLowerCase().includes('help'),
        needsDeepening: inputMessage.length > 100
      };

      const learningState = {
        confidence: userProgress.agnesInteractions > 5 ? 0.7 : 0.5,
        hasErrors: inputMessage.toLowerCase().includes('not sure') || inputMessage.toLowerCase().includes('wrong'),
        currentModule: module.id,
        userLevel: userProgress.level
      };

      const agnesResponse = agnesAI.current.generateResponse(inputMessage, context, learningState);

      const responseMessage = {
        id: Date.now() + 1,
        type: 'agnes',
        content: agnesResponse,
        timestamp: new Date(),
        personality: 'encouraging'
      };

      setChatMessages(prev => [...prev, responseMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const switchScenario = (index) => {
    setCurrentScenario(index);
    const scenarioMessage = {
      id: Date.now(),
      type: 'agnes',
      content: `Let's switch to a new scenario: ${scenarios[index].setup}

${scenarios[index].agnesPrompt}`,
      timestamp: new Date(),
      personality: 'encouraging'
    };
    setChatMessages(prev => [...prev, scenarioMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] flex flex-col mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Agnes AI Coach</h3>
              <p className="text-sm text-gray-600">{module.title} Practice Session</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {scenarios.length > 1 && (
              <select
                value={currentScenario}
                onChange={(e) => switchScenario(parseInt(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                {scenarios.map((scenario, index) => (
                  <option key={index} value={index}>{scenario.title}</option>
                ))}
              </select>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-red-600 text-white ml-12'
                  : 'bg-gray-100 text-gray-800 mr-12'
              }`}>
                {message.type === 'agnes' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-600">Agnes</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-red-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 mr-12 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-600">Agnes</span>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts, ask questions, or describe how you'd handle the situation..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="3"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>Agnes Sessions: {userProgress.agnesInteractions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced VR Training Modal Component
const VRTrainingModal = ({ isOpen, onClose, currentModule, modules }) => {
  const [vrMode, setVrMode] = useState('practice'); // practice, assessment, scenario
  const [currentVRLesson, setCurrentVRLesson] = useState(0);
  const [vrProgress, setVrProgress] = useState(0);
  const [isVRActive, setIsVRActive] = useState(false);

  const vrLessons = [
    {
      title: "Door Approach Simulation",
      description: "Practice your initial approach and opening statement",
      difficulty: "Beginner",
      duration: "5-10 minutes",
      skills: ["Body Language", "Voice Tonality", "Initial Greeting"]
    },
    {
      title: "Roof Inspection Training",
      description: "Virtual roof inspection with damage identification",
      difficulty: "Intermediate",
      duration: "15-20 minutes",
      skills: ["Damage Assessment", "Photo Documentation", "Safety Protocols"]
    },
    {
      title: "Objection Handling Scenarios",
      description: "Handle various homeowner objections in realistic settings",
      difficulty: "Advanced",
      duration: "10-15 minutes",
      skills: ["Active Listening", "Empathy", "Persuasion"]
    },
    {
      title: "Insurance Adjuster Meeting",
      description: "Professional interaction with insurance adjusters",
      difficulty: "Advanced",
      duration: "20-25 minutes",
      skills: ["Professional Communication", "Documentation", "Technical Discussion"]
    }
  ];

  const startVRSession = () => {
    setIsVRActive(true);
    setVrProgress(0);

    // Simulate VR session progress
    const progressInterval = setInterval(() => {
      setVrProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsVRActive(false);
          return 100;
        }
        return prev + 2;
      });
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">VR Training Simulator</h3>
                <p className="text-gray-600">Immersive practice environments for {modules[currentModule]?.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!isVRActive ? (
            <>
              {/* VR Mode Selection */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {['practice', 'assessment', 'scenario'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setVrMode(mode)}
                    className={`p-4 rounded-lg border text-center transition-colors ${
                      vrMode === mode
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium capitalize">{mode}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {mode === 'practice' && 'Free practice mode'}
                      {mode === 'assessment' && 'Graded performance'}
                      {mode === 'scenario' && 'Guided scenarios'}
                    </div>
                  </button>
                ))}
              </div>

              {/* VR Lessons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {vrLessons.map((lesson, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border cursor-pointer transition-all ${
                      currentVRLesson === index
                        ? 'bg-blue-50 border-blue-600 shadow-lg'
                        : 'bg-white border-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => setCurrentVRLesson(index)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-lg text-gray-800">{lesson.title}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {lesson.difficulty}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{lesson.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{lesson.duration}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">Duration</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-2">Skills Practiced:</div>
                      <div className="flex flex-wrap gap-1">
                        {lesson.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Start VR Button */}
              <div className="text-center">
                <button
                  onClick={startVRSession}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Video className="w-6 h-6" />
                    <span>Start VR Session</span>
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                </button>
                <p className="text-gray-600 mt-3">
                  Selected: {vrLessons[currentVRLesson].title} ({vrMode} mode)
                </p>
              </div>
            </>
          ) : (
            /* VR Session Active */
            <div className="text-center py-12">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-8 flex items-center justify-center animate-pulse">
                <Video className="w-16 h-16 text-white" />
              </div>

              <h4 className="text-2xl font-bold mb-4">VR Session in Progress</h4>
              <p className="text-gray-600 mb-8">{vrLessons[currentVRLesson].title}</p>

              <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{vrProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${vrProgress}%` }}
                  />
                </div>
              </div>

              {vrProgress === 100 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h5 className="font-bold text-green-800 mb-2">Session Complete!</h5>
                  <p className="text-green-700 text-sm">Great job completing the VR training session.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component with Enhanced Module Content
const RoofErAdvancedTrainingSystem = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [achievements, setAchievements] = useState(new Set());
  const [userProgress, setUserProgress] = useState({
    totalPoints: 0,
    level: 1,
    streak: 0,
    badges: [],
    certifications: [],
    agnesInteractions: 0,
    strengthAreas: [],
    improvementAreas: []
  });
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAICoach, setShowAICoach] = useState(false);
  const [showVRTrainer, setShowVRTrainer] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const audioRef = useRef(null);

  // Complete 10 modules with comprehensive content
  const modules = [
    {
      id: 1,
      title: "Foundation & Company Culture",
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-gradient-to-r from-red-600 to-red-700",
      borderColor: "border-red-600",
      content: {
        mission: "At Roof-ER, our mission is to hold a fiduciary responsibility to our customers - plain and simple. In an industry known for poor workmanship, lack of communication, and at times, outright deceit; we seek to restore the name of exterior remodeling contractors nationwide.",
        coreValues: {
          integrity: "At Roof-ER, we set the standard for Integrity in an industry that has lost credibility among many consumers. We do not only set the standard of integrity with our clients, but it starts with being honest to ourselves. We have the courage to truly see ourselves, recognize where we can grow, and implement changes to meet the demands of reality.",
          quality: "We guarantee the highest Quality in our products and services. Our confidence in our craft propels us into the elite 2% of all roofing companies in the entire nation. Quality starts with the moment a client interacts with one of our representatives at the door. The Quality demonstrated in every aspect of what we do continues to make Roof-ER the gold standard of this industry.",
          simplicity: "We strive to deliver an overwhelmingly positive experience for everyone who interacts with Roof-ER. By embracing the complexities of our industry, we provide exceptional results to our clients. Our clients value the Simplicity of partnering with us – we guarantee a seamless process from start to finish ensuring satisfaction with the final outcome."
        },
        elite2Percent: "Our confidence in our craft propels us into the elite 2% of all roofing companies in the entire nation.",
        differentiation: "What separates Roof-ER reps from competitors is consistency - every rep uses the same templates, codes, and process.",
        agnesCoaching: {
          scenarios: [
            {
              title: "Value Proposition Challenge",
              setup: "A homeowner asks 'What makes you different from the other 5 roofers who knocked this week?'",
              agnesPrompt: "Before responding, what do you think this homeowner has experienced with other contractors? How can you demonstrate our values rather than just claim them?"
            },
            {
              title: "Elite 2% Explanation",
              setup: "Practice explaining why Roof-ER is in the elite 2% without sounding arrogant.",
              agnesPrompt: "What specific examples could you give that show rather than tell this elite status? How do you make it about the homeowner's benefit rather than our achievement?"
            }
          ],
          practicePoints: [
            "Value articulation without corporate speak",
            "Demonstrating vs claiming quality",
            "Making simplicity tangible for homeowners"
          ]
        }
      },
      lessons: [
        "Mission & Fiduciary Responsibility Deep Dive",
        "Core Values: Integrity, Quality, Simplicity",
        "Elite 2% Standard & Competitive Differentiation",
        "Customer Experience Philosophy"
      ],
      skills: ["Company Culture", "Professional Standards", "Ethics", "Industry Leadership"],
      points: 150,
      gameType: "values-matching",
      agnesIntegration: "deep"
    },
    {
      id: 2,
      title: "Initial Pitch Mastery",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-gradient-to-r from-red-600 to-red-700",
      borderColor: "border-red-600",
      content: {
        fiveNonNegotiables: [
          "Who you are (name and confident introduction)",
          "Who we are and what we do (Roof ER specializes in insurance-paid roof replacements)",
          "Make it relatable (storm damage in their area)",
          "What you're there to do (free inspection for similar damage)",
          "Go for the close (get them to agree to the inspection)"
        ],
        genericScript: {
          opening: "Hi, how are you? My Name is ________ with Roof-ER we're a local roofing company that specializes in helping homeowners get their roof replaced, paid for by their insurance!",
          stormReference: "We've had a lot of storms here in Northern Virginia/Central Virginia/Philadelphia/Maryland over the past few months that have done a lot of damage!",
          socialProof: "We're already working with your neighbors. We've been able to help them get fully approved through their insurance company to have their roof replaced."
        },
        agnesCoaching: {
          scenarios: [
            {
              title: "Skeptical Homeowner",
              setup: "Homeowner opens door but immediately says 'I'm not interested' before you can finish your introduction.",
              agnesPrompt: "Before we practice your response, what do you think might be going through this homeowner's mind right now? What past experiences might they have had?"
            },
            {
              title: "Spouse Objection",
              setup: "Homeowner seems interested but says 'I need to talk to my spouse first.'",
              agnesPrompt: "This is actually a positive sign. Why do you think they mentioned their spouse? How can we work with this rather than against it?"
            }
          ]
        }
      },
      lessons: [
        "The 5 Non-Negotiables: Perfect Execution",
        "Generic vs Specific Script Mastery",
        "Advanced Objection Handling Psychology",
        "Rapport Building & Information Gathering"
      ],
      skills: ["Door Approach", "Script Delivery", "Objection Handling", "Social Proof", "Rapport Building"],
      points: 200,
      gameType: "pitch-simulator",
      agnesIntegration: "intensive"
    },
    {
      id: 3,
      title: "Roofing Fundamentals & Technical Mastery",
      icon: <Target className="w-6 h-6" />,
      color: "bg-gradient-to-r from-gray-700 to-gray-800",
      borderColor: "border-gray-700",
      content: {
        materials: {
          primary: "Asphalt - Most Common Roofing Material (architectural shingles)",
          alternatives: ["Metal (standing seam, corrugated)", "Cedar/Wood/synthetic", "TPO/EPDM/Rolled Asphalt (commercial)"]
        },
        terminology: {
          eave: "Lower edge of roof where it meets the wall - critical for water drainage",
          rake: "Sloped edge of roof at gable end - often shows wind damage",
          ridge: "Peak of roof where two slopes meet - highest point and stress area",
          valley: "Where two roof planes meet at an angle - water collection point",
          soffit: "Underside of roof overhang - important for ventilation",
          fascia: "Vertical board along roof edge - supports gutters"
        },
        agnesCoaching: {
          scenarios: [
            {
              title: "Technical Questions",
              setup: "Homeowner asks 'What's the difference between architectural and 3-tab shingles?'",
              agnesPrompt: "Before you answer, think about what they're really asking. Are they concerned about quality, cost, or aesthetics?"
            }
          ]
        }
      },
      lessons: [
        "Roof Anatomy & Component Identification",
        "Material Types & Performance Characteristics",
        "Flashing Systems & Water Management",
        "Shingle Technology & Matching Challenges"
      ],
      skills: ["Technical Knowledge", "Material Identification", "System Understanding", "Industry Terminology"],
      points: 175,
      gameType: "roof-anatomy",
      agnesIntegration: "technical"
    },
    {
      id: 4,
      title: "Storm Damage Assessment & Documentation",
      icon: <Camera className="w-6 h-6" />,
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      borderColor: "border-blue-600",
      content: {
        damageTypes: {
          hail: "Circular marks on shingles where granules are knocked off, exposing the asphalt mat. Size matters - nickel-sized (7/8\") typically begins damage.",
          wind: "Lifted, torn, or missing shingles. Look for exposed nail heads, creased shingles, and torn starter strips.",
          lightning: "Burn marks, split wood, damaged electrical components. Often accompanied by fire damage."
        },
        documentationProcess: {
          overview: "Start with wide shots showing entire roof and damage context",
          detail: "Close-up photos of specific damage with reference objects for scale",
          collateral: "Gutters, siding, windows, outdoor fixtures - insurance covers all storm damage",
          interior: "Check attic and ceilings for water intrusion evidence"
        },
        photographyTechniques: {
          lighting: "Avoid shooting into sun, use natural lighting when possible",
          angles: "Multiple angles of same damage for complete documentation",
          reference: "Include coins, measuring tape, or hands for size reference",
          organization: "Systematic approach - start at one corner, work methodically"
        },
        agnesCoaching: {
          scenarios: [
            {
              title: "Questionable Damage",
              setup: "You find marks on shingles but aren't sure if they're hail damage or normal wear.",
              agnesPrompt: "What specific characteristics would help you distinguish between hail damage and normal aging? How would you document this uncertainty?"
            },
            {
              title: "Adjuster Disagreement",
              setup: "Insurance adjuster disagrees with your damage assessment.",
              agnesPrompt: "What additional evidence could you provide? How do you maintain professionalism while advocating for the homeowner?"
            }
          ],
          practicePoints: [
            "Damage pattern recognition",
            "Photography composition and documentation",
            "Communicating findings to homeowners"
          ]
        }
      },
      lessons: [
        "Storm Types & Damage Patterns",
        "Professional Photography & Documentation",
        "Damage Assessment Methodology",
        "Technology Tools & Apps"
      ],
      skills: ["Damage Assessment", "Photography", "Documentation", "Pattern Recognition"],
      points: 225,
      gameType: "damage-identification",
      agnesIntegration: "practical"
    },
    {
      id: 5,
      title: "Insurance Process & Claims Management",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-gradient-to-r from-green-600 to-green-700",
      borderColor: "border-green-600",
      content: {
        claimsProcess: {
          filing: "Homeowner contacts insurance company to report claim. Get claim number and adjuster contact info.",
          inspection: "Insurance adjuster schedules inspection. We coordinate to be present when possible.",
          evaluation: "Adjuster determines coverage and scope of work. We provide documentation and advocate for complete scope.",
          approval: "Insurance issues settlement. Review carefully for completeness before starting work."
        },
        keyTerms: {
          deductible: "Amount homeowner pays before insurance coverage begins. Varies by policy and storm type.",
          RCV: "Replacement Cost Value - full cost to replace with like kind and quality materials.",
          ACV: "Actual Cash Value - replacement cost minus depreciation. Most policies pay RCV after work completion.",
          supplement: "Additional payment for work discovered during project that wasn't in original scope."
        },
        commonIssues: {
          underwriting: "Insurance may underpay or miss damage. Document everything and request supplements when needed.",
          matching: "When partial replacement isn't possible due to discontinued materials, full replacement may be necessary.",
          codeUpgrades: "When local codes have changed since original installation, upgrades may be required."
        },
        agnesCoaching: {
          scenarios: [
            {
              title: "Deductible Confusion",
              setup: "Homeowner asks you to 'work with them' on the deductible amount.",
              agnesPrompt: "What are the legal and ethical implications here? How do you explain the importance of following insurance terms exactly?"
            },
            {
              title: "Claim Denial",
              setup: "Insurance denies the claim saying damage is from normal wear and tear.",
              agnesPrompt: "What steps would you take to challenge this decision? What additional evidence might be needed?"
            }
          ],
          practicePoints: [
            "Insurance terminology and process education",
            "Deductible compliance and ethics",
            "Supplement request justification"
          ]
        }
      },
      lessons: [
        "Claims Process From Start to Finish",
        "Insurance Terminology & Policy Types",
        "Working with Adjusters Professionally",
        "Supplement Requests & Negotiations"
      ],
      skills: ["Insurance Knowledge", "Claims Process", "Documentation", "Professional Communication"],
      points: 200,
      gameType: "claims-process",
      agnesIntegration: "detailed"
    },
    {
      id: 6,
      title: "Advanced Objection Handling",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-gradient-to-r from-purple-600 to-purple-700",
      borderColor: "border-purple-600",
      content: {
        objectionTypes: {
          logical: "Based on facts or circumstances - address with information and evidence",
          emotional: "Based on feelings or past experiences - address with empathy and understanding",
          hidden: "Underlying concerns not directly stated - uncover through questioning"
        },
        commonObjections: {
          "not interested": "Often means 'I don't understand the value' - need to create interest through education",
          "talk to spouse": "Shows consideration and may indicate genuine interest - work with it, don't fight it",
          "roof is new": "Age doesn't prevent storm damage - focus on recent weather events",
          "already checked": "Different types of inspections serve different purposes - explain storm damage assessment",
          "no money": "Insurance pays for covered damage - education about claims process needed"
        },
        responseFramework: {
          acknowledge: "Show you heard and understand their concern",
          clarify: "Ask questions to understand the real issue",
          respond: "Address the specific concern with relevant information",
          confirm: "Ensure they understand and are comfortable moving forward"
        },
        agnesCoaching: {
          scenarios: [
            {
              title: "Multiple Objections",
              setup: "Homeowner gives several objections in rapid succession: 'I'm not interested, my roof is fine, and I don't have time.'",
              agnesPrompt: "Which objection should you address first? How do you avoid overwhelming them with responses to everything at once?"
            },
            {
              title: "Aggressive Homeowner",
              setup: "Homeowner becomes hostile: 'You people are all scams! I've been burned before!'",
              agnesPrompt: "What emotions are driving this response? How do you de-escalate while still creating an opportunity?"
            },
            {
              title: "Technical Challenge",
              setup: "Homeowner says 'I just had my roof checked by ABC company and they said it was perfect.'",
              agnesPrompt: "How do you respectfully differentiate between a maintenance inspection and storm damage assessment without criticizing the other company?"
            }
          ],
          practicePoints: [
            "Identifying objection types and underlying concerns",
            "De-escalation techniques for emotional situations",
            "Reframing conversations toward value and benefit"
          ]
        }
      },
      lessons: [
        "Psychology of Objections & Resistance",
        "The ACRR Framework for Responses",
        "Emotional Intelligence in Sales",
        "Building Trust Through Understanding"
      ],
      skills: ["Psychology", "Communication", "Conflict Resolution", "Emotional Intelligence"],
      points: 250,
      gameType: "objection-scenarios",
      agnesIntegration: "intensive"
    },
    {
      id: 7,
      title: "Legal Compliance & Ethics",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-gradient-to-r from-orange-600 to-orange-700",
      borderColor: "border-orange-600",
      content: {
        legalRequirements: {
          licensing: "Maintain proper contractor licensing for all jurisdictions where working",
          insurance: "Carry appropriate liability and workers compensation insurance",
          contracts: "Written contracts required for work over specified amounts (varies by state)",
          permits: "Obtain proper permits for roofing work when required by local codes"
        },
        ethicalGuidelines: {
          honesty: "Never misrepresent damage, costs, or insurance processes to homeowners",
          competence: "Only perform work within your skill and knowledge level",
          disclosure: "Fully disclose any conflicts of interest or potential issues",
          respect: "Treat all customers, competitors, and industry professionals with respect"
        },
        prohibitedPractices: {
          fraudulent: "Inflating claims, creating false damage, or misrepresenting scope of work",
          deceptive: "Making false promises about insurance coverage or claim outcomes",
          coercive: "Pressuring homeowners to sign contracts or make immediate decisions",
          incompetent: "Performing work without proper knowledge, tools, or materials"
        },
        agnesCoaching: {
          scenarios: [
            {
              title: "Pressure to Cut Corners",
              setup: "Homeowner asks you to add work to the insurance claim that isn't storm-related damage.",
              agnesPrompt: "What are the legal and ethical issues here? How do you maintain the relationship while staying compliant?"
            },
            {
              title: "Competitor Criticism",
              setup: "Homeowner tells you another contractor said negative things about Roof-ER's work.",
              agnesPrompt: "How do you respond professionally without engaging in competitor criticism? What's the ethical way to handle this?"
            }
          ],
          practicePoints: [
            "Recognizing ethical dilemmas before they become problems",
            "Communicating compliance requirements to homeowners",
            "Maintaining professionalism under pressure"
          ]
        }
      },
      lessons: [
        "State and Local Licensing Requirements",
        "Insurance Fraud Prevention",
        "Contract Law and Consumer Protection",
        "Professional Ethics and Standards"
      ],
      skills: ["Legal Knowledge", "Ethics", "Compliance", "Risk Management"],
      points: 175,
      gameType: "ethics-scenarios",
      agnesIntegration: "guidance"
    },
    {
      id: 8,
      title: "Customer Communication & Relationship Management",
      icon: <Users className="w-6 h-6" />,
      color: "bg-gradient-to-r from-teal-600 to-teal-700",
      borderColor: "border-teal-600",
      content: {
        communicationPrinciples: {
          clarity: "Use clear, jargon-free language that homeowners can understand",
          timeliness: "Respond to calls and messages promptly - within 24 hours maximum",
          transparency: "Be honest about timelines, processes, and potential challenges",
          empathy: "Understand that roof damage can be stressful and overwhelming for homeowners"
        },
        activeListening: {
          focus: "Give full attention to what the homeowner is saying",
          clarify: "Ask questions to ensure you understand their concerns",
          reflect: "Paraphrase what you heard to confirm understanding",
          respond: "Address their specific concerns, not what you think they should be concerned about"
        },
        managingExpectations: {
          timeline: "Clearly communicate project timelines and potential delays",
          process: "Explain each step of the insurance and installation process",
          communication: "Set expectations for how often and when you'll provide updates",
          changes: "Promptly communicate any changes to scope, timeline, or cost"
        },
        agnesCoaching: {
          scenarios: [
            {
              title: "Anxious Homeowner",
              setup: "Homeowner calls daily asking for updates on their insurance claim status.",
              agnesPrompt: "What underlying needs is this behavior expressing? How can you address their anxiety while managing your time effectively?"
            },
            {
              title: "Miscommunication Issue",
              setup: "Homeowner is upset because they expected work to start this week, but you told them next week.",
              agnesPrompt: "How do you handle this situation while maintaining the relationship? What systems could prevent this in the future?"
            }
          ],
          practicePoints: [
            "Active listening techniques in practice",
            "Explaining complex processes in simple terms",
            "Managing emotional situations with empathy"
          ]
        }
      },
      lessons: [
        "Active Listening and Empathy",
        "Clear Communication Strategies",
        "Expectation Management",
        "Conflict Resolution Techniques"
      ],
      skills: ["Communication", "Relationship Management", "Conflict Resolution", "Customer Service"],
      points: 200,
      gameType: "communication-practice",
      agnesIntegration: "behavioral"
    },
    {
      id: 9,
      title: "Quality Control & Project Management",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-gradient-to-r from-indigo-600 to-indigo-700",
      borderColor: "border-indigo-600",
      content: {
        qualityStandards: {
          materials: "Use only manufacturer-approved materials installed according to specifications",
          workmanship: "Follow industry best practices and Roof-ER's elevated standards",
          safety: "Maintain safe working conditions for crew and homeowners",
          cleanup: "Leave property cleaner than we found it"
        },
        projectPhases: {
          preparation: "Material delivery, permits, homeowner communication, site preparation",
          installation: "Removal, installation, quality checks at each stage",
          completion: "Final inspection, cleanup, documentation, homeowner walkthrough",
          followup: "Warranty information, maintenance recommendations, satisfaction check"
        },
        qualityControl: {
          inspections: "Multiple quality checkpoints throughout the project",
          documentation: "Photo documentation of work progress and completion",
          testing: "Water testing and performance verification where appropriate",
          certification: "Final quality certification before project closeout"
        },
        agnesCoaching: {
          scenarios: [
            {
              title: "Quality Issue Discovery",
              setup: "During installation, you discover the previous roofing work was done incorrectly and needs additional repair.",
              agnesPrompt: "How do you handle this discovery with the homeowner? What's the process for addressing unexpected scope changes?"
            },
            {
              title: "Timeline Pressure",
              setup: "Homeowner is pressuring to finish quickly because they have an event planned at their home.",
              agnesPrompt: "How do you balance customer satisfaction with quality standards? What are the risks of rushing work?"
            }
          ],
          practicePoints: [
            "Identifying quality issues before they become problems",
            "Communicating scope changes professionally",
            "Balancing speed with quality requirements"
          ]
        }
      },
      lessons: [
        "Roof-ER Quality Standards",
        "Project Management Best Practices",
        "Quality Control Procedures",
        "Customer Satisfaction Metrics"
      ],
      skills: ["Quality Control", "Project Management", "Problem Solving", "Attention to Detail"],
      points: 200,
      gameType: "quality-scenarios",
      agnesIntegration: "systematic"
    },
    {
      id: 10,
      title: "Advanced Sales Techniques & Professional Development",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-gradient-to-r from-pink-600 to-pink-700",
      borderColor: "border-pink-600",
      content: {
        advancedTechniques: {
          consultativeSelling: "Focus on understanding customer needs and providing solutions rather than pushing products",
          valueBasedSelling: "Emphasize the value and benefits rather than just features and price",
          relationshipBuilding: "Develop long-term relationships that generate referrals and repeat business",
          storytelling: "Use customer success stories and case studies to illustrate value"
        },
        professionalDevelopment: {
          continuousLearning: "Stay current with industry trends, regulations, and best practices",
          skillBuilding: "Continuously improve communication, technical, and business skills",
          networking: "Build relationships with other professionals in the industry",
          mentoring: "Learn from experienced professionals and help develop newer team members"
        },
        businessDevelopment: {
          referralSystems: "Develop systems to generate and track referrals from satisfied customers",
          marketingSupport: "Understand and utilize company marketing materials and strategies",
          communityInvolvement: "Participate in community events and activities to build local presence",
          digitalPresence: "Maintain professional online presence and reputation"
        },
        agnesCoaching: {
          scenarios: [
            {
              title: "Long-term Career Planning",
              setup: "You want to advance within Roof-ER and eventually move into management.",
              agnesPrompt: "What skills and experiences do you need to develop? How can you demonstrate leadership potential in your current role?"
            },
            {
              title: "Difficult Market Conditions",
              setup: "Your area hasn't had significant storms recently, making it harder to generate leads.",
              agnesPrompt: "How do you adapt your approach for different market conditions? What other value can you provide to homeowners?"
            }
          ],
          practicePoints: [
            "Advanced persuasion and influence techniques",
            "Building and maintaining professional relationships",
            "Strategic thinking and business development"
          ]
        }
      },
      lessons: [
        "Consultative Selling Mastery",
        "Relationship Building Strategies",
        "Professional Growth Planning",
        "Industry Leadership Development"
      ],
      skills: ["Advanced Sales", "Leadership", "Business Development", "Strategic Thinking"],
      points: 300,
      gameType: "advanced-scenarios",
      agnesIntegration: "mastery"
    }
  ];

  // Enhanced Module Content Component
  const EnhancedModuleContent = ({ module }) => {
    const [activeSection, setActiveSection] = useState('overview');

    const renderContent = () => {
      switch (activeSection) {
        case 'overview':
          return (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Module Overview</h4>
                <p className="text-gray-700 leading-relaxed">
                  {module.content.mission || module.content.fiveNonNegotiables?.[0] || "This module covers essential concepts and practical applications."}
                </p>
              </div>

              {module.content.coreValues && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-4">Core Values</h4>
                  <div className="space-y-4">
                    {Object.entries(module.content.coreValues).map(([key, value]) => (
                      <div key={key} className="border-l-4 border-red-600 pl-4">
                        <h5 className="font-medium capitalize text-gray-800">{key}</h5>
                        <p className="text-gray-600 text-sm mt-1">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {module.content.fiveNonNegotiables && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-4">The 5 Non-Negotiables</h4>
                  <div className="space-y-3">
                    {module.content.fiveNonNegotiables.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 flex-1">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );

        case 'lessons':
          return (
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Lessons</h4>
              {module.lessons.map((lesson, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    currentLesson === index
                      ? 'bg-red-50 border-red-600'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setCurrentLesson(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Lesson {index + 1}: {lesson}</span>
                    {currentLesson === index && <Play className="w-5 h-5 text-red-600" />}
                  </div>
                </div>
              ))}
            </div>
          );

        case 'skills':
          return (
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Skills You'll Master</h4>
              <div className="grid grid-cols-2 gap-4">
                {module.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-800">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        default:
          return <div>Content not available</div>;
      }
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 ${module.color} rounded-full flex items-center justify-center text-white`}>
              {module.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{module.title}</h3>
              <p className="text-gray-600">{module.points} points • {module.lessons.length} lessons</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setShowQuiz(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Award className="w-5 h-5" />
              <span>Take Quiz</span>
            </button>
            <button
              onClick={() => setShowAICoach(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Bot className="w-5 h-5" />
              <span>Practice with Agnes</span>
            </button>
          </div>
        </div>

        {/* Content Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {['overview', 'lessons', 'skills'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === section
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    );
  };

  // Module completion handler
  const completeModule = (moduleId, quizScore) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
    setUserProgress(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + modules[moduleId - 1].points,
      level: Math.floor((prev.totalPoints + modules[moduleId - 1].points) / 1000) + 1,
      streak: prev.streak + 1
    }));

    // Add achievements
    if (quizScore === 100) {
      setAchievements(prev => new Set([...prev, `perfect-${moduleId}`]));
    }
    if (completedModules.size + 1 === 5) {
      setAchievements(prev => new Set([...prev, 'halfway-hero']));
    }
    if (completedModules.size + 1 === 10) {
      setAchievements(prev => new Set([...prev, 'master-graduate']));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-50">
      {/* Roof-ER Branded Header */}
      <div className="bg-white shadow-lg border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <RoofErLogo size="w-12 h-12" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Training Academy</h1>
                <p className="text-gray-600">Advanced AI-Powered Learning with Agnes</p>
              </div>
            </div>

            {/* Enhanced Progress Dashboard */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{userProgress.totalPoints}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">Level {userProgress.level}</div>
                <div className="text-sm text-gray-600">Current Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{userProgress.agnesInteractions}</div>
                <div className="text-sm text-gray-600">Agnes Sessions</div>
              </div>

              {/* Quick Access Buttons */}
              <button
                onClick={() => setShowAICoach(true)}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-lg"
              >
                <Bot className="w-5 h-5" />
                <span>Ask Agnes</span>
              </button>

              <button
                onClick={() => setShowVRTrainer(true)}
                className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Video className="w-5 h-5" />
                <span>VR Practice</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Training Modules</h2>
              <div className="space-y-3">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      currentModule === index
                        ? `${module.color} text-white shadow-lg transform scale-105`
                        : completedModules.has(module.id)
                        ? 'bg-green-50 border-green-600 text-green-700'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentModule(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentModule === index
                          ? 'bg-white bg-opacity-20'
                          : completedModules.has(module.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-600 text-white'
                      }`}>
                        {completedModules.has(module.id) ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          module.icon
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{module.title}</div>
                        <div className="text-xs opacity-75">{module.points} pts</div>
                      </div>
                      {currentModule === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Summary */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3">Progress Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Completed:</span>
                    <span className="font-medium">{completedModules.size}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Achievements:</span>
                    <span className="font-medium">{achievements.size}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedModules.size / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <EnhancedModuleContent module={modules[currentModule]} />
          </div>
        </div>
      </div>

      {/* Modals and Overlays */}
      {showQuiz && (
        <QuizComponent
          module={modules[currentModule]}
          onComplete={completeModule}
          onClose={() => setShowQuiz(false)}
        />
      )}

      {showAICoach && (
        <AgnesPracticeArea
          module={modules[currentModule]}
          isOpen={showAICoach}
          onClose={() => setShowAICoach(false)}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
        />
      )}

      {showVRTrainer && (
        <VRTrainingModal
          isOpen={showVRTrainer}
          onClose={() => setShowVRTrainer(false)}
          currentModule={currentModule}
          modules={modules}
        />
      )}
    </div>
  );
};

export default RoofErAdvancedTrainingSystem;