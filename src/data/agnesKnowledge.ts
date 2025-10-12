export interface ModuleInfo {
  title: string;
  description: string;
  keyPoints: string[];
  safetyNotes: string[];
  commonMistakes: string[];
  bestPractices: string[];
  tools: string[];
  materials: string[];
  timeEstimate: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
}

export interface AgnesKnowledge {
  modules: Record<string, ModuleInfo>;
  safetyProtocols: string[];
  bestPractices: string[];
  commonMaterials: Record<string, any>;
  tools: Record<string, any>;
  weatherConsiderations: Record<string, string[]>;
  buildingCodes: Record<string, string[]>;
  emergencyProcedures: string[];
  industryStandards: string[];
}

export const roofingKnowledgeBase: AgnesKnowledge = {
  modules: {
    module1: {
      title: 'Foundation & Company Culture',
      description:
        'Understanding RoofER company values, industry overview, and professional standards',
      keyPoints: [
        'RoofER has been serving the community for over 15 years with excellence',
        'Our core values: Safety, Quality, Integrity, Customer Service',
        'The roofing industry generates $50+ billion annually with steady growth',
        'Career progression paths from installer to project manager to business owner',
        'Professional conduct includes punctuality, clean appearance, and respectful communication',
        'Team collaboration is essential for project success and safety',
      ],
      safetyNotes: [
        'Safety is our #1 priority in every decision',
        'Report safety concerns immediately to supervisors',
        'Participate actively in all safety training sessions',
      ],
      commonMistakes: [
        'Underestimating the importance of company culture',
        'Not understanding career advancement opportunities',
        'Poor communication with team members',
      ],
      bestPractices: [
        'Arrive 15 minutes early to prepare for the day',
        'Keep your vehicle and tools clean and organized',
        'Communicate proactively with your team',
        'Take pride in representing the RoofER brand',
      ],
      tools: ['Company handbook', 'ID badge', 'Company uniform'],
      materials: [
        'Training materials',
        'Company policies',
        'Benefits information',
      ],
      timeEstimate: '4 hours',
      difficulty: 'Beginner',
      prerequisites: ['None - starting point for all new hires'],
    },

    module2: {
      title: 'Safety Protocols & Best Practices',
      description:
        'Comprehensive safety training covering OSHA requirements, fall protection, and hazard identification',
      keyPoints: [
        'OSHA fall protection required at 6 feet or higher',
        'Personal Fall Arrest Systems (PFAS) must be inspected daily',
        'Three-point contact rule when climbing ladders',
        'Proper PPE includes hard hat, safety glasses, work boots, and gloves',
        'Weather conditions assessment before starting work',
        'Hazard identification and communication protocols',
        'Emergency response procedures and first aid basics',
      ],
      safetyNotes: [
        'Never work on wet or icy roofs',
        'Inspect all safety equipment before each use',
        'Maintain three points of contact on ladders at all times',
        'Use proper fall protection systems above 6 feet',
        'Stop work immediately if conditions become unsafe',
      ],
      commonMistakes: [
        'Skipping daily safety equipment inspection',
        'Working in unsafe weather conditions',
        'Improper ladder placement and angle',
        'Not wearing required PPE',
        'Ignoring safety protocols to save time',
      ],
      bestPractices: [
        'Conduct toolbox talks every morning',
        'Use buddy system for hazardous tasks',
        'Document all safety incidents and near misses',
        'Regularly update safety training and certifications',
        'Keep first aid kit easily accessible',
      ],
      tools: [
        'Safety harness and lanyard',
        'Hard hat with chin strap',
        'Safety glasses with side shields',
        'Work boots with slip-resistant soles',
        'Work gloves with good grip',
      ],
      materials: [
        'OSHA safety guidelines',
        'Company safety manual',
        'Incident report forms',
        'First aid supplies',
      ],
      timeEstimate: '8 hours',
      difficulty: 'Beginner',
      prerequisites: ['Module 1 completion'],
    },

    module3: {
      title: 'Customer Service Excellence',
      description:
        'Building strong customer relationships through professional communication and service delivery',
      keyPoints: [
        'First impressions set the tone for entire project relationship',
        'Active listening helps understand customer concerns and needs',
        'Clear communication prevents misunderstandings and conflicts',
        'Professional appearance and conduct reflects company values',
        'Follow-up after project completion ensures customer satisfaction',
        'Handle complaints promptly and professionally',
        'Exceed expectations whenever possible',
      ],
      safetyNotes: [
        'Maintain safe work practices even when customers are watching',
        'Explain safety procedures to customers for their understanding',
        'Keep work areas clean and safe for customer access',
      ],
      commonMistakes: [
        'Not listening carefully to customer concerns',
        'Making promises without checking with supervisors',
        'Poor communication about project timeline',
        'Leaving work areas messy or unsafe',
        'Not following up after project completion',
      ],
      bestPractices: [
        'Introduce yourself and your role to customers',
        'Explain work processes and timeline clearly',
        'Keep customers informed of progress daily',
        'Address concerns immediately and honestly',
        'Document all customer interactions',
      ],
      tools: [
        'Customer communication log',
        'Project timeline template',
        'Business cards',
        'Company uniform and ID',
      ],
      materials: [
        'Customer service guidelines',
        'Communication templates',
        'Feedback forms',
        'Company brochures',
      ],
      timeEstimate: '6 hours',
      difficulty: 'Beginner',
      prerequisites: ['Module 1 completion'],
    },

    module4: {
      title: 'Sales Fundamentals',
      description:
        'Consultative selling approach, needs assessment, and building trust with potential customers',
      keyPoints: [
        'Consultative selling focuses on customer needs, not just making a sale',
        'Ask open-ended questions to understand customer priorities',
        'Present solutions that address specific customer concerns',
        'Build trust through expertise and honest recommendations',
        'Handle objections by addressing underlying concerns',
        'Follow up consistently to maintain relationships',
        'Use visual aids and testimonials to support your presentation',
      ],
      safetyNotes: [
        'Conduct safe roof inspections when assessing customer needs',
        'Use proper safety equipment during sales presentations',
        'Never compromise safety to impress customers',
      ],
      commonMistakes: [
        'Talking too much instead of listening',
        'Pressuring customers to make quick decisions',
        'Not understanding customer budget constraints',
        "Overselling features customers don't need",
        'Poor follow-up after initial presentation',
      ],
      bestPractices: [
        'Prepare thoroughly for each sales presentation',
        'Use photos and examples relevant to customer situation',
        'Provide detailed, written estimates and timelines',
        'Be honest about challenges and limitations',
        'Follow up within 24 hours of every interaction',
      ],
      tools: [
        'Tablet or laptop for presentations',
        'Digital camera for documentation',
        'Measuring tape and inspection tools',
        'Sample materials and brochures',
      ],
      materials: [
        'Sales presentation templates',
        'Product catalogs and specifications',
        'Customer testimonials and references',
        'Financing options information',
      ],
      timeEstimate: '8 hours',
      difficulty: 'Intermediate',
      prerequisites: ['Module 1 and Module 3 completion'],
    },

    module5: {
      title: 'CRM & Technology',
      description:
        'Digital tools for project management, customer communication, and business efficiency',
      keyPoints: [
        'CRM systems help track customer interactions and project status',
        'Project management apps improve scheduling and resource allocation',
        'Digital documentation reduces paperwork and improves accuracy',
        'Mobile apps enable real-time updates from job sites',
        'Cloud storage ensures data backup and accessibility',
        'Communication platforms keep teams connected',
        'Analytics tools help measure performance and identify improvements',
      ],
      safetyNotes: [
        "Don't use devices in unsafe locations or conditions",
        'Secure devices to prevent drops from height',
        'Keep devices dry and protected from weather',
      ],
      commonMistakes: [
        'Not backing up important data regularly',
        'Using personal devices for company business',
        'Poor data security practices',
        'Not updating software regularly',
        'Inconsistent data entry practices',
      ],
      bestPractices: [
        'Enter data immediately while details are fresh',
        'Use standardized formats for consistency',
        'Regularly backup important information',
        'Keep software updated for security and features',
        'Train all team members on system usage',
      ],
      tools: [
        'CRM software (Salesforce, HubSpot)',
        'Project management apps (Monday, Asana)',
        'Communication platforms (Slack, Teams)',
        'Documentation apps (Google Drive, Dropbox)',
      ],
      materials: [
        'Software training guides',
        'Data entry standards',
        'Security protocols',
        'System troubleshooting guides',
      ],
      timeEstimate: '6 hours',
      difficulty: 'Intermediate',
      prerequisites: ['Module 1 completion', 'Basic computer skills'],
    },

    module6: {
      title: 'Product Knowledge',
      description:
        'Comprehensive understanding of roofing materials, specifications, and applications',
      keyPoints: [
        'Asphalt shingles are most common: 3-tab, architectural, luxury',
        'Metal roofing offers durability: steel, aluminum, copper options',
        'Tile roofing provides longevity: clay, concrete, slate varieties',
        'Underlayment options: felt, synthetic, ice and water shield',
        'Flashing materials: aluminum, galvanized steel, copper',
        'Ventilation systems: ridge vents, soffit vents, exhaust fans',
        'Warranty terms vary by manufacturer and installation quality',
      ],
      safetyNotes: [
        'Handle materials carefully to prevent cuts and injuries',
        'Use proper lifting techniques for heavy materials',
        'Store materials securely to prevent wind damage',
      ],
      commonMistakes: [
        'Not matching materials to climate conditions',
        'Mixing incompatible material types',
        'Insufficient ventilation planning',
        'Poor material storage leading to damage',
        'Not understanding warranty requirements',
      ],
      bestPractices: [
        'Match materials to local climate and building codes',
        'Keep updated product specification sheets',
        'Understand installation requirements for each material',
        'Calculate materials accurately to minimize waste',
        'Store materials properly to maintain quality',
      ],
      tools: [
        'Material specification guides',
        'Product samples for demonstration',
        'Manufacturer catalogs',
        'Installation guides',
      ],
      materials: [
        'Shingle samples of various types',
        'Underlayment samples',
        'Flashing examples',
        'Ventilation product catalogs',
      ],
      timeEstimate: '10 hours',
      difficulty: 'Intermediate',
      prerequisites: ['Module 1 completion'],
    },

    module7: {
      title: 'Measurement & Estimation',
      description:
        'Accurate roof measurement techniques and material estimation for project planning',
      keyPoints: [
        'Roof area calculation: length × width × pitch factor',
        'Pitch measurement using level and measuring tape',
        'Complex roof geometry requires breaking into sections',
        'Add 10-15% waste factor for cuts and mistakes',
        'Account for starter strips, ridge caps, and hip materials',
        'Include flashing, underlayment, and fastener quantities',
        'Document measurements with sketches and photos',
      ],
      safetyNotes: [
        'Use proper fall protection when measuring on roofs',
        'Avoid measuring in wet or windy conditions',
        'Have spotter when using ladders for measurements',
      ],
      commonMistakes: [
        'Forgetting to account for roof pitch in calculations',
        'Insufficient waste factor leading to material shortages',
        'Not measuring complex roof sections accurately',
        'Failing to document measurements properly',
        'Underestimating accessories and trim pieces',
      ],
      bestPractices: [
        'Use satellite imagery and ground measurements when possible',
        'Double-check calculations with different methods',
        'Create detailed sketches with all dimensions',
        'Take photos to document roof conditions',
        'Use standardized estimation worksheets',
      ],
      tools: [
        'Measuring tape (100ft minimum)',
        'Digital pitch gauge',
        'Calculator or estimation app',
        'Sketch pad and pencils',
        'Digital camera',
      ],
      materials: [
        'Estimation worksheets',
        'Pitch factor charts',
        'Material coverage guides',
        'Waste factor guidelines',
      ],
      timeEstimate: '8 hours',
      difficulty: 'Intermediate',
      prerequisites: ['Module 6 completion', 'Basic math skills'],
    },

    module8: {
      title: 'Installation Basics',
      description:
        'Step-by-step installation processes, tool usage, and quality control procedures',
      keyPoints: [
        'Roof preparation: inspect deck, repair damage, install underlayment',
        'Proper nail placement: 6 nails per shingle, correct penetration depth',
        'Shingle alignment: use chalk lines, maintain straight rows',
        'Flashing installation: step flashing, valley flashing, chimney details',
        'Ridge cap installation: proper overlap and fastening',
        'Quality control: inspect each section before moving on',
        'Clean-up: remove debris, protect landscaping, final inspection',
      ],
      safetyNotes: [
        'Maintain three points of contact when handling materials',
        'Use proper nail gun safety procedures',
        'Watch for power lines when moving long materials',
        'Secure loose materials against wind',
      ],
      commonMistakes: [
        'Improper nail placement causing leaks',
        'Poor shingle alignment creating wavy appearance',
        'Inadequate flashing leading to water intrusion',
        'Rushing installation compromising quality',
        'Insufficient clean-up leaving safety hazards',
      ],
      bestPractices: [
        'Follow manufacturer installation guidelines exactly',
        'Inspect work regularly for quality and alignment',
        'Take progress photos for documentation',
        'Keep work area clean and organized',
        'Test all flashing details thoroughly',
      ],
      tools: [
        'Pneumatic nail gun',
        'Utility knife with sharp blades',
        'Chalk line for alignment',
        'Tin snips for cutting materials',
        'Hammer for hand nailing',
      ],
      materials: [
        'Roofing nails (proper length)',
        'Shingles and accessories',
        'Underlayment materials',
        'Flashing and sealants',
        'Ridge cap shingles',
      ],
      timeEstimate: '16 hours',
      difficulty: 'Advanced',
      prerequisites: ['Modules 2, 6, and 7 completion'],
    },

    module9: {
      title: 'Advanced Roofing Techniques',
      description:
        'Complex installations, specialty materials, and advanced repair methods',
      keyPoints: [
        'Complex roof geometries: dormers, valleys, intersections',
        'Specialty materials: slate, tile, metal panel installation',
        'Advanced flashing techniques: soldering, welding, membrane systems',
        'Structural repairs: deck replacement, rafter reinforcement',
        'Waterproofing systems: EPDM, TPO, modified bitumen',
        'Historic restoration: matching existing materials and methods',
        'Green roofing: living roofs, solar integration, energy efficiency',
      ],
      safetyNotes: [
        'Complex installations require additional safety planning',
        'Use specialized equipment for heavy materials like slate',
        'Be extra cautious with power tools in challenging positions',
        'Plan material handling for difficult access areas',
      ],
      commonMistakes: [
        'Attempting complex work without adequate experience',
        'Not planning material logistics for difficult installations',
        'Rushing complex details that require precision',
        'Inadequate structural assessment before repairs',
        'Not consulting with engineers on structural modifications',
      ],
      bestPractices: [
        'Get additional training for specialty materials',
        'Plan complex installations with experienced supervision',
        'Use proper equipment for each material type',
        'Document unusual conditions and solutions',
        'Maintain ongoing education on new techniques',
      ],
      tools: [
        'Specialized fasteners for each material',
        'Soldering equipment for metal work',
        'Heavy-duty lifting equipment',
        'Precision cutting tools',
        'Structural assessment tools',
      ],
      materials: [
        'Specialty roofing materials',
        'Advanced flashing systems',
        'Structural reinforcement materials',
        'Waterproofing membranes',
        'Energy-efficient components',
      ],
      timeEstimate: '20 hours',
      difficulty: 'Advanced',
      prerequisites: ['Module 8 completion', '2+ years experience'],
    },

    module10: {
      title: 'Business Development',
      description:
        'Growing your career and business opportunities in the roofing industry',
      keyPoints: [
        'Lead generation: referrals, networking, digital marketing',
        'Building professional reputation through quality work',
        'Continuing education: certifications, industry training',
        'Business planning: licensing, insurance, financial management',
        'Team building: hiring, training, leadership development',
        'Customer retention: follow-up, maintenance programs',
        'Industry involvement: associations, trade shows, networking',
      ],
      safetyNotes: [
        'Maintain safety standards as business grows',
        'Ensure all team members receive proper safety training',
        'Stay current with safety regulations and requirements',
      ],
      commonMistakes: [
        'Growing too fast without proper systems',
        'Not investing in ongoing training and development',
        'Poor financial planning and cash flow management',
        'Neglecting customer relationships after project completion',
        'Not building strong professional networks',
      ],
      bestPractices: [
        'Develop systematic approach to business growth',
        'Invest in professional development continuously',
        'Build strong relationships with suppliers and partners',
        'Maintain excellent customer service as you grow',
        'Plan for seasonal fluctuations in roofing work',
      ],
      tools: [
        'Business planning software',
        'Customer relationship management system',
        'Financial tracking tools',
        'Marketing materials and website',
        'Professional development resources',
      ],
      materials: [
        'Business license applications',
        'Insurance policy information',
        'Marketing templates',
        'Financial planning worksheets',
        'Industry association memberships',
      ],
      timeEstimate: '12 hours',
      difficulty: 'Advanced',
      prerequisites: ['All previous modules', '3+ years experience'],
    },
  },

  safetyProtocols: [
    'Always wear appropriate personal protective equipment (PPE)',
    'Inspect all safety equipment before each use',
    'Maintain three points of contact when climbing',
    'Use fall protection systems at heights of 6 feet or more',
    'Never work on wet, icy, or excessively windy conditions',
    'Establish safe work zones and communicate with team members',
    'Keep first aid supplies readily available',
    'Report all accidents and near-misses immediately',
    'Follow lockout/tagout procedures for electrical work',
    'Use proper lifting techniques to prevent back injury',
  ],

  bestPractices: [
    'Plan each project thoroughly before starting work',
    'Communicate regularly with customers about progress',
    'Document all work with photos and detailed notes',
    'Follow manufacturer installation guidelines exactly',
    'Inspect work quality at each step of the process',
    'Keep work areas clean and organized',
    'Dispose of materials responsibly',
    'Maintain tools and equipment in good working condition',
    'Continue learning through training and industry resources',
    'Build positive relationships with suppliers and subcontractors',
  ],

  commonMaterials: {
    asphalt_shingles: {
      '3_tab': {
        coverage: '33.3 sq ft per bundle',
        weight: '50-65 lbs per bundle',
      },
      architectural: {
        coverage: '32.8 sq ft per bundle',
        weight: '65-80 lbs per bundle',
      },
      luxury: {
        coverage: '25-33 sq ft per bundle',
        weight: '80-120 lbs per bundle',
      },
    },
    underlayment: {
      felt_15lb: { coverage: '400 sq ft per roll', weight: '27 lbs per roll' },
      felt_30lb: { coverage: '200 sq ft per roll', weight: '27 lbs per roll' },
      synthetic: {
        coverage: '1000-1500 sq ft per roll',
        weight: '25-35 lbs per roll',
      },
    },
    metal_roofing: {
      steel_panels: {
        coverage: 'varies by profile',
        weight: '1-3 lbs per sq ft',
      },
      aluminum_shingles: {
        coverage: '100 sq ft per square',
        weight: '45-70 lbs per square',
      },
    },
  },

  tools: {
    basic_hand_tools: [
      'Hammer (16-20 oz with magnetic head)',
      'Utility knife with replaceable blades',
      'Chalk line with blue chalk',
      'Measuring tape (25-35 ft)',
      'Tin snips (straight and curved)',
      'Pry bar for removal work',
      'Level (2-4 ft for checking slopes)',
    ],
    power_tools: [
      'Pneumatic nail gun (coil or strip feed)',
      'Air compressor (portable, 6+ gallon tank)',
      'Circular saw with carbide blade',
      'Reciprocating saw for cutting',
      'Drill/driver for fasteners',
    ],
    safety_equipment: [
      'Safety harness with D-rings',
      'Lanyard and shock absorber',
      'Hard hat with chin strap',
      'Safety glasses with side shields',
      'Work boots with slip-resistant soles',
      'Work gloves with good grip',
    ],
  },

  weatherConsiderations: {
    ideal_conditions: [
      'Temperature between 45-85°F',
      'Low humidity for proper sealing',
      'Light winds under 25 mph',
      'No precipitation for 24 hours before/after',
      'Good visibility for safety',
    ],
    avoid_working_in: [
      'Temperatures below 45°F (shingles become brittle)',
      'High winds over 25 mph',
      'Rain, snow, or ice conditions',
      'Extreme heat over 90°F (materials too hot)',
      'Poor visibility due to fog or storms',
    ],
    seasonal_planning: [
      'Spring: peak season, plan for busy schedule',
      'Summer: hot weather requires early starts',
      'Fall: ideal conditions, prepare for winter',
      'Winter: emergency repairs only in most climates',
    ],
  },

  buildingCodes: {
    general_requirements: [
      'Follow local building codes and permit requirements',
      'Use materials rated for local wind and snow loads',
      'Install proper ventilation per code requirements',
      'Meet fire rating requirements for roof assemblies',
      'Follow setback requirements for roof equipment',
    ],
    common_regional_variations: [
      'Hurricane zones: enhanced fastening requirements',
      'Snow load areas: reinforced structural requirements',
      'Fire zones: specific material and clearance requirements',
      'Seismic areas: flexible connections and details',
    ],
  },

  emergencyProcedures: [
    'Call 911 for serious injuries or emergencies',
    'Provide first aid within your training level',
    'Evacuate area if structural damage is suspected',
    'Document incident details as soon as safe to do so',
    'Notify supervisor and safety officer immediately',
    'Preserve accident scene for investigation if possible',
    'Follow company reporting procedures',
    'Cooperate with emergency responders and investigators',
  ],

  industryStandards: [
    'NRCA (National Roofing Contractors Association) guidelines',
    'OSHA safety regulations for construction',
    'Local building codes and permit requirements',
    'Manufacturer installation specifications',
    'Insurance industry recommendations',
    'Energy efficiency standards (ENERGY STAR)',
    'Environmental regulations for material disposal',
    'Professional certification programs (GAF, CertainTeed, etc.)',
  ],
};

export default roofingKnowledgeBase;
