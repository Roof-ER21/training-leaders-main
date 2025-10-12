# Agnes21 Chatbot - Intent Mapping & Content Structure Guide

**Document Purpose:** Guide for building AI chatbot intents, entities, and responses based on Roof-ER training materials

**Source Materials:** 95-slide training deck, 600+ Q&A scenarios, 40+ templates, 12+ scripts

---

## Intent Categories & Examples

### **Category 1: Sales Process & Scripts**

#### Intent: `get_initial_pitch_script`
**User Utterances:**
- "What's the initial pitch?"
- "How do I introduce myself?"
- "Give me the door knock script"
- "What are the 5 non-negotiables?"
- "Storm vs non-storm pitch"

**Entities:**
- `environment_type`: [storm, non-storm, specific-date]
- `script_section`: [introduction, body, close]

**Response Content:**
```
INITIAL PITCH (Non-Storm Environment):

"Hi, how are you? My Name is ________ with Roof-ER we're a local roofing company that specializes in helping homeowners get their roof (and siding) replaced, paid for by their insurance!"

[Reach for handshake]

"We've had a lot of storms here in Northern Virginia/Philadelphia/Maryland over the past few months that have done a lot of damage! We're already working with your neighbors. We've been able to help them get fully approved through their insurance company to have their roof and/or siding replaced."

"While I'm here, in the neighborhood, I am conducting a completely free inspection to see if you have similar, qualifiable damage. If you do, I'll take a bunch of photos and walk you through the rest of the process. If you don't, I wouldn't want to waste your time, I wouldn't want to waste mine! I will at least leave giving you peace of mind that you're in good shape."

[Wait for agreement]

"Alright! It will take me about 10-15 minutes. I'm gonna take a look around the perimeter of your home, then grab the ladder, and take a look at your roof."

[Handshake] "What was your name again? [Their name] great to meet you, again I am (your name). Oh and by the way do you know who your insurance company is? [Wait] Great! We work with those guys all the time."

"Here's my card/flier, look us up while I'm conducting the inspection! I will give you a knock when I finish up and show you what I've found."

5 NON-NEGOTIABLES:
1. Who you are
2. Who we are (Roof-ER)
3. Make it relatable
4. What you're there to do (inspection)
5. Go for the close (agreement to inspection)

Related: Q510, Q520, Q551
```

---

#### Intent: `handle_objection`
**User Utterances:**
- "Homeowner says not interested"
- "They don't have time"
- "How do I handle objections?"
- "They say roof is in good shape"
- "Already had it checked"

**Entities:**
- `objection_type`: [not-interested, no-time, good-shape, already-checked, no-money, too-many-roofers, warranty-years]

**Response Content:**
```
COMMON OBJECTIONS & RESPONSES:

"Not interested":
- React positively with agreeable response
- Ask: "I understand! Have you had a chance to have it inspected since the [storm date]?"
- Position: "It only takes 15 minutes and it's completely free"

"I don't have enough time":
- "I completely understand! The inspection only takes 10-15 minutes"
- "I can come back at a better time - when works for you?"

"My roof is in good shape":
- "That's great to hear! When was the last time you had it inspected?"
- "A lot of storm damage isn't visible from the ground - that's why we do free inspections"

"I just had it checked":
- "Perfect! Who did the inspection for you?"
- "Were they specifically looking for storm damage?"

"I don't have the money for anything right now":
- "I completely understand! The great news is if you have qualifying damage, your insurance company pays for the replacement"
- "Your only cost would be your deductible"

"Roofers knock my door 5 times a week":
- "I totally get it! That's exactly why we're different - we're a local GAF Master Elite contractor"
- "We work directly with your insurance company to handle the entire process"

"My roof is only 18 years old and is a 50 year roof":
- "That's a great roof! The issue isn't age - it's storm damage"
- "Even new roofs can be damaged by hail and wind"

TIPS:
- Always react positively
- Ask questions when appropriate
- Repeat customer's objections to show understanding

Related: Slide 12
```

---

#### Intent: `get_inspection_checklist`
**User Utterances:**
- "What photos do I need?"
- "Inspection checklist"
- "How do I do an inspection?"
- "Photo order for inspection"
- "How many photos per slope?"

**Entities:**
- `damage_type`: [hail, wind, collateral]
- `timeframe`: [quick, thorough]

**Response Content:**
```
INSPECTION PHOTO CHECKLIST (15-20 Minutes):

REQUIRED PHOTOS IN ORDER:
1. Mailbox/House Number
2. Overview of House
3. Front Elevation Collateral
   - Screens damage
   - Gutters damage
   - Downspouts damage
   - Siding damage
4. Right Elevation Collateral (same as above)
5. Rear Elevation Collateral (same as above)
6. Left Elevation Collateral (same as above)
7. Roof Overview Collateral
   - Roof metals damage
   - Other collateral on roof
8. Circle Hail Hits (close-up of EACH)
9. Slash Wind Damage (close-up of EACH)
10. Overview of majority of damage chalked up
11. Granules in gutters or at bottom of downspouts

PHOTOS PER SLOPE:
- MINIMUM: 1 overview + 4-6 close-ups per slope
- If disputed: Add chalked damage photos for clarity

TOOLS NEEDED:
- Flashlight (better hail visibility)
- Chalk (for marking damage)
- Phone in PORTRAIT orientation

SAFETY FIRST:
- If unsafe, DO NOT DO THE INSPECTION
- Document from ground
- Escalate to Team Leader

Related: Q503, Q510, Q511, Q551, Q560, Q594
Script: Inspection and Post Inspection Script.docx
```

---

### **Category 2: Documentation & Templates**

#### Intent: `select_template`
**User Utterances:**
- "Which template should I use?"
- "How do I respond to a partial?"
- "What template for denial?"
- "Discontinued shingles template"
- "Quick Strike Guide help"

**Entities:**
- `scenario_type`: [partial, denial, itel, repair-attempt, siding, estimate-request, complaint]
- `damage_type`: [roof, siding, both]

