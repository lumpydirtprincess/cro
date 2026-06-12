#!/usr/bin/env python3
"""
Integrate antigravity-awesome-skills into Hermes Agent skills directory.
Adapts frontmatter format and organizes into Hermes-compatible categories.
"""

import os
import re
import shutil
import json

# Paths
ANTIGRAVITY_SKILLS = r"D:\Cro\ai stuff\antigravity-awesome-skills-main\skills"
ANTIGRAVITY_INDEX = r"D:\Cro\ai stuff\antigravity-awesome-skills-main\skills_index.json"
HERMES_SKILLS = os.path.expandvars(r"%LOCALAPPDATA%\hermes\skills")

# Category mapping: antigravity category -> Hermes category directory
CATEGORY_MAP = {
    # Architecture & Design
    "architecture": "architecture",
    "design": "architecture",
    "game-development": "architecture",
    
    # AI & Agents
    "ai-ml": "ai-agents",
    "ai-agents": "ai-agents",
    "andruia": None,  # Skip - personal/custom
    
    # DevOps & Cloud
    "devops": "devops-cloud",
    "cloud": "devops-cloud",
    
    # Security
    "security": "security",
    
    # Software Development (enhance existing)
    "workflow": "software-development",
    "uncategorized": "software-development",
    
    # Product & Business
    "marketing": "product",
    "business": "product",
    
    # Productivity
    "productivity": "productivity",
}

# Skills to skip (duplicates of existing Hermes skills, editor-specific, personas, etc.)
SKIP_SKILLS = {
    # Duplicates of existing Hermes skills
    "test-driven-development", "brainstorming", "clean-code", "systematic-debugging",
    "requesting-code-review", "simplify-code", "spike", "plan",
    
    # Editor-specific
    "claude-code-guide", "claude-code-expert", "claude-api", "claude-d3js-skill",
    "claude-in-chrome-troubleshooting", "claude-monitor", "claude-scientific-skills",
    "claude-settings-audit", "claude-speed-reader", "claude-win11-speckit-update-skill",
    "claude-ally-health", "claude-design",
    "codex-review",
    "gemini-api-dev", "gemini-api-integration", "geminiignore-finops",
    
    # Persona/simulator skills
    "steve-jobs", "warren-buffett", "bill-gates", "elon-musk", "sam-altman",
    "andrej-karpathy", "geoffrey-hinton", "ilya-sutskever", "yann-lecun",
    "yann-lecun-debate", "yann-lecun-filosofia", "yann-lecun-tecnico",
    
    # Language-specific (skip non-English or very niche)
    "advogado-criminal", "advogado-especialista", "leiloeiro-juridico",
    "leiloeiro-avaliacao", "leiloeiro-edital", "leiloeiro-ia",
    "leiloeiro-mercado", "leiloeiro-risco", "junta-leiloeiros",
    
    # Very editor/tool-specific
    "linear", "linear-automation", "linear-claude-skill",
    "notion-automation", "notion-template-business",
    "obsidian-bases", "obsidian-cli", "obsidian-clipper-template-creator", "obsidian-markdown",
    "slack-automation", "slack-bot-builder", "slack-gif-creator",
    "discord-automation", "discord-bot-architect",
    "telegram", "telegram-automation", "telegram-bot-builder", "telegram-mini-app",
    "twitter-automation", "x-twitter-scraper", "x-article-publisher-skill",
    "instagram", "instagram-automation",
    "tiktok-automation",
    "youtube-automation", "youtube-summarizer",
    "reddit-automation",
    
    # Automation platforms (too specific)
    "n8n-code-javascript", "n8n-code-python", "n8n-expression-syntax",
    "n8n-mcp-tools-expert", "n8n-node-configuration", "n8n-validation-expert",
    "n8n-workflow-patterns",
    "zapier-make-patterns",
    "make-automation",
    "flowhunt-skill",
    
    # CRM/Marketing automation (too specific)
    "activecampaign-automation", "brevo-automation", "convertkit-automation",
    "hubspot-automation", "hubspot-integration", "mailchimp-automation",
    "pipedrive-automation", "salesforce-automation", "salesforce-development",
    "sendgrid-automation", "segment-automation", "segment-cdp",
    "zendesk-automation", "zoho-crm-automation",
    "intercom-automation", "freshdesk-automation", "freshservice-automation",
    
    # Project management tools
    "asana-automation", "basecamp-automation", "box-automation",
    "clickup-automation", "jira-automation", "monday-automation",
    "trello-automation", "wrike-automation", "miro-automation",
    
    # Communication
    "zoom-automation", "microsoft-teams-automation", "cal-com-automation",
    "calendly-automation",
    
    # Cloud provider specific (too many, skip most)
    "azure-ai-agents-persistent-dotnet", "azure-ai-agents-persistent-java",
    "azure-ai-anomalydetector-java", "azure-ai-contentsafety-java",
    "azure-ai-contentsafety-py", "azure-ai-contentsafety-ts",
    "azure-ai-contentunderstanding-py", "azure-ai-document-intelligence-dotnet",
    "azure-ai-document-intelligence-ts", "azure-ai-formrecognizer-java",
    "azure-ai-ml-py", "azure-ai-openai-dotnet",
    "azure-ai-projects-dotnet", "azure-ai-projects-java",
    "azure-ai-projects-py", "azure-ai-projects-ts",
    "azure-ai-textanalytics-py", "azure-ai-transcription-py",
    "azure-ai-translation-document-py", "azure-ai-translation-text-py",
    "azure-ai-translation-ts", "azure-ai-vision-imageanalysis-java",
    "azure-ai-vision-imageanalysis-py", "azure-ai-voicelive-dotnet",
    "azure-ai-voicelive-java", "azure-ai-voicelive-py", "azure-ai-voicelive-ts",
    
    # Mobile (skip if not doing mobile dev)
    "android-jetpack-compose-expert", "android_ui_verification",
    "ios-developer", "ios-debugger-agent",
    "flutter-expert", "react-native-architecture",
    "expo-api-routes", "expo-cicd-workflows", "expo-deployment",
    "expo-dev-client", "expo-tailwind-setup", "expo-ui-jetpack-compose",
    "expo-ui-swift-ui", "upgrading-expo",
    
    # E-commerce
    "shopify-apps", "shopify-automation", "shopify-development",
    "wordpress", "wordpress-penetration-testing", "wordpress-plugin-development",
    "wordpress-theme-development", "wordpress-woocommerce-development",
    "woocommerce",
    
    # Skip skills that reference antigravity-specific paths
    "analyze-project", "antigravity-design-expert", "antigravity-skill-orchestrator",
    "antigravity-workflows", "antigravity-awesome-skills",
    
    # Skip meta-skills that are repo-specific
    "00-andruia-consultant", "10-andruia-skill-smith", "20-andruia-niche-intelligence",
    "nerdzao-elite", "nerdzao-elite-gemini-high",
    
    # Skip skills with heavy external dependencies that won't work
    "comfyui-gateway", "fal-audio", "fal-generate", "fal-image-edit",
    "fal-platform", "fal-upscale", "fal-workflow",
    "stability-ai", "unsplash-integration",
    
    # Skip very niche/specific
    "minecraft-bukkit-pro", "godot-4-migration", "godot-gdscript-patterns",
    "unity-ai-game-creator", "unity-developer", "unity-ecs-patterns",
    "unreal-engine-cpp-pro",
    "makepad-animation", "makepad-basics", "makepad-deployment",
    "makepad-dsl", "makepad-event-action", "makepad-font",
    "makepad-layout", "makepad-platform", "makepad-reference",
    "makepad-shaders", "makepad-skills", "makepad-splash", "makepad-widgets",
}

