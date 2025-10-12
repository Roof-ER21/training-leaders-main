# Agnes AI Router - Quick Start Guide

Get up and running with Agnes AI Router in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- HuggingFace Pro account with API key
- (Optional) Ollama installed and running for local models

## Step 1: Setup

Run the automated setup script:

```bash
cd "/Users/a21/Desktop/Training Leaders Main/ai-router"
./scripts/setup.sh
```

This will:
- Install all dependencies
- Create `.env` file
- Set up logging directory
- Run initial tests

## Step 2: Configure API Key

Edit the `.env` file and add your HuggingFace API key:

```bash
# Open in your favorite editor
nano .env

# Or use sed to replace directly
sed -i '' 's/your_hf_pro_api_key_here/YOUR_ACTUAL_API_KEY/' .env
```

Get your API key from: https://huggingface.co/settings/tokens

## Step 3: Start the Service

### Development Mode (auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

You should see:
```
Agnes AI Router started {
  port: 3000,
  env: 'development',
  ollamaURL: 'http://localhost:11434',
  huggingfaceConfigured: true
}
```

## Step 4: Test It!

Open a new terminal and run:

```bash
# Health check
curl http://localhost:3000/health

# Simple query
curl -X POST http://localhost:3000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What is machine learning?",
    "temperature": 0.7,
    "max_tokens": 200
  }'
```

Or run the example client:

```bash
node examples/client.js
```

## Step 5: Integration

Use the client library in your code:

```javascript
import AgnesAIClient from './examples/client.js';

const agnes = new AgnesAIClient();

// Simple completion
const result = await agnes.complete('Explain quantum computing');
console.log(result.text);

// Code generation
const code = await agnes.generateCode('a function to sort an array', 'python');
console.log(code.text);

// Chat
const chat = await agnes.chat([
  { role: 'user', content: 'Help me debug this code' }
]);
console.log(chat.text);
```

## Common Tasks

### Check Service Health
```bash
curl http://localhost:3000/health | jq
```

### View Statistics
```bash
curl http://localhost:3000/stats | jq
```

### List Available Models
```bash
curl http://localhost:3000/v1/models | jq
```

### Run Integration Tests
```bash
./scripts/test-integration.sh
```

### Clear Cache
```bash
curl -X POST http://localhost:3000/admin/cache/clear
```

### Reset Statistics
```bash
curl -X POST http://localhost:3000/admin/stats/reset
```

## Troubleshooting

### "HuggingFace service is not available"
- Check if `HUGGINGFACE_API_KEY` is set in `.env`
- Verify the API key is valid at https://huggingface.co/settings/tokens

### "Ollama service unavailable"
- This is OK! The router will use HuggingFace instead
- To enable Ollama: install from https://ollama.ai
- Start Ollama: `ollama serve`
- Pull models: `ollama pull qwen2.5:7b`

### "Port 3000 already in use"
- Change `PORT` in `.env` to a different number
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

### High latency
- First requests may be slow while models load
- Enable caching: `"use_cache": true` in requests
- Use Ollama for faster local responses

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Service health status |
| `/stats` | GET | Usage statistics |
| `/v1/models` | GET | List available models |
| `/v1/completions` | POST | Text completion |
| `/v1/chat/completions` | POST | Chat completion |
| `/admin/cache/clear` | POST | Clear response cache |
| `/admin/stats/reset` | POST | Reset statistics |

## Example Requests

### Basic Completion
```bash
curl -X POST http://localhost:3000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Explain Docker in simple terms",
    "max_tokens": 300
  }'
```

### Force Specific Provider
```bash
curl -X POST http://localhost:3000/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write Python code to read a CSV file",
    "provider": "huggingface",
    "temperature": 0.2,
    "max_tokens": 500
  }'
```

### Chat Conversation
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful coding assistant"},
      {"role": "user", "content": "How do I handle errors in JavaScript?"}
    ],
    "max_tokens": 500
  }'
```

## Performance Tips

1. **Enable Caching**: Add `"use_cache": true` to requests
2. **Use Ollama for Simple Queries**: Much faster than HuggingFace
3. **Adjust Complexity Threshold**: Change `COMPLEXITY_THRESHOLD` in `.env`
4. **Batch Requests**: Use the batch processor in `examples/advanced.js`
5. **Optimize Token Limits**: Use lower `max_tokens` when possible

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check out [examples/advanced.js](examples/advanced.js) for advanced patterns
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Join our community for support and updates

## Configuration Reference

Key environment variables in `.env`:

```env
# Required
HUGGINGFACE_API_KEY=hf_xxxx

# Server
PORT=3000
NODE_ENV=development

# Ollama
OLLAMA_BASE_URL=http://localhost:11434

# Routing
USE_OLLAMA_FIRST=true
FALLBACK_ENABLED=true
COMPLEXITY_THRESHOLD=0.7

# Performance
CACHE_TTL_SECONDS=300
MAX_REQUESTS_PER_MINUTE=60
```

## Support

- Documentation: See [README.md](README.md)
- Examples: Check [examples/](examples/) directory
- Tests: Run `npm test`
- Issues: Check logs in `logs/` directory

---

**You're all set! Start building with Agnes AI Router!**

Happy coding!
