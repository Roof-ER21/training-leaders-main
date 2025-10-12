# Agnes AI Router - Project Summary

## Overview

A production-ready intelligent AI routing service that seamlessly integrates local Ollama models with HuggingFace Pro API, providing automatic failover, intelligent model selection, caching, and rate limiting.

## Project Structure

```
ai-router/
├── src/                          # Core service code
│   ├── index.js                  # Main Express server and API endpoints
│   ├── routingService.js         # Intelligent routing logic
│   ├── ollamaService.js          # Ollama integration
│   ├── huggingfaceService.js     # HuggingFace Pro integration
│   ├── cache.js                  # Response caching with TTL
│   ├── rateLimiter.js            # Token bucket rate limiting
│   └── logger.js                 # Winston logging configuration
│
├── config/
│   └── models.js                 # Model configurations and routing rules
│
├── examples/                     # Integration examples
│   ├── client.js                 # Basic client library and examples
│   └── advanced.js               # Advanced patterns (agents, assistants)
│
├── tests/                        # Test files
│   ├── routing.test.js           # Routing logic tests
│   └── cache.test.js             # Cache service tests
│
├── scripts/                      # Automation scripts
│   ├── setup.sh                  # Automated setup script
│   └── test-integration.sh       # Integration testing script
│
├── package.json                  # Dependencies and scripts
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
│
├── README.md                     # Full documentation
├── QUICKSTART.md                 # Quick start guide
├── DEPLOYMENT.md                 # Deployment guide
└── PROJECT_SUMMARY.md            # This file
```

## Key Features

### 1. Intelligent Routing
- **Complexity Analysis**: Analyzes query complexity (0.0-1.0 score)
- **Task Detection**: Identifies task type (code, reasoning, simple, complex)
- **Automatic Selection**: Routes to optimal provider/model
- **Fallback Support**: Automatically falls back if primary fails

### 2. Dual Provider Support
- **Ollama (Local)**: Fast, free, offline-capable
  - qwen2.5:7b (conversational)
  - deepseek-coder:1.3b (code)
  - deepseek-r1:1.5b (reasoning)
  - qwen2.5-vision:7b (vision)

- **HuggingFace Pro (Cloud)**: Powerful, accurate
  - Meta-Llama-3.1-70B-Instruct (conversational)
  - Qwen2.5-Coder-32B-Instruct (code)
  - Meta-Llama-3.1-8B-Instruct (fast)
  - DeepSeek-R1 (reasoning)

### 3. Performance Optimization
- **Response Caching**: MD5-based caching with configurable TTL
- **Rate Limiting**: Token bucket algorithm per provider
- **Connection Pooling**: Efficient HTTP connections
- **Retry Logic**: Exponential backoff for transient failures

### 4. Production Ready
- **Comprehensive Logging**: Structured logging with Winston
- **Health Monitoring**: Real-time health checks and metrics
- **Error Handling**: Graceful degradation and error recovery
- **Security**: Environment-based configuration, no hardcoded secrets

## API Endpoints

### Core Endpoints
- `POST /v1/completions` - Text completion
- `POST /v1/chat/completions` - Chat completion
- `GET /v1/models` - List available models
- `GET /health` - Service health status
- `GET /stats` - Usage statistics

### Admin Endpoints
- `POST /admin/cache/clear` - Clear cache
- `POST /admin/stats/reset` - Reset statistics

## Configuration

### Required Environment Variables
```env
HUGGINGFACE_API_KEY=hf_xxxx     # HuggingFace Pro API key
```

### Optional Environment Variables
```env
PORT=3000                        # Server port
NODE_ENV=production              # Environment
OLLAMA_BASE_URL=http://localhost:11434
USE_OLLAMA_FIRST=true            # Prefer Ollama when available
FALLBACK_ENABLED=true            # Enable automatic fallback
COMPLEXITY_THRESHOLD=0.7         # Routing threshold (0-1)
CACHE_TTL_SECONDS=300            # Cache time-to-live
MAX_REQUESTS_PER_MINUTE=60       # Rate limit
MAX_CONCURRENT_REQUESTS=10       # Concurrent request limit
```

## Routing Logic

### Decision Tree
1. Calculate query complexity score (0.0-1.0)
2. Detect task type (code/reasoning/simple/complex)
3. Check provider availability
4. Apply routing rules:
   - Complexity < 0.7 + Ollama available → Ollama
   - Complexity >= 0.7 OR Ollama unavailable → HuggingFace
   - Primary fails + fallback enabled → Alternate provider

### Complexity Factors
- **Query Length** (20%): Longer queries = higher complexity
- **Keywords** (30%): Technical terms increase score
- **Multi-part** (30%): Multiple questions increase score
- **Technical Depth** (20%): Architecture/implementation terms

## Usage Examples

### Simple Completion
```javascript
import AgnesAIClient from './examples/client.js';

const agnes = new AgnesAIClient();
const result = await agnes.complete('What is machine learning?');
console.log(result.text);
```

### Code Generation
```javascript
const code = await agnes.generateCode(
  'a function to sort an array',
  'python'
);
console.log(code.text);
```

### Chat Conversation
```javascript
const response = await agnes.chat([
  { role: 'system', content: 'You are a helpful assistant' },
  { role: 'user', content: 'Help me debug this code' }
]);
console.log(response.text);
```

### Force Specific Provider
```javascript
const result = await agnes.complete('Complex query', {
  provider: 'huggingface',
  temperature: 0.3,
  maxTokens: 2000
});
```

## Performance Metrics

