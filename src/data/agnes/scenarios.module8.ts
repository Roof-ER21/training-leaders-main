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
    {
      id: 'm8-ridealong-feedback',
      role: 'rep',
      prompt: 'You just did a ride-along. Deliver feedback that is specific, kind, and actionable.',
      expectedKeyPoints: ['One praise, one focus area', 'Specific example', 'Practice plan with rep', 'Follow-up date'],
      rubric: { keywords: ['specific', 'actionable', 'practice', 'follow-up'], passThreshold: 70 },
      followUps: ['Schedule a 10-minute micro‑practice on the weak spot.'],
    },
    {
      id: 'm8-coach-photo-report-quality',
      role: 'rep',
      prompt: 'Coach a rep whose photo reports are out of order and unlabeled.',
      expectedKeyPoints: ['Explain impact on adjusters', 'Show example of good report', 'Set standard and checklist', 'Audit next 3 uploads'],
      rubric: { keywords: ['impact', 'example', 'standard', 'audit'], passThreshold: 70 },
      followUps: ['Share a simple 5-step checklist you will enforce.'],
    },
    {
      id: 'm8-roleplay-handoff',
      role: 'rep',
      prompt: 'Roleplay a clean handoff from inspection to claim call-in with a trainee observing.',
      expectedKeyPoints: ['Recap findings in plain language', 'Set homeowner expectations', 'Initiate claim calmly', 'Invite trainee to mirror process'],
      rubric: { keywords: ['recap', 'expectations', 'claim', 'mirror'], passThreshold: 70 },
      followUps: ['What one-liner will you use to transition into the call?'],
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

export default mentorPack8;
