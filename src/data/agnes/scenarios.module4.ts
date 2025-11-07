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
      id: 'm4-need-other-quotes',
      role: 'homeowner',
      prompt: 'We want to get a few other quotes first.',
      expectedKeyPoints: ['Acknowledge diligence', 'Insurance claim ≠ retail bidding', 'Evidence-driven approval', 'Offer inspection first'],
      rubric: { keywords: ['acknowledge', 'not retail', 'evidence', 'inspection'], passThreshold: 70 },
      followUps: ['Would a quick inspection and photo report help you compare apples to apples?'],
    },
    {
      id: 'm4-dog-barking',
      role: 'homeowner',
      prompt: 'The dog is going crazy—can you just leave info?',
      expectedKeyPoints: ['Empathize', 'Offer quick 10-sec value statement', 'Set short follow-up time window', 'Confirm via text'],
      rubric: { keywords: ['empathize', '10 seconds', 'follow-up', 'text'], passThreshold: 70 },
      followUps: ['I’ll text you—does tomorrow at 10:30am or 6:15pm work better?'],
    },
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
    {
      id: 'm4-no-leaks-no-problem',
      role: 'homeowner',
      prompt: "We don’t have any leaks—so there’s no problem, right?",
      expectedKeyPoints: [
        'Acknowledge',
        'Explain hidden roof-level damage vs. leaks',
        'Insurance requires evidence not active leak',
        'Offer quick roof-level check',
      ],
      rubric: { keywords: ['acknowledge', 'roof-level', 'evidence', 'check'], passThreshold: 70 },
      followUps: ['Would 10 minutes on the roof for photos help you decide?'],
    },
    {
      id: 'm4-wait-until-spring',
      role: 'homeowner',
      prompt: 'Let’s wait until spring—weather will be better.',
      expectedKeyPoints: [
        'Empathize about timing',
        'Explain claim windows/system aging',
        'Document now, schedule later if needed',
        'Offer short inspection window',
      ],
      rubric: { keywords: ['empathize', 'window', 'document', 'schedule'], passThreshold: 70 },
      followUps: ['Would you like a documented baseline now and decide on timing later?'],
    },
    {
      id: 'm4-hoa-restrictions',
      role: 'homeowner',
      prompt: 'Our HOA is strict—this probably isn’t allowed.',
      expectedKeyPoints: [
        'Acknowledge HOA concern',
        'Clarify inspection/photo documentation allowed',
        'Work with HOA on materials/colors post-approval',
        'Next step: simple inspection first',
      ],
      rubric: { keywords: ['HOA', 'allowed', 'materials', 'colors', 'next step'], passThreshold: 70 },
      followUps: ['If it qualifies, we coordinate approvals; want a quick check now?'],
    },
    {
      id: 'm4-trust-proof-social',
      role: 'homeowner',
      prompt: 'How do I know you’re legit? We’ve had a lot of people knocking.',
      expectedKeyPoints: [
        'Empathize with flood of contractors',
        'Local presence and references',
        'Photo-report transparency',
        'No-obligation check with clear next step',
      ],
      rubric: { keywords: ['local', 'references', 'transparency', 'no obligation', 'next step'], passThreshold: 70 },
      followUps: ['Would you like to see a sample photo report from nearby?'],
    },
    {
      id: 'm4-too-busy-come-back',
      role: 'homeowner',
      prompt: 'Today is crazy—come back later sometime.',
      expectedKeyPoints: ['Acknowledge', 'Offer two specific times', '15-minute check promise', 'Set reminder/confirm'],
      rubric: { keywords: ['acknowledge', 'two times', '15 minutes', 'confirm'], passThreshold: 70 },
      followUps: ['Do you prefer after work today or tomorrow morning?'],
    },
    {
      id: 'm4-deductible-cannot-afford',
      role: 'homeowner',
      prompt: 'We can’t afford the deductible right now.',
      expectedKeyPoints: ['Empathize', 'Only pay if approved', 'Timing aligns with completion', 'No-obligation inspection'],
      rubric: { keywords: ['empathize', 'approved', 'completion', 'no obligation'], passThreshold: 70 },
      followUps: ['Would it help if I showed the timeline of payments?'],
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

export default mentorPack4;
