/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  User,
  Home,
  CheckCircle,
  ArrowRight,
  Clock,
  Target,
  Lightbulb,
  
  TrendingUp,
  Users,
  Award,
  Download,
  FileText,
} from 'lucide-react';

interface RoleplayScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  context: string;
  customerType:
    | 'Homeowner'
    | 'Insurance Agent'
    | 'Property Manager'
    | 'Skeptical Customer';
  objectives: string[];
  keyPhrases: string[];
  commonObjections: string[];
  successCriteria: string[];
  category:
    | 'Door-to-Door'
    | 'Post-Inspection'
    | 'Insurance Claims'
    | 'Follow-Up';
}

interface CustomerRoleplaySystemProps {
  isOpen: boolean;
  onClose: () => void;
  selectedScenario?: string;
  onComplete: (results: RoleplayResults) => void;
}

interface RoleplayResults {
  scenarioId: string;
  score: number;
  objectivesCompleted: string[];
  keyPhrasesUsed: string[];
  timeSpent: number;
  feedback: string[];
  recommendations: string[];
}

const CustomerRoleplaySystem: React.FC<CustomerRoleplaySystemProps> = ({
  isOpen,
  onClose,
  selectedScenario,
  onComplete,
}) => {
  // Core state
  const [currentScenario, setCurrentScenario] =
    useState<RoleplayScenario | null>(null);
  const [roleplayState, setRoleplayState] = useState<
    'setup' | 'active' | 'paused' | 'completed'
  >('setup');
  const [, setCurrentPhase] = useState<
    'introduction' | 'pitch' | 'objections' | 'closing'
  >('introduction');

  // Interaction state
  const [userResponse, setUserResponse] = useState('');
  const [conversationHistory, setConversationHistory] = useState<
    Array<{
      role: 'customer' | 'sales' | 'system';
      message: string;
      timestamp: Date;
    }>
  >([]);
  const [currentObjective, setCurrentObjective] = useState(0);

  // Audio/Recording state
  

  // Progress tracking
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);
  const [usedKeyPhrases, setUsedKeyPhrases] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  // Refs
  const conversationEndRef = useRef<HTMLDivElement>(null);
  
  // Build and download a transcript of the current session
  const exportTranscript = () => {
    if (!currentScenario) return;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const fmtTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

    const header = `# Role-Play Transcript\n\n` +
      `Scenario: ${currentScenario.title} (${currentScenario.id})\n` +
      `Difficulty: ${currentScenario.difficulty} | Duration: ${currentScenario.duration}\n` +
      `Customer Type: ${currentScenario.customerType}\n` +
      `Category: ${currentScenario.category}\n` +
      `\n## Context\n${currentScenario.context}\n` +
      `\n## Objectives\n` +
      currentScenario.objectives.map(o => `- ${o}`).join('\n') +
      `\n\n## Key Phrases\n` +
      currentScenario.keyPhrases.map(k => `- ${k}`).join('\n') + `\n`;

    const convo = `\n## Conversation\n` +
      (conversationHistory.length === 0
        ? '(No conversation yet)\n'
        : conversationHistory
            .map(m => `- [${fmtTime(m.timestamp)}] ${m.role.toUpperCase()}: ${m.message}`)
            .join('\n') + '\n');

    const results = `\n## Results\n` +
      `Score: ${score}\n` +
      (completedObjectives.length > 0
        ? `Objectives completed (${completedObjectives.length}/${currentScenario.objectives.length}):\n` +
          completedObjectives.map(o => `- ${o}`).join('\n') + '\n'
        : '') +
      (usedKeyPhrases.length > 0
        ? `Key phrases used: ${usedKeyPhrases.length}\n` + usedKeyPhrases.map(k => `- ${k}`).join('\n') + '\n'
        : '') +
      (startTime
        ? `Time spent: ${Math.max(0, Math.round(((new Date()).getTime() - startTime.getTime()) / 1000))}s\n`
        : '');

    const content = `${header}${convo}${results}`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const ts = new Date();
    const tsStr = `${ts.getFullYear()}-${pad(ts.getMonth() + 1)}-${pad(ts.getDate())}_${pad(ts.getHours())}${pad(ts.getMinutes())}${pad(ts.getSeconds())}`;
    a.href = url;
    a.download = `roleplay_transcript_${currentScenario.id}_${tsStr}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Roof-ER Sales Training Scenarios - Based on actual training materials
  const scenarios: RoleplayScenario[] = [
    {
      id: 'door-to-door-initial',
      title: 'Initial Door-to-Door Approach',
      description:
        "Master the 5 Non-Negotiables: Who you are, Who we are, Make it relatable, What you're there to do, Go for the close",
      difficulty: 'Beginner',
      duration: '10-15 minutes',
      context:
        "You're approaching a homeowner at their front door after a recent storm in the area.",
      customerType: 'Homeowner',
      objectives: [
        'Introduce yourself professionally',
        "Explain who Roof ER is and why you're there",
        'Make the situation relatable to the homeowner',
        "Clearly state you're there for an inspection",
        'Schedule the inspection appointment',
      ],
      keyPhrases: [
        'Hi, my name is [Name] with Roof ER',
        "We're working in your neighborhood",
        'We specialize in insurance claim assistance',
        "I'd like to do a free inspection",
        'Can we schedule a time that works for you?',
      ],
      commonObjections: [
        "I don't need an inspection",
        'My roof is fine',
        "I'm not interested",
        'I already have a contractor',
      ],
      successCriteria: [
        'Complete all 5 Non-Negotiables',
        'Handle at least one objection',
        'Secure inspection appointment',
        'Maintain professional demeanor',
      ],
      category: 'Door-to-Door',
    },
    {
      id: 'post-inspection-pitch',
      title: 'Post-Inspection Sales Pitch',
      description:
        'Present findings and secure the contingency agreement using proven techniques',
      difficulty: 'Intermediate',
      duration: '15-20 minutes',
      context:
        "You've completed the roof inspection and found significant hail damage. Present your findings to the homeowner.",
      customerType: 'Homeowner',
      objectives: [
        'Present inspection findings clearly',
        'Explain insurance claim process',
        'Address customer concerns about claims',
        'Secure contingency agreement signature',
        'Set expectations for next steps',
      ],
      keyPhrases: [
        'I found significant damage to your roof',
        'This is definitely covered by insurance',
        'We handle the entire claims process',
        'No out-of-pocket expenses',
        "Let's get this started today",
      ],
      commonObjections: [
        'I need to think about it',
        'I want to get other quotes',
        'Will this raise my insurance rates?',
        'What if insurance denies the claim?',
      ],
      successCriteria: [
        'Clearly present damage findings',
        'Explain insurance benefits',
        'Overcome price objections',
        'Secure signed agreement',
      ],
      category: 'Post-Inspection',
    },
    {
      id: 'insurance-objection-handling',
      title: 'Insurance Objection Mastery',
      description:
        'Handle common insurance-related objections with confidence and expertise',
      difficulty: 'Advanced',
      duration: '12-18 minutes',
      context:
        'Customer is concerned about filing an insurance claim and potential rate increases.',
      customerType: 'Skeptical Customer',
      objectives: [
        'Address rate increase concerns',
        'Explain claim process benefits',
        'Build trust and credibility',
        'Overcome skepticism with facts',
        'Close for the next step',
      ],
      keyPhrases: [
        "That's a common concern",
        'Here are the facts about insurance claims',
        "You're already paying for this coverage",
        "We've helped thousands of customers",
        'Let me show you exactly how this works',
      ],
      commonObjections: [
        'My rates will go up',
        'Insurance companies will drop me',
        "I don't want to deal with insurance",
        "It's too much hassle",
      ],
      successCriteria: [
        'Address all insurance concerns',
        'Provide specific examples/data',
        'Build confidence in process',
        'Secure commitment to proceed',
      ],
      category: 'Insurance Claims',
    },
    {
      id: 'follow-up-conversion',
      title: 'Follow-Up Call Conversion',
      description:
        'Convert interested prospects through strategic follow-up conversations',
      difficulty: 'Intermediate',
      duration: '10-15 minutes',
      context:
        'Following up with a homeowner who requested time to think after your initial visit.',
      customerType: 'Homeowner',
      objectives: [
        'Reconnect professionally',
        'Address any new concerns',
        'Create urgency appropriately',
        'Overcome procrastination',
        'Secure appointment or commitment',
      ],
      keyPhrases: [
        'Hi [Name], following up on our conversation',
        'Have you had a chance to think about what we discussed?',
        'I understand you want to be thorough',
        'Let me address any concerns you might have',
        'When would be a good time to move forward?',
      ],
      commonObjections: [
        'Still thinking about it',
        'Need to talk to spouse',
        'Waiting for other quotes',
        'Not ready yet',
      ],
      successCriteria: [
        'Build on previous rapport',
        'Address new objections',
        'Create appropriate urgency',
        'Secure next steps',
      ],
      category: 'Follow-Up',
    },
    {
      id: 'difficult-customer',
      title: 'Difficult Customer De-escalation',
      description:
        'Handle aggressive or upset customers with professionalism and skill',
      difficulty: 'Expert',
      duration: '15-25 minutes',
      context:
        'Customer had a bad experience with another contractor and is resistant to any roofing services.',
      customerType: 'Skeptical Customer',
      objectives: [
        'De-escalate tension',
        'Acknowledge past experience',
        'Differentiate your company',
        'Build trust slowly',
        'Find common ground',
      ],
      keyPhrases: [
        'I understand your frustration',
        'That sounds like a terrible experience',
        'We do things differently at Roof ER',
        'Let me show you our process',
        'What would it take for you to feel comfortable?',
      ],
      commonObjections: [
        'All contractors are the same',
        'I was ripped off before',
        "I don't trust anyone",
        'Get off my property',
      ],
      successCriteria: [
        'Successfully de-escalate situation',
        "Acknowledge customer's concerns",
        'Demonstrate company differences',
        'Establish minimal trust',
      ],
      category: 'Door-to-Door',
    },
    {
      id: 'non-storm-intro-agreement',
      title: 'Non-Storm Intro → Agreement',
      description:
        "Master the standard introduction when there's no recent storm activity",
      difficulty: 'Beginner',
      duration: '10-15 minutes',
      context:
        "No recent storms in the area. You're doing neighborhood canvassing and need to create value through your expertise.",
      customerType: 'Homeowner',
      objectives: [
        'Professional introduction with name and company',
        'Explain specialization in insurance claims',
        'Mention success with neighbors in area',
        'Offer free inspection with peace of mind value',
        'Secure inspection agreement',
      ],
      keyPhrases: [
        'Hi, how are you? My name is [Rep Name] with Roof-ER',
        'We specialize in helping homeowners get their roof replaced, paid for by their insurance',
        "We've been working with a lot of your neighbors in the area",
        'Many of them have gotten fully approved through their insurance company',
        'Completely free inspection to see if you have similar, qualifiable damage',
      ],
      commonObjections: [
        "So it's free?",
        "What if you don't find anything?",
        'How long does it take?',
        "I'm not interested",
      ],
      successCriteria: [
        'Complete professional introduction',
        'Establish neighborhood credibility',
        'Clearly communicate free inspection value',
        'Secure inspection appointment',
      ],
      category: 'Door-to-Door',
    },
    {
      id: 'storm-environment-intro-agreement',
      title: 'Storm Environment Intro → Agreement',
      description:
        'Leverage recent storm activity to create urgency and relevance',
      difficulty: 'Beginner',
      duration: '10-15 minutes',
      context:
        'Recent storm activity in the area. Customer likely aware of the storm and potential damage.',
      customerType: 'Homeowner',
      objectives: [
        'Acknowledge recent storm experience',
        'Build credibility through neighbor success stories',
        'Position yourself as storm damage expert',
        'Offer free damage assessment',
        'Secure inspection agreement',
      ],
      keyPhrases: [
        'Hi there, my name is [Rep Name] with Roof-ER',
        'Were you home for the storm we had back in [month]?',
        'Pretty crazy, right?',
        "We've actually been working with a lot of your neighbors here",
        'Many of them have gotten full approvals through their insurance to replace their roofs',
      ],
      commonObjections: [
        'Really?',
        "I guess it can't hurt to check",
        'Was the storm that bad?',
        'My roof seems fine',
      ],
      successCriteria: [
        'Connect over shared storm experience',
        'Establish neighbor credibility',
        'Position as insurance expert',
        'Secure inspection appointment',
      ],
      category: 'Door-to-Door',
    },
    {
      id: 'objection-roleplay-agreement',
      title: 'Objection Roleplay → Agreement',
      description:
        'Handle the most common objections using proven Roof-ER techniques',
      difficulty: 'Intermediate',
      duration: '15-20 minutes',
      context:
        'Customer gives multiple objections. Practice the multi-path objection handling system.',
      customerType: 'Skeptical Customer',
      objectives: [
        'Handle "Not Interested" with neighbor proof',
        'Overcome "No Money" with insurance explanation',
        'Address skepticism with professional credibility',
        'Use respectful push-through techniques',
        'Secure inspection despite resistance',
      ],
      keyPhrases: [
        'Totally understand — most of your neighbors said the same until they saw the photos',
        "Good news is — there's no out-of-pocket repair bill",
        'If approved, your only responsibility is your deductible',
        'Insurance covers the replacement',
        "If there's no damage, I'll let you know and you'll have peace of mind",
      ],
      commonObjections: [
        "I'm not interested",
        "I don't have the money right now",
        'This sounds suspicious',
        'I need to think about it',
        'My roof is fine',
      ],
      successCriteria: [
        'Successfully handle 3+ objections',
        'Use proper push-through techniques',
        'Maintain professional demeanor throughout',
        'Convert objections to inspection agreement',
      ],
      category: 'Door-to-Door',
    },
    {
      id: 'multi-path-objection-training',
      title: 'Multi-Path Objection Training',
      description:
        'Master the respectful push-through system with primary, secondary, and final responses',
      difficulty: 'Advanced',
      duration: '20-25 minutes',
      context:
        'Difficult customer who gives multiple "no" responses. Practice the full objection tree.',
      customerType: 'Skeptical Customer',
      objectives: [
        'Execute primary response with empathy',
        'Deploy secondary response with logic questions',
        'Use final response with long-term value',
        'Know when to respectfully withdraw',
        'Maintain professionalism throughout',
      ],
      keyPhrases: [
        'If I could show you clear proof of damage with photos, would that be worth 10 minutes?',
        'If your roof really does have $20-30k worth of storm damage, would paying just the deductible make sense?',
        'Just remember — insurance only covers fresh storm damage',
        "Even if you don't file, documenting now protects you later",
        'Absolutely your call',
      ],
      commonObjections: [
        'Multiple "no" responses',
        'Aggressive resistance',
        'Door closing attempts',
        'Trust issues',
        'Time objections',
      ],
      successCriteria: [
        'Execute full objection tree properly',
        'Maintain respect throughout process',
        'Know appropriate stopping point',
        'Leave positive final impression',
      ],
      category: 'Door-to-Door',
    },
  ];

  useEffect(() => {
    if (selectedScenario && isOpen) {
      const scenario = scenarios.find(s => s.id === selectedScenario);
      if (scenario) {
        setCurrentScenario(scenario);
        setRoleplayState('setup');
        resetRoleplay();
      }
    }
  }, [selectedScenario, isOpen, scenarios]);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const resetRoleplay = () => {
    setCurrentPhase('introduction');
    setUserResponse('');
    setConversationHistory([]);
    setCurrentObjective(0);
    setStartTime(null);
    setCompletedObjectives([]);
    setUsedKeyPhrases([]);
    setScore(0);
  };

  const startRoleplay = () => {
    setRoleplayState('active');
    setStartTime(new Date());

    // Initial customer message based on scenario
    const initialMessage = getInitialCustomerMessage(currentScenario!);
    addToConversation('customer', initialMessage);
  };

  const getInitialCustomerMessage = (scenario: RoleplayScenario): string => {
    // Specific responses based on Roof-ER training scenarios
    switch (scenario.id) {
      case 'non-storm-intro-agreement':
      case 'storm-environment-intro-agreement':
        return 'Oh, hello. What can I help you with?';
      case 'objection-roleplay-agreement':
        return "I'm not interested."; // Start with immediate objection
      case 'multi-path-objection-training':
        return "I'm not interested. I've had too many contractors here already."; // Immediate strong resistance
      case 'difficult-customer':
        return "What do you want? If you're another contractor, I'm not interested. I've been burned before.";
      case 'door-to-door-initial':
        return 'Oh, hello. What can I help you with?';
      case 'post-inspection-pitch':
        return 'So, what did you find up there? Is it as bad as I think it might be?';
      case 'insurance-objection-handling':
        return "I'm really worried about filing a claim. Won't my insurance rates go up?";
      case 'follow-up-conversion':
        return "Oh hi, yes, I remember you. I've been meaning to call you back...";
      default:
        return 'Hello, how can I help you today?';
    }
  };

  const addToConversation = (
    role: 'customer' | 'sales' | 'system',
    message: string
  ) => {
    setConversationHistory(prev => [
      ...prev,
      {
        role,
        message,
        timestamp: new Date(),
      },
    ]);
  };

  const handleUserResponse = () => {
    if (!userResponse.trim()) return;

    // Add user response to conversation
    addToConversation('sales', userResponse);

    // Analyze response for key phrases and objectives
    analyzeResponse(userResponse);

    // Generate customer response
    const customerResponse = generateCustomerResponse(userResponse);
    setTimeout(() => {
      addToConversation('customer', customerResponse);
    }, 1000);

    setUserResponse('');
  };

  const analyzeResponse = (response: string) => {
    if (!currentScenario) return;

    // Check for key phrases
    currentScenario.keyPhrases.forEach(phrase => {
      const keyWords = phrase
        .toLowerCase()
        .replace(/\[.*?\]/g, '')
        .split(' ');
      const responseWords = response.toLowerCase();
      const matchCount = keyWords.filter(word =>
        responseWords.includes(word)
      ).length;

      if (
        matchCount >= Math.ceil(keyWords.length * 0.6) &&
        !usedKeyPhrases.includes(phrase)
      ) {
        setUsedKeyPhrases(prev => [...prev, phrase]);
        setScore(prev => prev + 10);
      }
    });

    // Check objectives completion based on response content and phase
    checkObjectiveCompletion(response);
  };

  const checkObjectiveCompletion = (response: string) => {
    if (!currentScenario) return;

    const objective = currentScenario.objectives[currentObjective];
    if (!objective || completedObjectives.includes(objective)) return;

    // Simple keyword matching for objective completion
    const objectiveKeywords = getObjectiveKeywords(objective);
    const hasKeywords = objectiveKeywords.some(keyword =>
      response.toLowerCase().includes(keyword.toLowerCase())
    );

    if (hasKeywords) {
      setCompletedObjectives(prev => [...prev, objective]);
      setScore(prev => prev + 20);

      if (currentObjective < currentScenario.objectives.length - 1) {
        setCurrentObjective(prev => prev + 1);
      }
    }
  };

  const getObjectiveKeywords = (objective: string): string[] => {
    const keywordMap: { [key: string]: string[] } = {
      introduce: ['name', 'hello', 'hi'],
      explain: ['roof er', 'company', 'specialize'],
      relatable: ['neighborhood', 'storm', 'area'],
      inspection: ['inspect', 'look at', 'check'],
      schedule: ['schedule', 'appointment', 'time'],
      findings: ['found', 'damage', 'problem'],
      insurance: ['insurance', 'claim', 'coverage'],
      agreement: ['sign', 'agreement', 'contract'],
      concerns: ['understand', 'worry', 'concern'],
      trust: ['trust', 'reliable', 'experienced'],
    };

    const objectiveLower = objective.toLowerCase();
    for (const [key, keywords] of Object.entries(keywordMap)) {
      if (objectiveLower.includes(key)) {
        return keywords;
      }
    }
    return [];
  };

  const generateCustomerResponse = (userResponse: string): string => {
    if (!currentScenario) return 'I see...';

    // CRITICAL: Check for red flags first (money/payment requests)
    const redFlagResponse = checkForRedFlags(userResponse);
    if (redFlagResponse) {
      // Add red flag to conversation for training purposes
      setTimeout(() => {
        addToConversation(
          'system',
          `🚨 RED FLAG DETECTED: Reps should NEVER ask homeowners for money! Roof-ER works with insurance companies.`
        );
      }, 2000);
      return redFlagResponse;
    }

    // Generate appropriate customer response based on scenario and Roof-ER training
    const responses = getCustomerResponses(currentScenario, userResponse);
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Red flag detection for inappropriate sales behavior
  const checkForRedFlags = (userResponse: string): string | null => {
    const userLower = userResponse.toLowerCase();

    // Check for money/payment requests (CRITICAL RED FLAG)
    const moneyKeywords = [
      'pay',
      'money',
      'cost',
      'price',
      'charge',
      'fee',
      'bill',
      'payment',
      'cash',
      'check',
      '$',
      'dollar',
      'thousand',
    ];
    const hasMoneyRequest = moneyKeywords.some(keyword =>
      userLower.includes(keyword)
    );

    if (hasMoneyRequest) {
      const redFlagResponses = [
        'Excuse me? You want me to PAY you? I thought you said this was through insurance. Are you trying to scam me?',
        "Wait, what? You're asking for money? I'm calling the police. Get off my property!",
        'Hold on - you just said insurance covers this, now you want me to pay? This sounds like a scam.',
        "I'm not paying you anything! I thought this was an insurance claim. You need to leave right now.",
        "Red flag! You're asking for money when you said insurance pays? I'm reporting this to the Better Business Bureau.",
      ];
      return redFlagResponses[
        Math.floor(Math.random() * redFlagResponses.length)
      ];
    }

    // Check for other inappropriate behaviors
    const inappropriateKeywords = [
      'buy now',
      'special deal',
      'limited time',
      'sign today',
      'discount today',
    ];
    const hasInappropriateBehavior = inappropriateKeywords.some(keyword =>
      userLower.includes(keyword)
    );

    if (hasInappropriateBehavior) {
      return "This sounds like high-pressure sales tactics. I don't like being pressured. I think you should leave.";
    }

    return null;
  };

  const getCustomerResponses = (
    scenario: RoleplayScenario,
    userResponse: string
  ): string[] => {
    const userLower = userResponse.toLowerCase();
    const conversationLength = conversationHistory.length;

    // Roof-ER Objection Training - 20 Core Objections with realistic responses
    const roofERObjections: { [key: string]: string[] } = {
      not_interested: [
        "I'm not interested.",
        "We're not interested in any roofing work.",
        'No thank you, not interested.',
      ],
      no_time: [
        "I don't have time right now.",
        "This isn't a good time.",
        "I'm too busy today.",
        'Can you come back later?',
      ],
      roof_good_shape: [
        'My roof is in good shape.',
        'The roof looks fine to me.',
        'We just checked it ourselves.',
        "I don't see any problems with it.",
      ],
      just_checked: [
        'I just had my roof checked.',
        'Someone already looked at it last month.',
        'A contractor was here recently.',
        'We had it inspected last year.',
      ],
      no_money: [
        "I don't have money for this right now.",
        "We can't afford roof work.",
        'Money is tight right now.',
        "We don't have the funds.",
      ],
      other_roofers: [
        "I've already had five roofers knock on my door.",
        "We've had several companies out here.",
        'Other roofers have been by.',
        'Too many contractors have been here already.',
      ],
      young_roof: [
        "My roof is 18 years old, but it's a 50-year roof.",
        'This is a 30-year shingle, only 15 years old.',
        'The roof is practically new.',
        'We put this roof on just 10 years ago.',
      ],
      too_busy: [
        "I'm too busy right now.",
        "I don't have time for this today.",
        'Maybe another time.',
        "I've got too much going on.",
      ],
      no_claim: [
        "I don't want to file a claim.",
        'I prefer not to use insurance.',
        "I don't want to deal with insurance.",
        'Filing claims is a hassle.',
      ],
      dont_trust_insurance: [
        'Insurance never pays out.',
        'Insurance companies try to avoid paying.',
        "They'll find a way not to pay.",
        'Insurance is a scam.',
      ],
      high_deductible: [
        "I can't afford my deductible.",
        'My deductible is too high.',
        'The deductible costs too much.',
        "I can't come up with the deductible right now.",
      ],
      need_to_think: [
        'I need to think about it.',
        'Let me consider this.',
        "I'll have to think it over.",
        'Give me some time to decide.',
      ],
      have_roofer: [
        'I already have someone.',
        'We have a contractor we use.',
        "I've got a guy for that.",
        'We already have a roofer.',
      ],
      no_damage: [
        "I don't see any damage.",
        'Everything looks fine to me.',
        "I can't see any problems.",
        'The roof looks good from here.',
      ],
      waiting: [
        "I'll wait until next year.",
        'Maybe next spring.',
        "We're not ready yet.",
        "I'll think about it later.",
      ],
      rates_go_up: [
        "Won't this raise my rates?",
        'Will my insurance go up?',
        "I don't want higher premiums.",
        'Claims make your rates increase, right?',
      ],
      new_gutters: [
        'I just had my gutters replaced.',
        'We just got new siding.',
        'Just had the gutters done.',
        'New gutters were just installed.',
      ],
      selling_house: [
        "I'm moving soon.",
        "We're selling the house.",
        'This house is going on the market.',
        "We won't be here much longer.",
      ],
      just_patch: [
        "Can't you just patch it?",
        'Just fix the damaged parts.',
        'We only need a small repair.',
        'A patch should be fine.',
      ],
      too_much_hassle: [
        'This sounds like a hassle.',
        'Too much paperwork.',
        "I don't want the headache.",
        'Sounds complicated.',
      ],
      door_closing_urgent: [
        "We're not making any decisions today.",
        'I really need to get going.',
        "I'm in the middle of something.",
        "My husband handles this and he's not home.",
        "I think we're all set. Thanks anyway.",
        'Can you just leave me a card?',
      ],
      testing_knowledge: [
        'How exactly does this insurance process work?',
        'What if my insurance company says no?',
        'Are you licensed and insured?',
        "What's your Better Business Bureau rating?",
        'Can you show me examples of your work?',
        'How long have you been in business?',
      ],
      positive_movement: [
        'Okay, this does sound interesting.',
        "I think I'm ready to move forward.",
        'What are the next steps?',
        'When could you do the inspection?',
        "Let's schedule this.",
        'This might be worth looking into.',
      ],
    };

    // Advanced Roof-ER Training Logic - Multi-Path Objection Handling
    let responseType = 'neutral';

    // Analyze user response quality using Roof-ER methodology
    const hasGreeting =
      userLower.includes('hello') ||
      userLower.includes('hi') ||
      userLower.includes('good');
    const hasCompanyName =
      userLower.includes('roof') ||
      userLower.includes('er') ||
      userLower.includes('roofing');
    const mentionsFree =
      userLower.includes('free') ||
      userLower.includes('no cost') ||
      userLower.includes('no charge') ||
      userLower.includes('no out-of-pocket');
    const mentionsInsurance =
      userLower.includes('insurance') ||
      userLower.includes('claim') ||
      userLower.includes('adjuster');
    const mentionsNeighborhood =
      userLower.includes('neighborhood') ||
      userLower.includes('area') ||
      userLower.includes('working') ||
      userLower.includes('neighbors');
    const mentionsInspection =
      userLower.includes('inspection') ||
      userLower.includes('look') ||
      userLower.includes('check');
    const isPolite =
      userLower.includes('please') ||
      userLower.includes('thank') ||
      userLower.includes('appreciate');
    const hasProperIntro = hasGreeting && hasCompanyName;
    const hasValue = mentionsFree && mentionsInsurance;
    const usesRoofERMethod = mentionsNeighborhood && mentionsInspection;

    // Determine objection type based on conversation progression and rep performance
    if (conversationLength === 0) {
      // Initial door greeting - should be neutral
      return ['Oh, hello. What can I help you with?'];
    }

    // If rep didn't introduce properly, give basic objection
    if (conversationLength === 1 && !hasProperIntro) {
      return roofERObjections.not_interested;
    }

    // If rep introduced properly but didn't mention free/insurance, escalate
    if (conversationLength === 2 && hasProperIntro && !hasValue) {
      const objections = ['no_time', 'roof_good_shape', 'not_interested'];
      responseType = objections[Math.floor(Math.random() * objections.length)];
      return roofERObjections[responseType];
    }

    // If rep mentions free and insurance but no neighborhood credibility
    if (conversationLength === 3 && hasValue && !usesRoofERMethod) {
      const objections = [
        'just_checked',
        'other_roofers',
        'no_money',
        'dont_trust_insurance',
      ];
      responseType = objections[Math.floor(Math.random() * objections.length)];
      return roofERObjections[responseType];
    }

    // Multi-path progression based on rep skill level
    if (conversationLength >= 4) {
      const skillScore = calculateRepSkill(
        hasProperIntro,
        hasValue,
        usesRoofERMethod,
        isPolite
      );

      if (skillScore >= 80) {
        // Excellent rep performance - move toward positive
        const responses =
          Math.random() < 0.6 ? 'positive_movement' : 'testing_knowledge';
        return roofERObjections[responses];
      } else if (skillScore >= 60) {
        // Good performance - give moderate objections
        const objections = [
          'need_to_think',
          'high_deductible',
          'rates_go_up',
          'have_roofer',
        ];
        responseType =
          objections[Math.floor(Math.random() * objections.length)];
        return roofERObjections[responseType];
      } else if (skillScore >= 40) {
        // Fair performance - harder objections
        const objections = [
          'no_damage',
          'waiting',
          'just_patch',
          'too_much_hassle',
        ];
        responseType =
          objections[Math.floor(Math.random() * objections.length)];
        return roofERObjections[responseType];
      } else {
        // Poor performance - trying to close door
        return roofERObjections.door_closing_urgent;
      }
    }

    // Scenario-specific logic for difficult customers
    if (
      scenario.customerType === 'Skeptical Customer' ||
      scenario.id === 'difficult-customer'
    ) {
      const toughObjections = [
        'other_roofers',
        'dont_trust_insurance',
        'just_checked',
        'too_much_hassle',
      ];
      responseType =
        toughObjections[Math.floor(Math.random() * toughObjections.length)];
      return roofERObjections[responseType];
    }

    // Default to basic objections
    const basicObjections = [
      'not_interested',
      'no_time',
      'roof_good_shape',
      'need_to_think',
    ];
    responseType =
      basicObjections[Math.floor(Math.random() * basicObjections.length)];
    return roofERObjections[responseType];
  };

  // Calculate rep skill based on Roof-ER methodology
  const calculateRepSkill = (
    hasIntro: boolean,
    hasValue: boolean,
    hasMethod: boolean,
    isPolite: boolean
  ): number => {
    let score = 0;
    if (hasIntro) score += 30; // Proper introduction
    if (hasValue) score += 30; // Mentions free/insurance
    if (hasMethod) score += 25; // Uses neighborhood/inspection approach
    if (isPolite) score += 15; // Professional demeanor
    return score;
  };

  const completeRoleplay = () => {
    if (!currentScenario || !startTime) return;

    const endTime = new Date();
    const timeSpent = (endTime.getTime() - startTime.getTime()) / 1000; // seconds

    const finalScore = calculateFinalScore();
    const feedback = generateFeedback();
    const recommendations = generateRecommendations();

    const results: RoleplayResults = {
      scenarioId: currentScenario.id,
      score: finalScore,
      objectivesCompleted: completedObjectives,
      keyPhrasesUsed: usedKeyPhrases,
      timeSpent,
      feedback,
      recommendations,
    };

    setRoleplayState('completed');
    onComplete(results);
  };

  const calculateFinalScore = (): number => {
    if (!currentScenario) return 0;

    let finalScore = score;

    // Bonus for completing all objectives
    if (completedObjectives.length === currentScenario.objectives.length) {
      finalScore += 50;
    }

    // Bonus for using key phrases
    const keyPhraseBonus =
      (usedKeyPhrases.length / currentScenario.keyPhrases.length) * 30;
    finalScore += keyPhraseBonus;

    return Math.min(finalScore, 100);
  };

  const generateFeedback = (): string[] => {
    if (!currentScenario) return [];

    const feedback: string[] = [];

    if (completedObjectives.length === currentScenario.objectives.length) {
      feedback.push(
        '✅ Excellent! You completed all objectives for this scenario.'
      );
    } else {
      feedback.push(
        `📝 You completed ${completedObjectives.length}/${currentScenario.objectives.length} objectives.`
      );
    }

    if (usedKeyPhrases.length >= currentScenario.keyPhrases.length * 0.7) {
      feedback.push('🗣️ Great use of key phrases and sales language!');
    } else {
      feedback.push(
        '💬 Consider incorporating more of the recommended key phrases.'
      );
    }

    return feedback;
  };

  const generateRecommendations = (): string[] => {
    if (!currentScenario) return [];

    const recommendations: string[] = [];

    const incompleteObjectives = currentScenario.objectives.filter(
      obj => !completedObjectives.includes(obj)
    );

    if (incompleteObjectives.length > 0) {
      recommendations.push(`Focus on: ${incompleteObjectives.join(', ')}`);
    }

    const unusedKeyPhrases = currentScenario.keyPhrases.filter(
      phrase => !usedKeyPhrases.includes(phrase)
    );

    if (unusedKeyPhrases.length > 0) {
      recommendations.push(`Try incorporating: "${unusedKeyPhrases[0]}"`);
    }

    recommendations.push('Practice handling objections more confidently');
    recommendations.push(
      'Work on building rapport earlier in the conversation'
    );

    return recommendations;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-neutral-900 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Customer Interaction Roleplay
                </h2>
                {currentScenario && (
                  <div className="flex items-center space-x-4 text-gray-300">
                    <span className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {currentScenario.title}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {currentScenario.duration}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Score: {score}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={exportTranscript}
                  disabled={conversationHistory.length === 0}
                  className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${conversationHistory.length === 0 ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30 text-white'}`}
                  title={conversationHistory.length === 0 ? 'No conversation yet' : 'Export transcript'}
                >
                  <FileText className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-purple-800 rounded-lg transition-colors"
                  aria-label="Close"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex h-full">
            {/* Left Sidebar - Scenario Info */}
            <div className="w-1/3 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto">
              {currentScenario && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Scenario Context
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {currentScenario.context}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Objectives
                    </h3>
                    <div className="space-y-2">
                      {currentScenario.objectives.map((objective, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center text-sm p-2 rounded-lg ${
                            completedObjectives.includes(objective)
                              ? 'bg-green-100 text-green-800'
                              : idx === currentObjective &&
                                  roleplayState === 'active'
                                ? 'bg-gray-100 text-purple-800'
                                : 'bg-white text-gray-600'
                          }`}
                        >
                          {completedObjectives.includes(objective) ? (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          ) : (
                            <div className="w-4 h-4 mr-2 rounded-full border-2 border-gray-300" />
                          )}
                          {objective}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Key Phrases to Use
                    </h3>
                    <div className="space-y-1">
                      {currentScenario.keyPhrases.map((phrase, idx) => (
                        <div
                          key={idx}
                          className={`text-xs p-2 rounded ${
                            usedKeyPhrases.includes(phrase)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          "{phrase}"
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Common Objections
                    </h3>
                    <div className="space-y-1">
                      {currentScenario.commonObjections.map(
                        (objection, idx) => (
                          <div
                            key={idx}
                            className="text-xs p-2 bg-orange-100 text-orange-700 rounded"
                          >
                            "{objection}"
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Content - Roleplay Interface */}
            <div className="flex-1 flex flex-col">
              {roleplayState === 'setup' && currentScenario && (
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center max-w-2xl">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Practice?
                    </h3>
                    <p className="text-gray-600 mb-8">
                      {currentScenario.description}
                    </p>
                    <button
                      onClick={startRoleplay}
                      className="px-8 py-4 bg-gradient-to-r from-black to-neutral-900 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center space-x-2 mx-auto"
                    >
                      <Play className="w-5 h-5" />
                      <span>Start Roleplay</span>
                    </button>
                  </div>
                </div>
              )}

              {roleplayState === 'active' && (
                <div className="flex-1 flex flex-col">
                  {/* Conversation Area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth max-h-[500px]">
                    {conversationHistory.map((message, idx) => (
                      <div
                        key={idx}
                        className={`flex ${message.role === 'sales' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.role === 'sales'
                              ? 'bg-roofRed text-white'
                              : message.role === 'customer'
                                ? 'bg-gray-200 text-gray-900'
                                : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="flex items-center mb-1">
                            {message.role === 'sales' ? (
                              <User className="w-4 h-4 mr-1" />
                            ) : (
                              <Home className="w-4 h-4 mr-1" />
                            )}
                            <span className="text-xs font-medium">
                              {message.role === 'sales' ? 'You' : 'Customer'}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={conversationEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <textarea
                          value={userResponse}
                          onChange={e => setUserResponse(e.target.value)}
                          onKeyPress={e =>
                            e.key === 'Enter' &&
                            !e.shiftKey &&
                            (e.preventDefault(), handleUserResponse())
                          }
                          placeholder="Type your response to the customer..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={handleUserResponse}
                          disabled={!userResponse.trim()}
                          className="px-6 py-2 bg-roofRed text-white rounded-lg hover:bg-roofRed-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                          <span>Send</span>
                        </button>
                        <button
                          onClick={completeRoleplay}
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Finish</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {roleplayState === 'completed' && (
                <div className="flex-1 p-8">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Roleplay Complete!
                    </h3>
                    <p className="text-gray-600">
                      Great job practicing your sales skills
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Performance Summary
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-roofRed">Final Score:</span>
                          <span className="font-bold text-gray-900">
                            {calculateFinalScore()}/100
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-roofRed">
                            Objectives Completed:
                          </span>
                          <span className="font-bold text-gray-900">
                            {completedObjectives.length}/
                            {currentScenario?.objectives.length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-roofRed">
                            Key Phrases Used:
                          </span>
                          <span className="font-bold text-gray-900">
                            {usedKeyPhrases.length}/
                            {currentScenario?.keyPhrases.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 mb-4">
                        Recommendations
                      </h4>
                      <div className="space-y-2">
                        {generateRecommendations().map((rec, idx) => (
                          <div key={idx} className="flex items-start">
                            <Lightbulb className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-green-700 text-sm">
                              {rec}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-8 space-x-4">
                    <button
                      onClick={() => {
                        resetRoleplay();
                        setRoleplayState('setup');
                      }}
                      className="px-6 py-3 bg-roofRed text-white rounded-lg hover:bg-roofRed-dark transition-colors"
                    >
                      Practice Again
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomerRoleplaySystem;
