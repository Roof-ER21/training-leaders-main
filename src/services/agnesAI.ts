import OllamaService, { OllamaMessage } from './ollama';
import { roofingKnowledgeBase, AgnesKnowledge } from '../data/agnesKnowledge';

export interface ConversationContext {
  userId: string;
  currentModule?: string;
  currentLesson?: string;
  learningProgress: Record<string, number>;
  conversationHistory: OllamaMessage[];
  personalPreferences: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    focusAreas: string[];
  };
  sessionStartTime: Date;
  lastActivity: Date;
}

export interface AgnesResponse {
  message: string;
  confidence: number;
  suggestedActions?: string[];
  relatedTopics?: string[];
  needsVRDemo?: boolean;
  moduleRecommendation?: string;
  learningTips?: string[];
}

export interface ModelConfig {
  name: string;
  purpose: string;
  temperature: number;
  maxTokens: number;
  priority: number;
}

class AgnesAIService {
  private ollama: OllamaService;
  private contexts: Map<string, ConversationContext>;
  private knowledgeBase: AgnesKnowledge;
  private models: ModelConfig[];

  constructor() {
    this.ollama = new OllamaService();
    this.contexts = new Map();
    this.knowledgeBase = roofingKnowledgeBase;

    // Model configuration with fallback hierarchy
    this.models = [
      {
        name: 'susan-ai-21',
        purpose: 'Primary Agnes AI with roofing expertise',
        temperature: 0.7,
        maxTokens: 1000,
        priority: 1,
      },
      {
        name: 'llama3.1:8b',
        purpose: 'General conversation and reasoning',
        temperature: 0.8,
        maxTokens: 800,
        priority: 2,
      },
      {
        name: 'qwen2.5-coder:7b',
        purpose: 'Technical explanations and code examples',
        temperature: 0.6,
        maxTokens: 1200,
        priority: 3,
      },
      {
        name: 'deepseek-r1:1.5b',
        purpose: 'Quick responses and basic queries',
        temperature: 0.9,
        maxTokens: 600,
        priority: 4,
      },
    ];
  }

  // Initialize or get conversation context
  private getContext(userId: string): ConversationContext {
    if (!this.contexts.has(userId)) {
      const context: ConversationContext = {
        userId,
        learningProgress: {},
        conversationHistory: [],
        personalPreferences: {
          learningStyle: 'mixed',
          experienceLevel: 'beginner',
          focusAreas: [],
        },
        sessionStartTime: new Date(),
        lastActivity: new Date(),
      };
      this.contexts.set(userId, context);
    }
    return this.contexts.get(userId)!;
  }

  // Select best available model for the query
  private async selectModel(
    queryType: 'general' | 'technical' | 'safety' | 'sales' = 'general'
  ): Promise<ModelConfig> {
    // Check which models are actually available
    const availableModels = await this.ollama.getModels();
    const availableNames = availableModels.map(m => m.name);

    // Find the best available model based on query type and priority
    for (const model of this.models.sort((a, b) => a.priority - b.priority)) {
      const isAvailable = availableNames.some(name =>
        name.includes(model.name.split(':')[0])
      );
      if (isAvailable) {
        // Adjust temperature based on query type
        const adjustedModel = { ...model };
        switch (queryType) {
          case 'safety':
            adjustedModel.temperature = 0.3; // More precise for safety
            break;
          case 'technical':
            adjustedModel.temperature = 0.5; // Balanced for technical accuracy
            break;
          case 'sales':
            adjustedModel.temperature = 0.8; // More creative for sales scenarios
            break;
        }
        return adjustedModel;
      }
    }

    // Fallback to first available model
    return {
      name: availableNames[0] || 'llama3.1',
      purpose: 'Fallback model',
      temperature: 0.7,
      maxTokens: 800,
      priority: 99,
    };
  }

