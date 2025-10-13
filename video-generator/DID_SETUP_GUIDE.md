# 🎬 D-ID Setup Guide - Create Your Training Videos!

## 🚀 Quick Start (10 minutes)

### Step 1: Sign Up for D-ID (3 minutes)

1. Go to **https://www.d-id.com/**
2. Click **"Start Free"** or **"Get Started"**
3. Sign up with email or Google
4. Verify your email

### Step 2: Choose Your Plan (1 minute)

**Option A: Free Trial** (Best for testing)
- 20 videos (5 minutes total)
- Free forever
- Perfect for testing 5-6 videos

**Option B: Creator Plan** (Best for all 36 videos)
- $49/month
- Unlimited videos
- 15 minutes per video
- Can cancel after 1 month
- **Recommended for generating all 36 videos at once**

**Option C: Pay Per Video**
- $0.30 per video
- No subscription
- 36 videos × $0.30 = $10.80 total
- **Good if you want to generate slowly over time**

### Step 3: Get Your API Key (2 minutes)

1. Log into D-ID dashboard
2. Go to **Settings** or **API Keys**
3. Click **"Create API Key"** or **"Generate Key"**
4. Copy the key (looks like: `Basic abc123...`)
5. Save it somewhere safe

### Step 4: Add API Key to Service (1 minute)

Open terminal and run:
```bash
cd "/Users/a21/Desktop/Training Leaders Main/video-generator"
nano .env
```

Add your D-ID key:
```bash
# D-ID API Key
DID_API_KEY=Basic_your_actual_key_here
```

Save and exit (Ctrl+X, then Y, then Enter)

### Step 5: Test Video Generation (3 minutes)

```bash
# Start the service
npm start
```

In another terminal:
```bash
# Test video creation
curl -X POST http://localhost:3003/api/video/create \
  -H "Content-Type: application/json" \
  -d '{
    "script": "Welcome to Training Leaders. This is a test video to verify D-ID integration is working correctly.",
    "presenterId": "amy-jcwCkr1grs",
    "voiceId": "en-US-JennyNeural"
  }'
```

You should get a response like:
```json
{
  "success": true,
  "id": "tlk-abc123",
  "status": "created",
  "result_url": null
}
```

Copy the `id` and check status:
```bash
curl http://localhost:3003/api/video/status/tlk-abc123
```

After 2-5 minutes, status will be `"done"` and you'll get a `result_url` to download the video!

---

## 🎨 Choosing Your Avatar

### Recommended Stock Avatars (No Photo Needed):

1. **amy-jcwCkr1grs** - Professional female (default)
   - Age: 30s
   - Style: Business professional
   - Best for: Professional training

2. **eric-jcwCke3grs** - Professional male
   - Age: 30s
   - Style: Business casual
   - Best for: Technical training

3. **sara-jcwCke4grs** - Friendly female
   - Age: 20s
   - Style: Casual professional
   - Best for: Engaging training

### Using Custom Avatar (Your Photo):

1. Take a clear photo:
   - Square format (1:1 ratio)
   - Face directly at camera
   - Good lighting
   - Plain background
   - No sunglasses

2. Upload to D-ID:
   - Go to D-ID dashboard
   - Upload image
   - Get image URL

3. Use in API:
   ```json
   {
     "script": "Your script here",
     "avatarUrl": "https://your-image-url.com/photo.jpg"
   }
   ```

---

## 🎤 Choosing Your Voice

### Recommended Voices:

**Professional Female**:
- `en-US-JennyNeural` - Professional, clear (RECOMMENDED)
- `en-US-AriaNeural` - Friendly, warm

**Professional Male**:
- `en-US-GuyNeural` - Professional, authoritative
- `en-US-DavisNeural` - Confident, engaging

**Casual/Friendly**:
- `en-US-SaraNeural` - Warm, approachable
- `en-US-JasonNeural` - Casual, friendly

### Get Full Voice List:
```bash
curl http://localhost:3003/api/did/voices
```

---

## 🎬 Generate All 36 Videos

### Option 1: Use D-ID Web Interface (Easiest)

1. Go to https://studio.d-id.com/
2. Click **"Create Video"**
3. Open `/Users/a21/Desktop/Training Leaders Main/video-generator/scripts/module1_scripts.json`
4. Copy the `intro` script
5. Paste into D-ID script box
6. Choose avatar: **amy-jcwCkr1grs**
7. Choose voice: **en-US-JennyNeural**
8. Click **"Generate"**
9. Wait 2-5 minutes
10. Download video as `module1_intro.mp4`
11. Repeat for all 36 scripts

**Time**: 2-4 hours (includes waiting for generation)

### Option 2: Use API (Automated)

Create a batch generation script:

```bash
cd "/Users/a21/Desktop/Training Leaders Main/video-generator"
node src/batch_generate_videos.js
```

