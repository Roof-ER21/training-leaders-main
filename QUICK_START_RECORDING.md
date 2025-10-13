# Sales Pitch Recording - Quick Start Guide

## For Trainees

### How to Record Your Sales Pitch

1. **Navigate to Training Module**
   - Open any sales training module
   - Click on "Practice Scenarios" tab

2. **Start Recording**
   - Click "Start Recording" button (purple button at top)
   - Choose recording mode:
     - **Audio Only**: Voice recording (smaller file)
     - **Video & Audio**: Full presentation with video
   - Allow browser to access your microphone/camera

3. **Record Your Pitch**
   - Practice as if talking to a real customer
   - Maximum 5 minutes
   - Use pause/resume if needed
   - Watch the timer

4. **Review & Submit**
   - Click "Stop" when done
   - Play back to review
   - If not satisfied, click "Re-record"
   - When ready, click "Submit"
   - Or "Download" to save locally

### Tips for Great Recordings
- Find a quiet location
- Speak clearly and confidently
- Include key points from the module
- Show enthusiasm and professionalism
- Review before submitting

---

## For Managers/Admins

### How to Review Recordings

1. **Access Admin Dashboard**
   - Navigate to `/admin/recordings` (route to be configured)
   - Or import RecordingManagement component

2. **View Submissions**
   - See all recordings in left panel
   - Filter by status: Pending, Reviewed, Approved
   - Search by name, email, or module

3. **Review a Recording**
   - Click on a recording to view details
   - Click "Play Recording" to listen/watch
   - Review submission information

4. **Provide Feedback**
   - Click "Provide Feedback" button
   - Write constructive feedback
   - Click "Send Feedback" (emails trainee automatically)

5. **Take Action**
   - **Approve**: Mark as approved
   - **Download**: Save locally for records
   - **Delete**: Remove recording permanently

### Admin Tools
- **Storage Stats**: Monitor total recordings and storage
- **Cleanup Old**: Delete recordings older than 30 days
- **Status Filters**: View by pending, reviewed, approved
- **Search**: Find specific trainee recordings

---

## Browser Storage Locations

### Where Recordings Are Stored
All recordings are temporarily stored in browser localStorage:

**Chrome/Edge:**
1. F12 (DevTools)
2. Application Tab
3. Storage → Local Storage
4. Look for keys starting with `roofer_recording_`

**Firefox:**
1. F12 (DevTools)
2. Storage Tab
3. Local Storage
4. Find `roofer_recording_` entries

**Safari:**
1. Develop → Show Web Inspector
2. Storage Tab
3. Local Storage

### Viewing Stored Recordings
```javascript
// In browser console:
localStorage.getItem('roofer_meta_[id]') // View metadata
localStorage.getItem('roofer_recording_[id]') // Full recording
```

---

## Troubleshooting

### "Could not access camera/microphone"
**Solution:**
1. Check browser permissions
2. Ensure HTTPS or localhost
3. Try different browser
4. Check camera/mic is not in use

### "Storage limit reached"
**Solution:**
1. Admin: Run "Cleanup Old" function
2. Delete old recordings
3. Switch to cloud storage (Firebase)

### Recording won't play
**Solution:**
1. Check file format (WebM)
2. Try downloading and playing locally
3. Use Chrome or Firefox

### Submission failed
**Solution:**
1. Check internet connection
2. Verify email configuration
3. Check browser console for errors

---

## Technical Details

### File Formats
- **Audio**: WebM with Opus codec
- **Video**: WebM with VP8/VP9 codec

### Storage Limits
- **localStorage**: ~10MB per domain
- **Max recording**: 5 minutes
- **Recommended**: Use cloud storage for production

### Browser Support
- ✅ Chrome 49+
- ✅ Firefox 25+
- ✅ Edge 79+
- ✅ Safari 14.1+
- ✅ Mobile browsers

### Security
- HTTPS required (except localhost)
- User permissions required
- Admin-only access to recordings
- Auto-cleanup after 30 days

---

## Configuration

### Environment Variables (.env)
```env
# EmailJS (Optional)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# Admin Contacts
REACT_APP_ADMIN_EMAIL=admin@company.com
REACT_APP_MANAGER_EMAIL=manager@company.com
```

### User Information
Update in component:
```typescript
<SalesPitchRecorder
  userName="John Doe"        // From auth system
  userEmail="john@email.com" // From auth system
  ...
/>
```

---

## Integration Points

### Add to Your Own Component
```typescript
import SalesPitchRecorder from './components/SalesPitchRecorder';

function YourComponent() {
  const [showRecorder, setShowRecorder] = useState(false);

  return (
    <>
      <button onClick={() => setShowRecorder(true)}>
        Record Pitch
      </button>

      {showRecorder && (
        <SalesPitchRecorder
          isOpen={showRecorder}
          onClose={() => setShowRecorder(false)}
          moduleName="Your Module"
          moduleId="module-123"
          userName="User Name"
          userEmail="user@email.com"
        />
      )}
    </>
  );
}
```

### Add Admin Dashboard
```typescript
import RecordingManagement from './components/Admin/RecordingManagement';

function AdminPage() {
  return <RecordingManagement isAdmin={true} />;
}
```

---

## Support & Help

### Getting Help
1. Check SALES_PITCH_RECORDER_SETUP.md for detailed docs
2. Review browser console for errors
3. Test in different browser
4. Check storage quota

### Common Issues
- Microphone not working → Check permissions
- Video not capturing → Allow camera access
- Can't submit → Check email configuration
- Storage full → Run cleanup or delete old recordings

### Best Practices
- Test recording feature before roll-out
- Train managers on review process
- Set up email notifications
- Schedule regular storage cleanup
- Monitor storage usage
- Back up important recordings

---

## Next Steps

### For Development
1. Configure environment variables
2. Test recording in all browsers
3. Set up email service
4. Add authentication
5. Create admin route

### For Production
1. Enable HTTPS
2. Set up Firebase Storage
3. Configure automated backups
4. Set up monitoring
5. Train staff on features

---

**Version:** 1.0.0
**Last Updated:** October 2025
**Support:** Check documentation or browser console
