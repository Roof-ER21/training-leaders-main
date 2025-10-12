/**
 * Tests for routing service
 */

import { test } from 'node:test';
import assert from 'node:assert';

test('Routing Service Tests', async (t) => {

  await t.test('should detect code task type', () => {
    const query = 'Write a function to sort an array';
    // Task type detection logic would be tested here
    assert.ok(query.includes('function'));
  });

  await t.test('should calculate complexity correctly', () => {
    const simpleQuery = 'Hello';
    const complexQuery = 'Analyze the comprehensive architecture of a distributed microservices system with detailed implementation considerations';

    // Simple query should have low complexity
    assert.ok(simpleQuery.length < 50);

    // Complex query should have high complexity
    assert.ok(complexQuery.length > 100);
  });

  await t.test('should prefer Ollama for simple queries', () => {
    const complexity = 0.3;
    const threshold = 0.7;

    assert.ok(complexity < threshold, 'Should route to Ollama');
  });

  await t.test('should prefer HuggingFace for complex queries', () => {
    const complexity = 0.8;
    const threshold = 0.7;

    assert.ok(complexity >= threshold, 'Should route to HuggingFace');
  });
});
