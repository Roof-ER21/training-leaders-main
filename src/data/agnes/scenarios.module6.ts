import type { MentorPack } from './scenarios.module1';

const mentorPack6: MentorPack = {
  trainerTips: [
    'Break down complex options into simple choices.',
    'Use scenario coaching to reinforce best practices.',
  ],
  practiceSequences: [
    {
      id: 'm6-seq-1',
      title: 'Scenario Drill',
      steps: [
        'Present scenario',
        'Two good options',
        'Two poor options',
        'Explain why',
      ],
    },
  ],
  scenarios: [
    {
      id: 'm6-roleplay-1',
      role: 'rep',
      prompt:
        'Customer says they will “think about it” after you find qualifying damage.',
      expectedKeyPoints: [
        'Acknowledge',
        'Educate urgency and claim window',
        'Offer two times',
      ],
      rubric: {
        keywords: ['understand', 'window', 'schedule', '15 minutes'],
        passThreshold: 70,
      },
      followUps: ['What time today or tomorrow works best?'],
    },
  ],
};

export default mentorPack6;
