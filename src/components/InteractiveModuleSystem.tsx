/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Circle,
  Book,
  Layers,
  PlayCircle,
  ClipboardCheck,
  FileText,
  MessageCircle,
  Award,
  Target,
  BookOpen,
  Sparkles,
  Home,
  Download,
} from 'lucide-react';
import AgnesRoleplaySystem from './AgnesRoleplaySystem';
import InteractiveLearningActivity from './InteractiveLearningActivity';
import type { Activity as LearningActivity } from './InteractiveLearningActivity';
import AgnesKnowledgeActivities from './AgnesKnowledgeActivities';
import type { KnowledgeActivity } from './AgnesKnowledgeActivities';
import AgnesSkillBuilders from './AgnesSkillBuilders';
import type { SkillBuildingActivity } from './AgnesSkillBuilders';
import AgnesGamifiedAndPractical from './AgnesGamifiedAndPractical';
import type { GamifiedOrPracticalActivity } from './AgnesGamifiedAndPractical';

// Import module content from JSON files
import module1Welcome from '../data/modules/module1_welcome.json';
import module2Commitment from '../data/modules/module2_commitment.json';
// Replace legacy 3–9 with new content where provided
import module3RoofingContent from '../data/modules/module3_roofing.json';
import module4InspectionSafetyContent from '../data/modules/module4_inspection_safety.json';
import module5InitialPitch from '../data/modules/module5_initial_pitch.json';
import module6InitialPitchObjections from '../data/modules/module6_initial_pitch_objections.json';
import module5PostInspectionPresentation from '../data/modules/module5_post_inspection_presentation.json';
import module6ClaimFiling from '../data/modules/module6_claim_filing.json';
import module7AdjusterMeeting from '../data/modules/module7_adjuster_meeting.json';
// Keep existing module8.json (shingle knowledge) as supplemental for material ID
import module4ShinglesMaterials from '../data/modules/module4_shingle_types_materials.json';
import module9PostInspectionObjections from '../data/modules/module9_post_inspection_objections.json';
import module10DamageIDNew from '../data/modules/module10_damage_identification_new.json';
import module11FilingClaimClosing from '../data/modules/module11_filing_claim_closing.json';
import module12ClosingObjections from '../data/modules/module12_closing_objections.json';
import module14SalesCycleJobFlow from '../data/modules/module14_sales_cycle_job_flow.json';
import module15Roleplay from '../data/modules/module15_roleplay.json';
import module13Discontinued from '../data/modules/module13_discontinued.json';
import module16FinalExam from '../data/modules/module16_final_exam.json';
import photoManifest from '../data/media/photoManifest.json';
import slideImages from '../data/media/slideImages.json';
import topicPhotos from '../data/media/topicPhotos.json';
// removed unused ModalPortal import

interface ModuleContent {
  overview: string;
  learningObjectives: string[];
  sections: ModuleSection[];
  interactiveLearning: InteractiveLearningSection[];
  agnesContent: AgnesContentSection[];
  quiz: QuizQuestion[];
  documents: DocumentResource[];
  matchingGame?: MatchingGame;
  leadershipBios?: PersonBio[];
}

interface ModuleSection {
  id: string;
  title: string;
  duration: string;
  content: string;
  keyPoints?: string[];
  examples?: string[];
  visualAids?: string[];
  activities?: Activity[]; // Embedded activities within section content
}

interface InteractiveLearningSection {
  id: string;
  title: string;
  description?: string;
  estimatedTime?: string;
  type?:
    | 'scenario'
    | 'exercise'
    | 'simulation'
    | 'reflection'
    | 'interactive-exercise'
    | 'workshop';
  content: string;
  activities?: Activity[];
}

interface Activity {
  id: string;
  title: string;
  description: string;
  type:
    | 'drag-drop'
    | 'multiple-choice'
    | 'fill-blank'
    | 'scenario-tree'
    | 'calculation'
    | 'roleplay'
    | 'text-input'
    | 'image-matching'
    | 'matching'
    | 'timed-challenge'
    | 'simulation'
    | 'calculator'
    | 'image-quiz'
    | 'branching-scenario'
    | 'scenario-response'
    | 'drag-drop-sequence'
    | 'multiple-choice-scenarios'
    // Knowledge Activities
    | 'flashcards'
    | 'quick-quiz'
    | 'concept-matching'
    | 'true-false-challenge'
    | 'memory-game'
    // Skill-Building Activities
    | 'estimation-calculator'
    | 'damage-assessment'
    | 'photo-analysis'
    | 'price-quote-exercise'
    | 'workflow-simulator'
    // Gamified Activities
    | 'achievement-unlock'
    | 'leaderboard-challenge'
    | 'streak-tracker'
    | 'badge-collection'
    // Practical Activities
    | 'worksheet'
    | 'checklist-exercise'
    | 'resource-download';
  data: any;
  points?: number;
  agnesTip?: string;
}

interface AgnesContentSection {
  id: string;
  title: string;
  icon?: string;
  content?: string;
  points?: string[];
  type?: 'video' | 'audio' | 'interactive';
  description?: string;
  duration?: string;
  transcript?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  type?: 'multiple-choice' | 'true-false' | 'short-answer' | 'matching';
  options?: string[];
  correctAnswer: string | string[] | number;
  explanation: string;
  points?: number;
}

interface DocumentResource {
  id: string;
  title: string;
  type?: 'pdf' | 'image' | 'document' | 'template';
  description: string;
  content?: string;
  pages?: number;
  topics?: string[];
  size?: string;
  downloadUrl?: string;
}

interface MatchingGame {
  id?: string;
  title: string;
  description?: string;
  instructions?: string;
  pairs: MatchingPair[];
  timeLimit?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface MatchingPair {
  id: string;
  left: {
    text: string;
    image?: string;
    type: 'text' | 'image' | 'both';
  };
  right: {
    text: string;
    image?: string;
    type: 'text' | 'image' | 'both';
  };
}

interface PersonBio {
  id?: string;
  name: string;
  title: string;
  photoUrl?: string;
  bio: string;
  links?: Array<{ label: string; url: string }>;
}

interface InteractiveModuleSystemProps {
  moduleId: number;
  onClose: () => void;
  onComplete: (results: any) => void;
}

type TabType =
  | 'overview'
  | 'sections'
  | 'interactive'
  | 'quiz'
  | 'resources'
  | 'progress';

const InteractiveModuleSystem: React.FC<InteractiveModuleSystemProps> = ({
  moduleId,
  onClose,
  onComplete,
}) => {
  // Core state
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [moduleContent, setModuleContent] = useState<ModuleContent | null>(
    null
  );
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set()
  );