This will:
1. Read all scripts from `scripts/` folder
2. Call D-ID API to generate each video
3. Wait for completion
4. Download videos automatically
5. Save to `videos/` folder

**Time**: 2-3 hours (mostly automated)

---

## 📥 Download and Organize Videos

### Create Videos Folder:
```bash
mkdir -p "/Users/a21/Desktop/Training Leaders Main/public/videos"
```

### File Naming Convention:
```
module1_intro.mp4           - Module 1 intro
module1_concept1.mp4        - Module 1 first concept
module1_concept2.mp4        - Module 1 second concept
module1_summary.mp4         - Module 1 summary

module2_intro.mp4
module2_concept1.mp4
module2_concept2.mp4
module2_summary.mp4

... (repeat for modules 3-9)
```

### Download from D-ID:

**From Web Interface**:
1. Click download button on each video
2. Save to Downloads folder
3. Rename according to convention above
4. Move to `public/videos/` folder

**From API**:
```bash
# Get video URL
curl http://localhost:3003/api/video/status/tlk-abc123

# Download with curl
curl -o module1_intro.mp4 "https://d-id-result-url.com/video.mp4"
```

---

## 🔍 Check Your D-ID Credits

```bash
curl http://localhost:3003/api/did/credits
```

Response:
```json
{
  "success": true,
  "credits": {
    "remaining": 15,
    "total": 20
  }
}
```

---

## 📊 Video Generation Tracking

Keep track of what you've generated:

```
Module 1: Roofing Fundamentals
  [✅] Intro (module1_intro.mp4)
  [✅] Concept 1: Roofing Materials (module1_concept1.mp4)
  [✅] Concept 2: Roof Anatomy (module1_concept2.mp4)
  [✅] Summary (module1_summary.mp4)

Module 2: Hail Damage Assessment
  [⏳] Intro (module2_intro.mp4)
  [⏳] Concept 1: Hail Damage Identification
  [⏳] Concept 2: Impact Assessment
  [⏳] Summary

Module 3-9: ...
```

---

## ⚠️ Common Issues & Solutions

### Issue: "Invalid API Key"
**Solution**: Make sure you copied the full key including `Basic ` prefix
```bash
# Correct format:
DID_API_KEY=Basic_abc123def456...

# Incorrect:
DID_API_KEY=abc123def456...
```

### Issue: "Insufficient Credits"
**Solution**:
- Upgrade to Creator plan, or
- Buy more credits, or
- Wait for next billing cycle (free tier)

### Issue: "Video Generation Failed"
**Solution**:
- Check script length (max 5000 characters)
- Verify avatar ID is correct
- Check voice ID is valid
- Review error message in response

### Issue: "Video Taking Too Long"
**Solution**:
- Videos typically take 2-5 minutes
- Check status with: `GET /api/video/status/:videoId`
- If stuck >10 minutes, regenerate

---

## 💡 Pro Tips

### Tip 1: Batch Generate During Trial
If using free trial (20 videos), prioritize:
1. All 9 module intros (most important)
2. Key concept explainers (hail damage, safety)
3. Module summaries if credits remain

### Tip 2: Use Same Avatar & Voice
Consistency is key! Use:
- Avatar: **amy-jcwCkr1grs**
- Voice: **en-US-JennyNeural**
- For all 36 videos

### Tip 3: Download Immediately
D-ID videos expire after 30 days. Download all videos as soon as they're generated.

### Tip 4: Test First
Generate 1-2 test videos before committing to all 36. Make sure:
- Audio quality is good
- Avatar looks professional
- Timing feels right
- Script flows naturally

### Tip 5: Schedule Generation Time
Generating 36 videos takes 2-4 hours. Schedule when you can:
- Monitor progress
- Download videos immediately
- Troubleshoot if needed

---

## 📞 Need Help?

### D-ID Support:
- **Documentation**: https://docs.d-id.com/
- **Support Email**: support@d-id.com
- **Community**: https://community.d-id.com/

### Check Service Health:
```bash
curl http://localhost:3003/health
```

### Test Without D-ID:
Script generation works without D-ID key:
```bash
curl -X POST http://localhost:3003/api/script/intro \
  -H "Content-Type: application/json" \
  -d '{
    "moduleNumber": 1,
    "moduleName": "Test Module",
    "learningObjectives": ["Learn this", "Learn that"]
  }'
```

---

## 🎬 You're Ready to Generate!

1. ✅ Sign up for D-ID
2. ✅ Get API key
3. ✅ Add to .env file
4. ✅ Test video generation
5. ✅ Generate all 36 videos
6. ✅ Download and organize
7. ✅ Integrate into Training Leaders

**Total time**: 10 minutes setup + 2-4 hours generation

**Total cost**: $49 one-time (or $10.80 pay-per-video)

🚀 **Let's transform Training Leaders with professional AI presenter videos!**
