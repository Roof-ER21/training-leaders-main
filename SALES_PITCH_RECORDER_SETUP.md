# Sales Pitch Recording Feature - Setup & Documentation

## Overview
This feature allows trainees to record and submit audio/video sales pitches for manager review. The system uses browser-based recording with local storage and email notifications.

## Files Created

### 1. Components
- **`/src/components/SalesPitchRecorder.tsx`** - Main recording component with audio/video capture
- **`/src/components/SalesTrainingModules.tsx`** - Updated to include recorder integration

### 2. Services
- **`/src/services/recordingStorage.ts`** - Browser storage management for recordings
- **`/src/services/emailSubmission.ts`** - Email service for submission notifications

## Features Implemented

### Recording Component (`SalesPitchRecorder.tsx`)
- ✅ Audio and video recording modes
- ✅ Browser MediaRecorder API integration
- ✅ Practice mode with playback
- ✅ 5-minute maximum recording time
- ✅ Recording timer display
- ✅ Pause/resume functionality
- ✅ Re-record capability
- ✅ Download recordings locally
- ✅ Submit recordings for review
- ✅ Mobile-friendly responsive UI

### Storage Service (`recordingStorage.ts`)
- ✅ Browser localStorage for temporary storage
- ✅ Metadata tracking (user, module, timestamp, status)
- ✅ Recording compression (base64 encoding)
- ✅ Auto-cleanup after 30 days
- ✅ Storage quota management (50MB limit)
- ✅ Retrieval by status/user
- ✅ Storage statistics

### Email Service (`emailSubmission.ts`)
- ✅ Notification system for new submissions
- ✅ EmailJS integration (optional)
- ✅ Admin notification queue
- ✅ Feedback email capability
- ✅ Submission tracking

## Setup Instructions

### Option 1: Use Current Setup (No Backend Required)
The system currently works with browser storage and simulated email submissions.

**To test:**
1. Navigate to any training module
2. Go to "Practice Scenarios" section
3. Click "Start Recording" button
4. Choose audio or video mode
5. Record your pitch
6. Submit for review

**Recordings are stored in:**
- Browser localStorage
- Accessible via browser DevTools → Application → Local Storage

### Option 2: Add EmailJS Integration (Recommended for Production)

**Step 1: Create EmailJS Account**
1. Go to https://www.emailjs.com/
2. Sign up for free account
3. Create an email service (Gmail, Outlook, etc.)
4. Create email template for submissions

**Step 2: Configure Environment Variables**
Create a `.env` file in project root:

```env
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# Admin Emails
REACT_APP_ADMIN_EMAIL=admin@yourcompany.com
REACT_APP_MANAGER_EMAIL=manager@yourcompany.com
```

**Step 3: Enable EmailJS in Code**
In `/src/services/emailSubmission.ts`, uncomment the EmailJS code blocks (lines marked with `// UNCOMMENT THIS FOR ACTUAL EMAILJS INTEGRATION`)

**Email Template Variables:**
```
{{user_name}} - Trainee name
{{user_email}} - Trainee email
{{module_name}} - Training module name
{{module_id}} - Module ID
{{recording_type}} - audio or video
{{duration}} - Recording length
{{submission_date}} - When submitted
{{recording_id}} - Unique ID
{{review_link}} - Link to review
```

### Option 3: Use Firebase Cloud Storage (Enterprise Solution)

**Step 1: Install Firebase**
```bash
npm install firebase
```

**Step 2: Firebase Configuration**
Create `/src/services/firebaseConfig.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
```

**Step 3: Upload Function**
```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

async function uploadRecording(blob: Blob, recordingId: string) {
  const storageRef = ref(storage, `recordings/${recordingId}.webm`);
  await uploadBytes(storageRef, blob);
  const url = await getDownloadURL(storageRef);
  return url;
}
```

## Testing the Feature

### Test Scenario 1: Audio Recording
1. Open training module
2. Navigate to "Practice Scenarios"
3. Click "Start Recording"
4. Select "Audio Only"
5. Click "Start Recording" button
6. Speak for 30 seconds
7. Click "Stop"
8. Click "Play Recording" to preview
9. Click "Submit"

**Expected Result:**
- Recording saved to localStorage
- Success message displayed
- Notification created in admin queue

### Test Scenario 2: Video Recording
1. Follow steps above but select "Video & Audio"
2. Camera preview should appear
3. Record video pitch
4. Preview before submitting

**Expected Result:**
- Video recording captured
- Can playback video
- File size shown
- Submission successful

### Test Scenario 3: Re-record
1. Start recording
2. Stop after a few seconds
3. Click "Re-record"
4. Record again
5. Submit

**Expected Result:**
- Previous recording discarded
- New recording created
- Can submit successfully

### Test Scenario 4: Download
1. Record a pitch
2. Click "Download" button

**Expected Result:**
- File downloads as .webm
- Can play locally

## Admin Dashboard (To Be Implemented)

