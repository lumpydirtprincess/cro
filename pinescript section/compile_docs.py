import os
import re

# Define paths
DOCS_DIR = r"d:\Cro\pinescript section\Official Pinescript docs"
USER_MANUAL_DIR = os.path.join(DOCS_DIR, "pinescript_user_manual")
REF_MANUAL_DIR = os.path.join(DOCS_DIR, "reference manual")

USER_MANUAL_OUT = os.path.join(DOCS_DIR, "pinescript_v6_user_manual_combined.md")
REF_MANUAL_OUT = os.path.join(DOCS_DIR, "pinescript_v6_reference_manual_combined.md")

def get_logical_sort_key(name):
    # Extracts leading numbers for natural sorting (e.g., "1. Concepts" -> 1)
    match = re.match(r"^(\d+)", name)
    if match:
        return (int(match.group(1)), name)
    return (999, name)

def compile_user_manual():
    print("Compiling Pine Script v6 User Manual...")
    if not os.path.exists(USER_MANUAL_DIR):
        print(f"Error: User manual directory not found at {USER_MANUAL_DIR}")
        return

    combined_content = []
    combined_content.append("# Pine Script v6 User Manual (Combined)")
    combined_content.append("This document contains the complete, official Pine Script v6 User Manual.\n\n---\n")

    # Get categories (e.g., 1. Concepts, 2. Visuals, etc.)
    categories = sorted([d for d in os.listdir(USER_MANUAL_DIR) if os.path.isdir(os.path.join(USER_MANUAL_DIR, d))], key=get_logical_sort_key)

    for cat in categories:
        cat_path = os.path.join(USER_MANUAL_DIR, cat)
        print(f"  Processing category: {cat}")
        combined_content.append(f"\n# CHAPTER: {cat}\n")
        
        # Get md files in category
        files = sorted([f for f in os.listdir(cat_path) if f.endswith(".md")], key=get_logical_sort_key)
        for f in files:
            file_path = os.path.join(cat_path, f)
            title = os.path.splitext(f)[0]
            
            with open(file_path, "r", encoding="utf-8", errors="ignore") as file_in:
                content = file_in.read()
                
            combined_content.append(f"\n## Section: {cat} > {title}\n")
            combined_content.append(content)
            combined_content.append("\n---\n")

    # Write output file
    with open(USER_MANUAL_OUT, "w", encoding="utf-8") as file_out:
        file_out.write("\n".join(combined_content))
    
    char_count = len("\n".join(combined_content))
    est_tokens = int(char_count / 4)
    print(f"Finished compiling User Manual: {char_count} characters (~{est_tokens} tokens) saved to {USER_MANUAL_OUT}")

def compile_reference_manual():
    print("Compiling Pine Script v6 Reference Manual...")
    if not os.path.exists(REF_MANUAL_DIR):
        print(f"Error: Reference manual directory not found at {REF_MANUAL_DIR}")
        return

    combined_content = []
    combined_content.append("# Pine Script v6 Reference Manual (Combined)")
    combined_content.append("This document contains the complete, official Pine Script v6 Reference Manual grouped by category.\n\n---\n")

    # Categories inside reference manual (annotations, constants, functions, keywords, operators, types, variables)
    categories = sorted([d for d in os.listdir(REF_MANUAL_DIR) if os.path.isdir(os.path.join(REF_MANUAL_DIR, d)) and not d.startswith(".")])

    for cat in categories:
        cat_path = os.path.join(REF_MANUAL_DIR, cat)
        print(f"  Processing category: {cat}")
        combined_content.append(f"\n# CATEGORY: {cat.upper()}\n")
        
        # Get md files (terms/functions)
        files = sorted([f for f in os.listdir(cat_path) if f.endswith(".md")])
        for f in files:
            file_path = os.path.join(cat_path, f)
            term_name = os.path.splitext(f)[0]
            
            with open(file_path, "r", encoding="utf-8", errors="ignore") as file_in:
                content = file_in.read()
                
            combined_content.append(f"\n## Symbol: {cat} > {term_name}\n")
            combined_content.append(content)
            combined_content.append("\n---\n")

    # Write output file
    with open(REF_MANUAL_OUT, "w", encoding="utf-8") as file_out:
        file_out.write("\n".join(combined_content))
        
    char_count = len("\n".join(combined_content))
    est_tokens = int(char_count / 4)
    print(f"Finished compiling Reference Manual: {char_count} characters (~{est_tokens} tokens) saved to {REF_MANUAL_OUT}")

if __name__ == "__main__":
    compile_user_manual()
    print()
    compile_reference_manual()
    print("\nAll files compiled successfully!")
