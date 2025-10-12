import axios from 'axios';

export interface OllamaModel {
  name: string;
  size: number;
  digest: string;
  details: {
    format: string;
    family: string;
    families: string[];
    parameter_size: string;
    quantization_level: string;
  };
  modified_at: string;
}

export interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  message: OllamaMessage;
  done: boolean;
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  prompt_eval_duration?: number;
  eval_count?: number;
  eval_duration?: number;
}

export interface OllamaStreamResponse {
  model: string;
  created_at: string;
  message?: OllamaMessage;
  done: boolean;
}

export interface OllamaGenerateRequest {
  model: string;
  prompt: string;
  system?: string;
  stream?: boolean;
  context?: number[];
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
    num_predict?: number;
    repeat_penalty?: number;
  };
}

export interface OllamaChatRequest {
  model: string;
  messages: OllamaMessage[];
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
    num_predict?: number;
    repeat_penalty?: number;
  };
}

class OllamaService {
  private baseUrl: string;
  private timeout: number;

  constructor(
    baseUrl: string = 'http://localhost:11434',
    timeout: number = 120000
  ) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  // Check if Ollama is running and accessible
  async isAvailable(): Promise<boolean> {
    try {
      await axios.get(`${this.baseUrl}/api/tags`, { timeout: 5000 });
      return true;
    } catch (error) {
      console.warn('Ollama not available:', error);
      return false;
    }
  }

  // Get list of available models
  async getModels(): Promise<OllamaModel[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/tags`);
      return response.data.models || [];
    } catch (error) {
      console.error('Failed to fetch models:', error);
      return [];
    }
  }

  // Check if a specific model is available
  async hasModel(modelName: string): Promise<boolean> {
    const models = await this.getModels();
    return models.some(model => model.name.includes(modelName));
  }

  // Generate completion using generate API (for simple prompts)
  async generate(request: OllamaGenerateRequest): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/generate`,
        { ...request, stream: false },
        { timeout: this.timeout }
      );
      return response.data.response || '';
    } catch (error) {
      console.error('Ollama generate failed:', error);
      throw new Error('Failed to generate response from Ollama');
    }
  }

  // Chat completion using chat API (for conversations)
  async chat(request: OllamaChatRequest): Promise<OllamaResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/chat`,
        { ...request, stream: false },
        { timeout: this.timeout }
      );
      return response.data;
    } catch (error) {
      console.error('Ollama chat failed:', error);
      throw new Error('Failed to get chat response from Ollama');
    }
  }

  // Streaming chat completion
  async chatStream(
    request: OllamaChatRequest,
    onChunk: (chunk: string) => void,
    onComplete?: (fullResponse: string) => void
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...request, stream: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      let fullResponse = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          try {
            const data: OllamaStreamResponse = JSON.parse(line);
            if (data.message?.content) {
              const content = data.message.content;
              fullResponse += content;
              onChunk(content);
            }
            if (data.done && onComplete) {
              onComplete(fullResponse);
            }
          } catch (parseError) {
            // Skip invalid JSON lines
          }
        }
      }
    } catch (error) {
      console.error('Ollama stream failed:', error);
      throw new Error('Failed to stream chat response from Ollama');
    }
  }

  // Pull a model if not available
  async pullModel(
    modelName: string,
    onProgress?: (progress: string) => void
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/pull`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: modelName }),
      });

      if (!response.ok) {
        throw new Error(`Failed to pull model: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        if (onProgress) {
          onProgress(chunk);
        }
      }
    } catch (error) {
      console.error('Failed to pull model:', error);
      throw error;
    }
  }

  // Get model info
  async showModel(modelName: string): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/show`, {
        name: modelName,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to show model:', error);
      return null;
    }
  }
}

export default OllamaService;
