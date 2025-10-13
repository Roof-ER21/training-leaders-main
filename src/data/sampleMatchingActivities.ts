import { MatchingActivity } from '../components/InteractiveLearningActivity';

/**
 * Sample Matching Activities for Testing
 *
 * These activities can be used to test the matching game component
 * in various training modules.
 */

export const roofingTermsMatching: MatchingActivity = {
  id: 'roofing-terms-match-1',
  title: 'RoofER Terminology Matching',
  description: 'Match roofing terms with their correct definitions',
  type: 'matching',
  points: 100,
  agnesTip: 'Understanding these terms is essential for communicating professionally with homeowners and adjusters!',
  data: {
    pairs: [
      {
        id: 'eave',
        left: 'Eave',
        right: 'Lower edge of roof where it meets the wall'
      },
      {
        id: 'ridge',
        left: 'Ridge',
        right: 'Peak of roof where two slopes meet'
      },
      {
        id: 'valley',
        left: 'Valley',
        right: 'Where two roof planes meet at an angle'
      },
      {
        id: 'soffit',
        left: 'Soffit',
        right: 'Underside of roof overhang'
      },
      {
        id: 'fascia',
        left: 'Fascia',
        right: 'Vertical board along roof edge'
      },
      {
        id: 'flashing',
        left: 'Flashing',
        right: 'Metal pieces that prevent water leakage'
      }
    ],
    shuffleOptions: true,
    showHints: true,
    hintsAfterAttempts: 2
  }
};

export const companyValuesMatching: MatchingActivity = {
  id: 'company-values-match-1',
  title: 'RoofER Core Values',
  description: 'Match each core value with its meaning',
  type: 'matching',
  points: 150,
  agnesTip: 'These values define who we are as a company. Living these values every day is what makes RoofER the Elite 2%!',
  data: {
    pairs: [
      {
        id: 'integrity',
        left: 'Integrity',
        right: 'Doing the right thing even when no one is watching'
      },
      {
        id: 'quality',
        left: 'Quality',
        right: 'Elite 2% standard in every interaction'
      },
      {
        id: 'simplicity',
        left: 'Simplicity',
        right: 'Making complex processes easy for homeowners'
      },
      {
        id: 'fiduciary',
        left: 'Fiduciary Responsibility',
        right: 'Putting customer interests first always'
      },
      {
        id: 'transparency',
        left: 'Transparency',
        right: 'Clear communication at every stage'
      }
    ],
    shuffleOptions: true,
    showHints: true,
    hintsAfterAttempts: 3
  }
};

export const damageTypesMatching: MatchingActivity = {
  id: 'damage-types-match-1',
  title: 'Storm Damage Identification',
  description: 'Match damage types with their characteristics',
  type: 'matching',
  points: 125,
  agnesTip: 'Knowing how to identify different types of damage is crucial for accurate inspections and successful claims!',
  data: {
    pairs: [
      {
        id: 'hail',
        left: 'Hail Damage',
        right: 'Circular marks where granules are knocked off'
      },
      {
        id: 'wind',
        left: 'Wind Damage',
        right: 'Lifted, torn, or missing shingles'
      },
      {
        id: 'lightning',
        left: 'Lightning Damage',
        right: 'Burn marks and split wood'
      },
      {
        id: 'impact',
        left: 'Impact Damage',
        right: 'Dents from falling branches or debris'
      }
    ],
    shuffleOptions: true,
    showHints: true,
    hintsAfterAttempts: 2
  }
};

export const salesCycleMatching: MatchingActivity = {
  id: 'sales-cycle-match-1',
  title: 'Sales Cycle Stages',
  description: 'Match each stage with its timeline',
  type: 'matching',
  points: 100,
  agnesTip: 'Understanding the complete sales cycle helps you manage your pipeline and forecast your income!',
  data: {
    pairs: [
      {
        id: 'inspection',
        left: 'Inspection',
        right: 'Week 0 - Same day as door knock'
      },
      {
        id: 'adjuster',
        left: 'Adjuster Meeting',
        right: 'Week 1 - Days 2-7 after claim filed'
      },
      {
        id: 'project',
        left: 'Project Meeting',
        right: 'Week 3-4 - After insurance approval'
      },
      {
        id: 'installation',
        left: 'Installation',
        right: 'Week 7-10 - Scheduled with production'
      },
      {
        id: 'final',
        left: 'Final Payment',
        right: 'Week 9-16 - After completion certificate'
      }
    ],
    shuffleOptions: true,
    showHints: true,
    hintsAfterAttempts: 2
  }
};

export const objectionResponseMatching: MatchingActivity = {
  id: 'objection-response-match-1',
  title: 'Objection Handling',
  description: 'Match common objections with the best responses',
  type: 'matching',
  points: 150,
  agnesTip: 'These proven responses help you handle objections professionally while building trust!',
  data: {
    pairs: [
      {
        id: 'spouse',
        left: 'I need to talk to my spouse',
        right: 'Great! Let me schedule when you can both be present'
      },
      {
        id: 'busy',
        left: 'I\'m too busy right now',
        right: 'The inspection only takes 15 minutes - when works better?'
      },
      {
        id: 'newroof',
        left: 'My roof is new',
        right: 'Perfect! Then we can document no damage for your records'
      },
      {
        id: 'deductible',
        left: 'I don\'t want to pay my deductible',
        right: 'I understand - let\'s inspect first, then you decide'
      }
    ],
    shuffleOptions: true,
    showHints: true,
    hintsAfterAttempts: 2
  }
};

export const commissionTiersMatching: MatchingActivity = {
  id: 'commission-tiers-match-1',
  title: 'Commission Structure',
  description: 'Match sign-up levels with commission percentages',
  type: 'matching',
  points: 100,
  agnesTip: 'Knowing your commission tiers helps you set goals and forecast your income!',
  data: {
    pairs: [
      {
        id: 'tier20',
        left: '20+ sign-ups',
        right: '16% commission rate'
      },
      {
        id: 'tier10',
        left: '10-19 sign-ups',
        right: '10% commission rate'
      },
      {
        id: 'tier6',
        left: 'Under 10 sign-ups',
        right: '6% commission rate'
      },
      {
        id: 'bonus20',
        left: '20 sign-up bonus',
        right: '$2,000 monthly bonus'
      },
      {
        id: 'bonus30',
        left: '30 sign-up bonus',
        right: '$4,000 monthly bonus'
      }
    ],
    shuffleOptions: true,
    showHints: true,
    hintsAfterAttempts: 2
  }
};

// Export all sample activities as an array
export const allSampleMatchingActivities: MatchingActivity[] = [
  roofingTermsMatching,
  companyValuesMatching,
  damageTypesMatching,
  salesCycleMatching,
  objectionResponseMatching,
  commissionTiersMatching
];

// Export a function to get a random matching activity
export const getRandomMatchingActivity = (): MatchingActivity => {
  const randomIndex = Math.floor(Math.random() * allSampleMatchingActivities.length);
  return allSampleMatchingActivities[randomIndex];
};
