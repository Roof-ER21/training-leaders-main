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
    {
      id: 'm7-time-blocking',
      role: 'rep',
      prompt: 'You have two hours before sunset: 45 minutes of uploads pending and a hot street to knock. How do you time-block?',
      expectedKeyPoints: ['Split block or prioritize uploads same-day', 'Communicate with team', 'Set reminder for remaining task'],
      rubric: { keywords: ['time-block', 'same-day', 'communicate', 'reminder'], passThreshold: 70 },
      followUps: ['What is your exact 120-minute plan by 15-minute blocks?'],
    },
    {
      id: 'm7-weather-adjust-plan',
      role: 'rep',
      prompt: 'A sudden storm cancels your adjuster meeting. How do you adjust your day to still hit targets?',
      expectedKeyPoints: ['Reschedule immediately', 'Knock alternate area', 'Backlog uploads/training'],
      rubric: { keywords: ['reschedule', 'targets', 'uploads', 'training'], passThreshold: 70 },
      followUps: ['Write a two-line text you’ll send the homeowner.'],
    },
    {
      id: 'm7-prioritize-followups',
      role: 'rep',
      prompt: 'Choose three jobs from your pipeline to follow up today and explain why.',
      expectedKeyPoints: ['Pick by stage impact', 'Oldest first when equal', 'Note clear next step'],
      rubric: { keywords: ['stage', 'oldest', 'next step'], passThreshold: 70 },
      followUps: ['Draft one voicemail and one text for two of them.'],
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

export default mentorPack7;