**Response Content:**
```
TEMPLATE SELECTOR (Quick Strike Guide):

SCENARIO: Partial Approval (Roof)
→ USE: Generic Partial Template
→ ATTACH: Roof-ER estimate + Photo Report
→ ASK FOR: Scope revision

SCENARIO: Siding Denial/Partial
→ USE: Siding Argument Template
→ REFERENCE: iTel report, discontinued siding, housewrap/code (MD R703)

SCENARIO: Discontinued Shingles
→ USE: iTel Template + Discontinued Shingle List
→ ARGUE: Patch repair impossible
→ MENTION: English vs Metric sizing if applicable

SCENARIO: Repair Attempt Failed
→ USE: Repair Attempt Template
→ ATTACH: Repair attempt photos or video link
→ SHOWS: Roof is irreparable

SCENARIO: Insurance Denial (Customer Pushback)
→ USE: Template from Customer to Insurance
→ SEND TO: Homeowner for them to send directly
→ WHY: Stronger coming from policyholder

SCENARIO: No Estimate Received Yet
→ USE: Estimate Request Template
→ ATTACH: Claim Authorization
→ REQUEST: Copy of insurance estimate

SCENARIO: Code Requirement (Roof or Siding)
→ USE: VA/MD Building Code Docs + Flashing Codes
→ CITE: Slope requirements, housewrap (R703), flashing rules

SCENARIO: Storm Damage Latent Issues
→ USE: GAF Storm Damage Guidelines
→ REFERENCE: Granule loss, cracks, exposed mat
→ CITE: GAF advises full replacement if multiple shingles/plane affected

SCENARIO: Missing Documentation/Items
→ USE: Photo Report Template
→ ATTACH: Photos of all unaccounted damage
→ USE: Partial/denial language depending on decision

Related: Q504, Q505, Q514, Q527, Q539, Q540, Q559, Q596
Document: Roof-ER Quick Strike Guide.docx
```

---

#### Intent: `create_photo_report`
**User Utterances:**
- "How do I create a photo report?"
- "Photo report requirements"
- "What goes in photo report?"
- "Portrait or landscape photos?"

**Entities:**
- `report_type`: [photo, hover]
- `orientation`: [portrait, landscape]

**Response Content:**
```
PHOTO REPORT REQUIREMENTS:

ORIENTATION: PORTRAIT ONLY
- Landscape photos will NOT populate properly
- Hold phone normally (vertically)

STRUCTURE (Use Photo Report Template.docx):
1. Slope overviews (each slope)
2. Close-ups of each damage type
3. Overall house context
4. Collateral damage documentation

TIMING:
- Create on day of Adjuster Meeting
- Submit to adjuster with Claim Authorization
- Use Post-AM Email Template

BEST PRACTICES:
- Always include slope overviews
- Show context to avoid cherry-picking claims
- Prove consistency of damage
- Attach to every escalation

HOVER REPORT (Different Rules):
- Can use Portrait OR Landscape
- Landscape usually more effective
- Launches from Field Portal App

SUBMISSION:
- Email to adjuster with effective email
- CC homeowner on communication
- Use Post-AM-Email-Template if needed

Related: Q503, Q532, Q568, Q595
Template: Photo Report Template.docx
```

---

### **Category 3: Escalation & Problem Resolution**

#### Intent: `determine_escalation_level`
**User Utterances:**
- "Who should I escalate to?"
- "When do I involve my Team Leader?"
- "Should I file a complaint?"
- "Arbitration or complaint?"
- "Escalation order"

**Entities:**
- `current_level`: [self, teammate, team-leader, sales-manager]
- `issue_type`: [partial, denial, delay, hostile-adjuster, code-dispute]

**Response Content:**
```
ESCALATION MATRIX:

LEVEL 1: SELF-RESOLUTION
- Use templates and scripts
- Review training scenarios (Q501-Q600)
- Check Quick Strike Guide
- Document thoroughly

LEVEL 2: PEER SUPPORT (Teammates)
- Consult teammates
- Review similar cases
- Group problem-solving

LEVEL 3: TEAM LEADER
WHEN: You've documented properly, tried rebuttal, adjuster won't move
PROVIDES: Review, coaching, intervention
REQUIREMENT: Complete photo set + template use
NEVER: Escalate without documentation

LEVEL 4: SALES MANAGER
WHEN: Team Leader review fails to resolve
PROVIDES: Senior-level carrier communication
REQUIREMENT: Full documentation package from Team Leader review

LEVEL 5: COMPLAINT FILING
WHEN: Carrier ignores law OR drags feet
TOOL: Complaint Forms.docx
FILED WITH: State insurance regulator
TIMELINE: If carrier exceeds regulatory timelines
USE WHEN: Process failure

LEVEL 6: ARBITRATION
WHEN: Policy interpretation dispute (after complaint)
NOT FOR: Process failures (use complaint)
REQUIRES: Sales Manager approval
TOOL: Arbitration Information.docx
USE WHEN: Dispute over policy terms

COMPLAINT vs ARBITRATION:
- COMPLAINT = Process failure, ignoring law, excessive delays
- ARBITRATION = Disagreement over policy interpretation

Related: Q501, Q502, Q509, Q519, Q542, Q545, Q564, Q566, Q586
Documents: Complaint Forms.docx, Arbitration Information.docx
```

---

#### Intent: `handle_partial_approval`
**User Utterances:**
- "Got a partial approval"
- "What do I do with partial?"
- "How to turn around partial?"
- "Partial roof approval"

**Entities:**
- `approval_type`: [partial-roof, partial-siding, missing-items]
- `items_approved`: [list]
- `items_denied`: [list]

