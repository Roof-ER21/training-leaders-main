import type { MentorPack } from './scenarios.module1';

const mentorPack7: MentorPack = {
  trainerTips: [
    'Use simulations to train judgment under time pressure.',
    'Always tie actions to downstream pipeline impact.',
  ],
  practiceSequences: [
    {
      id: 'm7-seq-1',
      title: 'Daily Simulation',
      steps: ['Morning prep', 'Midday decisions', 'Evening wrap-up'],
    },
  ],
  scenarios: [
    {
      id: 'm7-sim-1',
      role: 'rep',
      prompt:
        'You have an adjuster call and two inspections to schedule—what’s first?',
      expectedKeyPoints: [
        'Urgent tasks first',
        'Protect adjuster meeting',
        'Schedule inspections',
      ],
      rubric: {
        keywords: ['urgent', 'adjuster', 'schedule'],
        passThreshold: 70,
      },
      followUps: [
        'Do you have the Photo Report ready to send to the adjuster?',
      ],
    },
  ],
};

export default mentorPack7;