  // Build context-aware system prompt
  private buildSystemPrompt(
    context: ConversationContext,
    queryType: string
  ): string {
    const basePrompt = `You are Agnes, an expert roofing instructor and mentor at RoofER Training. You have 20+ years of roofing experience and specialize in training new roofers.

Your personality:
- Extremely warm, encouraging, and patient - you celebrate every learning attempt
- Positive and solution-focused - always find something good in student responses
- Flexible with answers - accept similar meanings, synonyms, and close approximations
- Safety-first mindset but delivered with enthusiasm and care
- Practical, hands-on teaching style with lots of encouragement
- Supportive and builds confidence - focus on what students did right first
- Uses real-world examples and stories to inspire confidence

Current student profile:
- Experience level: ${context.personalPreferences.experienceLevel}
- Learning style: ${context.personalPreferences.learningStyle}
- Current module: ${context.currentModule || 'Not specified'}
- Focus areas: ${context.personalPreferences.focusAreas.join(', ') || 'General training'}

Key principles:
1. SAFETY FIRST - Always prioritize safety but deliver with enthusiasm and positive reinforcement
2. CELEBRATE LEARNING - Praise every attempt, effort, and partial understanding
3. FLEXIBLE VALIDATION - Accept similar words, meanings, concepts, and approximations as correct
4. BUILD CONFIDENCE - Focus on what students got right before addressing areas for improvement
5. Use encouraging language like "Great thinking!", "You're on the right track!", "Excellent question!"
6. Provide practical, actionable advice with positive framing
7. Encourage hands-on practice and VR training with excitement
8. Share relevant stories and real-world examples that inspire
9. Ask follow-up questions to build understanding, not to test
10. Recommend appropriate modules or VR scenarios as exciting opportunities

Response style guidelines:
- If a student's answer is close or shows understanding, celebrate it as correct
- Use phrases like "Exactly right!", "Perfect!", "You've got it!", "Great job!"
- When correcting, use phrases like "You're thinking well, and here's another way to look at it..."
- Focus on building up rather than pointing out what's wrong
- Accept synonyms, related concepts, and practical understanding as correct answers
- Encourage experimentation and learning from mistakes

Available knowledge areas:
${Object.keys(this.knowledgeBase.modules).join(', ')}

Respond as Agnes would - be incredibly encouraging, positive, flexible with correctness, and always building student confidence while maintaining safety focus.`;

    return basePrompt;
  }

  // Get relevant knowledge context
  private getRelevantKnowledge(query: string, currentModule?: string): string {
    const queryLower = query.toLowerCase();
    let relevantInfo: string[] = [];

    // Add current module info
    if (currentModule && this.knowledgeBase.modules[currentModule]) {
      const moduleInfo = this.knowledgeBase.modules[currentModule];
      relevantInfo.push(
        `Current Module Context: ${moduleInfo.title} - ${moduleInfo.description}`
      );
      relevantInfo.push(`Key Points: ${moduleInfo.keyPoints.join(', ')}`);
    }

    // Search for relevant topics
    Object.entries(this.knowledgeBase.modules).forEach(([key, module]) => {
      const moduleText =
        `${module.title} ${module.description} ${module.keyPoints.join(' ')}`.toLowerCase();
      if (
        moduleText.includes(queryLower.split(' ')[0]) ||
        queryLower.split(' ').some(word => moduleText.includes(word))
      ) {
        relevantInfo.push(
          `${module.title}: ${module.keyPoints.slice(0, 3).join(', ')}`
        );
      }
    });

    // Add safety protocols if safety-related
    if (
      queryLower.includes('safety') ||
      queryLower.includes('danger') ||
      queryLower.includes('fall')
    ) {
      relevantInfo.push(
        `Safety Priority: ${this.knowledgeBase.safetyProtocols.slice(0, 3).join(', ')}`
      );
    }

    // Add best practices if relevant
    if (
      queryLower.includes('best') ||
      queryLower.includes('practice') ||
      queryLower.includes('how')
    ) {
      relevantInfo.push(
        `Best Practices: ${this.knowledgeBase.bestPractices.slice(0, 3).join(', ')}`
      );
    }

    return relevantInfo.join('\n');
  }

