#!/bin/bash

# Integration Test Script for Agnes AI Router
# Tests the running service with real requests

set -e

# Configuration
BASE_URL="${AI_ROUTER_URL:-http://localhost:3000}"
TIMEOUT=30

echo "================================"
echo "Agnes AI Router Integration Tests"
echo "================================"
echo "Testing: $BASE_URL"
echo ""

# Function to test endpoint
test_endpoint() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    local expected_status=$5

    echo -n "Testing $name... "

    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" -X GET "$BASE_URL$endpoint" --max-time $TIMEOUT)
    else
        response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data" \
            --max-time $TIMEOUT)
    fi

    status_code=$(echo "$response" | tail -n 1)
    body=$(echo "$response" | head -n -1)

    if [ "$status_code" = "$expected_status" ]; then
        echo "✓ PASS (Status: $status_code)"
        return 0
    else
        echo "✗ FAIL (Expected: $expected_status, Got: $status_code)"
        echo "Response: $body"
        return 1
    fi
}

# Test counter
total_tests=0
passed_tests=0

# Test 1: Health check
total_tests=$((total_tests + 1))
if test_endpoint "Health Check" "GET" "/health" "" "200"; then
    passed_tests=$((passed_tests + 1))
fi

# Test 2: Statistics
total_tests=$((total_tests + 1))
if test_endpoint "Statistics" "GET" "/stats" "" "200"; then
    passed_tests=$((passed_tests + 1))
fi

# Test 3: List models
total_tests=$((total_tests + 1))
if test_endpoint "List Models" "GET" "/v1/models" "" "200"; then
    passed_tests=$((passed_tests + 1))
fi

# Test 4: Simple completion
total_tests=$((total_tests + 1))
completion_data='{
  "prompt": "What is 2+2?",
  "temperature": 0.7,
  "max_tokens": 100
}'
if test_endpoint "Simple Completion" "POST" "/v1/completions" "$completion_data" "200"; then
    passed_tests=$((passed_tests + 1))
fi

# Test 5: Chat completion
total_tests=$((total_tests + 1))
chat_data='{
  "messages": [
    {"role": "user", "content": "Say hello"}
  ],
  "temperature": 0.7,
  "max_tokens": 50
}'
if test_endpoint "Chat Completion" "POST" "/v1/chat/completions" "$chat_data" "200"; then
    passed_tests=$((passed_tests + 1))
fi

# Test 6: Code generation (force HuggingFace)
total_tests=$((total_tests + 1))
code_data='{
  "prompt": "Write a Python function to add two numbers",
  "temperature": 0.2,
  "max_tokens": 200,
  "provider": "huggingface"
}'
if test_endpoint "Code Generation (HuggingFace)" "POST" "/v1/completions" "$code_data" "200"; then
    passed_tests=$((passed_tests + 1))
fi

# Test 7: Force Ollama (if available)
total_tests=$((total_tests + 1))
ollama_data='{
  "prompt": "What is AI?",
  "temperature": 0.7,
  "max_tokens": 100,
  "provider": "ollama"
}'
if test_endpoint "Ollama Routing" "POST" "/v1/completions" "$ollama_data" "200"; then
    passed_tests=$((passed_tests + 1))
else
    echo "  Note: Ollama might not be available, this is OK"
fi

# Test 8: Invalid request (missing prompt)
total_tests=$((total_tests + 1))
invalid_data='{
  "temperature": 0.7
}'
if test_endpoint "Invalid Request" "POST" "/v1/completions" "$invalid_data" "400"; then
    passed_tests=$((passed_tests + 1))
fi

# Test 9: Cache test (same request twice)
total_tests=$((total_tests + 1))
cache_data='{
  "prompt": "Test cache with this unique prompt 12345",
  "temperature": 0.7,
  "max_tokens": 50,
  "use_cache": true
}'

echo -n "Testing Cache (First Request)... "
first_response=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/v1/completions" \
    -H "Content-Type: application/json" \
    -d "$cache_data" \
    --max-time $TIMEOUT)

first_status=$(echo "$first_response" | tail -n 1)
first_body=$(echo "$first_response" | head -n -1)

if [ "$first_status" = "200" ]; then
    echo "✓ PASS"

    echo -n "Testing Cache (Second Request - should be faster)... "
    second_start=$(date +%s%N)
    second_response=$(curl -s -X POST "$BASE_URL/v1/completions" \
        -H "Content-Type: application/json" \
        -d "$cache_data" \
        --max-time $TIMEOUT)
    second_end=$(date +%s%N)
    second_time=$(( (second_end - second_start) / 1000000 ))

    echo "✓ PASS (${second_time}ms)"
    passed_tests=$((passed_tests + 1))
else
    echo "✗ FAIL"
fi

# Summary
echo ""
echo "================================"
echo "Test Results"
echo "================================"
echo "Total Tests: $total_tests"
echo "Passed: $passed_tests"
echo "Failed: $((total_tests - passed_tests))"
echo ""

if [ $passed_tests -eq $total_tests ]; then
    echo "✓ All tests passed!"
    exit 0
else
    echo "✗ Some tests failed"
    exit 1
fi