**Response Content:**
```
HANDLING PARTIAL APPROVALS:

STEP 1: REVIEW DECISION
- Compare approved items to your documentation
- Identify what's missing
- Check if damage type was acknowledged

STEP 2: SELECT RESPONSE STRATEGY

For Missing Roof Items:
→ Generic Partial Template
→ Attach: Roof-ER estimate + Photo Report
→ Request: Scope revision with line-item details

For Siding Denial/Partial:
→ Siding Argument Template
→ Reference: iTel report, discontinued siding
→ Cite: Housewrap/code requirements (MD R703)

For Discontinued Materials:
→ iTel Template + Discontinued Shingle List
→ Argue: Patch repair voids warranty
→ Attach: Supply house verification

For Code Items Missing:
→ VA/MD Building Code Docs
→ Cite: Specific code sections
→ Show: Requirement for compliance

STEP 3: DOCUMENT & SUBMIT
- Use Estimate Request Template if no estimate provided
- Attach all supporting documentation
- Reference specific line items from their estimate

STEP 4: FOLLOW UP
- Weekly carrier follow-ups
- Document every communication
- If ignored for 2+ weeks, escalate to Team Leader

STEP 5: ESCALATE IF NEEDED
- Team Leader review if no response
- Sales Manager if Team Leader fails
- Complaint if carrier refuses legal requirements

EXPECTATION MANAGEMENT:
"Not all jobs approved first time - don't get discouraged. Insurance companies looking to save pennies at policyholder expense."

Related: Q539, Q540, Q559, Slide 63
Templates: Generic Partial Template, Estimate Request Template
```

---

### **Category 4: Homeowner Communication**

#### Intent: `explain_deductible`
**User Utterances:**
- "How do I explain deductible?"
- "Homeowner asking about cost"
- "What will they pay?"
- "Is deductible required?"

**Entities:**
- `homeowner_concern`: [cost, required, when-paid]

**Response Content:**
```
EXPLAINING DEDUCTIBLE TO HOMEOWNERS:

KEY MESSAGE:
"The deductible is required by law. It's your legal responsibility by state insurance law."

POSITIONING:
"Think of it as your investment in protecting and restoring the value of your home."

WHEN PAID:
"The deductible is paid with the Final Payment after installation is complete. The insurance company sends two payments:
1. ACV (Actual Cash Value) - First payment, used as downpayment
2. Depreciation - Second payment after installation
Your Final Payment = Depreciation + Deductible"

CONTINGENCY AGREEMENT LANGUAGE:
"Your only cost will be your deductible if we get you fully approved. If it's a partial approval or denial, we fight to turn it into a full approval. If we can't get you fully approved, this contract is null and void and you don't owe us a penny."

IF HOMEOWNER RESISTS:
- Be clear and upfront
- Frame as investment in home value
- Explain legal requirement
- Show they're only paying if fully approved
- Emphasize insurance covers everything else

TIMELINE:
- Downpayment: ACV payment (first payment from insurance)
- Final Payment: After installation (Depreciation + Deductible)
- Total out-of-pocket: Only deductible

Related: Q516, Q561, Slide 20
Document: What is a Deductible.pdf
```

---

#### Intent: `explain_contingency_agreement`
**User Utterances:**
- "How do I explain contingency?"
- "What's the contingency agreement?"
- "Homeowner asking about contract"
- "Claim authorization explanation"

**Entities:**
- `document_type`: [contingency, claim-authorization]
- `concern_type`: [cost, commitment, communication]

**Response Content:**
```
CONTINGENCY & CLAIM AUTHORIZATION SCRIPT:

AFTER FILING CLAIM:
"Okay, perfect! Like they said, an adjuster will be reaching out to you in the next 24 to 48 hours to schedule the inspection. The absolute most important part of this process is that I am at this inspection. Insurance companies don't want to pay out. They are trying to mitigate their losses after storms. I am there as your representation to make sure you get a fair shake."

[Turn iPad so both can see]

CONTINGENCY AGREEMENT:
"This basic/simple agreement backs you as the homeowner by guaranteeing you that your only cost will be your deductible if we get you fully approved. If it is a partial approval or denial, first we will fight and jump through the necessary hoops to turn that into a full approval; but if we are not able to get you fully approved, this contract is null and void and you do not owe us a penny."

"What's in it for us, is we just want to get to do the work. This agreement commits you to using us if we hold up our end of the bargain and achieve a full-approval."

[You sign]
[They sign]

CLAIM AUTHORIZATION:
"This next form is our Claim Authorization form. Very simple, it allows us to communicate with your insurance company. I'll be here for the inspection and we will also communicate with them through email and phone calls so you don't have to be a middle-man. Of course, I'll always keep you looped in with our communication by CCing you in all emails and updating you on any conversations we have."

[They sign]
[Press Submit, enter password "roofer"]

CLOSING:
"Alright, we are all set! Again, the most important part of this process is that I am here when the insurance company comes out. Please let me know when that's scheduled. Ideally you can have them call me to schedule that directly. If they would rather schedule with you, please avoid Tuesday mornings until about 1 pm as I am not available then. But, please let me know as soon as it is scheduled and I will make sure it is in my calendar."

[Answer questions]

"Thank you, sir/ma'am, looking forward to seeing you on the day of inspection, you have my contact information on my card if you need anything else."

Related: Q516, Q561, Slides 48-51
Script: Contingency and Claim Authorization Script.docx
```

---

### **Category 5: Technical Knowledge**

#### Intent: `explain_matching_law`
**User Utterances:**
- "What is matching law?"
- "How do I explain matching?"
- "Maryland matching requirement"
- "Why does whole slope need replacement?"

**Entities:**
- `state`: [maryland, virginia, pennsylvania]
- `material`: [shingles, siding]

