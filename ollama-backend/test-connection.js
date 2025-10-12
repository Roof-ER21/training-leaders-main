const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3000';
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

async function testConnection() {
  console.log('Testing Ollama Backend Connection...\n');

  // Test 1: Health Check
  try {
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/health`);
    console.log('✓ Health check passed');
    console.log('  Status:', healthResponse.data.status);
    console.log('  Models available:', healthResponse.data.ollama.modelsAvailable);
    console.log('');
  } catch (error) {
    console.error('✗ Health check failed:', error.message);
    return;
  }

  // Test 2: List Models
  try {
    console.log('2. Testing models endpoint...');
    const modelsResponse = await axios.get(`${API_URL}/api/models`);
    console.log('✓ Models endpoint working');
    console.log('  Available models:');
    modelsResponse.data.models.forEach(model => {
      console.log(`    - ${model.name} (${(model.size / 1e9).toFixed(2)} GB)`);
    });
    console.log('');
  } catch (error) {
    console.error('✗ Models endpoint failed:', error.message);
  }

  // Test 3: Test Generation (if models available)
  try {
    console.log('3. Testing generation endpoint...');
    const generateResponse = await axios.post(`${API_URL}/api/generate`, {
      model: 'llama3.1',
      prompt: 'Say "Hello from Agnes AI!" in one sentence.',
      stream: false,
      options: {
        temperature: 0.7,
        max_tokens: 50
      }
    });
    console.log('✓ Generation endpoint working');
    console.log('  Model used:', generateResponse.data.model);
    console.log('  Response:', generateResponse.data.response.response?.substring(0, 100) + '...');
    console.log('');
  } catch (error) {
    console.error('✗ Generation endpoint failed:', error.message);
  }

  // Test 4: Test Chat
  try {
    console.log('4. Testing chat endpoint...');
    const chatResponse = await axios.post(`${API_URL}/api/chat`, {
      model: 'llama3.1',
      messages: [
        { role: 'system', content: 'You are Agnes AI, a helpful assistant.' },
        { role: 'user', content: 'What is your name?' }
      ],
      stream: false
    });
    console.log('✓ Chat endpoint working');
    console.log('  Model used:', chatResponse.data.model);
    console.log('  Response:', chatResponse.data.response.message?.content?.substring(0, 100) + '...');
    console.log('');
  } catch (error) {
    console.error('✗ Chat endpoint failed:', error.message);
  }

  console.log('Connection test complete!');
}

// Run tests
testConnection().catch(console.error);
