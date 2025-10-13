# Admin System Setup & Usage Guide

## Overview

A comprehensive admin system has been implemented for the RoofER Training Academy with the following features:

- **User Authentication** with role-based access control (Admin vs Regular User)
- **Time Tracking System** for training sessions and activities
- **Admin Dashboard** for monitoring all users and their progress
- **Team Invitation System** with email notifications
- **CSV Export** functionality for reporting
- **Real-time Progress Tracking** with automatic updates

---

## File Structure

### New Files Created

```
src/
├── config/
│   └── firebase.ts                      # Firebase configuration
├── services/
│   ├── authService.ts                   # Authentication & user management
│   ├── trainingService.ts               # Training session tracking
│   └── teamService.ts                   # Team & invitation management
├── components/
│   ├── AdminDashboard.tsx               # Admin monitoring dashboard
│   ├── ProtectedRoute.tsx               # Route protection component
│   └── TeamInvitationPanel.tsx          # Team invitation UI
├── types/
│   └── user.ts                          # TypeScript types
└── utils/
    └── adminSetup.ts                    # Admin setup utilities
```

### Modified Files

- `src/components/RoofERMainApp.tsx` - Added admin route and service initialization
- `src/index.tsx` - Imported admin setup utilities
- `package.json` - Added Firebase dependency

---

## Setup Instructions

### Step 1: Firebase Configuration (Optional)

If you want to use Firebase for production:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication and Firestore
3. Copy your Firebase config
4. Create a `.env` file with:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

**Note:** The system works without Firebase using localStorage (perfect for development/demo).

### Step 2: Install Dependencies

```bash
npm install
```

Firebase is already added to dependencies.

### Step 3: Start the Application

```bash
npm start
```

---

## Creating the First Admin Account

### Method 1: Browser Console (Easiest)

1. Open the app in your browser
2. Open Developer Tools (F12)
3. Go to the Console tab
4. Run one of these commands:

```javascript
// Make current user an admin
adminSetup.makeCurrentUserAdmin()

// OR create a new mock admin
adminSetup.createMockAdmin('admin@roofer.com')

// Check current admin status
adminSetup.checkAdminStatus()
```

The page will automatically refresh and you'll have admin access.

### Method 2: Manual Setup

1. Open Developer Tools (F12)
2. Go to Application/Storage → Local Storage
3. Find the `mock_user` key
4. Edit the JSON and change `"role": "user"` to `"role": "admin"`
5. Refresh the page

---

## Accessing the Admin Dashboard

Once you have admin access:

1. Navigate to the app homepage
2. Type `/admin` in the URL bar after your domain:
   ```
   http://localhost:3000/admin
   ```
   OR
   ```
   https://yourdomain.com/admin
   ```

3. You can also update the Navigation component to add an "Admin" link for easy access.

---

## Admin Dashboard Features

### 1. User Overview

- Total users count
- Average completion percentage
- Total training hours
- Average performance scores
- Active users today

### 2. User Table

View detailed information for each user:
- Username and email
- Current module progress
- Completion percentage with visual progress bar
- Total time spent on training
- Average score with color coding (green/yellow/red)
- Last active timestamp
- Admin actions (make user admin)

### 3. Search & Filter

- Real-time search by username or email
- Results update as you type

### 4. Auto-Refresh

- Toggle auto-refresh to update data every 30 seconds
- Perfect for real-time monitoring

### 5. Export to CSV

- Export all user progress data to CSV
- Includes: username, email, completion %, time spent, scores, etc.
- Perfect for reports and analysis

---

## Time Tracking System

### How It Works

The system automatically tracks:

1. **Session Level:**
   - When a user starts a module
   - When they complete it
   - Total time spent
   - Final score

2. **Activity Level:**
   - Individual activity start/end times
   - Time spent per activity
   - Scores and attempts
   - Activity type

### Using the Time Tracker

In your training components, import and use:

```typescript
import trainingService from '../services/trainingService';

// Start a training session
await trainingService.startTrainingSession(
  userId,
  moduleId,
  'Module Name'
);

// Start an activity
trainingService.startActivity('activity-id', 'quiz');

// Complete the activity
await trainingService.completeActivity('activity-id', score, totalPoints);

// End the session
await trainingService.endTrainingSession(finalScore, true);
```

### Data Storage

- **With Firebase:** Stored in Firestore `trainingSessions` collection
- **Without Firebase:** Stored in localStorage with `session_` prefix
- All data persists across sessions

---

## Team Invitation System

### Creating a Team

```typescript
import teamService from '../services/teamService';

const team = await teamService.createTeam('My Team', adminUserId);
```

### Inviting Members

1. Use the `TeamInvitationPanel` component in your admin UI
2. Enter the email address
3. Click "Send Invitation"
4. System generates:
   - Unique 8-character invite code
   - Shareable invitation link
   - Email notification (mocked in dev)

### Invitation Features

- **Invite Codes:** 8-character codes (e.g., `ABC12345`)
- **Invite Links:** Direct join links (`https://yoursite.com/join/ABC12345`)
- **Expiration:** Invites expire after 7 days
- **Status Tracking:** Pending, Accepted, or Expired
- **Copy to Clipboard:** Quick copy for codes and links

### Accepting Invitations

Users can join by:
1. Using the invite code
2. Clicking the invite link
3. System automatically adds them to the team

---

## Email Notifications (Development Mode)

Currently, email notifications are mocked for development:

- Invitations are logged to console
- Notifications stored in localStorage
- Alert shows invitation details

