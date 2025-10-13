# Agnes Quick Start Guide

Get Agnes up and running in your Training Leaders app in 5 minutes!

## 1. Files Created

New files added to your project:

```
src/
├── components/
│   ├── AgnesAvatar.tsx           ✅ Visual avatar component
│   ├── AgnesScrollTrigger.tsx    ✅ Scroll detection system
│   ├── LessonWithAgnes.tsx       ✅ Integration example
│   └── AgnesDemo.tsx             ✅ Demo/testing page
├── hooks/
│   └── useScrollTrigger.ts       ✅ Custom scroll hooks
└── docs/
    ├── AGNES_IMPLEMENTATION.md   ✅ Full documentation
    └── AGNES_QUICK_START.md      ✅ This file
```

## 2. Test the Demo

View Agnes in action:

```tsx
// Add to your routing or navigation
import AgnesDemo from './components/AgnesDemo';

// In your App or Router:
<AgnesDemo />
```

## 3. Add to Existing Lessons

### Option A: Full Integration (Recommended)

```tsx
import AgnesScrollTrigger from './components/AgnesScrollTrigger';
import AgnesChat from './components/AgnesChat';

function MyLesson() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      {/* Your lesson content here */}
      <YourLessonContent />

      {/* Add Agnes scroll trigger */}
      <AgnesScrollTrigger
        onChatOpen={() => setShowChat(true)}
        enableIdleTrigger={true}
        enablePercentageTrigger={true}
      />

      {/* Agnes chat modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <AgnesChat
            currentModule="your-module"
            currentLesson="Your Lesson"
            onModuleRecommendation={handleRec}
          />
        </div>
      )}
    </div>
  );
}
```

### Option B: Simple Avatar Only

```tsx
import AgnesAvatar from './components/AgnesAvatar';

function SimpleLesson() {
  const [showAgnes, setShowAgnes] = useState(true);

  return (
    <div>
      <YourContent />

      <AgnesAvatar
        isVisible={showAgnes}
        message="Need help with this section?"
        onChatClick={() => console.log('Open chat')}
        onClose={() => setShowAgnes(false)}
      />
    </div>
  );
}
```

### Option C: Mark Specific Trigger Points

```tsx
import { AgnesTriggerPoint } from './components/AgnesScrollTrigger';

function DetailedLesson() {
  return (
    <div>
      <AgnesTriggerPoint
        triggerId="intro"
        message="Welcome to this lesson!"
        tip="Take your time learning this material."
        onTrigger={(trigger) => console.log('Triggered:', trigger)}
      >
        <IntroSection />
      </AgnesTriggerPoint>

      <AgnesTriggerPoint
        triggerId="safety"
        message="⚠️ Important safety information!"
        tip="Never skip safety protocols."
        onTrigger={(trigger) => console.log('Triggered:', trigger)}
      >
        <SafetySection />
      </AgnesTriggerPoint>
    </div>
  );
}
```

## 4. Customize Agnes Appearance

### Change Position

```tsx
<AgnesAvatar
  position="bottom-left"  // or top-right, top-left, bottom-right
  variant="full"          // or compact, mini
/>
```

### Change Messages

```tsx
<AgnesScrollTrigger
  percentageTriggers={[
    { percentage: 25, message: "Quarter way through!" },
    { percentage: 50, message: "You're halfway!" },
    { percentage: 75, message: "Almost done!" }
  ]}
/>
```

### Change Behavior

```tsx
<AgnesScrollTrigger
  enableIdleTrigger={true}
  idleTimeMs={15000}           // Show after 15 seconds idle
  enablePercentageTrigger={true}
/>
```

## 5. Common Patterns

### Pattern 1: Welcome Message

```tsx
<AgnesAvatar
  isVisible={true}
  message="Welcome! I'm Agnes, your roofing instructor."
  tip="Click 'Chat with Agnes' anytime you need help."
  suggestedAction="Start Learning"
  onChatClick={openChat}
  position="bottom-right"
  variant="full"
/>
```

### Pattern 2: Help When Stuck

```tsx
<AgnesScrollTrigger
  enableIdleTrigger={true}
  idleTimeMs={10000}  // After 10 seconds of no activity
  onChatOpen={openChat}
/>
```

### Pattern 3: Progress Encouragement

```tsx
<AgnesScrollTrigger
  percentageTriggers={[
    { percentage: 50, message: "Halfway done! Great progress!" }
  ]}
/>
```

### Pattern 4: Critical Sections

```tsx
<AgnesTriggerPoint
  triggerId="safety-warning"
  message="⚠️ CRITICAL SAFETY INFORMATION"
  tip="Read this carefully - your safety depends on it."
  threshold={0.8}  // Show when 80% visible
  onTrigger={handleTrigger}
>
  <CriticalSafetyContent />
</AgnesTriggerPoint>
```

## 6. Integration Checklist

- [ ] Import Agnes components
- [ ] Add scroll trigger to lesson
- [ ] Set up chat modal state
- [ ] Test on desktop
- [ ] Test on mobile
- [ ] Verify trigger points work
- [ ] Check idle detection
- [ ] Test close/dismiss functionality
- [ ] Verify chat integration
- [ ] Test percentage triggers

## 7. Troubleshooting

### Agnes doesn't appear
- Check `isVisible` prop is true
- Verify element is in viewport
- Check console for errors

### Multiple Agnes appear
- Each lesson should have ONE `<AgnesScrollTrigger>`
- Use trigger points to mark specific sections

### Performance issues
- Reduce number of trigger points (max 5-7 per lesson)
- Use `once: true` for one-time triggers

## 8. Next Steps

1. **View the demo:**
   ```bash
   npm start
   # Navigate to AgnesDemo component
   ```

2. **Read full docs:**
   - See `AGNES_IMPLEMENTATION.md` for complete guide

3. **Integrate into your lessons:**
   - Start with one lesson
   - Add trigger points at key sections
   - Test and refine

4. **Customize:**
   - Adjust messages for your content
   - Fine-tune trigger timings
   - Modify appearance if needed

## 9. Quick Reference

### Props Quick Reference

**AgnesAvatar:**
```tsx
isVisible: boolean
message?: string
tip?: string
suggestedAction?: string
onClose?: () => void
onChatClick?: () => void
onActionClick?: () => void
position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
variant?: 'full' | 'compact' | 'mini'
```

**AgnesScrollTrigger:**
```tsx
onChatOpen?: () => void
onActionClick?: (id: string) => void
enableIdleTrigger?: boolean
idleTimeMs?: number
enablePercentageTrigger?: boolean
percentageTriggers?: Array<{percentage, message, tip?}>
```

**AgnesTriggerPoint:**
```tsx
triggerId: string
message: string
tip?: string
suggestedAction?: string
onTrigger: (trigger) => void
threshold?: number  // 0-1, default 0.3
children: ReactNode
```

## 10. Support

Questions? Check:
1. `AGNES_IMPLEMENTATION.md` - Full documentation
2. `AgnesDemo.tsx` - Working examples
3. `LessonWithAgnes.tsx` - Integration pattern
4. Console logs for errors

---

**You're ready to use Agnes! 🎉**

Start with the demo, then integrate into one lesson at a time.

Remember: Agnes is here to help your learners succeed!
