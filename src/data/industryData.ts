export interface MaterialCostData {
  material: string;
  category:
    | 'shingles'
    | 'underlayment'
    | 'flashing'
    | 'accessories'
    | 'fasteners';
  unit: string;
  averageCost: number;
  priceRange: {
    low: number;
    high: number;
  };
  lastUpdated: string;
  supplier: string;
  qualityGrade: 'Economy' | 'Standard' | 'Premium' | 'Luxury';
  warranty: string;
  region: string;
}

export interface BuildingCode {
  jurisdiction: string;
  codeType: 'residential' | 'commercial' | 'specialty';
  requirement: string;
  description: string;
  effectiveDate: string;
  section: string;
  windLoad: number;
  snowLoad: number;
  seismicZone: string;
  fireRating: string;
}

export interface WeatherPattern {
  region: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  averageTemperature: {
    high: number;
    low: number;
  };
  precipitation: {
    rainfall: number;
    snowfall: number;
    frequency: number;
  };
  windPatterns: {
    averageSpeed: number;
    maxSpeed: number;
    direction: string;
  };
  workableDays: number;
  bestWorkingConditions: string[];
  challengingConditions: string[];
}

export interface InsuranceClaim {
  claimType: 'wind' | 'hail' | 'ice' | 'water' | 'fire' | 'other';
  frequency: number;
  averageCost: number;
  region: string;
  season: string;
  year: number;
  commonCauses: string[];
  preventionMeasures: string[];
  documentation: string[];
}

export interface Certification {
  name: string;
  provider: string;
  type: 'manufacturer' | 'industry' | 'safety' | 'business';
  duration: string;
  cost: number;
  requirements: string[];
  benefits: string[];
  renewalPeriod: string;
  onlineAvailable: boolean;
  careerImpact: string;
}

export interface MarketTrend {
  trend: string;
  category:
    | 'technology'
    | 'materials'
    | 'labor'
    | 'regulations'
    | 'customer_preferences';
  impactLevel: 'low' | 'medium' | 'high';
  timeframe: 'short_term' | 'medium_term' | 'long_term';
  description: string;
  businessImplications: string[];
  adaptationStrategies: string[];
  dataSources: string[];
}