  // Section viewing state
  const [viewingSection, setViewingSection] = useState<ModuleSection | null>(
    null
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Interactive state
  const [showRoleplay, setShowRoleplay] = useState(false);
  const [showAgnesHelper, setShowAgnesHelper] = useState(false);
  const [selectedAgnesContent, setSelectedAgnesContent] =
    useState<AgnesContentSection | null>(null);
  const [viewingActivity, setViewingActivity] =
    useState<LearningActivity | null>(null);
  const [currentActivitySection, setCurrentActivitySection] =
    useState<InteractiveLearningSection | null>(null);
  // Leadership Bios modal state
  const [showBioModal, setShowBioModal] = useState(false);
  const [selectedBio, setSelectedBio] = useState<PersonBio | null>(null);

  // Type checking functions for different activity categories
  const isSupportedLearningActivity = (a: Activity): boolean =>
    a.type === 'drag-drop' ||
    a.type === 'drag-drop-sequence' ||
    a.type === 'multiple-choice' ||
    a.type === 'multiple-choice-scenarios' ||
    a.type === 'fill-blank' ||
    a.type === 'scenario-tree' ||
    a.type === 'scenario-response' ||
    a.type === 'calculation' ||
    a.type === 'roleplay' ||
    a.type === 'image-quiz' ||
    a.type === 'branching-scenario' ||
    a.type === 'timed-challenge' ||
    a.type === 'calculator' ||
    a.type === 'simulation' ||
    a.type === 'matching';

  const isKnowledgeActivity = (a: Activity): boolean =>
    a.type === 'flashcards' ||
    a.type === 'quick-quiz' ||
    a.type === 'concept-matching' ||
    a.type === 'true-false-challenge' ||
    a.type === 'memory-game';

  const isSkillBuildingActivity = (a: Activity): boolean =>
    a.type === 'estimation-calculator' ||
    a.type === 'damage-assessment' ||
    a.type === 'photo-analysis' ||
    a.type === 'price-quote-exercise' ||
    a.type === 'workflow-simulator';

  const isGamifiedOrPracticalActivity = (a: Activity): boolean =>
    a.type === 'achievement-unlock' ||
    a.type === 'leaderboard-challenge' ||
    a.type === 'streak-tracker' ||
    a.type === 'badge-collection' ||
    a.type === 'worksheet' ||
    a.type === 'checklist-exercise' ||
    a.type === 'resource-download';

  // Enrich image-quiz questions from curated manifest when tagged
  const enrichImageQuiz = (a: Activity): LearningActivity => {
    if (a.type !== 'image-quiz') return a as unknown as LearningActivity;
    const photos: Array<{ imageUrl: string; tag?: string; notes?: string }> =
      (photoManifest as any)?.photos || [];
    const photoByUrl: Record<string, { tag?: string; notes?: string }> = {};
    photos.forEach(
      p =>
        (photoByUrl[p.imageUrl] = {
          tag: (p as any).tag,
          notes: (p as any).notes,
        })
    );

    const copy = JSON.parse(JSON.stringify(a));
    copy.data.images = copy.data.images.map((img: any) => {
      const meta = photoByUrl[img.imageUrl];
      if (!meta || !meta.tag || meta.tag === 'unknown') {
        // Leave as-is (module JSON already uses safe documentation-step questions)
        return img;
      }
      if (meta.tag === 'hail') {
        return {
          ...img,
          question: 'What type of damage is shown?',
          options: ['Hail impact', 'Wind damage', 'Wear and tear', 'No damage'],
          correctAnswer: 'Hail impact',
          explanation:
            'Circular divots with granule loss and consistent pattern indicate hail.',
        };
      }
      if (meta.tag === 'wind') {
        return {
          ...img,
          question: 'What type of damage is shown?',
          options: ['Wind damage', 'Hail impact', 'Wear and tear', 'No damage'],
          correctAnswer: 'Wind damage',
          explanation:
            'Lifted or creased tabs and missing shingles indicate wind uplift.',
        };
      }
      if (meta.tag === 'no-damage') {
        return {
          ...img,
          question: 'Does this qualify for storm-related coverage?',
          options: ['No', 'Yes', 'Needs re-inspection', 'Cosmetic only'],
          correctAnswer: 'No',
          explanation:
            'No qualifying storm-related damage visible in this photo.',
        };
      }
      if (meta.tag === 'collateral') {
        return {
          ...img,
          question: 'What collateral documentation should you capture?',
          options: [
            'Gutter dents and downspout damage',
            'Skip collateral',
            'Only take roof photos',
            'Call adjuster first',
          ],
          correctAnswer: 'Gutter dents and downspout damage',
          explanation:
            'Collateral evidence strengthens the claim and supports roof damage findings.',
        };
      }
      return img;
    });
    return copy;
  };

  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: any;
  }>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  // Quiz retake support
  const [retakeMode, setRetakeMode] = useState<'all' | 'missed'>('all');
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<QuizQuestion[]>([]);
  const [lastIncorrectQuestionIds, setLastIncorrectQuestionIds] = useState<string[]>([]);

  // Enhanced Module 10: Advanced Sales Cycle Management & Analytics
  const createAdvancedSalesCycleManagementModule = (): ModuleContent => ({
    overview:
      'Master advanced sales cycle management and analytics as the capstone of your RoofER training. This comprehensive module integrates all previous learning into professional mastery through advanced customer relationship management, data-driven analytics, and complete ACV calculation expertise.',
    learningObjectives: [
      'Master complete multi-touch sales cycles from initial contact to post-sale relationships',
      'Develop advanced customer relationship management strategies for lifetime value optimization',
      'Apply sales analytics and performance optimization using data-driven decision making',
      'Achieve mastery-level ACV calculation skills with insurance claim optimization',
      'Integrate all previous modules into cohesive professional excellence',
      'Plan career advancement strategies and prepare for industry certification',
      'Build referral systems and long-term customer relationships',
      'Implement advanced forecasting and pipeline management techniques',
    ],
    sections: [
      {
        id: 'sales-cycle-mastery',
        title: 'Complete Sales Cycle Mastery & Journey Mapping',
        duration: '90 minutes',
        content: `**Advanced Sales Cycle Management for Roofing Professionals**

The modern roofing sales cycle extends far beyond a single transaction. Master-level professionals understand that sustainable success comes from managing comprehensive customer journeys that can span 30-90 days and create lifetime relationships.

**The Complete 90-Day Sales Cycle Framework:**

**Phase 1: Pre-Contact & Research (Days 1-7)**
- Lead qualification and research
- Property and neighborhood analysis
- Initial contact strategy development
- Multi-channel communication preparation

**Phase 2: Initial Engagement (Days 8-21)**
- First contact and relationship building
- Needs assessment and problem identification
- Educational content delivery
- Trust establishment through expertise demonstration

**Phase 3: Deep Assessment & Solution Design (Days 22-35)**
- Comprehensive roof inspection and analysis
- Insurance claim initiation (if applicable)
- Custom solution development
- Value proposition creation and presentation

**Phase 4: Proposal & Negotiation (Days 36-50)**
- Detailed proposal presentation
- Objection handling and clarification
- Contract negotiation and customization
- Financial arrangement coordination

**Phase 5: Closing & Project Initiation (Days 51-65)**
- Final contract execution
- Project scheduling and coordination
- Material ordering and permits
- Customer communication protocols

**Phase 6: Installation & Quality Assurance (Days 66-80)**
- Project management and oversight
- Quality control and customer updates
- Issue resolution and customer care
- Installation completion and inspection

**Phase 7: Post-Installation & Relationship Building (Days 81-90+)**
- Final walkthrough and customer satisfaction
- Warranty explanation and documentation
- Referral program introduction
- Long-term relationship maintenance

**Multi-Touch Communication Strategy:**

Mastering the complete sales cycle creates predictable revenue, satisfied customers, and sustainable business growth through systematic relationship development.`,
      },
      {
        id: 'advanced-crm',
        title:
          'Advanced Customer Relationship Management & Lifecycle Optimization',
        duration: '75 minutes',
        content: `**Strategic Customer Relationship Management for Long-term Success**

Advanced CRM goes beyond basic contact management to encompass the entire customer lifecycle, from initial awareness through referral generation. Master-level professionals use sophisticated relationship strategies to maximize lifetime value and create sustainable business growth.

**Customer Lifecycle Value Framework:**

Advanced customer relationship management transforms one-time transactions into lifetime partnerships that drive sustainable business growth and market reputation.`,
      },
      {
        id: 'sales-analytics',
        title:
          'Sales Analytics & Performance Optimization with Data-Driven Decision Making',
        duration: '85 minutes',
        content: `**Master-Level Sales Analytics and Performance Optimization**

Professional sales success depends on understanding, measuring, and optimizing key performance indicators. Advanced analytics enable data-driven decision making that dramatically improves results and creates competitive advantages.

**Core Sales Analytics Framework:**

Data-driven sales analytics transform guesswork into strategic advantage, enabling consistent performance improvement and sustainable business growth.`,
      },
      {
        id: 'acv-mastery',
        title:
          'ACV Calculation Mastery & Insurance Claim Optimization Workshop',
        duration: '120 minutes',
        content: `**Complete ACV Calculation Mastery for Insurance Roofing Claims**

Actual Cash Value (ACV) calculations are the foundation of insurance roofing claims and represent the most critical technical skill for maximizing recoverable value. Master-level proficiency in ACV calculations, depreciation schedules, and supplement negotiations directly impacts customer satisfaction and project profitability.

**Advanced ACV Calculation Framework:**

**Core ACV Formula Understanding:**

**Primary ACV Equation:**
ACV = Replacement Cost Value (RCV) - Depreciation

Mastering ACV calculations and insurance claim optimization directly impacts project profitability, customer satisfaction, and professional reputation while providing essential value to homeowners navigating the insurance claim process.`,
      },
      {
        id: 'advanced-integration',
        title: 'Advanced Integration & Professional Mastery Capstone',
        duration: '100 minutes',
        content: `**Professional Mastery Integration and Advanced Case Study Analysis**

This capstone section integrates all previous modules into comprehensive professional mastery through advanced real-world scenarios, complex problem-solving case studies, and strategic career development planning. Master-level professionals demonstrate ability to synthesize knowledge across all disciplines while adapting to complex, dynamic situations.

The professional mastery capstone represents the culmination of comprehensive training, combining technical expertise, relationship management, business acumen, and industry leadership into a complete professional capable of driving industry advancement and community impact.`,
      },
    ],
    interactiveLearning: [
      {
        id: 'complete-sales-cycle-simulation',
        title: 'Complete 90-Day Sales Cycle Simulation',
        type: 'simulation',
        estimatedTime: '45 minutes',
        content:
          'Experience a complete sales cycle from initial lead through post-installation relationship building.',
        activities: [],
      },
    ],
    agnesContent: [
      {
        id: 'sales-cycle-mastery',
        title: 'Sales Cycle Excellence Coaching',
        type: 'interactive',
        icon: '🎯',
        content:
          'Congratulations on reaching the advanced level! I will help you master the complete sales cycle and turn every interaction into a long-term relationship opportunity.',
        points: [
          'Map your customer journey across all 90 days with strategic touchpoints',
          'Optimize conversion rates at each stage through data-driven improvements',
          'Build systematic follow-up sequences that nurture relationships',
          'Create urgency and value throughout the extended sales process',
          'Develop post-sale strategies that generate referrals and repeat business',
        ],
        duration: '20 minutes',
      },
    ],
    quiz: [
      {
        id: 'sales-cycle-optimization',
        question:
          'In a 90-day sales cycle, what is the optimal number of valuable touchpoints to maintain customer engagement without being pushy?',
        type: 'multiple-choice',
        options: [
          '15-20 touchpoints spread evenly across the cycle',
          '25-35 touchpoints concentrated in first 30 days',
          '30-45 touchpoints with varying frequency by phase',
          '10-15 touchpoints only when customer initiates contact',
        ],
        correctAnswer: 2,
        explanation:
          'Optimal touchpoint strategy varies by sales cycle phase: higher frequency during engagement and decision phases, lower frequency during consideration phases. 30-45 total touchpoints allow for strategic timing and value delivery.',
        points: 3,
      },
    ],
    documents: [
      {
        id: 'complete-sales-cycle-guide',
        title: 'Complete 90-Day Sales Cycle Management Guide',
        type: 'pdf',
        description:
          'Comprehensive guide to managing extended sales cycles with strategic touchpoint planning and relationship optimization.',
        pages: 45,
        topics: [
          'Cycle Phase Management',
          'Touchpoint Strategy',
          'Pipeline Velocity',
          'Conversion Optimization',
        ],
        size: '3.2 MB',
      },
    ],
    matchingGame: {
      title: 'Advanced Sales Cycle & Analytics Mastery',
      description:
        'Match advanced sales cycle and analytics concepts with their strategic applications.',
      instructions:
        'Click on concepts from the left column, then click on their strategic applications from the right column.',
      timeLimit: 300,
      difficulty: 'hard',
      pairs: [
        {
          id: 'pipeline-velocity',
          left: { text: 'Pipeline Velocity', type: 'text' },
          right: {
            text: 'Speed of opportunity progression through sales stages to revenue realization',
            type: 'text',
          },
        },
      ],
    },
  });

