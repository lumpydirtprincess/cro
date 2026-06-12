#!/usr/bin/env python3
"""
WORKSPACE EXPLAINER AGENT
Walks any workspace and explains: what each folder/file is, why it's there,
what language/tool it uses, and its likely purpose.

Usage:
  python workspace_explainer.py /path/to/workspace [--output report.md] [--depth 3]
"""

import os, sys, json, argparse
from pathlib import Path
from collections import defaultdict
from datetime import datetime

EXT_LANG = {
    '.py': 'Python', '.js': 'JavaScript', '.ts': 'TypeScript', '.jsx': 'React JSX',
    '.tsx': 'React TSX', '.java': 'Java', '.go': 'Go', '.rs': 'Rust', '.rb': 'Ruby',
    '.php': 'PHP', '.c': 'C', '.cpp': 'C++', '.h': 'C/C++ Header', '.cs': 'C#',
    '.swift': 'Swift', '.kt': 'Kotlin', '.scala': 'Scala', '.r': 'R',
    '.m': 'Objective-C/MATLAB', '.sh': 'Shell', '.bash': 'Bash', '.zsh': 'Zsh',
    '.fish': 'Fish', '.ps1': 'PowerShell', '.bat': 'Batch', '.cmd': 'Windows CMD',
    '.html': 'HTML', '.css': 'CSS', '.scss': 'SASS', '.less': 'LESS',
    '.json': 'JSON', '.yaml': 'YAML', '.yml': 'YAML', '.toml': 'TOML',
    '.xml': 'XML', '.ini': 'INI', '.cfg': 'Config', '.conf': 'Config',
    '.md': 'Markdown', '.rst': 'reStructuredText', '.tex': 'LaTeX',
    '.sql': 'SQL', '.graphql': 'GraphQL', '.proto': 'Protocol Buffers',
    '.dockerfile': 'Dockerfile', '.tf': 'Terraform', '.hcl': 'HCL',
    '.lua': 'Lua', '.pl': 'Perl', '.pm': 'Perl Module',
    '.ex': 'Elixir', '.exs': 'Elixir', '.erl': 'Erlang',
    '.hs': 'Haskell', '.ml': 'OCaml/SML',
    '.ipynb': 'Jupyter Notebook', '.rkt': 'Racket',
    '.wasm': 'WebAssembly', '.wat': 'WebAssembly Text',
}

FOLDER_PURPOSES = {
    'src': 'Source code',
    'lib': 'Shared libraries',
    'libs': 'Shared libraries',
    'include': 'C/C++ headers',
    'bin': 'Compiled binaries / scripts',
    'scripts': 'Utility scripts',
    'test': 'Tests',
    'tests': 'Tests',
    'docs': 'Documentation',
    'doc': 'Documentation',
    'examples': 'Usage examples',
    'examples': 'Usage examples',
    'config': 'Configuration files',
    'configs': 'Configuration files',
    'assets': 'Static assets (images, fonts, etc)',
    'static': 'Static web assets',
    'public': 'Public web root',
    'dist': 'Build output / distribution',
    'build': 'Build artifacts',
    'out': 'Build output',
    'node_modules': 'Node.js dependencies',
    'vendor': 'Third-party / vendored code',
    'venv': 'Python virtual environment',
    '.venv': 'Python virtual environment',
    'env': 'Environment / secrets',
    '.env': 'Environment variables',
    'data': 'Data files',
    'models': 'ML models / data models',
    'migrations': 'Database migrations',
    'alembic': 'Alembic DB migrations',
    'sql': 'SQL files',
    'proto': 'Protocol buffer definitions',
    'grpc': 'gRPC services',
    'docker': 'Docker configs',
    '.github': 'GitHub config (CI, actions, templates)',
    '.gitlab': 'GitLab config',
    '.vscode': 'VS Code settings',
    '.idea': 'JetBrains IDE settings',
    'logs': 'Log files',
    'tmp': 'Temporary files',
    'temp': 'Temporary files',
    'cache': 'Cache data',
    '__pycache__': 'Python bytecode cache',
    '.next': 'Next.js build output',
    '.nuxt': 'Nuxt build output',
    'coverage': 'Test coverage reports',
    'reports': 'Reports / analytics output',
    'tools': 'Dev tools / scripts',
    'hooks': 'Git or system hooks',
    'templates': 'Templates / boilerplate',
    'partials': 'Template partials',
    'layouts': 'Layout templates',
    'components': 'UI components / modules',
    'pages': 'Page definitions',
    'routes': 'Route definitions',
    'controllers': 'Controllers (MVC)',
    'views': 'Views / templates',
    'middleware': 'Middleware / interceptors',
    'services': 'Business logic services',
    'repositories': 'Data repositories / DAOs',
    'entities': 'Domain entities / ORM models',
    'schemas': 'Schema definitions',
    'api': 'API endpoints / definitions',
    'grpc': 'gRPC services',
    'workers': 'Background workers / queues',
    'jobs': 'Scheduled jobs / tasks',
    'cron': 'Cron configuration',
    'migrations': 'DB migration scripts',
    'seeds': 'Database seed data',
    'fixtures': 'Test fixtures',
    'mocks': 'Mock data for tests',
    'notebooks': 'Jupyter notebooks',
    'research': 'Research notes / papers',
    'papers': 'Academic papers',
    'scripts': 'Executable scripts',
    'bin': 'Binary/executable files',
    'man': 'Unix man pages',
    'locale': 'Localization / i18n',
    'i18n': 'Internationalization',
    'translations': 'Translation files',
    'plugins': 'Plugins / extensions',
    'extensions': 'Extensions / addons',
    'themes': 'UI themes',
    'packages': 'Packages / monorepo workspaces',
    'apps': 'Applications / sub-apps',
    'services': 'Microservices',
    'infra': 'Infrastructure / IaC',
    'terraform': 'Terraform configs',
    'ansible': 'Ansible playbooks',
    'k8s': 'Kubernetes manifests',
    'helm': 'Helm charts',
    'deploy': 'Deployment configs',
    'monitoring': 'Monitoring / alerting configs',
    'alerts': 'Alert definitions',
    'dashboards': 'Dashboard configs',
    'security': 'Security policies / scanners',
    'policies': 'Policy definitions',
}

