// Generate All Module Scripts for Training Leaders
require('dotenv').config();
const ScriptGenerator = require('./services/script-generator');
const fs = require('fs').promises;
const path = require('path');

// Training Leaders Module Definitions
const MODULES = [
  {
    number: 1,
    name: 'Roofing Fundamentals',
    learningObjectives: [
      'Identify different roofing materials and their applications',
      'Understand essential roofing terminology',
      'Recognize key components of a complete roofing system'
    ],
    keyConcepts: [
      {
        concept: 'Roofing Materials',
        details: 'Asphalt shingles, metal roofing, tile, and flat roofing systems. Each material has specific applications, benefits, and installation requirements.'
      },
      {
        concept: 'Roof Anatomy',
        details: 'Understanding deck, underlayment, ice and water shield, drip edge, flashing, shingles, and ventilation systems.'
      }
    ],
    keyTakeaways: [
      'Different types of roofing materials and their specific uses',
      'Essential roofing terminology for professional communication',
      'Components that work together in a complete roofing system'
    ]
  },
  {
    number: 2,
    name: 'Hail Damage Assessment',
    learningObjectives: [
      'Identify signs of hail damage on various roofing materials',
      'Understand impact assessment techniques',
      'Document damage for insurance claims'
    ],
    keyConcepts: [
      {
        concept: 'Hail Damage Identification',
        details: 'Hail damage appears as circular dents or dimples on shingles with granule loss. Look for bruising patterns and exposed fiberglass mat beneath granules.'
      },
      {
        concept: 'Impact Assessment',
        details: 'Determining the severity of hail damage based on size, density of impacts, and affected areas. Using test squares and proper documentation.'
      }
    ],
    keyTakeaways: [
      'How to identify various types of hail damage patterns',
      'Proper techniques for assessing impact severity',
      'Best practices for documenting damage for insurance'
    ]
  },
  {
    number: 3,
    name: 'Roof Inspection Techniques',
    learningObjectives: [
      'Perform comprehensive roof inspections',
      'Use proper inspection tools and equipment',
      'Create detailed inspection reports'
    ],
    keyConcepts: [
      {
        concept: 'Inspection Process',
        details: 'Systematic roof inspection from ground to ridge, checking flashing, valleys, penetrations, gutters, and overall condition. Using proper tools and safety equipment.'
      },
      {
        concept: 'Documentation Methods',
        details: 'Taking clear photos, making detailed notes, using inspection checklists, and creating professional reports for clients and insurance companies.'
      }
    ],
    keyTakeaways: [
      'Step-by-step process for comprehensive roof inspections',
      'Proper use of inspection tools and safety equipment',
      'Professional documentation and reporting techniques'
    ]
  },
  {
    number: 4,
    name: 'Safety and Compliance',
    learningObjectives: [
      'Understand OSHA safety requirements for roofing',
      'Use fall protection equipment properly',
      'Implement job site safety protocols'
    ],
    keyConcepts: [
      {
        concept: 'Fall Protection',
        details: 'Proper use of safety harnesses, anchor points, and fall arrest systems. OSHA requirements for working at heights and protecting workers from falls.'
      },
      {
        concept: 'Job Site Safety',
        details: 'Setting up safe work zones, ladder safety, electrical hazards, heat stress prevention, and emergency procedures on roofing projects.'
      }
    ],
    keyTakeaways: [
      'OSHA safety requirements and compliance standards',
      'Proper fall protection equipment and techniques',
      'Comprehensive job site safety protocols'
    ]
  },
  {
    number: 5,
    name: 'Customer Communication',
    learningObjectives: [
      'Communicate effectively with homeowners',
      'Present findings and recommendations clearly',
      'Handle objections and questions professionally'
    ],
    keyConcepts: [
      {
        concept: 'Client Presentations',
        details: 'Explaining damage findings in simple terms, using photos and diagrams, presenting options clearly, and answering questions with confidence and professionalism.'
      },
      {
        concept: 'Objection Handling',
        details: 'Addressing common homeowner concerns, explaining insurance processes, overcoming price objections, and maintaining professionalism in difficult conversations.'
      }
    ],
    keyTakeaways: [
      'Effective communication techniques with homeowners',
      'Professional presentation of findings and recommendations',
      'Strategies for handling objections and difficult conversations'
    ]
  },
  {
    number: 6,
    name: 'Insurance Claims Process',
    learningObjectives: [
      'Understand the insurance claims process',
      'Work effectively with adjusters',
      'Prepare accurate estimates and supplements'
    ],
    keyConcepts: [
      {
        concept: 'Claims Process',
        details: 'Understanding how insurance claims work, meeting with adjusters, documenting damage for coverage, and navigating the approval process.'
      },
      {
        concept: 'Estimating and Supplements',
        details: 'Creating accurate Xactimate estimates, identifying all necessary line items, writing effective supplements for additional damage, and negotiating with adjusters.'
      }
    ],
    keyTakeaways: [
      'Complete understanding of the insurance claims process',
      'Effective strategies for working with insurance adjusters',
      'Accurate estimating and supplement preparation techniques'
    ]
  },
  {
    number: 7,
    name: 'Sales Techniques',
    learningObjectives: [
      'Master the roofing sales process',
      'Build trust and rapport with clients',
      'Close sales effectively'
    ],
    keyConcepts: [
      {
        concept: 'Sales Process',
        details: 'Building rapport, identifying needs, presenting solutions, handling objections, and closing the sale. Understanding the buyer\'s journey from initial contact to signed contract.'
      },
      {
        concept: 'Value Proposition',
        details: 'Communicating your unique value, differentiating from competitors, justifying pricing, and building trust through expertise and professionalism.'
      }
    ],
    keyTakeaways: [
      'Complete sales process from first contact to close',
      'Building trust and rapport with potential clients',
      'Effective closing techniques and value communication'
    ]
  },
  {
    number: 8,
    name: 'Territory Management',
    learningObjectives: [
      'Organize and manage sales territory effectively',
      'Prioritize leads and opportunities',
      'Track activities and results'
    ],
    keyConcepts: [
      {
        concept: 'Lead Management',
        details: 'Organizing leads by priority, following up systematically, using CRM tools effectively, and maximizing conversion rates through proper lead management.'
      },
      {
        concept: 'Time Management',
        details: 'Planning daily routes efficiently, balancing prospecting with appointments, tracking activities, and maximizing productive time in the field.'
      }
    ],
    keyTakeaways: [
      'Effective territory organization and management',
      'Lead prioritization and systematic follow-up',
      'Time management and activity tracking for success'
    ]
  },
  {
    number: 9,
    name: 'Professional Development',
    learningObjectives: [
      'Set and achieve professional goals',
      'Develop continuous learning habits',
      'Build a successful roofing career'
    ],
    keyConcepts: [
      {
        concept: 'Goal Setting',
        details: 'Setting SMART goals for income, skills development, and career advancement. Creating action plans and tracking progress toward professional objectives.'
      },
      {
        concept: 'Continuous Learning',
        details: 'Staying current with industry changes, learning new skills, seeking mentorship, attending training, and building expertise over time.'
      }
    ],
    keyTakeaways: [
      'Setting and achieving meaningful professional goals',
      'Building continuous learning habits for growth',
      'Creating a sustainable, successful roofing career'
    ]
  }
];

