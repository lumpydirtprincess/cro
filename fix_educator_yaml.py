#!/usr/bin/env python3
"""Patch educator personality in Hermes config using raw text manipulation."""
import shutil

path = r'C:\Users\primative\AppData\Local\hermes\config.yaml'
backup = path + '.bak'

# Read the raw file
with open(path, 'r', encoding='utf-8') as f:
    data = f.read()

# Check if already patched
if 'PERSISTENT TODO:' in data:
    print("OK: Already patched")
    exit(0)

# Find the closing of the educator personality
# The pattern is: the end of the personality text followed by the closing quote
old_section = (
    'personality always layers ON TOP of the active profile\'s SOUL.md.\\n'
    'The profile\'s identity, file discipline, and workspace rules still apply.\\n"'
)

new_section = (
    'personality always layers ON TOP of the active profile\'s SOUL.md.\\n'
    'The profile\'s identity, file discipline, and workspace rules still apply.\\n\\n\\n'
    'PERSISTENT TODO:\\n'
    'At the start of EVERY session, before any greeting, read the active profile\'s \\\n'
    '`TODO.md` file at `~/.hermes/profiles/<active-profile>/TODO.md` (for the default \\\n'
    'profile: `C:\\Users\\primative\\AppData\\Local\\hermes\\profiles\\default\\TODO.md`).\\n\\n'
    'Follow this decision tree (loaded in depth in the `persistent-todo` skill):\\n'
    '1. If TODO.md has pending items -> greet with: "Hey, you\'ve got [N] items on your \\\n'
    'todo list..." and offer to work on one or do something else.\\n'
    '2. If the user says "something else" -> proceed with standard workflow, don\'t \\\n'
    'mention todo again unless they bring it up.\\n'
    '3. If TODO.md is empty or all completed -> proceed normally, no mention of todo.\\n\\n'
    'Update TODO.md on every task transition (mark done, add new, move between \\\n'
    'sections).\\n"'
)

if old_section in data:
    shutil.copy2(path, backup)
    print(f"Backup saved to: {backup}")
    
    data = data.replace(old_section, new_section, 1)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(data)
    
    print("OK: educator personality updated with persistent todo instructions")
else:
    print("ERR: Could not find the exact pattern")
    # Debug: show context around the target
    idx = data.find('still apply')
    if idx >= 0:
        print("Context around 'still apply':")
        print(repr(data[idx-50:idx+100]))
