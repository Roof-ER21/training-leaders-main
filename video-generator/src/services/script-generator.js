// Script Generator using Groq (Agnes)
const Groq = require('groq-sdk');

class ScriptGenerator {
  constructor(apiKey) {
    this.groq = new Groq({ apiKey });
    this.model = 'llama-3.3-70b-versatile';
  }

  async generateModuleIntro(moduleNumber, moduleName, learningObjectives) {
    const prompt = `Create a 30-60 second video script for an AI presenter introducing a training module.

Module: Module ${moduleNumber} - ${moduleName}
Learning Objectives: ${learningObjectives.join(', ')}

Requirements:
- Professional and engaging tone
- Welcome students to the module
- Brief overview of what they'll learn
- Motivating and encouraging
- Natural speaking style (conversational, not robotic)
- 30-60 seconds when read aloud

Format: Return ONLY the script text, no labels or formatting.`;

    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Agnes, an expert roofing training instructor. Create engaging, professional video scripts that motivate students and clearly explain concepts.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: this.model,
        temperature: 0.8,
        max_tokens: 300
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Script generation error:', error.message);
      throw error;
    }
  }

  async generateConceptExplainer(concept, details, duration = 90) {
    const prompt = `Create a ${duration}-second video script explaining a roofing concept for training purposes.

Concept: ${concept}
Details: ${details}

Requirements:
- Clear and educational
- Use simple language but be technically accurate
- Include practical examples
- Engaging presentation style
- ${duration} seconds when read aloud
- Natural speaking pace

Format: Return ONLY the script text.`;

    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Agnes, an expert roofing training instructor. Explain complex concepts in simple, memorable ways with practical examples.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: this.model,
        temperature: 0.7,
        max_tokens: 400
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Script generation error:', error.message);
      throw error;
    }
  }

  async generateModuleSummary(moduleNumber, moduleName, keyTakeaways) {
    const prompt = `Create a 30-60 second video script for an AI presenter summarizing a completed training module.

Module: Module ${moduleNumber} - ${moduleName}
Key Takeaways: ${keyTakeaways.join(', ')}

Requirements:
- Congratulate students on completion
- Briefly recap the most important points
- Encourage them to move forward
- Positive and motivating tone
- 30-60 seconds when read aloud

Format: Return ONLY the script text.`;

    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Agnes, an encouraging roofing training instructor. Celebrate student progress and reinforce key learning points.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: this.model,
        temperature: 0.8,
        max_tokens: 300
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Script generation error:', error.message);
      throw error;
    }
  }

  async generateCustomScript(topic, instructions, duration = 60) {
    const prompt = `Create a ${duration}-second video script for roofing training.

Topic: ${topic}
Instructions: ${instructions}

Duration: ${duration} seconds when read aloud

Format: Return ONLY the script text.`;

    try {
      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Agnes, an expert roofing training instructor. Create professional, engaging training content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: this.model,
        temperature: 0.7,
        max_tokens: Math.floor(duration * 3)
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Script generation error:', error.message);
      throw error;
    }
  }
}

module.exports = ScriptGenerator;
