# 🎬 Training Leaders Video Generation Service

Professional AI presenter video generation for Training Leaders training modules using **Agnes (Groq)** for script generation and **D-ID** for video creation.

---

## 🌟 Features

### Script Generation (Agnes/Groq)
- **Module Intros** - Welcome students and overview learning objectives
- **Concept Explainers** - Explain complex roofing concepts clearly
- **Module Summaries** - Congratulate completion and recap key points
- **Custom Scripts** - Generate any training script on-demand

### Video Generation (D-ID)
- **AI Avatars** - Professional presenters from D-ID stock library
- **Custom Avatars** - Use your own photos for personalized training
- **Natural Voices** - 120+ voices with Microsoft Azure TTS
- **Fast Generation** - Videos ready in 2-5 minutes

### Intelligent Caching
- Scripts cached for 24 hours to reduce API calls
- Status tracking for video generation
- Performance optimized for production

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd video-generator
npm install
```

### 2. Configure API Keys

Copy `.env.example` to `.env` and add your keys:
```bash
# Groq API Key
GROQ_API_KEY=your_groq_api_key_here

# D-ID API Key (get free trial at https://www.d-id.com/)
DID_API_KEY=your_did_api_key_here
```

### 3. Test Script Generation
```bash
npm run test
```

### 4. Start Server
```bash
npm start
```

Server runs on http://localhost:3003

---

## 📡 API Endpoints

### Script Generation

#### Generate Module Intro
```bash
POST /api/script/intro
Content-Type: application/json

{
  "moduleNumber": 1,
  "moduleName": "Roofing Fundamentals",
  "learningObjectives": [
    "Identify different roofing materials",
    "Understand basic terminology",
    "Recognize roofing system components"
  ]
}
```

#### Generate Concept Explainer
```bash
POST /api/script/explainer
Content-Type: application/json

{
  "concept": "Hail Damage Identification",
  "details": "How to spot hail damage on residential roofs",
  "duration": 90
}
```

#### Generate Module Summary
```bash
POST /api/script/summary
Content-Type: application/json

{
  "moduleNumber": 1,
  "moduleName": "Roofing Fundamentals",
  "keyTakeaways": [
    "Different roofing materials and their uses",
    "Essential roofing terminology",
    "Components of complete roofing systems"
  ]
}
```

#### Generate Custom Script
```bash
POST /api/script/custom
Content-Type: application/json

{
  "topic": "Safety Procedures",
  "instructions": "Explain ladder safety for roof inspections",
  "duration": 60
}
```

### Video Generation (requires D-ID API key)

#### Create Video from Script
```bash
POST /api/video/create
Content-Type: application/json

{
  "script": "Welcome to Module 1...",
  "presenterId": "amy-jcwCkr1grs",
  "voiceId": "en-US-JennyNeural"
}
```

#### Check Video Status
```bash
GET /api/video/status/:videoId
```

#### Generate Script + Video in One Call
```bash
POST /api/video/generate
Content-Type: application/json

{
  "type": "intro",
  "moduleNumber": 1,
  "moduleName": "Roofing Fundamentals",
  "learningObjectives": ["...", "...", "..."],
  "presenterId": "amy-jcwCkr1grs",
  "voiceId": "en-US-JennyNeural"
}
```

### Utility Endpoints

#### Health Check
```bash
GET /health
```

#### Get D-ID Credits
```bash
GET /api/did/credits
```

#### List Available Voices
```bash
GET /api/did/voices
```

---

## 🎨 D-ID Configuration

### Stock Avatars (No Image Required)
Use `presenterId` parameter:
- `amy-jcwCkr1grs` - Professional female presenter (default)
- `eric-jcwCke3grs` - Professional male presenter
- See D-ID docs for full list

### Custom Avatars
Use `avatarUrl` parameter with your photo:
- Photo must be square format
- Clear face shot, looking at camera
- Good lighting, plain background recommended

### Voice Options
Popular voices:
- `en-US-JennyNeural` - Professional female (default)
- `en-US-GuyNeural` - Professional male
- `en-US-AriaNeural` - Friendly female
- `en-US-DavisNeural` - Confident male

Get full list: `GET /api/did/voices`

---

## 💰 Cost & Pricing

### Groq (Script Generation) - FREE
- **Free Tier**: 30 requests/minute
- **With Caching**: Effectively 150-200/minute
- **Cost**: $0 forever
- **Speed**: 400-1000ms per script

### D-ID (Video Generation)
- **Free Trial**: 20 videos (5 mins total)
- **Creator Plan**: $49/month unlimited videos
- **Per-Video**: $0.30/video
- **Speed**: 2-5 minutes per video

### Recommended Approach
1. **One-Time Generation**: Sign up for Creator trial ($49 for 1 month)
2. Generate all 27 videos (9 modules × 3 videos)
3. Download and host videos on Railway as static assets
4. Cancel subscription after creation
5. **Total Cost**: $49 one-time!

---

## 📊 Module Video Plan

For each of the 9 modules, create:

### 1. Intro Video (30-60 seconds)
- Welcome to the module
- Overview of learning objectives
- Motivate students

### 2. Key Concept Videos (1-2 minutes each)
- Explain 2-3 key concepts per module
- Use examples and clear language
- Reinforce important points

### 3. Summary Video (30-60 seconds)
- Congratulate completion
- Recap key takeaways
- Encourage next steps

**Total**: 27 videos for complete training program

---

## 🔧 Development

### Project Structure
```
video-generator/
├── src/
│   ├── server.js                    # Express server
│   ├── services/
│   │   ├── script-generator.js      # Agnes/Groq script generation
│   │   └── did-service.js           # D-ID video generation
│   └── test_script_generation.js    # Test script
├── package.json
├── .env                              # API keys (not committed)
├── .env.example                      # Template
└── README.md
```

### Testing
```bash
# Test script generation only
npm run test

