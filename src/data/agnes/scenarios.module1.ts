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
  ],
};

export default mentorPack;
