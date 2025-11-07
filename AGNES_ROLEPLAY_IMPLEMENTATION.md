# Agnes 21 Role-Play Implementation Summary

## Overview
Module 15 in the Lite Training platform has been successfully transformed from a basic chat system into an advanced **Agnes 21 Role-Play** training system with scoring, feedback, and multi-scenario progression.

---

## What Was Implemented

### 1. Enhanced UI/UX (Lines 258-368 in index.tsx)
Replaced the basic chat interface with a comprehensive role-play training system:

#### **Setup Flow:**
- **Role Selection**: Choose between 3 roles:
  - Sales Rep vs Homeowner (practice handling objections)
  - Homeowner vs Sales Rep (understand homeowner perspective)
  - Sales Rep vs Adjuster (practice scope negotiation)

- **Difficulty Selection**: Three levels:
  - **Beginner**: Basic scenarios with helpful hints
  - **Intermediate**: Mixed complexity, moderate scoring
  - **Advanced**: Complex scenarios, strict scoring (75-80% thresholds)

#### **Training Interface:**
- Scenario display with context, role, and difficulty badges
- Large text area for responses
- Voice input support (Web Speech API)
- Hint system (reveals random key points)
- Submit, retry, and next scenario controls

#### **Feedback System:**
- Visual score circle (color-coded: excellent/good/fair/needs-work)
- Matched vs missed key points
- AI-generated strengths and improvements
- Pass/fail status based on threshold

#### **Session Summary:**
- Statistics (avg score, high/low scores, completion count)
- Detailed results for each scenario
- Recommendations for improvement

---

### 2. Scenario Library (Lines 735-799 in index.tsx)
Extracted **30+ real scenarios** from all 9 Agnes modules:

