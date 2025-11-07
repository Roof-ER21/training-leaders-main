# 🧪 Complete Testing Guide - Agnes AI & Interactive Features

**Date:** October 11, 2025  
**Status:** Ready for Testing  
**Dev Server:** http://localhost:3000

---

## 🎯 Quick Test Checklist

### **Priority 1: Agnes Chat Messaging** ✅
- [ ] Agnes chat opens without errors
- [ ] Can type and send messages
- [ ] Agnes responds with streaming text
- [ ] Messages appear in conversation
- [ ] Error messages are user-friendly

### **Priority 2: Voice Features** ✅
- [ ] Microphone button is visible
- [ ] Clicking microphone requests permission
- [ ] Can speak and text appears in input
- [ ] Voice responses toggle works in settings
- [ ] Agnes speaks responses when enabled

### **Priority 3: Interactive Activities** ✅
- [ ] Activities load in modules
- [ ] Different activity types work
- [ ] Scoring and feedback display
- [ ] Can retry activities
- [ ] Progress is tracked

---

## 📋 Detailed Testing Protocol

### **TEST 1: Agnes Chat Basic Functionality**

**Steps:**
1. Open the app: http://localhost:3000
2. Navigate to any training module
3. Click "Practice with Agnes" or open Agnes Chat
4. Verify welcome message appears

**Expected Result:**
```
✅ Welcome message from Agnes displays
✅ Chat interface is responsive
✅ Input field is active
✅ System status shows "healthy" or "degraded"
```

**Test Messages:**
```
1. "Hello Agnes"
   Expected: Friendly greeting response

2. "Tell me about safety equipment"
   Expected: Detailed safety information

3. "How do I calculate ACV?"
   Expected: Step-by-step ACV explanation

4. "What should I do if a homeowner says they're not interested?"
   Expected: LEARN framework or objection handling advice
```

**Console Check:**
- Open browser console (F12)
- Look for `[AgnesChat]` log messages
- Verify no red error messages

---

### **TEST 2: Voice Input (Speech-to-Text)**

**Preconditions:**
- Use Chrome, Edge, or Safari (Firefox has limited support)
- Have a working microphone
- Quiet environment

**Steps:**
1. Open Agnes Chat
2. Click the microphone button (right side of input field)
3. When prompted, click "Allow" for microphone access
4. Speak clearly: "What is safety equipment?"
5. Watch input field populate with your speech
6. Press Enter or click Send

**Expected Results:**
```
✅ Microphone permission dialog appears
✅ Microphone button turns red and pulses when listening
✅ Speech is converted to text in input field
✅ Can send the transcribed message
✅ Console shows [Voice] logs
```

**Troubleshooting:**
- If permission denied: Check browser settings → Privacy → Microphone
- If no text appears: Speak louder and more clearly
- If button does nothing: Check console for errors

---

### **TEST 3: Voice Output (Text-to-Speech)**

**Steps:**
1. Open Agnes Chat
2. Click Settings icon (gear) in header
3. Check "Voice responses" checkbox
4. Send a message: "Tell me about roofing materials"
5. Listen as Agnes speaks the response

**Expected Results:**
```
✅ Settings panel opens
✅ Voice responses toggle is visible
✅ Agnes' voice speaks the response
✅ Speaker icon shows while speaking
✅ Can stop speech with X button
✅ Console shows [Voice] voice selection logs
```

**Voice Quality Check:**
- Female voice (preferred)
- Clear pronunciation
- Natural pace (not too fast/slow)
- Appropriate volume

---

### **TEST 4: System Status & Error Handling**

**Steps:**
1. Open Agnes Chat
2. Click the status icon (top right, should be green/yellow/red)
3. Review system information
4. Click refresh icon
5. Try sending a message with Ollama stopped (advanced test)

**Expected Status Display:**
```
Ollama: ✓ Connected (or ✗ Not available)
Active Model: susan-ai-21:v4 (or other model)
Available Models: 20+ models
```

**Error Scenarios:**
```
IF Ollama offline:
→ Agnes shows friendly "having trouble connecting" message
→ Suggests checking system status
→ Provides fallback advice

IF message too complex:
→ Agnes provides simpler response
→ Suggests breaking question into parts

IF timeout:
→ Clear error message
→ Suggests trying again
```

---

### **TEST 5: Interactive Activities**

**Location:** Inside any training module → Interactive tab

**Activity Types to Test:**

#### **5.1: Drag & Drop Activity**
**Example:** "Pitch Sequence Challenge" in Module 1

**Steps:**
1. Navigate to Module 1 → Interactive tab
2. Find "Pitch Sequence Challenge"
3. Click "Start Activity"
4. Drag items to correct order
5. Submit answer

**Expected:**
```
✅ Items are draggable
✅ Drop zones highlight on hover
✅ Can submit when complete
✅ Feedback modal shows score
✅ Can retry if wrong
```

#### **5.2: Multiple Choice Quiz**
**Steps:**
1. Select a multiple choice activity
2. Click answer options
3. Submit

**Expected:**
```
✅ Options highlight when selected
✅ Immediate feedback on submit
✅ Explanation shows for incorrect answers
✅ Points awarded for correct answers
```

#### **5.3: Fill in the Blank**
**Steps:**
1. Find fill-in-blank activity
2. Type answers in blanks
3. Submit

**Expected:**
```
✅ Input fields accept text
✅ Flexible answer matching (synonyms accepted)
✅ Partial credit for close answers
✅ Hints available if stuck
```

#### **5.4: Calculation Practice**
**Example:** ACV/RCV calculator in Module 5

