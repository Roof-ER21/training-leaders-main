export interface MentorScenario {
  id: string;
  role: 'homeowner' | 'rep' | 'adjuster';
  prompt: string;
  expectedKeyPoints: string[];
  rubric: {
    keywords: string[];
    weights?: { [key: string]: number };
    passThreshold?: number; // 0-100
  };
  followUps: string[];
}

export interface MentorPack {
  trainerTips: string[];
  practiceSequences: { id: string; title: string; steps: string[] }[];
  scenarios: MentorScenario[];
}

const mentorPack: MentorPack = {
  trainerTips: [
    "Always acknowledge the homeowner's concern before redirecting.",
    "Use the homeowner's name at least twice during your response.",
    'Frame insurance as value and peace-of-mind, not cost.',
    'Offer two specific times when scheduling – make it easy to say yes.',
    'Keep responses concise: Acknowledge → Ask → Educate → Next step.',
  ],
  practiceSequences: [
    {
      id: 'seq-beginner-1',
      title: 'Beginner – Initial Pitch Core',
      steps: [
        'Deliver initial pitch with 5 non-negotiables',
        'Handle “Not interested”',
        'Handle “Busy – leave info”',
        'Schedule inspection with two options',
      ],
    },
    {
      id: 'seq-objections-1',
      title: 'Objection Handling – Rapid Fire',
      steps: [
        'Money concern / deductible',
        'Already have a roofer',
        'No visible damage',
        'Not now – too busy',
      ],
    },
  ],
  scenarios: [
    {
      id: 'mentor-initial-pitch-advanced-1',
      role: 'homeowner',
      prompt: "We're not interested. We already talked to someone last week.",
      expectedKeyPoints: [
        'Acknowledge respectfully',
        'Clarify value (free, no obligation)',
        'Establish social proof / storm context',
        'Offer specific, short inspection window',
      ],
      rubric: {
        keywords: [
          'understand',
          'free',
          'no obligation',
          'neighbors',
          'storm',
          '15 minutes',
          'today',
          'tomorrow',
        ],
        passThreshold: 70,
      },
      followUps: [
        'What time today or tomorrow is best for a quick 15-minute check?',
        'Would you prefer that I text a confirmation with my company info?',
      ],
    },
    {
      id: 'm1-talk-to-spouse',
      role: 'homeowner',
      prompt: 'I need to talk to my spouse first.',
      expectedKeyPoints: [
        'Acknowledge and respect decision process',
        'Offer brief inspection now for facts',
        'Provide simple summary to share',
        'Give two time options for both present',
      ],
      rubric: { keywords: ['respect', 'summary', 'facts', 'two options'], passThreshold: 70 },
      followUps: ['Would 6:30pm today or 10am tomorrow work for both of you?'],
    },
    {
      id: 'm1-other-contractor-already',
      role: 'homeowner',
      prompt: 'We already had someone look at it.',
      expectedKeyPoints: [
        'Acknowledge prior visit',
        'Offer second opinion with photo evidence',
        'Explain insurance requires documented proof',
        'Short window and no obligation',
      ],
      rubric: { keywords: ['acknowledge', 'second opinion', 'documented proof', 'no obligation'], passThreshold: 70 },
      followUps: ['Want me to show you an example report so you can compare?'],
    },
    {
      id: 'mentor-pricing-concern-1',
      role: 'homeowner',
      prompt: "We're not spending money on this right now.",
      expectedKeyPoints: [
        'Acknowledge money concern',
        'Explain deductible only',
        'Insurance covers replacement if approved',
        'Offer scheduling options',
      ],
      rubric: {
        keywords: [
          'deductible',
          'insurance',
          'covers',
          'approve',
          'peace of mind',
          'schedule',
        ],
        passThreshold: 70,
      },
      followUps: [
        'Would 4pm today or 10am tomorrow work for a 15-minute check?',
      ],
    },
    {
      id: 'm1-roofer-friend',
      role: 'homeowner',
      prompt: "My brother-in-law’s a roofer. We’ll call him if we need anything.",
      expectedKeyPoints: [
        'Acknowledge and respect the relationship',
        'Clarify storm claim process vs retail work',
        'Value of impartial photo documentation',
        'Offer quick, no-obligation inspection window',
      ],
      rubric: {
        keywords: ['understand', 'storm claim', 'documentation', 'no obligation', '15 minutes', 'today', 'tomorrow'],
        passThreshold: 70,
      },
      followUps: [
        'Would a 15-minute no-obligation photo check help you two decide together?',
        'I can text the report to both of you—want a quick look first?',
      ],
    },
    {
      id: 'm1-no-visible-damage',
      role: 'homeowner',
      prompt: "I don’t see damage from the ground—why inspect?",
      expectedKeyPoints: [
        'Acknowledge perception',
        'Explain roof-level evidence (granules, creases, collateral)',
        'Insurance requires documented proof',
        'Offer simple time options',
      ],
      rubric: {
        keywords: ['understand', 'roof-level', 'granules', 'creases', 'collateral', 'insurance', 'schedule'],
        passThreshold: 70,
      },
      followUps: ['Would 5pm today or 10am tomorrow work for a quick look?'],
    },
    {
      id: 'm1-elevator-pitch',
      role: 'rep',
      prompt: 'Deliver your 30-second pitch for a post-storm neighborhood.',
      expectedKeyPoints: [
        'Use name and purpose',
        'Free/no-obligation inspection',
        'Social proof (neighbors, local)',
        'Clear next step/time options',
      ],
      rubric: {
        keywords: ['name', 'free', 'no obligation', 'local', 'neighbors', 'schedule'],
        passThreshold: 70,
      },
      followUps: ['Now shorten it to 20 seconds without losing clarity.'],
    },
    {
      id: 'm1-schedule-two-options',
      role: 'rep',
      prompt: 'Ask for the inspection using two specific time options.',
      expectedKeyPoints: [
        'Offer two choices',
        'Ask for preference',
        'Confirm and set reminder',
      ],
      rubric: {
        keywords: ['two options', 'preference', 'confirm', 'reminder'],
        passThreshold: 70,
      },
      followUps: ['If they refuse both, present a third option or ask best day.'],
    },
    {
      id: 'm1-leave-a-card',
      role: 'homeowner',
      prompt: 'I’m busy—just leave a card.',
      expectedKeyPoints: [
        'Acknowledge time constraint',
        'Offer 10-second context and value',
        'Give two short time options',
        'Offer to text info and confirm',
      ],
      rubric: { keywords: ['busy', '10 seconds', 'two options', 'text info', 'confirm'], passThreshold: 70 },
      followUps: ['Would 6:10pm today or 9:40am tomorrow work for a 10–15 minute roof-level check?'],
    },
    {
      id: 'm1-scam-worried',
      role: 'homeowner',
      prompt: 'We’ve had a lot of people knocking—how do we know this isn’t a scam?',
      expectedKeyPoints: [
        'Empathize and normalize concern',
        'Local presence and references',
        'Transparent photo-report process',
        'No-obligation inspection with clear next step',
      ],
      rubric: { keywords: ['empathize', 'local', 'references', 'transparent', 'no obligation', 'next step'], passThreshold: 70 },
      followUps: ['Would you like to see a sample photo report and two nearby references?'],
    },
    {
      id: 'm1-we-dont-do-claims',
      role: 'homeowner',
      prompt: 'We don’t like doing insurance claims—sounds like a hassle.',
      expectedKeyPoints: [
        'Acknowledge hesitation',
        'Explain simple steps and your guidance',
        'Only the deductible if approved',
        'Offer quick inspection to verify if it’s even needed',
      ],
      rubric: { keywords: ['acknowledge', 'simple steps', 'deductible', 'verify first'], passThreshold: 70 },
      followUps: ['If it doesn’t qualify, at least you’ll have clarity—want a quick check today or tomorrow?'],
    },
  ],
};

export default mentorPack;