  // Generic builder for modules without dedicated JSON yet
  const createGenericModule = (
    title: string,
    keyPoints: string[] = []
  ): ModuleContent => ({
    overview: `${title} — interactive training with Agnes, core takeaways, and a short quiz. Content will be expanded with media and activities.`,
    learningObjectives: keyPoints.length
      ? keyPoints
      : [
          'Understand core concepts',
          'Practice with interactive activities',
          'Apply knowledge to real scenarios',
        ],
    sections: [
      {
        id: 'intro',
        title: `${title}: Overview`,
        duration: '15 minutes',
        content:
          `This section introduces ${title}. Review the key ideas, definitions, and why this matters in the Roof‑ER sales process.`,
        keyPoints: keyPoints.slice(0, 3),
      },
      {
        id: 'practice',
        title: `${title}: Practice`,
        duration: '20 minutes',
        content:
          'Work through an applied scenario with Agnes tips. Use activities to reinforce the learning objectives.',
        activities: [
          {
            id: 'mcq-1',
            title: 'Quick Check',
            description: 'Multiple‑choice warm‑up question',
            type: 'multiple-choice',
            data: {
              question: 'Which statement best aligns with this section?',
              options: [
                { id: 'a', text: 'Irrelevant details', isCorrect: false },
                { id: 'b', text: 'Key principle summarized', isCorrect: true },
                { id: 'c', text: 'Off-topic item', isCorrect: false },
              ],
            },
            points: 5,
            agnesTip: 'Focus on the core principle and how you would apply it on the job.',
          },
        ],
      },
    ],
    interactiveLearning: [
      {
        id: 'coaching',
        title: 'Agnes Coaching',
        type: 'interactive-exercise',
        estimatedTime: '10 minutes',
        content:
          'Ask Agnes follow‑ups about this topic. Try a scenario and reflect on how you would respond.',
      },
    ],
    agnesContent: [
      {
        id: 'coach',
        title: 'Agnes Tips',
        type: 'interactive',
        icon: '💡',
        points: [
          'Keep it simple and customer‑first',
          'Tie actions to value and next steps',
          'Use clear, confident language',
        ],
        duration: '5 minutes',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: `What is a key success factor in ${title}?`,
        type: 'multiple-choice',
        options: ['Clarity', 'Avoidance', 'Guesswork', 'Overpromising'],
        correctAnswer: 'Clarity',
        explanation: 'Clear, concise communication and process are essential.',
      },
      {
        id: 'q2',
        question: 'After this module, what should you do next?',
        type: 'multiple-choice',
        options: [
          'Skip practice',
          'Apply one learning in the field',
          'Ignore feedback',
          'Avoid reflection',
        ],
        correctAnswer: 'Apply one learning in the field',
        explanation: 'Practice and application drive retention and results.',
      },
    ],
    documents: [],
  });