**Response Content:**
```
MATCHING LAW EXPLANATION:

SIMPLE EXPLANATION TO HOMEOWNER:
"State laws (like Maryland's) require repairs to be reasonably uniform in color, texture, and quality. If new materials don't match the old, insurance must replace the whole slope or siding to ensure uniformity."

DETAILED EXPLANATION:
"The law says repairs must match. If we can't get materials that match your existing roof/siding in color, texture, and lock-style, the insurance company is required to replace the entire slope or elevation to maintain uniform appearance and quality."

WHY IT MATTERS:
- Color mismatches are visible and affect home value
- Texture differences are obvious
- Lock-style mismatches create functional issues
- "Like kind and quality" legal requirement

WHEN TO USE:
- Discontinued shingles
- Discontinued siding
- Unavailable color matches
- Texture/profile changes by manufacturer

DOCUMENTATION TO REFERENCE:
- Maryland: Maryland Insurance Administration Matching Requirement.pdf (3 documents)
- Virginia: Building codes
- Pennsylvania: Insurance regulations

ESCALATION:
If adjuster argues against matching law:
→ Attach Maryland Matching Requirement.pdf
→ Cite state statute directly
→ Escalate to Team Leader if refused

RELATED ARGUMENTS:
- iTel report proves unavailability
- Siding Argument.docx shows why piecing fails
- Supply house letters confirm discontinuation

Related: Q508, Q525, Q565, Q573
Documents: Maryland Insurance Administration Matching Requirement.pdf, Siding Argument.docx
```

---

#### Intent: `explain_gaf_guidelines`
**User Utterances:**
- "What are GAF guidelines?"
- "Why does repair void warranty?"
- "How to cite manufacturer guidelines?"
- "GAF storm damage requirements"

**Entities:**
- `guideline_type`: [storm-damage, slope-replacement, warranty]
- `scenario`: [repair-attempt, partial-approval, code-requirement]

**Response Content:**
```
GAF MANUFACTURER GUIDELINES:

PRIMARY USES:
1. When carrier suggests repair instead of replacement
2. To show repair voids warranty
3. To demonstrate functional vs cosmetic damage
4. To prove slope replacement requirements

KEY DOCUMENTS:
- GAF Storm Damage Guidelines.pdf
- GAF Requirement - Slope Replacement.pdf
- GAF Master Elite Certificate (proves elite status)
- GAF Standard Warranty
- Golden Pledge Limited Warranty

REPAIR VOIDING ARGUMENT:
"GAF guidelines clearly state that removing one shingle breaks surrounding seals. Any patch repair voids the manufacturer warranty. The homeowner would lose all warranty coverage by attempting a repair."

SLOPE REPLACEMENT ARGUMENT:
"You can't replace only part of a slope without creating leak points and warranty issues. GAF requires full slope replacement when multiple shingles are damaged to maintain waterproof integrity."

STORM DAMAGE GUIDELINES:
- Granule loss = functional damage (not cosmetic)
- Fractures and bruising = warranty concerns
- Multiple shingles per plane = full replacement recommended
- Hail divots fill with water, freeze, expand, break shingle

WHEN TO PRESENT:
- Adjuster claims damage is cosmetic (Q575)
- Carrier suggests patch repair (Q515, Q521)
- Need to show functional damage (Q533, Q593)
- Explaining warranty to homeowner (Q543, Q597)

PRESENTATION FORMAT:
"GAF, our manufacturer, has written guidelines that state [specific requirement]. Attempting a repair would void the homeowner's warranty and create liability issues."

GAF MASTER ELITE STATUS:
- Top 2% of contractors nationwide
- Enhanced warranties available
- Direct manufacturer backing
- Quality assurance

Related: Q506, Q515, Q521, Q533, Q543, Q567, Q575, Q593, Q597
Documents: GAF Storm Damage Guidelines.pdf, GAF Requirement - Slope Replacement.pdf
```

---

#### Intent: `explain_itel_process`
**User Utterances:**
- "What is iTel?"
- "How do I get iTel report?"
- "Discontinued shingles proof"
- "When do I use iTel?"

**Entities:**
- `material_type`: [shingles, siding]
- `audience`: [homeowner, insurance]

**Response Content:**
```
iTel PROCESS & USAGE:

WHAT IS iTel:
"A lab test that proves if shingles are discontinued or unavailable. It's strong evidence for full slope replacement."

WHEN TO USE:
- Shingles are discontinued
- Shingles are unavailable
- Carrier insists on repair/patch
- Need proof for matching law argument

HOW TO EXPLAIN TO HOMEOWNER:
"iTel is a professional testing service that verifies whether your specific shingles are still manufactured and available. If they're discontinued or can't be sourced, it proves the insurance company must replace the entire slope rather than attempt a patch repair."

HOW TO PRESENT TO CARRIER:
"Attached is the iTel report confirming these shingles are discontinued/unavailable. Combined with supply house verification letters, this proves patch repair is impossible. Matching law requires full slope replacement."

PROCESS:
1. Identify shingle manufacturer and style
2. Contact supply houses for availability
3. Submit sample to iTel for testing
4. Receive iTel report (official documentation)
5. Use iTel Template to present findings
6. Attach Discontinued Shingle List

SUPPORTING DOCUMENTATION:
- iTel Template.docx
- Discontinued Shingle List.pdf
- Supply house verification letters
- Photos of manufacturer marks

ADDITIONAL ARGUMENTS:
- English vs Metric sizing differences
- Color lot variations
- Texture/profile changes
- Warranty implications

ESCALATION PATH:
If carrier denies iTel evidence:
→ Escalate with Discontinued Shingle List
→ Cite matching law requirements
→ Reference GAF warranty voiding
→ File complaint if refused

COST:
- Customer signs iTel Agreement
- "Never responsible for cost on agreement"
- Reimbursed by insurance if approved

Related: Q505, Q526, Q537, Q553, Q574, Q583
Documents: iTel Template.docx, Discontinued Shingle List.pdf
```

---

### **Category 6: Commission & Compensation**

#### Intent: `calculate_commission`
**User Utterances:**
- "How much commission will I make?"
- "What's my percentage?"
- "Commission tiers explained"
- "When do I get paid?"
- "Bonus calculation"

**Entities:**
- `month`: [march-october, november-february, december-january]
- `signups_count`: [number]
- `job_type`: [insurance, retail, solar]

