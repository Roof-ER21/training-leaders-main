#!/bin/bash
set -e

echo "Starting Ollama service..."

# Start Ollama server in the background
ollama serve &
OLLAMA_PID=$!

echo "Waiting for Ollama to be ready..."
# Wait for Ollama to be ready (max 60 seconds)
COUNTER=0
until curl -s http://localhost:11434/api/tags > /dev/null 2>&1 || [ $COUNTER -eq 60 ]; do
    sleep 1
    COUNTER=$((COUNTER + 1))
    echo "Waiting for Ollama... ($COUNTER/60)"
done

if [ $COUNTER -eq 60 ]; then
    echo "Ollama failed to start within 60 seconds"
    exit 1
fi

echo "Ollama is ready!"

# Pull models if they don't exist
echo "Checking and pulling required models..."

# Array of models to pull
MODELS=(
    "llama3.1"
    "qwen2.5-coder:7b"
    "deepseek-r1:1.5b"
    "deepseek-coder:1.3b"
)

for MODEL in "${MODELS[@]}"; do
    echo "Checking model: $MODEL"
    if ! ollama list | grep -q "$MODEL"; then
        echo "Pulling model: $MODEL"
        ollama pull "$MODEL" || echo "Warning: Failed to pull $MODEL"
    else
        echo "Model $MODEL already exists"
    fi
done

# Check for custom susan-ai-21 model
echo "Checking for custom susan-ai-21 model..."
if ! ollama list | grep -q "susan-ai-21"; then
    echo "Warning: susan-ai-21 model not found. Will need to be created manually."
    echo "To create susan-ai-21, run: ollama create susan-ai-21 -f /path/to/Modelfile"
fi

echo "Model check complete!"
echo "Starting Express API wrapper..."

# Start the Express server (this will run in foreground)
node server.js &
NODE_PID=$!

# Function to handle shutdown
cleanup() {
    echo "Shutting down services..."
    kill $NODE_PID 2>/dev/null || true
    kill $OLLAMA_PID 2>/dev/null || true
    exit 0
}

# Trap signals
trap cleanup SIGTERM SIGINT

# Wait for both processes
wait $NODE_PID $OLLAMA_PID
