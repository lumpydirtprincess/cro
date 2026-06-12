#!/usr/bin/env python3
"""
PineScript v6 Documentation Loader
Provides easy access to the three documentation sources for the agent.
"""

import os
from pathlib import Path
from typing import List, Dict, Optional
import json

class PineScriptDocLoader:
    def __init__(self, base_path: str = r"D:\Cro\pinescript section"):
        self.base_path = Path(base_path)
        self.user_manual_path = self.base_path / "Official Pinescript docs" / "pinescript_user_manual"
        self.reference_path = self.base_path / "Official Pinescript docs" / "reference manual"
        self.reference_combined = self.base_path / "Official Pinescript docs" / "pinescript_v6_reference_manual_combined.md"
        self.training_path = self.base_path / "scripts for training" / "quantitative" / "indicators"
        
    def list_user_manual_sections(self) -> Dict[str, List[str]]:
        """List all user manual sections and their files."""
        sections = {}
        for section_dir in sorted(self.user_manual_path.iterdir()):
            if section_dir.is_dir():
                files = [f.name for f in section_dir.glob("*.md")]
                sections[section_dir.name] = sorted(files)
        return sections
    
    def list_reference_categories(self) -> Dict[str, List[str]]:
        """List all reference manual categories and their files."""
        categories = {}
        for cat_dir in sorted(self.reference_path.iterdir()):
            if cat_dir.is_dir():
                files = [f.name for f in cat_dir.glob("*.md")]
                categories[cat_dir.name] = sorted(files)
        return categories
    
    def list_training_categories(self) -> Dict[str, List[str]]:
        """List all training indicator categories."""
        categories = {}
        for cat_dir in sorted(self.training_path.iterdir()):
            if cat_dir.is_dir() and cat_dir.name != "temp":
                files = [f.name for f in cat_dir.glob("*.pine")]
                md_files = [f.name for f in cat_dir.glob("*.md")]
                if files or md_files:
                    categories[cat_dir.name] = {
                        "pine": sorted(files),
                        "md": sorted(md_files)
                    }
        return categories
    
    def read_user_manual(self, section: str, filename: str) -> Optional[str]:
        """Read a user manual file."""
        path = self.user_manual_path / section / filename
        if path.exists():
            return path.read_text(encoding='utf-8')
        return None
    
    def read_reference(self, category: str, filename: str) -> Optional[str]:
        """Read a reference manual file."""
        path = self.reference_path / category / filename
        if path.exists():
            return path.read_text(encoding='utf-8')
        return None
    
    def read_training_script(self, category: str, filename: str) -> Optional[str]:
        """Read a training script (.pine or .md)."""
        path = self.training_path / category / filename
        if path.exists():
            return path.read_text(encoding='utf-8')
        return None
    
    def search_functions(self, query: str) -> List[str]:
        """Search for functions in reference manual."""
        results = []
        for cat_dir in self.reference_path.iterdir():
            if cat_dir.is_dir():
                for md_file in cat_dir.glob("*.md"):
                    content = md_file.read_text(encoding='utf-8')
                    if query.lower() in content.lower():
                        results.append(f"{cat_dir.name}/{md_file.name}")
        return results
    
    def search_training(self, query: str) -> List[str]:
        """Search for code in training scripts."""
        results = []
        for cat_dir in self.training_path.iterdir():
            if cat_dir.is_dir():
                for pine_file in cat_dir.glob("*.pine"):
                    content = pine_file.read_text(encoding='utf-8')
                    if query.lower() in content.lower():
                        results.append(f"{cat_dir.name}/{pine_file.name}")
        return results
    
    def get_full_index(self) -> Dict:
        """Get complete index of all documentation."""
        return {
            "user_manual": self.list_user_manual_sections(),
            "reference_manual": self.list_reference_categories(),
            "training_scripts": self.list_training_categories()
        }

def main():
    loader = PineScriptDocLoader()
    
    print("=== PineScript v6 Documentation Index ===\n")
    
    print("📚 USER MANUAL SECTIONS:")
    for section, files in loader.list_user_manual_sections().items():
        print(f"  {section}: {len(files)} files")
        for f in files[:3]:
            print(f"    - {f}")
        if len(files) > 3:
            print(f"    ... and {len(files) - 3} more")
    
    print("\n📖 REFERENCE MANUAL CATEGORIES:")
    for cat, files in loader.list_reference_categories().items():
        print(f"  {cat}: {len(files)} files")
    
    print("\n🧮 TRAINING SCRIPT CATEGORIES:")
    for cat, files in loader.list_training_categories().items():
        print(f"  {cat}: {len(files['pine'])} .pine, {len(files['md'])} .md")
    
    # Save full index
    index = loader.get_full_index()
    with open("pinescript_doc_index.json", "w") as f:
        json.dump(index, f, indent=2)
    print("\n✅ Full index saved to pinescript_doc_index.json")

if __name__ == "__main__":
    main()