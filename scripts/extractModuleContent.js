#!/usr/bin/env node

/**
 * Extract Module Content from TypeScript to JSON
 *
 * This script extracts module content from InteractiveModuleSystem.tsx
 * and creates sanitized JSON files for each module.
 */

const fs = require('fs');
const path = require('path');
const { sanitizeJSON } = require('./sanitizeContent.js');

// Module 1 content
const module1Content = {
  overview: "Welcome to RoofER Sales Training! This foundational module introduces you to the complete sales cycle, commission structure, and essential skills for success. Master the Initial Pitch, understand the Field Portal App, learn objection handling, and discover how to turn every door knock into an opportunity.",
  learningObjectives: [
    "Master the Initial Pitch with all 5 Non-Negotiables",
    "Navigate the Field Portal App for job tracking and metrics",
    "Handle common homeowner objections with confidence",
    "Identify different shingle types and discontinued shingles",
    "Understand the complete 9-16 week sales cycle from knock to payment",
    "Learn the commission structure and bonus incentives",
    "Set up payroll and worker's compensation requirements"
  ],
  sections: [
    {
      id: "initial-pitch",
      title: "Initial Pitch Mastery - The 5 Non-Negotiables",
      duration: "60 minutes",
      content: `**The Foundation of Every Sale**

The Initial Pitch is your first and most important interaction with homeowners. Master this script to create trust, demonstrate value, and secure inspection appointments consistently.

**The 5 Non-Negotiables (Must Include Every Time):**
1. **Who You Are** - State your name clearly and confidently
2. **Who We Are** - "Roof-ER, a local roofing company specializing in insurance claims"
3. **Make It Relatable** - "We are working with your neighbors who have had storm damage"
4. **What You Are There To Do** - "Free inspection to check for qualifying damage"
5. **Go for the Close** - Get agreement for the inspection

**Complete Non-Storm Environment Script:**

"Hi, how are you? My Name is ________ with Roof-ER we are a local roofing company that specializes in helping homeowners get their roof (and siding) replaced, paid for by their insurance!"

[Reach for handshake]

"We have had a lot of storms here in Northern Virginia/Philadelphia/Maryland over the past few months that have done a lot of damage! We are already working with your neighbors. We have been able to help them get fully approved through their insurance company to have their roof and/or siding replaced."

"While I am here, in the neighborhood, I am conducting a completely free inspection to see if you have similar, qualifiable damage. If you do, I will take a bunch of photos and walk you through the rest of the process. If you do not, I would not want to waste your time, I would not want to waste mine! I will at least leave giving you peace of mind that you are in good shape."

[Wait for agreement]

"Alright! It will take me about 10-15 minutes. I am gonna take a look around the perimeter of your home, then grab the ladder, and take a look at your roof."

[Handshake] "What was your name again? [Their name] great to meet you, again I am (your name). Oh and by the way do you know who your insurance company is? [Wait] Great! We work with those guys all the time."

"Here is my card/flier, look us up while I am conducting the inspection! I will give you a knock when I finish up and show you what I have found."

**Key Success Factors:**
- Maintain confident, friendly body language
- Make eye contact and smile
- Use homeowner's name throughout
- Project expertise and professionalism
- Create urgency without pressure`
    },
    {
      id: "objection-handling",
      title: "Objection Handling - Turn No into Yes",
      duration: "45 minutes",
      content: `**Professional Objection Handling Framework**

Every successful salesperson faces objections daily. Master these responses to convert hesitation into inspection appointments.

**Common Objections & Professional Responses:**

**"Not interested":**
- React positively with agreeable response
- "I understand! Have you had a chance to have it inspected since the [storm date]?"
- "It only takes 15 minutes and it is completely free"

**"I do not have enough time":**
- "I completely understand! The inspection only takes 10-15 minutes"
- "I can come back at a better time - when works for you?"

**"My roof is in good shape":**
- "That is great to hear! When was the last time you had it inspected?"
- "A lot of storm damage is not visible from the ground - that is why we do free inspections"

**"I just had it checked":**
- "Perfect! Who did the inspection for you?"
- "Were they specifically looking for storm damage?"

**"I do not have the money for anything right now":**
- "I completely understand! The great news is if you have qualifying damage, your insurance company pays for the replacement"
- "Your only cost would be your deductible"

**"Roofers knock my door 5 times a week":**
- "I totally get it! That is exactly why we are different - we are a local GAF Master Elite contractor"
- "We work directly with your insurance company to handle the entire process"

**"My roof is only 18 years old and is a 50 year roof":**
- "That is a great roof! The issue is not age - it is storm damage"
- "Even new roofs can be damaged by hail and wind"

**Objection Handling Principles:**
1. Always react positively
2. Ask questions when appropriate
3. Repeat customer objections to show understanding
4. Provide education, not pressure
5. Focus on value and peace of mind`
    }
  ],
  interactiveLearning: [
    {
      id: "pitch-practice",
      title: "Initial Pitch Role-Play Simulator",
      type: "scenario",
      estimatedTime: "30 minutes",
      content: "Practice your Initial Pitch in realistic door-knocking scenarios with AI feedback.",
      activities: [
        {
          id: "pitch-sequence",
          title: "Pitch Sequence Challenge",
          description: "Arrange the Initial Pitch components in the correct order",
          type: "drag-drop",
          data: {
            items: [
              { id: "intro", text: "Introduce yourself and Roof-ER" },
              { id: "handshake", text: "Reach for handshake" },
              { id: "neighbors", text: "Mention working with neighbors" },
              { id: "free-inspection", text: "Offer free inspection" },
              { id: "timeline", text: "Explain 10-15 minute timeline" },
              { id: "name-exchange", text: "Get homeowner name and insurance" },
              { id: "card", text: "Give card and set expectation for follow-up" }
            ],
            correctOrder: ["intro", "handshake", "neighbors", "free-inspection", "timeline", "name-exchange", "card"]
          }
        }
      ]
    }
  ],
  agnesContent: [
    {
      id: "welcome",
      title: "Welcome to Your Sales Journey!",
      type: "interactive",
      icon: "👋",
      content: "Hi! I am Agnes, your AI training coach. I will be with you throughout this journey to help you become a top-performing RoofER sales representative. Let's start with the foundation - your Initial Pitch!",
      points: [
        "Practice the Initial Pitch until it feels natural - not robotic",
        "The 5 Non-Negotiables must appear in EVERY pitch",
        "Your goal today: Knock 70+ doors and secure 3-5 inspections",
        "Remember: Every no brings you closer to a yes",
        "Success comes from consistency, not perfection"
      ],
      duration: "10 minutes"
    }
  ],
  quiz: [
    {
      id: "non-negotiables",
      question: "What are the 5 Non-Negotiables that MUST be in every Initial Pitch?",
      type: "multiple-choice",
      options: [
        "Name, Company, Price, Timeline, Close",
        "Who You Are, Who We Are, Make it Relatable, What You Are There To Do, Go for the Close",
        "Introduction, Handshake, Inspection, Insurance, Follow-up",
        "Greeting, Company Info, Neighbors, Free Service, Contact Exchange"
      ],
      correctAnswer: 1,
      explanation: "The 5 Non-Negotiables are: (1) Who You Are, (2) Who We Are, (3) Make it Relatable, (4) What You Are There To Do, (5) Go for the Close. These must appear in every pitch.",
      points: 2
    },
    {
      id: "objection-response",
      question: "Homeowner says: My roof is in good shape. Your best response?",
      type: "multiple-choice",
      options: [
        "You might be wrong - let me check for free",
        "That is great! When was the last inspection? Storm damage often is not visible from the ground",
        "Most homeowners think that until we find damage",
        "I will just take a quick look to be sure"
      ],
      correctAnswer: 1,
      explanation: "The professional response validates their statement, asks an engaging question, and provides education about why ground-level assessment can miss storm damage.",
      points: 2
    }
  ],
  documents: [
    {
      id: "initial-pitch-script",
      title: "Initial Pitch Script (Non-Storm)",
      type: "document",
      description: "Complete memorization script for non-storm environment door knocking",
      pages: 2,
      topics: ["5 Non-Negotiables", "Opening Lines", "Objection Handling", "Close Techniques"]
    }
  ],
  matchingGame: {
    title: "Sales Cycle & Commission Matching",
    description: "Match sales cycle stages with their key activities and timeline",
    instructions: "Match each sales cycle stage with its description",
    timeLimit: 180,
    difficulty: "easy",
    pairs: [
      {
        id: "stage1",
        left: { text: "Stage 1: Lead Generation", type: "text" },
        right: { text: "Knock 70+ doors/day, pin houses in Field Portal", type: "text" }
      },
      {
        id: "stage2",
        left: { text: "Stage 2: Inspection", type: "text" },
        right: { text: "15-20 minute roof inspection, photo documentation", type: "text" }
      },
      {
        id: "stage3",
        left: { text: "Stage 4: Adjuster Meeting", type: "text" },
        right: { text: "Meet with insurance adjuster 2-7 days after claim", type: "text" }
      },
      {
        id: "commission",
        left: { text: "Downpayment Commission", type: "text" },
        right: { text: "$1,000 when homeowner submits ACV", type: "text" }
      }
    ]
  }
};

