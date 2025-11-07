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
    {
      id: 'm6-knock-script-variations',
      role: 'rep',
      prompt: 'Deliver two different openers for the same street—one for a direct style and one for a friendly style.',
      expectedKeyPoints: ['Tailor tone', 'Keep core value the same', 'Ask short permission question', 'Transition to next step'],
      rubric: { keywords: ['tone', 'value', 'permission', 'transition'], passThreshold: 70 },
      followUps: ['Which opener fits a time-pressed homeowner best and why?'],
    },
    {
      id: 'm6-roleplay-pause-silence',
      role: 'rep',
      prompt: 'Practice using intentional pauses during objection handling without rambling.',
      expectedKeyPoints: ['Acknowledge', 'Pause for processing', 'Concise answer', 'Ask next-step question'],
      rubric: { keywords: ['pause', 'concise', 'acknowledge', 'next step'], passThreshold: 70 },
      followUps: ['Where would you place your two longest pauses and why?'],
    },
    {
      id: 'm6-open-ended-questions',
      role: 'rep',
      prompt: 'List three open-ended questions to surface hidden objections after inspection.',
      expectedKeyPoints: ['Avoid yes/no', 'Invite concerns', 'Prepare for scheduling close'],
      rubric: { keywords: ['open-ended', 'concerns', 'schedule'], passThreshold: 70 },
      followUps: ['Rewrite one question to be shorter but still open-ended.'],
    },
    {
      id: 'mX-referral-ask-soft',
      role: 'rep',
      prompt: 'Politely ask for referrals after installation and certificate of completion.',
      expectedKeyPoints: [
        'Confirm satisfaction',
        'Ask permission for yard sign/review',
        'Soft ask for friends/neighbors',
        'Provide easy link or card'
      ],
      rubric: { keywords: ['satisfaction','yard sign','review','referral','neighbors'], passThreshold: 70 },
      followUps: ['Would you mind if we placed a small sign for a week or two?']
    }

  ],
};

export default mentorPack6;
