import type { MentorPack } from './scenarios.module1';

const mentorPack3: MentorPack = {
  trainerTips: [
    'Tie Field Portal actions to pipeline health.',
    'Upload photos same day to keep claims moving.',
    'Announce wins in GroupMe to build momentum.',
  ],
  practiceSequences: [
    {
      id: 'm3-seq-1',
      title: 'Daily Workflow',
      steps: ['Morning prep', 'Field work', 'Upload photos', 'Evening wrap-up'],
    },
    {
      id: 'm3-seq-2',
      title: 'Metrics Mindset',
      steps: ['Door count', 'Inspections', 'Sign-ups', 'Completions'],
    },
  ],
  scenarios: [
    {
      id: 'm3-time-prioritization',
      role: 'rep',
      prompt: 'You have 45 minutes left today. Do you knock or upload photos?',
      expectedKeyPoints: [
        'Same-day upload best practice',
        'Knock target consideration',
        'Balance immediate vs. pipeline needs',
      ],
      rubric: {
        keywords: ['same-day', 'upload', 'pipeline', 'target'],
        passThreshold: 70,
      },
      followUps: [
        "What's your current door count and do you have urgent tasks on the message board?",
      ],
    },
  ],
};

export default mentorPack3;
