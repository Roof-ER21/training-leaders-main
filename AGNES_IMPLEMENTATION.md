# Agnes - Animated AI Chatbot Implementation Guide

## Overview

Agnes is an AI-powered roofing instructor chatbot that appears at strategic points during lessons to guide learners through the Training Leaders app. She features:

- **Professional female instructor design** wearing Roof ER black polo
- **Scroll-triggered appearances** at key learning moments
- **Intelligent behavior** with idle detection and progress tracking
- **Interactive guidance** with tips, suggestions, and chat capabilities
- **Fully animated** with smooth transitions and engaging interactions

---

## Architecture

### Core Components

```
src/
├── components/
│   ├── AgnesAvatar.tsx           # Visual avatar component
│   ├── AgnesChat.tsx              # Full chat interface (existing)
│   ├── AgnesScrollTrigger.tsx     # Scroll detection & triggering system
│   ├── LessonWithAgnes.tsx        # Example integration
│   └── AgnesTriggerPoint          # Mark trigger points in content
├── hooks/
│   └── useScrollTrigger.ts        # Custom hooks for scroll detection
└── services/
    └── agnesAI.ts                 # AI service (existing)
```

---

## Components Documentation

### 1. AgnesAvatar

**Purpose:** Visual representation of Agnes with interactive capabilities

**Props:**
```typescript
interface AgnesAvatarProps {
  isVisible: boolean;              // Show/hide avatar
  message?: string;                // Main message to display
  tip?: string;                    // Optional learning tip
  suggestedAction?: string;        // Action button text
  onClose?: () => void;            // Close handler
  onChatClick?: () => void;        // Open chat handler
  onActionClick?: () => void;      // Suggested action handler
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  variant?: 'full' | 'compact' | 'mini';
}
```

**Variants:**
- **full**: Complete avatar with message card (default)
- **compact**: Smaller avatar with condensed message
- **mini**: Avatar only, clickable to open chat

**Visual Design:**
- Professional female character
- Brown hair in professional style
- Friendly, welcoming expression
- Black Roof ER polo with logo
- Purple gradient background
- Green status indicator

**Usage Example:**
```tsx
<AgnesAvatar
  isVisible={true}
  message="Welcome to this module!"
  tip="Take your time and ask questions anytime."
  suggestedAction="Start Learning"
  onChatClick={() => setShowChat(true)}
  position="bottom-right"
  variant="full"
/>
```

---

### 2. AgnesScrollTrigger

**Purpose:** Intelligent system to trigger Agnes at optimal moments

**Features:**
- Scroll percentage triggers (25%, 50%, 75%)
- Idle detection (user seems stuck)
- Custom trigger points
- Dismissible with memory

**Props:**
```typescript
interface AgnesScrollTriggerProps {
  triggerPoints?: TriggerPoint[];
  onChatOpen?: () => void;
  onActionClick?: (triggerId: string) => void;
  enableIdleTrigger?: boolean;
  idleTimeMs?: number;
  enablePercentageTrigger?: boolean;
  percentageTriggers?: {
    percentage: number;
    message: string;
    tip?: string;
  }[];
}
```

**Usage Example:**
```tsx
<AgnesScrollTrigger
  onChatOpen={() => setShowAgnesChat(true)}
  enableIdleTrigger={true}
  idleTimeMs={10000}
  enablePercentageTrigger={true}
  percentageTriggers={[
    {
      percentage: 25,
      message: "You're making good progress!",
      tip: "Remember to take breaks if needed."
    }
  ]}
/>
```

---

### 3. AgnesTriggerPoint

**Purpose:** Mark specific sections where Agnes should appear

**Usage Example:**
```tsx
<AgnesTriggerPoint
  triggerId="safety-section"
  message="This is a critical safety section!"
  tip="Pay close attention to the PPE requirements."
  suggestedAction="Review Safety Video"
  onTrigger={handleTrigger}
  threshold={0.5}
>
  <SafetyContentSection />
</AgnesTriggerPoint>
```

---

### 4. Custom Hooks

#### useScrollTrigger

Detects when element enters viewport:
```tsx
const [ref, { isVisible, hasBeenVisible }] = useScrollTrigger({
  threshold: 0.5,
  once: true,
  rootMargin: '0px'
});
```

#### useScrollPosition

