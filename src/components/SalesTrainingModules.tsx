/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, FileText, CheckCircle, Clock, Star, Target, MessageSquare, ArrowRight, Download, Shield, Volume2, Play as PlayIcon, Zap, Brain, AlertTriangle, Eye, ChevronRight, ChevronDown, Lightbulb, XCircle, Mic } from 'lucide-react';
import SalesPitchRecorder from './SalesPitchRecorder';

interface SalesModule {
  id: string;
  title: string;
  description: string;
  category:
    | 'Door-to-Door'
    | 'Post-Inspection'
    | 'Insurance Claims'
    | 'Follow-Up'
    | 'Field Operations';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  content: ModuleContent;
  prerequisites?: string[];
  isLocked?: boolean;
  progress?: number;
}

interface ModuleContent {
  overview: string;
  keyPoints: string[];
  scripts: SalesScript[];
  techniques: string[];
  commonObjections: ObjectionResponse[];
  practiceScenarios: string[];
  resources: Resource[];
  quiz?: QuizQuestion[];
}

interface SalesScript {
  title: string;
  context: string;
  script: string;
  keyPhrases: string[];
  notes: string[];
}

interface ObjectionResponse {
  objection: string;
  response: string;
  technique: string;
  followUp?: string;
}

interface Resource {
  title: string;
  type: 'PDF' | 'Template' | 'Checklist' | 'Video';
  description: string;
  url?: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface SalesTrainingModulesProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModule?: string;
  onModuleComplete: (moduleId: string, score: number) => void;
}

