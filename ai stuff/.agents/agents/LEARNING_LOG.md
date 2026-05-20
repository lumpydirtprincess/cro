# Learning Log

**Purpose**: Document concepts learned, patterns discovered, mistakes made

**How to Use**:
- Add entries as you learn
- Include examples and code snippets
- Link to relevant files
- Review when encountering similar problems

---

## Entry Template

```markdown
### [Topic/Concept]
**Date**: YYYY-MM-DD
**Category**: [git/pinescript/python/ai-tools/workflow]

**What I Learned**:
[Description of the concept]

**Why It Matters**:
[How this is useful]

**Example**:
[Code snippet or concrete example]

**Related**:
- [Links to docs, files, or other entries]

**Mistakes Made**:
- [What I got wrong at first]
```

---

## Entries

### Claude Code Auto-Reads `.claude/claude.md`
**Date**: 2025-11-28
**Category**: ai-tools

**What I Learned**:
Claude Code automatically reads `.claude/claude.md` file at the start of each session, providing project context without needing to explicitly ask.

**Why It Matters**:
- No need to copy/paste instructions each session
- Consistent behavior across sessions
- Central place for project guidelines

**Example**:
```
.claude/
└── claude.md  # Claude Code reads this automatically
```

**Related**:
- `.claude/claude.md` file in this workspace
- SESSION_HANDOFF.md for additional context

---

### Session Continuity Requires Manual Context
**Date**: 2025-11-28
**Category**: ai-tools, workflow

**What I Learned**:
Claude Code doesn't remember previous sessions. Need to provide context through:
1. `.claude/claude.md` (auto-read)
2. SESSION_HANDOFF.md (ask Claude to read)
3. CONTEXT.md (current focus)

**Why It Matters**:
- Prevents re-explaining project every session
- Faster ramp-up time
- Maintains consistency

**Example**:
```
# Start of new session
"Read SESSION_HANDOFF.md to catch up on where we left off"
```

**Related**:
- SESSION_HANDOFF.md template
- CONTEXT.md for current work

---

### Tool Ecosystem Overlap is Normal
**Date**: 2025-11-28
**Category**: ai-tools

**What I Learned**:
Multiple tools can do similar things (Claude Code, Claude App, Copilot). This is OK and expected.

**Why It Matters**:
- No "wrong" choice for most tasks
- Use what feels natural
- Different tools for different contexts

**Example**:
- Learning a concept: Claude App OR Claude Code (both work)
- Writing code: Claude Code (better) but Copilot helps too
- Brainstorming: Claude App OR Claude Code (preference)

**Related**:
- TOOL_ECOSYSTEM.md for detailed breakdown

**Mistakes Made**:
- Thinking I needed to always use "the right tool"
- Reality: workflow matters more than tool choice

---

### Workspace Bloat Happens Gradually
**Date**: 2025-11-28
**Category**: workflow

**What I Learned**:
Previous "kirbys paw for higher" workspace became bloated by adding repos without clear criteria.

**Why It Matters**:
- Need intentional decisions about what to add
- Regular cleanup prevents accumulation
- "Clean litter" approach: minimal by default

**Example**:
Bad: "This repo looks cool, clone it"
Good: "I need X functionality, is this repo the best solution?"

**Related**:
- .claude/claude.md (clean over cluttered principle)
- IDEAS.md (idea for repo organization strategy)

**Mistakes Made**:
- Cloned too many repos "just in case"
- Didn't have removal criteria
- Let workspace grow unchecked

---

### Knowledge Scattered Across Conversations
**Date**: 2025-11-28
**Category**: workflow

**What I Learned**:
Ideas and decisions get lost when spread across multiple Claude conversations.

**Why It Matters**:
- Valuable insights forgotten
- Repeat same discussions
- No centralized knowledge base

**Example**:
Before: Ideas in conversation 1, 2, 3... (lost)
Now: IDEAS.md captures everything in one place

**Related**:
- IDEAS.md for idea capture
- LEARNING_LOG.md (this file) for learnings
- SESSION_HANDOFF.md for decisions

---

## Topics to Learn

### High Priority
- [ ] Git repo types and use cases
- [ ] When to use git submodules vs regular repos
- [ ] MCP server architecture and setup
- [ ] Pine Script execution model deep dive
- [ ] Python integration with Pine Script workflows

### Medium Priority
- [ ] GitHub Actions for automation
- [ ] Advanced git workflows (rebase, cherry-pick, etc.)
- [ ] WebSocket connections for real-time data
- [ ] Backtesting framework options
- [ ] Risk management mathematics

### Future
- [ ] Advanced Pine Script optimization
- [ ] Machine learning for trading
- [ ] Docker for environment consistency
- [ ] Cloud deployment options

---

## Patterns That Work

### With Claude Code
✅ Ask to read context files at start
✅ Use TodoWrite for multi-step tasks
✅ Let it think before building
✅ Document decisions immediately
✅ Update knowledge files at end of session

### For Learning
✅ Request examples with explanations
✅ Ask "why" not just "how"
✅ Test understanding by explaining back
✅ Keep working examples as reference
✅ Document mistakes for future self

### For Productivity
✅ Batch similar tasks together
✅ Use templates for repetitive work
✅ Regular review of knowledge files
✅ Capture ideas immediately
✅ Close loops (finish or document pause points)

---

## Common Mistakes

### Workspace Management
❌ Adding repos without clear purpose
❌ Not cleaning up temporary files
❌ Unclear naming conventions
❌ No organization strategy

**Fix**: Have criteria for adding/removing, regular cleanup

### Tool Usage
❌ Thinking there's one "right tool"
❌ Not using available features
❌ Switching tools too often
❌ Analysis paralysis on tool choice

**Fix**: Pick one that works, master it, add tools as needed

### Knowledge Management
❌ Not documenting decisions
❌ Losing ideas across conversations
❌ No centralized knowledge
❌ Forgetting why decisions were made

**Fix**: Use IDEAS.md, LEARNING_LOG.md, SESSION_HANDOFF.md

---

## Resources

### Documentation
- `repos/pinescriptv6/` - Pine Script v6 complete reference
- `.github/instructionsss/` - Various instruction patterns (to organize)
- `misc debris/md stuff/` - Old workspace documentation

### External
- TradingView Pine Script docs: https://www.tradingview.com/pine-script-docs/
- Claude Code docs: (ask Claude Code about features)
- Git documentation: https://git-scm.com/doc

---

## Quick Reference

### Pine Script
```pinescript
// Basic indicator structure
//@version=6
indicator("My Indicator")
plot(close)
```

### Git Common Commands
```bash
git status              # Check status
git add .               # Stage all changes
git commit -m "msg"     # Commit
git push                # Push to remote
git pull                # Pull from remote
```

### Claude Code Session Start
```
Read SESSION_HANDOFF.md and CONTEXT.md
```

---

**Last Updated**: 2025-11-28
**Entries**: 5
**Topics to Learn**: 13