// Current material costs (updated quarterly)
export const materialCosts: MaterialCostData[] = [
  {
    material: 'Architectural Asphalt Shingles',
    category: 'shingles',
    unit: 'per square (100 sq ft)',
    averageCost: 150,
    priceRange: { low: 120, high: 250 },
    lastUpdated: '2024-01-15',
    supplier: 'GAF/Owens Corning',
    qualityGrade: 'Standard',
    warranty: '25-30 years',
    region: 'National Average',
  },
  {
    material: 'Luxury Architectural Shingles',
    category: 'shingles',
    unit: 'per square',
    averageCost: 280,
    priceRange: { low: 220, high: 400 },
    lastUpdated: '2024-01-15',
    supplier: 'CertainTeed/Tamko',
    qualityGrade: 'Premium',
    warranty: '50 years',
    region: 'National Average',
  },
  {
    material: 'Three-Tab Asphalt Shingles',
    category: 'shingles',
    unit: 'per square',
    averageCost: 95,
    priceRange: { low: 75, high: 120 },
    lastUpdated: '2024-01-15',
    supplier: 'Various',
    qualityGrade: 'Economy',
    warranty: '20-25 years',
    region: 'National Average',
  },
  {
    material: 'Metal Standing Seam Panels',
    category: 'shingles',
    unit: 'per square',
    averageCost: 450,
    priceRange: { low: 350, high: 650 },
    lastUpdated: '2024-01-15',
    supplier: 'Metal manufacturers',
    qualityGrade: 'Premium',
    warranty: '40-50 years',
    region: 'National Average',
  },
  {
    material: 'Synthetic Underlayment',
    category: 'underlayment',
    unit: 'per roll (1000 sq ft)',
    averageCost: 85,
    priceRange: { low: 65, high: 110 },
    lastUpdated: '2024-01-15',
    supplier: 'GAF/Grace',
    qualityGrade: 'Standard',
    warranty: 'Material only',
    region: 'National Average',
  },
  {
    material: '#15 Felt Paper',
    category: 'underlayment',
    unit: 'per roll (400 sq ft)',
    averageCost: 35,
    priceRange: { low: 25, high: 45 },
    lastUpdated: '2024-01-15',
    supplier: 'Various',
    qualityGrade: 'Economy',
    warranty: 'None',
    region: 'National Average',
  },
  {
    material: 'Ice & Water Shield',
    category: 'underlayment',
    unit: 'per roll (200 sq ft)',
    averageCost: 95,
    priceRange: { low: 75, high: 120 },
    lastUpdated: '2024-01-15',
    supplier: 'Grace/GAF',
    qualityGrade: 'Premium',
    warranty: 'Material only',
    region: 'National Average',
  },
  {
    material: 'Aluminum Step Flashing',
    category: 'flashing',
    unit: 'per linear foot',
    averageCost: 2.5,
    priceRange: { low: 1.8, high: 3.5 },
    lastUpdated: '2024-01-15',
    supplier: 'Various',
    qualityGrade: 'Standard',
    warranty: 'None',
    region: 'National Average',
  },
  {
    material: 'Copper Step Flashing',
    category: 'flashing',
    unit: 'per linear foot',
    averageCost: 4.75,
    priceRange: { low: 3.5, high: 6.5 },
    lastUpdated: '2024-01-15',
    supplier: 'Various',
    qualityGrade: 'Premium',
    warranty: 'None',
    region: 'National Average',
  },
  {
    material: 'Ridge Vent',
    category: 'accessories',
    unit: 'per linear foot',
    averageCost: 8.5,
    priceRange: { low: 6.0, high: 12.0 },
    lastUpdated: '2024-01-15',
    supplier: 'Air Vent/GAF',
    qualityGrade: 'Standard',
    warranty: '20-25 years',
    region: 'National Average',
  },
  {
    material: 'Roofing Nails (1.25" Smooth)',
    category: 'fasteners',
    unit: 'per 50 lb box',
    averageCost: 45,
    priceRange: { low: 35, high: 65 },
    lastUpdated: '2024-01-15',
    supplier: 'Various',
    qualityGrade: 'Standard',
    warranty: 'None',
    region: 'National Average',
  },
];

// Regional building codes
export const buildingCodes: BuildingCode[] = [
  {
    jurisdiction: 'Florida',
    codeType: 'residential',
    requirement: 'High Velocity Hurricane Zone (HVHZ)',
    description:
      'Enhanced fastening requirements for shingles in hurricane-prone areas',
    effectiveDate: '2020-01-01',
    section: 'FBC 1507.2.8.1',
    windLoad: 180,
    snowLoad: 0,
    seismicZone: 'Low',
    fireRating: 'Class A',
  },
  {
    jurisdiction: 'California',
    codeType: 'residential',
    requirement: 'Wildfire-Urban Interface (WUI)',
    description: 'Fire-resistant materials and clearances required',
    effectiveDate: '2023-01-01',
    section: 'CBC Chapter 7A',
    windLoad: 110,
    snowLoad: 0,
    seismicZone: 'High',
    fireRating: 'Class A Required',
  },
  {
    jurisdiction: 'Colorado',
    codeType: 'residential',
    requirement: 'Snow Load Requirements',
    description: 'Enhanced structural requirements for snow loading',
    effectiveDate: '2019-01-01',
    section: 'IECC 1608',
    windLoad: 115,
    snowLoad: 30,
    seismicZone: 'Medium',
    fireRating: 'Class A',
  },
  {
    jurisdiction: 'Texas',
    codeType: 'commercial',
    requirement: 'Wind Uplift Resistance',
    description: 'FM approval required for commercial roofing systems',
    effectiveDate: '2021-01-01',
    section: 'IBC 1504',
    windLoad: 140,
    snowLoad: 0,
    seismicZone: 'Low',
    fireRating: 'Class A',
  },
  {
    jurisdiction: 'New York',
    codeType: 'residential',
    requirement: 'Energy Efficiency Standards',
    description: 'Minimum R-value requirements for roof insulation',
    effectiveDate: '2022-01-01',
    section: 'NYCECC C402',
    windLoad: 110,
    snowLoad: 40,
    seismicZone: 'Low',
    fireRating: 'Class A',
  },
];

