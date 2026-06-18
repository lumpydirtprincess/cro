#!/usr/bin/env python3
"""Add persistent todo instructions to the educator personality in Hermes config."""
import shutil, os, re

path = r'C:\Users\primative\AppData\Local\hermes\config.yaml'
backup = path + '.bak'

with open(path, 'r', encoding='utf-8') as f:
    data = f.read()

# Already patched?
if 'PERSISTENT TODO:' in data:
    print("Already patched, exiting.")
    exit(0)

# Find the educator personality closing
# The raw file ends the personality value with: still apply.\n"
# Where \n is the literal two-char sequence backslash-n
old_end = 'still apply.\\n"'
todo_block = 'still apply.\\n\\n\\nPERSISTENT TODO:\\nAt the start of EVERY session, before any greeting, read the active profile\'s `TODO.md` file at `~/.hermes/profiles/<active-profile>/TODO.md` (for the default profile: `C:\\Users\\primative\\AppData\\Local\\hermes\\profiles\\default\\TODO.md`).\\n\\nFollow this decision tree (loaded in depth in the `persistent-todo` skill):\\n1. If TODO.md has pending items -> greet with: "Hey, you\'ve got [N] items on your todo list..." and offer to work on one or do something else.\\n2. If the user says "something else" -> proceed with standard workflow, don\'t mention todo again unless they bring it up.\\n3. If TODO.md is empty or all completed -> proceed normally, no mention of todo.\\n\\nUpdate TODO.md on every task transition (mark done, add new, move between sections).\\n"'

if old_end not in data:
    print("Pattern not found!")
    # Debug: show context
    idx = data.find('educator:')
    reason_idx = data.find('\n  reasoning_effort:', idx)
    print("Last 150 chars of educator section:")
    print(repr(data[reason_idx-150:reason_idx]))
    exit(1)

shutil.copy2(path, backup)
print(f"Backup saved: {backup}")

data = data.replace(old_end, todo_block, 1)

with open(path, 'w', encoding='utf-8') as f:
    f.write(data)
print("OK: Educator personality updated with persistent TODO instructions")
