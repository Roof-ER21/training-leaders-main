# Quick Start: Admin System

## 3-Minute Setup

### 1. Start the App
```bash
npm start
```

### 2. Open in Browser
Navigate to `http://localhost:3000`

### 3. Make Yourself Admin
Open browser console (F12) and run:
```javascript
adminSetup.createMockAdmin('admin@roofer.com')
```
Page will refresh automatically.

### 4. Access Admin Dashboard
Visit: `http://localhost:3000/admin`

## That's It!

You now have full admin access.

---

## What You Can Do

### Admin Dashboard Features
- **Monitor all users** - See everyone's progress in real-time
- **Export to CSV** - Download progress reports
- **Make users admin** - Upgrade other users
- **Auto-refresh** - Real-time updates every 30 seconds
- **Search users** - Filter by name or email

### Team Management
- **Send invitations** - Invite team members by email
- **Generate invite codes** - Create shareable join codes
- **Track invitations** - See pending/accepted/expired invites

### Time Tracking
- **Automatic tracking** - All training sessions are tracked
- **Per-module data** - See time spent on each module
- **Activity tracking** - Individual activity completion times
- **Progress monitoring** - Real-time progress updates

---

## Quick Commands

### In Browser Console

```javascript
// Make current user admin
adminSetup.makeCurrentUserAdmin()

// Create new admin
adminSetup.createMockAdmin('newemail@example.com')

// Check admin status
adminSetup.checkAdminStatus()

// Generate sample data for testing
adminSetup.generateSampleData()
```

---

## Routes

- **Homepage:** `/`
- **Training:** `/` (navigate via UI)
- **User Dashboard:** Navigate via UI → Dashboard
- **Admin Dashboard:** `/admin` (admin only)
- **Profile:** Navigate via UI → Profile

---

## Next Steps

1. Read [ADMIN_SYSTEM_GUIDE.md](./ADMIN_SYSTEM_GUIDE.md) for full documentation
2. Explore the admin dashboard
3. Generate sample data for testing
4. Set up Firebase for production (optional)

---

## Troubleshooting

**Problem:** Can't access `/admin`
**Solution:** Run `adminSetup.checkAdminStatus()` to verify you're admin

**Problem:** No users showing up
**Solution:** Run `adminSetup.generateSampleData()` to create test data

**Problem:** Lost admin access
**Solution:** Run `adminSetup.makeCurrentUserAdmin()` again

---

## File Overview

```
Key Files:
- /src/components/AdminDashboard.tsx - Main admin UI
- /src/services/authService.ts - User authentication
- /src/services/trainingService.ts - Time tracking
- /src/services/teamService.ts - Team invitations
- /src/utils/adminSetup.ts - Setup utilities
```

---

## Support

Full documentation: [ADMIN_SYSTEM_GUIDE.md](./ADMIN_SYSTEM_GUIDE.md)

Built with ❤️ for RoofER Training Academy
