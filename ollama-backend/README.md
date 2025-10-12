# Ollama Backend for Agnes AI

Railway-deployable Ollama backend service with intelligent model routing, fallback mechanisms, and comprehensive API wrapper.

## Features

- **Multi-Model Support**: susan-ai-21, llama3.1, qwen2.5-coder:7b, deepseek-r1:1.5b, deepseek-coder:1.3b
- **Intelligent Routing**: Automatic model selection with fallback mechanisms
- **Model Caching**: Efficient model availability tracking
- **Health Monitoring**: Comprehensive health check endpoints
- **Rate Limiting**: Built-in API rate limiting and security
- **Streaming Support**: Real-time streaming responses
- **Auto-Pull**: Automatic model downloading on startup
- **Production Ready**: Docker-based deployment with Railway integration

## Architecture

```
┌─────────────────┐
│   Agnes AI      │
│   Frontend      │
└────────┬────────┘
         │ HTTP/HTTPS
         ▼
┌─────────────────┐
│  Express API    │◄─── Health Checks
│   Wrapper       │◄─── Rate Limiting
│  (Port 3000)    │◄─── CORS & Security
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Ollama Service  │◄─── Model Management
│  (Port 11434)   │◄─── Inference Engine
└─────────────────┘
```

## Quick Start

### Local Development

1. **Install Dependencies**
```bash
npm install
```

2. **Start Ollama Locally**
```bash
# Make sure Ollama is installed and running
ollama serve
```

3. **Pull Required Models**
```bash
ollama pull llama3.1
ollama pull qwen2.5-coder:7b
ollama pull deepseek-r1:1.5b
ollama pull deepseek-coder:1.3b
```

4. **Create Custom Susan AI Model**
```bash
ollama create susan-ai-21 -f Modelfile.susan-ai-21
```

5. **Start the API Server**
```bash
npm start
```

6. **Test Connection**
```bash
npm test
```

### Railway Deployment

#### Prerequisites
- Railway account
- Railway CLI installed: `npm install -g @railway/cli`
- Git repository

#### Deployment Steps

1. **Login to Railway**
```bash
railway login
```

2. **Create New Project**
```bash
railway init
```

3. **Link to Project**
```bash
railway link
```

4. **Set Environment Variables** (Optional)
```bash
railway variables set PORT=3000
railway variables set NODE_ENV=production
railway variables set ALLOWED_ORIGINS=https://your-agnes-ai-domain.com
```

5. **Deploy**
```bash
railway up
```

6. **Monitor Deployment**
```bash
railway logs
```

#### Railway Dashboard Configuration

1. Go to your Railway project dashboard
2. Navigate to **Settings**
3. Configure:
   - **Region**: Choose closest to your users
   - **Health Check Path**: `/health`
   - **Health Check Timeout**: 300 seconds
   - **Restart Policy**: On Failure

4. Monitor deployment:
   - Check **Deployments** tab for build status
   - View **Logs** for startup progress
   - Test **Health** endpoint

## API Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "ollama-backend-agnes-ai",
  "timestamp": "2025-10-11T00:00:00.000Z",
  "ollama": {
    "connected": true,
    "host": "http://localhost:11434",
    "modelsAvailable": 5
  },
  "supportedModels": ["susan-ai-21", "llama3.1", "qwen2.5-coder:7b", "deepseek-r1:1.5b", "deepseek-coder:1.3b"]
}
```

### List Models
```http
GET /api/models
```

**Response:**
```json
{
  "success": true,
  "models": [
    {
      "name": "llama3.1",
      "size": 4660000000,
      "modified": "2025-10-11T00:00:00Z",
      "supported": true
    }
  ],
  "supported": { ... },
  "lastUpdated": "2025-10-11T00:00:00.000Z"
}
```

### Generate Completion
```http
POST /api/generate
Content-Type: application/json

{
  "model": "susan-ai-21",
  "prompt": "What are the key principles of effective leadership?",
  "stream": false,
  "options": {
    "temperature": 0.7,
    "top_p": 0.9,
    "max_tokens": 500
  }
}
```

**Response:**
```json
{
  "success": true,
  "model": "susan-ai-21",
  "response": {
    "response": "Effective leadership is built on several key principles...",
    "done": true
  }
}
```

### Chat Completion
```http
POST /api/chat
Content-Type: application/json

{
  "model": "susan-ai-21",
  "messages": [
    {
      "role": "system",
      "content": "You are Susan, an AI training assistant."
    },
    {
      "role": "user",
      "content": "How can I improve my team's communication?"
    }
  ],
  "stream": false
}
```

**Response:**
```json
{
  "success": true,
  "model": "susan-ai-21",
  "response": {
    "message": {
      "role": "assistant",
      "content": "Improving team communication requires..."
    },
    "done": true
  }
}
```

### Pull Model
```http
POST /api/pull
Content-Type: application/json

