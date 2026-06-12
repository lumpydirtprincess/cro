---
name: business-brain
description: "Strategic business & startup thinking for Hermes. Lean Startup, Jobs-to-be-Done, Blue Ocean, Traction, $100M Offers, Hypothesis-Driven Validation. No roleplay — pure frameworks and decision tools for building income streams with constrained resources."
version: 1.0.0
author: built for Paperclip
license: MIT
metadata:
  hermes:
    tags: [business, startup, strategy, validation, income-streams, founder]
    homepage: https://github.com/primative/hermes-business-brain
prerequisites:
  commands: [python3]
---

# Business Brain

> **Purpose**: Give Hermes a structured business mind for evaluating, prioritizing, and executing on income-stream ideas — especially under your constraints (TBI, executive dysfunction, eviction urgency, limited bandwidth, multiple parallel bets).

This skill provides **frameworks**, **mental models**, and **decision checklists** — not roleplay. Invoke it when you need to:
- Brainstorm or filter income ideas
- Validate a concept before building
- Choose which project to focus on *now*
- Structure a launch plan that fits your actual capacity
- Think through pricing, positioning, distribution
- Avoid founder traps (building in isolation, perfectionism, feature creep)

---

## Core Frameworks (Internalized)

### 1. Jobs-to-be-Done (JTBD)
**Core question**: "What progress is the customer trying to make in what circumstance?"
- Don't ask "would you use this?" — ask "when did you last struggle with X?"
- Forces: **Push** (current solution sucks) + **Pull** (new solution is better) > **Anxiety** (switching risk) + **Habit** (inertia)
- Apply to every idea: What *job* is the user hiring this for?

### 2. Lean Startup / Hypothesis-Driven Validation
**Build → Measure → Learn** loop, but inverted for you:
1. **Riskiest assumption first** — what must be true for this to work?
2. **Smallest test** — can you validate in < 4 hours with 0 code?
3. **Evidence over intuition** — Pre-sell, waitlist, cold DM, landing page, manual concierge
4. **Kill or pivot** — set a hard criterion before you start

### 3. Blue Ocean / Uncontested Space
- **Eliminate** factors the industry competes on but customers don't value
- **Reduce** below industry standard
- **Raise** above industry standard
- **Create** new factors the industry never offered
- Your edge: *you know Pine Script, trading, dev tools — most competitors don't*

### 4. Traction / Bullseye Framework (Gabriel Weinberg)
1. Brainstorm **19 channels** (content, SEO, ads, sales, partnerships, etc.)
2. **Ring 1**: 3 promising channels → cheap tests
3. **Ring 2**: 1-2 winners → double down
4. **Ring 3**: Scale the winner
- For you: Channels that work *asynchronously* (content, SEO, templates, marketplace listings) > channels needing live presence

### 5. $100M Offers (Hormozi) — Value Equation
```
Value = (Dream Outcome × Perceived Likelihood of Achievement) / (Time Delay × Effort & Sacrifice)
```
- Increase **Dream Outcome** (what they *really* want)
- Increase **Perceived Likelihood** (proof, guarantees, demos)
- Decrease **Time Delay** (instant access, templates, done-for-you)
- Decrease **Effort** (plug-and-play, no setup, AI-assisted)

### 6. Constraint-Aware Execution (Your Reality)
- **One main quest at a time** — parallel = death with executive dysfunction
- **2-hour rule**: If you can't make visible progress in 2 hours, the task is too big — slice it
- **External accountability** > internal willpower (body doubling, public commits, paid deadlines)
- **Revenue-first ordering**: Which idea puts cash in hand fastest with least new learning?

---

## Decision Tools

### Idea Filter Scorecard (0-5 each)
| Criterion | Weight | Notes |
|-----------|--------|-------|
| **Time to first $** | 3x | Days, not months |
| **Leverages existing assets** | 2x | Pine Script repo, trading knowledge, code |
| **Low ongoing ops burden** | 2x | Can run on autopilot / async |
| **Market proof exists** | 2x | Competitors making money = validation |
| **Fits 2-hour grind sessions** | 2x | Chunkable, visible progress |
| **Scalable past you** | 1x | Can hire/automate later |
| **Downside capped** | 1x | Max loss = time, not money |

**Threshold**: Score ≥ 65/105 → build. Below → park or kill.

### Project Priority Matrix
```
Urgent + High Revenue → DO NOW (Pine Script platform - you have the repo)
Urgent + Low Revenue  → AUTOMATE/TEMPLATE (keyboard app - ship fast, iterate)
Not Urgent + High     → SCHEDULE (Skool - needs community building skill)
Not Urgent + Low      → KILL
```

### The "Paperclip" Business Lens
Every decision filters through: **Does this compound the Paperclip asset base?**
- Code → reusable components
- Content → SEO / lead gen / course material
- Customers → list / community / upsell path
- Skills → teachable / productizable

---

## Skill Scripts

Located in `scripts/`:

| Script | Purpose |
|--------|---------|
| `score_idea.py` | Run the Idea Filter Scorecard on a concept |
| `validate.py` | Generate a 4-hour validation plan for riskiest assumption |
| `channel_test.py` | Bullseye channel brainstorm + cheap test design |
| `offer_stack.py` | Apply Value Equation to a product idea |
| `prioritize.py` | Rank current projects via Priority Matrix |
| `daily_focus.py` | Output today's single main quest + 2-hour slice |

All scripts are pure Python, no deps. Run from skill dir.

---

## Quick Reference: Anti-Patterns to Catch

| Trap | Signal | Counter |
|------|--------|---------|
| **Builder's bias** | "I'll add this feature first" | "What's the *one* thing someone pays for?" |
| **Research rabbit hole** | 3+ hours reading, 0 building | Set timer: 30 min research → must produce artifact |
| **Perfectionist launch** | "Not ready yet" | Ship ugly v1 to 5 people. Charge. |
| **Shiny new niche** | New idea every week | Park new ideas in `ideas_parking_lot.md`; review monthly |
| **Solo grind** | No external check-in for days | Schedule 2x/week body doubling or async accountability |
| **Revenue amnesia** | Working on non-revenue tasks | Daily: "What did I do today that leads to $?" |

---

## Usage

Load in session:
```
/skill business-brain
```

Then ask things like:
- "Score this idea: [description]"
- "What's the riskiest assumption for Pine Script platform and how do I test it in 4 hours?"
- "Give me a 2-hour slice for the keyboard app MVP"
- "Which traction channel should I test first for Skool?"
- "Apply the Value Equation to my metronome app pricing"
- "What's today's main quest?"

---

## Files in This Skill

```
business-brain/
├── SKILL.md           (this file)
├── scripts/
│   ├── score_idea.py
│   ├── validate.py
│   ├── channel_test.py
│   ├── offer_stack.py
│   ├── prioritize.py
│   └── daily_focus.py
├── references/
│   ├── frameworks.md        (condensed cheat sheets)
│   ├── anti_patterns.md
│   └── paperclip_lens.md    (how each project compounds Paperclip)
└── templates/
    ├── idea_scorecard.md
    ├── validation_plan.md
    └── launch_checklist.md
```