FILE_PURPOSES = {
    'readme': 'Project overview, setup instructions',
    'license': 'Software license',
    'changelog': 'Version history',
    'changelog.md': 'Version history',
    'contributing': 'Contribution guidelines',
    'makefile': 'Build automation (make)',
    'dockerfile': 'Container image instructions',
    '.dockerignore': 'Docker build exclusions',
    '.gitignore': 'Git exclusions',
    '.gitattributes': 'Git attributes / line ending rules',
    'package.json': 'Node.js project manifest',
    'package-lock.json': 'Node.js dependency lock',
    'tsconfig.json': 'TypeScript compiler config',
    'vite.config': 'Vite bundler config',
    'webpack.config': 'Webpack bundler config',
    'babel.config': 'Babel transpiler config',
    '.eslintrc': 'ESLint linting rules',
    '.prettierrc': 'Prettier formatting rules',
    'requirements.txt': 'Python dependencies (pip)',
    'pyproject.toml': 'Python project config + deps',
    'setup.py': 'Python package setup',
    'setup.cfg': 'Python package config',
    'pipfile': 'Python deps (Pipenv)',
    'poetry.lock': 'Python deps (Poetry)',
    'cargo.toml': 'Rust project manifest',
    'go.mod': 'Go module manifest',
    'pom.xml': 'Java/Maven project',
    'build.gradle': 'Java/Kotlin (Gradle)',
    'gemfile': 'Ruby dependencies',
    'composer.json': 'PHP dependencies',
    'pom.xml': 'Java Maven config',
    '.env.example': 'Environment variable template',
    '.env': 'Environment variables (secrets — should NOT be committed)',
    'docker-compose.yml': 'Multi-container Docker setup',
    'docker-compose.yaml': 'Multi-container Docker setup',
    'compose.yml': 'Docker Compose v2',
    'compose.yaml': 'Docker Compose v2',
    'k8s': 'Kubernetes manifest',
    'deployment.yaml': 'Kubernetes deployment',
    'service.yaml': 'Kubernetes service',
    'ingress.yaml': 'Kubernetes ingress',
    '.env.local': 'Local overrides (Next.js etc)',
    'next.config': 'Next.js framework config',
    'nuxt.config': 'Nuxt framework config',
    'svelte.config': 'SvelteKit config',
    'angular.json': 'Angular workspace config',
    'vue.config': 'Vue CLI config',
    'tailwind.config': 'Tailwind CSS config',
    'postcss.config': 'PostCSS config',
    'jest.config': 'Jest test runner config',
    'vitest.config': 'Vitest test runner config',
    'pytest.ini': 'Pytest config',
    '.coveragerc': 'Coverage.py config',
    'tox.ini': 'Tox multi-env test config',
    'pyrightconfig.json': 'Pyright type checker config',
    '.pylintrc': 'Pylint config',
    'pyproject.toml': 'Modern Python project metadata + config',
    'manifest.json': 'PWA or extension manifest',
    'robots.txt': 'Search engine crawl rules',
    'sitemap.xml': 'Site map for SEO',
    'favicon.ico': 'Browser tab icon',
    'index.html': 'Main HTML entry point',
    'main.py': 'Application entry point (Python)',
    'app.py': 'Application entry (Flask/FastAPI)',
    'manage.py': 'Django management script',
    'wsgi.py': 'WSGI server entry',
    'asgi.py': 'ASGI server entry',
    'cli.py': 'CLI entry point',
    '__main__.py': 'Python package entry',
    'main.ts': 'TypeScript entry point',
    'index.ts': 'TypeScript entry index',
    'index.js': 'JavaScript entry index',
    'server.js': 'Node server entry',
    'main.js': 'JavaScript entry point',
    'index.jsx': 'React entry JSX',
    'app.tsx': 'React app component',
    'app.jsx': 'React app component',
    'main.rs': 'Rust entry point',
    'main.go': 'Go entry point',
    'cmd': 'Go command entry',
    'pkg': 'Go library packages',
    'internal': 'Go private packages',
    'api': 'API definitions / routes',
    'cmd': 'Go CLIs / command definitions',
    'cmd': 'Command-line tool entry points',
}