  // Classify query type for model selection
  private classifyQuery(
    query: string
  ): 'general' | 'technical' | 'safety' | 'sales' {
    const queryLower = query.toLowerCase();

    if (
      queryLower.includes('safety') ||
      queryLower.includes('fall') ||
      queryLower.includes('danger') ||
      queryLower.includes('harness') ||
      queryLower.includes('osha')
    ) {
      return 'safety';
    }

    if (
      queryLower.includes('install') ||
      queryLower.includes('measure') ||
      queryLower.includes('material') ||
      queryLower.includes('tool') ||
      queryLower.includes('technique')
    ) {
      return 'technical';
    }

    if (
      queryLower.includes('customer') ||
      queryLower.includes('sell') ||
      queryLower.includes('estimate') ||
      queryLower.includes('price') ||
      queryLower.includes('sales')
    ) {
      return 'sales';
    }

    return 'general';
  }

  // Main chat method with streaming support
  async chat(
    userId: string,
    message: string,
    onChunk?: (chunk: string) => void,
    onComplete?: (response: AgnesResponse) => void
  ): Promise<AgnesResponse> {
    try {
      const context = this.getContext(userId);
      context.lastActivity = new Date();

      // Add user message to history
      context.conversationHistory.push({
        role: 'user',
        content: message,
      });

      // Classify query and select model
      const queryType = this.classifyQuery(message);
      const model = await this.selectModel(queryType);

      // Build context-aware prompt
      const systemPrompt = this.buildSystemPrompt(context, queryType);
      const relevantKnowledge = this.getRelevantKnowledge(
        message,
        context.currentModule
      );

      // Prepare messages for the model
      const messages: OllamaMessage[] = [
        {
          role: 'system',
          content: `${systemPrompt}\n\nRelevant Knowledge:\n${relevantKnowledge}`,
        },
        ...context.conversationHistory.slice(-10), // Keep last 10 messages for context
      ];

      let fullResponse = '';

      if (onChunk) {
        // Streaming response
        await this.ollama.chatStream(
          {
            model: model.name,
            messages,
            options: {
              temperature: model.temperature,
              num_predict: model.maxTokens,
            },
          },
          (chunk: string) => {
            fullResponse += chunk;
            onChunk(chunk);
          },
          (complete: string) => {
            fullResponse = complete;
          }
        );
      } else {
        // Non-streaming response
        const response = await this.ollama.chat({
          model: model.name,
          messages,
          options: {
            temperature: model.temperature,
            num_predict: model.maxTokens,
          },
        });
        fullResponse = response.message.content;
      }

      // Add assistant response to history
      context.conversationHistory.push({
        role: 'assistant',
        content: fullResponse,
      });

      // Analyze response for additional features
      const agnesResponse = this.analyzeResponse(
        fullResponse,
        queryType,
        context
      );

      if (onComplete) {
        onComplete(agnesResponse);
      }

      return agnesResponse;
    } catch (error) {
      console.error('Agnes AI chat failed:', error);

      // Fallback response
      const fallbackResponse: AgnesResponse = {
        message:
          "I'm having trouble connecting to my knowledge base right now. Let me give you some general safety advice: Always wear proper safety equipment, inspect your work area for hazards, and never work alone on a roof. Is there a specific roofing topic I can help you with using my basic knowledge?",
        confidence: 0.3,
        suggestedActions: [
          'Check system connectivity',
          'Try a simpler question',
          'Contact support',
        ],
      };

      if (onComplete) {
        onComplete(fallbackResponse);
      }

      return fallbackResponse;
    }
  }

