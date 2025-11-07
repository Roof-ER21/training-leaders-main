// D-ID Video Generation Service
const axios = require('axios');

class DIDVideoService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.d-id.com';
    this.headers = {
      'Authorization': `Basic ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Create a talking head video from script
   * @param {string} script - The text to be spoken
   * @param {string} avatarUrl - URL to avatar image (or use D-ID stock avatar)
   * @param {object} options - Additional options (voice, etc.)
   * @returns {Promise<object>} Video generation result
   */
  async createVideo(script, avatarUrl = null, options = {}) {
    try {
      const payload = {
        script: {
          type: 'text',
          input: script,
          provider: {
            type: options.voiceProvider || 'microsoft',
            voice_id: options.voiceId || 'en-US-JennyNeural'
          }
        },
        config: {
          stitch: true,
          fluent: true,
          pad_audio: 0.0
        }
      };

      // Use provided avatar URL or default stock avatar
      if (avatarUrl) {
        payload.source_url = avatarUrl;
      } else {
        // Use D-ID stock avatar (professional female presenter)
        payload.presenter_id = options.presenterId || 'amy-jcwCkr1grs';
      }

      console.log('Creating D-ID video with payload:', JSON.stringify(payload, null, 2));

      const response = await axios.post(
        `${this.baseURL}/talks`,
        payload,
        { headers: this.headers }
      );

      console.log('D-ID video creation response:', response.data);

      return {
        success: true,
        id: response.data.id,
        status: response.data.status,
        result_url: response.data.result_url
      };
    } catch (error) {
      console.error('D-ID video creation error:', error.response?.data || error.message);
      throw new Error(`D-ID API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Check video generation status
   * @param {string} videoId - The D-ID video ID
   * @returns {Promise<object>} Video status
   */
  async getVideoStatus(videoId) {
    try {
      const response = await axios.get(
        `${this.baseURL}/talks/${videoId}`,
        { headers: this.headers }
      );

      return {
        success: true,
        id: response.data.id,
        status: response.data.status,
        result_url: response.data.result_url,
        duration: response.data.duration,
        created_at: response.data.created_at
      };
    } catch (error) {
      console.error('D-ID status check error:', error.response?.data || error.message);
      throw new Error(`D-ID API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Wait for video to complete and return final URL
   * @param {string} videoId - The D-ID video ID
   * @param {number} maxWaitTime - Maximum wait time in seconds (default: 300 = 5 minutes)
   * @returns {Promise<string>} Final video URL
   */
  async waitForVideo(videoId, maxWaitTime = 300) {
    const startTime = Date.now();
    const pollInterval = 5000; // Check every 5 seconds

    while (Date.now() - startTime < maxWaitTime * 1000) {
      const status = await this.getVideoStatus(videoId);

      console.log(`Video ${videoId} status: ${status.status}`);

      if (status.status === 'done') {
        return status.result_url;
      } else if (status.status === 'error' || status.status === 'rejected') {
        throw new Error(`Video generation failed with status: ${status.status}`);
      }

      // Wait before next check
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error('Video generation timeout - exceeded maximum wait time');
  }

  /**
   * List available D-ID voices
   * @returns {Promise<array>} Available voices
   */
  async listVoices() {
    try {
      const response = await axios.get(
        `${this.baseURL}/tts/voices`,
        { headers: this.headers }
      );

      return response.data;
    } catch (error) {
      console.error('D-ID voices list error:', error.response?.data || error.message);
      throw new Error(`D-ID API Error: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get account credits/usage
   * @returns {Promise<object>} Account info
   */
  async getCredits() {
    try {
      const response = await axios.get(
        `${this.baseURL}/credits`,
        { headers: this.headers }
      );

      return response.data;
    } catch (error) {
      console.error('D-ID credits check error:', error.response?.data || error.message);
      throw new Error(`D-ID API Error: ${error.response?.data?.message || error.message}`);
    }
  }
}

module.exports = DIDVideoService;