def detect_language(path: Path) -> str:
    if path.is_dir():
        return 'Directory'
    suffix = path.suffix.lower()
    if suffix in EXT_LANG:
        return EXT_LANG[suffix]
    name = path.name.lower()
    if name in ('dockerfile', 'makefile', 'gemfile', 'pipfile', 'vagrantfile'):
        return name.capitalize()
    if name.startswith('.') and not suffix:
        return 'Hidden/Config'
    if suffix:
        return f'Unknown ({suffix})'
    return 'File'

def guess_purpose(path: Path, rel: str) -> str:
    name = path.name.lower()
    rel_parts = [p.lower() for p in Path(rel).parts]
    # Folder match
    for part in rel_parts:
        if part in FOLDER_PURPOSES:
            return FOLDER_PURPOSES[part]
    # File match
    for key, val in FILE_PURPOSES.items():
        if name == key or name.startswith(key + '.'):
            return val
    # Heuristics
    if path.is_dir():
        if name.startswith('.'):
            return f'Hidden/system folder (likely IDE, editor, or tool config)'
        if name in ('__pycache__', '.pytest_cache', '.mypy_cache', '.ruff_cache'):
            return 'Tool cache — can be regenerated'
        return 'Project folder/directory'
    if path.is_file():
        if name.startswith('.'):
            return 'Hidden config or metadata'
        if 'test' in name or 'spec' in name:
            return 'Test file'
        if 'config' in name or 'config' in rel_parts:
            return 'Configuration'
        if 'example' in name or 'sample' in name:
            return 'Example / sample file'
        if 'readme' in name:
            return 'Readme / documentation'
        if 'license' in name:
            return 'License file'
        if 'changelog' in name:
            return 'Change history'
        if 'requirements' in name:
            return 'Python dependency list'
        if 'setup' in name:
            return 'Python package setup'
        if 'docker' in name:
            return 'Docker related'
        if 'makefile' in name:
            return 'Build instructions'
        if name.endswith('.lock'):
            return 'Dependency lockfile (auto-generated)'
        if name.endswith('.log'):
            return 'Log file'
        if name.endswith('.tmp') or name.endswith('.temp'):
            return 'Temporary file'
        return 'File'
    return 'Unknown'