**Response Content:**
```
COMMISSION STRUCTURE:

INSURANCE SALES (Primary):

DOWNPAYMENT COMMISSION:
- $1,000 flat (paid when homeowner submits ACV)
- Townhomes DON'T count unless:
  * Has aluminum siding, OR
  * Minimum 15 squares

COMPLETION COMMISSION (Tiered):

MARCH - OCTOBER:
- 10+ Sign-ups: 16% of job value
- 8-9 Sign-ups: 10% of job value
- Less than 8: 6% of job value

NOVEMBER - FEBRUARY:
- 8+ Sign-ups: 16% of job value
- Less than 8: 6% of job value

DECEMBER - JANUARY:
- 4+ Sign-ups: 16% of job value
- Less than 4: 6% of job value

FIRST 6 WEEKS:
- Automatic 16% regardless of volume
- After 6 weeks, must qualify for tier

RETAIL SALES:
- Downpayment: $0
- Completion: 2% of job value
- Solar: 2% of job value

MONTHLY BONUSES:
- 15 Sign-ups OR $200k revenue: $2,000
- 20 Sign-ups OR $250k revenue: $4,000
- 25 Sign-ups OR $300k revenue: $6,000
- 30 Sign-ups OR $350k revenue: $10,000
- 35 Sign-ups OR $400k revenue: $12,000
- 40 Sign-ups OR $450k revenue: $16,000

PRESIDENT'S CLUB:
- $2 million annual sales, OR
- $750k in 3 consecutive months
- Additional perks and recognition

PAYMENT TIMING:
1. Downpayment commission: When homeowner submits ACV
2. Completion commission: When homeowner submits Final Payment (Depreciation + Deductible)

DRAW POLICY:
- Bonuses paid toward negative draw first
- Exception: First 90 days can opt to receive bonus with negative draw

ADDITIONAL INCENTIVES:
- Monthly contests (watches, golf clubs, etc.)
- Event invitations
- Recognition programs

EXAMPLE CALCULATION:
Job value: $25,000
Month: April
Sign-ups this month: 12
Downpayment: $1,000 (paid at ACV submission)
Completion: $25,000 × 16% = $4,000 (paid at Final Payment)
Total commission: $5,000

Related: Slides 21-22
```

---

### **Category 7: Adjuster Meeting Protocol**

#### Intent: `prepare_adjuster_meeting`
**User Utterances:**
- "How do I prep for adjuster meeting?"
- "Adjuster meeting checklist"
- "What should I do before meeting?"
- "Do's and don'ts adjuster meeting"

**Entities:**
- `meeting_stage`: [before, during, after]
- `issue_type`: [hostile-adjuster, dismissive, normal]

**Response Content:**
```
ADJUSTER MEETING PROTOCOL:

BEFORE THE MEETING (1 day prior):
✓ Chalk metals (NOT shingles) day before
✓ Arrive 15-30 minutes early
✓ Confirm homeowner will be present (if interior damage)
✓ Avoid Tuesday mornings (Weekly Sales Meetings)
✓ Review all documentation
✓ Prepare photo report structure

GREETING THE ADJUSTER:
✓ Introduce yourself immediately
✓ Be professional and courteous
✓ State you represent the homeowner
✓ Build rapport

DURING THE MEETING:
DO's:
✓ Let homeowner know you'll wait for adjuster before starting
✓ Be confident and tactful
✓ Always be present when adjuster interacts with homeowner
✓ Offer assistance to adjuster
✓ Document adjuster's statements
✓ Stay respectful and factual

DON'Ts:
✗ Don't get on roof before adjuster arrives
✗ Don't be confrontational or argumentative
✗ Don't be a pushover (tactfully explain position)
✗ Don't start photo report during inspection (offer help instead)
✗ Don't take photos during inspection unless clear opportunity

IF ADJUSTER IS HOSTILE (Q529, Q556):
- Stay calm, never argue
- Stick to facts
- Don't interrupt
- Document hostility
- Report to Team Leader with photos and notes

IF ADJUSTER WON'T LOOK AT EVIDENCE (Q517):
- Stay professional
- Document refusal
- Escalate to Team Leader with full photo set

IF ADJUSTER DISMISSES YOU (Q552):
- Calmly explain you represent homeowner's interests
- Reference Claim Authorization
- Document dismissal

CLOSING THE MEETING (Q549, Q582):
✓ Summarize findings
✓ Confirm what was noted
✓ Document their statements
✓ Get timeline for decision

AFTER THE MEETING:
✓ Create formal Photo Report (portrait orientation)
✓ Submit Hover report
✓ Email Photo Report + Claim Auth to adjuster
✓ Use Post-AM Email Template
✓ CC homeowner on all communication
✓ Update CRM immediately
✓ Follow Post-AM Script with homeowner

OUTCOMES:
- Estimate Pending: Adjuster found matching damage
- Decision Pending: Desk adjuster will review

HOMEOWNER COMMUNICATION:
Use Post Adjuster Meeting Script based on outcome

FIELD TRAINING:
- Attend 2-3 adjuster meetings with field trainer first
- Have trainer assist with your first 2 meetings
- Inform trainer of all upcoming meetings

Related: Q512, Q517, Q529, Q549, Q552, Q556, Q582, Slides 67
Script: Post Adjuster Meeting Script.docx
Template: Post-AM Email Template
```

---

### **Category 8: Sales Cycle & Timeline**

#### Intent: `explain_sales_cycle`
**User Utterances:**
- "What's the sales cycle?"
- "How long does process take?"
- "Timeline from sign up to payment?"
- "When do I get paid?"
- "Installation timeline"

**Entities:**
- `stage`: [lead-gen, inspection, claim, adjuster, approval, project-meeting, install, final-payment]
- `timeline_question`: [total-time, specific-stage]

