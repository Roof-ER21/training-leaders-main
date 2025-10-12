#!/bin/bash

# Agnes AI Router Setup Script
# Automates the initial setup process

set -e  # Exit on error

echo "================================"
echo "Agnes AI Router Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js 18 or later from https://nodejs.org"
    exit 1
fi

echo "Node.js version: $(node --version)"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

echo "npm version: $(npm --version)"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo ""
    echo "IMPORTANT: Please edit .env and add your HuggingFace API key"
    echo ""
    read -p "Do you want to enter your HuggingFace API key now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your HuggingFace API key: " api_key
        if [ -n "$api_key" ]; then
            # Update .env file with API key
            if [[ "$OSTYPE" == "darwin"* ]]; then
                # macOS
                sed -i '' "s/your_hf_pro_api_key_here/$api_key/" .env
            else
                # Linux
                sed -i "s/your_hf_pro_api_key_here/$api_key/" .env
            fi
            echo "API key saved to .env"
        fi
    fi
else
    echo ".env file already exists, skipping creation"
fi
echo ""

# Create logs directory
echo "Creating logs directory..."
mkdir -p logs
echo ""

# Check if Ollama is installed and running
echo "Checking Ollama status..."
if command -v ollama &> /dev/null; then
    echo "Ollama is installed: $(ollama --version)"

    if curl -s http://localhost:11434/api/tags &> /dev/null; then
        echo "Ollama is running"
        echo "Available models:"
        ollama list
    else
        echo "Warning: Ollama is installed but not running"
        echo "Start Ollama to enable local model routing"
    fi
else
    echo "Warning: Ollama is not installed"
    echo "The router will fall back to HuggingFace only"
    echo "To install Ollama: https://ollama.ai"
fi
echo ""

# Run tests
echo "Running tests..."
npm test
echo ""

# Final instructions
echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Edit .env and ensure HUGGINGFACE_API_KEY is set"
echo "2. Start the service:"
echo "   - Development: npm run dev"
echo "   - Production: npm start"
echo "3. Test the service:"
echo "   - Health check: curl http://localhost:3000/health"
echo "   - Run examples: node examples/client.js"
echo ""
echo "Documentation:"
echo "- README.md - Full documentation"
echo "- DEPLOYMENT.md - Deployment guide"
echo "- examples/ - Integration examples"
echo ""
echo "Happy coding with Agnes AI!"
