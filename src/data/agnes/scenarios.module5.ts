import type { MentorPack } from './scenarios.module1';

const mentorPack5: MentorPack = {
  trainerTips: [
    'Explain ACV vs RCV with simple language.',
    'Use numbers and visuals to make it tangible.',
    'Clarify deductible and timing of payments.',
  ],
  practiceSequences: [
    {
      id: 'm5-seq-1',
      title: 'ACV/RCV Explainer',
      steps: [
        'Define RCV',
        'Define ACV',
        'Show example',
        'Timeline of payments',
      ],
    },
  ],
  scenarios: [
    {
      id: 'm5-supplement-photo-just',
      role: 'adjuster',
      prompt: 'Explain how you justify a supplement using photo sequences and measured quantities.',
      expectedKeyPoints: ['Before/after context', 'Close-ups with scale', 'Measurement math', 'Code references when applicable'],
      rubric: { keywords: ['before/after', 'scale', 'measure', 'code', 'supplement'], passThreshold: 75 },
      followUps: ['Name two photos that are most persuasive for drip edge addition.'],
    },
    {
      id: 'm5-itel-lab-process',
      role: 'adjuster',
      prompt: 'Outline the iTel/discontinued verification process and how it affects scope.',
      expectedKeyPoints: ['Sample collection and chain of custody', 'Manufacturer match result', 'Repairability vs replacement', 'Documentation provided'],
      rubric: { keywords: ['iTel', 'sample', 'manufacturer', 'repairability', 'replacement'], passThreshold: 75 },
      followUps: ['What do you include in your note when submitting the iTel?'],
    },
    {
      id: 'm5-rcv-acv-questions',
      role: 'homeowner',
      prompt:
        'Why do they withhold depreciation? When do I pay the deductible?',
      expectedKeyPoints: [
        'Depreciation release after completion',
        'Deductible is out-of-pocket',
        'Two-payment flow',
      ],
      rubric: {
        keywords: ['depreciation', 'completion', 'deductible', 'two payments'],
        passThreshold: 70,
      },
      followUps: [
        'Would you like to see a quick calculator demo that shows your numbers?',
      ],
    },
    {
      id: 'm5-xactimate-line-items',
      role: 'adjuster',
      prompt: 'Defend three scope line items with Xactimate logic and site evidence.',
      expectedKeyPoints: [
        'Reference line codes and scope rationale',
        'Tie to photos and code requirements',
        'Professional, concise justification',
      ],
      rubric: { keywords: ['line code', 'scope', 'photos', 'code', 'professional'], passThreshold: 75 },
      followUps: ['Choose one line item and provide your one-sentence justification.'],
    },
    {
      id: 'm5-waste-calc-debate',
      role: 'adjuster',
      prompt: 'Explain your waste calculation on a hip/valley roof and respond to a lower adjuster number.',
      expectedKeyPoints: ['Show geometry and pitch impact', 'Explain industry range', 'Offer compromise backed by math'],
      rubric: { keywords: ['waste', 'geometry', 'pitch', 'range', 'compromise'], passThreshold: 75 },
      followUps: ['What documentation will you attach to support your waste percentage?'],
    },
    {
      id: 'm5-code-upgrades',
      role: 'rep',
      prompt: 'Explain how code upgrades are handled in a typical storm claim.',
      expectedKeyPoints: [
        'Carrier pays for required code items when applicable',
        'Provide documentation (local code excerpts)',
        'Add to scope and supplement as needed',
      ],
      rubric: { keywords: ['code', 'required', 'documentation', 'supplement'], passThreshold: 70 },
      followUps: ['Name two common roofing code items in your market.'],
    },
    {
      id: 'm5-overhead-profit',
      role: 'rep',
      prompt: 'When is O&P (overhead and profit) appropriate, and how do you communicate it?',
      expectedKeyPoints: ['Complexity/coordination threshold', 'Industry standards', 'Professional, transparent discussion'],
      rubric: { keywords: ['O&P', 'complexity', 'coordination', 'transparent'], passThreshold: 70 },
      followUps: ['Provide a sentence you would use with an adjuster regarding O&P.'],
    },
    {
      id: 'm5-discontinued-shingles',
      role: 'rep',
      prompt: 'Discuss how you handle discontinued shingles with an adjuster.',
      expectedKeyPoints: ['Manufacturer verification (iTel, etc.)', 'Documentation and photos', 'Match issues—repair vs replace'],
      rubric: { keywords: ['discontinued', 'manufacturer', 'iTel', 'match', 'replace'], passThreshold: 70 },
      followUps: ['What documentation do you submit with the iTel?'],
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

export default mentorPack5;
