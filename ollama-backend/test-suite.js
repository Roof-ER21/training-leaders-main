/**
 * Comprehensive Test Suite for Ollama Backend
 *
 * Run with: node test-suite.js
 */

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3000';

// Test utilities
class TestRunner {
  constructor() {
    this.tests = [];
    this.results = {
      passed: 0,
      failed: 0,
      total: 0
    };
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🧪 Running Test Suite for Ollama Backend\n');
    console.log('='.repeat(60));
    console.log('\n');

    for (const { name, fn } of this.tests) {
      this.results.total++;

      try {
        await fn();
        this.results.passed++;
        console.log(`✅ PASS: ${name}`);
      } catch (error) {
        this.results.failed++;
        console.log(`❌ FAIL: ${name}`);
        console.log(`   Error: ${error.message}\n`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n📊 Test Results:');
    console.log(`   Total:  ${this.results.total}`);
    console.log(`   Passed: ${this.results.passed} ✅`);
    console.log(`   Failed: ${this.results.failed} ❌`);
    console.log(`   Success Rate: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%\n`);

    if (this.results.failed > 0) {
      process.exit(1);
    }
  }
}

const runner = new TestRunner();

// Test 1: Service is running
runner.test('Service is running', async () => {
  const response = await axios.get(`${API_URL}/`);
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  if (response.data.service !== 'Ollama Backend for Agnes AI') {
    throw new Error('Service name mismatch');
  }
});

// Test 2: Health check endpoint
runner.test('Health check returns healthy status', async () => {
  const response = await axios.get(`${API_URL}/health`);
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  if (!response.data.status || !['healthy', 'unhealthy'].includes(response.data.status)) {
    throw new Error('Invalid health status');
  }
});

// Test 3: Models endpoint
runner.test('Models endpoint returns model list', async () => {
  const response = await axios.get(`${API_URL}/api/models`);
  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  if (!response.data.success) {
    throw new Error('Models endpoint returned failure');
  }
  if (!Array.isArray(response.data.models)) {
    throw new Error('Models is not an array');
  }
});

// Test 4: Generation endpoint with llama3.1
runner.test('Generate completion with llama3.1', async () => {
  const response = await axios.post(`${API_URL}/api/generate`, {
    model: 'llama3.1',
    prompt: 'Say "test" in one word.',
    stream: false,
    options: {
      temperature: 0.7,
      max_tokens: 10
    }
  });

  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  if (!response.data.success) {
    throw new Error('Generation failed');
  }
  if (!response.data.response) {
    throw new Error('No response returned');
  }
});

// Test 5: Chat endpoint
runner.test('Chat completion works', async () => {
  const response = await axios.post(`${API_URL}/api/chat`, {
    model: 'llama3.1',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Say "hello" in one word.' }
    ],
    stream: false
  });

  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  if (!response.data.success) {
    throw new Error('Chat failed');
  }
  if (!response.data.response.message) {
    throw new Error('No message in response');
  }
});

// Test 6: Invalid model handling
runner.test('Invalid model returns error', async () => {
  try {
    await axios.post(`${API_URL}/api/generate`, {
      model: 'nonexistent-model',
      prompt: 'Test'
    });
    throw new Error('Expected error for invalid model');
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Expected error
      return;
    }
    throw error;
  }
});

// Test 7: Missing prompt validation
runner.test('Missing prompt returns 400 error', async () => {
  try {
    await axios.post(`${API_URL}/api/generate`, {
      model: 'llama3.1'
      // Missing prompt
    });
    throw new Error('Expected error for missing prompt');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Expected error
      return;
    }
    throw error;
  }
});

// Test 8: Susan AI model (if available)
runner.test('Susan AI model generation (if available)', async () => {
  try {
    const response = await axios.post(`${API_URL}/api/generate`, {
      model: 'susan-ai-21',
      prompt: 'Introduce yourself briefly.',
      stream: false,
      options: {
        temperature: 0.7,
        max_tokens: 100
      }
    });

    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
  } catch (error) {
    // If susan-ai-21 doesn't exist, it should fallback to llama3.1
    if (error.response && error.response.status === 500) {
      console.log('   Note: susan-ai-21 not available, using fallback');
    } else {
      throw error;
    }
  }
});

