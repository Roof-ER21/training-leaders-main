import type { MentorPack } from './scenarios.module1';

const mentorPack4: MentorPack = {
  trainerTips: [
    'Use L.E.A.R.N. (Listen, Empathize, Ask, Respond, Navigate).',
    'Ask clarifying questions before responding.',
    'End with a clear next step.',
  ],
  practiceSequences: [
    {
      id: 'm4-seq-1',
      title: 'LEARN Practice',
      steps: ['Listen', 'Empathize', 'Ask', 'Respond', 'Navigate'],
    },
  ],
  scenarios: [
    {
      id: 'm4-learn-budget',
      role: 'homeowner',
      prompt: "This seems expensive. We can't afford it.",
      expectedKeyPoints: [
        'Empathy',
        'Deductible focus',
        'Insurance covers replacement',
        'Offer times',
      ],
      rubric: {
        keywords: ['understand', 'deductible', 'insurance', 'schedule'],
        passThreshold: 70,
      },
      followUps: [
        'Would 5pm today or 10am tomorrow work to take a quick look?',
      ],
    },
  ],
};

export default mentorPack4;