Tracks scroll position and percentage:
```tsx
const { scrollPosition, scrollPercentage } = useScrollPosition();
```

#### useScrollPercentageTrigger

Triggers at specific scroll percentage:
```tsx
const { isActive, hasTriggered } = useScrollPercentageTrigger(50, true);
```

#### useIdleDetection

Detects user inactivity:
```tsx
const isIdle = useIdleDetection(5000); // 5 seconds
```

---

## Integration Guide

### Step 1: Basic Integration

Add Agnes to any lesson component:

```tsx
import AgnesScrollTrigger from './components/AgnesScrollTrigger';
import AgnesChat from './components/AgnesChat';

function MyLessonComponent() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      {/* Your lesson content */}

      <AgnesScrollTrigger
        onChatOpen={() => setShowChat(true)}
        enableIdleTrigger={true}
      />

      {showChat && (
        <AgnesChat
          currentModule="module1"
          currentLesson="Safety Basics"
          onModuleRecommendation={handleRecommendation}
        />
      )}
    </div>
  );
}
```

### Step 2: Add Trigger Points

Mark important sections:

```tsx
<AgnesTriggerPoint
  triggerId="key-concept-1"
  message="This is an important concept!"
  tip="Make sure you understand this before moving on."
  onTrigger={handleTrigger}
>
  <KeyConceptSection />
</AgnesTriggerPoint>
```

### Step 3: Configure Behavior

Customize when Agnes appears:

```tsx
<AgnesScrollTrigger
  // Idle trigger: Show after 15 seconds of no activity
  enableIdleTrigger={true}
  idleTimeMs={15000}

  // Percentage triggers: Show at specific scroll depths
  enablePercentageTrigger={true}
  percentageTriggers={[
    { percentage: 25, message: "Quarter way through!" },
    { percentage: 50, message: "Halfway there!" },
    { percentage: 75, message: "Almost done!" }
  ]}

  // Custom action handler
  onActionClick={(triggerId) => {
    console.log('User clicked action for:', triggerId);
  }}
/>
```

---

## Best Practices

### When to Show Agnes

**DO show Agnes:**
- At lesson introductions
- Before complex or critical sections
- When user seems stuck (idle)
- After completing major sections
- At decision points (quiz, next module)

**DON'T show Agnes:**
- During video playback
- In rapid succession (space them out)
- During interactive exercises
- While user is actively typing

### Message Guidelines

**Good Messages:**
- "Welcome to this module! I'm here to help."
- "This is a critical safety section - pay close attention!"
- "Great progress! You're halfway through."
- "I notice you've been here a while - need help?"

**Poor Messages:**
- "Click here!" (too vague)
- "You must read this carefully" (too commanding)
- "Error: Invalid response" (too technical)

### Tips Guidelines

**Good Tips:**
- "Take your time - there's no rush!"
- "Try the VR demo to see this in action."
- "This concept appears in Module 5 too."

**Poor Tips:**
- "Read faster" (discouraging)
- "You should already know this" (discouraging)
- Long paragraphs (keep tips concise)

---

## Trigger Strategies

### 1. Progressive Disclosure

Show Agnes at key milestones:
```tsx
percentageTriggers={[
  {
    percentage: 0,
    message: "Let's get started!"
  },
  {
    percentage: 33,
    message: "You're doing great!"
  },
  {
    percentage: 66,
    message: "Keep going!"
  },
  {
    percentage: 100,
    message: "Congratulations!"
  }
]}
```

### 2. Contextual Assistance

Show Agnes near difficult content:
```tsx
<AgnesTriggerPoint
  triggerId="complex-calculation"
  message="This calculation can be tricky. Let me help!"
  tip="Break it down step by step."
  suggestedAction="See Example"
  onTrigger={handleTrigger}
>
  <ComplexCalculationSection />
</AgnesTriggerPoint>
```

### 3. Safety Emphasis

Always show Agnes for safety content:
```tsx
<AgnesTriggerPoint
  triggerId="safety-warning"
  message="⚠️ CRITICAL SAFETY INFORMATION"
  tip="Never skip safety protocols - your life depends on it."
  suggestedAction="Review Safety Video"
  threshold={0.8} // Higher threshold = more visible
  onTrigger={handleTrigger}
>
  <SafetyWarningSection />
</AgnesTriggerPoint>
```

