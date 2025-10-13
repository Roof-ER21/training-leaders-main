import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AgnesAIService, {
  AgnesResponse,
  ConversationContext,
} from '../services/agnesAI';
import {
  Send,
  Mic,
  Volume2,
  VolumeX,
  Bot,
  Loader2,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Play,
  Brain,
  Lightbulb,
  BookOpen,
  Shield,
  Target,
  X,
  ChevronDown,
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agnes';
  timestamp: Date;
  isStreaming?: boolean;
  confidence?: number;
  suggestedActions?: string[];
  relatedTopics?: string[];
  needsVRDemo?: boolean;
  moduleRecommendation?: string;
  learningTips?: string[];
}

interface AgnesChatProps {
  currentModule?: string;
  currentLesson?: string;
  onModuleRecommendation?: (module: string) => void;
  onVRDemoRequest?: () => void;
  className?: string;
}

const AgnesChat: React.FC<AgnesChatProps> = ({
  currentModule,
  currentLesson,
  onModuleRecommendation,
  onVRDemoRequest,
  className = '',
}) => {
  // Core state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] =
    useState<string>('');

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);

  // Feature state
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);

  // AI service state
  const [agnesService, setAgnesService] = useState<AgnesAIService | null>(null);
  const [systemStatus, setSystemStatus] = useState({
    ollamaAvailable: false,
    availableModels: [] as string[],
    recommendedModel: 'Loading...',
    systemHealth: 'offline' as 'healthy' | 'degraded' | 'offline',
  });

  // User preferences
  const [userPreferences, setUserPreferences] = useState({
    learningStyle: 'mixed' as 'visual' | 'auditory' | 'kinesthetic' | 'mixed',
    experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    focusAreas: [] as string[],
  });

  // Scroll state
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognition = useRef<any>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);
  const userHasScrolled = useRef<boolean>(false);
  const lastScrollTop = useRef<number>(0);

  // Initialize Agnes AI service
  useEffect(() => {
    const initializeService = async () => {
      const service = new AgnesAIService();
      setAgnesService(service);

      // Check system status
      const status = await service.getSystemStatus();
      setSystemStatus(status);

      // Load user preferences from localStorage
      const savedPreferences = localStorage.getItem('agnes_user_preferences');
      if (savedPreferences) {
        setUserPreferences(JSON.parse(savedPreferences));
      }

      // Load previous conversation
      const savedMessages = localStorage.getItem('agnes_conversation');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      } else {
        // Send welcome message
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          content: `Hello there! I'm Agnes, your roofing instructor and mentor - and I'm SO excited to work with you! 🎉 I have 20+ years of experience in the roofing industry and I absolutely love helping new roofers succeed.\n\nI'm here to support you every step of the way with:\n• Safety protocols and best practices (always our #1 priority!)\n• Technical roofing techniques made simple\n• Customer service skills that build confidence\n• Material selection and estimation tips\n• Problem-solving strategies for any challenge\n\nDon't worry about getting things "perfect" - every question is a great question, and I'll celebrate every step of your learning journey! What would you like to explore today?`,
          sender: 'agnes',
          timestamp: new Date(),
          confidence: 1.0,
          learningTips: [
            'Ask me anything - there are no silly questions!',
            'Tell me your experience level so I can tailor my help',
            'Try the VR demonstrations for fun, hands-on practice',
            'Remember: mistakes are just learning opportunities!',
          ],
        };
        setMessages([welcomeMessage]);
      }
    };

    initializeService();
  }, []);

  // Initialize voice features
  useEffect(() => {
    // Check speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onstart = () => setIsListening(true);
      recognition.current.onend = () => setIsListening(false);
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        // Auto-send after capture
        setTimeout(() => {
          handleSendMessage(transcript);
        }, 50);
        // Auto-focus input after voice recognition
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };
      recognition.current.onerror = (event: any) => {
        console.log('Speech recognition error:', event.error);
        setIsListening(false);
        // Show user-friendly error message
        if (event.error === 'no-speech') {
          // Don't show error for no speech - just try again
        } else if (event.error === 'not-allowed') {
          alert(
            'Microphone access is required for voice input. Please enable microphone permissions.'
          );
        }
      };
      recognition.current.onnomatch = () => {
        console.log('No speech was recognized');
        setIsListening(false);
      };
    }

    // Check speech synthesis support
    if ('speechSynthesis' in window) {
      synthesis.current = window.speechSynthesis;
      setVoiceSupported(true);
    }
  }, []);

  // Update context when module changes
  useEffect(() => {
    if (agnesService && currentModule) {
      agnesService.updateContext('user', {
        currentModule,
        currentLesson,
        personalPreferences: userPreferences,
      } as Partial<ConversationContext>);
    }
  }, [agnesService, currentModule, currentLesson, userPreferences]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('agnes_conversation', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom with smart behavior
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    // Check if we should auto-scroll
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <=
      100;
    const shouldAutoScroll = !userHasScrolled.current || isNearBottom;

    if (shouldAutoScroll) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: messages.length <= 1 ? 'auto' : 'smooth', // Instant scroll for first message
          block: 'end',
        });
      });
    }
  }, [messages, currentStreamingMessage]);

  // Handle scroll detection
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const currentScrollTop = container.scrollTop;
    const isScrollingUp = currentScrollTop < lastScrollTop.current;
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <=
      50;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <=
      100;

    // Mark that user has scrolled if they scroll up from the bottom
    if (isScrollingUp && !isAtBottom) {
      userHasScrolled.current = true;
      setShowScrollToBottom(true);
    } else if (isAtBottom) {
      userHasScrolled.current = false;
      setShowScrollToBottom(false);
    }

    // Hide scroll button when near bottom
    if (isNearBottom && showScrollToBottom) {
      setShowScrollToBottom(false);
    }

    lastScrollTop.current = currentScrollTop;
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    userHasScrolled.current = false;
    setShowScrollToBottom(false);
  };

  // Handle sending messages
  const handleSendMessage = async (overrideMessage?: string) => {
    const pending = (overrideMessage ?? inputMessage).trim();
    if (!pending || isLoading) {
      return;
    }

    // Check if Agnes service is initialized
    if (!agnesService) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          'Agnes AI is still initializing. Please wait a moment and try again.',
        sender: 'agnes',
        timestamp: new Date(),
        confidence: 0.3,
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: pending,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Reset scroll state when user sends a message
    userHasScrolled.current = false;
    setShowScrollToBottom(false);

    try {
      console.log('[AgnesChat] Sending message:', userMessage.content);
      let streamingMessageId = (Date.now() + 1).toString();
      let fullResponse = '';
      let hasReceivedChunks = false;

      // Create placeholder message for streaming
      const streamingMessage: Message = {
        id: streamingMessageId,
        content: '',
        sender: 'agnes',
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages(prev => [...prev, streamingMessage]);

      // Get AI response with streaming
      const response = await agnesService.chat(
        'user',
        userMessage.content,
        (chunk: string) => {
          hasReceivedChunks = true;
          fullResponse += chunk;
          setCurrentStreamingMessage(fullResponse);

          // Update the streaming message
          setMessages(prev =>
            prev.map(msg =>
              msg.id === streamingMessageId
                ? { ...msg, content: fullResponse }
                : msg
            )
          );
        },
        (agnesResponse: AgnesResponse) => {
          console.log('[AgnesChat] Received complete response:', agnesResponse);

          // Final message with all metadata
          const finalMessage: Message = {
            id: streamingMessageId,
            content: agnesResponse.message,
            sender: 'agnes',
            timestamp: new Date(),
            confidence: agnesResponse.confidence,
            suggestedActions: agnesResponse.suggestedActions,
            relatedTopics: agnesResponse.relatedTopics,
            needsVRDemo: agnesResponse.needsVRDemo,
            moduleRecommendation: agnesResponse.moduleRecommendation,
            learningTips: agnesResponse.learningTips,
            isStreaming: false,
          };

          setMessages(prev =>
            prev.map(msg =>
              msg.id === streamingMessageId ? finalMessage : msg
            )
          );

          // Handle automatic actions
          if (agnesResponse.needsVRDemo && onVRDemoRequest) {
            setTimeout(() => onVRDemoRequest(), 1000);
          }

          if (agnesResponse.moduleRecommendation && onModuleRecommendation) {
            setTimeout(
              () =>
                onModuleRecommendation!(agnesResponse.moduleRecommendation!),
              1500
            );
          }

          // Text-to-speech if enabled
          if (isVoiceEnabled && synthesis.current) {
            speakMessage(agnesResponse.message);
          }
        }
      );

      // If no chunks were received (non-streaming fallback), use the direct response
      if (!hasReceivedChunks && response.message) {
        console.log('[AgnesChat] Using non-streaming response');
        const finalMessage: Message = {
          id: streamingMessageId,
          content: response.message,
          sender: 'agnes',
          timestamp: new Date(),
          confidence: response.confidence,
          suggestedActions: response.suggestedActions,
          relatedTopics: response.relatedTopics,
          needsVRDemo: response.needsVRDemo,
          moduleRecommendation: response.moduleRecommendation,
          learningTips: response.learningTips,
          isStreaming: false,
        };

        setMessages(prev =>
          prev.map(msg => (msg.id === streamingMessageId ? finalMessage : msg))
        );

        // Text-to-speech if enabled
        if (isVoiceEnabled && synthesis.current) {
          speakMessage(response.message);
        }
      }
    } catch (error: any) {
      console.error('[AgnesChat] Error:', error);

      // Remove the streaming placeholder message
      setMessages(prev => prev.filter(msg => !msg.isStreaming));

      // Provide detailed error message
      let errorContent = "I'm having trouble connecting to my AI system. ";

      if (error.message?.includes('Ollama')) {
        errorContent +=
          'The Ollama service might not be running. Please make sure Ollama is started and try again.';
      } else if (
        error.message?.includes('fetch') ||
        error.message?.includes('network')
      ) {
        errorContent +=
          'There seems to be a network issue. Please check your connection and try again.';
      } else if (error.message?.includes('timeout')) {
        errorContent +=
          'The request took too long. Please try asking a simpler question or try again later.';
      } else {
        errorContent +=
          'Please try rephrasing your question or refresh the page and try again.';
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorContent,
        sender: 'agnes',
        timestamp: new Date(),
        confidence: 0.3,
        suggestedActions: [
          'Check system status above',
          'Try a simpler question',
          'Refresh the page',
        ],
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setCurrentStreamingMessage('');
    }
  };

  // Voice input handling
  const handleVoiceInput = async () => {
    if (!recognition.current) {
      alert(
        'Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.'
      );
      return;
    }

    if (isListening) {
      recognition.current.stop();
      return;
    }

    // Request microphone permission first
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately - we just needed permission
      stream.getTracks().forEach(track => track.stop());

      // Now start recognition
      try {
        recognition.current.start();
        console.log('[Voice] Speech recognition started');
      } catch (error: any) {
        console.error('[Voice] Failed to start speech recognition:', error);
        if (error.name === 'InvalidStateError') {
          // Already running, stop and restart
          recognition.current.stop();
          setTimeout(() => {
            try {
              recognition.current.start();
            } catch (e) {
              console.error('[Voice] Retry failed:', e);
            }
          }, 100);
        } else {
          alert('Could not start voice input. Please try again.');
        }
        setIsListening(false);
      }
    } catch (error: any) {
      console.error('[Voice] Microphone permission denied:', error);
      alert(
        'Microphone access is required for voice input. Please enable microphone permissions in your browser settings and try again.'
      );
      setIsListening(false);
    }
  };

  // Text-to-speech
  const speakMessage = (text: string) => {
    if (!synthesis.current) {
      console.warn('[Voice] Speech synthesis not available');
      return;
    }

    try {
      synthesis.current.cancel();

      // Clean text for better speech synthesis
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
        .replace(/\*(.*?)\*/g, '$1') // Remove italic markdown
        .replace(/#{1,6}\s/g, '') // Remove headers
        .replace(/•/g, '') // Remove bullet points
        .replace(/\n{2,}/g, '. ') // Replace multiple newlines with periods
        .replace(/\n/g, ', ') // Replace single newlines with commas
        .trim();

      if (!cleanText) {
        console.warn('[Voice] No text to speak');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Load voices if not already loaded
      let voices = synthesis.current.getVoices();

      // If voices aren't loaded yet, wait for them
      if (voices.length === 0) {
        synthesis.current.addEventListener(
          'voiceschanged',
          () => {
            voices = synthesis.current!.getVoices();
            selectVoiceAndSpeak(utterance, voices);
          },
          { once: true }
        );
      } else {
        selectVoiceAndSpeak(utterance, voices);
      }
    } catch (error) {
      console.error('[Voice] Text-to-speech error:', error);
      setIsSpeaking(false);
    }
  };

  // Helper function to select voice and speak
  const selectVoiceAndSpeak = (
    utterance: SpeechSynthesisUtterance,
    voices: SpeechSynthesisVoice[]
  ) => {
    if (!synthesis.current) return;

    // Try to select a more natural voice (prefer female voices for Agnes)
    const preferredVoice =
      voices.find(
        voice =>
          voice.name.toLowerCase().includes('female') ||
          voice.name.toLowerCase().includes('woman') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('karen') ||
          voice.name.toLowerCase().includes('victoria') ||
          voice.name.toLowerCase().includes('zira')
      ) || voices.find(voice => voice.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
      console.log('[Voice] Using voice:', preferredVoice.name);
    }

    // Set natural speaking parameters
    utterance.rate = 0.95; // Slightly slower for clarity
    utterance.pitch = 1.1; // Slightly higher pitch for friendliness
    utterance.volume = 0.85; // Good volume level

    utterance.onstart = () => {
      console.log('[Voice] Started speaking');
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      console.log('[Voice] Finished speaking');
      setIsSpeaking(false);
    };

    utterance.onerror = error => {
      console.error('[Voice] Speech synthesis error:', error);
      setIsSpeaking(false);
    };

    try {
      synthesis.current.speak(utterance);
    } catch (error) {
      console.error('[Voice] Failed to speak:', error);
      setIsSpeaking(false);
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthesis.current) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Clear conversation
  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('agnes_conversation');
    if (agnesService) {
      agnesService.clearHistory('user');
    }
  };

  // Refresh system status
  const refreshSystemStatus = async () => {
    if (agnesService) {
      const status = await agnesService.getSystemStatus();
      setSystemStatus(status);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get system health color
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy':
        return 'text-green-600';
      case 'degraded':
        return 'text-yellow-600';
      case 'offline':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Get system health icon
  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy':
        return CheckCircle;
      case 'degraded':
        return AlertTriangle;
      case 'offline':
        return X;
      default:
        return AlertTriangle;
    }
  };

  const HealthIcon = getHealthIcon(systemStatus.systemHealth);

  return (
    <div
      className={`flex flex-col h-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Agnes AI Coach</h3>
              <p className="text-purple-100 text-sm">
                {systemStatus.systemHealth === 'healthy'
                  ? 'Ready to help'
                  : 'Limited functionality'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSystemStatus(!showSystemStatus)}
              className={`p-2 rounded-lg transition-colors duration-200 ${getHealthColor(systemStatus.systemHealth)} bg-white bg-opacity-20 hover:bg-opacity-30`}
            >
              <HealthIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* System Status */}
        {showSystemStatus && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 p-3 bg-white bg-opacity-10 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">System Status</span>
              <button
                onClick={refreshSystemStatus}
                className="p-1 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1 text-xs">
              <div>
                Ollama:{' '}
                {systemStatus.ollamaAvailable
                  ? '✓ Connected'
                  : '✗ Not available'}
              </div>
              <div>Active Model: {systemStatus.recommendedModel}</div>
              <div>Available Models: {systemStatus.availableModels.length}</div>
            </div>
          </motion.div>
        )}

        {/* Settings */}
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 p-3 bg-white bg-opacity-10 rounded-lg"
          >
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="learning-style-select"
                  className="text-sm font-medium block mb-1"
                >
                  Learning Style
                </label>
                <select
                  id="learning-style-select"
                  value={userPreferences.learningStyle}
                  onChange={e =>
                    setUserPreferences(prev => ({
                      ...prev,
                      learningStyle: e.target.value as any,
                    }))
                  }
                  className="w-full px-2 py-1 text-gray-900 text-sm rounded border border-gray-300"
                >
                  <option value="mixed">Mixed</option>
                  <option value="visual">Visual</option>
                  <option value="auditory">Auditory</option>
                  <option value="kinesthetic">Hands-on</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="experience-level-select"
                  className="text-sm font-medium block mb-1"
                >
                  Experience Level
                </label>
                <select
                  id="experience-level-select"
                  value={userPreferences.experienceLevel}
                  onChange={e =>
                    setUserPreferences(prev => ({
                      ...prev,
                      experienceLevel: e.target.value as any,
                    }))
                  }
                  className="w-full px-2 py-1 text-gray-900 text-sm rounded border border-gray-300"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="voice-enabled"
                  checked={isVoiceEnabled}
                  onChange={e => setIsVoiceEnabled(e.target.checked)}
                  disabled={!voiceSupported}
                  className="rounded"
                />
                <label htmlFor="voice-enabled" className="text-sm">
                  Voice responses {!voiceSupported && '(not supported)'}
                </label>
              </div>
              <button
                onClick={clearConversation}
                className="w-full py-2 px-3 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                Clear Conversation
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto p-6 space-y-6 min-h-[400px] max-h-[600px] scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}
            >
              {message.sender === 'agnes' && (
                <div className="flex items-center space-x-2 mb-1">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Agnes</span>
                  {message.confidence && (
                    <span className="text-xs text-gray-500">
                      {Math.round(message.confidence * 100)}% confident
                    </span>
                  )}
                </div>
              )}

              <div
                className={`p-3 rounded-2xl break-words ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="whitespace-pre-wrap break-words overflow-wrap-anywhere">
                  {message.content}
                </div>
                {message.isStreaming && (
                  <div className="flex items-center mt-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="ml-2 text-sm opacity-70">Typing...</span>
                  </div>
                )}
              </div>

              {message.sender === 'agnes' && (
                <div className="mt-2 text-xs text-gray-500">
                  {message.timestamp instanceof Date
                    ? message.timestamp.toLocaleTimeString()
                    : new Date(message.timestamp).toLocaleTimeString()}
                </div>
              )}

              {/* Suggested Actions */}
              {message.suggestedActions &&
                message.suggestedActions.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (action.includes('VR')) {
                            onVRDemoRequest?.();
                          } else {
                            setInputMessage(action);
                          }
                        }}
                        className="block w-full text-left px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm"
                      >
                        <Play className="w-3 h-3 inline mr-2" />
                        {action}
                      </button>
                    ))}
                  </div>
                )}

              {/* Learning Tips */}
              {message.learningTips && message.learningTips.length > 0 && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">
                      Learning Tips
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {message.learningTips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-yellow-700">
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Topics */}
              {message.relatedTopics && message.relatedTopics.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {message.relatedTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setInputMessage(`Tell me more about ${topic}`)
                      }
                      className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full hover:bg-gray-300 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-8 pb-2" />

        {/* Scroll to bottom button */}
        <AnimatePresence>
          {showScrollToBottom && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToBottom}
              className="absolute bottom-6 right-6 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 z-10"
              title="Scroll to bottom"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Agnes anything about roofing..."
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {voiceSupported && (
              <button
                onClick={handleVoiceInput}
                disabled={isLoading}
                title={isListening ? 'Stop listening...' : 'Click to speak'}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 ${
                  isListening
                    ? 'text-red-600 bg-red-100 shadow-lg scale-110 animate-pulse'
                    : 'text-purple-500 bg-purple-50 hover:text-purple-600 hover:bg-purple-100 hover:scale-105'
                }`}
              >
                {isListening ? (
                  <Mic className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            )}
          </div>

          {isSpeaking && (
            <button
              onClick={stopSpeaking}
              className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
            >
              <VolumeX className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            className={`p-3 rounded-xl transition-colors ${
              isLoading || !inputMessage.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Voice Status */}
        {voiceSupported && (isListening || isSpeaking) && (
          <div className="mt-2 flex items-center justify-center">
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isListening
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {isListening ? (
                <>
                  <Mic className="w-4 h-4 animate-pulse" />
                  <span>Listening... speak now!</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span>Agnes is speaking...</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() =>
              setInputMessage('What safety equipment should I use?')
            }
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Shield className="w-3 h-3 inline mr-1" />
            Safety
          </button>
          <button
            onClick={() =>
              setInputMessage('How do I measure a roof accurately?')
            }
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Target className="w-3 h-3 inline mr-1" />
            Measuring
          </button>
          <button
            onClick={() =>
              setInputMessage('What roofing materials should I use?')
            }
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
          >
            <BookOpen className="w-3 h-3 inline mr-1" />
            Materials
          </button>
          <button
            onClick={() => setInputMessage('Show me installation techniques')}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Brain className="w-3 h-3 inline mr-1" />
            Techniques
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgnesChat;