### Viewing Mock Notifications

In browser console:
```javascript
teamService.getEmailNotifications()
```

### Production Setup

For production, you'll need to:
1. Set up a backend API for sending emails
2. Use services like SendGrid, AWS SES, or Firebase Cloud Functions
3. Update `teamService.sendInvitationEmail()` to call your API

---

## User Roles & Permissions

### Regular User
- Access training modules
- View personal dashboard
- Track own progress
- Cannot access admin features

### Admin User
- All regular user features
- Access admin dashboard (`/admin` route)
- View all users and their progress
- Manage user roles
- Invite team members
- Export data to CSV
- Real-time monitoring

---

## Integration with Existing Training System

### Analytics Integration

The time tracking system integrates with the existing analytics:

```typescript
import analytics from '../utils/analytics';
import trainingService from '../services/trainingService';

// Time tracking works alongside analytics
trainingService.startTrainingSession(userId, moduleId, moduleName);
analytics.trackEvent('session_start', { moduleId });
```

### Module Completion

Update your module completion logic:

```typescript
// When user completes a module
await trainingService.endTrainingSession(score, true);
analytics.trackModuleCompletion({
  moduleId,
  moduleName,
  score,
  completedAt: Date.now(),
});
```

---

## API Reference

### AuthService

```typescript
// Initialize
authService.initialize()

// Register user
await authService.registerUser(email, password, displayName, company)

// Sign in
await authService.signIn(email, password)

// Sign out
await authService.signOutUser()

// Get current user
const user = authService.getCurrentUser()

// Check if admin
const isAdmin = authService.isAdmin()

// Update user role (admin only)
await authService.updateUserRole(userId, 'admin')

// Get all users (admin only)
const users = await authService.getAllUsers()
```

### TrainingService

```typescript
// Start session
await trainingService.startTrainingSession(userId, moduleId, moduleName)

// End session
await trainingService.endTrainingSession(score, completed)

// Start activity
trainingService.startActivity(activityId, activityType)

// Complete activity
await trainingService.completeActivity(activityId, score, totalPoints)

// Get user progress
const progress = await trainingService.getUserProgress(userId, userName, email)

// Get all users progress (admin only)
const allProgress = await trainingService.getAllUsersProgress()

// Export to CSV
const csv = trainingService.exportProgressToCSV(progressList)
```

### TeamService

```typescript
// Create team
await teamService.createTeam(teamName, ownerId)

// Create invitation
const invite = await teamService.createInvitation(teamId, email)

// Send invitation email
await teamService.sendInvitationEmail(invitation)

// Accept invitation
await teamService.acceptInvitation(inviteCode, userId)

// Get team invitations
const invites = await teamService.getTeamInvitations(teamId)
```

---

## Troubleshooting

### "No users found" in Admin Dashboard

**Cause:** No training data exists yet

**Solution:**
```javascript
// Generate sample data
adminSetup.generateSampleData()
```

### Admin dashboard shows "Unauthorized"

**Cause:** User is not marked as admin

**Solution:**
```javascript
adminSetup.makeCurrentUserAdmin()
```

### Time tracking not working

**Cause:** Service not initialized

**Solution:** Ensure `authService.initialize()` is called in `RoofERMainApp.tsx` (already done)

### CSV export is empty

**Cause:** No filtered users to export

**Solution:** Clear the search filter or add training data

---

## Security Considerations

### Production Checklist

Before deploying to production:

1. **Enable Firebase Authentication**
   - Set up proper authentication rules
   - Configure authorized domains

2. **Firestore Security Rules**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read their own data
       match /users/{userId} {
         allow read: if request.auth.uid == userId;
         allow write: if request.auth.uid == userId;
       }

       // Only admins can read all users
       match /users/{userId} {
         allow read: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }

       // Training sessions
       match /trainingSessions/{sessionId} {
         allow read, write: if request.auth != null;
       }

       // Teams (admin only)
       match /teams/{teamId} {
         allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
       }
     }
   }
   ```

3. **Environment Variables**
   - Never commit `.env` files
   - Use environment variables for all sensitive data
   - Different configs for dev/staging/production

4. **API Rate Limiting**
   - Implement rate limiting for invitations
   - Prevent spam and abuse

5. **Email Verification**
   - Require email verification before granting access
   - Implement in Firebase Authentication

---

## Future Enhancements

Planned features for future releases:

- [ ] Real email sending with SendGrid/AWS SES
- [ ] Advanced analytics and charts
- [ ] User activity logs
- [ ] Bulk user import/export
- [ ] Custom roles and permissions
- [ ] Team management dashboard
- [ ] Automated reports and summaries
- [ ] Mobile app integration
- [ ] Slack/Discord notifications
- [ ] Certificate generation and tracking

---

## Support

For questions or issues:

1. Check this documentation
2. Review the code comments
3. Check browser console for errors
4. Use browser DevTools to inspect localStorage/state

---

## Summary

You now have a complete admin system with:

- ✅ User authentication with admin roles
- ✅ Time tracking for all training activities
- ✅ Admin dashboard with real-time monitoring
- ✅ Team invitation system
- ✅ CSV export functionality
- ✅ Route protection
- ✅ Mock mode for development (no Firebase required)
- ✅ Production-ready with Firebase support

**Access the admin dashboard at:** `/admin`

**Setup admin account:** `adminSetup.makeCurrentUserAdmin()` in console

**Generate test data:** `adminSetup.generateSampleData()` in console
