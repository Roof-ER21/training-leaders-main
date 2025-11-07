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
    {
      id: 'm3-deductible-explain',
      role: 'homeowner',
      prompt: 'How much will this cost me up front?',
      expectedKeyPoints: [
        'Typically only the deductible if claim approved',
        'No obligation inspection',
        'Policy designed for storm events'
      ],
      rubric: { keywords: ['deductible','policy','approved','no obligation'], passThreshold: 70 },
      followUps: ['Would you like me to show a simple cost breakdown after approval?']
    },
    {
      id: 'm3-adjuster-meeting-setup',
      role: 'rep',
      prompt: 'Outline how you prepare and run an adjuster meeting.',
      expectedKeyPoints: [
        'Organized photo report with labels',
        'Test squares/chalk ready',
        'Walk order: elevations, slopes, collateral',
        'Professional cooperation tone'
      ],
      rubric: { keywords: ['report','labels','chalk','order','cooperate'], passThreshold: 70 },
      followUps: ['What are your first two photos to present to the adjuster and why?']
    },
    {
      id: 'm3-groupme-post-template',
      role: 'rep',
      prompt: 'Compose a concise GroupMe post after a sign-up that motivates the team and informs operations.',
      expectedKeyPoints: [
        'Include neighborhood + carrier + next step',
        'Thank homeowner (no private info)',
        'Encourage team momentum',
      ],
      rubric: { keywords: ['neighborhood', 'carrier', 'next step', 'momentum'], passThreshold: 70 },
      followUps: ['Add one photo and a lesson learned as a comment.'],
    },
    {
      id: 'm3-pipeline-stuck-action',
      role: 'rep',
      prompt: 'A job has been in "Estimate Pending" for 10 days. What do you do?',
      expectedKeyPoints: ['Check messages/notes', 'Follow up with desk/adjuster', 'Set reminder', 'Update homeowner with ETA'],
      rubric: { keywords: ['follow up', 'desk', 'adjuster', 'reminder', 'ETA'], passThreshold: 70 },
      followUps: ['Draft a 2-sentence update text to the homeowner.'],
    },
    {
      id: 'm3-evening-upload-discipline',
      role: 'rep',
      prompt: 'Outline your same-day upload routine for photo reports when you’re behind schedule.',
      expectedKeyPoints: ['Time block at end of day', 'Prioritize organized sets', 'Caption/label as you go', 'Post status to team'],
      rubric: { keywords: ['time block', 'organized', 'labels', 'status'], passThreshold: 70 },
      followUps: ['What’s your backup plan if Wi‑Fi is slow?'],
    },
    {
      id: 'm3-adjuster-call-prep',
      role: 'rep',
      prompt: 'You need to call an adjuster to clarify scope. What prep do you do?',
      expectedKeyPoints: ['Open report with page references', 'Know test square counts', 'Have dates/NOAA ready', 'Remain professional/cooperative'],
      rubric: { keywords: ['references', 'counts', 'NOAA', 'professional'], passThreshold: 70 },
      followUps: ['List the first three items you will reference on the call.'],
    }

  ],
};

export default mentorPack3;