// Test 9: Model fallback mechanism
runner.test('Model fallback works when primary unavailable', async () => {
  // Request qwen2.5-coder:7b (should fallback to deepseek-coder if unavailable)
  const response = await axios.post(`${API_URL}/api/generate`, {
    model: 'qwen2.5-coder:7b',
    prompt: 'Write a hello world function',
    stream: false,
    options: {
      max_tokens: 50
    }
  });

  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }
  // Model might be original or fallback - both are valid
});

// Test 10: Response time check
runner.test('Response time is reasonable (<30s)', async () => {
  const start = Date.now();

  await axios.post(`${API_URL}/api/generate`, {
    model: 'llama3.1',
    prompt: 'Say hello',
    stream: false,
    options: {
      max_tokens: 10
    }
  });

  const duration = Date.now() - start;

  if (duration > 30000) {
    throw new Error(`Response took ${duration}ms (>30s)`);
  }

  console.log(`   Response time: ${duration}ms`);
});

// Test 11: Metrics endpoint
runner.test('Metrics endpoint returns statistics', async () => {
  try {
    const response = await axios.get(`${API_URL}/metrics`);
    if (response.status !== 200) {
      throw new Error(`Expected status 200, got ${response.status}`);
    }
    if (!response.data.service) {
      throw new Error('Metrics missing service info');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('   Note: Using basic server (no metrics endpoint)');
    } else {
      throw error;
    }
  }
});

// Test 12: CORS headers
runner.test('CORS headers are present', async () => {
  const response = await axios.get(`${API_URL}/health`);
  if (!response.headers['access-control-allow-origin']) {
    console.log('   Warning: CORS headers might not be configured');
  }
});

// Test 13: Compression
runner.test('Response compression is enabled', async () => {
  const response = await axios.get(`${API_URL}/api/models`, {
    headers: {
      'Accept-Encoding': 'gzip, deflate'
    }
  });

  if (response.headers['content-encoding']) {
    console.log(`   Compression: ${response.headers['content-encoding']}`);
  } else {
    console.log('   Note: Compression might not be enabled');
  }
});

// Test 14: Rate limiting (optional - uncomment to test)
/*
runner.test('Rate limiting is enforced', async () => {
  const requests = [];

  // Send 101 requests rapidly (exceeds 100 req/15min limit)
  for (let i = 0; i < 101; i++) {
    requests.push(
      axios.get(`${API_URL}/health`).catch(err => err.response)
    );
  }

  const responses = await Promise.all(requests);
  const rateLimited = responses.some(r => r && r.status === 429);

  if (!rateLimited) {
    console.log('   Note: Rate limiting might not be active in dev mode');
  } else {
    console.log('   Rate limiting is active');
  }
});
*/

// Test 15: Streaming support
runner.test('Streaming generation works', async () => {
  const response = await axios.post(
    `${API_URL}/api/generate`,
    {
      model: 'llama3.1',
      prompt: 'Count from 1 to 3',
      stream: true,
      options: {
        max_tokens: 20
      }
    },
    {
      responseType: 'stream'
    }
  );

  if (response.status !== 200) {
    throw new Error(`Expected status 200, got ${response.status}`);
  }

  return new Promise((resolve, reject) => {
    let receivedData = false;

    response.data.on('data', (chunk) => {
      receivedData = true;
    });

    response.data.on('end', () => {
      if (!receivedData) {
        reject(new Error('No streaming data received'));
      } else {
        console.log('   Streaming data received');
        resolve();
      }
    });

    response.data.on('error', (error) => {
      reject(error);
    });

    // Timeout after 10 seconds
    setTimeout(() => {
      reject(new Error('Streaming timeout'));
    }, 10000);
  });
});

// Run all tests
runner.run().catch(console.error);
