/**
 * Agnes 21 Role-Play System - Complete Implementation
 *
 * This function initializes the interactive role-play training system with:
 * - Multi-screen workflow (role selection → scenario → feedback → summary)
 * - AI-powered feedback generation via Gemini
 * - Automated scoring with key point tracking
 * - Voice input support (Web Speech API)
 * - Session state management and statistics
 * - Multi-scenario progression with retry functionality
 *
 * @requires getAllAgnesScenarios() - Scenario data provider
 * @requires getAgnesScenariosByRole(role) - Filtered scenario data
 * @requires scoreResponse() - Scoring engine
 * @requires ai - Global Gemini AI instance
 */
function initRolePlay() {
  console.log('🎭 Initializing Agnes Role-Play System...');

  // ============================================================================
  // SESSION STATE MANAGEMENT
  // ============================================================================

  const sessionState = {
    selectedRole: null,              // 'homeowner', 'rep', or 'adjuster'
    difficulty: 'beginner',          // Currently fixed, can be made configurable
    scenarios: [],                   // Loaded scenarios for selected role
    currentScenarioIndex: 0,         // Current position in scenarios array
    currentScenario: null,           // Currently active scenario object
    responses: [],                   // User responses for each scenario
    scores: [],                      // Score objects for each scenario
    hintsUsed: 0,                    // Total hints requested this session
    startTime: Date.now(),           // Session start timestamp
    recognition: null,               // Speech recognition instance
    scenarioStartTime: null          // Individual scenario start time
  };

  // ============================================================================
  // SCREEN MANAGEMENT
  // ============================================================================

  /**
   * Shows specified screen and hides all others
   * @param {string} screenId - ID of screen to display
   */
  function showScreen(screenId) {
    const screens = [
      'roleplay-setup',
      'scenario-display',
      'feedback-area',
      'session-summary'
    ];

    screens.forEach(id => {
      const screen = document.getElementById(id);
      if (screen) {
        screen.style.display = (id === screenId) ? 'block' : 'none';
      }
    });

    // Update ARIA live region for accessibility
    const liveRegion = document.getElementById('roleplay-live-region');
    if (liveRegion) {
      liveRegion.textContent = `Now showing: ${screenId.replace(/-/g, ' ')}`;
    }
  }

  /**
   * Display role selection screen
   */
  function showRoleSelection() {
    console.log('📋 Showing role selection screen');
    showScreen('roleplay-setup');

    // Reset session state
    sessionState.selectedRole = null;
    sessionState.scenarios = [];
    sessionState.currentScenarioIndex = 0;
    sessionState.responses = [];
    sessionState.scores = [];
    sessionState.hintsUsed = 0;
    sessionState.startTime = Date.now();
  }

  /**
   * Display active scenario training screen
   */
  function showScenarioDisplay() {
    console.log('🎬 Showing scenario display screen');
    showScreen('scenario-display');

    // Clear any previous feedback
    const feedbackArea = document.getElementById('feedback-area');
    if (feedbackArea) {
      feedbackArea.style.display = 'none';
    }
  }

  /**
   * Display feedback results screen
   * @param {Object} result - Scoring result object
   */
  function showFeedback(result) {
    console.log('📊 Showing feedback screen', result);
    const feedbackArea = document.getElementById('feedback-area');
    if (!feedbackArea) return;

    feedbackArea.style.display = 'block';
    feedbackArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Display final session summary screen
   */
  function showSessionSummary() {
    console.log('🏁 Showing session summary screen');
    showScreen('session-summary');
    displaySessionStatistics();
  }

  // ============================================================================
  // ROLE SELECTION HANDLER
  // ============================================================================

  /**
   * Handle role button clicks and load scenarios
   */
  function setupRoleSelection() {
    const roleButtons = document.querySelectorAll('.role-btn');

    roleButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        try {
          const role = e.target.getAttribute('data-role');
          console.log(`👤 Role selected: ${role}`);

          // Update session state
          sessionState.selectedRole = role;
          sessionState.startTime = Date.now();

          // Visual feedback
          roleButtons.forEach(btn => btn.classList.remove('selected'));
          e.target.classList.add('selected');

          // Load scenarios for selected role
          const allScenarios = getAgnesScenariosByRole(role);

          if (!allScenarios || allScenarios.length === 0) {
            throw new Error(`No scenarios found for role: ${role}`);
          }

          // Filter by difficulty if needed (currently all beginner)
          sessionState.scenarios = allScenarios.filter(
            s => s.difficulty === sessionState.difficulty
          );

          if (sessionState.scenarios.length === 0) {
            sessionState.scenarios = allScenarios; // Fallback to all scenarios
          }

          console.log(`📚 Loaded ${sessionState.scenarios.length} scenarios`);

          // Reset scenario index
          sessionState.currentScenarioIndex = 0;

          // Small delay for UX smoothness
          setTimeout(() => {
            loadScenario(0);
            showScenarioDisplay();
          }, 300);

        } catch (error) {
          console.error('❌ Error in role selection:', error);
          alert(`Error loading scenarios: ${error.message}`);
        }
      });
    });
  }

  // ============================================================================
  // SCENARIO DISPLAY
  // ============================================================================

  /**
   * Load and display a specific scenario
   * @param {number} index - Index of scenario to load
   */
  function loadScenario(index) {
    if (index < 0 || index >= sessionState.scenarios.length) {
      console.error('❌ Invalid scenario index:', index);
      return;
    }

    sessionState.currentScenarioIndex = index;
    sessionState.currentScenario = sessionState.scenarios[index];
    sessionState.scenarioStartTime = Date.now();

    console.log(`📖 Loading scenario ${index + 1}/${sessionState.scenarios.length}`);

    displayScenario(sessionState.currentScenario);
  }

  /**
   * Populate scenario UI with scenario data
   * @param {Object} scenario - Scenario object to display
   */
  function displayScenario(scenario) {
    try {
      // Update scenario title
      const titleElement = document.getElementById('scenario-title');
      if (titleElement) {
        titleElement.textContent = scenario.title || `Scenario ${sessionState.currentScenarioIndex + 1}`;
      }

      // Update context
      const contextElement = document.getElementById('scenario-context');
      if (contextElement) {
        contextElement.textContent = scenario.context || 'Begin your role-play training.';
      }

      // Update Agnes prompt
      const promptElement = document.getElementById('agnes-prompt');
      if (promptElement) {
        promptElement.textContent = scenario.prompt || 'Agnes: How can I help you today?';
      }

      // Update progress indicator
      const progressElement = document.getElementById('scenario-progress');
      if (progressElement) {
        const current = sessionState.currentScenarioIndex + 1;
        const total = sessionState.scenarios.length;
        progressElement.textContent = `Scenario ${current} of ${total}`;
      }

      // Clear previous response
      const responseTextarea = document.getElementById('user-response');
      if (responseTextarea) {
        responseTextarea.value = '';
        responseTextarea.disabled = false;
        responseTextarea.focus();
      }

      // Enable submit button
      const submitButton = document.getElementById('submit-response');
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Response';
      }

      // Hide feedback area
      const feedbackArea = document.getElementById('feedback-area');
      if (feedbackArea) {
        feedbackArea.style.display = 'none';
      }

      console.log('✅ Scenario displayed successfully');

    } catch (error) {
      console.error('❌ Error displaying scenario:', error);
    }
  }

  // ============================================================================
  // RESPONSE SUBMISSION
  // ============================================================================

  /**
   * Handle response submission and scoring
   */
  async function handleResponseSubmit() {
    try {
      const responseTextarea = document.getElementById('user-response');
      const submitButton = document.getElementById('submit-response');

      if (!responseTextarea || !submitButton) {
        throw new Error('Required UI elements not found');
      }

      const userResponse = responseTextarea.value.trim();

      // Validate input
      if (!userResponse) {
        alert('Please enter a response before submitting.');
        responseTextarea.focus();
        return;
      }

      if (userResponse.length < 10) {
        alert('Please provide a more detailed response (at least 10 characters).');
        responseTextarea.focus();
        return;
      }

      // Disable inputs during processing
      responseTextarea.disabled = true;
      submitButton.disabled = true;
      submitButton.textContent = 'Processing...';

      console.log('🔄 Processing response...');

      // Calculate scenario time
      const scenarioTime = sessionState.scenarioStartTime
        ? Math.round((Date.now() - sessionState.scenarioStartTime) / 1000)
        : 0;

      // Score the response
      const scenario = sessionState.currentScenario;
      const scoreResult = scoreResponse(
        userResponse,
        scenario.expectedKeyPoints || [],
        scenario.rubricKeywords || [],
        scenario.passThreshold || 70
      );

      console.log('📊 Score result:', scoreResult);

      // Generate AI feedback
      let aiFeedback = null;
      if (typeof ai !== 'undefined' && ai) {
        try {
          aiFeedback = await generateAIFeedback(userResponse, scenario, scoreResult);
        } catch (aiError) {
          console.error('⚠️ AI feedback generation failed:', aiError);
          // Continue without AI feedback
        }
      }

      // Store response and score
      sessionState.responses.push({
        scenarioIndex: sessionState.currentScenarioIndex,
        scenarioTitle: scenario.title,
        userResponse: userResponse,
        timeSpent: scenarioTime,
        timestamp: new Date().toISOString()
      });

      sessionState.scores.push({
        ...scoreResult,
        scenarioIndex: sessionState.currentScenarioIndex,
        aiFeedback: aiFeedback
      });

      // Display feedback
      displayFeedback(scoreResult, aiFeedback);

      // Re-enable textarea for retry option
      responseTextarea.disabled = false;
      submitButton.textContent = 'Submit Response';

    } catch (error) {
      console.error('❌ Error submitting response:', error);
      alert(`Error processing response: ${error.message}`);

      // Re-enable inputs
      const responseTextarea = document.getElementById('user-response');
      const submitButton = document.getElementById('submit-response');
      if (responseTextarea) responseTextarea.disabled = false;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Response';
      }
    }
  }

  // ============================================================================
  // AI FEEDBACK GENERATION
  // ============================================================================

  /**
   * Generate personalized feedback using Gemini AI
   * @param {string} userResponse - User's response text
   * @param {Object} scenario - Current scenario object
   * @param {Object} scoreResult - Scoring result object
   * @returns {Promise<Object>} - Feedback object with strengths and improvements
   */
  async function generateAIFeedback(userResponse, scenario, scoreResult) {
    console.log('🤖 Generating AI feedback...');

    const prompt = `You are Agnes, an expert insurance training coach. Analyze this role-play response and provide constructive feedback.

Scenario: ${scenario.title}
Context: ${scenario.context}
Agnes Prompt: ${scenario.prompt}

User Response: "${userResponse}"

Performance Metrics:
- Score: ${scoreResult.score}/100 (Pass threshold: ${scenario.passThreshold || 70})
- Matched Key Points: ${scoreResult.matchedPoints.length > 0 ? scoreResult.matchedPoints.join(', ') : 'None'}
- Missed Key Points: ${scoreResult.missedPoints.length > 0 ? scoreResult.missedPoints.join(', ') : 'None'}

Provide feedback in the following JSON format:
{
  "strengths": [
    "First specific strength (what they did well)",
    "Second specific strength (positive aspect)"
  ],
  "improvements": [
    "First specific improvement (what to work on)",
    "Second specific improvement (area for growth)"
  ]
}

Requirements:
- Be specific and actionable
- Reference actual content from their response
- Keep each point to 1-2 sentences
- Be encouraging but honest
- Focus on insurance communication skills
- Return ONLY valid JSON, no other text`;

    try {
      // Use Gemini AI to generate feedback
      const chat = await ai.chats.create({
        model: 'gemini-2.0-flash-exp',
        systemInstruction: 'You are Agnes, an expert insurance training coach. Always respond with valid JSON only.',
        config: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      });

      const response = await chat.sendMessage(prompt);
      const responseText = response.text.trim();

      // Extract JSON from response (handle markdown code blocks)
      let jsonText = responseText;
      if (responseText.includes('```json')) {
        jsonText = responseText.match(/```json\n([\s\S]*?)\n```/)?.[1] || responseText;
      } else if (responseText.includes('```')) {
        jsonText = responseText.match(/```\n([\s\S]*?)\n```/)?.[1] || responseText;
      }

      const feedback = JSON.parse(jsonText);

      // Validate feedback structure
      if (!feedback.strengths || !Array.isArray(feedback.strengths) || feedback.strengths.length < 2) {
        throw new Error('Invalid feedback format: missing strengths');
      }
      if (!feedback.improvements || !Array.isArray(feedback.improvements) || feedback.improvements.length < 2) {
        throw new Error('Invalid feedback format: missing improvements');
      }

      console.log('✅ AI feedback generated successfully');
      return feedback;

    } catch (error) {
      console.error('❌ AI feedback generation error:', error);

      // Fallback feedback based on score
      return {
        strengths: [
          scoreResult.score >= 70
            ? "You demonstrated good understanding of key concepts."
            : "You attempted to address the scenario.",
          `You included ${scoreResult.matchedPoints.length} important key points in your response.`
        ],
        improvements: [
          scoreResult.missedPoints.length > 0
            ? `Consider including these key points: ${scoreResult.missedPoints.slice(0, 2).join(', ')}.`
            : "Try to provide more detailed and comprehensive responses.",
          "Practice using professional insurance terminology and clear communication."
        ]
      };
    }
  }

  // ============================================================================
  // FEEDBACK DISPLAY
  // ============================================================================

  /**
   * Display feedback results with score and AI insights
   * @param {Object} scoreResult - Scoring result object
   * @param {Object} aiFeedback - AI-generated feedback object
   */
  function displayFeedback(scoreResult, aiFeedback) {
    console.log('📊 Displaying feedback...');

    // Update score circle
    const scoreCircle = document.getElementById('score-circle');
    if (scoreCircle) {
      scoreCircle.textContent = scoreResult.score;

      // Color coding
      scoreCircle.className = 'score-circle';
      if (scoreResult.score >= 85) {
        scoreCircle.classList.add('score-high');
      } else if (scoreResult.score >= 70) {
        scoreCircle.classList.add('score-medium');
      } else {
        scoreCircle.classList.add('score-low');
      }
    }

    // Update score text
    const scoreText = document.getElementById('score-text');
    if (scoreText) {
      const passThreshold = sessionState.currentScenario.passThreshold || 70;
      const passed = scoreResult.score >= passThreshold;
      scoreText.textContent = passed
        ? `Great job! You passed with ${scoreResult.score}/100`
        : `Score: ${scoreResult.score}/100 (Threshold: ${passThreshold})`;
    }

    // Display matched key points
    const matchedList = document.getElementById('matched-points-list');
    if (matchedList) {
      matchedList.innerHTML = '';
      if (scoreResult.matchedPoints.length > 0) {
        scoreResult.matchedPoints.forEach(point => {
          const li = document.createElement('li');
          li.innerHTML = `<span class="icon">✓</span> ${point}`;
          li.className = 'matched-point';
          matchedList.appendChild(li);
        });
      } else {
        matchedList.innerHTML = '<li class="no-points">No key points matched</li>';
      }
    }

    // Display missed key points
    const missedList = document.getElementById('missed-points-list');
    if (missedList) {
      missedList.innerHTML = '';
      if (scoreResult.missedPoints.length > 0) {
        scoreResult.missedPoints.forEach(point => {
          const li = document.createElement('li');
          li.innerHTML = `<span class="icon">✗</span> ${point}`;
          li.className = 'missed-point';
          missedList.appendChild(li);
        });
      } else {
        missedList.innerHTML = '<li class="no-points">All key points covered!</li>';
      }
    }

    // Display AI feedback if available
    if (aiFeedback) {
      // Strengths
      const strengthsList = document.getElementById('strengths-list');
      if (strengthsList) {
        strengthsList.innerHTML = '';
        aiFeedback.strengths.forEach(strength => {
          const li = document.createElement('li');
          li.innerHTML = `<span class="icon">💪</span> ${strength}`;
          strengthsList.appendChild(li);
        });
      }

      // Improvements
      const improvementsList = document.getElementById('improvements-list');
      if (improvementsList) {
        improvementsList.innerHTML = '';
        aiFeedback.improvements.forEach(improvement => {
          const li = document.createElement('li');
          li.innerHTML = `<span class="icon">📈</span> ${improvement}`;
          improvementsList.appendChild(li);
        });
      }
    } else {
      // Hide AI feedback sections if not available
      const strengthsList = document.getElementById('strengths-list');
      const improvementsList = document.getElementById('improvements-list');
      if (strengthsList) strengthsList.innerHTML = '<li>AI feedback unavailable</li>';
      if (improvementsList) improvementsList.innerHTML = '<li>AI feedback unavailable</li>';
    }

    // Show feedback area
    showFeedback(scoreResult);
  }

  // ============================================================================
  // MULTI-SCENARIO PROGRESSION
  // ============================================================================

  /**
   * Load next scenario in sequence
   */
  function nextScenario() {
    const nextIndex = sessionState.currentScenarioIndex + 1;

    if (nextIndex >= sessionState.scenarios.length) {
      // Session complete
      console.log('🏁 All scenarios completed');
      showSessionSummary();
    } else {
      // Load next scenario
      console.log(`➡️ Moving to scenario ${nextIndex + 1}`);
      loadScenario(nextIndex);
      showScenarioDisplay();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Retry current scenario
   */
  function retryScenario() {
    console.log('🔄 Retrying current scenario');

    // Remove last response and score
    if (sessionState.responses.length > 0) {
      sessionState.responses.pop();
    }
    if (sessionState.scores.length > 0) {
      sessionState.scores.pop();
    }

    // Reload current scenario
    displayScenario(sessionState.currentScenario);
    showScenarioDisplay();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Setup next scenario button
   */
  function setupNextScenarioButton() {
    const nextButton = document.getElementById('next-scenario-btn');
    if (nextButton) {
      nextButton.addEventListener('click', nextScenario);
    }
  }

  /**
   * Setup retry button
   */
  function setupRetryButton() {
    const retryButton = document.getElementById('retry-scenario-btn');
    if (retryButton) {
      retryButton.addEventListener('click', retryScenario);
    }
  }

  // ============================================================================
  // SESSION SUMMARY
  // ============================================================================

  /**
   * Calculate and display session statistics
   */
  function displaySessionStatistics() {
    console.log('📈 Calculating session statistics...');

    const stats = calculateSessionStats();

    // Update statistics in UI
    const summaryContainer = document.getElementById('session-summary');
    if (!summaryContainer) return;

    // Create statistics HTML
    const statsHTML = `
      <div class="summary-header">
        <h2>🎉 Training Session Complete!</h2>
        <p>Role: ${sessionState.selectedRole.charAt(0).toUpperCase() + sessionState.selectedRole.slice(1)}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-value">${stats.totalScenarios}</div>
          <div class="stat-label">Scenarios Completed</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">${stats.averageScore}</div>
          <div class="stat-label">Average Score</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-value">${stats.highestScore}</div>
          <div class="stat-label">Highest Score</div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-value">${stats.totalTime}</div>
          <div class="stat-label">Total Time</div>
        </div>
      </div>

      <div class="performance-breakdown">
        <h3>Performance Breakdown</h3>
        <div class="breakdown-item">
          <span>Passed Scenarios:</span>
          <span class="breakdown-value">${stats.passedScenarios} / ${stats.totalScenarios}</span>
        </div>
        <div class="breakdown-item">
          <span>Key Points Matched:</span>
          <span class="breakdown-value">${stats.totalMatchedPoints}</span>
        </div>
        <div class="breakdown-item">
          <span>Key Points Missed:</span>
          <span class="breakdown-value">${stats.totalMissedPoints}</span>
        </div>
        <div class="breakdown-item">
          <span>Hints Used:</span>
          <span class="breakdown-value">${sessionState.hintsUsed}</span>
        </div>
      </div>

      <div class="recommendations">
        <h3>Recommendations</h3>
        <ul>
          ${stats.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>

      <div class="summary-actions">
        <button id="start-new-session-btn" class="btn btn-primary">Start New Session</button>
        <button id="export-results-btn" class="btn btn-secondary">Export Results</button>
      </div>
    `;

    summaryContainer.innerHTML = statsHTML;

    // Setup action buttons
    const newSessionBtn = document.getElementById('start-new-session-btn');
    if (newSessionBtn) {
      newSessionBtn.addEventListener('click', () => {
        showRoleSelection();
      });
    }

    const exportBtn = document.getElementById('export-results-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportSessionResults);
    }
  }

  /**
   * Calculate session statistics
   * @returns {Object} - Statistics object
   */
  function calculateSessionStats() {
    const scores = sessionState.scores.map(s => s.score);
    const totalScenarios = sessionState.scores.length;
    const passThreshold = 70;

    const stats = {
      totalScenarios: totalScenarios,
      averageScore: totalScenarios > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / totalScenarios)
        : 0,
      highestScore: totalScenarios > 0 ? Math.max(...scores) : 0,
      lowestScore: totalScenarios > 0 ? Math.min(...scores) : 0,
      passedScenarios: scores.filter(s => s >= passThreshold).length,
      totalTime: formatTime(Math.round((Date.now() - sessionState.startTime) / 1000)),
      totalMatchedPoints: sessionState.scores.reduce((sum, s) => sum + s.matchedPoints.length, 0),
      totalMissedPoints: sessionState.scores.reduce((sum, s) => sum + s.missedPoints.length, 0),
      recommendations: []
    };

    // Generate recommendations
    if (stats.averageScore >= 85) {
      stats.recommendations.push('🌟 Excellent performance! You\'re ready for advanced scenarios.');
      stats.recommendations.push('💼 Consider moving to a different role to broaden your skills.');
    } else if (stats.averageScore >= 70) {
      stats.recommendations.push('👍 Good job! Review missed key points to improve further.');
      stats.recommendations.push('📚 Practice scenarios where you scored below 80.');
    } else {
      stats.recommendations.push('📖 Review training materials for key concepts.');
      stats.recommendations.push('🔄 Retry scenarios to reinforce learning.');
      stats.recommendations.push('💡 Use hints when available to guide your responses.');
    }

    if (stats.totalMissedPoints > stats.totalMatchedPoints) {
      stats.recommendations.push('🎯 Focus on including all key points in your responses.');
    }

    return stats;
  }

  /**
   * Format seconds into readable time string
   * @param {number} seconds - Time in seconds
   * @returns {string} - Formatted time string
   */
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  }

  /**
   * Export session results to JSON file
   */
  function exportSessionResults() {
    const exportData = {
      sessionId: `session-${Date.now()}`,
      role: sessionState.selectedRole,
      difficulty: sessionState.difficulty,
      startTime: new Date(sessionState.startTime).toISOString(),
      endTime: new Date().toISOString(),
      totalDuration: Math.round((Date.now() - sessionState.startTime) / 1000),
      scenarios: sessionState.responses.map((response, index) => ({
        ...response,
        score: sessionState.scores[index]?.score || 0,
        matchedPoints: sessionState.scores[index]?.matchedPoints || [],
        missedPoints: sessionState.scores[index]?.missedPoints || [],
        aiFeedback: sessionState.scores[index]?.aiFeedback || null
      })),
      statistics: calculateSessionStats()
    };

    // Create download link
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `agnes-roleplay-${sessionState.selectedRole}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('📥 Session results exported');
  }

  // ============================================================================
  // VOICE INPUT (WEB SPEECH API)
  // ============================================================================

  /**
   * Initialize voice input functionality
   * @returns {Object|null} - Speech recognition instance or null if unsupported
   */
  function initVoiceInput() {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('⚠️ Speech recognition not supported in this browser');
      const voiceBtn = document.getElementById('voice-input-btn');
      if (voiceBtn) {
        voiceBtn.style.display = 'none';
      }
      return null;
    }

    // Create recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Configure recognition
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    // Handle results
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const responseTextarea = document.getElementById('user-response');

      if (responseTextarea) {
        // Append to existing text or replace
        const currentText = responseTextarea.value.trim();
        if (currentText) {
          responseTextarea.value = currentText + ' ' + transcript;
        } else {
          responseTextarea.value = transcript;
        }

        // Update character count if exists
        responseTextarea.dispatchEvent(new Event('input'));
      }

      console.log('🎤 Voice input:', transcript);
    };

    // Handle errors
    recognition.onerror = (event) => {
      console.error('🎤 Speech recognition error:', event.error);

      const voiceBtn = document.getElementById('voice-input-btn');
      if (voiceBtn) {
        voiceBtn.textContent = '🎤 Try Again';
        voiceBtn.disabled = false;
      }

      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please enable microphone permissions.');
      } else if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.');
      }
    };

    // Handle start
    recognition.onstart = () => {
      console.log('🎤 Listening...');
      const voiceBtn = document.getElementById('voice-input-btn');
      if (voiceBtn) {
        voiceBtn.textContent = '🎤 Listening...';
        voiceBtn.disabled = true;
      }
    };

    // Handle end
    recognition.onend = () => {
      console.log('🎤 Stopped listening');
      const voiceBtn = document.getElementById('voice-input-btn');
      if (voiceBtn) {
        voiceBtn.textContent = '🎤 Voice Input';
        voiceBtn.disabled = false;
      }
    };

    return recognition;
  }

  /**
   * Setup voice input button
   */
  function setupVoiceButton() {
    const voiceBtn = document.getElementById('voice-input-btn');
    if (!voiceBtn || !sessionState.recognition) return;

    voiceBtn.addEventListener('click', () => {
      try {
        sessionState.recognition.start();
      } catch (error) {
        console.error('🎤 Error starting voice input:', error);
        if (error.name === 'InvalidStateError') {
          // Already started, stop and restart
          sessionState.recognition.stop();
          setTimeout(() => sessionState.recognition.start(), 100);
        }
      }
    });
  }

  // ============================================================================
  // HINT SYSTEM
  // ============================================================================

  /**
   * Display random hint from current scenario's training tips
   */
  function showHint() {
    const scenario = sessionState.currentScenario;
    if (!scenario || !scenario.trainingTips || scenario.trainingTips.length === 0) {
      alert('No hints available for this scenario.');
      return;
    }

    // Get random tip
    const randomTip = scenario.trainingTips[
      Math.floor(Math.random() * scenario.trainingTips.length)
    ];

    // Display hint
    const hintContainer = document.getElementById('hint-display');
    if (hintContainer) {
      hintContainer.innerHTML = `<div class="hint-box">💡 Trainer Tip: ${randomTip}</div>`;
      hintContainer.style.display = 'block';

      // Increment hint counter
      sessionState.hintsUsed++;

      // Auto-hide after 10 seconds
      setTimeout(() => {
        hintContainer.style.display = 'none';
      }, 10000);
    }

    console.log('💡 Hint displayed:', randomTip);
  }

  /**
   * Setup hint button
   */
  function setupHintButton() {
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', showHint);
    }
  }

  // ============================================================================
  // ERROR HANDLING
  // ============================================================================

  /**
   * Global error handler for roleplay system
   */
  function handleError(error, context = 'Unknown') {
    console.error(`❌ Error in ${context}:`, error);

    // User-friendly error messages
    const userMessage = {
      'AI_UNAVAILABLE': 'AI feedback is temporarily unavailable. Continuing with basic scoring.',
      'SCORING_FAILED': 'Unable to score response. Please try again.',
      'SCENARIO_LOAD_FAILED': 'Failed to load scenario. Please refresh the page.',
      'NETWORK_ERROR': 'Network error. Please check your connection.',
      'VALIDATION_ERROR': 'Please check your input and try again.'
    };

    // Show error to user if critical
    if (context.includes('Critical')) {
      const message = userMessage[error.code] || `Error: ${error.message}`;
      alert(message);
    }

    // Log to console for debugging
    console.trace(error);
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  /**
   * Initialize all roleplay system components
   */
  function initialize() {
    console.log('🚀 Initializing roleplay system components...');

    try {
      // Verify required functions exist
      if (typeof getAllAgnesScenarios !== 'function') {
        throw new Error('getAllAgnesScenarios function not found');
      }
      if (typeof getAgnesScenariosByRole !== 'function') {
        throw new Error('getAgnesScenariosByRole function not found');
      }
      if (typeof scoreResponse !== 'function') {
        throw new Error('scoreResponse function not found');
      }

      // Verify AI is available
      if (typeof ai === 'undefined' || !ai) {
        console.warn('⚠️ Gemini AI not available. AI feedback will be disabled.');
      } else {
        console.log('✅ Gemini AI connected');
      }

      // Setup event listeners
      setupRoleSelection();

      const submitButton = document.getElementById('submit-response');
      if (submitButton) {
        submitButton.addEventListener('click', handleResponseSubmit);
      }

      setupNextScenarioButton();
      setupRetryButton();
      setupHintButton();

      // Initialize voice input
      sessionState.recognition = initVoiceInput();
      setupVoiceButton();

      // Create ARIA live region if doesn't exist
      if (!document.getElementById('roleplay-live-region')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'roleplay-live-region';
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegion);
      }

      // Show role selection by default
      showRoleSelection();

      console.log('✅ Agnes Role-Play System initialized successfully');

    } catch (error) {
      handleError(error, 'Critical: Initialization');
      throw error;
    }
  }

  // Start initialization
  initialize();

  // Return public API for external control if needed
  return {
    showRoleSelection,
    showScenarioDisplay,
    showFeedback,
    showSessionSummary,
    nextScenario,
    retryScenario,
    getSessionState: () => ({ ...sessionState })
  };
}

// ============================================================================
// AUTO-INITIALIZE ON DOM READY
// ============================================================================

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRolePlay);
} else {
  // DOM already loaded
  initRolePlay();
}
