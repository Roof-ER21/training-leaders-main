/**
 * Model Configuration for Agnes AI Router
 * Defines available models and their capabilities
 */

export const OLLAMA_MODELS = {
  conversational: {
    name: 'qwen2.5:7b',
    maxTokens: 4096,
    temperature: 0.7,
    description: 'Fast conversational AI for general queries'
  },
  code: {
    name: 'deepseek-coder:1.3b',
    maxTokens: 4096,
    temperature: 0.2,
    description: 'Code generation and optimization'
  },
  reasoning: {
    name: 'deepseek-r1:1.5b',
    maxTokens: 4096,
    temperature: 0.3,
    description: 'Advanced reasoning and problem solving'
  },
  vision: {
    name: 'qwen2.5-vision:7b',
    maxTokens: 4096,
    temperature: 0.7,
    description: 'Visual analysis and UI/UX feedback'
  }
};

export const HUGGINGFACE_MODELS = {
  conversational: {
    id: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
    maxTokens: 8192,
    temperature: 0.7,
    description: 'Primary conversational AI with advanced capabilities',
    costTier: 'high',
    recommendedFor: ['complex_dialogue', 'multi_turn', 'analysis']
  },
  code: {
    id: 'Qwen/Qwen2.5-Coder-32B-Instruct',
    maxTokens: 32768,
    temperature: 0.2,
    description: 'Advanced code generation and refactoring',
    costTier: 'high',
    recommendedFor: ['code_generation', 'debugging', 'refactoring']
  },
  fast: {
    id: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
    maxTokens: 4096,
    temperature: 0.7,
    description: 'Fast responses for simple queries',
    costTier: 'low',
    recommendedFor: ['quick_responses', 'simple_queries', 'chat']
  },
  reasoning: {
    id: 'deepseek-ai/DeepSeek-R1',
    maxTokens: 8192,
    temperature: 0.3,
    description: 'Deep reasoning and problem solving',
    costTier: 'medium',
    recommendedFor: ['complex_reasoning', 'problem_solving', 'planning']
  }
};

// Task type detection patterns
export const TASK_PATTERNS = {
  code: {
    keywords: ['code', 'function', 'class', 'debug', 'implement', 'refactor', 'api', 'algorithm'],
    patterns: [/write.*code/i, /create.*function/i, /implement/i, /debug/i]
  },
  reasoning: {
    keywords: ['analyze', 'reason', 'plan', 'strategy', 'problem', 'solution', 'architecture'],
    patterns: [/how.*work/i, /why.*happen/i, /explain.*detail/i, /analyze/i]
  },
  simple: {
    keywords: ['hello', 'hi', 'what', 'when', 'who', 'thanks', 'help'],
    patterns: [/^(hi|hello|hey)/i, /what is/i, /who is/i]
  },
  complex: {
    keywords: ['comprehensive', 'detailed', 'complete', 'full', 'entire', 'thorough'],
    patterns: [/detailed analysis/i, /comprehensive/i, /step.*step/i]
  }
};

// Complexity scoring weights
export const COMPLEXITY_WEIGHTS = {
  queryLength: 0.2,        // Longer queries are typically more complex
  keywords: 0.3,           // Presence of complex keywords
  multiPart: 0.3,          // Multi-part questions
  technicalDepth: 0.2      // Technical terminology
};

// Rate limiting configuration
export const RATE_LIMITS = {
  ollama: {
    requestsPerMinute: 100,
    concurrentRequests: 5
  },
  huggingface: {
    requestsPerMinute: 60,
    concurrentRequests: 10
  }
};

// Retry configuration
export const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000,      // 1 second
  maxDelay: 10000,         // 10 seconds
  backoffMultiplier: 2
};

export default {
  OLLAMA_MODELS,
  HUGGINGFACE_MODELS,
  TASK_PATTERNS,
  COMPLEXITY_WEIGHTS,
  RATE_LIMITS,
  RETRY_CONFIG
};
