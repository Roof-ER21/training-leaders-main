# Railway Deployment Checklist - Ollama Backend for Agnes AI

Use this checklist to ensure a successful deployment to Railway.

## Pre-Deployment

### Local Testing
- [ ] All dependencies installed (`npm install`)
- [ ] Ollama service running locally
- [ ] Required models pulled (llama3.1, qwen2.5-coder:7b, deepseek-r1:1.5b, deepseek-coder:1.3b)
- [ ] Custom susan-ai-21 model created (`ollama create susan-ai-21 -f Modelfile.susan-ai-21`)
- [ ] Health endpoint tested (`curl http://localhost:3000/health`)
- [ ] Generation endpoint tested
- [ ] Test suite passed (`node test-suite.js`)

### Code Preparation
- [ ] Git repository initialized
- [ ] All files committed to Git
- [ ] `.gitignore` properly configured
- [ ] `.env.example` created (without secrets)
- [ ] `Dockerfile` tested locally (`docker build -t ollama-backend .`)
- [ ] `railway.json` configuration verified
- [ ] `start.sh` script is executable (`chmod +x start.sh`)

### Documentation
- [ ] README.md reviewed and updated
- [ ] API endpoints documented
- [ ] Environment variables documented
- [ ] Deployment guide reviewed

## Railway Setup

### Account & CLI
- [ ] Railway account created (https://railway.app)
- [ ] Railway CLI installed (`npm install -g @railway/cli`)
- [ ] Logged into Railway CLI (`railway login`)
- [ ] Railway plan selected (Hobby or Pro)

### Project Creation
- [ ] New Railway project created
- [ ] Project linked to local directory (`railway link`)
- [ ] GitHub repository connected (optional but recommended)

### Environment Variables
Set these variables in Railway Dashboard or CLI:

- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`
- [ ] `OLLAMA_HOST=http://localhost:11434`
- [ ] `ALLOWED_ORIGINS=https://your-agnes-ai-domain.com`
- [ ] `LOG_LEVEL=info`

```bash
# Using CLI:
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set OLLAMA_HOST=http://localhost:11434
railway variables set ALLOWED_ORIGINS=https://your-domain.com
railway variables set LOG_LEVEL=info
```

### Service Configuration

#### Health Check Settings
- [ ] **Health Check Path**: `/health`
- [ ] **Health Check Timeout**: `300` seconds
- [ ] **Health Check Interval**: `30` seconds
- [ ] **Start Period**: `60` seconds

#### Restart Policy
- [ ] **Policy Type**: `On Failure`
- [ ] **Max Retries**: `3`

#### Resources (if using Pro plan)
- [ ] **Memory**: 8GB minimum (16GB recommended)
- [ ] **vCPU**: 2-4 cores recommended
- [ ] **Region**: Selected (closest to users)

#### Domains
- [ ] Railway-provided domain enabled
- [ ] Custom domain added (optional)
- [ ] SSL/TLS certificate active

## Deployment

### Initial Deployment
- [ ] Code pushed to Railway (`railway up`)
- [ ] Build logs monitored (`railway logs`)
- [ ] Deployment status checked (Railway Dashboard)
- [ ] Health check passing (may take 10-20 minutes on first deploy)

### Post-Deployment Verification

#### Service Status
- [ ] Service is running (Railway Dashboard shows "Active")
- [ ] No restart loops
- [ ] Memory usage stable
- [ ] CPU usage normal

#### Endpoint Testing
- [ ] Root endpoint accessible: `curl https://your-project.railway.app/`
- [ ] Health check passing: `curl https://your-project.railway.app/health`
- [ ] Models endpoint working: `curl https://your-project.railway.app/api/models`

#### Model Verification
```bash
# Check models are loaded
curl https://your-project.railway.app/api/models | jq '.models[].name'
```

Expected models:
- [ ] llama3.1
- [ ] qwen2.5-coder:7b
- [ ] deepseek-r1:1.5b
- [ ] deepseek-coder:1.3b

#### Custom Model Creation
- [ ] SSH into Railway: `railway run bash`
- [ ] Create susan-ai-21: `ollama create susan-ai-21 -f /app/Modelfile.susan-ai-21`
- [ ] Verify: `ollama list | grep susan-ai-21`

#### API Testing
```bash
# Test generation
curl -X POST https://your-project.railway.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "model": "susan-ai-21",
    "prompt": "Introduce yourself",
    "stream": false
  }'

# Test chat
curl -X POST https://your-project.railway.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "susan-ai-21",
    "messages": [
      {"role": "system", "content": "You are Susan AI"},
      {"role": "user", "content": "Hello"}
    ]
  }'
```

## Integration

### Frontend Integration
- [ ] Backend URL configured in frontend environment
- [ ] CORS origins updated to include frontend domain
- [ ] API client tested from frontend
- [ ] Error handling implemented
- [ ] Loading states configured
- [ ] Streaming functionality tested (if applicable)

### Example Integration Code:
```javascript
// In your frontend .env file
VITE_OLLAMA_API_URL=https://your-project.railway.app

// In your API service
const OLLAMA_URL = import.meta.env.VITE_OLLAMA_API_URL;

const response = await fetch(`${OLLAMA_URL}/api/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'susan-ai-21',
    messages: conversationHistory
  })
});
```

## Monitoring & Maintenance

### Monitoring Setup
- [ ] Railway metrics dashboard reviewed
- [ ] Custom metrics endpoint tested (`/metrics`)
- [ ] Logging configured appropriately
- [ ] Alert thresholds set (Pro plan)

### Performance Monitoring
- [ ] Response times acceptable (<5s average)
- [ ] Memory usage stable (<80%)
- [ ] No memory leaks detected
- [ ] Error rate low (<1%)

### Logging
- [ ] Application logs accessible (`railway logs`)
- [ ] Error logs being captured
- [ ] Request logs showing traffic
- [ ] Model usage tracked

## Security

### Security Checklist
- [ ] HTTPS enabled (Railway provides this automatically)
- [ ] CORS configured correctly (not using `*` in production)
- [ ] Rate limiting active
- [ ] Helmet.js security headers enabled
- [ ] Environment variables secured (not in code)
- [ ] Input validation working
- [ ] Error messages don't leak sensitive info

### Optional Security Enhancements
- [ ] API key authentication implemented (if needed)
- [ ] IP whitelisting configured (if needed)
- [ ] DDoS protection enabled (Cloudflare)
- [ ] Request signing implemented (if needed)

## Backup & Recovery

### Backup Strategy
- [ ] Git repository backed up (GitHub/GitLab)
- [ ] Environment variables exported (`railway variables`)
- [ ] Configuration files saved
- [ ] Modelfile backed up

### Recovery Plan
- [ ] Deployment rollback process tested
- [ ] Model re-download strategy documented
- [ ] Disaster recovery steps documented

## Optimization

### Performance Optimization
- [ ] Response compression enabled
- [ ] Model caching working
- [ ] Request caching implemented (if applicable)
- [ ] Database queries optimized (if using database)

### Cost Optimization
- [ ] Using appropriate Railway plan
- [ ] Unnecessary models removed
- [ ] Auto-scaling configured (if available)
- [ ] Resource usage monitored

## Documentation

### Final Documentation
- [ ] Deployment guide updated with actual URLs
- [ ] API documentation accessible
- [ ] Team members trained on deployment process
- [ ] Troubleshooting guide created
- [ ] Contact information for support added

### Team Handoff
- [ ] Railway credentials shared with team (securely)
- [ ] GitHub repository access granted
- [ ] Documentation shared
- [ ] On-call rotation established (if applicable)

## Post-Deployment Tasks

### Week 1
- [ ] Monitor daily for errors
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Optimize based on usage patterns

### Month 1
- [ ] Review costs and optimize
- [ ] Update models to latest versions
- [ ] Security audit performed
- [ ] Performance tuning based on real usage

### Ongoing
- [ ] Regular dependency updates (`npm update`)
- [ ] Model updates as new versions release
- [ ] Monthly cost review
- [ ] Quarterly security audits

## Troubleshooting Reference

### Common Issues

#### Issue: Health Check Failing
**Solution:**
```bash
# Check logs
railway logs