  // Analyze response for additional features
  private analyzeResponse(
    response: string,
    queryType: string,
    context: ConversationContext
  ): AgnesResponse {
    const responseLower = response.toLowerCase();

    const agnesResponse: AgnesResponse = {
      message: response,
      confidence: 0.8, // Base confidence
    };

    // Suggest VR training if applicable
    if (
      responseLower.includes('hands-on') ||
      responseLower.includes('practice') ||
      responseLower.includes('demonstration') ||
      queryType === 'technical'
    ) {
      agnesResponse.needsVRDemo = true;
      agnesResponse.suggestedActions = agnesResponse.suggestedActions || [];
      agnesResponse.suggestedActions.push('Try VR training scenario');
    }

    // Module recommendations
    if (responseLower.includes('safety')) {
      agnesResponse.moduleRecommendation = 'Module 2: Safety Protocols';
    } else if (
      responseLower.includes('customer') ||
      responseLower.includes('service')
    ) {
      agnesResponse.moduleRecommendation = 'Module 3: Customer Service';
    } else if (
      responseLower.includes('install') ||
      responseLower.includes('technique')
    ) {
      agnesResponse.moduleRecommendation = 'Module 8: Installation Basics';
    }

    // Learning tips based on user's learning style
    if (context.personalPreferences.learningStyle === 'visual') {
      agnesResponse.learningTips = [
        'Try the VR visualization',
        'Look at the diagram examples',
      ];
    } else if (context.personalPreferences.learningStyle === 'kinesthetic') {
      agnesResponse.learningTips = [
        'Practice with the hands-on simulator',
        'Use the interactive tools',
      ];
    }

    // Related topics
    const topics = this.extractTopics(response);
    if (topics.length > 0) {
      agnesResponse.relatedTopics = topics;
    }

    return agnesResponse;
  }

  // Extract topics from response
  private extractTopics(response: string): string[] {
    const topics: string[] = [];
    const responseLower = response.toLowerCase();

    Object.entries(this.knowledgeBase.modules).forEach(([key, module]) => {
      if (responseLower.includes(module.title.toLowerCase())) {
        topics.push(module.title);
      }
    });

    return topics.slice(0, 3); // Limit to 3 topics
  }

  // Update user context
  updateContext(userId: string, updates: Partial<ConversationContext>): void {
    const context = this.getContext(userId);
    Object.assign(context, updates);
  }

  // Get user's learning progress
  getLearningProgress(userId: string): Record<string, number> {
    const context = this.getContext(userId);
    return context.learningProgress;
  }

  // Update learning progress
  updateProgress(userId: string, module: string, progress: number): void {
    const context = this.getContext(userId);
    context.learningProgress[module] = Math.max(0, Math.min(100, progress));
  }

  // Check system health
  async getSystemStatus(): Promise<{
    ollamaAvailable: boolean;
    availableModels: string[];
    recommendedModel: string;
    systemHealth: 'healthy' | 'degraded' | 'offline';
  }> {
    try {
      const available = await this.ollama.isAvailable();
      const models = available ? await this.ollama.getModels() : [];
      const modelNames = models.map(m => m.name);

      let recommendedModel = 'None available';
      let systemHealth: 'healthy' | 'degraded' | 'offline' = 'offline';

      if (available && models.length > 0) {
        const bestModel = await this.selectModel();
        recommendedModel = bestModel.name;
        systemHealth = modelNames.some(name => name.includes('susan-ai-21'))
          ? 'healthy'
          : 'degraded';
      }

      return {
        ollamaAvailable: available,
        availableModels: modelNames,
        recommendedModel,
        systemHealth,
      };
    } catch (error) {
      return {
        ollamaAvailable: false,
        availableModels: [],
        recommendedModel: 'None available',
        systemHealth: 'offline',
      };
    }
  }

  // Clear conversation history
  clearHistory(userId: string): void {
    const context = this.getContext(userId);
    context.conversationHistory = [];
  }

  // Export conversation for analysis
  exportConversation(userId: string): ConversationContext | null {
    return this.contexts.get(userId) || null;
  }
}

export default AgnesAIService;