// Weather patterns by region
export const weatherPatterns: WeatherPattern[] = [
  {
    region: 'Southeast (FL, GA, SC)',
    season: 'summer',
    averageTemperature: { high: 90, low: 75 },
    precipitation: { rainfall: 7.2, snowfall: 0, frequency: 15 },
    windPatterns: { averageSpeed: 8, maxSpeed: 75, direction: 'Southeast' },
    workableDays: 20,
    bestWorkingConditions: ['Early morning', 'Late afternoon'],
    challengingConditions: [
      'High humidity',
      'Afternoon thunderstorms',
      'Hurricane season',
    ],
  },
  {
    region: 'Southeast (FL, GA, SC)',
    season: 'winter',
    averageTemperature: { high: 68, low: 45 },
    precipitation: { rainfall: 2.8, snowfall: 0, frequency: 8 },
    windPatterns: { averageSpeed: 10, maxSpeed: 35, direction: 'North' },
    workableDays: 25,
    bestWorkingConditions: [
      'Mild temperatures',
      'Low humidity',
      'Stable weather',
    ],
    challengingConditions: ['Cold fronts', 'Occasional ice'],
  },
  {
    region: 'Northeast (NY, PA, NJ)',
    season: 'summer',
    averageTemperature: { high: 82, low: 65 },
    precipitation: { rainfall: 4.1, snowfall: 0, frequency: 12 },
    windPatterns: { averageSpeed: 7, maxSpeed: 45, direction: 'Southwest' },
    workableDays: 26,
    bestWorkingConditions: ['Moderate temperatures', 'Low precipitation'],
    challengingConditions: ['Heat waves', 'Thunderstorms', 'High UV'],
  },
  {
    region: 'Northeast (NY, PA, NJ)',
    season: 'winter',
    averageTemperature: { high: 38, low: 22 },
    precipitation: { rainfall: 2.9, snowfall: 12.5, frequency: 16 },
    windPatterns: { averageSpeed: 12, maxSpeed: 55, direction: 'Northwest' },
    workableDays: 8,
    bestWorkingConditions: ['Occasional warm days', 'Dry conditions'],
    challengingConditions: [
      'Snow and ice',
      'Freezing temperatures',
      'Strong winds',
    ],
  },
  {
    region: 'Mountain West (CO, UT, WY)',
    season: 'summer',
    averageTemperature: { high: 78, low: 48 },
    precipitation: { rainfall: 1.8, snowfall: 0, frequency: 12 },
    windPatterns: { averageSpeed: 9, maxSpeed: 65, direction: 'West' },
    workableDays: 28,
    bestWorkingConditions: [
      'Low humidity',
      'Clear skies',
      'Moderate temperatures',
    ],
    challengingConditions: [
      'High elevation effects',
      'Sudden weather changes',
      'UV exposure',
    ],
  },
  {
    region: 'Pacific Northwest (WA, OR)',
    season: 'summer',
    averageTemperature: { high: 75, low: 55 },
    precipitation: { rainfall: 0.9, snowfall: 0, frequency: 5 },
    windPatterns: { averageSpeed: 6, maxSpeed: 25, direction: 'West' },
    workableDays: 30,
    bestWorkingConditions: [
      'Dry season',
      'Mild temperatures',
      'Stable conditions',
    ],
    challengingConditions: ['Wildfire smoke', 'Occasional heat waves'],
  },
  {
    region: 'Pacific Northwest (WA, OR)',
    season: 'winter',
    averageTemperature: { high: 45, low: 35 },
    precipitation: { rainfall: 5.8, snowfall: 2.1, frequency: 20 },
    windPatterns: { averageSpeed: 12, maxSpeed: 70, direction: 'Southwest' },
    workableDays: 6,
    bestWorkingConditions: ['Brief dry periods'],
    challengingConditions: [
      'Constant rain',
      'High winds',
      'Flooding potential',
    ],
  },
];