def read_skill_frontmatter(skill_path):
    """Read and parse the YAML frontmatter from a SKILL.md file."""
    try:
        with open(skill_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check for frontmatter
        if not content.startswith('---'):
            return None, content
        
        # Extract frontmatter
        match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
        if not match:
            return None, content
        
        frontmatter_str = match.group(1)
        body = content[match.end():]
        
        # Simple YAML parsing for the fields we care about
        fm = {}
        for line in frontmatter_str.split('\n'):
            line = line.strip()
            if ':' in line and not line.startswith('#'):
                key, _, value = line.partition(':')
                key = key.strip().strip('"').strip("'")
                value = value.strip().strip('"').strip("'")
                fm[key] = value
        
        return fm, body
    except Exception as e:
        print(f"  Error reading {skill_path}: {e}")
        return None, None

def convert_frontmatter(fm, category):
    """Convert antigravity frontmatter to Hermes format."""
    name = fm.get('name', 'unknown')
    description = fm.get('description', '')
    
    # Clean up description
    description = description.strip().strip('"').strip("'")
    if len(description) > 200:
        description = description[:197] + '...'
    
    hermes_fm = {
        'name': name,
        'description': description,
        'version': '1.0.0',
        'author': 'Antigravity Awesome Skills (adapted for Hermes)',
        'license': 'MIT',
        'platforms': ['linux', 'macos', 'windows'],
    }
    
    # Build tags from available metadata
    tags = []
    if 'tags' in fm:
        tags.extend([t.strip() for t in fm['tags'].strip('[]').split(',')])
    if 'category' in fm:
        tags.append(fm['category'])
    if category:
        tags.append(category)
    
    # Add triggers as tags
    if 'triggers' in fm:
        tags.extend([t.strip() for t in fm['triggers'].split(',')][:5])
    
    # Deduplicate and clean tags
    seen = set()
    clean_tags = []
    for t in tags:
        t = t.strip().lower()
        if t and t not in seen and len(t) > 1:
            seen.add(t)
            clean_tags.append(t)
    
    hermes_fm['metadata'] = {
        'hermes': {
            'tags': clean_tags[:10],
            'source': 'antigravity-awesome-skills',
        }
    }
    
    return hermes_fm

def format_frontmatter(fm):
    """Format frontmatter dict as YAML string."""
    lines = ['---']
    for key in ['name', 'description', 'version', 'author', 'license', 'platforms']:
        if key in fm:
            val = fm[key]
            if isinstance(val, list):
                lines.append(f"{key}: [{', '.join(val)}]")
            else:
                # Quote string values that contain special chars
                val_str = str(val)
                if any(c in val_str for c in ':{}[]&*?|->!%@`'):
                    lines.append(f'{key}: "{val_str}"')
                else:
                    lines.append(f"{key}: {val_str}")
    
    if 'metadata' in fm:
        lines.append('metadata:')
        hermes_meta = fm['metadata']['hermes']
        lines.append('  hermes:')
        if 'tags' in hermes_meta:
            tags = hermes_meta['tags']
            lines.append(f'    tags: [{", ".join(tags)}]')
        if 'source' in hermes_meta:
            lines.append(f'    source: {hermes_meta["source"]}')
        if 'related_skills' in hermes_meta:
            lines.append(f'    related_skills: [{", ".join(hermes_meta["related_skills"])}]')
    
    lines.append('---')
    return '\n'.join(lines) + '\n\n'

def process_skill(skill_name, antigravity_category):
    """Process a single skill: read, convert, write to Hermes directory."""
    src_dir = os.path.join(ANTIGRAVITY_SKILLS, skill_name)
    src_file = os.path.join(src_dir, 'SKILL.md')
    
    if not os.path.isfile(src_file):
        return None
    
    # Determine Hermes category
    hermes_category = CATEGORY_MAP.get(antigravity_category)
    if hermes_category is None:
        return None
    
    # Read and convert
    fm, body = read_skill_frontmatter(src_file)
    if fm is None or body is None:
        return None
    
    # Convert frontmatter
    hermes_fm = convert_frontmatter(fm, antigravity_category)
    
    # Create destination directory
    dest_dir = os.path.join(HERMES_SKILLS, hermes_category, skill_name)
    os.makedirs(dest_dir, exist_ok=True)
    
    # Write converted skill
    dest_file = os.path.join(dest_dir, 'SKILL.md')
    with open(dest_file, 'w', encoding='utf-8') as f:
        f.write(format_frontmatter(hermes_fm))
        f.write(body)
    
    # Copy any references/ assets
    for subdir in ['references', 'templates', 'scripts', 'assets', 'resources', 'evals']:
        src_subdir = os.path.join(src_dir, subdir)
        if os.path.isdir(src_subdir):
            dest_subdir = os.path.join(dest_dir, subdir)
            shutil.copytree(src_subdir, dest_subdir, dirs_exist_ok=True)
    
    return hermes_category

def main():
    print(f"Source: {ANTIGRAVITY_SKILLS}")
    print(f"Destination: {HERMES_SKILLS}")
    print()
    
    # Read the skills index to get categories
    try:
        with open(ANTIGRAVITY_INDEX, 'r', encoding='utf-8') as f:
            # Read in chunks to avoid hanging on large file
            data = json.load(f)
    except Exception as e:
        print(f"Error reading index: {e}")
        # Fallback: scan directory
        data = None
    
    results = {}
    skipped = 0
    errors = 0
    copied = 0
    
    if data:
        # Use index data
        for entry in data:
            skill_name = entry.get('id', '')
            category = entry.get('category', 'uncategorized')
            
            if not skill_name:
                continue
            
            # Check skip list
            if skill_name in SKIP_SKILLS:
                skipped += 1
                continue
            
            # Check if source exists
            src_dir = os.path.join(ANTIGRAVITY_SKILLS, skill_name)
            if not os.path.isdir(src_dir):
                continue
            
            result = process_skill(skill_name, category)
            if result:
                results[result] = results.get(result, 0) + 1
                copied += 1
                if copied % 25 == 0:
                    print(f"  Progress: {copied} skills copied...")
            else:
                skipped += 1
    else:
        # Fallback: scan directory
        for skill_name in os.listdir(ANTIGRAVITY_SKILLS):
            if skill_name in SKIP_SKILLS:
                skipped += 1
                continue
            result = process_skill(skill_name, 'uncategorized')
            if result:
                results[result] = results.get(result, 0) + 1
                copied += 1
    
    print(f"\n=== Results ===")
    print(f"Copied: {copied} skills")
    print(f"Skipped: {skipped} skills")
    print(f"Errors: {errors} skills")
    print(f"\nBy category:")
    for cat, count in sorted(results.items()):
        print(f"  {cat}: {count} skills")
    
    return copied

if __name__ == '__main__':
    main()