**Response Content:**
```
COMPLETE SALES CYCLE (9-16 Weeks):

STAGE 1: LEAD GENERATION (Ongoing)
Timeline: Daily activity
Activity: Door knocking (70+ doors/day minimum)
Tools: Field Portal App for pinning houses
Outcome: Inspection scheduled

STAGE 2: INITIAL INSPECTION (Week 0)
Timeline: 15-20 minutes
Activities:
- Perimeter damage documentation
- Roof inspection with ladder
- Collateral damage photos
- Hail/wind damage marking
Photos: Mailbox, 4 elevations, roof, damage close-ups, granules
Scripts: Initial Pitch → Post-Inspection Pitch
Outcome: Homeowner agrees to file claim

STAGE 3: CLAIM FILING (Week 0 - Same Day)
Timeline: Immediately after inspection
Activities:
- Collect homeowner info
- File claim (app/website/phone)
- Sign Contingency Agreement
- Sign Claim Authorization
Tools: Sales App (iPad)
Outcome: Claim filed, adjuster scheduled

STAGE 4: ADJUSTER MEETING (Week 1 - Days 2-7)
Timeline: Insurance schedules in 24-48 hours
Pre-Meeting: Arrive 15-30 min early, chalk metals
During: Walk roof with adjuster, present evidence
After: Create Photo Report, submit Hover
Outcomes:
- Estimate Pending (full approval path)
- Decision Pending (review path)
- Partial/Denial (escalation path)

STAGE 5A: FULL APPROVAL (Week 2-3)
Timeline: 1-10 business days for decision
Activities:
- Insurance generates estimate
- Insurance releases ACV payment
- Office reviews estimate
- Assigned to Project Coordinator
- Project Meeting scheduled
Rep Payment: $1,000 downpayment commission
Outcome: Project Meeting scheduled

STAGE 5B: PARTIAL/DENIAL (Week 2+)
Timeline: Variable (depends on escalation)
Activities:
- Template response selection
- Supplemental evidence submission
- Team Leader escalation
- Sales Manager escalation
- Complaint/Arbitration if needed
Outcome: Convert to approval or close

STAGE 6: PROJECT MEETING (Week 3-4)
Timeline: Within days of full approval
Conducted By: Project Coordinator
Activities:
- Review scope
- Product selection
- Sign Project Documents
- Submit ACV (downpayment)
- Schedule install (4-6 weeks out)
Outcome: Install scheduled

STAGE 7: INSTALLATION (Week 7-10)
Timeline: 4-6 weeks after downpayment
Activities:
- Production team installation
- Quality control
- Final walk-through
Tools: Trade Calendar tracking
Outcome: Installation complete

STAGE 8: WRAP UP & FINAL PAYMENT (Week 9-12)
Timeline: After installation complete
Activities:
- Quality Check meeting
- Sign Certificate of Completion
- Submit to insurance
- Insurance releases Depreciation
- Homeowner submits Final Payment (Depreciation + Deductible)
Rep Payment: Remaining 16% commission (if qualified)
Total Timeline: 9-16 weeks from knock to final payment

STAGE 9: POST-INSTALL (Ongoing)
Activities:
- Request referrals
- Place yard sign
- Request reviews
- Add to portfolio

PAYMENT TIMELINE:
- Rep receives $1,000: At downpayment (Week 3-4)
- Rep receives 16%: At final payment (Week 9-12)
- Total cycle: 9-16 weeks

Related: Slides 17-21
Average Ticket: $23k-$25k company average
```

---

### **Category 9: Field Operations**

#### Intent: `use_field_portal`
**User Utterances:**
- "How do I use Field Portal?"
- "Pin a house"
- "Upload photo report"
- "Check my metrics"
- "Message board help"

**Entities:**
- `feature`: [pinning, leads, photo-upload, tasks, messages, calendar, metrics]
- `platform`: [mobile, web]

**Response Content:**
```
FIELD PORTAL APP USAGE:

PLATFORMS:
- Mobile: iOS/Android (phone/iPad)
- Web: Desktop/Laptop (BEST for organization)

MOBILE FUNCTIONS:

1. PINNING HOUSES:
- Press arrow at top right (Leads page)
- Long press on map location
- Fill out available information
- Status field is REQUIRED (dropdown)
- Pin every house you knock

2. CREATING LEADS:
- Turn pin into lead ONLY when inspection scheduled
- Navigate to pinned house
- Convert to lead
- Add inspection date/time

3. JOB TRACKING:
View jobs by stage:
- Inspection Pending
- Estimate Pending
- Decision Pending
- Project Review
- Install Scheduled
- Wrap Up
- Complete

4. METRICS DASHBOARD:
- Sign-ups this month
- Revenue tracking
- Bonus progress
- Average ticket
- Conversion rates

5. PHOTO REPORT UPLOAD:
- Navigate to job
- Select "Upload Photo Report"
- Choose photos (portrait orientation)
- Organize by category
- Submit

6. HOVER APP LAUNCH:
- Select job
- Tap "Launch Hover"
- Follow measurement capture process
- Submit 3D report

7. EVENT SCHEDULING:
- Add adjuster meeting to calendar
- Integrates with Google Calendar
- CC homeowner on meeting invites
- Avoid Tuesday mornings

8. TASKS:
- View assigned tasks
- Complete and mark done
- Create new tasks
- Tag team members

9. MESSAGE BOARD:
- Job-specific communication
- Tag teammates/managers
- 2-WEEK RESPONSE DEADLINE or job reassigned
- Document all conversations

10. TRADE CALENDAR:
- View install schedules
- Track your jobs
- Coordinate with production

WEB FUNCTIONS (Preferred):
- Complete job overview
- Multi-job management
- Advanced filtering
- Document upload
- Better organization
- Reporting tools

BEST PRACTICES:
✓ Pin every house knocked
✓ Update CRM immediately after inspections
✓ Respond to messages within 2 weeks
✓ Complete tasks promptly
✓ Check daily for updates
✓ Use web version for organization

GETTING STARTED:
- Set up account with trainer
- Practice pinning on first day
- Upload first photo report with guidance
- Learn message board etiquette
- Understand job stages

Related: Slides 9-11, 64-66, 68
```

