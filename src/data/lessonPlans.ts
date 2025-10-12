export interface LessonSection {
  id: string;
  title: string;
  content: string;
  duration: string;
  type:
    | 'video'
    | 'reading'
    | 'interactive'
    | 'quiz'
    | 'hands-on'
    | 'discussion';
  objectives: string[];
  resources: string[];
  assessmentCriteria: string[];
}

export interface LessonPlan {
  moduleId: string;
  title: string;
  description: string;
  totalDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  learningOutcomes: string[];
  sections: LessonSection[];
  assignments: Assignment[];
  assessments: Assessment[];
  additionalResources: Resource[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  type: 'practical' | 'written' | 'research' | 'presentation';
  estimatedTime: string;
  submissionFormat: string;
  gradingCriteria: string[];
  dueDate?: string;
}

export interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'practical_exam' | 'project' | 'peer_review';
  questions: Question[];
  passingScore: number;
  timeLimit?: string;
  retakePolicy: string;
}

export interface Question {
  id: string;
  question: string;
  type:
    | 'multiple_choice'
    | 'true_false'
    | 'short_answer'
    | 'essay'
    | 'practical';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'website' | 'tool' | 'reference';
  url: string;
  description: string;
  isRequired: boolean;
}

export const completeLessonPlans: Record<string, LessonPlan> = {
  module1: {
    moduleId: 'module1',
    title: 'Foundation & Company Culture',
    description:
      'Comprehensive introduction to RoofER company culture, roofing industry fundamentals, and professional development pathways.',
    totalDuration: '4 hours',
    difficulty: 'Beginner',
    prerequisites: [],
    learningOutcomes: [
      'Understand RoofER company history, values, and mission',
      'Identify career advancement opportunities in roofing',
      'Demonstrate professional conduct and communication skills',
      'Recognize the importance of teamwork and collaboration',
      'Understand industry safety culture and its importance',
    ],
    sections: [
      {
        id: 'welcome',
        title: 'Welcome to RoofER',
        content: `Welcome to the RoofER family! For over 15 years, RoofER has been the premier roofing company in our region, built on a foundation of excellence, integrity, and unwavering commitment to safety.

**Our Story**
Founded in 2009 by master roofer John Matthews, RoofER began as a small family business with a simple mission: provide exceptional roofing services while prioritizing worker safety and customer satisfaction. What started as a two-person operation has grown into a team of over 50 skilled professionals.

**Our Mission**
To protect homes and businesses with superior roofing solutions while creating a safe, rewarding work environment for our team members and delivering exceptional value to our customers.

**Our Values**
1. **Safety First** - Every decision we make prioritizes the safety of our team members, customers, and community
2. **Quality Craftsmanship** - We take pride in our work and never compromise on quality
3. **Integrity** - We do what we say we'll do, when we say we'll do it
4. **Continuous Learning** - We invest in our people through ongoing training and development
5. **Community Focus** - We give back to the communities we serve

**What Makes RoofER Special**
- Zero tolerance policy for safety violations
- Comprehensive training and certification programs
- Clear advancement pathways for all employees
- Competitive compensation and benefits
- Family-oriented company culture
- Investment in latest tools and technology`,
        duration: '30 minutes',
        type: 'reading',
        objectives: [
          "Learn about RoofER's history and founding principles",
          'Understand company mission and core values',
          'Identify what differentiates RoofER from competitors',
        ],
        resources: [
          'Company handbook',
          "Founder's welcome video",
          'Employee testimonials',
        ],
        assessmentCriteria: [
          'Can articulate company mission and values',
          'Understands company history and growth',
          'Recognizes unique aspects of RoofER culture',
        ],
      },
      {
        id: 'industry-overview',
        title: 'Roofing Industry Overview',
        content: `The roofing industry is a vital sector of the construction industry, generating over $50 billion annually in the United States alone. Understanding the industry landscape is crucial for your success.

**Industry Statistics**
- Market size: $52.3 billion (2023)
- Annual growth rate: 3.2%
- Total workforce: 467,000+ professionals
- Average project value: $8,500 - $24,000 for residential

**Types of Roofing Work**
1. **Residential Roofing** (60% of market)
   - Single-family homes
   - Multi-family dwellings
   - Townhouses and condos

2. **Commercial Roofing** (35% of market)
   - Office buildings
   - Retail centers
   - Industrial facilities
   - Warehouses

3. **Specialty Roofing** (5% of market)
   - Historic restoration
   - Green roofing systems
   - Solar integration

**Market Drivers**
- Aging housing stock requiring replacement
- Severe weather events increasing repair needs
- Energy efficiency improvements
- Building code updates
- Population growth in sunbelt states

**Industry Challenges**
- Labor shortage (15% unfilled positions)
- Safety risks and regulations
- Weather-dependent scheduling
- Material cost volatility
- Technology adoption lag

**Opportunities for Growth**
- Sustainable roofing solutions
- Smart home integration
- Preventive maintenance programs
- Commercial retrofit projects
- Storm restoration services`,
        duration: '45 minutes',
        type: 'video',
        objectives: [
          'Understand the size and scope of the roofing industry',
          'Identify different market segments and opportunities',
          'Recognize industry challenges and trends',
        ],
        resources: [
          'Industry statistics presentation',
          'Market trend analysis',
          'Professional association materials',
        ],
        assessmentCriteria: [
          'Can describe industry size and growth trends',
          'Identifies different types of roofing work',
          'Understands market drivers and challenges',
        ],
      },
      {
        id: 'career-paths',
        title: 'Career Development Pathways',
        content: `RoofER believes in promoting from within and providing clear advancement opportunities for all team members. Your career journey can take many paths based on your interests, skills, and goals.

**Entry-Level Positions**
1. **Roofing Helper/Laborer**
   - Starting salary: $18-22/hour
   - Responsibilities: Material handling, site cleanup, basic tasks
   - Duration: 3-6 months
   - Skills developed: Safety awareness, tool familiarity, work ethic

2. **Apprentice Roofer**
   - Salary: $22-28/hour
   - Responsibilities: Learning installation techniques, quality control
   - Duration: 12-24 months
   - Skills developed: Technical skills, customer interaction, problem-solving

**Intermediate Positions**
3. **Journeyman Roofer**
   - Salary: $28-35/hour
   - Responsibilities: Independent work, training apprentices, quality assurance
   - Requirements: 2+ years experience, safety certifications
   - Skills: All roofing techniques, leadership basics, customer service

4. **Lead Roofer**
   - Salary: $32-40/hour
   - Responsibilities: Crew leadership, project planning, client communication
   - Requirements: 3+ years experience, leadership training
   - Skills: Team management, project coordination, advanced techniques

**Advanced Positions**
5. **Project Supervisor**
   - Salary: $45,000-65,000/year
   - Responsibilities: Multi-crew oversight, scheduling, quality control
   - Requirements: 5+ years experience, management training
   - Skills: Project management, resource allocation, problem resolution

6. **Sales Representative**
   - Salary: $50,000-85,000/year + commission
   - Responsibilities: Customer consultations, estimates, closing sales
   - Requirements: Strong communication skills, technical knowledge
   - Skills: Sales techniques, customer relationship management, technical expertise

**Management Positions**
7. **Operations Manager**
   - Salary: $65,000-90,000/year
   - Responsibilities: Department oversight, strategic planning, performance management
   - Requirements: Bachelor's degree or equivalent experience, leadership experience
   - Skills: Strategic thinking, financial management, team development

8. **Business Owner/Franchisee**
   - Income: Variable (business dependent)
   - Responsibilities: All business operations, strategic planning, growth management
   - Requirements: Business license, insurance, significant experience
   - Skills: Entrepreneurship, financial management, marketing

**Professional Development Support**
- Tuition reimbursement for relevant courses
- Paid time off for training and certification
- Mentorship programs with senior staff
- Regular performance reviews and goal setting
- Internal job posting system
- Cross-training opportunities`,
        duration: '40 minutes',
        type: 'interactive',
        objectives: [
          'Identify potential career paths within the roofing industry',
          'Understand requirements and timelines for advancement',
          'Recognize available professional development resources',
        ],
        resources: [
          'Career pathway diagram',
          'Employee success stories',
          'Professional development catalog',
        ],
        assessmentCriteria: [
          'Can outline potential career progression paths',
          'Understands requirements for each level',
          'Identifies available development resources',
        ],
      },
      {
        id: 'professional-standards',
        title: 'Professional Conduct and Communication',
        content: `Professional conduct is the foundation of our reputation and success. Every interaction you have reflects on the RoofER brand and influences our customers' perception of our company.

**Professional Appearance Standards**
1. **Uniform Requirements**
   - Clean RoofER company shirts (provided)
   - Proper work pants (jeans or work pants, no tears or stains)
   - Safety boots (steel toe required, company reimbursement available)
   - Clean appearance and good personal hygiene

2. **Personal Protective Equipment (PPE)**
   - Hard hat with RoofER logo
   - Safety glasses (prescription available)
   - Work gloves appropriate for task
   - Fall protection harness when required

3. **Vehicle and Tool Standards**
   - Company vehicles kept clean inside and out
   - Tools organized and well-maintained
   - Personal vehicles representing company must be presentable

**Communication Excellence**
1. **Customer Interactions**
   - Greet customers professionally and courteously
   - Introduce yourself and explain your role
   - Ask permission before entering property
   - Keep customers informed of progress
   - Address concerns promptly and honestly

2. **Team Communication**
   - Be respectful and supportive of colleagues
   - Communicate openly about challenges or concerns
   - Offer help to team members when needed
   - Participate actively in team meetings

3. **Phone and Digital Communication**
   - Answer company phone professionally: "RoofER, this is [your name], how can I help you?"
   - Return calls and messages promptly (within 4 hours)
   - Use proper spelling and grammar in written communications
   - Maintain professional social media presence

**Time Management and Reliability**
1. **Punctuality**
   - Arrive at work 15 minutes before scheduled start time
   - Be ready to work when shift begins
   - Return from breaks and lunch on time
   - Complete assigned tasks within reasonable timeframes

2. **Attendance**
   - Maintain excellent attendance record
   - Notify supervisor as soon as possible if unable to work
   - Arrange coverage for planned absences well in advance
   - Understand impact of absences on team and customers

**Workplace Behavior**
1. **Respect and Inclusion**
   - Treat all people with dignity and respect
   - Embrace diversity and different perspectives
   - Avoid discriminatory language or behavior
   - Support company's equal opportunity policies

2. **Professional Boundaries**
   - Maintain appropriate relationships with customers
   - Avoid discussing personal problems at work
   - Respect company property and resources
   - Follow all company policies and procedures

3. **Conflict Resolution**
   - Address conflicts directly but respectfully
   - Seek supervisor assistance when needed
   - Focus on solutions rather than blame
   - Maintain professional demeanor during disagreements`,
        duration: '35 minutes',
        type: 'discussion',
        objectives: [
          'Understand professional appearance and behavior standards',
          'Learn effective communication techniques',
          'Practice conflict resolution strategies',
        ],
        resources: [
          'Employee handbook',
          'Communication guidelines',
          'Conflict resolution flowchart',
        ],
        assessmentCriteria: [
          'Demonstrates understanding of appearance standards',
          'Shows effective communication skills',
          'Can apply conflict resolution principles',
        ],
      },
      {
        id: 'teamwork-collaboration',
        title: 'Teamwork and Collaboration',
        content: `Roofing is inherently a team sport. Success depends on effective collaboration, clear communication, and mutual support among team members.

**The Power of Teamwork in Roofing**
Roofing projects require coordination between multiple trades and team members:
- Roofers working on different sections must coordinate their efforts
- Materials must be managed and distributed efficiently
- Safety spotters ensure everyone works safely
- Quality control requires multiple sets of eyes
- Customer service is a team responsibility

**Team Roles and Responsibilities**
1. **Crew Leader**
   - Overall project coordination
   - Work assignment and scheduling
   - Quality control and safety oversight
   - Primary customer communication
   - Problem-solving and decision making

2. **Experienced Roofers**
   - Technical expertise and installation
   - Training and mentoring newer team members
   - Quality assurance and problem identification
   - Equipment operation and maintenance

3. **Apprentices and Helpers**
   - Eager learning and skill development
   - Material handling and site preparation
   - Support for experienced team members
   - Attention to detail and safety protocols

**Effective Collaboration Strategies**
1. **Communication**
   - Morning briefings to review day's objectives
   - Regular check-ins throughout the day
   - Clear, specific instructions and feedback
   - Open discussion of challenges and solutions

2. **Coordination**
   - Work sequences planned to maximize efficiency
   - Material staging and logistics coordination
   - Tool sharing and equipment management
   - Synchronized break and lunch schedules

3. **Mutual Support**
   - Helping teammates with challenging tasks
   - Sharing knowledge and techniques
   - Covering for teammates when needed
   - Celebrating team successes together

**Team Problem-Solving Process**
1. **Identify the Problem**
   - What exactly is the issue?
   - Who is affected?
   - What are the potential consequences?

2. **Gather Information**
   - What do we know about the situation?
   - What resources are available?
   - Who has relevant expertise?

3. **Generate Solutions**
   - Brainstorm multiple options
   - Consider pros and cons of each
   - Think creatively about alternatives

4. **Implement and Monitor**
   - Choose the best solution
   - Assign roles and responsibilities
   - Monitor results and adjust as needed

**Building Team Trust**
- Be reliable and follow through on commitments
- Admit mistakes and learn from them
- Give credit where credit is due
- Support team decisions even if you initially disagreed
- Maintain confidentiality when appropriate

**Dealing with Team Conflicts**
1. **Address Issues Early**
   - Don't let small problems become big ones
   - Speak directly with the person involved
   - Focus on behaviors, not personality traits

2. **Seek Understanding**
   - Listen to different perspectives
   - Try to understand underlying concerns
   - Look for common ground and shared goals

3. **Work Toward Solutions**
   - Focus on what can be changed
   - Develop specific action plans
   - Involve supervisor if needed for resolution`,
        duration: '30 minutes',
        type: 'interactive',
        objectives: [
          'Understand the importance of teamwork in roofing',
          'Learn effective collaboration strategies',
          'Practice team problem-solving techniques',
        ],
        resources: [
          'Teamwork assessment tools',
          'Collaboration best practices guide',
          'Team building activities',
        ],
        assessmentCriteria: [
          'Can describe team roles and responsibilities',
          'Demonstrates effective collaboration skills',
          'Shows understanding of conflict resolution',
        ],
      },
    ],
    assignments: [
      {
        id: 'company-research',
        title: 'Company Culture Research Project',
        description:
          'Interview a senior team member about their career journey at RoofER and create a presentation about your findings.',
        type: 'presentation',
        estimatedTime: '2 hours',
        submissionFormat: '10-minute presentation with visual aids',
        gradingCriteria: [
          'Thorough preparation and research',
          'Clear presentation structure',
          'Insightful questions and analysis',
          'Professional delivery',
        ],
      },
      {
        id: 'career-planning',
        title: 'Personal Career Development Plan',
        description:
          'Create a 3-year career development plan outlining your goals, required skills, and action steps.',
        type: 'written',
        estimatedTime: '1.5 hours',
        submissionFormat: 'Written plan with timeline and milestones',
        gradingCriteria: [
          'Realistic and specific goals',
          'Clear action steps and timelines',
          'Understanding of skill requirements',
          'Connection to company opportunities',
        ],
      },
    ],
    assessments: [
      {
        id: 'module1-quiz',
        title: 'Foundation Knowledge Assessment',
        type: 'quiz',
        passingScore: 80,
        timeLimit: '30 minutes',
        retakePolicy: 'Unlimited retakes after 24 hours',
        questions: [
          {
            id: 'q1',
            question: 'What year was RoofER founded?',
            type: 'multiple_choice',
            options: ['2007', '2009', '2011', '2013'],
            correctAnswer: '2009',
            explanation:
              'RoofER was founded in 2009 by master roofer John Matthews.',
            points: 5,
            difficulty: 'easy',
          },
          {
            id: 'q2',
            question:
              "Which of the following is NOT one of RoofER's core values?",
            type: 'multiple_choice',
            options: [
              'Safety First',
              'Quality Craftsmanship',
              'Profit Maximization',
              'Integrity',
            ],
            correctAnswer: 'Profit Maximization',
            explanation:
              "RoofER's core values are Safety First, Quality Craftsmanship, Integrity, Continuous Learning, and Community Focus.",
            points: 10,
            difficulty: 'medium',
          },
          {
            id: 'q3',
            question:
              'The roofing industry generates approximately how much revenue annually in the US?',
            type: 'multiple_choice',
            options: [
              '$25 billion',
              '$50 billion',
              '$75 billion',
              '$100 billion',
            ],
            correctAnswer: '$50 billion',
            explanation:
              'The roofing industry generates over $50 billion annually in the United States.',
            points: 10,
            difficulty: 'medium',
          },
          {
            id: 'q4',
            question:
              'What is the typical career progression path from entry level to management?',
            type: 'short_answer',
            correctAnswer: [
              'Helper/Laborer → Apprentice → Journeyman → Lead Roofer → Supervisor → Manager',
            ],
            explanation:
              'The typical progression follows a clear path with increasing responsibility and skill requirements.',
            points: 15,
            difficulty: 'hard',
          },
          {
            id: 'q5',
            question:
              'Professional appearance is important because it reflects on the company brand.',
            type: 'true_false',
            correctAnswer: 'true',
            explanation:
              'Every team member represents the RoofER brand, and professional appearance is crucial for maintaining our reputation.',
            points: 5,
            difficulty: 'easy',
          },
        ],
      },
    ],
    additionalResources: [
      {
        id: 'employee-handbook',
        title: 'RoofER Employee Handbook',
        type: 'document',
        url: '/resources/employee-handbook.pdf',
        description:
          'Complete guide to company policies, procedures, and expectations',
        isRequired: true,
      },
      {
        id: 'industry-association',
        title: 'National Roofing Contractors Association',
        type: 'website',
        url: 'https://www.nrca.net',
        description:
          'Professional association with industry news, training, and resources',
        isRequired: false,
      },
      {
        id: 'company-video',
        title: 'Meet the RoofER Team',
        type: 'video',
        url: '/resources/company-intro-video.mp4',
        description: 'Introduction to key team members and company culture',
        isRequired: true,
      },
    ],
  },

  module2: {
    moduleId: 'module2',
    title: 'Safety Protocols & Best Practices',
    description:
      'Comprehensive safety training covering OSHA requirements, fall protection systems, hazard identification, and emergency procedures.',
    totalDuration: '8 hours',
    difficulty: 'Beginner',
    prerequisites: ['Module 1 completion'],
    learningOutcomes: [
      'Understand OSHA safety regulations for roofing work',
      'Properly inspect and use personal fall protection equipment',
      'Identify and mitigate common roofing hazards',
      'Implement ladder safety and proper positioning techniques',
      'Execute emergency response procedures',
      'Conduct effective safety meetings and training',
    ],
    sections: [
      {
        id: 'osha-overview',
        title: 'OSHA Regulations and Compliance',
        content: `The Occupational Safety and Health Administration (OSHA) sets and enforces safety standards to protect workers. Understanding and following OSHA regulations is not just required by law—it saves lives.

**OSHA's Role in Construction Safety**
- Established in 1970 to ensure safe working conditions
- Construction accounts for 20% of workplace fatalities
- Falls are the leading cause of construction deaths (33.5%)
- Roofing has one of the highest injury rates in construction

**Key OSHA Standards for Roofing (29 CFR 1926)**
1. **Subpart M - Fall Protection (1926.501)**
   - Fall protection required at 6 feet or greater
   - Covers residential and commercial construction
   - Specifies acceptable protection systems

2. **Subpart X - Ladders and Stairways (1926.1053)**
   - Ladder inspection requirements
   - Proper ladder setup and use
   - Maximum ladder angles and heights

3. **Subpart E - Personal Protective Equipment (1926.95)**
   - Head protection requirements
   - Eye and face protection standards
   - Foot protection specifications

**The General Duty Clause (Section 5(a)(1))**
Requires employers to provide a workplace "free from recognized hazards" even if no specific OSHA standard exists.

**OSHA Inspection Process**
1. **Opening Conference**
   - OSHA explains reason for inspection
   - Review of safety programs and records
   - Employee representative participation

2. **Walkaround Inspection**
   - Physical examination of workplace
   - Employee interviews
   - Documentation of conditions

3. **Closing Conference**
   - Discussion of observed hazards
   - Explanation of citations and penalties
   - Abatement requirements

**Types of OSHA Violations**
1. **Willful** - Intentional or knowing violation ($15,625-$156,259)
2. **Serious** - Substantial probability of serious harm ($15,625 max)
3. **Other-than-Serious** - Unlikely to cause serious harm ($15,625 max)
4. **Repeated** - Same violation found again ($156,259 max)

**Employer Responsibilities**
- Provide safe working conditions
- Train employees on safety procedures
- Provide required safety equipment at no cost
- Keep records of injuries and illnesses
- Display OSHA poster in workplace
- Not retaliate against workers who report hazards

**Employee Rights and Responsibilities**
**Rights:**
- Safe workplace free from hazards
- Information about chemical hazards
- Training on safety procedures
- File complaints with OSHA
- Protection from retaliation

**Responsibilities:**
- Follow safety rules and procedures
- Use provided safety equipment properly
- Report hazardous conditions
- Cooperate with OSHA inspections`,
        duration: '60 minutes',
        type: 'video',
        objectives: [
          "Understand OSHA's role in workplace safety",
          'Learn key OSHA standards applicable to roofing',
          'Recognize employer and employee responsibilities',
        ],
        resources: [
          'OSHA 1926 Construction Standards',
          'Fall Protection Quick Reference Card',
          'OSHA Inspection Process Guide',
        ],
        assessmentCriteria: [
          'Can identify key OSHA standards for roofing',
          'Understands inspection process and violations',
          'Recognizes rights and responsibilities',
        ],
      },
      {
        id: 'fall-protection',
        title: 'Personal Fall Protection Systems',
        content: `Fall protection is the most critical safety system in roofing. Proper selection, inspection, and use of fall protection equipment can mean the difference between life and death.

**Types of Fall Protection Systems**
1. **Guardrail Systems**
   - Top rail: 42" ± 3" above walking surface
   - Mid rail: Halfway between top rail and surface
   - Posts: Maximum 8 feet spacing
   - Capable of withstanding 200 lbs force

2. **Safety Net Systems**
   - Must be within 30 feet of working surface
   - Minimum breaking strength of 5,000 lbs
   - Drop tested before use
   - Inspected weekly for damage

3. **Personal Fall Arrest Systems (PFAS)**
   - Full-body harness
   - Shock-absorbing lanyard or self-retracting lifeline
   - Anchorage point (5,000 lb minimum strength)

**Personal Fall Arrest System Components**

**Full-Body Harness**
- Distributes fall forces over thighs, waist, chest, and shoulders
- Must fit properly (no more than 4" of webbing adjustability)
- D-ring positioned between shoulder blades
- Sub-pelvic straps prevent falling out of harness

**Connecting Components**
1. **Shock-Absorbing Lanyards**
   - Reduce fall arrest forces to under 1,800 lbs
   - Maximum length: 6 feet
   - Tear-out pack absorbs energy
   - Single or double leg configurations

2. **Self-Retracting Lifelines (SRLs)**
   - Allow freedom of movement
   - Automatically adjust to worker position
   - Lock within 2 feet of fall
   - Web or cable types available

3. **Rope Grabs**
   - Move freely up/down vertical lifeline
   - Lock when sudden force applied
   - Must be used with proper rope
   - Regular inspection critical

**Anchorage Systems**
1. **Structural Anchorages**
   - Permanent building attachments
   - Engineered for 5,000 lb load minimum
   - Examples: structural steel, concrete inserts

2. **Temporary Anchorages**
   - Installed for specific project
   - Must meet 5,000 lb requirement
   - Examples: roof anchors, beam clamps

**Fall Protection Inspection Requirements**

**Before Each Use (Daily)**
- Visual inspection of all components
- Check for cuts, burns, chemical damage
- Verify proper hardware function
- Remove damaged equipment from service

**Formal Inspection (Annual)**
- Conducted by competent person
- Detailed examination of all components
- Written documentation required
- Equipment tagging system

**Inspection Checklist Items**
- Webbing condition (no cuts, burns, fraying)
- Hardware function (snap hooks, D-rings)
- Stitching integrity
- Label legibility
- Metal component condition

**Proper Donning Procedures**
1. Check harness for proper size and condition
2. Step into leg loops
3. Pull harness up to waist
4. Fasten chest strap
5. Adjust all straps for snug fit
6. Check all connections before use

**Fall Clearance Calculations**
Total fall distance = Lanyard length + Deceleration distance + Safety factor + Worker height

Example: 6' lanyard + 3.5' deceleration + 3' safety factor + 6' worker = 18.5' minimum clearance

**Rescue Procedures**
- Immediate rescue required (suspension trauma)
- Pre-planned rescue procedures
- Trained rescue personnel
- Emergency communication systems`,
        duration: '90 minutes',
        type: 'hands-on',
        objectives: [
          'Identify components of fall protection systems',
          'Properly inspect fall protection equipment',
          'Demonstrate correct harness fitting and use',
        ],
        resources: [
          'Fall protection equipment',
          'Inspection checklists',
          'Manufacturer guidelines',
        ],
        assessmentCriteria: [
          'Correctly identifies system components',
          'Performs thorough equipment inspection',
          'Demonstrates proper donning technique',
        ],
      },
      // Continue with additional sections...
      {
        id: 'ladder-safety',
        title: 'Ladder Safety and Positioning',
        content: `Ladder-related incidents account for a significant portion of roofing injuries. Proper ladder selection, setup, and use are essential safety skills.

**Ladder Selection Criteria**
1. **Type Based on Use**
   - Step ladders: Self-supporting, A-frame design
   - Extension ladders: Non-self-supporting, leaning type
   - Combination ladders: Multiple configurations
   - Specialty ladders: Roof, platform, articulating

2. **Height Requirements**
   - Extension ladder: 3 feet above roof line
   - Step ladder: Work 2 feet below top
   - Maximum working height considerations

3. **Weight Capacity Ratings**
   - Type IA: 300 lbs (Heavy Industrial)
   - Type I: 250 lbs (Industrial)
   - Type II: 225 lbs (Commercial)
   - Type III: 200 lbs (Household)

**The 4-to-1 Rule for Extension Ladders**
- For every 4 feet of ladder height, base should be 1 foot from wall
- Example: 20-foot ladder = 5 feet from base of wall
- Use angle gauge or visual reference for proper angle

**Pre-Use Ladder Inspection**
- Rails: Check for cracks, splits, or damage
- Rungs: Verify secure attachment, no damage
- Hardware: Inspect locks, hinges, spreaders
- Labels: Ensure weight rating is visible
- Feet: Check for damage, proper grip surface

**Safe Ladder Setup Procedures**
1. **Site Preparation**
   - Level, firm surface
   - Clear of electrical hazards
   - Protected from traffic
   - Weather considerations

2. **Extension Ladder Setup**
   - Two-person lift for long ladders
   - Raise ladder while braced against structure
   - Walk base out to proper angle
   - Lock spreaders in place
   - Tie off or secure as needed

3. **Step Ladder Setup**
   - Fully open spreaders
   - Lock spreader braces
   - Check stability before climbing
   - Never use as extension ladder

**Three-Point Contact Rule**
- Always maintain three points of contact
- Two hands and one foot OR two feet and one hand
- Face ladder when climbing up or down
- Don't carry tools while climbing

**Common Ladder Hazards and Prevention**
1. **Electrical Contact**
   - Maintain 10-foot clearance from power lines
   - Use fiberglass ladders near electrical work
   - Check for overhead hazards before setup

2. **Ladder Slipping**
   - Proper angle and base placement
   - Level, stable surface
   - Tie-off at top when possible
   - Use ladder stabilizers or standoffs

3. **Overreaching**
   - Keep belt buckle between side rails
   - Move ladder rather than overreach
   - Maximum reach: arm's length from body

**Tool and Material Handling**
- Use tool belts or pouches while climbing
- Hoist materials after reaching position
- Never carry materials while climbing
- Use rope and bucket system for small items`,
        duration: '45 minutes',
        type: 'hands-on',
        objectives: [
          'Properly select and inspect ladders',
          'Demonstrate correct ladder setup procedures',
          'Practice safe climbing techniques',
        ],
        resources: [
          'Various ladder types',
          'Inspection checklists',
          'Setup demonstration area',
        ],
        assessmentCriteria: [
          'Correctly sets up ladder at proper angle',
          'Maintains three-point contact while climbing',
          'Identifies and avoids common hazards',
        ],
      },
    ],
    assignments: [
      {
        id: 'hazard-identification',
        title: 'Workplace Hazard Assessment',
        description:
          'Conduct a comprehensive hazard assessment of a mock job site and develop a safety plan.',
        type: 'practical',
        estimatedTime: '3 hours',
        submissionFormat:
          'Written report with photos and safety recommendations',
        gradingCriteria: [
          'Thorough hazard identification',
          'Appropriate control measures',
          'Clear documentation and photos',
          'Practical implementation plan',
        ],
      },
    ],
    assessments: [
      {
        id: 'safety-practical',
        title: 'Safety Equipment Practical Exam',
        type: 'practical_exam',
        passingScore: 100,
        retakePolicy: 'Must retake until 100% proficiency achieved',
        questions: [
          {
            id: 'harness-inspection',
            question:
              'Perform a complete inspection of this fall protection harness and document any issues found.',
            type: 'practical',
            correctAnswer: [
              'Check webbing for cuts/fraying',
              'Inspect hardware for damage',
              'Verify stitching integrity',
              'Check label legibility',
            ],
            explanation:
              'Proper inspection prevents equipment failure that could result in serious injury or death.',
            points: 25,
            difficulty: 'hard',
          },
        ],
      },
    ],
    additionalResources: [
      {
        id: 'osha-1926',
        title: 'OSHA 1926 Construction Standards',
        type: 'document',
        url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926',
        description: 'Complete OSHA construction safety standards',
        isRequired: true,
      },
    ],
  },

  // Additional modules would continue with the same detailed structure...
  module3: {
    moduleId: 'module3',
    title: 'Customer Service Excellence',
    description:
      'Building exceptional customer relationships through professional communication, active listening, and service delivery excellence.',
    totalDuration: '6 hours',
    difficulty: 'Beginner',
    prerequisites: ['Module 1 completion'],
    learningOutcomes: [
      'Master professional communication techniques',
      'Develop active listening and empathy skills',
      'Handle customer concerns and complaints effectively',
      'Build long-term customer relationships',
      'Maintain professional standards in all interactions',
    ],
    sections: [
      {
        id: 'first-impressions',
        title: 'Creating Powerful First Impressions',
        content: `You never get a second chance to make a first impression. In the roofing business, that first impression often determines whether a prospect becomes a customer and whether a customer becomes a lifelong advocate for our company.

**The 7-Second Rule**
Research shows that people form lasting impressions within the first 7 seconds of meeting someone. In those crucial moments, customers evaluate:
- Your appearance and professionalism
- Your confidence and competence
- Your attitude and approachability
- Your attention to detail
- Your respect for their property

**Professional Appearance Checklist**
1. **Personal Grooming**
   - Clean, well-maintained appearance
   - Appropriate personal hygiene
   - Professional hairstyle and facial hair
   - Clean, trimmed fingernails

2. **Company Uniform**
   - Clean, pressed RoofER shirt
   - Appropriate work pants (no tears or stains)
   - Company ID badge visible
   - Matching uniform appearance across crew

3. **Safety Equipment**
   - Clean, well-maintained hard hat
   - Safety glasses properly positioned
   - Work boots in good condition
   - Visible safety equipment shows professionalism

**Vehicle and Equipment Standards**
- Clean, organized company vehicles
- Professional signage and branding
- Well-maintained tools and equipment
- Organized material presentation

**Arrival Protocol**
1. **Pre-Arrival Preparation**
   - Review customer file and project details
   - Confirm appointment time
   - Plan arrival to be 5 minutes early
   - Ensure all necessary materials are loaded

2. **Property Approach**
   - Park in designated or appropriate area
   - Avoid blocking driveways or neighbor access
   - Observe property for potential concerns
   - Gather necessary materials before approaching

3. **Initial Customer Contact**
   - Knock or ring doorbell professionally
   - Stand at appropriate distance from door
   - Smile and make eye contact
   - Introduce yourself and company clearly

**Professional Introduction Scripts**
"Good morning, I'm [Name] from RoofER. We're here for your scheduled [service/estimate/inspection]. Is this still a convenient time for you?"

"Hello, I'm [Name], your roofing specialist from RoofER. I understand you're interested in [specific service]. I'm here to help you understand your options and answer any questions you might have."

**Setting Expectations**
- Explain the process clearly
- Estimate time requirements
- Describe what you'll be doing
- Ask about any specific concerns
- Confirm customer availability

**Respect for Customer Property**
1. **Ask Permission**
   - Before entering property
   - Before moving customer items
   - Before using facilities (restroom, water)
   - Before parking in specific locations

2. **Protective Measures**
   - Use drop cloths and protective coverings
   - Clean up debris regularly
   - Avoid damaging landscaping
   - Secure loose materials against wind

3. **Professional Boundaries**
   - Maintain appropriate personal space
   - Keep conversations business-focused
   - Respect customer's schedule and time
   - Follow company policies on customer interactions`,
        duration: '45 minutes',
        type: 'interactive',
        objectives: [
          'Understand the impact of first impressions',
          'Master professional appearance standards',
          'Practice effective introduction techniques',
        ],
        resources: [
          'Professional appearance checklist',
          'Customer interaction scenarios',
          'Role-playing exercises',
        ],
        assessmentCriteria: [
          'Demonstrates professional appearance',
          'Uses effective introduction techniques',
          'Shows respect for customer property',
        ],
      },
    ],
    assignments: [
      {
        id: 'customer-scenario',
        title: 'Customer Service Scenario Analysis',
        description:
          'Analyze provided customer service scenarios and develop appropriate response strategies.',
        type: 'written',
        estimatedTime: '2 hours',
        submissionFormat: 'Written analysis with recommended actions',
        gradingCriteria: [
          'Identifies key customer concerns',
          'Proposes appropriate solutions',
          'Demonstrates empathy and professionalism',
          'Shows understanding of company policies',
        ],
      },
    ],
    assessments: [
      {
        id: 'customer-service-roleplay',
        title: 'Customer Interaction Assessment',
        type: 'practical_exam',
        passingScore: 85,
        retakePolicy: 'One retake after additional training',
        questions: [
          {
            id: 'difficult-customer',
            question:
              'Handle this scenario: A customer is upset about delayed project start due to weather. Demonstrate professional response.',
            type: 'practical',
            correctAnswer: [
              'Acknowledge concern',
              'Explain weather policy',
              'Provide updated timeline',
              'Offer solutions',
            ],
            explanation:
              'Professional handling of concerns maintains customer relationships even during difficult situations.',
            points: 50,
            difficulty: 'hard',
          },
        ],
      },
    ],
    additionalResources: [
      {
        id: 'communication-guide',
        title: 'Professional Communication Guidelines',
        type: 'document',
        url: '/resources/communication-guide.pdf',
        description:
          'Comprehensive guide to professional communication techniques',
        isRequired: true,
      },
    ],
  },
};

export default completeLessonPlans;