**Steps:**
1. Navigate to Module 5 activities
2. Find calculation activity
3. Input numbers
4. Calculate

**Expected:**
```
✅ Number inputs work
✅ Calculations are accurate
✅ Formula explanation provided
✅ Step-by-step breakdown shown
```

---

### **TEST 6: Coaching Scenarios**

**Location:** `/src/data/coachingScenarios.ts` (13 scenarios available)

**Access Method:**
- Will be integrated into module roleplay sections
- Currently available programmatically

**Sample Scenarios:**
```
1. "Your First Door Knock" (beginner)
2. "Overcoming 'Not Interested'" (beginner)  
3. "Handling 'I Already Have a Roofer'" (advanced)
4. "Perfect Photo Documentation" (beginner)
5. "Identifying Hail vs. Wind Damage" (intermediate)
```

**To Test Programmatically:**
```typescript
import { getScenariosByModule, getScenarioById } from '../data/coachingScenarios';

// Get all Module 1 scenarios
const module1Scenarios = getScenariosByModule(1);

// Get specific scenario
const doorKnockScenario = getScenarioById('door-knock-first-time');
```

---

## 🔧 Browser Compatibility

### **Recommended Browsers:**
| Browser | Chat | Voice Input | Voice Output | Activities |
|---------|------|-------------|--------------|------------|
| Chrome 90+ | ✅ | ✅ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ | ✅ | ✅ |
| Safari 14+ | ✅ | ✅ | ✅ | ✅ |
| Firefox 88+ | ✅ | ⚠️ Limited | ✅ | ✅ |

⚠️ **Firefox Note:** Web Speech API has limited support. Voice input may not work.

---

## 🐛 Known Issues & Workarounds

### **Issue 1: Voice Input Doesn't Start**
**Symptoms:** Clicking microphone does nothing  
**Cause:** Browser restrictions or permissions  
**Fix:**
1. Check browser settings → Privacy → Microphone
2. Ensure HTTPS or localhost (required for microphone access)
3. Try in Chrome/Edge instead of Firefox

### **Issue 2: Agnes Doesn't Respond**
**Symptoms:** Message sent but no response  
**Cause:** Ollama not running or model not available  
**Fix:**
1. Open terminal: `ollama list`
2. Verify models are installed
3. Start Ollama if stopped: `ollama serve`
4. Check system status in Agnes Chat

### **Issue 3: Voice Output Not Speaking**
**Symptoms:** Text appears but no voice  
**Cause:** Voices not loaded or synthesis API issue  
**Fix:**
1. Wait 2-3 seconds after enabling voice responses
2. Check browser console for voice selection logs
3. Try sending message again
4. Refresh page if persistent

### **Issue 4: Activities Don't Load**
**Symptoms:** Activities section empty  
**Cause:** Module JSON missing activity data  
**Fix:**
1. Check module JSON file for `interactiveLearning` array
2. Verify JSON syntax is valid
3. Restart dev server

---

## 📊 Performance Benchmarks

### **Expected Response Times:**
- **Agnes Chat:** 1-3 seconds (streaming starts immediately)
- **Voice Recognition:** 1-2 seconds after speaking
- **Voice Synthesis:** Instant playback
- **Activity Load:** <500ms
- **Scenario Fetch:** Instant (in-memory)

### **Resource Usage:**
- **Memory:** ~150-300MB for chat
- **CPU:** ~10-20% during voice synthesis
- **Network:** Ollama localhost only (no external calls)

---

## ✅ Success Criteria

Your testing is successful when:

1. **Agnes Chat:**
   - ✅ Sends and receives messages reliably
   - ✅ Streaming works smoothly
   - ✅ Errors are user-friendly
   - ✅ Conversation persists across sessions

2. **Voice Features:**
   - ✅ Microphone permission works
   - ✅ Speech-to-text is accurate (80%+ accuracy)
   - ✅ Text-to-speech sounds natural
   - ✅ Can toggle voice on/off

3. **Interactive Activities:**
   - ✅ All 6 activity types render correctly
   - ✅ User interactions work (drag, click, type)
   - ✅ Scoring and feedback display
   - ✅ Can retry failed activities

4. **System Health:**
   - ✅ No console errors (warnings OK)
   - ✅ App remains responsive
   - ✅ Memory usage stable
   - ✅ Ollama connection maintained

---

## 🚀 Next Steps After Testing

1. **Report Issues:**
   - Note any bugs or unexpected behavior
   - Include browser, OS, and steps to reproduce
   - Check console for error messages

2. **Content Population:**
   - Add remaining coaching scenarios (32-50 more)
   - Populate all module activities (45-63 total)
   - Create more roleplay branches

3. **Enhancements:**
   - Add video demonstrations
   - Build leaderboard for activities
   - Create achievement system
   - Add mobile-optimized views

---

## 📞 Testing Support

**Console Debugging:**
```javascript
// Check Agnes service status
console.log('[Test] Agnes service:', agnesService);

// Check available models
console.log('[Test] Ollama models:', await ollama.getModels());

// Check voice support
console.log('[Test] Speech recognition:', 'webkitSpeechRecognition' in window);
console.log('[Test] Speech synthesis:', 'speechSynthesis' in window);
```

**Quick Fixes:**
```bash
# Restart Ollama
killall ollama
ollama serve

# Clear browser cache
Ctrl/Cmd + Shift + Delete → Clear cached files

# Restart dev server
Ctrl + C (in terminal)
npm start
```

---

**Happy Testing! 🎉**

If you encounter any issues, check the console logs first, then review the troubleshooting section above. Most issues are related to browser permissions or Ollama connectivity.
