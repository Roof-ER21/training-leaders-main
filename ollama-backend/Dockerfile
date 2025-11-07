# Multi-stage Dockerfile for Ollama Backend on Railway
FROM ollama/ollama:latest AS ollama-base

# Install Node.js for the API wrapper
FROM node:18-slim AS node-base

# Copy Ollama from the first stage
COPY --from=ollama-base /bin/ollama /bin/ollama
COPY --from=ollama-base /usr/lib/ollama /usr/lib/ollama

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create directory for Ollama data
RUN mkdir -p /root/.ollama

# Expose ports
# 11434 - Ollama API
# 3000 - Express API wrapper
EXPOSE 11434 3000

# Set environment variables
ENV NODE_ENV=production
ENV OLLAMA_HOST=0.0.0.0:11434
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
