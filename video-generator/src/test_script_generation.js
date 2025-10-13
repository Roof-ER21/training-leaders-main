// Test Script Generation
require('dotenv').config();
const ScriptGenerator = require('./services/script-generator');

async function testScriptGeneration() {
  console.log('🧪 Testing Video Script Generation with Agnes (Groq)\n');

  const generator = new ScriptGenerator(process.env.GROQ_API_KEY);

  // Test 1: Module Intro
  console.log('Test 1: Module Intro Script');
  console.log('=' .repeat(60));
  try {
    const startTime = Date.now();
    const script = await generator.generateModuleIntro(
      1,
      'Roofing Fundamentals',
      [
        'Identify different roofing materials',
        'Understand basic roofing terminology',
        'Recognize key components of a roofing system'
      ]
    );
    const duration = Date.now() - startTime;

    console.log('✅ SUCCESS!');
    console.log(`⏱️  Generated in ${duration}ms\n`);
    console.log('📝 Script:');
    console.log(script);
    console.log('\n');
  } catch (error) {
    console.log('❌ FAILED:', error.message);
  }

  // Test 2: Concept Explainer
  console.log('Test 2: Concept Explainer Script');
  console.log('=' .repeat(60));
  try {
    const startTime = Date.now();
    const script = await generator.generateConceptExplainer(
      'Hail Damage Identification',
      'Hail damage appears as small dents or dimples on shingles with granule loss. Look for circular bruising patterns and exposed fiberglass mat.',
      90
    );
    const duration = Date.now() - startTime;

    console.log('✅ SUCCESS!');
    console.log(`⏱️  Generated in ${duration}ms\n`);
    console.log('📝 Script:');
    console.log(script);
    console.log('\n');
  } catch (error) {
    console.log('❌ FAILED:', error.message);
  }

  // Test 3: Module Summary
  console.log('Test 3: Module Summary Script');
  console.log('=' .repeat(60));
  try {
    const startTime = Date.now();
    const script = await generator.generateModuleSummary(
      1,
      'Roofing Fundamentals',
      [
        'Different types of roofing materials and their uses',
        'Essential roofing terminology',
        'Components of a complete roofing system'
      ]
    );
    const duration = Date.now() - startTime;

    console.log('✅ SUCCESS!');
    console.log(`⏱️  Generated in ${duration}ms\n`);
    console.log('📝 Script:');
    console.log(script);
    console.log('\n');
  } catch (error) {
    console.log('❌ FAILED:', error.message);
  }

  console.log('=' .repeat(60));
  console.log('✅ Script generation tests completed!\n');
  console.log('💡 Next step: Sign up for D-ID at https://www.d-id.com/');
  console.log('   to convert these scripts into AI presenter videos!');
}

testScriptGeneration().catch(console.error);