# Increase timeout in Settings → Health Check Timeout → 300s

# Verify Ollama is running
railway run ps aux | grep ollama
```

#### Issue: Models Not Loading
**Solution:**
```bash
# SSH into Railway
railway run bash

# Check disk space
df -h

# Re-pull models
ollama pull llama3.1
```

#### Issue: Out of Memory
**Solution:**
- Increase memory in Railway Settings → Resources
- Use smaller models (1.5B-7B instead of 13B+)
- Restart service: `railway restart`

#### Issue: Slow Responses
**Solution:**
- Check Railway region (use closer region)
- Increase vCPU allocation
- Use quantized models
- Implement response caching

## Success Criteria

✅ **Deployment is successful when:**

1. Health endpoint returns `"status": "healthy"`
2. All required models are loaded and accessible
3. API endpoints respond within acceptable time (<5s)
4. Frontend successfully communicates with backend
5. No errors in Railway logs
6. Memory and CPU usage are stable
7. CORS is properly configured
8. Security headers are present
9. Rate limiting is functional
10. Custom susan-ai-21 model is available

## Final Verification

Run this complete verification script:

```bash
#!/bin/bash
# Save as verify-deployment.sh

API_URL="https://your-project.railway.app"

echo "Verifying Railway Deployment..."

# 1. Health check
echo "1. Testing health endpoint..."
curl -f $API_URL/health || exit 1

# 2. List models
echo "2. Checking models..."
curl -f $API_URL/api/models || exit 1

# 3. Test generation
echo "3. Testing generation..."
curl -f -X POST $API_URL/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model":"llama3.1","prompt":"test","stream":false}' || exit 1

# 4. Test Susan AI
echo "4. Testing Susan AI..."
curl -f -X POST $API_URL/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model":"susan-ai-21","prompt":"Hello","stream":false}' || exit 1

echo "✅ All checks passed!"
```

## Contact & Support

- **Railway Support**: https://railway.app/help
- **Railway Discord**: https://discord.gg/railway
- **Ollama Docs**: https://ollama.ai/docs
- **Project Repository**: [Your GitHub URL]
- **Team Lead**: [Contact Info]

---

## Checklist Summary

**Total Items**: 100+

**Critical Items** (Must be completed):
- [ ] Environment variables configured
- [ ] Health checks passing
- [ ] Models loaded successfully
- [ ] API endpoints tested
- [ ] Frontend integration working
- [ ] Security configured
- [ ] Monitoring active

**Optional Items** (Recommended):
- [ ] Custom domain configured
- [ ] Advanced monitoring setup
- [ ] Automated backups
- [ ] Load testing performed

---

**Deployment Date**: _______________

**Deployed By**: _______________

**Railway Project URL**: _______________

**Production URL**: _______________

**Notes**: _______________________________________________________________

________________________________________________________________________

________________________________________________________________________

---

🎉 **Congratulations on deploying your Ollama backend to Railway!**
