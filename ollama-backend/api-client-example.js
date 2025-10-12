/**
 * Ollama Backend API Client Example
 *
 * This file demonstrates how to integrate the Ollama backend
 * with your Agnes AI frontend application.
 */

class OllamaClient {
  constructor(baseURL) {
    this.baseURL = baseURL || 'http://localhost:3000';
  }

  /**
   * Check if the service is healthy
   */
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/health`);
    return await response.json();
  }

  /**
   * List all available models
   */
  async listModels() {
    const response = await fetch(`${this.baseURL}/api/models`);
    return await response.json();
  }

  /**
   * Generate a completion
   * @param {string} model - Model name
   * @param {string} prompt - User prompt
   * @param {object} options - Generation options
   */
  async generate(model, prompt, options = {}) {
    const response = await fetch(`${this.baseURL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 500,
          ...options
        }
      })
    });

    return await response.json();
  }

  /**
   * Generate a streaming completion
   * @param {string} model - Model name
   * @param {string} prompt - User prompt
   * @param {function} onToken - Callback for each token
   */
  async generateStream(model, prompt, onToken, options = {}) {
    const response = await fetch(`${this.baseURL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: true,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          ...options
        }
      })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.response) {
            onToken(data.response);
          }
          if (data.done) {
            return data;
          }
        } catch (e) {
          console.error('Error parsing stream:', e);
        }
      }
    }
  }

  /**
   * Chat completion
   * @param {string} model - Model name
   * @param {array} messages - Chat messages
   * @param {object} options - Generation options
   */
  async chat(model, messages, options = {}) {
    const response = await fetch(`${this.baseURL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          ...options
        }
      })
    });

    return await response.json();
  }

  /**
   * Streaming chat completion
   * @param {string} model - Model name
   * @param {array} messages - Chat messages
   * @param {function} onToken - Callback for each token
   */
  async chatStream(model, messages, onToken, options = {}) {
    const response = await fetch(`${this.baseURL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        options: {
          temperature: 0.7,
          ...options
        }
      })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.message?.content) {
            onToken(data.message.content);
          }
          if (data.done) {
            return data;
          }
        } catch (e) {
          console.error('Error parsing stream:', e);
        }
      }
    }
  }

  /**
   * Pull a new model
   * @param {string} model - Model name
   * @param {function} onProgress - Callback for progress updates
   */
  async pullModel(model, onProgress) {
    const response = await fetch(`${this.baseURL}/api/pull`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(Boolean);

      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (onProgress) {
            onProgress(data);
          }
          if (data.status === 'success') {
            return data;
          }
        } catch (e) {
          console.error('Error parsing pull progress:', e);
        }
      }
    }
  }

  /**
   * Get model information
   * @param {string} model - Model name
   */
  async getModelInfo(model) {
    const response = await fetch(`${this.baseURL}/api/show/${model}`);
    return await response.json();
  }
}

// ============================================================
// Usage Examples
// ============================================================

// Example 1: Initialize client
const client = new OllamaClient('https://your-railway-url.railway.app');

// Example 2: Health check
async function checkHealth() {
  const health = await client.healthCheck();
  console.log('Service status:', health.status);
  console.log('Models available:', health.ollama.modelsAvailable);
}

// Example 3: List models
async function showModels() {
  const data = await client.listModels();
  console.log('Available models:');
  data.models.forEach(model => {
    console.log(`- ${model.name} (${(model.size / 1e9).toFixed(2)} GB)`);
  });
}

// Example 4: Simple generation
async function simpleGeneration() {
  const result = await client.generate(
    'susan-ai-21',
    'What are the key principles of effective leadership?'
  );
  console.log('Response:', result.response.response);
}

// Example 5: Streaming generation
async function streamingGeneration() {
  let fullResponse = '';

  await client.generateStream(
    'susan-ai-21',
    'Explain effective team communication strategies.',
    (token) => {
      fullResponse += token;
      process.stdout.write(token);
    }
  );

  console.log('\n\nFull response:', fullResponse);
}

// Example 6: Chat conversation
async function chatConversation() {
  const messages = [
    {
      role: 'system',
      content: 'You are Susan, an AI training assistant for Agnes AI.'
    },
    {
      role: 'user',
      content: 'How can I improve my team\'s communication?'
    }
  ];

  const result = await client.chat('susan-ai-21', messages);
  console.log('Susan:', result.response.message.content);
}

// Example 7: Streaming chat
async function streamingChat() {
  const messages = [
    {
      role: 'system',
      content: 'You are Susan, an AI training assistant.'
    },
    {
      role: 'user',
      content: 'Give me 5 tips for better leadership.'
    }
  ];

  console.log('Susan: ');
  await client.chatStream('susan-ai-21', messages, (token) => {
    process.stdout.write(token);
  });
  console.log('\n');
}

// Example 8: Pull new model
async function pullNewModel() {
  console.log('Pulling model: llama3.1');

  await client.pullModel('llama3.1', (progress) => {
    if (progress.status === 'downloading') {
      const percent = ((progress.completed / progress.total) * 100).toFixed(1);
      console.log(`Downloading: ${percent}%`);
    } else {
      console.log('Status:', progress.status);
    }
  });

  console.log('Model pulled successfully!');
}

// Example 9: Get model info
async function showModelInfo() {
  const info = await client.getModelInfo('susan-ai-21');
  console.log('Model info:', info);
}

// Example 10: React Component Integration
/*
import { useState, useEffect } from 'react';

function AgnesAIChat() {
  const [client] = useState(() => new OllamaClient('https://your-railway-url.railway.app'));
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setStreaming(true);

    let assistantMessage = '';
    const messagesHistory = [
      {
        role: 'system',
        content: 'You are Susan, an AI training assistant for Agnes AI.'
      },
      ...messages,
      userMessage
    ];

    await client.chatStream('susan-ai-21', messagesHistory, (token) => {
      assistantMessage += token;
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];

        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content = assistantMessage;
        } else {
          newMessages.push({ role: 'assistant', content: assistantMessage });
        }

        return newMessages;
      });
    });

    setStreaming(false);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={streaming}
          placeholder="Ask Susan anything..."
        />
        <button onClick={sendMessage} disabled={streaming}>
          Send
        </button>
      </div>
    </div>
  );
}

export default AgnesAIChat;
*/

// Example 11: Error handling
async function withErrorHandling() {
  try {
    const result = await client.generate('susan-ai-21', 'Hello');
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error.message);

    // Fallback to different model
    try {
      const fallbackResult = await client.generate('llama3.1', 'Hello');
      console.log('Fallback success:', fallbackResult);
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError.message);
    }
  }
}

// Example 12: Model selection based on task
async function smartModelSelection(task) {
  const modelMap = {
    'coding': 'qwen2.5-coder:7b',
    'reasoning': 'deepseek-r1:1.5b',
    'training': 'susan-ai-21',
    'general': 'llama3.1'
  };

  const model = modelMap[task] || 'llama3.1';
  return client.generate(model, 'Your prompt here');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OllamaClient;
}