Create `/src/components/Admin/RecordingManagement.tsx` for managers to:
- View all submitted recordings
- Filter by status (pending, reviewed, approved)
- Play recordings
- Provide feedback
- Mark as reviewed/approved

**Basic structure:**
```typescript
import { recordingStorage } from '../../services/recordingStorage';
import { emailSubmissionService } from '../../services/emailSubmission';

function RecordingManagement() {
  const recordings = recordingStorage.getAllRecordingMetadata();
  const pending = recordings.filter(r => r.status === 'pending');

  // Display list, allow playback and feedback
}
```

## Browser Compatibility

**Supported:**
- ✅ Chrome 49+
- ✅ Firefox 25+
- ✅ Edge 79+
- ✅ Safari 14.1+
- ✅ Mobile Chrome/Safari

**Required Permissions:**
- Microphone access (audio recording)
- Camera access (video recording)

## Storage Limitations

### localStorage
- Max: ~10MB per domain (varies by browser)
- Solution: Compress recordings or use cloud storage

### Recommended Limits
- Audio: 1-2MB per minute
- Video: 5-10MB per minute
- Max recording: 5 minutes

## Security Considerations

1. **HTTPS Required** - MediaRecorder API requires secure context
2. **User Permissions** - Must request camera/mic access
3. **Data Privacy** - Recordings contain personal data
4. **Access Control** - Only managers should access recordings
5. **Storage Cleanup** - Auto-delete old recordings

## Troubleshooting

### Issue: "Could not access camera/microphone"
**Solution:**
- Check browser permissions
- Ensure HTTPS (localhost is OK for dev)
- Check browser console for errors

### Issue: "Storage limit reached"
**Solution:**
```typescript
recordingStorage.deleteOldRecordings(30); // Delete 30+ day old
```

### Issue: Recording not saving
**Solution:**
- Check localStorage quota
- Check browser console
- Try smaller recording time

### Issue: Email not sending
**Solution:**
- Verify EmailJS configuration
- Check environment variables
- Review EmailJS dashboard for errors

## Future Enhancements

### Phase 2
- [ ] Firebase Storage integration
- [ ] Real-time admin notifications
- [ ] Video compression before upload
- [ ] Speech-to-text transcript
- [ ] AI-powered feedback

### Phase 3
- [ ] Recording analytics
- [ ] Peer review system
- [ ] Best practices library from top recordings
- [ ] Integration with LMS/HR systems

## API Reference

### RecordingStorage Service

```typescript
// Save recording
recordingStorage.saveRecording(blob, metadata);

// Get recordings
const all = recordingStorage.getAllRecordingMetadata();
const pending = recordingStorage.getRecordingsByStatus('pending');
const userRecordings = recordingStorage.getRecordingsByUser('John Doe');

// Update status
recordingStorage.updateRecordingMetadata(id, {
  status: 'reviewed',
  feedback: 'Great job!'
});

// Delete
recordingStorage.deleteRecording(id);

// Cleanup
recordingStorage.deleteOldRecordings(30);

// Statistics
const stats = recordingStorage.getStorageStats();
```

### Email Submission Service

```typescript
// Send submission notification
await emailSubmissionService.sendSubmissionEmail({
  userName: 'John Doe',
  userEmail: 'john@example.com',
  moduleName: 'Door-to-Door Sales',
  moduleId: 'module-1',
  recordingType: 'audio',
  duration: 180,
  timestamp: new Date().toISOString(),
  recordingId: 'rec_123'
});

// Send feedback
await emailSubmissionService.sendFeedbackEmail(
  'john@example.com',
  'John Doe',
  'Door-to-Door Sales',
  'Excellent work! Keep practicing objection handling.',
  'approved'
);

// Get notifications
const notifications = emailSubmissionService.getAdminNotifications();
```

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all dependencies installed
3. Review this documentation
4. Check localStorage for stored recordings
5. Test in different browser

## Production Checklist

Before deploying to production:

- [ ] Environment variables configured
- [ ] EmailJS or email service set up
- [ ] Admin dashboard implemented
- [ ] User authentication integrated
- [ ] HTTPS enabled
- [ ] Storage cleanup scheduled
- [ ] Error tracking implemented
- [ ] User permissions tested
- [ ] Mobile testing completed
- [ ] Admin training provided

---

## Quick Start Commands

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Integration Points

The recorder is integrated into:
1. **SalesTrainingModules** component - Practice Scenarios section
2. Appears in all training modules
3. Accessible from module navigation

To add to other locations:
```typescript
import SalesPitchRecorder from './components/SalesPitchRecorder';

<SalesPitchRecorder
  isOpen={showRecorder}
  onClose={() => setShowRecorder(false)}
  moduleName="Module Name"
  moduleId="module-id"
  userName="User Name"
  userEmail="user@email.com"
/>
```

---

**Last Updated:** October 2025
**Version:** 1.0.0
**Author:** AI Development Team
