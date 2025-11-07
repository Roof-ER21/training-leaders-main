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
      id: 'm9-scope-clarity-meeting',
      role: 'adjuster',
      prompt: 'Lead a scope-clarity discussion with an adjuster who is new to hail claims.',
      expectedKeyPoints: ['Walk order using report', 'Define criteria for hits vs wear', 'Show collateral early', 'Agree on next steps'],
      rubric: { keywords: ['walk order', 'criteria', 'collateral', 'next steps'], passThreshold: 80 },
      followUps: ['What one-page handout would you bring for criteria clarity?'],
    },
    {
      id: 'm9-safety-ladder-meet',
      role: 'adjuster',
      prompt: 'Before the meeting begins, state your ladder and roof safety plan with the adjuster.',
      expectedKeyPoints: ['3-point contact', 'Stabilization and tie-off where needed', 'Weather/wind check', 'Roles and communication'],
      rubric: { keywords: ['3-point', 'stabilization', 'weather', 'communication'], passThreshold: 80 },
      followUps: ['What will you do if wind exceeds your safety threshold mid-meeting?'],
    },
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
    {
      id: 'm9-partial-slope-coverage',
      role: 'adjuster',
      prompt: 'Adjuster proposes replacing only two slopes. Make the case for full-roof replacement or the best alternative.',
      expectedKeyPoints: [
        'Pattern and test square counts across slopes',
        'Valley/ridge continuity and matching',
        'Collateral and uniform appearance considerations',
        'Alternative: tie-in scope with justification if partial',
      ],
      rubric: { keywords: ['pattern', 'continuity', 'matching', 'collateral', 'tie-in'], passThreshold: 80 },
      followUps: ['What photos do you show first to support full coverage?'],
    },
    {
      id: 'm9-cosmetic-vs-functional',
      role: 'adjuster',
      prompt: 'Address “cosmetic only” pushback on metal components using evidence and policy language.',
      expectedKeyPoints: ['Differentiate cosmetic vs functional criteria', 'Show functional impact (rust/exposed substrate)', 'Policy/endorsement context'],
      rubric: { keywords: ['cosmetic', 'functional', 'evidence', 'policy'], passThreshold: 80 },
      followUps: ['Which two photos best demonstrate functional impact here, and why?'],
    },
    {
      id: 'm9-adjuster-pushback',
      role: 'rep',
      prompt: 'Adjuster says the marks look like wear, not hail. What do you present and how?',
      expectedKeyPoints: ['Test square counts/pattern', 'Collateral confirmation', 'Overviews for context', 'Professional tone'],
      rubric: { keywords: ['pattern', 'collateral', 'context', 'professional'], passThreshold: 75 },
      followUps: ['Quote the single clearest sentence you will use to frame your evidence.'],
    },
    {
      id: 'm9-deductible-objection-close',
      role: 'homeowner',
      prompt: 'We can’t swing the deductible. Can we delay everything?',
      expectedKeyPoints: ['Empathize', 'Only due if approved and at completion', 'Plan options/timing', 'No-obligation inspection now'],
      rubric: { keywords: ['empathize', 'approved', 'completion', 'options'], passThreshold: 70 },
      followUps: ['Would seeing a basic cost timeline help you decide?'],
    },
    {
      id: 'm9-scope-walkthrough',
      role: 'rep',
      prompt: 'Walk a homeowner through the approved scope using your photo report.',
      expectedKeyPoints: ['Start with overviews', 'Explain close-ups simply', 'Show collateral connection', 'Outline next steps/scheduling'],
      rubric: { keywords: ['overviews', 'close-ups', 'collateral', 'next steps'], passThreshold: 75 },
      followUps: ['What two expectations will you set before installation day?'],
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

export default mentorPack9;