const SalesTrainingModules: React.FC<SalesTrainingModulesProps> = ({
  isOpen,
  onClose,
  selectedModule,
  onModuleComplete,
}) => {
  const [currentModule, setCurrentModule] = useState<SalesModule | null>(null);
  const [activeSection, setActiveSection] = useState<
    | 'overview'
    | 'interactive-learning'
    | 'agnes-content'
    | 'scripts'
    | 'objections'
    | 'practice'
    | 'quiz'
    | 'docs'
  >('overview');
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set()
  );
  const [expandedScript, setExpandedScript] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showRecorder, setShowRecorder] = useState(false);

  // Sales training modules based on the Roof-ER Sales Training PDF
  const salesModules: SalesModule[] = [
    {
      id: 'door-to-door-fundamentals',
      title: 'Door-to-Door Sales Fundamentals',
      description:
        'Master the 5 Non-Negotiables and initial customer approach techniques from the Roof-ER training manual.',
      category: 'Door-to-Door',
      difficulty: 'Beginner',
      duration: '45 minutes',
      content: {
        overview: `Learn the foundational principles of door-to-door sales success. This module covers the essential "5 Non-Negotiables" that every successful interaction must include, plus proven techniques for making strong first impressions and building immediate rapport with potential customers.`,
        keyPoints: [
          "The 5 Non-Negotiables: Who you are, Who we are, Make it relatable, What you're there to do, Go for the close",
          'Professional introduction techniques that build trust immediately',
          'Making the situation relatable to create connection',
          'Clear communication of your purpose and value proposition',
          'Confident closing for the inspection appointment',
        ],
        scripts: [
          {
            title: 'Initial Door Approach - Standard',
            context: "First contact at customer's front door",
            script: `Hi, my name is [Your Name] with Roof ER. We specialize in working with insurance companies to help homeowners get their roofs repaired or replaced at no out-of-pocket cost to them. We're working in your neighborhood right now, and I noticed your roof from the street. I'd like to take a look at it for you at no charge to see if there's any damage that might be covered by your homeowner's insurance. Are you the homeowner?`,
            keyPhrases: [
              'My name is [Name] with Roof ER',
              'We specialize in working with insurance companies',
              'No out-of-pocket cost',
              'Working in your neighborhood',
              'No charge inspection',
            ],
            notes: [
              'Always state your name and company clearly',
              'Emphasize the insurance expertise and no-cost benefit',
              'Create urgency with "working in your neighborhood"',
              'Confirm they are the decision maker',
            ],
          },
          {
            title: 'Post-Storm Approach',
            context: 'Approaching customers after a known storm event',
            script: `Hi, my name is [Your Name] with Roof ER. We specialize in helping homeowners navigate insurance claims after storm damage. We're working with several of your neighbors right now who had damage from the recent storm on [date]. I'd like to do a complimentary inspection of your roof to see if you have any damage that should be covered by your insurance. This won't cost you anything, and there's no obligation. Are you available for me to take a quick look?`,
            keyPhrases: [
              'Working with your neighbors',
              'Recent storm on [date]',
              'Complimentary inspection',
              'No cost, no obligation',
              'Quick look',
            ],
            notes: [
              'Reference specific storm date for credibility',
              'Use social proof ("working with neighbors")',
              'Emphasize free service multiple ways',
              'Keep the time commitment minimal',
            ],
          },
        ],
        techniques: [
          'Use confident body language and maintain eye contact',
          'Speak clearly and at a moderate pace',
          'Address the homeowner by name when possible',
          'Reference specific neighborhood or recent weather events',
          'Always carry professional materials and business cards',
          'Be prepared to show insurance credentials and certifications',
        ],
        commonObjections: [
          {
            objection: "I'm not interested",
            response:
              "I understand. Most homeowners don't realize they might have damage that's covered by their insurance. This is a free service with no obligation - it only takes a few minutes and could potentially save you thousands of dollars if there is damage. What do you have to lose by taking a quick look?",
            technique: 'Acknowledge and redirect',
            followUp:
              'Would tomorrow morning or afternoon work better for you?',
          },
          {
            objection: 'My roof is fine',
            response:
              "That's great to hear! Many times damage isn't visible from the ground, especially hail damage or wind damage to shingles. Insurance companies look for very specific types of damage that most homeowners wouldn't notice. Since it's free and I'm already in the neighborhood, would you mind if I took a quick look just to give you peace of mind?",
            technique: 'Educate and reassure',
            followUp:
              "It'll only take about 15 minutes and you'll know for sure.",
          },
        ],
        practiceScenarios: [
          'Customer answers door during dinner time',
          'Elderly customer who seems confused',
          "Customer who's had bad experiences with contractors",
          'Customer who says they already have a contractor',
          'Customer who questions your credentials',
        ],
        resources: [
          {
            title: 'Door-to-Door Script Reference Card',
            type: 'Template',
            description:
              'Laminated reference card with key scripts and responses',
          },
          {
            title: 'Professional Introduction Checklist',
            type: 'Checklist',
            description:
              'Ensure you hit all the key points in your introduction',
          },
          {
            title: 'Neighborhood Canvassing Map',
            type: 'Template',
            description:
              'Track your visits and results for better territory management',
          },
        ],
        quiz: [
          {
            question: 'What are the 5 Non-Negotiables in order?',
            options: [
              "Who you are, Who we are, What you're there to do, Make it relatable, Go for the close",
              "Who you are, Who we are, Make it relatable, What you're there to do, Go for the close",
              "Who we are, Who you are, Make it relatable, What you're there to do, Go for the close",
              "Who you are, Make it relatable, Who we are, What you're there to do, Go for the close",
            ],
            correctAnswer: 1,
            explanation:
              'The correct order ensures a logical flow: introduce yourself, introduce the company, create connection, explain purpose, then ask for the appointment.',
          },
          {
            question:
              'Which phrase is most effective for introducing yourself?',
            options: [
              "Hi, I'm with Roof ER and we fix roofs",
              'My name is [Name] with Roof ER. We specialize in working with insurance companies',
              "Hello, I'm a roofing contractor",
              "We're the best roofing company in the area",
            ],
            correctAnswer: 1,
            explanation:
              'This introduction clearly states your name, company, and specialization, building immediate credibility.',
          },
          {
            question:
              "What's the key benefit to emphasize when making it relatable?",
            options: [
              "We're the cheapest option",
              "We're working in your neighborhood right now",
              "We've been in business for years",
              'We have the best materials',
            ],
            correctAnswer: 1,
            explanation:
              "Mentioning you're working in the neighborhood creates urgency and social proof.",
          },
          {
            question:
              "When explaining what you're there to do, what should you emphasize?",
            options: [
              'Making money from your roof',
              'Selling you a new roof',
              'Free inspection with no obligation',
              'Getting you to sign today',
            ],
            correctAnswer: 2,
            explanation:
              'Emphasizing the free, no-obligation nature removes pressure and builds trust.',
          },
          {
            question:
              "What's the best way to go for the close in door-to-door sales?",
            options: [
              'Can I start work tomorrow?',
              'Will you buy from us today?',
              'Can we schedule a time for the inspection?',
              'Do you want to save money?',
            ],
            correctAnswer: 2,
            explanation:
              'Asking to schedule the inspection is a soft close that moves the process forward without being pushy.',
          },
          {
            question:
              "If a customer says 'I'm not interested,' your best response is:",
            options: [
              'Okay, have a good day',
              'But this is a great deal',
              "Most homeowners don't realize they might have damage covered by insurance",
              "You're making a mistake",
            ],
            correctAnswer: 2,
            explanation:
              'This response educates the customer and positions the service as potentially beneficial.',
          },
          {
            question: 'When should you mention that the service is free?',
            options: [
              'At the very end',
              'Multiple times throughout the conversation',
              'Only if they ask about price',
              "Never mention it's free",
            ],
            correctAnswer: 1,
            explanation:
              'Repeatedly emphasizing the free nature removes barriers and builds trust throughout the conversation.',
          },
          {
            question:
              "What's the most important factor for door-to-door success?",
            options: [
              'Having the lowest prices',
              'Professional appearance and confidence',
              'Talking as much as possible',
              'Pressuring for immediate decisions',
            ],
            correctAnswer: 1,
            explanation:
              'Professional appearance and confident delivery are crucial for building immediate trust and credibility.',
          },
          {
            question: 'When a customer says their roof is fine, you should:',
            options: [
              'Argue with them',
              'Leave immediately',
              "Explain that damage isn't always visible from the ground",
              "Tell them they're wrong",
            ],
            correctAnswer: 2,
            explanation:
              'Educating about hidden damage positions you as an expert and creates value for the inspection.',
          },
          {
            question: 'The best time to confirm they are the homeowner is:',
            options: [
              'After explaining everything',
              'At the very beginning',
              'After your introduction but before pitching',
              'Never ask this question',
            ],
            correctAnswer: 2,
            explanation:
              "Confirming decision-maker status after introduction but before the pitch ensures you're talking to the right person.",
          },
        ],
      },
    },
    {
      id: 'post-inspection-sales',
      title: 'Post-Inspection Sales Mastery',
      description:
        'Convert inspection findings into signed contracts using proven presentation techniques and objection handling.',
      category: 'Post-Inspection',
      difficulty: 'Intermediate',
      duration: '60 minutes',
      content: {
        overview: `Master the critical post-inspection sales process. Learn how to effectively present your findings, build urgency, handle customer concerns about insurance claims, and secure the contingency agreement signature. This module includes actual scripts from the Roof-ER training manual.`,
        keyPoints: [
          'Professional presentation of inspection findings',
          'Building urgency without pressure tactics',
          'Explaining insurance benefits and process clearly',
          'Handling price and timeline objections',
          'Securing the contingency agreement signature',
        ],
        scripts: [
          {
            title: 'Damage Presentation Script',
            context: 'Presenting findings after roof inspection',
            script: `I've completed the inspection of your roof, and I found significant damage that I believe will be covered by your insurance company. Let me show you what I found. [Show photos/evidence] This type of damage is exactly what your homeowner's insurance is designed to cover. The good news is that we can handle the entire insurance claim process for you, and if the claim is approved, there will be no out-of-pocket expense to you. We work on what's called a contingency basis - we only get paid when your claim is approved and the work is completed.`,
            keyPhrases: [
              'Significant damage',
              'Will be covered by insurance',
              'Let me show you what I found',
              'Handle entire insurance process',
              'No out-of-pocket expense',
              'Contingency basis',
            ],
            notes: [
              'Always use visual evidence (photos)',
              'Emphasize insurance coverage benefits',
              'Explain contingency clearly',
              'Create urgency with timeline',
            ],
          },
          {
            title: 'Insurance Process Explanation',
            context: 'Explaining how insurance claims work',
            script: `Here's exactly how the process works: First, we'll file the claim with your insurance company and schedule the adjuster visit. We'll meet with the adjuster and present all the documentation. Once the claim is approved - which we're confident it will be based on this damage - your insurance company will issue a check made out to you and your mortgage company. We'll work directly with your mortgage company to handle all the paperwork. The only thing you'll pay is your deductible, which is typically $500-2500. Everything else is covered. Does that make sense?`,
            keyPhrases: [
              "Here's exactly how the process works",
              "We'll handle everything",
              'Once the claim is approved',
              'Only pay your deductible',
              'Everything else is covered',
              'Does that make sense?',
            ],
            notes: [
              'Break down process into simple steps',
              'Address mortgage company concerns',
              'Confirm understanding at the end',
              'Be specific about deductible amount',
            ],
          },
        ],
        techniques: [
          'Use visual aids and photos to support your findings',
          'Speak with confidence about insurance coverage',
          'Address concerns before they become objections',
          'Create appropriate urgency with weather/season timing',
          'Always get the signed agreement before leaving',
          'Follow up with next steps and timeline',
        ],
        commonObjections: [
          {
            objection: 'I need to think about it',
            response:
              'I completely understand wanting to think it through - this is a big decision. What specific concerns do you have that I can address right now? The damage I found needs to be repaired regardless, and waiting could lead to more problems and potentially void your insurance coverage if secondary damage occurs.',
            technique: 'Isolate the concern and create urgency',
            followUp:
              'What questions can I answer to help you feel comfortable moving forward today?',
          },
          {
            objection: 'Will this raise my insurance rates?',
            response:
              "That's a common concern, and here are the facts: In most states, insurance companies cannot raise your rates for weather-related claims like hail or wind damage. Even if there were an increase, the average increase is about $30-50 per year, while the value of your claim will be $8,000-15,000 or more. You're essentially paying for this coverage every year - you might as well use it when you need it.",
            technique: 'Provide specific facts and cost-benefit analysis',
          },
        ],
        practiceScenarios: [
          'Customer questions the severity of damage',
          'Customer wants multiple contractor estimates',
          'Customer is concerned about insurance rates',
          'Customer wants to wait until next year',
          "Customer questions your company's credentials",
        ],
        resources: [
          {
            title: 'Damage Documentation Template',
            type: 'Template',
            description:
              'Professional format for presenting inspection findings',
          },
          {
            title: 'Insurance Process Flowchart',
            type: 'PDF',
            description: 'Visual guide to share with customers',
          },
          {
            title: 'Contingency Agreement Explanation',
            type: 'Template',
            description: 'Clear breakdown of contract terms',
          },
        ],
        quiz: [
          {
            question:
              'When presenting damage findings, what should you show first?',
            options: [
              'The contract to sign',
              'Visual evidence like photos',
              'Your business card',
              'The final price',
            ],
            correctAnswer: 1,
            explanation:
              'Visual evidence builds credibility and helps customers understand the extent of damage.',
          },
          {
            question:
              "What's the key benefit to emphasize about insurance claims?",
            options: [
              'Claims are always approved',
              'No out-of-pocket expense to the customer',
              'Claims take a long time',
              'Insurance companies are difficult',
            ],
            correctAnswer: 1,
            explanation:
              'Emphasizing no out-of-pocket expense removes the biggest customer concern about cost.',
          },
          {
            question: 'How should you explain the contingency basis?',
            options: [
              'We get paid regardless of the outcome',
              'You pay us upfront',
              'We only get paid when your claim is approved and work is completed',
              'Payment is due immediately',
            ],
            correctAnswer: 2,
            explanation:
              'This explanation removes financial risk for the customer and builds trust.',
          },
          {
            question:
              "When a customer says 'I need to think about it,' you should:",
            options: [
              'Leave immediately',
              'Pressure them to decide now',
              'Isolate their specific concerns and address them',
              'Offer a discount',
            ],
            correctAnswer: 2,
            explanation:
              'Isolating concerns allows you to address specific objections rather than general hesitation.',
          },
          {
            question:
              'What creates appropriate urgency in post-inspection sales?',
            options: [
              'Limited time discount offers',
              'Weather and seasonal timing concerns',
              'Pressure tactics',
              'Threatening to leave',
            ],
            correctAnswer: 1,
            explanation:
              'Weather and seasonal concerns create legitimate urgency based on practical considerations.',
          },
          {
            question: "The best way to handle 'Will this raise my rates?' is:",
            options: [
              "Don't worry about it",
              'Rates might go up a little',
              'Provide specific facts about rate regulations and cost-benefit analysis',
              'Avoid the question',
            ],
            correctAnswer: 2,
            explanation:
              'Specific facts and cost-benefit analysis build confidence and overcome the objection with data.',
          },
          {
            question:
              'What should you always get before leaving a post-inspection presentation?',
            options: [
              'A referral',
              'The signed contingency agreement',
              'Payment information',
              'Their social media contact',
            ],
            correctAnswer: 1,
            explanation:
              'The signed agreement is the primary goal of the post-inspection presentation.',
          },
          {
            question: 'When explaining the insurance process, emphasize:',
            options: [
              'How complicated it is',
              'That you handle everything for them',
              'How long it takes',
              'Potential problems',
            ],
            correctAnswer: 1,
            explanation:
              'Emphasizing that you handle everything removes stress and positions you as the solution.',
          },
          {
            question: 'The most effective way to present damage severity is:',
            options: [
              'Exaggerate the problems',
              'Use technical jargon',
              'Show clear evidence and explain insurance implications',
              'Minimize the damage',
            ],
            correctAnswer: 2,
            explanation:
              'Clear evidence with insurance implications helps customers understand both the problem and solution.',
          },
          {
            question: 'What should you do if customers want multiple quotes?',
            options: [
              'Tell them not to',
              'Acknowledge their right to compare while emphasizing your unique insurance expertise',
              'Leave immediately',
              'Offer a discount to avoid competition',
            ],
            correctAnswer: 1,
            explanation:
              'Acknowledging their right while differentiating your expertise maintains trust and positions your value.',
          },
        ],
      },
    },
    {
      id: 'insurance-objection-mastery',
      title: 'Insurance Objection Handling',
      description:
        'Master responses to the most common insurance-related concerns and objections from the field.',
      category: 'Insurance Claims',
      difficulty: 'Advanced',
      duration: '50 minutes',
      content: {
        overview: `Become an expert at handling insurance-related objections with confidence and factual information. This module covers the most common concerns customers have about filing insurance claims and provides proven responses that build trust and overcome resistance.`,
        keyPoints: [
          'Understanding customer psychology around insurance claims',
          'Fact-based responses to rate increase concerns',
          'Explaining the claims process to reduce anxiety',
          'Building trust through transparency',
          'Closing techniques after objection handling',
        ],
        scripts: [
          {
            title: 'Rate Increase Response',
            context: 'Customer worried about insurance rates going up',
            script: `I understand that concern completely - it's the most common question I get. Here are the actual facts: First, in most states, insurance companies are prohibited by law from raising rates for weather-related claims like hail and wind damage. Second, even in states where they can adjust rates, studies show the average increase is only $30-50 per year. Compare that to a typical roof claim of $12,000-18,000. You'd have to pay that small increase for 300+ years to equal what you'll receive from your claim. You're already paying for this coverage - you deserve to use it when you need it.`,
            keyPhrases: [
              'Most common question I get',
              'Here are the actual facts',
              'Prohibited by law',
              'Studies show',
              'You deserve to use it',
            ],
            notes: [
              'Acknowledge the concern is common and valid',
              'Use specific facts and numbers',
              "Frame it as using coverage they're paying for",
              'Make the math simple and clear',
            ],
          },
          {
            title: 'Claims Process Anxiety',
            context: 'Customer worried about dealing with insurance',
            script: `I totally get why that seems overwhelming - most people have never filed a claim before. The good news is that we handle 100% of the insurance process for you. We file the claim, we meet with the adjuster, we provide all the documentation, and we even help with the mortgage company paperwork. Your only job is to sign the papers and pick your shingle color. We've done this thousands of times, and we know exactly how to work with insurance companies to get claims approved quickly.`,
            keyPhrases: [
              'We handle 100% of the process',
              'Your only job is to sign',
              "We've done this thousands of times",
              'Get claims approved quickly',
            ],
            notes: [
              'Simplify their role in the process',
              'Use experience as credibility builder',
              'Focus on the end result they want',
              'Remove the complexity and stress',
            ],
          },
        ],
        techniques: [
          'Always acknowledge the concern as valid and common',
          'Use specific facts, statistics, and laws when possible',
          'Compare costs to benefits with simple math',
          'Share success stories and experience',
          'Ask for the commitment after addressing concerns',
          'Follow up with additional reassurance if needed',
        ],
        commonObjections: [
          {
            objection: "I don't want to deal with insurance companies",
            response:
              "I completely understand - that's exactly why you hire us. We become your advocate with the insurance company. We speak their language, we know their processes, and we handle all the communication. You won't have to deal with them at all. We've successfully processed over 1,000 claims, so we know exactly how to get the best results.",
            technique: 'Position yourself as the solution to their concern',
          },
          {
            objection: 'What if the insurance denies the claim?',
            response:
              "Based on the damage I documented, I'm confident this claim will be approved - I've seen this type of damage approved hundreds of times. But if for some reason it's denied, you don't owe us anything. We only get paid when your claim is approved and the work is completed. We take all the risk, so you have nothing to lose by letting us try.",
            technique: 'Provide confidence while removing risk',
          },
        ],
        practiceScenarios: [
          'Customer had a bad experience with insurance before',
          "Customer thinks their insurance won't cover the damage",
          'Customer is worried about being dropped by insurance',
          'Customer questions if the damage is really covered',
          'Customer wants to pay out of pocket instead',
        ],
        resources: [
          {
            title: 'Insurance Facts & Statistics Sheet',
            type: 'PDF',
            description:
              'State-by-state facts about insurance rate regulations',
          },
          {
            title: 'Claims Success Stories',
            type: 'PDF',
            description: 'Case studies to build confidence',
          },
          {
            title: 'Objection Response Quick Reference',
            type: 'Checklist',
            description: 'Fast responses to common objections',
          },
        ],
        quiz: [
          {
            question:
              "What's the most effective way to address rate increase concerns?",
            options: [
              "Tell them rates won't go up",
              'Ignore the concern',
              'Provide specific facts, laws, and cost-benefit analysis',
              'Change the subject',
            ],
            correctAnswer: 2,
            explanation:
              'Specific facts and laws build credibility while cost-benefit analysis shows the value despite small increases.',
          },
          {
            question:
              "When a customer says they don't want to deal with insurance, you should:",
            options: [
              'Agree and move on',
              'Position yourself as their advocate who handles everything',
              'Tell them insurance is easy',
              'Pressure them anyway',
            ],
            correctAnswer: 1,
            explanation:
              'Positioning yourself as their advocate who handles everything addresses their exact concern.',
          },
          {
            question:
              'The average insurance rate increase for weather claims is:',
            options: [
              '$500-1000 per year',
              '$30-50 per year',
              '$200-300 per year',
              'No increase is possible',
            ],
            correctAnswer: 1,
            explanation:
              'Having specific, factual numbers makes your response credible and allows for proper cost-benefit analysis.',
          },
          {
            question:
              "What's the best response to 'What if insurance denies the claim?'",
            options: [
              'That never happens',
              "You'll still owe us money",
              "Based on this damage, I'm confident it will be approved, but you don't owe us anything if it's denied",
              "We'll sue the insurance company",
            ],
            correctAnswer: 2,
            explanation:
              'This response shows confidence while removing all financial risk from the customer.',
          },
          {
            question: 'When handling objections, always:',
            options: [
              'Argue with the customer',
              'Acknowledge the concern as valid and common',
              'Ignore their feelings',
              'Use high-pressure tactics',
            ],
            correctAnswer: 1,
            explanation:
              'Acknowledging concerns as valid and common makes customers feel understood and opens them to your response.',
          },
          {
            question: 'The key message about insurance coverage is:',
            options: [
              'Insurance is complicated',
              "You're already paying for this coverage - you deserve to use it when you need it",
              'Insurance companies are unfair',
              'Claims are always denied',
            ],
            correctAnswer: 1,
            explanation:
              "This message reframes the claim as using coverage they're already paying for, not as taking advantage.",
          },
          {
            question: 'What statistic helps overcome rate concerns?',
            options: [
              '100% of claims raise rates',
              'Most states prohibit rate increases for weather-related claims',
              'Insurance is always expensive',
              'All companies raise rates',
            ],
            correctAnswer: 1,
            explanation:
              'This legal fact provides strong reassurance and shows your expertise in insurance regulations.',
          },
          {
            question: 'When customers fear being dropped by insurance:',
            options: [
              'That happens all the time',
              "Don't worry about it",
              'Explain that dropping customers for weather claims is illegal in most states and rare',
              'Find a new insurance company',
            ],
            correctAnswer: 2,
            explanation:
              'Providing legal facts and statistics helps overcome fears with concrete information.',
          },
          {
            question: 'The most important element in objection handling is:',
            options: [
              'Talking fast',
              'Building trust through transparency and facts',
              'Using sales tricks',
              'Avoiding difficult questions',
            ],
            correctAnswer: 1,
            explanation:
              'Trust through transparency and facts creates lasting customer confidence and reduces objections.',
          },
          {
            question: 'After successfully handling an objection, you should:',
            options: [
              'Move on quickly',
              'Ask for the commitment to proceed',
              'Bring up more potential problems',
              'Wait for more objections',
            ],
            correctAnswer: 1,
            explanation:
              'Successfully addressing concerns creates an opportunity to ask for commitment while resistance is low.',
          },
        ],
      },
    },
    {
      id: 'field-operations',
      title: 'Field Operations & Documentation',
      description:
        'Master the field portal app, photo documentation, and operational procedures from the training manual.',
      category: 'Field Operations',
      difficulty: 'Intermediate',
      duration: '40 minutes',
      content: {
        overview: `Learn the essential field operations procedures including proper use of the field portal app, professional photo documentation, measurement techniques, and administrative processes that ensure successful project completion and customer satisfaction.`,
        keyPoints: [
          'Field portal app navigation and data entry',
          'Professional photo documentation standards',
          'Proper measurement and estimation techniques',
          'Customer communication during field work',
          'Administrative follow-up procedures',
        ],
        scripts: [
          {
            title: 'Beginning Inspection Communication',
            context: 'Starting the roof inspection process',
            script: `Before I get started with the inspection, let me explain what I'm going to do. I'll be using a drone and also climbing on the roof to take detailed photos of any damage. I'll document everything in our system and provide you with a complete report. This will take about 30-45 minutes. Do you have any questions about the process? Also, I'll need you to be available when I'm done to review the findings together.`,
            keyPhrases: [
              "Let me explain what I'm going to do",
              'Drone and climbing on roof',
              'Document everything in our system',
              'Complete report',
              "Available when I'm done",
            ],
            notes: [
              'Set clear expectations upfront',
              'Mention professional tools (drone)',
              'Emphasize thorough documentation',
              "Ensure they'll be available for presentation",
            ],
          },
        ],
        techniques: [
          'Use the field portal app for all data entry',
          'Take photos from multiple angles and distances',
          'Document all damage with measurements',
          'Update customer on progress during inspection',
          'Complete all paperwork before leaving',
          'Schedule follow-up appointments immediately',
        ],
        commonObjections: [
          {
            objection: 'How long will this take?',
            response:
              "A thorough inspection typically takes 30-45 minutes depending on the size and complexity of your roof. I want to make sure I don't miss anything that could be covered by your insurance. The extra time upfront ensures we get the best possible outcome for your claim.",
            technique: 'Set realistic expectations and explain the value',
          },
        ],
        practiceScenarios: [
          'Customer wants to watch the inspection',
          'Weather conditions change during inspection',
          'Customer questions the thoroughness',
          'Technical issues with equipment',
          'Customer wants results immediately',
        ],
        resources: [
          {
            title: 'Field Portal App User Guide',
            type: 'PDF',
            description: 'Step-by-step guide to app features',
          },
          {
            title: 'Photo Documentation Standards',
            type: 'Checklist',
            description: 'Required photos for complete documentation',
          },
          {
            title: 'Measurement Techniques Guide',
            type: 'Video',
            description: 'Proper measurement and estimation methods',
          },
        ],
        quiz: [
          {
            question: 'Before starting an inspection, you should:',
            options: [
              'Begin immediately',
              'Explain the process and timeline to the customer',
              'Work in silence',
              'Rush to finish quickly',
            ],
            correctAnswer: 1,
            explanation:
              'Setting clear expectations reduces customer anxiety and demonstrates professionalism.',
          },
          {
            question: 'The most important tool for roof documentation is:',
            options: [
              'A ladder',
              'A drone and camera for detailed photos',
              'A measuring tape',
              'A clipboard',
            ],
            correctAnswer: 1,
            explanation:
              'Professional photo documentation provides the evidence needed for insurance claims and customer presentations.',
          },
          {
            question: 'How long should a thorough roof inspection take?',
            options: [
              '10-15 minutes',
              '30-45 minutes',
              '2-3 hours',
              '5 minutes',
            ],
            correctAnswer: 1,
            explanation:
              'A thorough inspection takes time to ensure all potential damage is documented properly.',
          },
          {
            question: 'What should you do during the inspection?',
            options: [
              'Work completely alone',
              'Update the customer periodically on progress',
              'Avoid the customer entirely',
              'Rush through quickly',
            ],
            correctAnswer: 1,
            explanation:
              'Regular updates keep customers informed and demonstrate thoroughness and professionalism.',
          },
          {
            question: 'The field portal app is used for:',
            options: [
              'Entertainment',
              'Data entry and documentation',
              'Social media',
              'Making phone calls',
            ],
            correctAnswer: 1,
            explanation:
              'The field portal app ensures all inspection data is properly recorded and accessible for claims processing.',
          },
          {
            question: 'When taking photos for documentation, you should:',
            options: [
              'Take just a few quick shots',
              'Capture multiple angles and distances',
              'Only take close-up photos',
              'Avoid photos altogether',
            ],
            correctAnswer: 1,
            explanation:
              'Multiple angles and distances provide comprehensive evidence for insurance adjusters and customers.',
          },
          {
            question:
              "What's essential to complete before leaving the customer's property?",
            options: [
              'All paperwork and documentation',
              'Nothing - do it later',
              'Just the measurements',
              'Only the photos',
            ],
            correctAnswer: 0,
            explanation:
              'Completing all documentation on-site ensures accuracy and prevents delays in the claims process.',
          },
          {
            question: 'If a customer wants to watch the inspection:',
            options: [
              'Tell them no',
              'Ignore them',
              'Welcome their interest while maintaining safety',
              'Rush to finish',
            ],
            correctAnswer: 2,
            explanation:
              'Engaging interested customers builds trust while maintaining safety demonstrates professionalism.',
          },
          {
            question: 'The purpose of drone photography is to:',
            options: [
              'Impress customers',
              "Capture damage that's not safely accessible",
              'Replace all other inspections',
              'Make the job faster',
            ],
            correctAnswer: 1,
            explanation:
              'Drones provide safe access to areas that would be dangerous to inspect manually while providing clear documentation.',
          },
          {
            question: 'After completing the inspection, you should:',
            options: [
              'Leave immediately',
              'Schedule the follow-up presentation immediately',
              'Wait a week to call',
              'Email results only',
            ],
            correctAnswer: 1,
            explanation:
              "Immediate scheduling while you're on-site maintains momentum and demonstrates urgency about their roof's condition.",
          },
        ],
      },
    },
    {
      id: 'follow-up-conversion',
      title: 'Follow-Up & Conversion Strategies',
      description:
        'Master follow-up techniques, email templates, and conversion strategies for warm leads.',
      category: 'Follow-Up',
      difficulty: 'Intermediate',
      duration: '35 minutes',
      content: {
        overview: `Learn systematic follow-up strategies that convert interested prospects into signed contracts. This module includes proven email templates, phone scripts, and timing strategies from the field training manual.`,
        keyPoints: [
          'Strategic follow-up timing and frequency',
          'Professional email templates for different scenarios',
          'Phone follow-up scripts and techniques',
          'Creating appropriate urgency in follow-ups',
          'Converting objections into opportunities',
        ],
        scripts: [
          {
            title: 'Initial Follow-Up Call',
            context: 'Following up with customer who requested time to think',
            script: `Hi [Name], this is [Your Name] from Roof ER. I wanted to follow up on our conversation yesterday about your roof inspection. I know you wanted some time to think about it, which I completely understand. Have you had a chance to discuss it with your spouse? Do you have any questions about the process or concerns I can address?`,
            keyPhrases: [
              'Following up on our conversation',
              'Time to think about it',
              'Completely understand',
              'Questions or concerns I can address',
            ],
            notes: [
              'Reference previous conversation specifically',
              'Acknowledge their need for time',
              'Open the door for questions',
              'Be helpful, not pushy',
            ],
          },
        ],
        techniques: [
          'Follow up within 24-48 hours of initial meeting',
          'Use multiple contact methods (phone, email, text)',
          'Provide additional value in each follow-up',
          'Address new concerns that arise',
          'Create reasonable urgency with deadlines',
          'Always suggest a specific next step',
        ],
        commonObjections: [
          {
            objection: "We're still thinking about it",
            response:
              "I understand, and I appreciate you taking the time to consider it carefully. Can I ask what specific aspects you're thinking about? Sometimes I can provide additional information that helps clarify things. Also, I want to make sure you know that if we don't get started soon, we might run into weather delays that could push the project into next season.",
            technique: 'Isolate concerns and create mild urgency',
          },
        ],
        practiceScenarios: [
          'Customer stops returning calls',
          'Customer got quotes from competitors',
          'Customer delayed due to financing concerns',
          'Customer wants to wait until next year',
          'Customer spouse needs convincing',
        ],
        resources: [
          {
            title: 'Follow-Up Email Templates',
            type: 'Template',
            description: 'Professional email templates for various scenarios',
          },
          {
            title: 'Follow-Up Schedule Template',
            type: 'Template',
            description: 'Systematic approach to follow-up timing',
          },
          {
            title: 'Conversion Tracking Sheet',
            type: 'Template',
            description: 'Track follow-up activities and results',
          },
        ],
        quiz: [
          {
            question: 'When should you make your first follow-up contact?',
            options: [
              'Within 24-48 hours',
              'After one week',
              'Within one month',
              'When you remember',
            ],
            correctAnswer: 0,
            explanation:
              'Quick follow-up maintains momentum and shows professionalism while the conversation is still fresh.',
          },
          {
            question: 'The best approach for follow-up calls is:',
            options: [
              'High pressure sales tactics',
              'Helpful, consultative approach addressing concerns',
              'Aggressive closing techniques',
              'Ignoring previous objections',
            ],
            correctAnswer: 1,
            explanation:
              'A helpful approach builds trust and positions you as an advisor rather than a pushy salesperson.',
          },
          {
            question: 'If a customer stops returning calls, you should:',
            options: [
              'Give up immediately',
              'Call every day',
              'Try multiple communication methods (phone, email, text)',
              'Show up at their house',
            ],
            correctAnswer: 2,
            explanation:
              'Multiple communication methods increase your chances of reaching them without being overly aggressive.',
          },
          {
            question: 'What creates appropriate urgency in follow-up?',
            options: [
              'False deadlines',
              'Weather and seasonal timing',
              'Threatening language',
              'Pressure tactics',
            ],
            correctAnswer: 1,
            explanation:
              'Real weather and seasonal concerns create legitimate urgency based on practical considerations.',
          },
          {
            question: 'When following up, always:',
            options: [
              'Repeat the same message',
              'Provide additional value or information',
              'Focus only on closing',
              'Mention competitors',
            ],
            correctAnswer: 1,
            explanation:
              'Adding value in each follow-up maintains interest and demonstrates ongoing expertise.',
          },
          {
            question:
              "The best response to 'We're still thinking about it' is:",
            options: [
              'Stop thinking and decide now',
              "That's fine, call me when ready",
              'What specific aspects are you considering? I can provide clarity',
              'Everyone says that',
            ],
            correctAnswer: 2,
            explanation:
              'Isolating specific concerns allows you to provide targeted information and move the process forward.',
          },
          {
            question: 'How many follow-up attempts should you make?',
            options: [
              'One or two',
              'As many as needed with value-added approaches',
              'Exactly five',
              'Stop after the first no',
            ],
            correctAnswer: 1,
            explanation:
              'Persistence is key in sales, but each contact must provide value to avoid being annoying.',
          },
          {
            question: 'The purpose of follow-up emails is to:',
            options: [
              'Replace phone calls',
              'Provide additional information and maintain contact',
              'Pressure for immediate decisions',
              'Send promotional materials',
            ],
            correctAnswer: 1,
            explanation:
              'Follow-up emails keep you top-of-mind while providing valuable information that aids decision-making.',
          },
          {
            question: 'When should you suggest a specific next step?',
            options: [
              'Never',
              'Only at the end',
              'In every follow-up contact',
              'Only when they ask',
            ],
            correctAnswer: 2,
            explanation:
              'Always suggesting a specific next step keeps the process moving forward and makes it easy for customers to say yes.',
          },
          {
            question: 'The most effective follow-up strategy combines:',
            options: [
              'Pressure and urgency only',
              'Helpful information, appropriate urgency, and clear next steps',
              'Generic messages',
              'One-size-fits-all approaches',
            ],
            correctAnswer: 1,
            explanation:
              'This combination maintains value while creating motivation and making it easy for customers to move forward.',
          },
        ],
      },
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (selectedModule && isOpen) {
      const module = salesModules.find(m => m.id === selectedModule);
      if (module) {
        setCurrentModule(module);
        setActiveSection('overview');
      }
    }
  }, [selectedModule, isOpen, salesModules]);

  // Add escape key handler to close module
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close recorder if open, otherwise close module
        if (showRecorder) {
          setShowRecorder(false);
        } else if (showQuizResults) {
          setShowQuizResults(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, showRecorder, showQuizResults, onClose]);

  const handleQuizSubmit = () => {
    if (!currentModule?.content.quiz) return;

    let correct = 0;
    currentModule.content.quiz.forEach((question, idx) => {
      if (quizAnswers[idx] === question.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round(
      (correct / currentModule.content.quiz.length) * 100
    );
    setQuizScore(score);
    setShowQuizResults(true);

    if (score >= 70) {
      setCompletedModules(prev => new Set(prev).add(currentModule.id));
      onModuleComplete(currentModule.id, score);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setShowQuizResults(false);
    setQuizScore(0);
  };

  if (!isOpen || !currentModule) return null;

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
          className="w-full max-w-7xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {currentModule.title}
                </h2>
                <div className="flex items-center space-x-4 text-red-100">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {currentModule.duration}
                  </span>
                  <span className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    {currentModule.difficulty}
                  </span>
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {currentModule.category}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-red-800 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex h-full">
            {/* Left Navigation */}
            <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: BookOpen },
                  {
                    id: 'interactive-learning',
                    label: 'Interactive Learning',
                    icon: Lightbulb,
                  },
                  {
                    id: 'agnes-content',
                    label: 'Agnes Video/Audio',
                    icon: PlayIcon,
                  },
                  {
                    id: 'scripts',
                    label: 'Sales Scripts',
                    icon: MessageSquare,
                  },
                  {
                    id: 'objections',
                    label: 'Objection Handling',
                    icon: Shield,
                  },
                  { id: 'practice', label: 'Practice Scenarios', icon: Users },
                  { id: 'quiz', label: 'Knowledge Check', icon: Brain },
                  {
                    id: 'docs',
                    label: 'Documents & Resources',
                    icon: Download,
                  },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id as any)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === id
                        ? 'bg-red-100 text-red-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {label}
                  </button>
                ))}
              </nav>

              {/* Progress Indicator */}
              <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">
                  Module Progress
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium">
                      {completedModules.has(currentModule.id) ? '100%' : '0%'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        completedModules.has(currentModule.id)
                          ? 'bg-green-500 w-full'
                          : 'bg-red-500 w-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              {activeSection === 'overview' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Module Overview
                  </h3>

                  <div className="prose max-w-4xl mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {currentModule.content.overview}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        Key Learning Points
                      </h4>
                      <ul className="space-y-2">
                        {currentModule.content.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-blue-800 text-sm">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2" />
                        Learning Techniques
                      </h4>
                      <ul className="space-y-2">
                        {currentModule.content.techniques.map(
                          (technique, idx) => (
                            <li key={idx} className="flex items-start">
                              <ArrowRight className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-green-800 text-sm">
                                {technique}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  {currentModule.content.resources.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Download className="w-5 h-5 mr-2" />
                        Resources & Materials
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {currentModule.content.resources.map(
                          (resource, idx) => (
                            <div
                              key={idx}
                              className="flex items-center p-3 bg-white rounded border border-gray-200"
                            >
                              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                                <FileText className="w-4 h-4 text-red-600" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 text-sm">
                                  {resource.title}
                                </div>
                                <div className="text-gray-600 text-xs">
                                  {resource.description}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'scripts' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Sales Scripts
                  </h3>

                  <div className="space-y-6">
                    {currentModule.content.scripts.map((script, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setExpandedScript(
                              expandedScript === script.title
                                ? null
                                : script.title
                            )
                          }
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              {script.title}
                            </h4>
                            <p className="text-gray-600">{script.context}</p>
                          </div>
                          {expandedScript === script.title ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedScript === script.title && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 pt-0 border-t border-gray-100">
                                <div className="bg-red-50 rounded-lg p-4 mb-4">
                                  <h5 className="font-medium text-red-900 mb-2">
                                    Script:
                                  </h5>
                                  <p className="text-red-800 italic leading-relaxed">
                                    {script.script}
                                  </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-3">
                                      Key Phrases to Use:
                                    </h5>
                                    <div className="space-y-2">
                                      {script.keyPhrases.map((phrase, pidx) => (
                                        <div
                                          key={pidx}
                                          className="flex items-center p-2 bg-gray-50 rounded"
                                        >
                                          <MessageSquare className="w-4 h-4 text-blue-600 mr-2" />
                                          <span className="text-blue-800 text-sm">
                                            "{phrase}"
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-3">
                                      Important Notes:
                                    </h5>
                                    <div className="space-y-2">
                                      {script.notes.map((note, nidx) => (
                                        <div
                                          key={nidx}
                                          className="flex items-start"
                                        >
                                          <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                                          <span className="text-gray-700 text-sm">
                                            {note}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'objections' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Objection Handling
                  </h3>

                  <div className="space-y-6">
                    {currentModule.content.commonObjections.map(
                      (objection, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                Customer Says:
                              </h4>
                              <p className="text-red-700 italic mb-4">
                                "{objection.objection}"
                              </p>
                            </div>
                          </div>

                          <div className="ml-12">
                            <h5 className="font-medium text-gray-900 mb-2">
                              Your Response:
                            </h5>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                              {objection.response}
                            </p>

                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center px-3 py-1 bg-gray-100 text-blue-800 rounded-full">
                                <Zap className="w-3 h-3 mr-1" />
                                {objection.technique}
                              </div>
                              {objection.followUp && (
                                <div className="flex items-center text-gray-600">
                                  <ArrowRight className="w-3 h-3 mr-1" />
                                  Follow-up: "{objection.followUp}"
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {activeSection === 'practice' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Practice Scenarios
                  </h3>

                  {/* Record Sales Pitch Button */}
                  <div className="bg-gradient-to-r from-black to-neutral-900 rounded-lg p-6 mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                          <Mic className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">
                            Record Your Sales Pitch
                          </h4>
                          <p className="text-gray-300 text-sm">
                            Practice and submit your pitch for manager review
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowRecorder(true)}
                        className="px-6 py-3 bg-white text-roofRed rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <Mic className="w-5 h-5" />
                        <span>Start Recording</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {currentModule.content.practiceScenarios.map(
                      (scenario, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                              <Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <h4 className="font-semibold text-gray-900">
                              Scenario {idx + 1}
                            </h4>
                          </div>

                          <p className="text-gray-700 mb-4">{scenario}</p>

                          <div className="flex space-x-3">
                            <button className="flex-1 px-4 py-2 bg-roofRed text-white rounded-lg hover:bg-roofRed-dark transition-colors text-sm">
                              Practice Now
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              View Tips
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Sales Pitch Recorder Modal */}
              {showRecorder && currentModule && (
                <SalesPitchRecorder
                  isOpen={showRecorder}
                  onClose={() => setShowRecorder(false)}
                  moduleName={currentModule.title}
                  moduleId={currentModule.id}
                  userName="John Doe"
                  userEmail="user@example.com"
                />
              )}

              {activeSection === 'interactive-learning' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Interactive Learning Experience
                  </h3>

                  <div className="grid gap-8">
                    {/* Learning Objectives */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-blue-600" />
                        Learning Objectives
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {currentModule.content.keyPoints.map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="w-6 h-6 bg-roofRed text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {idx + 1}
                            </div>
                            <span className="text-blue-800 text-sm">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Text Sections */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                        Deep Dive Content
                      </h4>
                      <div className="prose max-w-none">
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                          <h5 className="font-semibold text-green-900 mb-2">
                            Core Concepts
                          </h5>
                          <p className="text-green-800 leading-relaxed">
                            {currentModule.content.overview}
                          </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-yellow-50 rounded-lg p-4">
                            <h6 className="font-semibold text-yellow-900 mb-3">
                              Key Techniques
                            </h6>
                            <ul className="space-y-2">
                              {currentModule.content.techniques.map(
                                (technique, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start text-yellow-800 text-sm"
                                  >
                                    <Zap className="w-4 h-4 mr-2 mt-0.5 text-yellow-600 flex-shrink-0" />
                                    {technique}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <h6 className="font-semibold text-gray-900 mb-3">
                              Success Factors
                            </h6>
                            <div className="space-y-2">
                              {[
                                'Professional appearance',
                                'Confident delivery',
                                'Active listening',
                                'Follow-up consistency',
                              ].map((factor, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center text-purple-800 text-sm"
                                >
                                  <Star className="w-4 h-4 mr-2 text-purple-600" />
                                  {factor}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Elements */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-red-600" />
                        Check Your Understanding
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <h6 className="font-medium text-red-900 mb-2">
                            Quick Reflection:
                          </h6>
                          <p className="text-red-800 text-sm mb-3">
                            Think about a time when you made a strong first
                            impression. What elements made it successful?
                          </p>
                          <textarea
                            className="w-full p-3 border border-red-300 rounded-lg text-sm"
                            rows={3}
                            placeholder="Write your thoughts here..."
                          />
                        </div>
                        <button
                          onClick={() => setActiveSection('agnes-content')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Continue to Agnes Content →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'agnes-content' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Agnes AI Video & Audio Content
                  </h3>

                  <div className="grid gap-6">
                    {/* Video Content */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <PlayIcon className="w-5 h-5 mr-2 text-blue-600" />
                        Video Training with Agnes
                      </h4>
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white mb-4">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <PlayIcon className="w-8 h-8" />
                        </div>
                        <h5 className="text-xl font-semibold mb-2">
                          {currentModule.title} - Video Lesson
                        </h5>
                        <p className="text-blue-100 mb-4">
                          Interactive video training with Agnes AI instructor
                        </p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                          Start Video Training
                        </button>
                      </div>
                    </div>

                    {/* Audio Content */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Volume2 className="w-5 h-5 mr-2 text-green-600" />
                        Audio Training Sessions
                      </h4>
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Foundation Concepts',
                            duration: '12:30',
                            description: 'Core principles and approach',
                          },
                          {
                            title: 'Real-World Examples',
                            duration: '15:45',
                            description: 'Actual scenarios and outcomes',
                          },
                          {
                            title: 'Common Mistakes',
                            duration: '8:20',
                            description: 'What to avoid and why',
                          },
                          {
                            title: 'Advanced Techniques',
                            duration: '18:15',
                            description: 'Pro-level strategies',
                          },
                        ].map((audio, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                                <Volume2 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h6 className="font-medium text-green-900">
                                  {audio.title}
                                </h6>
                                <p className="text-green-700 text-sm">
                                  {audio.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-green-700 text-sm">
                                {audio.duration}
                              </span>
                              <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                <PlayIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Chat with Agnes */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                        Ask Agnes About This Module
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-roofRed rounded-full flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">
                            Agnes AI
                          </span>
                        </div>
                        <p className="text-purple-800 mb-4">
                          "I'm here to answer any questions about{' '}
                          {currentModule.title.toLowerCase()}. Ask me about
                          specific techniques, real-world applications, or
                          anything that needs clarification!"
                        </p>
                        <button className="w-full py-3 bg-roofRed text-white rounded-lg hover:bg-roofRed-dark transition-colors">
                          Start Chat with Agnes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'docs' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Documents & Resources
                  </h3>

                  <div className="grid gap-6">
                    {/* Module Resources */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Module-Specific Resources
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {currentModule.content.resources.map(
                          (resource, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-roofRed rounded-lg flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h6 className="font-medium text-gray-900">
                                    {resource.title}
                                  </h6>
                                  <p className="text-blue-700 text-sm">
                                    {resource.description}
                                  </p>
                                  <span className="inline-block px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded mt-1">
                                    {resource.type}
                                  </span>
                                </div>
                              </div>
                              <button className="px-4 py-2 bg-roofRed text-white rounded-lg hover:bg-roofRed-dark transition-colors text-sm">
                                <Download className="w-4 h-4 inline mr-1" />
                                Download
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* General Sales Resources */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Download className="w-5 h-5 mr-2 text-green-600" />
                        General Sales Resources
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          {
                            title: 'Roof-ER Sales Training Manual',
                            type: 'PDF',
                            size: '2.4 MB',
                            description:
                              'Complete training manual with all modules',
                          },
                          {
                            title: 'State Insurance Regulations',
                            type: 'PDF',
                            size: '1.8 MB',
                            description: 'Rate increase laws by state',
                          },
                          {
                            title: 'Customer Objection Database',
                            type: 'Excel',
                            size: '890 KB',
                            description: 'Responses to 100+ objections',
                          },
                          {
                            title: 'Sales Script Templates',
                            type: 'Word',
                            size: '456 KB',
                            description:
                              'Customizable scripts for all scenarios',
                          },
                          {
                            title: 'Photo Documentation Guide',
                            type: 'PDF',
                            size: '3.2 MB',
                            description:
                              'Visual guide for proper documentation',
                          },
                          {
                            title: 'Contract Templates',
                            type: 'PDF',
                            size: '1.1 MB',
                            description: 'Standard agreement forms',
                          },
                        ].map((doc, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-green-50 rounded-lg border border-green-200"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                <FileText className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-green-700 text-xs">
                                {doc.size}
                              </span>
                            </div>
                            <h6 className="font-medium text-green-900 mb-1">
                              {doc.title}
                            </h6>
                            <p className="text-green-700 text-sm mb-3">
                              {doc.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="inline-block px-2 py-1 bg-green-200 text-green-800 text-xs rounded">
                                {doc.type}
                              </span>
                              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors">
                                <Download className="w-3 h-3 inline mr-1" />
                                Get
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Reference Cards */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-purple-600" />
                        Quick Reference Cards
                      </h4>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { title: '5 Non-Negotiables', color: 'red' },
                          { title: 'Objection Responses', color: 'blue' },
                          { title: 'Insurance Facts', color: 'green' },
                          { title: 'Follow-up Scripts', color: 'purple' },
                        ].map((card, idx) => (
                          <div
                            key={idx}
                            className={`p-4 bg-${card.color}-50 rounded-lg border border-${card.color}-200`}
                          >
                            <div
                              className={`w-8 h-8 bg-${card.color}-600 rounded-lg flex items-center justify-center mb-3`}
                            >
                              <Eye className="w-4 h-4 text-white" />
                            </div>
                            <h6
                              className={`font-medium text-${card.color}-900 mb-2`}
                            >
                              {card.title}
                            </h6>
                            <p
                              className={`text-${card.color}-700 text-sm mb-3`}
                            >
                              Laminated reference card
                            </p>
                            <button
                              className={`w-full py-2 bg-${card.color}-600 text-white rounded text-sm hover:bg-${card.color}-700 transition-colors`}
                            >
                              <Download className="w-3 h-3 inline mr-1" />
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'quiz' && currentModule.content.quiz && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Knowledge Check
                  </h3>

                  {!showQuizResults ? (
                    <div className="space-y-8">
                      {currentModule.content.quiz.map((question, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-lg p-6"
                        >
                          <h4 className="font-semibold text-gray-900 mb-4">
                            Question {idx + 1}: {question.question}
                          </h4>

                          <div className="space-y-3">
                            {question.options.map((option, optIdx) => (
                              <label
                                key={optIdx}
                                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`question-${idx}`}
                                  value={optIdx}
                                  checked={quizAnswers[idx] === optIdx}
                                  onChange={() =>
                                    setQuizAnswers(prev => ({
                                      ...prev,
                                      [idx]: optIdx,
                                    }))
                                  }
                                  className="mr-3 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-center">
                        <button
                          onClick={handleQuizSubmit}
                          disabled={
                            Object.keys(quizAnswers).length !==
                            currentModule.content.quiz.length
                          }
                          className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                        >
                          Submit Quiz
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                          quizScore >= 70 ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {quizScore >= 70 ? (
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        ) : (
                          <XCircle className="w-10 h-10 text-red-600" />
                        )}
                      </div>

                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        Quiz {quizScore >= 70 ? 'Passed!' : 'Not Passed'}
                      </h4>

                      <p className="text-gray-600 mb-6">
                        You scored {quizScore}% (
                        {
                          Object.keys(quizAnswers).filter(
                            key =>
                              quizAnswers[parseInt(key)] ===
                              currentModule.content.quiz![parseInt(key)]
                                .correctAnswer
                          ).length
                        }{' '}
                        out of {currentModule.content.quiz.length} correct)
                      </p>

                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={resetQuiz}
                          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Retake Quiz
                        </button>
                        {quizScore >= 70 && (
                          <button
                            onClick={onClose}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Continue Learning
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SalesTrainingModules;
