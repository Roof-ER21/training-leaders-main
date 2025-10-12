import type { MentorPack } from './scenarios.module1';

const mentorPack2: MentorPack = {
  trainerTips: [
    "Use photos to teach: show, don't just tell.",
    'Document collateral damage to strengthen claims.',
    'Always gather elevation, slope, and close-ups in order.',
    'Create simple homeowner explanations with visuals.',
  ],
  practiceSequences: [
    {
      id: 'm2-seq-1',
      title: 'Inspection Flow Basics',
      steps: [
        'Perimeter scan',
        'Ladder safety',
        'Slope overview',
        'Close-ups',
        'Metals and gutters',
      ],
    },
    {
      id: 'm2-seq-2',
      title: 'Photo Report Mastery',
      steps: [
        'Elevations',
        'Slope overviews',
        'Damage close-ups',
        'Collateral',
        'Labels and upload',
      ],
    },
  ],
  scenarios: [
    {
      id: 'm2-homeowner-photo-education',
      role: 'homeowner',
      prompt: "Why do you need so many photos? Isn't that overkill?",
      expectedKeyPoints: [
        'Insurance evidence requirements',
        'Order of photos and consistency',
        'Peace of mind and transparency for homeowner',
      ],
      rubric: {
        keywords: [
          'evidence',
          'adjuster',
          'consistency',
          'transparency',
          'report',
        ],
        passThreshold: 70,
      },
      followUps: [
        'Would you like me to show you a sample report so you can see exactly what we document?',
      ],
    },
    {
      id: 'm2-damage-clarification',
      role: 'homeowner',
      prompt: "How do you know that's hail and not just wear?",
      expectedKeyPoints: [
        'Circular divots',
        'Granule loss',
        'Bruising',
        'Pattern across slopes',
      ],
      rubric: {
        keywords: ['circular', 'granules', 'bruise', 'pattern'],
        passThreshold: 70,
      },
      followUps: [
        'Would you like me to chalk a test square so you can see the pattern clearly?',
      ],
    },
  ],
};

export default mentorPack2;