# Test full service (requires D-ID key)
npm start
# Then use curl or Postman to test endpoints
```

### Deployment to Railway
```bash
# Add to Railway from Training Leaders Main project
railway service create video-generator
railway variables set GROQ_API_KEY=your_key_here
railway variables set DID_API_KEY=your_key_here
railway up
```

---

## 🎯 Integration with Training Leaders

### Frontend Integration

Add video player to module components:

```typescript
// src/components/ModuleVideo.tsx
import React, { useState, useEffect } from 'react';

interface ModuleVideoProps {
  moduleNumber: number;
  moduleName: string;
  videoType: 'intro' | 'concept' | 'summary';
  videoId?: string; // Pre-generated video ID
}

export const ModuleVideo: React.FC<ModuleVideoProps> = ({
  moduleNumber,
  moduleName,
  videoType,
  videoId
}) => {
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    // Load pre-generated video URL
    if (videoId) {
      setVideoUrl(`/videos/${videoId}.mp4`);
    }
  }, [videoId]);

  return (
    <div className="module-video">
      {videoUrl && (
        <video controls width="100%">
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
```

---

## 📝 Example Usage

### Generate All Module Scripts
```javascript
const axios = require('axios');

async function generateAllModuleScripts() {
  const modules = [
    {
      number: 1,
      name: 'Roofing Fundamentals',
      objectives: ['Materials', 'Terminology', 'Components']
    },
    // ... 8 more modules
  ];

  for (const module of modules) {
    // Generate intro
    const intro = await axios.post('http://localhost:3003/api/script/intro', {
      moduleNumber: module.number,
      moduleName: module.name,
      learningObjectives: module.objectives
    });

    console.log(`Module ${module.number} Intro:`, intro.data.script);

    // Save script to file for D-ID video generation
  }
}
```

---

## 🚀 Next Steps

1. ✅ **Script Generation Working** (using Groq - FREE)
2. ⏳ **Sign up for D-ID** trial at https://www.d-id.com/
3. ⏳ **Generate test video** to verify integration
4. ⏳ **Create all 27 videos** during trial period
5. ⏳ **Download and host** videos on Railway
6. ⏳ **Integrate** video player into Training Leaders UI
7. ⏳ **Deploy** to production

---

## 💡 Pro Tips

### Tip 1: Batch Generation
Generate all scripts first, then create videos in batch to maximize efficiency.

### Tip 2: Cache Everything
Scripts are cached for 24 hours. Regenerate only when content changes.

### Tip 3: Download Videos
Download generated videos and host them as static assets instead of hitting D-ID API in production.

### Tip 4: Voice Consistency
Use the same voice ID across all videos for brand consistency.

### Tip 5: Custom Avatars
If using custom avatar, use same photo for all videos to maintain continuity.

---

## 🔗 Useful Links

- **D-ID Website**: https://www.d-id.com/
- **D-ID API Docs**: https://docs.d-id.com/
- **Groq Console**: https://console.groq.com/
- **Training Leaders**: https://trdtraining.up.railway.app
- **Agnes AI**: https://agnes21.up.railway.app

---

## 📞 Support

For issues or questions:
1. Check the health endpoint: `GET /health`
2. Review error logs in Railway dashboard
3. Verify API keys are configured correctly
4. Test script generation first (doesn't require D-ID)

---

**🎬 Ready to create professional AI presenter videos for Training Leaders! 🚀**
