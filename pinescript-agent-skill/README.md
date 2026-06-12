# PineScript v6 Specialist Agent

## What This Is

A specialized AI agent that **exclusively** uses your local PineScript v6 documentation. It has **zero** prior PineScript training data — it only knows what's in your provided files.

## What's Included

| File | Purpose |
|------|---------|
| `SKILL.md` | Skill definition with YAML frontmatter for VS Code agent system |
| `pinescript-agent.md` | Agent configuration with operating rules |
| `rag_engine.py` | TF-IDF RAG search engine (1,420 docs, 22,353 terms) |
| `rag_index.json` | Pre-built search index |
| `doc_loader.py` | Documentation indexer/reader utility |
| `agent.json` | Agent metadata and configuration |
| `.vscode/pinescript-agent.code-snippets` | VS Code snippet for quick invocation |

## Installation (Done ✅)

1. ✅ **Skill installed** at `C:\Users\primative\.agents\skills\pinescript-v6-specialist\`
2. ✅ **Copilot instructions** updated at `D:\Cro\i dont know\copilot-instructions.md`
3. ✅ **RAG index built** (1,420 documents, 22,353 terms)

## How to Use

### In VS Code Insiders Chat

The skill is automatically available. Just ask PineScript questions:

```
"Create a PineScript v6 RSI indicator with divergence detection"
"Explain how request.security() works"
"Debug this PineScript code: ..."
"Show me how to implement a Kalman filter in PineScript"
```

The agent will:
1. Search the RAG index for relevant docs
2. Read the top matching documents
3. Generate code/concepts using ONLY your documentation
4. Cite every source file used

### Using the RAG Engine Directly

```bash
cd D:\Cro\pinescript-agent-skill
python rag_engine.py
```

This builds the index and runs test searches. To search programmatically:

```python
from rag_engine import PineScriptRAG
rag = PineScriptRAG()
rag.build_index()
results = rag.search("kalman filter adaptive", top_k=5)
for r in results:
    print(f"[{r['score']:.3f}] {r['id']}")
    print(r['snippet'])
```

### In Other Agents (e.g., Hermes)

To use this agent's knowledge in another agent system:

1. **Reference the skill file:**
   ```
   Read: C:\Users\primative\.agents\skills\pinescript-v6-specialist\SKILL.md
   ```

2. **Use the RAG engine:**
   ```bash
   cd D:\Cro\pinescript-agent-skill
   python rag_engine.py
   ```

3. **Read documentation directly:**
   - User Manual: `D:\Cro\pinescript section\Official Pinescript docs\pinescript_user_manual\`
   - Reference: `D:\Cro\pinescript section\Official Pinescript docs\reference manual\`
   - Training: `D:\Cro\pinescript section\scripts for training\quantitative\indicators\`

## Verifying What the Agent Uses for Training

The agent uses **NO training data**. Its entire knowledge comes from:

| Source | Files | Location |
|--------|-------|----------|
| User Manual | 66 | `pinescript_user_manual/` (7 sections) |
| Reference Manual | 941 | `reference manual/` (7 categories) |
| Training Scripts | 413 | `scripts for training/quantitative/indicators/` (15 categories) |
| **Total** | **1,420** | **3 directories** |

To verify, check the RAG index:
```bash
cd D:\Cro\pinescript-agent-skill
python -c "import json; d=json.load(open('rag_index.json')); print(f'Documents: {len(d[\"documents\"])}'); print(f'Vocabulary: {d[\"vocabulary_size\"]} terms')"
```

## RAG System Details

The RAG (Retrieval-Augmented Generation) system uses:

- **TF-IDF** (Term Frequency-Inverse Document Frequency) for relevance scoring
- **Cosine similarity** for matching queries to documents
- **Function name boosting** — PineScript function calls (e.g., `ta.rsi()`) get 3x weight
- **Augmented TF** — Normalized term frequency to prevent long-document bias
- **No external APIs** — Everything runs locally, no embeddings API needed

This means when you ask "how to use ta.rsi", the agent:
1. Tokenizes the query
2. Computes TF-IDF vector
3. Scores all 1,420 documents by cosine similarity
4. Boosts documents containing `ta.rsi` function calls
5. Returns the top 5 most relevant documents
6. Reads those documents to formulate its response

## Knowledge Base Structure

```
pinescript_user_manual/          (66 files)
├── 1. Concepts/                 (13 files) — alerts, bar-states, inputs, etc.
├── 2. Visuals/                  (11 files) — plotting, drawing
├── 3. Language/                 (17 files) — syntax, types, operators
├── 4. Writing_Scripts/          (5 files) — structure, debugging, optimization
├── 5. Errors_And_Warnings/      (5 files) — error codes
├── 6. FAQ/                      (14 files) — common questions
└── 7. Release_Notes/            (1 file)   — v6 changes

reference manual/                 (941 files)
├── annotations/                 (10) — type annotations
├── constants/                   (239) — built-in constants
├── functions/                   (475) — all built-in functions
├── keywords/                    (15) — language keywords
├── operators/                   (21) — operators
├── types/                       (20) — type definitions
└── variables/                   (161) — built-in variables

training scripts/                 (413 .pine/.md pairs)
├── channels/                    (22) — channel indicators
├── core/                        (7) — price calculations
├── cycles/                      (16) — cycle analysis
├── dynamics/                    (20) — dynamic systems
├── errors/                      (27) — error metrics
├── filters/                     (40) — signal processing filters
├── forecasts/                   (—) — forecasting methods
├── momentum/                    (19) — momentum indicators
├── numerics/                    (41) — numerical methods
├── oscillators/                 (47) — oscillator indicators
├── reversals/                   (10) — reversal patterns
├── statistics/                  (34) — statistical functions
├── trends_FIR/                  (34) — FIR trend filters
├── trends_IIR/                  (36) — IIR trend filters
├── volatility/                  (28) — volatility indicators
└── volume/                      (27) — volume analysis
```

## Updating the Knowledge Base

If you add new documentation files:

```bash
cd D:\Cro\pinescript-agent-skill
python rag_engine.py  # Rebuilds index from scratch
```

This re-scans all 3 directories and creates a fresh `rag_index.json`.

## Integration with Other Agents

For Hermes or other agent systems, add this to their configuration:

```yaml
knowledge_sources:
  - name: pinescript-v6
    type: local_rag
    skill: C:\Users\primative\.agents\skills\pinescript-v6-specialist\SKILL.md
    rag_index: D:\Cro\pinescript-agent-skill\rag_index.json
    rag_engine: D:\Cro\pinescript-agent-skill\rag_engine.py
    doc_paths:
      - D:\Cro\pinescript section\Official Pinescript docs\pinescript_user_manual\
      - D:\Cro\pinescript section\Official Pinescript docs\reference manual\
      - D:\Cro\pinescript section\scripts for training\quantitative\indicators\
```

Then the agent can invoke PineScript expertise by reading the SKILL.md and using the RAG engine for retrieval.