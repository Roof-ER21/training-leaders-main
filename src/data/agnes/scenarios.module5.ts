import type { MentorPack } from './scenarios.module1';

const mentorPack5: MentorPack = {
  trainerTips: [
    'Explain ACV vs RCV with simple language.',
    'Use numbers and visuals to make it tangible.',
    'Clarify deductible and timing of payments.',
  ],
  practiceSequences: [
    {
      id: 'm5-seq-1',
      title: 'ACV/RCV Explainer',
      steps: [
        'Define RCV',
        'Define ACV',
        'Show example',
        'Timeline of payments',
      ],
    },
  ],
  scenarios: [
    {
      id: 'm5-rcv-acv-questions',
      role: 'homeowner',
      prompt:
        'Why do they withhold depreciation? When do I pay the deductible?',
      expectedKeyPoints: [
        'Depreciation release after completion',
        'Deductible is out-of-pocket',
        'Two-payment flow',
      ],
      rubric: {
        keywords: ['depreciation', 'completion', 'deductible', 'two payments'],
        passThreshold: 70,
      },
      followUps: [
        'Would you like to see a quick calculator demo that shows your numbers?',
      ],
    },
  ],
};

export default mentorPack5;
