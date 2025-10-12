#!/bin/bash
# Training Leaders Main - Complete Deployment Script
# Created by Agent21 (Grok Code + Claude Squad + Codex)

set -e

echo "🚀 Training Leaders Main - Complete Deployment"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Deploy Frontend
echo -e "${BLUE}📦 Step 1/3: Deploying Frontend...${NC}"
echo "Project: training-leaders-frontend"
echo ""
cd "/Users/a21/Desktop/Training Leaders Main"
railway init --name training-leaders-frontend || true
railway up

echo -e "${GREEN}✅ Frontend deployed!${NC}"
echo ""

# Get frontend URL
FRONTEND_URL=$(railway status --json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
echo "Frontend URL: $FRONTEND_URL"
echo ""

# Step 2: Deploy AI Router
echo -e "${BLUE}🤖 Step 2/3: Deploying AI Router...${NC}"
echo "Project: agnes-ai-router"
echo ""
cd "/Users/a21/Desktop/Training Leaders Main/ai-router"

# Install dependencies
npm install

# Initialize Railway project
railway init --name agnes-ai-router || true

# Set environment variables
echo "Please enter your HuggingFace Pro API key:"
read -r HF_API_KEY
railway variables set HF_API_KEY="$HF_API_KEY"
railway variables set NODE_ENV=production
railway variables set ALLOWED_ORIGINS="$FRONTEND_URL"

# Deploy
railway up

echo -e "${GREEN}✅ AI Router deployed!${NC}"
echo ""

# Get AI Router URL
AI_ROUTER_URL=$(railway status --json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
echo "AI Router URL: $AI_ROUTER_URL"
echo ""

# Step 3: Connect Services
echo -e "${BLUE}🔗 Step 3/3: Connecting Services...${NC}"
echo ""
cd "/Users/a21/Desktop/Training Leaders Main"

# Update frontend with AI Router URL
railway link training-leaders-frontend
railway variables set REACT_APP_AI_ROUTER_URL="$AI_ROUTER_URL"

# Redeploy frontend
railway up

echo -e "${GREEN}✅ Services connected!${NC}"
echo ""

# Final Summary
echo "================================================"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo "================================================"
echo ""
echo "Frontend URL: $FRONTEND_URL"
echo "AI Router URL: $AI_ROUTER_URL"
echo ""
echo "Test your deployment:"
echo "1. Open: $FRONTEND_URL"
echo "2. Click on any module"
echo "3. Open Agnes chat"
echo "4. Send a message about roofing"
echo ""
echo "Health Check: curl $AI_ROUTER_URL/health"
echo ""
echo -e "${GREEN}✅ Your application is live with always-online AI!${NC}"
