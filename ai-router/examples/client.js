/**
 * Example Client for Agnes AI Router
 * Demonstrates how to integrate with the router service
 */

import axios from 'axios';

// Configure the router URL
const ROUTER_URL = process.env.AI_ROUTER_URL || 'http://localhost:3000';

class AgnesAIClient {
  constructor(baseUrl = ROUTER_URL) {
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 60000 // 60 second timeout
    });
  }

  /**
   * Simple text completion
   */
  async complete(prompt, options = {}) {
    try {
      const response = await this.client.post('/v1/completions', {
        prompt,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 2000,
        provider: options.provider || 'auto',
        use_cache: options.useCache !== false
      });

      return {
        text: response.data.choices[0].text,
        model: response.data.model,
        provider: response.data.provider,
        latency: response.data.metadata.latency
      };
    } catch (error) {
      console.error('Completion error:', error.message);
      throw error;
    }
  }

  /**
   * Chat-style conversation
   */
  async chat(messages, options = {}) {
    try {
      const response = await this.client.post('/v1/chat/completions', {
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 2000,
        provider: options.provider || 'auto',
        use_cache: options.useCache !== false
      });

      return {
        text: response.data.choices[0].message.content,
        model: response.data.model,
        provider: response.data.provider,
        latency: response.data.metadata.latency
      };
    } catch (error) {
      console.error('Chat error:', error.message);
      throw error;
    }
  }

  /**
   * Code generation (optimized settings)
   */
  async generateCode(prompt, language = 'python') {
    return this.complete(
      `Write ${language} code: ${prompt}`,
      {
        temperature: 0.2, // Lower temperature for more deterministic code
        maxTokens: 2000,
        provider: 'auto' // Will prefer code-specific models
      }
    );
  }

  /**
   * Analysis and reasoning (optimized settings)
   */
  async analyze(prompt) {
    return this.complete(prompt, {
      temperature: 0.3,
      maxTokens: 3000,
      provider: 'auto' // Will prefer reasoning models for complex queries
    });
  }

  /**
   * Quick response for simple queries
   */
  async quickAnswer(prompt) {
    return this.complete(prompt, {
      temperature: 0.7,
      maxTokens: 500,
      provider: 'ollama', // Force fast local model
      useCache: true
    });
  }

  /**
   * Get service health
   */
  async getHealth() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error.message);
      throw error;
    }
  }

  /**
   * Get service statistics
   */
  async getStats() {
    try {
      const response = await this.client.get('/stats');
      return response.data;
    } catch (error) {
      console.error('Stats error:', error.message);
      throw error;
    }
  }

  /**
   * List available models
   */
  async listModels() {
    try {
      const response = await this.client.get('/v1/models');
      return response.data.data;
    } catch (error) {
      console.error('List models error:', error.message);
      throw error;
    }
  }
}

// Example usage
async function examples() {
  const agnes = new AgnesAIClient();

  console.log('=== Agnes AI Router Examples ===\n');

  // Example 1: Simple question
  console.log('1. Simple Question:');
  try {
    const result = await agnes.quickAnswer('What is machine learning?');
    console.log(`Provider: ${result.provider} (${result.model})`);
    console.log(`Latency: ${result.latency}ms`);
    console.log(`Answer: ${result.text.substring(0, 200)}...\n`);
  } catch (error) {
    console.error('Error:', error.message, '\n');
  }

  // Example 2: Code generation
  console.log('2. Code Generation:');
  try {
    const result = await agnes.generateCode(
      'a function to calculate fibonacci numbers',
      'python'
    );
    console.log(`Provider: ${result.provider} (${result.model})`);
    console.log(`Latency: ${result.latency}ms`);
    console.log(`Code:\n${result.text}\n`);
  } catch (error) {
    console.error('Error:', error.message, '\n');
  }

  // Example 3: Complex analysis
  console.log('3. Complex Analysis:');
  try {
    const result = await agnes.analyze(
      'Analyze the advantages and disadvantages of microservices architecture in detail'
    );
    console.log(`Provider: ${result.provider} (${result.model})`);
    console.log(`Latency: ${result.latency}ms`);
    console.log(`Analysis: ${result.text.substring(0, 300)}...\n`);
  } catch (error) {
    console.error('Error:', error.message, '\n');
  }

  // Example 4: Chat conversation
  console.log('4. Chat Conversation:');
  try {
    const result = await agnes.chat([
      { role: 'system', content: 'You are a helpful coding assistant.' },
      { role: 'user', content: 'How do I sort an array in JavaScript?' }
    ]);
    console.log(`Provider: ${result.provider} (${result.model})`);
    console.log(`Latency: ${result.latency}ms`);
    console.log(`Response: ${result.text.substring(0, 200)}...\n`);
  } catch (error) {
    console.error('Error:', error.message, '\n');
  }

  // Example 5: Service health
  console.log('5. Service Health:');
  try {
    const health = await agnes.getHealth();
    console.log(`Status: ${health.status}`);
    console.log(`Ollama: ${health.providers.ollama.status}`);
    console.log(`HuggingFace: ${health.providers.huggingface.status}`);
    console.log(`Total Routes: ${health.routing.totalRoutes}\n`);
  } catch (error) {
    console.error('Error:', error.message, '\n');
  }

  // Example 6: Statistics
  console.log('6. Service Statistics:');
  try {
    const stats = await agnes.getStats();
    console.log('Routing Stats:');
    console.log(`  - Ollama Usage: ${stats.routing.ollamaPercentage}%`);
    console.log(`  - HuggingFace Usage: ${stats.routing.huggingfacePercentage}%`);
    console.log(`  - Cache Hit Rate: ${stats.routing.cacheHitRate}%\n`);
  } catch (error) {
    console.error('Error:', error.message, '\n');
  }
}

// Run examples if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  examples().catch(console.error);
}

// Export for use in other modules
export default AgnesAIClient;