def scan_workspace(root: Path, max_depth: int = 3):
    report = {
        'root': str(root),
        'scanned_at': datetime.now().isoformat(),
        'max_depth': max_depth,
        'structure': [],
        'summary': defaultdict(lambda: {'count': 0, 'examples': []}),
        'stats': {'total_files': 0, 'total_dirs': 0, 'languages': defaultdict(int)},
    }

    for dirpath, dirnames, filenames in os.walk(root):
        dirpath = Path(dirpath)
        rel = dirpath.relative_to(root)
        depth = len(rel.parts)
        if depth > max_depth:
            dirnames[:] = []
            continue
        # Skip common noise dirs
        skip_dirs = {'node_modules', 'venv', '.venv', '__pycache__', '.git', 'dist', 'build', '.next'}
        dirnames[:] = [d for d in dirnames if d not in skip_dirs and not d.startswith('.')]

        entries = []
        for d in sorted(dirnames):
            dp = dirpath / d
            entries.append({'name': d, 'type': 'dir', 'path': str(dp), 'rel': str(rel / d), 'depth': depth+1})
        for f in sorted(filenames):
            fp = dirpath / f
            lang = detect_language(fp)
            entries.append({'name': f, 'type': 'file', 'path': str(fp), 'rel': str(rel / f), 'depth': depth+1, 'language': lang})
            report['stats']['total_files'] += 1
            if lang not in ('Directory', 'Hidden/Config', 'File', 'Unknown'):
                report['stats']['languages'][lang] += 1

        if entries:
            for e in entries:
                purpose = guess_purpose(Path(e['path']), e['rel'])
                e['purpose'] = purpose
                if e['type'] == 'dir':
                    report['stats']['total_dirs'] += 1
                    report['summary']['directories']['count'] += 1
                    if len(report['summary']['directories']['examples']) < 5:
                        report['summary']['directories']['examples'].append(e['name'])
                else:
                    cat = e.get('language', 'Other')
                    report['summary'][cat]['count'] += 1
                    if len(report['summary'][cat]['examples']) < 3:
                        report['summary'][cat]['examples'].append(e['name'])

            report['structure'].append({'path': str(rel), 'entries': entries})
    return report

def format_report(report: dict) -> str:
    lines = []
    lines.append(f"# WORKSPACE REPORT: {report['root']}")
    lines.append(f"Generated: {report['scanned_at']}")
    lines.append(f"")
    lines.append(f"## Overview")
    lines.append(f"- **Total files:** {report['stats']['total_files']}")
    lines.append(f"- **Total directories:** {report['stats']['total_dirs']}")
    langs = sorted(report['stats']['languages'].items(), key=lambda x: -x[1])
    lines.append(f"- **Languages detected:** {', '.join(f'{l} ({c})' for l, c in langs[:10]) or 'None recognized'}")
    lines.append(f"")
    lines.append(f"## Directory Structure (depth {report['max_depth']})")
    lines.append(f"")
    for section in report['structure']:
        if section['path'] == '.':
            header = '/'
        else:
            header = section['path'] + '/'
        lines.append(f"### {header}")
        for e in section['entries']:
            icon = '📁' if e['type'] == 'dir' else '📄'
            lang = f" [{e.get('language', '')}]" if e['type'] == 'file' else ''
            lines.append(f"- {icon} **{e['name']}**{lang}\n")
            lines.append(f"  - **What:** {e['type']}")
            lines.append(f"  - **Language/Tool:** {e.get('language', 'N/A')}")
            lines.append(f"  - **Purpose:** {e['purpose']}")
            lines.append(f"  - **Path:** `{e['rel']}`")
            lines.append(f"")
    lines.append(f"## Language Summary")
    for lang, info in sorted(report['summary'].items()):
        if lang == 'directories':
            continue
        ex = ', '.join(info['examples']) if info['examples'] else 'various'
        lines.append(f"- **{lang}:** {info['count']} file(s) — examples: {ex}")
    lines.append(f"")
    lines.append(f"---")
    lines.append(f"*Generated by workspace_explainer.py*")
    return '\n'.join(lines)

def main():
    parser = argparse.ArgumentParser(description='Explain any workspace directory')
    parser.add_argument('workspace', type=str, nargs='?', default=os.getcwd(), help='Path to workspace root (defaults to current directory)')
    parser.add_argument('--output', '-o', type=str, help='Output markdown file')
    parser.add_argument('--depth', '-d', type=int, default=3, help='Max recursion depth (default 3)')
    parser.add_argument('--json', action='store_true', help='Output raw JSON instead of markdown')
    args = parser.parse_args()

    root = Path(args.workspace).resolve()
    if not root.exists() or not root.is_dir():
        print(f"Error: {root} is not a directory")
        sys.exit(1)

    print(f"Scanning: {root}")
    report = scan_workspace(root, max_depth=args.depth)
    print(f"Found: {report['stats']['total_files']} files, {report['stats']['total_dirs']} directories")

    if args.json:
        out = json.dumps(report, indent=2, default=str)
    else:
        out = format_report(report)

    if args.output:
        Path(args.output).write_text(out, encoding='utf-8')
        print(f"Report saved: {args.output}")
    else:
        print(out)

if __name__ == '__main__':
    main()
