import type { MentorPack } from './scenarios.module1';

const mentorPack9: MentorPack = {
  trainerTips: [
    'Capstone: integrate objections, claims, and scheduling into one flow.',
    'Aim for mastery-level concise answers with clear next steps.',
  ],
  practiceSequences: [
    {
      id: 'm9-seq-1',
      title: 'Capstone Flow',
      steps: ['Pitch', 'Inspect', 'Claim', 'Schedule', 'Follow-up'],
    },
  ],
  scenarios: [
    {
      id: 'm9-capstone-1',
      role: 'homeowner',
      prompt: "We're comparing a few companies—why should we pick you?",
      expectedKeyPoints: [
        'Local specialist',
        'Insurance navigation',
        'Photo documentation',
        'Clear process',
        'Schedule',
      ],
      rubric: {
        keywords: [
          'local',
          'specialize',
          'insurance',
          'photos',
          'process',
          'schedule',
        ],
        passThreshold: 75,
      },
      followUps: ['Would you like references or to see a sample Photo Report?'],
    },
  ],
};

export default mentorPack9;