// Module 2 content
const module2Content = {
  overview: "Master the complete inspection process from roof access to claim filing. Learn to identify storm damage, document with professional photos, present findings to homeowners, and file insurance claims on the same day. This module transforms you from a door knocker into a certified storm damage expert.",
  learningObjectives: [
    "Identify hail damage (circular divots, granule loss, bruising)",
    "Recognize wind damage (creased/missing shingles)",
    "Execute the 15-20 minute inspection protocol flawlessly",
    "Capture the required photo sequence in correct order",
    "Deliver the Post-Inspection Pitch with confidence",
    "File insurance claims using homeowner's app/website",
    "Complete Claim Filing Information Sheet accurately",
    "Practice Initial Pitch + Post-Inspection Pitch without script"
  ],
  sections: [
    {
      id: "storm-damage-id",
      title: "Storm Damage Identification - Hail & Wind",
      duration: "50 minutes",
      content: `**Becoming a Storm Damage Expert**

Your ability to identify and document storm damage determines your success. Master these identification techniques to find qualifying damage on every roof.

**Hail Damage Recognition:**

**Primary Indicators:**
- **Circular divots** - Round impact marks on shingles
- **Granule loss** - Black mat showing through protective granules
- **Bruising** - Darkened areas where impact compressed shingle
- **Soft spots** - Areas that feel soft when pressed (use caution)

**Visual Cues:**
- Look for pattern of circular impacts
- Check all slopes - damage is rarely isolated to one area
- Use flashlight for better visibility
- Granules collect in gutters and downspouts

**Wind Damage Identification:**

**Primary Indicators:**
- **Creased shingles** - Folded or bent shingles
- **Blown-off shingles** - Missing shingles or exposed sections
- **Lifted tabs** - Shingle tabs no longer sealed down
- **Torn shingles** - Ripped or damaged sections

**Collateral Damage Documentation:**
- **Gutters** - Dents from hail impacts
- **Downspouts** - Visible dents or damage
- **Screens** - Holes or tears from hail
- **Siding** - Impact marks or damage
- **Roof metals** - Flashing, vents, pipes with visible damage

**Critical Principle:**
> "WHEN IN DOUBT, SIGN IT UP. Not every roof will look destroyed by 2-inch hail, but we still find a lot of success."`
    },
    {
      id: "inspection-protocol",
      title: "15-20 Minute Inspection Protocol",
      duration: "45 minutes",
      content: `**Professional Inspection Sequence**

Execute this exact sequence on every inspection for consistency, efficiency, and complete documentation.

**Pre-Inspection (2 minutes):**
- Confirm homeowner permission
- Verify insurance company
- Set expectations ("10-15 minutes")
- Ensure ladder safety

**Photo Sequence (Required Order):**

**1. Mailbox/House Number Photo**
- Establishes property identity
- First photo of every inspection

**2. Overview of House**
- Full house shot from street
- Shows overall property condition

**3-6. Elevation Collateral Damage (Front, Right, Rear, Left)**
For EACH elevation, photograph:
- Screen damage (holes, tears)
- Gutter damage (dents, detachment)
- Downspout damage (dents, bends)
- Siding damage (cracks, impacts)

**7. Roof Overview Collateral**
- Roof metal damage (flashing, vents, pipes)
- Other roof collateral damage

**8. Circle Hail Hits**
- Close-up of EACH hail impact
- Use chalk to circle damage
- Minimum 4-6 close-ups per slope

**9. Slash Wind Damage**
- Close-up of EACH wind-damaged shingle
- Use chalk to slash mark
- Document creases and missing shingles

**10. Overview of Chalked Damage**
- Wide shot showing marked damage
- Proves damage pattern across roof

**11. Granules in Gutters/Downspouts**
- Photo of granule accumulation
- Evidence of shingle deterioration

**Safety Reminder:**
- If unsafe, DO NOT DO THE INSPECTION
- Document from ground if necessary
- Escalate to Team Leader`
    }
  ],
  interactiveLearning: [
    {
      id: "damage-identification",
      title: "Storm Damage Identification Challenge",
      type: "exercise",
      estimatedTime: "25 minutes",
      content: "Test your ability to identify hail damage, wind damage, and collateral damage from photos",
      activities: [
        {
          id: "damage-types",
          title: "Identify the Damage Type",
          description: "Look at roof photos and correctly identify the type of storm damage",
          type: "multiple-choice",
          data: {
            scenario: "You see circular indentations with exposed black mat showing through. What type of damage is this?",
            options: [
              "Wind damage - shingles are blown off",
              "Hail damage - circular divots with granule loss",
              "Age-related wear - normal deterioration",
              "Installation defect - improper nailing"
            ],
            correct: 1,
            feedback: [
              "Wind damage appears as creases or missing shingles, not circular patterns",
              "Correct! Circular divots with granule loss (black mat showing) is classic hail damage",
              "Age-related wear appears more uniform, not as circular impact patterns",
              "Installation defects show different patterns, typically along nailing lines"
            ]
          }
        }
      ]
    }
  ],
  agnesContent: [
    {
      id: "inspection-mastery",
      title: "Inspection Excellence Coaching",
      type: "interactive",
      icon: "📸",
      content: "Great progress! Today you will master the inspection process that separates professionals from amateurs. Remember: thorough documentation protects both you and the homeowner.",
      points: [
        "ALWAYS take photos in portrait orientation - landscape will not populate properly",
        "Minimum 1 overview + 4-6 close-ups per slope",
        "Use flashlight for better hail visibility",
        "Granules in gutters = smoking gun evidence",
        "When in doubt, sign it up - let the adjuster decide"
      ],
      duration: "15 minutes"
    }
  ],
  quiz: [
    {
      id: "photo-sequence",
      question: "What are the first TWO photos you take on every inspection?",
      type: "multiple-choice",
      options: [
        "Roof overview and hail damage close-ups",
        "Mailbox/House number and Overview of house",
        "Front elevation and roof access point",
        "Insurance documents and homeowner ID"
      ],
      correctAnswer: 1,
      explanation: "Every inspection starts with (1) Mailbox/House Number to establish property, then (2) Overview of House from the street.",
      points: 2
    },
    {
      id: "damage-marking",
      question: "How do you mark hail damage vs wind damage on the roof?",
      type: "multiple-choice",
      options: [
        "Hail = X marks, Wind = Circle marks",
        "Hail = Circle marks, Wind = Slash marks",
        "Hail = Red chalk, Wind = Blue chalk",
        "Both types use the same marking system"
      ],
      correctAnswer: 1,
      explanation: "Hail damage is CIRCLED with chalk, Wind damage is SLASHED with chalk. This helps insurance adjusters quickly identify damage types.",
      points: 2
    }
  ],
  documents: [
    {
      id: "inspection-checklist",
      title: "Complete Inspection Photo Checklist",
      type: "document",
      description: "11-step photo sequence for every inspection with examples",
      pages: 3,
      topics: ["Photo Order", "Collateral Damage", "Hail vs Wind", "Safety Protocol"]
    },
    {
      id: "post-inspection-script",
      title: "Post-Inspection Pitch Script",
      type: "document",
      description: "Script for presenting findings to homeowners after inspection",
      pages: 2,
      topics: ["Photo Presentation", "Damage Explanation", "Claim Filing Process"]
    }
  ],
  matchingGame: {
    title: "Damage Type & Documentation Matching",
    description: "Match damage types with their correct identification and documentation methods",
    instructions: "Match each damage type with its key characteristics",
    timeLimit: 180,
    difficulty: "medium",
    pairs: [
      {
        id: "hail",
        left: { text: "Hail Damage", type: "text" },
        right: { text: "Circular divots, granule loss, black mat exposed", type: "text" }
      },
      {
        id: "wind",
        left: { text: "Wind Damage", type: "text" },
        right: { text: "Creased shingles, blown-off sections, lifted tabs", type: "text" }
      },
      {
        id: "collateral",
        left: { text: "Collateral Damage", type: "text" },
        right: { text: "Gutters, screens, siding, downspouts with impacts", type: "text" }
      },
      {
        id: "photo-order",
        left: { text: "First Photo", type: "text" },
        right: { text: "Mailbox or House Number", type: "text" }
      }
    ]
  }
};

// Sanitize and save Module 1
const { sanitized: sanitizedModule1, replacementCount: count1 } = sanitizeJSON(module1Content);
fs.writeFileSync(
  path.join(__dirname, '../src/data/modules/module1.json'),
  JSON.stringify(sanitizedModule1, null, 2),
  'utf-8'
);
console.log(`✅ Module 1 created and sanitized (${count1} characters replaced)`);

// Sanitize and save Module 2
const { sanitized: sanitizedModule2, replacementCount: count2 } = sanitizeJSON(module2Content);
fs.writeFileSync(
  path.join(__dirname, '../src/data/modules/module2.json'),
  JSON.stringify(sanitizedModule2, null, 2),
  'utf-8'
);
console.log(`✅ Module 2 created and sanitized (${count2} characters replaced)`);

console.log('\n🎉 Module extraction complete!');
console.log(`   Module 1: /src/data/modules/module1.json`);
console.log(`   Module 2: /src/data/modules/module2.json`);
