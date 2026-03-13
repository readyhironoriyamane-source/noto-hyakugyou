# Schema Design Notes

## Data Structure Analysis (from industries.ts + industry.ts)

### Core Article Fields (articles table)
- id: number (PK)
- title: string
- category: string
- operator: string (optional)
- role: string (optional)
- location: string
- locationLat, locationLng: number (optional)
- tags: string[] → store as JSON
- summary: string (text)
- description: string (text, optional)
- necessity: string (optional)
- connections: string (optional)
- relatedIndustries: number[] → store as JSON
- image: string (URL)
- seasonalMonths: number[] → store as JSON
- isCaseStudy: boolean
- editorComment: string (text, optional)
- heroSummary: string (text, optional)

### Timeline (embedded in articles as JSON or separate table)
- past, present, future: string
- phase1, phase2, phase3, phase4: string (long text)

### DeepDive (embedded in articles as JSON)
- past, present, future: string

### Details (embedded in articles)
- owner, founded, employees, writer, interviewDate: string

### ChallengeCard (embedded as JSON)
- label, description: string
- solutions: [{title, detail}]
- structuredBlock: [{label, items[]}]

### DecisionMatrix (separate or JSON - varies by article)
- title: string
- optionA: {title, pros[], cons[]}
- optionB: {title, pros[], cons[], subsidy?, cost?}
- reason: string

### DecisionProcess (separate or JSON)
- worry, decider, selectedSupport, action, outcome: string
- rejectedOption: {title, reasons[]}
- adoptedOption: {title, reasons[], decidingFactor}

### Barriers (JSON)
- title, content: string
- checklist: [{title, description}]

### SupportSystem (can be single object or array!)
- name, description: string
- url/link: string
- rate, limit, point: string
- points: {label, term, detail}
- specAmount, specCondition: string

### BehindTheScenes (JSON)
- title: string
- content: [{heading, text}]

### Regrets (JSON)
- title, content: string

### Actions (JSON)
- [{type, label, link}]

### RecommendedSupports (JSON)
- [{category, name, description, link}]

## Design Decision: Single Table with JSON columns
Given the complexity and variability of the data structure, the best approach is:
- One `articles` table with core searchable fields as proper columns
- Complex nested structures stored as JSON columns
- This avoids excessive joins while keeping the data queryable for common operations

## Key Dynamic UI Requirements
1. supportSystem can be single object OR array → UI must handle both
2. decisionMatrix optionA/B can have varying numbers of pros/cons
3. barriers checklist can have varying items
4. challengeCard solutions/structuredBlock vary in count