  // Load module content based on moduleId (ordered to client spec)
  const loadModuleContent = (id: number) => {
    const moduleConfigs: { [key: number]: ModuleContent } = {
      1: (module1Welcome as unknown) as ModuleContent,
      2: (module2Commitment as unknown) as ModuleContent,
      3: module3RoofingContent as ModuleContent,
      4: (module4ShinglesMaterials as unknown) as ModuleContent, // Shingle Types & Materials
      5: (module5InitialPitch as unknown) as ModuleContent,
      6: (module6InitialPitchObjections as unknown) as ModuleContent,
      7: module4InspectionSafetyContent as ModuleContent,
      8: module5PostInspectionPresentation as ModuleContent,
      9: module9PostInspectionObjections as ModuleContent,
      10: module10DamageIDNew as ModuleContent,
      11: module11FilingClaimClosing as ModuleContent,
      12: module12ClosingObjections as ModuleContent,
      13: module13Discontinued as ModuleContent,
      14: module14SalesCycleJobFlow as ModuleContent,
      15: module15Roleplay as ModuleContent,
      16: module16FinalExam as ModuleContent,
    };

    const content = moduleConfigs[id];
    if (content) setModuleContent(content);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadModuleContent(moduleId);
  }, [moduleId]);

  // Calculate progress
  const calculateProgress = () => {
    if (!moduleContent) return 0;
    const totalSections = moduleContent.sections.length;
    const completed = completedSections.size;
    return Math.round((completed / totalSections) * 100);
  };

  // Auto-augment sparse sections with slide-powered activities
  const augmentSparseSections = (input: ModuleContent): ModuleContent => {
    const cloned: ModuleContent = JSON.parse(JSON.stringify(input));
    const topics: Array<{ key: string; aliases?: string[]; images?: string[] }> =
      (topicPhotos as any)?.topics || [];
    const slides: Record<string, string[]> = (slideImages as any)?.slides || {};

    const pickTopicImages = (topicKey: string, count = 2) => {
      const t = topics.find(t => t.key === topicKey);
      if (!t || !t.images || t.images.length === 0) return [];
      return t.images.slice(0, count);
    };

    const pickAnySlideImages = (count = 2) => {
      const all: string[] = Object.values(slides).flat();
      if (all.length === 0) return [];
      // pick first N unique (deterministic)
      return all.slice(0, count);
    };

    const inferTopicForSection = (section: ModuleSection): string | null => {
      const text = `${section.title} ${section.content}`.toLowerCase();
      const tryKey = (key: string) => key;
      const match = (k: string) => text.includes(k);
      if (match('field portal') || match('sales app') || match('ipad')) return tryKey('field portal app');
      if (match('discontinued shingle') || match('discontinued')) return tryKey('discontinued shingles');
      if (match('claim') || match('claims portal') || match('insurance app')) return tryKey('claims filing portal');
      if (match('commission') || match('earnings')) return tryKey('commission structure');
      if (match('photo sequence') || match('photo report') || match('photo order')) return tryKey('photo sequence');
      if (match('adjuster')) return tryKey('adjuster meeting');
      return null;
    };

    const buildPhotoAnalysis = (sectionId: string, idx: number, images: string[]): Activity => ({
      id: `${sectionId}-photo-analysis-${idx + 1}`,
      title: 'Photo Analysis Challenge',
      description: 'Identify what these images indicate and choose the best next action.',
      type: 'photo-analysis',
      points: 10,
      data: {
        images: images.slice(0, 2).map((img, i) => ({
          id: `${sectionId}-img-${idx}-${i}`,
          imageUrl: img,
          description: 'Training slide reference',
          questions: [
            {
              question: 'What does this indicate?',
              correctAnswer: 'Proceed with documentation',
              options: ['Proceed with documentation', 'No action needed', 'Cancel inspection'],
            },
          ],
        })),
      },
    }) as Activity;

    const buildWorkflowSimulator = (section: ModuleSection): Activity => ({
      id: `${section.id}-workflow-sim`,
      title: 'Workflow Simulator',
      description: 'Practice the correct sequence of actions based on this section.',
      type: 'workflow-simulator',
      points: 15,
      data: {
        scenario: `Apply the concepts from "${section.title}" in the correct order.`,
        timeLimit: 240,
        workflowSteps: [
          { id: 'prep', step: 'Prepare resources', correctOrder: 1, duration: '30s', tips: ['Review section checklist'] },
          { id: 'execute', step: 'Execute core step', correctOrder: 2, duration: '1-2m', tips: ['Follow best practices outlined'] },
          { id: 'document', step: 'Document & upload', correctOrder: 3, duration: '1m', tips: ['Ensure accuracy before upload'] },
        ],
        scenarioDetails: section.content?.slice(0, 200) || '',
      },
    }) as Activity;

    cloned.sections = cloned.sections.map((section) => {
      const activities = section.activities ? [...section.activities] : [];
      const currentCount = activities.length;
      const minTarget = 3;
      if (currentCount >= minTarget) return { ...section, activities };

      // Always add one workflow simulator first
      activities.push(buildWorkflowSimulator(section));

      // Add 1–2 photo-analysis based on topic images or fallback to any slides
      const topicKey = inferTopicForSection(section);
      let images = topicKey ? pickTopicImages(topicKey, 2) : pickAnySlideImages(2);
      if (images.length === 0) images = pickAnySlideImages(2);
      activities.push(buildPhotoAnalysis(section.id, 0, images));

      if (activities.length < minTarget) {
        // Add one more photo-analysis if still below target
        let more = topicKey ? pickTopicImages(topicKey, 2) : pickAnySlideImages(2);
        if (more.length === 0) more = pickAnySlideImages(2);
        activities.push(buildPhotoAnalysis(section.id, 1, more));
      }

      return { ...section, activities };
    });

    return cloned;
  };

  // Section navigation
  const openSection = (section: ModuleSection, index: number) => {
    setViewingSection(section);
    setCurrentSectionIndex(index);
  };

  const closeSection = () => {
    setViewingSection(null);
  };

  const goToNextSection = () => {
    if (
      moduleContent &&
      currentSectionIndex < moduleContent.sections.length - 1
    ) {
      const nextIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(nextIndex);
      setViewingSection(moduleContent.sections[nextIndex]);
    }
  };

  const goToPreviousSection = () => {
    if (moduleContent && currentSectionIndex > 0) {
      const prevIndex = currentSectionIndex - 1;
      setCurrentSectionIndex(prevIndex);
      setViewingSection(moduleContent.sections[prevIndex]);
    }
  };

  const markSectionComplete = (sectionId: string) => {
    setCompletedSections(prev => {
      const newSet = new Set(prev);
      newSet.add(sectionId);
      return newSet;
    });
  };

  // Quiz functions
  const startQuiz = (mode: 'all' | 'missed' = 'all') => {
    if (!moduleContent) return;
    const nextQuestions =
      mode === 'missed' && lastIncorrectQuestionIds.length > 0
        ? moduleContent.quiz.filter(q => lastIncorrectQuestionIds.includes(q.id))
        : moduleContent.quiz;
    setRetakeMode(mode);
    setCurrentQuizQuestions(nextQuestions);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowQuizResults(false);
  };

  const handleAnswerSelect = (questionId: string, answer: any) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const submitQuiz = () => {
    // Use the currently active question set
    const questions = currentQuizQuestions.length > 0 && quizStarted ? currentQuizQuestions : moduleContent?.quiz || [];
    if (!questions.length) return;

    let score = 0;
    let totalPoints = 0;
    const incorrectIds: string[] = [];

    questions.forEach(question => {
      totalPoints += question.points || 1;
      const userAnswer = selectedAnswers[question.id];
      const correct = question.correctAnswer as any;

      let isCorrect = false;
      if (question.type === 'multiple-choice' || question.type === 'true-false') {
        if (typeof correct === 'number') {
          isCorrect = userAnswer === correct;
        } else if (typeof correct === 'string') {
          const chosen = question.options?.[userAnswer]?.toString().trim().toLowerCase();
          isCorrect = chosen === correct.toString().trim().toLowerCase();
        } else if (Array.isArray(correct)) {
          const chosen = question.options?.[userAnswer];
          isCorrect = correct.map((c: any) => c.toString().trim().toLowerCase()).includes(
            chosen?.toString().trim().toLowerCase()
          );
        }
      } else if (question.type === 'short-answer') {
        const ans = (userAnswer || '').toString().trim().toLowerCase();
        if (typeof correct === 'string') {
          isCorrect = ans === correct.toString().trim().toLowerCase();
        } else if (Array.isArray(correct)) {
          const kws = correct.map((c: any) => c.toString().trim().toLowerCase());
          const hits = kws.filter((k: string) => ans.includes(k)).length;
          isCorrect = hits >= Math.ceil(kws.length * 0.6);
        }
      }

      if (isCorrect) {
        score += question.points || 1;
      } else {
        incorrectIds.push(question.id);
      }
    });

    const percentage = Math.round((score / totalPoints) * 100);
    setQuizScore(percentage);
    setLastIncorrectQuestionIds(incorrectIds);
    setShowQuizResults(true);
  };

  // Render markdown-like content with embedded activities
  const renderMarkdownContent = (
    content: string,
    sectionActivities?: Activity[]
  ) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    const placedActivityIds = new Set<string>();
    // Curated photo pool for inline images
    const photos: Array<{ imageUrl: string; tag?: string; notes?: string }> =
      (photoManifest as any)?.photos || [];
    const pickPhotoByTag = (tag?: string) => {
      if (!tag) return null;
      const pool = photos.filter(p => (p as any).tag === tag);
      return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    };
    // Topic-driven external/reference photos (e.g., Field Portal App, Discontinued Shingles)
    const topicDefs: Array<{ key: string; aliases?: string[]; images: string[]; caption?: string }>
      = ((topicPhotos as unknown) as any)?.topics || [];
    const insertedTopicKeys = new Set<string>();

    lines.forEach((line, index) => {
      // Check for activity placeholder: [ACTIVITY:activity-id]
      const activityMatch = line.match(/\[ACTIVITY:([^\]]+)\]/);
      if (activityMatch && sectionActivities) {
        const activityId = activityMatch[1];
        const activity = sectionActivities.find(a => a.id === activityId);

        if (activity) {
          placedActivityIds.add(activity.id);
          // Render inline activity card
          elements.push(
            <div
              key={`activity-${index}`}
              className="my-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-300 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl">
                  {activity.type === 'drag-drop' && '🎯'}
                  {activity.type === 'multiple-choice' && '✅'}
                  {activity.type === 'fill-blank' && '📝'}
                  {activity.type === 'scenario-tree' && '🌳'}
                  {activity.type === 'calculation' && '🧮'}
                  {activity.type === 'calculator' && '🧮'}
                  {activity.type === 'simulation' && '🎬'}
                  {activity.type === 'image-quiz' && '🖼️'}
                  {activity.type === 'timed-challenge' && '⏱️'}
                  {activity.type === 'branching-scenario' && '🌿'}
                  {![
                    'drag-drop',
                    'multiple-choice',
                    'fill-blank',
                    'scenario-tree',
                    'calculation',
                    'calculator',
                    'simulation',
                    'image-quiz',
                    'timed-challenge',
                    'branching-scenario',
                    'roleplay',
                  ].includes(activity.type) && '🎮'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-roofRed text-white text-xs font-bold px-2 py-1 rounded uppercase">
                      Interactive Activity
                    </span>
                    <span className="text-xs text-gray-600 capitalize">
                      {activity.type.replace('-', ' ')}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {activity.title}
                  </h4>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {activity.description}
              </p>
              <button
                onClick={() => {
                  if (isSupportedLearningActivity(activity)) {
                    const prepared =
                      activity.type === 'image-quiz'
                        ? enrichImageQuiz(activity)
                        : (activity as unknown as LearningActivity);
                    setViewingActivity(prepared);
                    setCurrentActivitySection({
                      id: viewingSection?.id || '',
                      title: viewingSection?.title || '',
                      content: '',
                      activities: sectionActivities,
                    });
                  } else if (isKnowledgeActivity(activity) || isSkillBuildingActivity(activity) || isGamifiedOrPracticalActivity(activity)) {
                    setViewingActivity(activity as unknown as LearningActivity);
                    setCurrentActivitySection({
                      id: viewingSection?.id || '',
                      title: viewingSection?.title || '',
                      content: '',
                      activities: sectionActivities,
                    });
                  } else {
                    // Fall back to generic viewer instead of alert
                    setViewingActivity(activity as unknown as LearningActivity);
                    setCurrentActivitySection({
                      id: viewingSection?.id || '',
                      title: viewingSection?.title || '',
                      content: '',
                      activities: sectionActivities,
                    });
                  }
                }}
                className="w-full bg-roofRed hover:bg-roofRed-dark text-white px-6 py-3 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <PlayCircle className="w-5 h-5" />
                Start Activity
              </button>
            </div>
          );
          return;
        }
      }

      // Photo placeholder: [PHOTO:tag=hail] | [PHOTO:random] | [PHOTO:/assets/...]
      const photoMatch = line.match(/\[PHOTO:([^\]]+)\]/);
      if (photoMatch) {
        const spec = photoMatch[1].trim();
        let photo: any = null;
        if (spec.startsWith('tag=')) {
          const tag = spec.split('=')[1];
          photo = pickPhotoByTag(tag);
        } else if (spec === 'random') {
          photo = photos[Math.floor(Math.random() * photos.length)];
        } else if (spec.startsWith('/assets')) {
          photo = { imageUrl: spec };
        }

        if (photo && photo.imageUrl) {
          elements.push(
            <div
              key={`photo-${index}`}
              className="my-6 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
            >
              <img
                src={photo.imageUrl}
                alt={photo?.notes || 'Training photo'}
                className="w-full h-auto object-cover"
              />
              {(photo?.notes || photo?.tag) && (
                <div className="px-4 py-3 text-sm text-gray-700 bg-gray-50 border-t border-gray-200">
                  {photo?.tag && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-wide text-purple-700 bg-purple-100 rounded px-2 py-0.5 mr-2">
                      {photo.tag}
                    </span>
                  )}
                  <span className="align-middle">{photo?.notes}</span>
                </div>
              )}
            </div>
          );
          return;
        }
      }

      // Topic-driven photo injection based on content keywords
      const maybeInsertTopicPhotos = () => {
        const lower = (line || '').toLowerCase();
        for (const t of topicDefs) {
          const keys = [t.key, ...(t.aliases || [])].map(k => k.toLowerCase());
          if (!insertedTopicKeys.has(t.key) && keys.some(k => lower.includes(k))) {
            elements.push(
              <div
                key={`topic-photo-${t.key}-${index}`}
                className="my-6 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
                  {t.images.slice(0, 2).map((src, i) => (
                    <img
                      key={`${t.key}-${i}`}
                      src={src}
                      alt={t.caption || t.key}
                      className="w-full h-auto object-contain bg-white"
                    />
                  ))}
                </div>
                {t.caption && (
                  <div className="px-4 py-3 text-sm text-gray-700 bg-gray-50 border-t border-gray-200">
                    {t.caption}
                  </div>
                )}
              </div>
            );
            insertedTopicKeys.add(t.key);
            break;
          }
        }
      };

      // Leadership bios placeholder: [BIOS]
      if (line.trim() === '[BIOS]') {
        const bios = moduleContent?.leadershipBios || [];
        if (bios.length === 0) {
          elements.push(
            <div key={`bios-empty-${index}`} className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
              Leadership bios coming soon. Add photos to <code className="font-mono">public/assets/images/leadership</code> and populate <code className="font-mono">leadershipBios</code> in the module JSON.
            </div>
          );
          return;
        }

        elements.push(
          <div key={`bios-grid-${index}`} className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bios.map((b, i) => (
              <div key={`bio-${i}`} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={b.photoUrl || '/api/placeholder/240/240'}
                    alt={b.name}
                    className="w-full h-full object-cover"
                    onError={(e: any) => { e.currentTarget.onerror = null; e.currentTarget.src = '/api/placeholder/240/240'; }}
                  />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-gray-900">{b.name}</div>
                  <div className="text-sm text-gray-600 mb-3">{b.title}</div>
                  <button
                    onClick={() => { setSelectedBio(b); setShowBioModal(true); }}
                    className="w-full bg-roofRed hover:bg-roofRed-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    View Bio
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
        return;
      }

      // Brand ID examples placeholder: [BRAND-ID]
      if (line.trim() === '[BRAND-ID]') {
        const brands = [
          {
            key: 'gaf',
            name: 'GAF Timberline HDZ',
            src: '/assets/brand-id/gaf/timberline_hdz.jpg',
            clues: ['Random cut pattern', 'Prominent shadow line', 'Timberline profile'],
          },
          {
            key: 'ct',
            name: 'CertainTeed Landmark',
            src: '/assets/brand-id/ct/landmark.jpg',
            clues: ['Dual-layer laminate', 'Distinct color blend', 'Landmark cut pattern'],
          },
          {
            key: 'oc',
            name: 'Owens Corning Duration',
            src: '/assets/brand-id/oc/duration.jpg',
            clues: ['SureNail strip (if visible)', 'Defined shadowing', 'Duration geometry'],
          },
        ];

        elements.push(
          <div key={`brand-id-${index}`} className="my-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {brands.map(b => (
                <div key={b.key} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="w-full aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={b.src}
                      alt={b.name}
                      className="w-full h-full object-cover"
                      onError={(e: any) => { e.currentTarget.onerror = null; e.currentTarget.src = '/api/placeholder/320/200'; }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="font-semibold text-gray-900 mb-1">{b.name}</div>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      {b.clues.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3">
              Tip: Add real brand images at <code className="font-mono">public/assets/brand-id/&lt;gaf|ct|oc&gt;/</code> to replace placeholders. Suggested filenames: <code className="font-mono">timberline_hdz.jpg</code>, <code className="font-mono">landmark.jpg</code>, <code className="font-mono">duration.jpg</code>.
            </div>
          </div>
        );
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-bold text-gray-800 mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
        maybeInsertTopicPhotos();
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={index}
            className="text-2xl font-bold text-gray-800 mt-8 mb-4"
          >
            {line.replace('## ', '')}
          </h2>
        );
        maybeInsertTopicPhotos();
        return;
      }
      if (line.startsWith('# ')) {
        elements.push(
          <h1
            key={index}
            className="text-3xl font-bold text-gray-900 mt-8 mb-4"
          >
            {line.replace('# ', '')}
          </h1>
        );
        maybeInsertTopicPhotos();
        return;
      }

      // Bold text
      if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={index} className="font-bold text-gray-800 mt-4 mb-2">
            {line.replace(/\*\*/g, '')}
          </p>
        );
        maybeInsertTopicPhotos();
        return;
      }

      // List items
      if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="ml-6 text-gray-700 mb-1">
            {line.replace('- ', '')}
          </li>
        );
        maybeInsertTopicPhotos();
        return;
      }

      // Regular paragraphs
      if (line.trim()) {
        elements.push(
          <p key={index} className="text-gray-700 leading-relaxed mb-3">
            {line}
          </p>
        );
        maybeInsertTopicPhotos();
        return;
      }

      elements.push(<br key={index} />);
    });

    // If there are activities without explicit placeholders, surface them at the end
    if (sectionActivities && placedActivityIds.size < sectionActivities.length) {
      const remaining = sectionActivities.filter(a => !placedActivityIds.has(a.id));
      if (remaining.length > 0) {
        elements.push(
          <div key="more-activities" className="mt-8">
            <h4 className="text-lg font-bold text-gray-900 mb-3">More Practice</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {remaining.map(activity => (
                <div key={activity.id} className="border-2 border-roofRed/30 rounded-xl p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-gray-900">{activity.title}</h5>
                    {activity.points ? (
                      <span className="text-xs bg-roofRed text-white rounded px-2 py-0.5">{activity.points} pts</span>
                    ) : null}
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">{activity.description}</p>
                  <button
                    onClick={() => {
                      if (isSupportedLearningActivity(activity)) {
                        const prepared = activity.type === 'image-quiz' ? enrichImageQuiz(activity) : (activity as unknown as LearningActivity);
                        setViewingActivity(prepared);
                        setCurrentActivitySection({
                          id: viewingSection?.id || '',
                          title: viewingSection?.title || '',
                          content: '',
                          activities: sectionActivities,
                        });
                      } else if (isKnowledgeActivity(activity) || isSkillBuildingActivity(activity) || isGamifiedOrPracticalActivity(activity)) {
                        setViewingActivity(activity as unknown as LearningActivity);
                        setCurrentActivitySection({
                          id: viewingSection?.id || '',
                          title: viewingSection?.title || '',
                          content: '',
                          activities: sectionActivities,
                        });
                      }
                    }}
                    className="w-full bg-roofRed hover:bg-roofRed-dark text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    return elements;
  };

  if (!moduleContent) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading Module {moduleId}...
          </p>
        </div>
      </div>
    );
  }

  // Render section viewer (suppressed when an activity is opened to allow split view)
  if (viewingSection && !viewingActivity) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8 max-h-[90vh] flex flex-col"
        >
          {/* Section Header */}
          <div className="bg-gradient-to-r from-black to-neutral-900 text-white p-6 rounded-t-2xl flex-shrink-0">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Home className="w-5 h-5" />
                  <span className="text-sm text-blue-100">
                    Module {moduleId} / Section {currentSectionIndex + 1} of{' '}
                    {moduleContent.sections.length}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {viewingSection.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-blue-100">
                  <span>Duration: {viewingSection.duration}</span>
                  {completedSections.has(viewingSection.id) && (
                    <span className="flex items-center gap-1 bg-green-500 bg-opacity-30 px-2 py-1 rounded">
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={closeSection}
                className="text-white hover:text-gray-200 transition-colors ml-4"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Section Content */}
          <div className="flex-1 overflow-auto p-8">
            <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-h2:text-gray-900 prose-p:text-gray-800 prose-strong:text-purple-700 prose-li:marker:text-roofRed prose-a:text-roofRed prose-a:underline">
              {renderMarkdownContent(
                viewingSection.content,
                viewingSection.activities
              )}
            </div>

            {/* Key Points */}
            {viewingSection.keyPoints &&
              viewingSection.keyPoints.length > 0 && (
                <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Key Points
                  </h3>
                  <ul className="space-y-2">
                    {viewingSection.keyPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-blue-800"
                      >
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Examples */}
            {viewingSection.examples && viewingSection.examples.length > 0 && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Examples
                </h3>
                <div className="space-y-3">
                  {viewingSection.examples.map((example, idx) => (
                    <div key={idx} className="text-green-800 italic">
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section Footer - Navigation */}
          <div className="bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={goToPreviousSection}
                disabled={currentSectionIndex === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-800 rounded-lg font-semibold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex-1 flex justify-center">
                {!completedSections.has(viewingSection.id) && (
                  <button
                    onClick={() => markSectionComplete(viewingSection.id)}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark as Complete
                  </button>
                )}
              </div>

              <button
                onClick={goToNextSection}
                disabled={
                  currentSectionIndex === moduleContent.sections.length - 1
                }
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress indicator */}
            <div className="mt-4 flex items-center gap-2 justify-center">
              {moduleContent.sections.map((section, idx) => (
                <div
                  key={section.id}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSectionIndex
                      ? 'w-8 bg-blue-600'
                      : completedSections.has(section.id)
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Render Agnes Helper Modal
  if (showAgnesHelper && selectedAgnesContent) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={() => setShowAgnesHelper(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={e => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                {selectedAgnesContent.icon || '👩‍🏫'}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedAgnesContent.title}
                </h3>
                {selectedAgnesContent.duration && (
                  <p className="text-sm text-gray-600">
                    Duration: {selectedAgnesContent.duration}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowAgnesHelper(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {selectedAgnesContent.content && (
            <p className="text-gray-700 leading-relaxed mb-6">
              {selectedAgnesContent.content}
            </p>
          )}

          {selectedAgnesContent.points &&
            selectedAgnesContent.points.length > 0 && (
              <div className="space-y-3">
                {selectedAgnesContent.points.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-roofRed flex-shrink-0 mt-0.5" />
                    <span className="text-gray-800">{point}</span>
                  </div>
                ))}
              </div>
            )}

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setShowAgnesHelper(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowAgnesHelper(false);
                setShowRoleplay(true);
              }}
              className="flex-1 bg-roofRed hover:bg-roofRed-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Practice Roleplay
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Render Roleplay System
  if (showRoleplay) {
    return (
      <AgnesRoleplaySystem
        moduleId={moduleId}
        onComplete={results => {
          setShowRoleplay(false);
          console.log('Roleplay completed:', results);
        }}
        onClose={() => setShowRoleplay(false)}
      />
    );
  }

  // Render Interactive Activity in Split Screen (or full-screen modal if no lesson section)
  if (viewingActivity && currentActivitySection) {
    // Check if we have lesson content to display alongside the activity
    const lessonSection: ModuleSection | null = viewingSection;
    const hasLessonContent = lessonSection !== null;

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-[60] flex">
        {/* LEFT PANEL - Lesson Content (40%) - Only shown if viewing a lesson section */}
        {(() => {
          if (!lessonSection) return null;

          const section: ModuleSection = lessonSection;
          return (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-2/5 border-r-4 border-blue-600 bg-white overflow-auto shadow-2xl"
            >
              {/* Lesson Header */}
              <div className="bg-gradient-to-r from-black to-neutral-900 text-white p-4 sticky top-0 z-10">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs text-blue-100">Lesson Reference</span>
                </div>
                <h3 className="text-lg font-bold">{section.title}</h3>
              </div>

              {/* Lesson Content */}
              <div className="p-6">
                <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-h2:text-gray-900 prose-p:text-gray-700 prose-strong:text-purple-700">
                  {renderMarkdownContent(section.content, [])}
                </div>

                {/* Key Points */}
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Key Points
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {section.keyPoints.map((point: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-blue-800">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}

        {/* RIGHT PANEL - Activity (60% with lesson, 100% without) */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`${hasLessonContent ? 'w-3/5' : 'w-full'} flex flex-col bg-white`}
        >
          {/* Activity Header */}
          <div className="bg-gradient-to-r from-black to-neutral-900 text-white p-6 flex-shrink-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <PlayCircle className="w-5 h-5" />
                  <span className="text-sm text-gray-300">
                    {currentActivitySection.title}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {viewingActivity.title}
                </h2>
                <p className="text-gray-300 text-sm">
                  {viewingActivity.description}
                </p>
              </div>
              <button
                onClick={() => {
                  setViewingActivity(null);
                  setCurrentActivitySection(null);
                }}
                className="text-white hover:text-gray-200 transition-colors ml-4"
                aria-label="Close activity"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Activity Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Render appropriate component based on activity type */}
            {viewingActivity && isSupportedLearningActivity(viewingActivity as Activity) && (
              <InteractiveLearningActivity
                activity={viewingActivity}
                onComplete={(score: number) => {
                  console.log('Activity completed with score:', score);
                }}
              />
            )}
            {viewingActivity && isKnowledgeActivity(viewingActivity as Activity) && (
              <AgnesKnowledgeActivities
                activity={viewingActivity as unknown as KnowledgeActivity}
                onComplete={(score: number, totalPoints: number) => {
                  console.log(`Activity completed: ${score}/${totalPoints}`);
                }}
              />
            )}
            {viewingActivity && isSkillBuildingActivity(viewingActivity as Activity) && (
              <AgnesSkillBuilders
                activity={viewingActivity as unknown as SkillBuildingActivity}
                onComplete={(score: number, totalPoints: number) => {
                  console.log(`Activity completed: ${score}/${totalPoints}`);
                }}
              />
            )}
            {viewingActivity && isGamifiedOrPracticalActivity(viewingActivity as Activity) && (
              <AgnesGamifiedAndPractical
                activity={viewingActivity as unknown as GamifiedOrPracticalActivity}
                onComplete={(score: number, totalPoints: number) => {
                  console.log(`Activity completed: ${score}/${totalPoints}`);
                }}
              />
            )}
            {viewingActivity &&
              !(
                isSupportedLearningActivity(viewingActivity as Activity) ||
                isKnowledgeActivity(viewingActivity as Activity) ||
                isSkillBuildingActivity(viewingActivity as Activity) ||
                isGamifiedOrPracticalActivity(viewingActivity as Activity)
              ) && (
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {viewingActivity.title || 'Interactive Activity'}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {viewingActivity.description || 'Review this scenario and mark complete when finished.'}
                  </p>
                  {/* Show scenario/instruction text when present */}
                  {((viewingActivity as any).data?.scenario || (viewingActivity as any).data?.instruction) && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                      <div className="text-sm text-gray-800 whitespace-pre-wrap">
                        {((viewingActivity as any).data?.scenario || (viewingActivity as any).data?.instruction) as string}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      console.log('Generic activity completed');
                      setViewingActivity(null);
                      setCurrentActivitySection(null);
                    }}
                    className="px-6 py-3 bg-roofRed text-white rounded-lg font-semibold hover:bg-roofRed-dark"
                  >
                    Mark Complete
                  </button>
                </div>
              )}
          </div>

          {/* Activity Footer */}
          <div className="bg-gray-50 p-4 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={() => {
                setViewingActivity(null);
                setCurrentActivitySection(null);
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Close Activity
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-40 overflow-auto">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Module {moduleId}
                </h1>
                <p className="text-sm text-gray-600">
                  {moduleContent.sections[0]?.title.split(' - ')[0] ||
                    'Training Module'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 px-4 py-2 rounded-full">
                <span className="text-blue-800 font-semibold">
                  {progress}% Complete
                </span>
              </div>
              <button
                onClick={() => setShowRoleplay(true)}
                className="bg-roofRed hover:bg-roofRed-dark text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Practice with Agnes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: Home },
              { id: 'sections', label: 'Sections', icon: Layers },
              { id: 'interactive', label: 'Interactive', icon: PlayCircle },
              { id: 'quiz', label: 'Quiz', icon: ClipboardCheck },
              { id: 'resources', label: 'Resources', icon: FileText },
              { id: 'progress', label: 'Progress', icon: Award },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors border-b-2 ${
                    currentTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Overview Tab */}
            {currentTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                    Module Overview
                  </h2>
                  <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-h2:text-gray-900 prose-p:text-gray-800 prose-strong:text-purple-700 prose-li:marker:text-roofRed prose-a:text-roofRed prose-a:underline mb-6">
                    {renderMarkdownContent(moduleContent.overview)}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Target className="w-6 h-6 text-blue-600" />
                      Learning Objectives
                    </h3>
                    <ul className="space-y-3">
                      {moduleContent.learningObjectives.map(
                        (objective, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-gray-800 flex-1">
                              {objective}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    onClick={() => setCurrentTab('sections')}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left group"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                      <Layers className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Start Learning
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Begin with {moduleContent.sections.length} comprehensive
                      sections
                    </p>
                  </button>

                  <button
                    onClick={() => setShowRoleplay(true)}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left group"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-roofRed transition-colors">
                      <MessageCircle className="w-6 h-6 text-roofRed group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Practice Roleplay
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Interactive practice with Agnes AI coach
                    </p>
                  </button>

                  <button
                    onClick={() => setCurrentTab('quiz')}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left group"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                      <ClipboardCheck className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      Take Quiz
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Test your knowledge with {moduleContent.quiz.length}{' '}
                      questions
                    </p>
                  </button>
                </div>
              </div>
            )}

            {/* Sections Tab */}
            {currentTab === 'sections' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Layers className="w-7 h-7 text-blue-600" />
                    Module Sections
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {moduleContent.sections.map((section, index) => (
                      <div
                        key={section.id}
                        className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            {completedSections.has(section.id) && (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            )}
                          </div>
                          <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                            {section.duration}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                          {section.content.substring(0, 150)}...
                        </p>
                        <button
                          onClick={() => openSection(section, index)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                          <Book className="w-4 h-4" />
                          {completedSections.has(section.id)
                            ? 'Review Section'
                            : 'Start Section'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Tab */}
            {currentTab === 'interactive' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <PlayCircle className="w-7 h-7 text-roofRed" />
                    Interactive Learning
                  </h2>

                  {/* Agnes Content */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Agnes AI Coaching
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {moduleContent.agnesContent.map(content => (
                        <div
                          key={content.id}
                          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-roofRed/30"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="text-3xl">
                              {content.icon || '👩‍🏫'}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold text-gray-800 mb-1">
                                {content.title}
                              </h4>
                              {content.duration && (
                                <p className="text-xs text-gray-600">
                                  {content.duration}
                                </p>
                              )}
                            </div>
                          </div>
                          {content.content && (
                            <p className="text-sm text-gray-700 mb-3">
                              {content.content.substring(0, 120)}...
                            </p>
                          )}
                          <button
                            onClick={() => {
                              setSelectedAgnesContent(content);
                              setShowAgnesHelper(true);
                            }}
                            className="w-full bg-roofRed hover:bg-roofRed-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                          >
                            View Coaching
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Learning Activities */}
                  {moduleContent.interactiveLearning.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Interactive Learning Games
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Test your knowledge with engaging, hands-on activities
                        that reinforce key concepts.
                      </p>
                      <div className="space-y-8">
                        {moduleContent.interactiveLearning.map(section => (
                          <div
                            key={section.id}
                            className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-200"
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-roofRed rounded-xl flex items-center justify-center flex-shrink-0">
                                <PlayCircle className="w-7 h-7 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                  {section.title}
                                </h4>
                                {section.estimatedTime && (
                                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                                    <span className="font-semibold">
                                      ⏱️ {section.estimatedTime}
                                    </span>
                                  </p>
                                )}
                                <p className="text-gray-700 leading-relaxed">
                                  {section.content}
                                </p>
                              </div>
                            </div>

                            {section.activities &&
                              section.activities.length > 0 && (
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {section.activities.map(activity => (
                                    <button
                                      key={activity.id}
                                      onClick={() => {
                                        if (
                                          isSupportedLearningActivity(activity)
                                        ) {
                                          const prepared =
                                            activity.type === 'image-quiz'
                                              ? enrichImageQuiz(activity)
                                              : (activity as unknown as LearningActivity);
                                          setViewingActivity(prepared);
                                          setCurrentActivitySection(section);
                                        } else {
                                          alert(
                                            'This activity type is not yet supported.'
                                          );
                                        }
                                      }}
                                      className="bg-white hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-500 border-2 border-cyan-300 hover:border-transparent rounded-xl p-4 text-left transition-all group"
                                    >
                                      <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                          <span className="text-white font-bold">
                                            {activity.type === 'drag-drop' &&
                                              '🎯'}
                                            {activity.type ===
                                              'multiple-choice' && '✅'}
                                            {activity.type === 'fill-blank' &&
                                              '📝'}
                                            {activity.type ===
                                              'scenario-tree' && '🌳'}
                                            {activity.type === 'calculation' &&
                                              '🧮'}
                                            {activity.type === 'calculator' &&
                                              '🧮'}
                                            {activity.type === 'simulation' &&
                                              '🎬'}
                                            {activity.type === 'image-quiz' &&
                                              '🖼️'}
                                            {activity.type ===
                                              'timed-challenge' && '⏱️'}
                                            {activity.type ===
                                              'branching-scenario' && '🌿'}
                                            {![
                                              'drag-drop',
                                              'multiple-choice',
                                              'fill-blank',
                                              'scenario-tree',
                                              'calculation',
                                              'roleplay',
                                            ].includes(activity.type) && '🎮'}
                                          </span>
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="font-bold text-gray-900 group-hover:text-white transition-colors">
                                            {activity.title}
                                          </h5>
                                          <p className="text-xs text-gray-600 group-hover:text-gray-300 capitalize transition-colors">
                                            {activity.type.replace('-', ' ')}{' '}
                                            activity
                                          </p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors" />
                                      </div>
                                      <p className="text-sm text-gray-700 group-hover:text-white line-clamp-2 transition-colors">
                                        {activity.description}
                                      </p>
                                    </button>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Roleplay Button */}
                  <div className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-3">
                      Ready to Practice?
                    </h3>
                    <p className="mb-6">
                      Practice real-world scenarios with Agnes AI and get
                      instant feedback
                    </p>
                    <button
                      onClick={() => setShowRoleplay(true)}
                      className="bg-white text-roofRed hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center gap-3"
                    >
                      <MessageCircle className="w-6 h-6" />
                      Start Roleplay Training
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quiz Tab */}
            {currentTab === 'quiz' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <ClipboardCheck className="w-7 h-7 text-green-600" />
                    Knowledge Assessment
                  </h2>

                  {!quizStarted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ClipboardCheck className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        Ready to Test Your Knowledge?
                      </h3>
                      <p className="text-gray-600 mb-2">
                        This quiz has {moduleContent.quiz.length} questions
                      </p>
                      <p className="text-sm text-gray-500 mb-8">
                        Complete all sections before taking the quiz for best
                        results
                      </p>
                      <button
                        onClick={() => startQuiz('all')}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors inline-flex items-center gap-2"
                      >
                        <PlayCircle className="w-6 h-6" />
                        Start Quiz
                      </button>
                    </div>
                  ) : showQuizResults ? (
                    <div className="text-center py-12">
                      <div
                        className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${
                          quizScore >= 80
                            ? 'bg-green-100'
                            : quizScore >= 60
                              ? 'bg-yellow-100'
                              : 'bg-red-100'
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`text-4xl font-bold ${
                              quizScore >= 80
                                ? 'text-green-600'
                                : quizScore >= 60
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                            }`}
                          >
                            {quizScore}%
                          </div>
                          <div className="text-sm text-gray-600">Score</div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">
                        {quizScore >= 80
                          ? 'Excellent Work!'
                          : quizScore >= 60
                            ? 'Good Effort!'
                            : 'Keep Learning!'}
                      </h3>
                      <p className="text-gray-600 mb-8">
                        {quizScore >= 80
                          ? 'You have mastered this module content!'
                          : quizScore >= 60
                            ? 'Review the sections and try again to improve your score.'
                            : 'Study the material more carefully and retake the quiz.'}
                      </p>
                      <div className="flex gap-4 justify-center flex-wrap">
                        <button
                          onClick={() => {
                            setQuizStarted(false);
                            setShowQuizResults(false);
                          }}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                          Review Material
                        </button>
                        <button
                          onClick={() => startQuiz('missed')}
                          disabled={lastIncorrectQuestionIds.length === 0}
                          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                            lastIncorrectQuestionIds.length === 0
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                          title={lastIncorrectQuestionIds.length === 0 ? 'No missed questions from last attempt' : 'Retake only the questions you missed'}
                        >
                          Retake Missed Only
                        </button>
                        <button
                          onClick={() => startQuiz('all')}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                          Retake Full Quiz
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Question Display */}
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-600">
                            Question {currentQuestionIndex + 1} of{' '}
                            {currentQuizQuestions.length}
                          </span>
                          <span className="text-sm font-semibold text-blue-600">
                            {currentQuizQuestions[currentQuestionIndex].points || 1}{' '}
                            points
                          </span>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                          <p className="text-lg font-semibold text-gray-800">
                            {currentQuizQuestions[currentQuestionIndex].question}
                          </p>
                        </div>

                        {/* Answer Options */}
                        {(currentQuizQuestions[currentQuestionIndex].type === 'multiple-choice' ||
                          currentQuizQuestions[currentQuestionIndex].type === 'true-false') && (
                          <div className="space-y-3">
                            {currentQuizQuestions[currentQuestionIndex].options?.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  handleAnswerSelect(
                                    currentQuizQuestions[currentQuestionIndex].id,
                                    idx
                                  )
                                }
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                  selectedAnswers[
                                    currentQuizQuestions[currentQuestionIndex].id
                                  ] === idx
                                    ? 'border-blue-600 bg-gray-50'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                      selectedAnswers[
                                        currentQuizQuestions[currentQuestionIndex].id
                                      ] === idx
                                        ? 'border-blue-600 bg-blue-600'
                                        : 'border-gray-300'
                                    }`}
                                  >
                                    {selectedAnswers[
                                      currentQuizQuestions[currentQuestionIndex].id
                                    ] === idx && (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    )}
                                  </div>
                                  <span className="text-gray-800">
                                    {option}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {currentQuizQuestions[currentQuestionIndex].type === 'short-answer' && (
                          <div className="space-y-3">
                            <input
                              type="text"
                              className="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 outline-none"
                              placeholder="Type your answer"
                              value={
                                selectedAnswers[
                                  currentQuizQuestions[currentQuestionIndex].id
                                ] || ''
                              }
                              onChange={e =>
                                handleAnswerSelect(
                                  currentQuizQuestions[currentQuestionIndex].id,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        )}
                      </div>

                      {/* Navigation */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() =>
                            setCurrentQuestionIndex(
                              Math.max(0, currentQuestionIndex - 1)
                            )
                          }
                          disabled={currentQuestionIndex === 0}
                          className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-800 rounded-lg font-semibold transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                          Previous
                        </button>

                        {currentQuestionIndex === currentQuizQuestions.length - 1 ? (
                          <button
                            onClick={submitQuiz}
                            disabled={(() => {
                              // Ensure all current questions are answered
                              return !currentQuizQuestions.every(q =>
                                selectedAnswers[q.id] !== undefined && (q.type !== 'short-answer' || (selectedAnswers[q.id] ?? '').toString().trim() !== '')
                              );
                            })()}
                            className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-colors"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Submit Quiz
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setCurrentQuestionIndex(
                                Math.min(currentQuizQuestions.length - 1, currentQuestionIndex + 1)
                              )
                            }
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                          >
                            Next
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      {/* Progress */}
                      <div className="mt-6">
                        <div className="flex items-center gap-1 justify-center">
                          {currentQuizQuestions.map((q, idx) => (
                            <div
                              key={q.id}
                              className={`h-2 rounded-full transition-all ${
                                idx === currentQuestionIndex
                                  ? 'w-8 bg-blue-600'
                                  : selectedAnswers[q.id] !== undefined
                                    ? 'w-2 bg-green-500'
                                    : 'w-2 bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {currentTab === 'resources' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <FileText className="w-7 h-7 text-orange-600" />
                    Learning Resources
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {moduleContent.documents.map(doc => (
                      <div
                        key={doc.id}
                        className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            {doc.type === 'pdf' ? (
                              <FileText className="w-6 h-6 text-orange-600" />
                            ) : doc.type === 'template' ? (
                              <FileText className="w-6 h-6 text-orange-600" />
                            ) : (
                              <Book className="w-6 h-6 text-orange-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-1">
                              {doc.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              {doc.pages && <span>{doc.pages} pages</span>}
                              {doc.size && <span>• {doc.size}</span>}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-4">
                          {doc.description}
                        </p>

                        {doc.topics && doc.topics.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {doc.topics.map((topic, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}

                        {doc.downloadUrl ? (
                          <a
                            href={doc.downloadUrl}
                            download
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        ) : (
                          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Matching Game */}
                  {moduleContent.matchingGame && (
                    <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white">
                      <h3 className="text-2xl font-bold mb-3">
                        {moduleContent.matchingGame.title}
                      </h3>
                      <p className="mb-6">
                        {moduleContent.matchingGame.description}
                      </p>
                      <button className="bg-white text-roofRed hover:bg-gray-100 px-6 py-3 rounded-lg font-bold transition-colors">
                        Play Matching Game
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Progress Tab */}
            {currentTab === 'progress' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <Award className="w-7 h-7 text-yellow-600" />
                    Your Progress
                  </h2>

                  {/* Progress Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {progress}%
                      </div>
                      <div className="text-sm text-gray-700">
                        Overall Progress
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {completedSections.size}/{moduleContent.sections.length}
                      </div>
                      <div className="text-sm text-gray-700">
                        Sections Completed
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                      <div className="text-4xl font-bold text-roofRed mb-2">
                        {quizScore || 0}%
                      </div>
                      <div className="text-sm text-gray-700">Quiz Score</div>
                    </div>
                  </div>

                  {/* Section Progress */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Section Completion
                    </h3>
                    <div className="space-y-3">
                      {moduleContent.sections.map((section, idx) => (
                        <div
                          key={section.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {completedSections.has(section.id) ? (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                              <Circle className="w-6 h-6 text-gray-400" />
                            )}
                            <div>
                              <div className="font-semibold text-gray-800">
                                Section {idx + 1}: {section.title}
                              </div>
                              <div className="text-sm text-gray-600">
                                {section.duration}
                              </div>
                            </div>
                          </div>
                          {!completedSections.has(section.id) && (
                            <button
                              onClick={() => {
                                setCurrentTab('sections');
                                setTimeout(
                                  () => openSection(section, idx),
                                  100
                                );
                              }}
                              className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                              Continue
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complete Module Button */}
                  {progress === 100 && quizScore >= 80 && (
                    <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white text-center">
                      <Award className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-3">
                        Module Complete!
                      </h3>
                      <p className="mb-6">
                        Congratulations! You have completed all sections and
                        passed the quiz.
                      </p>
                      <button
                        onClick={() =>
                          onComplete({
                            moduleId,
                            progress,
                            quizScore,
                            completedSections: Array.from(completedSections),
                            timestamp: new Date().toISOString(),
                          })
                        }
                        className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center gap-3"
                      >
                        <CheckCircle className="w-6 h-6" />
                        Complete Module
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Ask Agnes Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowRoleplay(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-purple-500/50 transition-all z-50"
        title="Ask Agnes"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.button>

      {/* Leadership Bio Modal */}
      <AnimatePresence>
        {showBioModal && selectedBio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4"
            onClick={() => setShowBioModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div>
                  <div className="text-xl font-bold text-gray-900">{selectedBio.name}</div>
                  <div className="text-sm text-gray-600">{selectedBio.title}</div>
                </div>
                <button
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  onClick={() => setShowBioModal(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div className="md:col-span-1 bg-gray-50 p-4">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={selectedBio.photoUrl || '/api/placeholder/240/240'}
                      alt={selectedBio.name}
                      className="w-full h-full object-cover"
                      onError={(e: any) => { e.currentTarget.onerror = null; e.currentTarget.src = '/api/placeholder/240/240'; }}
                    />
                  </div>
                </div>
                <div className="md:col-span-2 p-6">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {selectedBio.bio}
                  </p>
                  {selectedBio.links && selectedBio.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedBio.links.map((l, i) => (
                        <a key={i} href={l.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 px-3 py-1 bg-blue-50 rounded-full text-sm font-medium">
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveModuleSystem;