// Insurance claim data
export const insuranceClaims: InsuranceClaim[] = [
  {
    claimType: 'wind',
    frequency: 35,
    averageCost: 8500,
    region: 'Southeast',
    season: 'summer',
    year: 2023,
    commonCauses: ['Hurricane damage', 'High wind events', 'Tornado damage'],
    preventionMeasures: [
      'Proper fastening',
      'Impact-resistant materials',
      'Regular inspections',
    ],
    documentation: ['Wind speed data', 'Damage photos', 'Installation records'],
  },
  {
    claimType: 'hail',
    frequency: 28,
    averageCost: 12500,
    region: 'Central Plains',
    season: 'spring',
    year: 2023,
    commonCauses: ['Large hail stones', 'Severe thunderstorms'],
    preventionMeasures: ['Impact-resistant shingles', 'Protective screens'],
    documentation: [
      'Hail size measurements',
      'Weather reports',
      'Impact damage photos',
    ],
  },
  {
    claimType: 'ice',
    frequency: 15,
    averageCost: 9800,
    region: 'Northeast',
    season: 'winter',
    year: 2023,
    commonCauses: ['Ice dams', 'Freeze-thaw cycles', 'Heavy ice loads'],
    preventionMeasures: [
      'Proper insulation',
      'Ice and water shield',
      'Adequate ventilation',
    ],
    documentation: [
      'Temperature logs',
      'Ice thickness measurements',
      'Interior damage photos',
    ],
  },
  {
    claimType: 'water',
    frequency: 22,
    averageCost: 15200,
    region: 'National',
    season: 'all',
    year: 2023,
    commonCauses: [
      'Flashing failure',
      'Penetration leaks',
      'Age-related deterioration',
    ],
    preventionMeasures: [
      'Quality installation',
      'Regular maintenance',
      'Proper flashing',
    ],
    documentation: [
      'Leak source identification',
      'Water damage extent',
      'Age verification',
    ],
  },
];

// Industry certifications
export const certifications: Certification[] = [
  {
    name: 'GAF Master Elite Contractor',
    provider: 'GAF Materials Corporation',
    type: 'manufacturer',
    duration: '2-3 days',
    cost: 500,
    requirements: [
      'Proper licensing',
      'Insurance requirements',
      'Training completion',
    ],
    benefits: ['Extended warranties', 'Marketing support', 'Priority support'],
    renewalPeriod: '2 years',
    onlineAvailable: true,
    careerImpact: 'Increases customer confidence and warranty options',
  },
  {
    name: 'CertainTeed SELECT ShingleMaster',
    provider: 'CertainTeed Corporation',
    type: 'manufacturer',
    duration: '1-2 days',
    cost: 350,
    requirements: [
      'Business verification',
      'Training completion',
      'Insurance proof',
    ],
    benefits: [
      'Enhanced warranties',
      'Technical support',
      'Marketing materials',
    ],
    renewalPeriod: '3 years',
    onlineAvailable: true,
    careerImpact: 'Demonstrates product expertise and quality commitment',
  },
  {
    name: 'NRCA Professional Roofer Certification',
    provider: 'National Roofing Contractors Association',
    type: 'industry',
    duration: '40 hours',
    cost: 1200,
    requirements: [
      '2+ years experience',
      'Exam completion',
      'Continuing education',
    ],
    benefits: [
      'Industry recognition',
      'Career advancement',
      'Knowledge validation',
    ],
    renewalPeriod: '5 years',
    onlineAvailable: false,
    careerImpact: 'Industry-recognized professional credential',
  },
  {
    name: 'OSHA 30-Hour Construction Safety',
    provider: 'Occupational Safety and Health Administration',
    type: 'safety',
    duration: '30 hours',
    cost: 200,
    requirements: ['None - entry level'],
    benefits: ['Safety knowledge', 'Compliance', 'Reduced liability'],
    renewalPeriod: '3 years recommended',
    onlineAvailable: true,
    careerImpact: 'Essential for supervisory roles and safety compliance',
  },
  {
    name: 'Roofing Industry Alliance Safety Certification',
    provider: 'Roofing Industry Alliance for Safety',
    type: 'safety',
    duration: '8 hours',
    cost: 150,
    requirements: ['Basic roofing knowledge'],
    benefits: [
      'Safety best practices',
      'Accident reduction',
      'Insurance benefits',
    ],
    renewalPeriod: '2 years',
    onlineAvailable: true,
    careerImpact: 'Demonstrates commitment to safety excellence',
  },
  {
    name: 'Contractors License (varies by state)',
    provider: 'State licensing boards',
    type: 'business',
    duration: 'Varies',
    cost: 800,
    requirements: ['Experience verification', 'Exam', 'Insurance', 'Bonding'],
    benefits: ['Legal compliance', 'Customer trust', 'Business legitimacy'],
    renewalPeriod: '1-3 years',
    onlineAvailable: false,
    careerImpact: 'Required for independent contracting and business ownership',
  },
];

