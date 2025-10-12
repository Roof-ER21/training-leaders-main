const { HfInference } = require('@huggingface/inference');

async function testAPI() {
  const apiKey = process.argv[2];
  if (!apiKey) {
    console.log('Usage: node test_hf_api.js <HF_API_KEY>');
    process.exit(1);
  }
  
  const hf = new HfInference(apiKey);
  
  console.log('Testing HuggingFace API...');
  
  // Test 1: Try the model from server.js
  try {
    console.log('\nTest 1: meta-llama/Meta-Llama-3.1-8B-Instruct');
    const result = await hf.textGeneration({
      model: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
      inputs: 'Hello',
      parameters: { max_new_tokens: 10 }
    });
    console.log('✅ SUCCESS:', result.generated_text);
  } catch (error) {
    console.log('❌ FAILED:', error.message);
  }
  
  // Test 2: Try a simpler free model
  try {
    console.log('\nTest 2: microsoft/DialoGPT-medium (free model)');
    const result = await hf.textGeneration({
      model: 'microsoft/DialoGPT-medium',
      inputs: 'Hello',
      parameters: { max_new_tokens: 10 }
    });
    console.log('✅ SUCCESS:', result.generated_text);
  } catch (error) {
    console.log('❌ FAILED:', error.message);
  }
  
  // Test 3: Try gpt2
  try {
    console.log('\nTest 3: gpt2 (free model)');
    const result = await hf.textGeneration({
      model: 'gpt2',
      inputs: 'Hello',
      parameters: { max_new_tokens: 10 }
    });
    console.log('✅ SUCCESS:', result.generated_text);
  } catch (error) {
    console.log('❌ FAILED:', error.message);
  }
}

testAPI().catch(console.error);
