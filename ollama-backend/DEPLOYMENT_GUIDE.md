# Railway Deployment Guide - Ollama Backend for Agnes AI

Complete step-by-step guide to deploy the Ollama backend service to Railway.

## Prerequisites

Before you begin, ensure you have:

- [ ] Railway account (sign up at https://railway.app)
- [ ] Git installed locally
- [ ] Railway CLI installed: `npm install -g @railway/cli`
- [ ] Node.js 18+ installed
- [ ] This project cloned/downloaded

## Step 1: Prepare the Project

### 1.1 Initialize Git Repository (if not already done)

```bash
cd "/Users/a21/Desktop/Training Leaders Main/ollama-backend"
git init
git add .
git commit -m "Initial commit: Ollama backend for Agnes AI"
```

### 1.2 Create GitHub Repository (Recommended)

```bash
# Create a new repo on GitHub, then:
git remote add origin https://github.com/yourusername/agnes-ai-ollama-backend.git
git branch -M main
git push -u origin main
```

## Step 2: Install Railway CLI

```bash
# Install globally
npm install -g @railway/cli

# Verify installation
railway --version
```

## Step 3: Login to Railway

```bash
railway login
```

This will open a browser window to authenticate. Click "Authorize" to complete.

## Step 4: Create Railway Project

### Option A: Using CLI

```bash
# Navigate to project directory
cd "/Users/a21/Desktop/Training Leaders Main/ollama-backend"

# Initialize Railway project
railway init

# Follow prompts:
# - Create a new project
# - Name it: "agnes-ai-ollama-backend"
```

### Option B: Using Dashboard

1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will auto-detect the Dockerfile

## Step 5: Configure Environment Variables

### Via CLI

```bash
# Set production environment
railway variables set NODE_ENV=production

# Set port (Railway will auto-assign, but 3000 is default)
railway variables set PORT=3000

# Set allowed origins for CORS
railway variables set ALLOWED_ORIGINS=https://your-agnes-ai-frontend.com,https://www.your-domain.com

# Optional: Set log level
railway variables set LOG_LEVEL=info
```

### Via Dashboard

1. Go to your project in Railway Dashboard
2. Click on the **"Variables"** tab
3. Add the following variables:

| Variable | Value |
|----------|-------|
| NODE_ENV | production |
| PORT | 3000 |
| ALLOWED_ORIGINS | https://your-domain.com |
| LOG_LEVEL | info |

## Step 6: Deploy to Railway

### Method 1: Deploy from CLI

```bash
# Deploy current directory
railway up

# Watch deployment logs
railway logs
```

### Method 2: Deploy from GitHub (Recommended)

1. Push code to GitHub
2. Railway auto-deploys on push (if connected)
3. Monitor in Dashboard

### Method 3: Manual Deploy via Dashboard

1. Go to Railway Dashboard
2. Select your project
3. Click **"Deploy"**
4. Monitor build process

## Step 7: Configure Service Settings

### 7.1 Health Check Configuration

1. Go to **Settings** tab in Railway Dashboard
2. Scroll to **Health Check** section
3. Configure:
   - **Health Check Path**: `/health`
   - **Health Check Timeout**: `300` seconds
   - **Health Check Interval**: `30` seconds

### 7.2 Restart Policy

1. In **Settings** tab
2. **Restart Policy** section:
   - **Policy Type**: `On Failure`
   - **Max Retries**: `3`

### 7.3 Region Selection

1. In **Settings** tab
2. **Region** section:
   - Choose region closest to your users
   - US West recommended for US-based users
   - EU West for European users

## Step 8: Monitor Deployment

### 8.1 Check Build Logs

```bash
# Via CLI
railway logs

# Or in Dashboard
# Go to "Deployments" tab → Click latest deployment → View logs
```

### 8.2 Expected Log Output

```
Starting Ollama service...
Waiting for Ollama to be ready...
Waiting for Ollama... (1/60)
Waiting for Ollama... (2/60)
...
Ollama is ready!
Checking and pulling required models...
Checking model: llama3.1
Pulling model: llama3.1
...
Model check complete!
Starting Express API wrapper...
Ollama Backend API listening on port 3000
Ollama host: http://localhost:11434
Updating model cache...
Model cache initialized with 4 models
```

### 8.3 First Deployment Notes

- **First deployment will take 10-20 minutes** (model downloads)
- Models are cached for subsequent deployments
- Health check will timeout initially (this is normal)
- Railway will retry health checks automatically

## Step 9: Get Your Service URL

### Via CLI

```bash
railway domain
```

### Via Dashboard

1. Go to **Settings** tab
2. **Domains** section
3. You'll see your Railway-provided domain:
   - Format: `https://your-project-name.up.railway.app`

### Generate Custom Domain (Optional)

```bash
# Generate Railway subdomain
railway domain

# Or add custom domain via Dashboard
# Settings → Domains → Add Custom Domain
```

## Step 10: Test Deployment

### 10.1 Test Health Endpoint

```bash
# Replace with your Railway URL
curl https://your-project.up.railway.app/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "service": "ollama-backend-agnes-ai",
  "ollama": {
    "connected": true,
    "modelsAvailable": 4
  }
}
```

### 10.2 Test Models Endpoint

```bash
curl https://your-project.up.railway.app/api/models
```

### 10.3 Test Generation

```bash
curl -X POST https://your-project.up.railway.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3.1",
    "prompt": "Say hello in one sentence",
    "stream": false
  }'
```

## Step 11: Create Custom Susan AI Model

After initial deployment and models are pulled:

### Via Railway Shell

```bash
# Open Railway shell
railway run bash

# Create custom model
ollama create susan-ai-21 -f /app/Modelfile.susan-ai-21

# Verify
ollama list

# Exit shell
exit
```

### Via SSH (Alternative)

1. Railway Dashboard → **Settings** → **Connect**
2. Copy SSH command
3. Run in terminal
4. Execute model creation command

## Step 12: Configure Frontend Integration

Update your Agnes AI frontend to use the Railway backend URL:

```javascript
// In your frontend config/environment file
const OLLAMA_API_URL = 'https://your-project.up.railway.app';

// Example: Update API calls
const response = await fetch(`${OLLAMA_API_URL}/api/generate`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'susan-ai-21',
    prompt: userMessage
  })
});
```

## Step 13: Set Up Continuous Deployment

### 13.1 GitHub Integration (Recommended)

1. Railway Dashboard → **Settings**
2. **Source** section
3. Connect to GitHub repository
4. Configure:
   - **Branch**: `main`
   - **Auto-deploy**: `Enabled`

Now, every push to `main` triggers automatic deployment.

### 13.2 CLI Deployment

```bash
# Commit changes
git add .
git commit -m "Update: your changes"

# Deploy to Railway
railway up
```

## Step 14: Monitoring & Maintenance

### 14.1 View Metrics

1. Railway Dashboard → **Metrics** tab
2. Monitor:
   - CPU usage
   - Memory usage
   - Network traffic
   - Request count

### 14.2 View Logs

```bash
# Real-time logs via CLI
railway logs --follow

# Or in Dashboard: Deployments → Logs
```

### 14.3 Set Up Alerts (Pro Plan)

1. Dashboard → **Settings** → **Alerts**
2. Configure:
   - CPU threshold alerts
   - Memory threshold alerts
   - Error rate alerts

## Step 15: Scaling & Optimization

### 15.1 Vertical Scaling

1. Railway Dashboard → **Settings**
2. **Resources** section
3. Adjust:
   - **Memory**: Increase for larger models
   - **CPU**: Increase for faster responses

**Recommended for Ollama:**
- Memory: 8GB minimum (16GB recommended)
- vCPU: 2-4 cores

### 15.2 Model Optimization

To reduce costs and improve performance:

```bash
# Use quantized models (smaller, faster)
railway run ollama pull llama3.1:7b-q4_0

# Remove unused models
railway run ollama rm unused-model
```

## Step 16: Backup Strategy

### 16.1 Backup Configuration

```bash
# Export environment variables
railway variables > railway-variables.json

# Backup Modelfile
cp Modelfile.susan-ai-21 backups/
```

### 16.2 Version Control

Keep all configuration in Git:

```bash
git add railway.json Dockerfile start.sh server.js
git commit -m "Backup: Railway configuration"
git push origin main
```

## Troubleshooting

### Issue: Health Check Failing

**Symptoms:** Railway shows "Unhealthy" status

**Solutions:**
```bash
# Check logs
railway logs

# Increase health check timeout
# Dashboard → Settings → Health Check Timeout → 300 seconds

# Verify Ollama is running
railway run ps aux | grep ollama
```

### Issue: Models Not Loading

**Symptoms:** "No models available" error

**Solutions:**
```bash
# SSH into Railway
railway run bash

# Check models
ollama list

# Manually pull models
ollama pull llama3.1
ollama pull qwen2.5-coder:7b

# Check disk space
df -h
```

### Issue: Out of Memory

**Symptoms:** Service crashes, "OOM" in logs

**Solutions:**
1. Increase Railway memory allocation
2. Use smaller models (7B instead of 13B)
3. Reduce number of concurrent models

### Issue: Slow Response Times

**Symptoms:** Timeouts, slow API responses

**Solutions:**
1. Check Railway region (use closer region)
2. Increase CPU allocation
3. Use quantized models for faster inference
4. Implement response caching

### Issue: Deployment Stuck

**Symptoms:** Build hangs, never completes

**Solutions:**
```bash
# Cancel deployment
railway down

# Redeploy with fresh build
railway up --force

# Check Railway status
curl https://railway.app/status
```

## Cost Estimation

### Railway Pricing

**Hobby Plan ($5/month + usage):**
- Good for testing
- Limited resources
- Shared infrastructure

**Pro Plan ($20/month + usage):**
- Production recommended
- More resources
- Priority support
- Better performance

### Resource Usage Estimates

**For 4 models (llama3.1, qwen, deepseek-r1, deepseek-coder):**
- **Storage**: ~15GB
- **Memory**: 8-16GB required
- **CPU**: 2-4 vCPUs recommended
- **Monthly cost**: $30-60 estimated

### Optimization Tips

1. **Use smaller models**: 1.5B-7B instead of 13B+
2. **Implement caching**: Reduce repeated inference
3. **Rate limiting**: Prevent abuse
4. **Auto-scaling**: Scale down during low usage
5. **Regional deployment**: Reduce latency costs

## Security Best Practices

### 1. Environment Variables

```bash
# Never commit .env files
echo ".env" >> .gitignore

# Use Railway's secure variables
railway variables set API_KEY=$(openssl rand -hex 32)
```

### 2. CORS Configuration

```bash
# Set specific origins only
railway variables set ALLOWED_ORIGINS=https://yourdomain.com
```

### 3. Rate Limiting

Already configured in `server.js`:
- 100 requests per 15 minutes per IP
- Adjust in code if needed

### 4. API Authentication (Optional)

Add to `server.js`:

```javascript
// Middleware for API key authentication
app.use('/api/*', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

## Maintenance Schedule

### Daily
- [ ] Monitor error logs
- [ ] Check response times
- [ ] Verify health status

### Weekly
- [ ] Review usage metrics
- [ ] Check for security updates
- [ ] Optimize model cache

### Monthly
- [ ] Update dependencies
- [ ] Review and optimize costs
- [ ] Backup configuration
- [ ] Update models to latest versions

## Next Steps

1. **Custom Domain**: Set up custom domain for production
2. **CDN**: Add Cloudflare for caching/security
3. **Monitoring**: Integrate with DataDog/Sentry
4. **Load Balancing**: Scale horizontally with multiple instances
5. **Backup**: Set up automated backups

## Support Resources

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Ollama Docs**: https://ollama.ai/docs
- **This Repository**: Check README.md for API documentation

## Quick Reference Commands

```bash
# Deploy
railway up

# View logs
railway logs --follow

# Open dashboard
railway open

# Check service status
railway status

# Run command in Railway
railway run [command]

# SSH into service
railway run bash

# Get service URL
railway domain

# Export environment variables
railway variables

# Link to different project
railway link

# Logout
railway logout
```

## Success Checklist

- [ ] Railway account created
- [ ] CLI installed and authenticated
- [ ] Project deployed successfully
- [ ] Health check passing
- [ ] All models pulled and cached
- [ ] susan-ai-21 custom model created
- [ ] API endpoints tested
- [ ] Frontend integrated
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Monitoring enabled
- [ ] Backup strategy in place
- [ ] Documentation updated with Railway URL

## Congratulations!

Your Ollama backend for Agnes AI is now deployed on Railway! 🎉

**Your service URL**: `https://[your-project].up.railway.app`

Share this URL with your frontend team and start using the powerful AI models in Agnes AI!