// Current market trends
export const marketTrends: MarketTrend[] = [
  {
    trend: 'Solar Integration',
    category: 'technology',
    impactLevel: 'high',
    timeframe: 'medium_term',
    description:
      'Growing integration of solar panels with roofing systems, including solar shingles and BIPV',
    businessImplications: [
      'New revenue streams',
      'Additional training requirements',
      'Partnership opportunities with solar installers',
      'Premium pricing potential',
    ],
    adaptationStrategies: [
      'Invest in solar training and certification',
      'Partner with local solar companies',
      'Develop integrated service offerings',
      'Stay current with technology advances',
    ],
    dataSources: [
      'Solar Power World Magazine',
      'SEIA reports',
      'Industry surveys',
    ],
  },
  {
    trend: 'Smart Roofing Systems',
    category: 'technology',
    impactLevel: 'medium',
    timeframe: 'long_term',
    description:
      'Integration of IoT sensors, leak detection, and monitoring systems in roofing',
    businessImplications: [
      'Service differentiation opportunities',
      'Recurring revenue through monitoring',
      'Technology investment required',
      'New skill development needed',
    ],
    adaptationStrategies: [
      'Partner with IoT technology providers',
      'Develop monitoring service packages',
      'Train staff on smart systems',
      'Offer value-added services',
    ],
    dataSources: [
      'IoT industry reports',
      'Construction technology publications',
    ],
  },
  {
    trend: 'Labor Shortage',
    category: 'labor',
    impactLevel: 'high',
    timeframe: 'short_term',
    description:
      'Critical shortage of skilled roofing workers affecting project timelines and costs',
    businessImplications: [
      'Higher labor costs',
      'Extended project timelines',
      'Increased competition for workers',
      'Quality control challenges',
    ],
    adaptationStrategies: [
      'Invest heavily in training programs',
      'Improve compensation packages',
      'Enhance retention strategies',
      'Explore automation opportunities',
    ],
    dataSources: ['Bureau of Labor Statistics', 'NRCA workforce studies'],
  },
  {
    trend: 'Sustainable Materials',
    category: 'materials',
    impactLevel: 'high',
    timeframe: 'medium_term',
    description:
      'Increasing demand for eco-friendly, recyclable, and energy-efficient roofing materials',
    businessImplications: [
      'Premium pricing opportunities',
      'New product training required',
      'Marketing advantage',
      'Regulatory compliance benefits',
    ],
    adaptationStrategies: [
      'Develop expertise in green roofing',
      'Partner with sustainable material suppliers',
      'Obtain green building certifications',
      'Market environmental benefits',
    ],
    dataSources: ['Green Building Council', 'Sustainable construction reports'],
  },
  {
    trend: 'Extreme Weather Events',
    category: 'customer_preferences',
    impactLevel: 'high',
    timeframe: 'short_term',
    description:
      'Increasing frequency of severe weather driving demand for impact-resistant materials',
    businessImplications: [
      'Higher material costs',
      'Increased demand for upgrades',
      'Insurance requirement changes',
      'Emergency repair opportunities',
    ],
    adaptationStrategies: [
      'Stock impact-resistant materials',
      'Develop storm response capabilities',
      'Train on advanced installation techniques',
      'Build emergency service capacity',
    ],
    dataSources: [
      'NOAA climate data',
      'Insurance industry reports',
      'FEMA studies',
    ],
  },
  {
    trend: 'Digital Transformation',
    category: 'technology',
    impactLevel: 'medium',
    timeframe: 'short_term',
    description:
      'Adoption of digital tools for estimation, project management, and customer communication',
    businessImplications: [
      'Improved efficiency',
      'Better customer experience',
      'Technology investment required',
      'Staff training needs',
    ],
    adaptationStrategies: [
      'Implement comprehensive digital platforms',
      'Train all staff on digital tools',
      'Integrate systems for efficiency',
      'Use data for business insights',
    ],
    dataSources: [
      'Construction technology surveys',
      'Digital adoption studies',
    ],
  },
];