### 4. Idle Intervention

Help users who seem stuck:
```tsx
<AgnesScrollTrigger
  enableIdleTrigger={true}
  idleTimeMs={10000} // 10 seconds
  onChatOpen={openChat}
/>
```

---

## Customization

### Change Agnes Appearance

Edit `AgnesAvatar.tsx` SVG section:
```tsx
// Hair color
<path fill="#92400E" ... /> // Change to different brown shade

// Skin tone
<circle fill="#FED7AA" ... /> // Adjust skin color

// Polo color
<rect fill="#1F2937" ... /> // Change shirt color
```

### Change Position

```tsx
<AgnesAvatar
  position="bottom-left"  // or top-right, top-left
  variant="compact"       // or full, mini
/>
```

### Custom Animation

Modify `containerVariants` in AgnesAvatar:
```tsx
const containerVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', bounce: 0.4 }
  }
};
```

---

## Performance Considerations

### Optimization Tips

1. **Lazy Load Agnes Chat:**
```tsx
const AgnesChat = lazy(() => import('./components/AgnesChat'));
```

2. **Limit Trigger Points:**
- Maximum 5-7 trigger points per lesson
- Space them at least 300px apart

3. **Throttle Scroll Events:**
Already implemented in hooks with `passive: true`

4. **Memory Management:**
- Dismissed triggers stored in component state
- Clear on unmount to prevent memory leaks

---

## Testing

### Manual Testing Checklist

- [ ] Agnes appears at intro section
- [ ] Agnes appears when scrolling to 25%, 50%, 75%
- [ ] Agnes appears after 10 seconds of idle time
- [ ] Close button works and dismisses Agnes
- [ ] Chat button opens full chat interface
- [ ] Action buttons trigger correct handlers
- [ ] Agnes doesn't appear multiple times for same trigger
- [ ] Position variants work (all 4 corners)
- [ ] Size variants work (full, compact, mini)
- [ ] Messages display correctly
- [ ] Tips display when provided
- [ ] Responsive on mobile devices

### Automated Testing

```tsx
import { render, screen } from '@testing-library/react';
import AgnesAvatar from './AgnesAvatar';

test('renders Agnes avatar when visible', () => {
  render(<AgnesAvatar isVisible={true} message="Test message" />);
  expect(screen.getByText('Test message')).toBeInTheDocument();
});
```

---

## Troubleshooting

### Agnes Doesn't Appear

**Check:**
1. `isVisible` prop is true
2. Element has entered viewport (check threshold)
3. Trigger hasn't been dismissed
4. No CSS z-index conflicts

### Agnes Appears Too Often

**Solution:**
- Increase `idleTimeMs` (default: 10000)
- Set `triggerOnce: true` on trigger points
- Implement dismissal memory

### Scroll Detection Not Working

**Check:**
1. Element has `ref` attached
2. IntersectionObserver is supported
3. Threshold is appropriate (0.5 = 50% visible)
4. No parent with `overflow: hidden`

### Performance Issues

**Solutions:**
1. Reduce trigger points
2. Increase threshold (less sensitive)
3. Use `once: true` for triggers
4. Lazy load Agnes components

---

## Future Enhancements

### Planned Features

1. **Voice Interaction:**
   - Text-to-speech for Agnes messages
   - Voice commands to summon Agnes

2. **Gesture Recognition:**
   - Show Agnes on shake gesture
   - Dismiss with swipe

3. **Advanced AI:**
   - Context-aware messages
   - Learning pattern analysis
   - Personalized recommendations

4. **Visual Improvements:**
   - Animated expressions
   - Lip sync with TTS
   - More diverse avatars

5. **Analytics:**
   - Track trigger effectiveness
   - User engagement metrics
   - A/B testing support

---

## Support

For issues or questions:
1. Check this documentation
2. Review example implementations
3. Check console for errors
4. Contact development team

---

## Version History

### v1.0.0 (Current)
- Initial implementation
- Scroll-triggered appearances
- Idle detection
- Three variants (full, compact, mini)
- Custom trigger points
- Percentage-based triggers

---

## Credits

**Design:** Roof ER Training Team
**Development:** AI-Assisted Implementation
**Character Design:** SVG-based professional instructor
**Animation:** Framer Motion

---

**Last Updated:** January 2025
