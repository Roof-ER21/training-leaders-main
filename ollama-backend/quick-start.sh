#!/bin/bash

# Quick Start Script for Ollama Backend Development
# This script helps you get started with the Ollama backend locally

set -e

echo "=========================================="
echo "Ollama Backend - Quick Start Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Error: Ollama is not installed"
    echo "Please install Ollama from https://ollama.ai"
    exit 1
fi

echo "✅ Ollama is installed"
echo ""

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check if Ollama is running
echo "🔍 Checking Ollama service..."
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo "✅ Ollama is running"
else
    echo "⚠️  Ollama is not running"
    echo "Starting Ollama service..."
    ollama serve &
    OLLAMA_PID=$!

    # Wait for Ollama to be ready
    echo "Waiting for Ollama to start..."
    COUNTER=0
    until curl -s http://localhost:11434/api/tags > /dev/null 2>&1 || [ $COUNTER -eq 30 ]; do
        sleep 1
        COUNTER=$((COUNTER + 1))
        echo -n "."
    done
    echo ""

    if [ $COUNTER -eq 30 ]; then
        echo "❌ Ollama failed to start"
        exit 1
    fi

    echo "✅ Ollama started successfully"
fi
echo ""

# Pull required models
echo "📥 Pulling required models..."
echo "This may take some time depending on your internet connection."
echo ""

MODELS=("llama3.1" "qwen2.5-coder:7b" "deepseek-r1:1.5b" "deepseek-coder:1.3b")

for MODEL in "${MODELS[@]}"; do
    echo "Checking model: $MODEL"
    if ollama list | grep -q "$MODEL"; then
        echo "✅ $MODEL already exists"
    else
        echo "Pulling $MODEL..."
        ollama pull "$MODEL" || echo "⚠️  Warning: Failed to pull $MODEL"
    fi
    echo ""
done

# Create custom Susan AI model
echo "🤖 Creating custom Susan AI model..."
if ollama list | grep -q "susan-ai-21"; then
    echo "✅ susan-ai-21 already exists"
else
    echo "Creating susan-ai-21 from Modelfile..."
    if [ -f "Modelfile.susan-ai-21" ]; then
        ollama create susan-ai-21 -f Modelfile.susan-ai-21
        echo "✅ susan-ai-21 created successfully"
    else
        echo "⚠️  Warning: Modelfile.susan-ai-21 not found"
    fi
fi
echo ""

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please update .env with your configuration"
    echo ""
fi

# Final check
echo "🔍 Running final checks..."
echo ""

echo "Available models:"
ollama list
echo ""

# Start the server
echo "=========================================="
echo "🚀 Starting Ollama Backend Server..."
echo "=========================================="
echo ""
echo "Server will be available at: http://localhost:3000"
echo "Health check: http://localhost:3000/health"
echo "API docs: http://localhost:3000/"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Choose which server to run
if [ -f "server-enhanced.js" ]; then
    echo "Using enhanced server with monitoring..."
    node server-enhanced.js
else
    echo "Using standard server..."
    node server.js
fi