// Utility functions for data analysis
export class IndustryDataAnalyzer {
  // Get material costs by category
  static getMaterialCostsByCategory(category: string): MaterialCostData[] {
    return materialCosts.filter(material => material.category === category);
  }

  // Calculate project cost estimate
  static calculateProjectCost(
    projectSize: number,
    materials: string[]
  ): number {
    const relevantMaterials = materialCosts.filter(m =>
      materials.includes(m.material)
    );

    return relevantMaterials.reduce((total, material) => {
      return total + (material.averageCost * projectSize) / 100; // per square
    }, 0);
  }

  // Get regional building requirements
  static getBuildingCodesByRegion(region: string): BuildingCode[] {
    return buildingCodes.filter(code =>
      code.jurisdiction.toLowerCase().includes(region.toLowerCase())
    );
  }

  // Get seasonal weather patterns
  static getWeatherBySeason(
    region: string,
    season: string
  ): WeatherPattern | undefined {
    return weatherPatterns.find(
      pattern => pattern.region.includes(region) && pattern.season === season
    );
  }

  // Calculate optimal working days
  static getOptimalWorkingDays(region: string): number {
    const regionPatterns = weatherPatterns.filter(p =>
      p.region.includes(region)
    );
    return regionPatterns.reduce(
      (total, pattern) => total + pattern.workableDays,
      0
    );
  }

  // Get relevant certifications for career level
  static getCertificationsByCareerStage(
    stage: 'entry' | 'intermediate' | 'advanced' | 'management'
  ): Certification[] {
    switch (stage) {
      case 'entry':
        return certifications.filter(cert => cert.cost < 300);
      case 'intermediate':
        return certifications.filter(
          cert => cert.type === 'manufacturer' || cert.type === 'safety'
        );
      case 'advanced':
        return certifications.filter(cert => cert.type === 'industry');
      case 'management':
        return certifications.filter(cert => cert.type === 'business');
      default:
        return certifications;
    }
  }

  // Analyze insurance claim trends
  static getClaimTrendsByRegion(region: string): InsuranceClaim[] {
    return insuranceClaims.filter(
      claim =>
        claim.region.toLowerCase() === region.toLowerCase() ||
        claim.region === 'National'
    );
  }

  // Get market trends by impact level
  static getTrendsByImpact(
    impactLevel: 'low' | 'medium' | 'high'
  ): MarketTrend[] {
    return marketTrends.filter(trend => trend.impactLevel === impactLevel);
  }

  // Generate regional cost adjustments
  static getRegionalCostMultiplier(region: string): number {
    const multipliers: Record<string, number> = {
      northeast: 1.15,
      california: 1.25,
      florida: 1.1,
      texas: 1.05,
      midwest: 0.95,
      southeast: 1.0,
      mountain_west: 1.08,
      pacific_northwest: 1.12,
    };

    return multipliers[region.toLowerCase()] || 1.0;
  }

  // Get industry benchmarks
  static getIndustryBenchmarks(): {
    averageProjectValue: number;
    averageSquareFootCost: number;
    averageProjectDuration: number;
    customerSatisfactionRate: number;
    safetyIncidentRate: number;
  } {
    return {
      averageProjectValue: 12500,
      averageSquareFootCost: 8.5,
      averageProjectDuration: 3.2, // days
      customerSatisfactionRate: 0.87,
      safetyIncidentRate: 0.02, // incidents per 100 projects
    };
  }
}

const industryData = {
  materialCosts,
  buildingCodes,
  weatherPatterns,
  insuranceClaims,
  certifications,
  marketTrends,
  IndustryDataAnalyzer,
};

export default industryData;
