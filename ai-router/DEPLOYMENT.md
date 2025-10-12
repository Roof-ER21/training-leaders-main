# Agnes AI Router - Deployment Guide

## Railway Deployment

### Prerequisites
1. Railway account (https://railway.app)
2. HuggingFace Pro account with API key
3. GitHub repository with this code

### Step 1: Prepare Your Repository

```bash
cd /Users/a21/Desktop/Training\ Leaders\ Main/ai-router
git init
git add .
git commit -m "Initial commit: Agnes AI Router"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your ai-router repository
5. Railway will auto-detect Node.js and use npm start

### Step 3: Configure Environment Variables

In Railway dashboard, go to Variables tab and add:

```env
# Required
HUGGINGFACE_API_KEY=hf_your_actual_api_key_here

# Optional (with recommended values)
NODE_ENV=production
PORT=3000

# Ollama Configuration (if running separate Ollama instance)
OLLAMA_BASE_URL=http://your-ollama-server:11434
OLLAMA_TIMEOUT=30000

# Routing Configuration
USE_OLLAMA_FIRST=true
FALLBACK_ENABLED=true
COMPLEXITY_THRESHOLD=0.7

# Rate Limiting
MAX_REQUESTS_PER_MINUTE=60
MAX_CONCURRENT_REQUESTS=10

# Caching
CACHE_TTL_SECONDS=300
CACHE_MAX_SIZE=1000

# Models (optional overrides)
PRIMARY_CONVERSATIONAL_MODEL=meta-llama/Meta-Llama-3.1-70B-Instruct
CODE_GENERATION_MODEL=Qwen/Qwen2.5-Coder-32B-Instruct
FAST_RESPONSE_MODEL=meta-llama/Meta-Llama-3.1-8B-Instruct
REASONING_MODEL=deepseek-ai/DeepSeek-R1
```

### Step 4: Deploy

1. Railway will automatically deploy after adding variables
2. Wait for deployment to complete (usually 2-3 minutes)
3. Railway will provide a public URL: `https://your-app.railway.app`

### Step 5: Test Deployment

```bash
# Health check
curl https://your-app.railway.app/health

# Test completion
curl -X POST https://your-app.railway.app/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What is machine learning?",
    "temperature": 0.7,
    "max_tokens": 500
  }'
```

## Docker Deployment

### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Build and Run

```bash
# Build image
docker build -t agnes-ai-router .

# Run container
docker run -d \
  -p 3000:3000 \
  -e HUGGINGFACE_API_KEY=your_key_here \
  -e NODE_ENV=production \
  --name agnes-router \
  agnes-ai-router
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  ai-router:
    build: .
    ports:
      - "3000:3000"
    environment:
      - HUGGINGFACE_API_KEY=${HUGGINGFACE_API_KEY}
      - NODE_ENV=production
      - OLLAMA_BASE_URL=http://ollama:11434
      - USE_OLLAMA_FIRST=true
      - FALLBACK_ENABLED=true
    depends_on:
      - ollama
    restart: unless-stopped

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama-data:/root/.ollama
    restart: unless-stopped

volumes:
  ollama-data:
```

Run with:
```bash
docker-compose up -d
```

## AWS Deployment (EC2)

### Prerequisites
- AWS account
- EC2 instance (t3.medium or larger)
- Security group allowing port 3000

### Steps

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone <your-repo-url>
cd ai-router

# Install dependencies
npm install --production

# Create .env file
nano .env
# Add your environment variables

# Start with PM2
pm2 start src/index.js --name agnes-ai-router

# Configure PM2 to start on boot
pm2 startup
pm2 save

# Monitor
pm2 monit
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Google Cloud Run

### Build and Deploy

```bash
# Build container
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/agnes-ai-router

# Deploy to Cloud Run
gcloud run deploy agnes-ai-router \
  --image gcr.io/YOUR_PROJECT_ID/agnes-ai-router \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars HUGGINGFACE_API_KEY=your_key_here,NODE_ENV=production
```

## Monitoring & Maintenance

### Health Checks

Set up automated health checks:

```bash
# Cron job to check health every 5 minutes
*/5 * * * * curl -f https://your-app.railway.app/health || echo "Health check failed"
```

### Log Monitoring

For Railway:
```bash
# View logs
railway logs
```

For Docker:
```bash
# View logs
docker logs -f agnes-router
```

For PM2:
```bash
# View logs
pm2 logs agnes-ai-router
```

### Performance Monitoring

Add monitoring endpoints to your code:

```javascript
// Custom metrics endpoint
app.get('/metrics', (req, res) => {
  const metrics = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    stats: routingService.getStats()
  };
  res.json(metrics);
});
```

## Scaling

### Horizontal Scaling (Railway)

Railway supports horizontal scaling:
1. Go to Settings > Scaling
2. Increase replica count
3. Railway will load balance automatically

### Vertical Scaling

For Railway, upgrade your plan for more resources.

For Docker/EC2, increase instance size or container resources.

## Backup & Recovery

### Database Backup (if using persistent storage)

```bash
# Backup logs
docker cp agnes-router:/app/logs ./backup/logs-$(date +%Y%m%d)

# Backup configuration
cp .env .env.backup
```

### Disaster Recovery

1. Keep `.env` backed up securely
2. Keep repository up to date
3. Document deployment process
4. Test recovery procedure regularly

## Security Checklist

- [ ] API keys stored in environment variables (not code)
- [ ] HTTPS enabled (Railway provides this automatically)
- [ ] Rate limiting configured
- [ ] Request validation enabled
- [ ] Logs don't contain sensitive data
- [ ] Regular security updates (`npm audit fix`)
- [ ] Monitoring and alerting set up

## Cost Optimization

### HuggingFace Pro Costs
- Use caching aggressively (increase CACHE_TTL_SECONDS)
- Route simple queries to Ollama when possible
- Monitor usage in HuggingFace dashboard

### Railway Costs
- Free tier: 500 hours/month
- Paid tier: $5/month + usage
- Monitor usage in Railway dashboard

## Troubleshooting Deployment

### Common Issues

**Issue: "Cannot find module"**
```bash
# Solution: Ensure all dependencies installed
npm install
```

**Issue: "Port already in use"**
```bash
# Solution: Change PORT in .env or kill process
lsof -ti:3000 | xargs kill -9
```

**Issue: "HuggingFace authentication failed"**
```bash
# Solution: Verify API key
echo $HUGGINGFACE_API_KEY
# Re-add in Railway variables
```

**Issue: "Ollama connection refused"**
```bash
# Solution: Verify OLLAMA_BASE_URL is correct
# Ensure Ollama is running and accessible
```

## Production Best Practices

1. **Use PM2 or similar process manager**
2. **Enable automatic restarts**
3. **Set up monitoring and alerting**
4. **Use HTTPS (TLS/SSL)**
5. **Regular backups**
6. **Security audits**
7. **Load testing before production**
8. **Document everything**

## Support

For deployment issues:
1. Check Railway logs
2. Check application logs in `logs/`
3. Verify environment variables
4. Test health endpoint
5. Contact Agnes AI team

---

**Happy Deploying!**
