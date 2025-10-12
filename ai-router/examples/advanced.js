/**
 * Advanced Integration Examples for Agnes AI Router
 */

import AgnesAIClient from './client.js';

/**
 * Build a conversational agent with context
 */
class ConversationalAgent {
  constructor() {
    this.client = new AgnesAIClient();
    this.conversationHistory = [];
  }

  async chat(userMessage) {
    // Add user message to history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    // Get response
    const result = await this.client.chat(this.conversationHistory, {
      temperature: 0.8,
      maxTokens: 1500
    });

    // Add assistant response to history
    this.conversationHistory.push({
      role: 'assistant',
      content: result.text
    });

    return result;
  }

  clearHistory() {
    this.conversationHistory = [];
  }
}

/**
 * Code assistant with specialized prompts
 */
class CodeAssistant {
  constructor() {
    this.client = new AgnesAIClient();
  }

  async reviewCode(code, language) {
    const prompt = `Review the following ${language} code and provide feedback on:
1. Code quality and best practices
2. Potential bugs or issues
3. Performance optimizations
4. Security considerations

Code:
\`\`\`${language}
${code}
\`\`\``;

    return this.client.analyze(prompt);
  }

  async generateTests(code, language, framework = 'jest') {
    const prompt = `Generate ${framework} unit tests for the following ${language} code:

\`\`\`${language}
${code}
\`\`\`

Include edge cases and error handling tests.`;

    return this.client.generateCode(prompt, language);
  }

  async refactor(code, language, goal) {
    const prompt = `Refactor the following ${language} code to ${goal}:

\`\`\`${language}
${code}
\`\`\`

Provide the refactored code with explanations.`;

    return this.client.generateCode(prompt, language);
  }

  async documentCode(code, language) {
    const prompt = `Add comprehensive documentation to the following ${language} code:

\`\`\`${language}
${code}
\`\`\`

Include JSDoc/docstrings, inline comments, and usage examples.`;

    return this.client.generateCode(prompt, language);
  }
}

/**
 * Research assistant
 */
class ResearchAssistant {
  constructor() {
    this.client = new AgnesAIClient();
  }

  async research(topic) {
    const prompt = `Provide a comprehensive research summary on: ${topic}

Include:
1. Overview and key concepts
2. Current state and trends
3. Advantages and disadvantages
4. Use cases and applications
5. Future outlook`;

    return this.client.analyze(prompt);
  }

  async compare(topic1, topic2) {
    const prompt = `Compare and contrast ${topic1} vs ${topic2}:

Provide detailed analysis of:
1. Key differences
2. Similarities
3. Pros and cons of each
4. Use case scenarios
5. Recommendation for when to use each`;

    return this.client.analyze(prompt);
  }

  async explainConcept(concept, level = 'intermediate') {
    const prompt = `Explain ${concept} at a ${level} level.

Make it clear, concise, and provide practical examples.`;

    return this.client.complete(prompt, {
      temperature: 0.7,
      maxTokens: 2000
    });
  }
}

/**
 * Batch processing with intelligent routing
 */
class BatchProcessor {
  constructor() {
    this.client = new AgnesAIClient();
  }

  async processQueries(queries, options = {}) {
    const results = [];

    for (const query of queries) {
      try {
        const result = await this.client.complete(query, options);
        results.push({
          query,
          success: true,
          ...result
        });
      } catch (error) {
        results.push({
          query,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  async processInParallel(queries, options = {}) {
    const promises = queries.map(query =>
      this.client.complete(query, options)
        .then(result => ({ query, success: true, ...result }))
        .catch(error => ({ query, success: false, error: error.message }))
    );

    return Promise.all(promises);
  }
}

/**
 * Example: Conversational Agent
 */
async function conversationalExample() {
  console.log('=== Conversational Agent Example ===\n');

  const agent = new ConversationalAgent();

  const conversation = [
    "Hi! Can you help me understand neural networks?",
    "What's the difference between CNN and RNN?",
    "Which one should I use for image classification?"
  ];

  for (const message of conversation) {
    console.log(`User: ${message}`);
    const response = await agent.chat(message);
    console.log(`Agent (${response.provider}): ${response.text.substring(0, 200)}...`);
    console.log(`Latency: ${response.latency}ms\n`);
  }
}

/**
 * Example: Code Assistant
 */
async function codeAssistantExample() {
  console.log('=== Code Assistant Example ===\n');

  const assistant = new CodeAssistant();

  const code = `
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}
`;

  console.log('Original Code:');
  console.log(code);

  console.log('\n1. Code Review:');
  const review = await assistant.reviewCode(code, 'javascript');
  console.log(review.text.substring(0, 300) + '...');

  console.log('\n2. Generate Tests:');
  const tests = await assistant.generateTests(code, 'javascript');
  console.log(tests.text.substring(0, 300) + '...');

  console.log('\n3. Refactor for Modern JavaScript:');
  const refactored = await assistant.refactor(
    code,
    'javascript',
    'use modern ES6+ features and improve readability'
  );
  console.log(refactored.text);
}

/**
 * Example: Research Assistant
 */
async function researchExample() {
  console.log('=== Research Assistant Example ===\n');

  const researcher = new ResearchAssistant();

  console.log('1. Research Topic:');
  const research = await researcher.research('GraphQL vs REST APIs');
  console.log(research.text.substring(0, 400) + '...\n');

  console.log('2. Compare Technologies:');
  const comparison = await researcher.compare('PostgreSQL', 'MongoDB');
  console.log(comparison.text.substring(0, 400) + '...\n');

  console.log('3. Explain Concept:');
  const explanation = await researcher.explainConcept('Kubernetes', 'beginner');
  console.log(explanation.text.substring(0, 400) + '...\n');
}

/**
 * Example: Batch Processing
 */
async function batchProcessingExample() {
  console.log('=== Batch Processing Example ===\n');

  const processor = new BatchProcessor();

  const queries = [
    'What is TypeScript?',
    'Explain Docker containers',
    'What are microservices?',
    'Define API gateway',
    'What is CI/CD?'
  ];

  console.log('Processing in parallel...');
  const startTime = Date.now();

  const results = await processor.processInParallel(queries, {
    maxTokens: 200,
    temperature: 0.7
  });

  const totalTime = Date.now() - startTime;

  console.log(`\nProcessed ${results.length} queries in ${totalTime}ms`);
  console.log(`Average time per query: ${(totalTime / results.length).toFixed(2)}ms\n`);

  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.query}`);
    console.log(`   Provider: ${result.provider} | Latency: ${result.latency}ms`);
    console.log(`   Answer: ${result.text.substring(0, 100)}...\n`);
  });
}

// Run examples
async function runAdvancedExamples() {
  try {
    await conversationalExample();
    console.log('\n' + '='.repeat(60) + '\n');

    await codeAssistantExample();
    console.log('\n' + '='.repeat(60) + '\n');

    await researchExample();
    console.log('\n' + '='.repeat(60) + '\n');

    await batchProcessingExample();
  } catch (error) {
    console.error('Error running examples:', error.message);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAdvancedExamples().catch(console.error);
}

export {
  ConversationalAgent,
  CodeAssistant,
  ResearchAssistant,
  BatchProcessor
};