### Typical Performance
- **Local (Ollama)**: 100-500ms
- **Cloud (HuggingFace)**: 500-3000ms
- **Cache Hit**: <10ms
- **Cache Hit Rate**: 20-30% (typical)

### Rate Limits
- **Ollama**: 100 req/min, 5 concurrent
- **HuggingFace**: 60 req/min, 10 concurrent

### Caching
- **Storage**: In-memory with LRU eviction
- **TTL**: 5 minutes (configurable)
- **Max Size**: 1000 entries (configurable)
- **Key Generation**: MD5 hash of (query, model, temperature, maxTokens)

## Deployment Options

### 1. Railway (Recommended)
- One-click deployment
- Automatic HTTPS
- Environment variable management
- Easy scaling
- Free tier available

### 2. Docker
- Containerized deployment
- Docker Compose for Ollama + Router
- Easy updates and rollbacks

### 3. AWS EC2
- Full control
- PM2 process management
- Nginx reverse proxy
- Custom scaling

### 4. Google Cloud Run
- Serverless deployment
- Automatic scaling
- Pay per use

## Monitoring & Observability

### Logs
- **combined.log**: All logs
- **error.log**: Errors only
- **Format**: Structured JSON with timestamps

### Metrics
- Request counts by provider
- Average latency by provider
- Cache hit/miss rates
- Fallback events
- Rate limit events
- Error rates
- Success rates

### Health Checks
```bash
# Quick health check
curl http://localhost:3000/health

# Detailed statistics
curl http://localhost:3000/stats
```

## Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
./scripts/test-integration.sh
```

### Manual Testing
```bash
# Run example client
node examples/client.js

# Run advanced examples
node examples/advanced.js
```

## Security Considerations

### Implemented
- API keys in environment variables
- No hardcoded secrets
- Request validation
- Rate limiting
- Error message sanitization (production mode)
- Proper CORS handling
- Input sanitization

### Recommended
- Use HTTPS in production
- Implement authentication/authorization
- Regular security audits
- Keep dependencies updated
- Monitor for suspicious activity
- Set up alerts for unusual patterns

## Cost Optimization

### Strategies
1. **Maximize Ollama Usage**: Free and fast
2. **Enable Caching**: Reduce duplicate requests
3. **Optimize Token Limits**: Use smaller limits when possible
4. **Route Simple Queries Locally**: Save HuggingFace credits
5. **Monitor Usage**: Track provider usage percentages

### Typical Costs
- **Ollama**: $0 (self-hosted)
- **HuggingFace Pro**: Pay per token
  - Llama 3.1 70B: ~$0.001/1K tokens
  - Llama 3.1 8B: ~$0.0002/1K tokens
- **Railway Hosting**: $5/month + usage

## Troubleshooting

### Common Issues

**"HuggingFace service unavailable"**
- Check API key in .env
- Verify API key is valid
- Check HuggingFace status

**"Ollama connection refused"**
- Ensure Ollama is running
- Verify OLLAMA_BASE_URL
- Check Ollama has models pulled

**"High latency"**
- Check cache hit rate
- Verify network connection
- Consider using Ollama for simple queries
- Check rate limiting events

**"Port already in use"**
- Change PORT in .env
- Kill existing process
- Check for conflicting services

## Development

### Adding New Models
1. Update `config/models.js`
2. Add model configuration
3. Update routing logic if needed
4. Test thoroughly

### Adding New Providers
1. Create service file (e.g., `src/claudeService.js`)
2. Implement standard interface
3. Update routing service
4. Add configuration
5. Update documentation

### Code Style
- ESM modules (import/export)
- Async/await for async operations
- Comprehensive error handling
- Detailed logging
- Clear variable names
- Modular architecture

## Roadmap

### Planned Features
- [ ] WebSocket streaming support
- [ ] Multi-modal input (images, audio)
- [ ] Advanced load balancing
- [ ] Request queuing with priorities
- [ ] Distributed caching (Redis)
- [ ] Prometheus metrics export
- [ ] GraphQL API
- [ ] CLI tool for management
- [ ] Dashboard UI
- [ ] A/B testing framework

### Future Providers
- [ ] Anthropic Claude
- [ ] OpenAI GPT
- [ ] Google Gemini
- [ ] Cohere
- [ ] Azure OpenAI

## Contributing

### Setup Development Environment
```bash
git clone <repo-url>
cd ai-router
./scripts/setup.sh
npm run dev
```

### Testing Changes
```bash
npm test
./scripts/test-integration.sh
```

### Code Review Checklist
- [ ] Tests pass
- [ ] No console.log (use logger)
- [ ] Error handling implemented
- [ ] Documentation updated
- [ ] Examples updated if needed
- [ ] Performance impact considered

## Support

### Documentation
- **README.md**: Comprehensive documentation
- **QUICKSTART.md**: Getting started guide
- **DEPLOYMENT.md**: Production deployment
- **examples/**: Code examples

### Getting Help
1. Check documentation
2. Review logs in `logs/`
3. Check `/health` endpoint
4. Run integration tests
5. Contact maintainers

## License

MIT License - See LICENSE file for details

## Credits

Built for **Agnes AI** - Intelligent, Reliable, Fast

### Technologies Used
- Node.js / Express
- HuggingFace Inference API
- Ollama
- Winston (logging)
- Axios (HTTP client)
- Node-Cache (caching)

---

**Version**: 1.0.0
**Last Updated**: 2025-10-11
**Status**: Production Ready

For questions or support, refer to the documentation or contact the Agnes AI team.