#### **Homeowner Scenarios (20+):**
- Initial pitch objections (not interested, talk to spouse, other contractor, etc.)
- Budget concerns (pricing, deductible, can't afford)
- Trust issues (scam worried, legitimacy questions)
- Process hesitations (insurance claims, HOA restrictions, timing)
- Post-inspection objections (wait until spring, no visible damage)

#### **Adjuster Scenarios (4):**
- Slope sampling methodology
- Collateral damage prioritization
- Supplement justification
- Scope clarity discussions

#### **Rep Practice Scenarios (6):**
- Elevator pitch delivery
- Borderline damage handling
- Adjuster meeting preparation
- Photo documentation standards

Each scenario includes:
- **ID**: Unique identifier
- **Role**: homeowner | rep | adjuster
- **Prompt**: The scenario question/objection
- **Expected Key Points**: 3-6 critical elements
- **Rubric Keywords**: 5-10 keywords for matching
- **Pass Threshold**: 70-80% depending on difficulty
- **Follow-ups**: 1-2 progressive questions

---

### 3. Scoring Engine (Lines 1008-1056 in index.tsx)
Implements the **70/30 scoring formula**:

#### **Key Point Matching (70% weight):**
- Checks if response contains concepts from expected key points
- Uses keyword extraction and matching
- Counts matched vs missed points

#### **Rubric Keyword Matching (30% weight):**
- Checks for presence of rubric keywords
- Case-insensitive matching
- Calculates percentage of keywords hit

**Total Score = (Key Points %) × 0.7 + (Keywords %) × 0.3**

Example:
- 3/4 key points matched = 75% × 0.7 = 52.5
- 6/8 keywords matched = 75% × 0.3 = 22.5
- **Total Score = 75/100**

---

### 4. AI Feedback Generation (Lines 1058-1113 in index.tsx)
Uses Gemini AI to provide personalized coaching:

#### **Input to AI:**
- Scenario prompt and expected key points
- User's response
- Calculated score and matched/missed points

#### **Output from AI:**
- **2 Strengths**: What the trainee did well
- **2 Improvements**: What to add or refine

Parsing logic extracts strengths and improvements from natural language response.

---

### 5. Session Management (Lines 801-1319 in index.tsx)
Tracks progress across multiple scenarios:

#### **State Management:**
```typescript
agnesSession = {
    selectedRole: 'homeowner' | 'rep' | 'adjuster',
    selectedDifficulty: 'beginner' | 'intermediate' | 'advanced',
    currentScenarioIndex: 0,
    scenarioPool: AgnesScenario[],
    sessionScores: number[],
    sessionResults: any[],
}
```

#### **Functions:**
- `startAgnesSession()`: Filters and shuffles scenarios
- `loadCurrentScenario()`: Displays current scenario
- `submitAgnesResponse()`: Scores and provides feedback
- `loadNextScenario()`: Advances to next scenario
- `retryCurrentScenario()`: Clears response, try again
- `showSessionSummary()`: Displays statistics and recommendations
- `resetAgnesSession()`: Returns to role selection

---

### 6. Voice Input (Lines 1196-1232 in index.tsx)
Web Speech API integration:

- Click microphone button to start recording
- Transcribes speech to text
- Auto-fills response textarea
- Graceful fallback if browser doesn't support it

**Browser Support:**
- Chrome/Edge: Full support
- Safari: Partial support (webkit prefix)
- Firefox: Limited support

---

### 7. Styling (index.css - 300+ lines added)
Purple-themed Agnes branding:

#### **Color Scheme:**
- Primary: `#9333ea` (Agnes purple)
- Light: `#c084fc`
- Dark: `#7e22ce`

#### **Key Components:**
- Role/difficulty selection buttons (gradient, hover effects)
- Score circle (color-coded by performance)
- Badge system (scenario info)
- Prompt box (bordered, highlighted)
- Feedback cards (matched/missed, strengths/improvements)
- Session summary layout

#### **Responsive Design:**
- Desktop: Multi-column grids
- Tablet: 2-column layouts
- Mobile: Single-column stacking
- Touch-friendly button sizes

---

## How It Works (User Flow)

### 1. **Role Selection**
User clicks one of three role buttons → Difficulty selector appears

### 2. **Difficulty Selection**
User selects beginner/intermediate/advanced → Start Training button appears

### 3. **Training Session Begins**
- System filters scenarios by role and difficulty
- Shuffles scenario pool
- Displays first scenario

### 4. **User Responds**
- Types response in textarea (or uses voice input)
- Clicks Submit Response
- Can click Hint to reveal a random key point

### 5. **Scoring & Feedback**
- System calculates score (70/30 formula)
- Gemini AI generates personalized feedback
- Displays:
  - Score circle with pass/fail status
  - Matched and missed key points
  - AI-generated strengths and improvements

### 6. **Progression**
User can:
- **Next Scenario**: Move to next challenge
- **Retry**: Clear response and try again
- **View Summary**: See session statistics

### 7. **Session Summary**
After completing all scenarios (or clicking View Summary):
- Average, high, and low scores
- Detailed results for each scenario
- Recommendations for improvement
- Option to start new session or return to training

---

## Technical Details

### **Data Source**
All 30+ scenarios extracted from real Agnes training modules:
- `/training-leaders-main/src/data/agnes/scenarios.module1.ts` (Initial Pitch)
- `/training-leaders-main/src/data/agnes/scenarios.module2.ts` (Inspection)
- `/training-leaders-main/src/data/agnes/scenarios.module3.ts` (Pipeline)
- `/training-leaders-main/src/data/agnes/scenarios.module4.ts` (L.E.A.R.N.)
- `/training-leaders-main/src/data/agnes/scenarios.module5.ts` (Insurance)
- `/training-leaders-main/src/data/agnes/scenarios.module6.ts` (Scenario Drills)
- `/training-leaders-main/src/data/agnes/scenarios.module7.ts` (Time Management)
- `/training-leaders-main/src/data/agnes/scenarios.module8.ts` (Coaching)
- `/training-leaders-main/src/data/agnes/scenarios.module9.ts` (Capstone)

### **Integration Points**
- Uses existing Gemini AI instance (`ai` variable)
- Maintains Lite Training single-file structure
- Preserves existing module functionality
- Mobile-responsive design matches platform style

### **Performance Considerations**
- Scenarios loaded in memory (no API calls during selection)
- AI feedback only called once per submission
- Efficient DOM updates (show/hide instead of re-render)
- Lazy loading of difficulty/session info

---

## Success Metrics

Users can now:
- ✅ Select role (homeowner/rep/adjuster)
- ✅ Choose difficulty level
- ✅ Practice 30+ real-world scenarios
- ✅ Receive scored feedback (0-100)
- ✅ See matched/missed key points
- ✅ Get AI-generated strengths and improvements
- ✅ Use voice input for responses
- ✅ Track session progress and statistics
- ✅ Complete multi-scenario sequences
- ✅ View comprehensive session summaries

---

## Files Modified

1. **`/Users/a21/Desktop/Training Leaders Main/index.tsx`**
   - Lines 258-368: New HTML structure
   - Lines 735-1319: Complete Agnes logic implementation
   - Preserved all existing functionality

2. **`/Users/a21/Desktop/Training Leaders Main/index.css`**
   - Added 300+ lines of Agnes-specific styling
   - Purple color scheme (#9333ea)
   - Responsive design rules
   - Score visualization CSS

---

## Next Steps (Optional Enhancements)

### **Potential Future Improvements:**
1. **Progress Persistence**: Save session state to localStorage
2. **Leaderboard**: Track top scores across sessions
3. **Custom Scenarios**: Allow users to create/edit scenarios
4. **Audio Playback**: TTS for scenario prompts
5. **Time Tracking**: Measure response time per scenario
6. **Detailed Analytics**: Charts showing improvement over time
7. **Certification**: Generate certificate after passing all scenarios
8. **Multiplayer**: Practice with another trainee via WebRTC

---

## Testing Checklist

- [x] Role selection UI works
- [x] Difficulty selection UI works
- [x] Scenarios load correctly
- [x] Scoring engine calculates correctly
- [x] AI feedback generates properly
- [x] Voice input works in supported browsers
- [x] Hint system reveals key points
- [x] Next/Retry/Summary buttons function
- [x] Session summary displays statistics
- [x] Mobile responsive design works
- [x] Purple Agnes branding applied
- [x] Existing modules still functional

---

## Maintenance Notes

### **Adding New Scenarios:**
Add to `AGNES_SCENARIOS` array in `index.tsx`:
```typescript
{
    id: 'm10-new-scenario',
    role: 'homeowner',
    prompt: 'Your scenario text here',
    expectedKeyPoints: ['point 1', 'point 2', 'point 3'],
    rubric: {
        keywords: ['keyword1', 'keyword2'],
        passThreshold: 70
    },
    followUps: ['Follow-up question'],
    difficulty: 'intermediate'
}
```

### **Adjusting Scoring:**
Modify `scoreAgnesResponse()` function (line 1008):
- Change key point weight (currently 70%)
- Change keyword weight (currently 30%)
- Adjust matching logic

### **Updating AI Feedback:**
Modify prompt in `generateAIFeedback()` (line 1070):
- Change coaching tone
- Request different feedback format
- Add/remove feedback categories

---

## Conclusion

Module 15 is now a fully-featured Agnes 21 Role-Play training system that provides:
- **Authentic scenarios** from real Agnes training modules
- **Meaningful scoring** based on key point and keyword matching
- **Personalized feedback** from Gemini AI
- **Progressive difficulty** levels
- **Session tracking** and statistics
- **Professional UI** with Agnes purple branding

The implementation maintains the Lite Training platform's clean single-file architecture while adding powerful role-play training capabilities.
