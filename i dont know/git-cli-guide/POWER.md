---
name: "git-cli-guide"
displayName: "Git CLI Guide"
description: "Essential Git commands and workflows for version control. Covers common operations like commits, branches, merging, and troubleshooting."
keywords: ["git", "version-control", "cli", "commands", "workflow"]
author: "Example Author"
---

# Git CLI Guide

## Overview

This power provides a quick reference guide for Git command-line operations. It covers the most common Git workflows including repository initialization, branching strategies, committing changes, and collaboration workflows. Whether you're new to Git or need a quick reference, this guide helps you navigate version control efficiently.

## Onboarding

### Installation

#### Via Package Manager (Recommended)

**macOS:**
```bash
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install git
```

**Windows:**
Download from [git-scm.com](https://git-scm.com/download/win) or use:
```bash
winget install Git.Git
```

### Prerequisites
- Operating System: macOS, Linux, or Windows
- Terminal/Command Prompt access

### Basic Configuration
```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Enable color output
git config --global color.ui auto
```

### Verification
```bash
# Check Git version
git --version

# View your configuration
git config --list
```

## Common Workflows

### Workflow 1: Starting a New Repository

**Goal:** Initialize a new Git repository and make your first commit

**Commands:**
```bash
# Create and navigate to project directory
mkdir my-project
cd my-project

# Initialize Git repository
git init

# Create a README file
echo "# My Project" > README.md

# Stage the file
git add README.md

# Make your first commit
git commit -m "Initial commit"
```

### Workflow 2: Daily Development Workflow

**Goal:** Make changes, commit them, and push to remote

**Commands:**
```bash
# Check status of your working directory
git status

# Stage specific files
git add file1.txt file2.txt

# Or stage all changes
git add .

# Commit with a descriptive message
git commit -m "Add feature X"

# Push to remote repository
git push origin main
```

### Workflow 3: Branching and Merging

**Goal:** Create a feature branch, make changes, and merge back

**Commands:**
```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Implement new feature"

# Switch back to main branch
git checkout main

# Merge feature branch
git merge feature/new-feature

# Delete feature branch (optional)
git branch -d feature/new-feature
```

### Workflow 4: Collaborating with Remote Repositories

**Goal:** Clone a repository, make changes, and contribute

**Commands:**
```bash
# Clone a repository
git clone https://github.com/username/repo.git
cd repo

# Create feature branch
git checkout -b my-contribution

# Make changes and commit
git add .
git commit -m "Add my contribution"

# Push branch to remote
git push origin my-contribution

# Update your local main branch
git checkout main
git pull origin main
```

## Command Reference

### Essential Commands

| Command | Description | Example |
|---------|-------------|---------|
| `git init` | Initialize new repository | `git init` |
| `git clone <url>` | Clone remote repository | `git clone https://github.com/user/repo.git` |
| `git status` | Show working directory status | `git status` |
| `git add <file>` | Stage changes | `git add README.md` |
| `git commit -m "<msg>"` | Commit staged changes | `git commit -m "Fix bug"` |
| `git push` | Push commits to remote | `git push origin main` |
| `git pull` | Fetch and merge from remote | `git pull origin main` |
| `git branch` | List/create branches | `git branch feature-x` |
| `git checkout` | Switch branches | `git checkout main` |
| `git merge` | Merge branches | `git merge feature-x` |

### Viewing History

```bash
# View commit history
git log

# View compact history
git log --oneline

# View history with graph
git log --graph --oneline --all

# View changes in a commit
git show <commit-hash>
```

## Troubleshooting

### Error: "fatal: not a git repository"
**Cause:** You're not in a Git repository directory
**Solution:**
1. Navigate to your project directory: `cd /path/to/project`
2. Or initialize a new repository: `git init`

### Error: "Your branch is behind 'origin/main'"
**Cause:** Remote repository has changes you don't have locally
**Solution:**
```bash
# Pull latest changes
git pull origin main

# If you have local commits, you may need to merge or rebase
git pull --rebase origin main
```

### Error: "merge conflict"
**Cause:** Git cannot automatically merge changes
**Solution:**
1. Open conflicted files (marked with `<<<<<<<`, `=======`, `>>>>>>>`)
2. Manually resolve conflicts by editing the file
3. Stage resolved files: `git add <file>`
4. Complete the merge: `git commit`

### Accidentally Committed to Wrong Branch
**Solution:**
```bash
# Move the commit to a new branch
git branch feature-branch
git reset --hard HEAD~1
git checkout feature-branch
```

### Undo Last Commit (Keep Changes)
**Solution:**
```bash
# Undo commit but keep changes staged
git reset --soft HEAD~1

# Undo commit and unstage changes
git reset HEAD~1
```

## Best Practices

- **Write clear commit messages** - Use present tense, be descriptive ("Add feature" not "Added feature")
- **Commit often** - Small, focused commits are easier to understand and revert
- **Use branches** - Keep main branch stable, develop features in separate branches
- **Pull before push** - Always pull latest changes before pushing to avoid conflicts
- **Review before committing** - Use `git status` and `git diff` to review changes
- **Don't commit sensitive data** - Use `.gitignore` to exclude credentials, API keys, etc.

## Additional Resources

- Official Documentation: https://git-scm.com/doc
- Pro Git Book (Free): https://git-scm.com/book/en/v2
- GitHub Git Cheat Sheet: https://education.github.com/git-cheat-sheet-education.pdf

---

**CLI Tool:** `git`
**Installation:** See Onboarding section above