{
  "model": "llama3.1"
}
```

**Response:** (Streaming NDJSON)
```json
{"status": "pulling manifest"}
{"status": "downloading", "completed": 1000000, "total": 4660000000}
...
{"status": "success"}
```

### Model Info
```http
GET /api/show/llama3.1
```

**Response:**
```json
{
  "success": true,
  "model": "llama3.1",
  "info": {
    "modelfile": "...",
    "parameters": "...",
    "template": "..."
  }
}
```

## Model Configuration

### Supported Models

| Model | Size | Purpose | Fallback |
|-------|------|---------|----------|
| susan-ai-21 | ~4.7GB | Custom Agnes AI personality | llama3.1 |
| llama3.1 | ~4.7GB | General purpose AI | None |
| qwen2.5-coder:7b | ~4.4GB | Advanced code generation | deepseek-coder:1.3b |
| deepseek-r1:1.5b | ~1.3GB | Advanced reasoning | None |
| deepseek-coder:1.3b | ~1.3GB | Code optimization | None |

### Fallback Logic

1. Request comes in for specific model (e.g., `susan-ai-21`)
2. System checks if model is available
3. If not available, tries fallback model (e.g., `llama3.1`)
4. If fallback not available, uses first available model
5. If no models available, returns error

### Creating Custom Susan AI Model

The `susan-ai-21` model is a customized version of llama3.1 with Agnes AI personality:

```bash
# After deploying and models are pulled, create custom model:
ollama create susan-ai-21 -f Modelfile.susan-ai-21
```

This can be done via Railway shell or by modifying the startup script.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 3000 | Express API server port |
| NODE_ENV | production | Node environment |
| OLLAMA_HOST | http://localhost:11434 | Ollama service URL |
| ALLOWED_ORIGINS | * | CORS allowed origins (comma-separated) |
| LOG_LEVEL | info | Logging level |

## Security Features

- **Helmet.js**: Security headers
- **CORS**: Configurable origin restrictions
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Request Size Limit**: 10MB max payload
- **Input Validation**: Model and prompt validation
- **Error Handling**: Safe error messages without leaking internals

## Monitoring & Logging

### Health Checks
The `/health` endpoint provides:
- Service status
- Ollama connection status
- Number of available models
- Timestamp

### Logs
The service logs:
- API requests (morgan middleware)
- Model selection decisions
- Error details
- Startup/shutdown events

### Railway Monitoring
Access logs via:
```bash
railway logs
```

Or view in Railway Dashboard:
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Deployments**: Build and deployment history

## Performance Considerations

### Model Sizes
- Ensure sufficient disk space (20GB+ recommended)
- Models are cached after first pull
- Startup time depends on model size

### Memory Requirements
- Minimum: 8GB RAM
- Recommended: 16GB+ RAM for multiple models
- Railway: Use appropriate plan for model requirements

### Response Times
- First request (cold start): 30-60 seconds
- Subsequent requests: 1-5 seconds per response
- Streaming: Real-time token generation

## Troubleshooting

### Models Not Loading
```bash
# Check Railway logs
railway logs

# Verify models are pulled
railway run ollama list

# Manually pull model
railway run ollama pull llama3.1
```

### Connection Issues
```bash
# Test health endpoint
curl https://your-railway-url.railway.app/health

# Check Ollama service
railway run ps aux | grep ollama
```

### Memory Issues
- Upgrade Railway plan
- Reduce number of models
- Use smaller model variants

### Slow Responses
- Check Railway region (latency)
- Verify model is cached
- Monitor CPU/memory usage

## Integration with Agnes AI

### Frontend Integration

```javascript
// Example: Generate completion
const response = await fetch('https://your-railway-url.railway.app/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'susan-ai-21',
    prompt: 'What are effective leadership strategies?',
    options: {
      temperature: 0.7,
      max_tokens: 500
    }
  })
});

const data = await response.json();
console.log(data.response.response);
```

```javascript
// Example: Chat completion
const response = await fetch('https://your-railway-url.railway.app/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'susan-ai-21',
    messages: [
      { role: 'system', content: 'You are Susan, a training assistant.' },
      { role: 'user', content: 'How can I improve team communication?' }
    ]
  })
});

const data = await response.json();
console.log(data.response.message.content);
```

```javascript
// Example: Streaming response
const response = await fetch('https://your-railway-url.railway.app/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'susan-ai-21',
    prompt: 'Explain leadership principles',
    stream: true
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
    const data = JSON.parse(line);
    if (data.response) {
      process.stdout.write(data.response);
    }
  }
}
```

## Development

### Project Structure
```
ollama-backend/
├── Dockerfile                 # Multi-stage Docker build
├── start.sh                   # Startup script (Ollama + Express)
├── server.js                  # Express API wrapper
├── package.json               # Node dependencies
├── railway.json               # Railway configuration
├── Modelfile.susan-ai-21     # Custom model definition
├── test-connection.js         # Connection test script
├── .env.example               # Environment template
├── .dockerignore              # Docker ignore file
├── .gitignore                 # Git ignore file
└── README.md                  # This file
```

### Testing Locally

1. **Start services**
```bash
chmod +x start.sh
./start.sh
```

2. **Run tests**
```bash
node test-connection.js
```

3. **Manual API test**
```bash
# Health check
curl http://localhost:3000/health

# List models
curl http://localhost:3000/api/models

# Generate completion
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.1",
    "prompt": "Hello, who are you?",
    "stream": false
  }'
```

## Production Checklist

- [ ] Environment variables configured
- [ ] CORS origins set correctly
- [ ] Health check endpoint working
- [ ] All required models pulled
- [ ] Custom susan-ai-21 model created
- [ ] SSL/TLS configured (Railway provides this)
- [ ] Rate limiting tested
- [ ] Error handling verified
- [ ] Logs monitored
- [ ] Backup strategy in place

## Cost Considerations

### Railway Costs
- **Hobby Plan**: $5/month + usage
- **Pro Plan**: $20/month + usage
- Model storage and compute metered

### Optimization
- Use smaller models when possible
- Implement request caching
- Monitor usage metrics
- Scale based on actual demand

## Support & Resources

- **Railway Docs**: https://docs.railway.app
- **Ollama Docs**: https://ollama.ai/docs
- **Express.js**: https://expressjs.com
- **Agnes AI**: Contact your team lead

## License

MIT License - See LICENSE file for details

## Version History

### v1.0.0 (2025-10-11)
- Initial release
- Multi-model support
- Railway deployment ready
- Intelligent fallback system
- Health monitoring
- Streaming support
- Security features
- Production optimizations