---

### **Category 10: Safety & Compliance**

#### Intent: `safety_protocols`
**User Utterances:**
- "What safety equipment do I need?"
- "Is this roof safe?"
- "Ladder safety"
- "Cougar Paws required?"
- "What if roof is unsafe?"

**Entities:**
- `equipment_type`: [cougar-paws, bungee, pitch-hopper, harness]
- `situation`: [steep-roof, wet-roof, damaged-roof, high-roof]

**Response Content:**
```
SAFETY PROTOCOLS:

#1 RULE:
"If you do not feel safe, DO NOT DO THE INSPECTION"

MANDATORY EQUIPMENT (Priority Order):
1. COUGAR PAWS - Get this before anything else
   - Grip soles for roof traction
   - Essential for safety
   - Required for all inspections

2. BUNGEE CORDS
   - Ladder stability
   - Secure ladder to house

3. PITCH HOPPER
   - Steep roof safety
   - Prevents sliding

4. OTHER ITEMS
   - Harness (if required for height/pitch)
   - Additional safety gear
   - Discuss with trainer

LADDER SAFETY:
✓ Always ensure ladder is safely placed
✓ Use bungee cords to secure
✓ Check stability before climbing
✓ Extend 3 feet above roof line
✓ Never lean ladder against gutters
✓ Maintain 3-point contact

ROOF ASSESSMENT:
Consider these safety factors:
- Pitch/slope steepness
- Wet or icy conditions
- Damaged/rotten decking
- Height of building
- Age and condition of roof
- Weather conditions

UNSAFE ROOF PROTOCOL:
If roof is unsafe:
1. DO NOT CLIMB
2. Document from ground
3. Take ground-level photos
4. Escalate to Team Leader for direction
5. Explain to homeowner safety concerns

ADJUSTER MEETING SAFETY:
- Don't get on roof before adjuster arrives
- Wait for adjuster/ladder assist
- Coordinate safety approach
- Use their ladder assist if provided

WEATHER CONSIDERATIONS:
✗ Don't inspect in rain
✗ Don't inspect on ice/snow
✗ Don't inspect in high winds
✗ Don't inspect in extreme heat without breaks

INJURY PROTOCOL:
If injured:
1. Stop work immediately
2. Seek medical attention
3. Report to Team Leader/Manager
4. File incident report
5. Contact Worker's Comp (certificate required)

HOMEOWNER PROPERTY:
- Respect property boundaries
- Don't damage landscaping
- Close gates
- Clean up any mess
- Report any damage caused

LEGAL COMPLIANCE:
✓ Worker's Comp certificate required
✓ Submit to Oliver
✓ Call Worker's Comp to activate
✓ Keep certificate on file

TRAINING REQUIREMENT:
- Practice ladder placement with trainer
- Shadow safe roof inspections
- Get cleared for solo inspections
- Ask questions about safety concerns

Related: Slide 18, Q557
Documents: COI - workers comp 2026.pdf
```

---

## Entity Definitions

### **State Entities**
```
@state
- maryland
- virginia
- pennsylvania
- district-of-columbia
- dmv (District/Maryland/Virginia)
```

### **Damage Type Entities**
```
@damage_type
- hail
- wind
- collateral
- siding
- gutter
- screen
- downspout
- metal
- granule-loss
```

### **Template Type Entities**
```
@template_type
- generic-partial
- siding-argument
- itel
- repair-attempt
- estimate-request
- post-am-email
- customer-to-insurance
- photo-report
- gaf-guidelines
- complaint-form
```

### **Escalation Level Entities**
```
@escalation_level
- self
- teammate
- team-leader
- sales-manager
- complaint
- arbitration
```

### **Job Stage Entities**
```
@job_stage
- lead
- inspection-pending
- estimate-pending
- decision-pending
- partial
- denial
- project-review
- install-scheduled
- complete
```

### **Document Type Entities**
```
@document_type
- contingency
- claim-authorization
- itel-agreement
- repair-attempt-agreement
- tarp-agreement
- photo-report
- hover-report
```

### **Script Type Entities**
```
@script_type
- initial-pitch
- post-inspection
- contingency
- post-adjuster-meeting
- full-approval-call
```

### **Month/Season Entities**
```
@season
- march-october (peak)
- november-february (off-peak)
- december-january (winter)
```

### **Commission Tier Entities**
```
@commission_tier
- 16-percent
- 10-percent
- 6-percent
- 2-percent (retail)
```

---

## Conversation Flow Examples

### **Example 1: New Rep - First Day**
```
User: "What do I need to memorize first?"

Bot: "Great question! For Day 1, focus on these priorities:

1. INITIAL PITCH (Non-Storm Environment) - Must be completely memorized
   - The 5 Non-Negotiables
   - Complete script from introduction to close

2. INSPECTION PHOTO SEQUENCE - Know the order
   - Mailbox → Overview → 4 Elevations → Roof → Damage

3. SAFETY RULES
   - If unsafe, don't inspect
   - Cougar Paws required

Would you like me to show you the full Initial Pitch script?"

User: "Yes show me the pitch"

Bot: [Displays Initial Pitch script from Intent: get_initial_pitch_script]

User: "What if they say not interested?"

Bot: [Displays objection handling from Intent: handle_objection]
```

### **Example 2: Partial Approval Scenario**
```
User: "Just got a partial - only approved 2 of 4 slopes"

Bot: "I'll help you turn this around. Let me ask a few questions:

1. What items were approved?
2. What items were denied?
3. Do you have complete photo documentation of all slopes?"

User: "Front and right approved, rear and left denied. Yes I have all photos"

Bot: "Perfect. Here's your action plan:

TEMPLATE TO USE: Generic Partial Template

REQUIRED ATTACHMENTS:
✓ Your photo documentation of denied slopes
✓ Roof-ER estimate showing all 4 slopes
✓ Photo Report showing damage consistency

ARGUMENT:
'Damage is consistent across all slopes. Attached photos show identical hail impacts on rear and left slopes. Partial replacement creates warranty void and mismatched appearance.'

NEXT STEPS:
1. Submit Generic Partial Template with attachments
2. Reference specific photo numbers showing damage
3. If no response in 1 week, follow up
4. If denied again after 2 weeks, escalate to Team Leader

Would you like me to show you the template or help with the specific wording?"

[Provides template selection details from Intent: select_template]
[Shows escalation guidance from Intent: determine_escalation_level]
```

