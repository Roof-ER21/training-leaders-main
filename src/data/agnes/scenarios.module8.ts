import type { MentorPack } from './scenarios.module1';

const mentorPack8: MentorPack = {
  trainerTips: [
    'Reinforce leadership and mentoring to junior reps.',
    'Coach with examples and measured feedback.',
  ],
  practiceSequences: [
    {
      id: 'm8-seq-1',
      title: 'Coaching Cycle',
      steps: ['Observe', 'Coach', 'Practice', 'Feedback'],
    },
  ],
  scenarios: [
    {
      id: 'm8-coach-1',
      role: 'rep',
      prompt: 'Your trainee rushes the pitch. How do you coach them?',
      expectedKeyPoints: [
        'Slow down',
        'Use name',
        'Ask for agreement',
        'Two time options',
      ],
      rubric: {
        keywords: ['slow', 'name', 'agreement', 'options'],
        passThreshold: 70,
      },
      followUps: ['Can you demo the corrected pitch at normal pace?'],
    },
  ],
};

export default mentorPack8;