async function generateAllScripts() {
  console.log('🎬 Generating All Training Leaders Video Scripts\n');
  console.log('=' .repeat(80));

  const generator = new ScriptGenerator(process.env.GROQ_API_KEY);
  const scriptsDir = path.join(__dirname, '../scripts');

  // Create scripts directory
  try {
    await fs.mkdir(scriptsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating scripts directory:', error.message);
  }

  const allScripts = [];
  let totalScripts = 0;
  const startTime = Date.now();

  for (const module of MODULES) {
    console.log(`\n📚 Module ${module.number}: ${module.name}`);
    console.log('-'.repeat(80));

    const moduleScripts = {
      module: module.number,
      name: module.name,
      intro: '',
      concepts: [],
      summary: ''
    };

    // Generate Intro
    try {
      console.log(`  🎤 Generating intro...`);
      const intro = await generator.generateModuleIntro(
        module.number,
        module.name,
        module.learningObjectives
      );
      moduleScripts.intro = intro;
      totalScripts++;
      console.log(`     ✅ Intro generated (${intro.split(' ').length} words)`);
    } catch (error) {
      console.log(`     ❌ Intro failed: ${error.message}`);
    }

    // Generate Concept Explainers
    for (const concept of module.keyConcepts) {
      try {
        console.log(`  🎓 Generating explainer: ${concept.concept}...`);
        const script = await generator.generateConceptExplainer(
          concept.concept,
          concept.details,
          90
        );
        moduleScripts.concepts.push({
          concept: concept.concept,
          script: script
        });
        totalScripts++;
        console.log(`     ✅ Explainer generated (${script.split(' ').length} words)`);
      } catch (error) {
        console.log(`     ❌ Explainer failed: ${error.message}`);
      }
    }

    // Generate Summary
    try {
      console.log(`  🎉 Generating summary...`);
      const summary = await generator.generateModuleSummary(
        module.number,
        module.name,
        module.keyTakeaways
      );
      moduleScripts.summary = summary;
      totalScripts++;
      console.log(`     ✅ Summary generated (${summary.split(' ').length} words)`);
    } catch (error) {
      console.log(`     ❌ Summary failed: ${error.message}`);
    }

    allScripts.push(moduleScripts);

    // Save individual module scripts
    try {
      const filename = `module${module.number}_scripts.json`;
      await fs.writeFile(
        path.join(scriptsDir, filename),
        JSON.stringify(moduleScripts, null, 2)
      );
      console.log(`  💾 Saved to: scripts/${filename}`);
    } catch (error) {
      console.log(`  ❌ Save failed: ${error.message}`);
    }
  }

  // Save all scripts together
  try {
    await fs.writeFile(
      path.join(scriptsDir, 'all_module_scripts.json'),
      JSON.stringify(allScripts, null, 2)
    );
  } catch (error) {
    console.error('Error saving all scripts:', error.message);
  }

  const totalTime = Date.now() - startTime;

  console.log('\n' + '=' .repeat(80));
  console.log('✅ Script Generation Complete!\n');
  console.log(`📊 Statistics:`);
  console.log(`   - Modules processed: ${MODULES.length}`);
  console.log(`   - Total scripts generated: ${totalScripts}`);
  console.log(`   - Total time: ${(totalTime / 1000).toFixed(1)} seconds`);
  console.log(`   - Average per script: ${(totalTime / totalScripts).toFixed(0)}ms`);
  console.log(`\n📁 Scripts saved to: ${scriptsDir}`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Review scripts at: ${scriptsDir}`);
  console.log(`   2. Sign up for D-ID at https://www.d-id.com/`);
  console.log(`   3. Use D-ID API or web interface to generate videos`);
  console.log(`   4. Download videos and add to Training Leaders`);
  console.log(`\n🎬 Ready to create professional training videos! 🚀`);
}

// Run script generation
generateAllScripts().catch(console.error);