### **Example 3: Homeowner Question**
```
User: "Homeowner asking why they have to pay anything"

Bot: "This is about the deductible. Here's exactly how to explain it:

INITIAL RESPONSE:
'The deductible is required by law. It's your legal responsibility by state insurance law.'

POSITIVE FRAMING:
'Think of it as your investment in protecting and restoring the value of your home.'

TIMING EXPLANATION:
'The good news is you don't pay it until after the work is complete. The insurance company sends two payments:
1. First payment (ACV) - Used as downpayment with us
2. Second payment (Depreciation) - Released after installation
Your final payment = Depreciation + Deductible'

CONTINGENCY REASSURANCE:
'Remember, your only cost is the deductible IF we get you fully approved. If we can't get full approval, the contract is void and you owe nothing.'

This should address their concern. If they're still hesitant, emphasize that insurance covers everything else - the deductible is their only out-of-pocket cost.

Need help with any other homeowner objections?"

[Provides deductible explanation from Intent: explain_deductible]
```

---

## Quick Reference Keywords

### **For Rapid Intent Matching:**
```
Initial Pitch → "pitch", "door", "knock", "introduce", "5 non-negotiables"
Inspection → "photos", "checklist", "inspection", "how many", "order"
Objections → "not interested", "no time", "good shape", "objection"
Templates → "which template", "partial", "denial", "what do I use"
Escalation → "escalate", "team leader", "sales manager", "complaint", "arbitration"
Deductible → "cost", "pay", "deductible", "homeowner asking"
Contingency → "agreement", "contract", "sign", "contingency"
Adjuster → "meeting", "adjuster", "prep", "dos and donts"
Commission → "pay", "commission", "percentage", "tier", "bonus"
Safety → "safe", "unsafe", "ladder", "cougar paws", "equipment"
iTel → "discontinued", "unavailable", "itel", "shingles not available"
Matching Law → "matching", "uniform", "color", "maryland law"
GAF → "warranty", "manufacturer", "gaf guidelines", "void warranty"
Photo Report → "photo report", "portrait", "landscape", "how to create"
Field Portal → "app", "pin", "upload", "portal", "message board"
Sales Cycle → "timeline", "how long", "when paid", "process", "stages"
```

---

## Training Scenario Tags (Q501-Q600)

### **Searchable by Topic:**
```
ESCALATION: Q501, Q502, Q507, Q517, Q545, Q566, Q570
DOCUMENTATION: Q503, Q507, Q510, Q511, Q546, Q560, Q594
TEMPLATES: Q504, Q505, Q514, Q527, Q540, Q559, Q596
HOMEOWNER COMMUNICATION: Q508, Q516, Q525, Q534, Q543, Q554, Q561, Q569
ADJUSTER INTERACTIONS: Q512, Q517, Q520, Q529, Q536, Q549, Q556, Q584
CODES & LAWS: Q508, Q513, Q530, Q531, Q538, Q541, Q548, Q565, Q577, Q589
GAF/MANUFACTURER: Q506, Q515, Q521, Q533, Q543, Q567, Q575, Q593, Q597
ITEL/DISCONTINUED: Q505, Q526, Q537, Q553, Q574, Q579, Q583
SIDING: Q518, Q531, Q538, Q558, Q579, Q585
REPAIR ATTEMPTS: Q504, Q522, Q546, Q562, Q599
FLASHING: Q528, Q563, Q572, Q580
COMPLAINTS/ARBITRATION: Q509, Q519, Q527, Q542, Q554, Q564, Q570, Q586, Q590
PHOTOS: Q503, Q511, Q532, Q551, Q568, Q594, Q595
SAFETY: Q557
PROFESSIONALISM: Q520, Q529, Q552, Q556, Q582, Q584
PARTIAL/DENIAL: Q539, Q575, Q592
```

---

## Integration Checklist

### **Phase 1: Core Intents (Priority)**
- [ ] get_initial_pitch_script
- [ ] handle_objection
- [ ] get_inspection_checklist
- [ ] select_template
- [ ] determine_escalation_level
- [ ] explain_deductible
- [ ] explain_contingency_agreement
- [ ] calculate_commission

### **Phase 2: Advanced Intents**
- [ ] create_photo_report
- [ ] prepare_adjuster_meeting
- [ ] explain_sales_cycle
- [ ] handle_partial_approval
- [ ] use_field_portal
- [ ] safety_protocols

### **Phase 3: Technical Knowledge**
- [ ] explain_matching_law
- [ ] explain_gaf_guidelines
- [ ] explain_itel_process
- [ ] explain_code_requirements
- [ ] explain_warranty_voiding

### **Phase 4: Scenario Search**
- [ ] Q501-Q600 database integration
- [ ] Keyword search across scenarios
- [ ] Related scenario suggestions
- [ ] Quick Strike Guide integration

---

**Document Version:** 1.0
**Last Updated:** October 10, 2025
**Total Intents Mapped:** 20+ core intents
**Total Scenarios Available:** 600+ (Q501-Q600)
**Total Templates Referenced:** 30+
**Total Scripts Available:** 12+

**File Locations:**
- Training Analysis: /Users/a21/Desktop/Training Leaders Main/Agnes21_Training_Analysis_Report.md
- Scenario Database: /Users/a21/Desktop/Training Leaders Main/training_scenarios_database.json
- Source Materials: /Users/a21/Desktop/Ages21_Chatbot_Creation (1)/
