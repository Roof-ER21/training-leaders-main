// Test script to verify agnes-scenarios.js functions work correctly
const fs = require('fs');
const path = require('path');

// Read and execute the file
const agnesFilePath = path.join(__dirname, 'dist', 'agnes-scenarios.js');
const agnesCode = fs.readFileSync(agnesFilePath, 'utf8');

// Create a mock window object
global.window = {};

// Execute the code
eval(agnesCode);

console.log('\n=== TESTING AGNES SCENARIOS FUNCTIONS ===\n');

// Test 1: window.getAllAgnesScenarios
console.log('Test 1: window.getAllAgnesScenarios');
if (typeof window.getAllAgnesScenarios === 'function') {
    console.log('✅ Function EXISTS');
    try {
        const scenarios = window.getAllAgnesScenarios();
        console.log(`✅ Function WORKS - returned ${scenarios.length} scenarios`);
        console.log(`   First scenario ID: ${scenarios[0].id}`);
    } catch (e) {
        console.log(`❌ Function EXISTS but FAILED: ${e.message}`);
    }
} else {
    console.log(`❌ Function NOT FOUND - typeof is: ${typeof window.getAllAgnesScenarios}`);
}

console.log('\nTest 2: window.scoreResponse');
if (typeof window.scoreResponse === 'function') {
    console.log('✅ Function EXISTS');
    try {
        const result = window.scoreResponse(
            'I understand your concern about the deductible. Let me schedule a time.',
            ['Acknowledge', 'Deductible', 'Schedule'],
            ['understand', 'deductible', 'schedule'],
            70
        );
        console.log(`✅ Function WORKS`);
        console.log(`   Score: ${result.score}`);
        console.log(`   Passed: ${result.passed}`);
        console.log(`   Matched Points: ${result.matchedPoints.length}/${result.matchedPoints.length + result.missedPoints.length}`);
        console.log(`   Matched Keywords: ${result.matchedKeywords.join(', ')}`);
    } catch (e) {
        console.log(`❌ Function EXISTS but FAILED: ${e.message}`);
    }
} else {
    console.log(`❌ Function NOT FOUND - typeof is: ${typeof window.scoreResponse}`);
}

console.log('\nTest 3: window.getAgnesScenariosByRole');
if (typeof window.getAgnesScenariosByRole === 'function') {
    console.log('✅ Function EXISTS');
    try {
        const homeownerScenarios = window.getAgnesScenariosByRole('homeowner');
        const repScenarios = window.getAgnesScenariosByRole('rep');
        const adjusterScenarios = window.getAgnesScenariosByRole('adjuster');
        console.log(`✅ Function WORKS`);
        console.log(`   Homeowner scenarios: ${homeownerScenarios.length}`);
        console.log(`   Rep scenarios: ${repScenarios.length}`);
        console.log(`   Adjuster scenarios: ${adjusterScenarios.length}`);
    } catch (e) {
        console.log(`❌ Function EXISTS but FAILED: ${e.message}`);
    }
} else {
    console.log(`❌ Function NOT FOUND - typeof is: ${typeof window.getAgnesScenariosByRole}`);
}

console.log('\n=== ALL TESTS COMPLETE ===\n');
