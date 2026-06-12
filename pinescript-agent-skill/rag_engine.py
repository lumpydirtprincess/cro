#!/usr/bin/env python3
"""
PineScript v6 RAG Engine
Semantic search and retrieval system for the PineScript documentation.
Uses TF-IDF + cosine similarity for fast, accurate retrieval without external APIs.
"""

import os
import re
import json
import math
from pathlib import Path
from typing import List, Dict, Tuple, Optional
from collections import defaultdict, Counter

class PineScriptRAG:
    def __init__(self, base_path: str = r"D:\Cro\pinescript section"):
        self.base_path = Path(base_path)
        self.user_manual_path = self.base_path / "Official Pinescript docs" / "pinescript_user_manual"
        self.reference_path = self.base_path / "Official Pinescript docs" / "reference manual"
        self.reference_combined = self.base_path / "Official Pinescript docs" / "pinescript_v6_reference_manual_combined.md"
        self.training_path = self.base_path / "scripts for training" / "quantitative" / "indicators"
        
        self.documents: List[Dict] = []
        self.index: Dict[str, Dict[str, float]] = {}  # doc_id -> {term: tfidf}
        self.idf: Dict[str, float] = {}
        self.vocabulary: set = set()
        
    def _tokenize(self, text: str) -> List[str]:
        """Simple but effective tokenization for code + markdown."""
        # Lowercase
        text = text.lower()
        # Split on non-alphanumeric but keep dots (for function names like ta.rsi)
        tokens = re.findall(r'[a-z0-9_]+(?:\.[a-z0-9_]+)*', text)
        # Filter very short tokens
        return [t for t in tokens if len(t) >= 2]
    
    def _extract_pine_functions(self, text: str) -> List[str]:
        """Extract PineScript function calls from code."""
        # Match patterns like ta.rsi(), math.abs(), array.new_float(), etc.
        funcs = re.findall(r'\b([a-z_][a-z0-9_]*(?:\.[a-z_][a-z0-9_]*)*)\s*\(', text)
        return [f.lower() for f in funcs]
    
    def build_index(self):
        """Build TF-IDF index from all documentation sources."""
        print("Building PineScript v6 RAG index...")
        self.documents = []
        
        # 1. Index user manual
        for section_dir in sorted(self.user_manual_path.iterdir()):
            if section_dir.is_dir():
                for md_file in sorted(section_dir.glob("*.md")):
                    content = md_file.read_text(encoding='utf-8', errors='ignore')
                    doc_id = f"user_manual/{section_dir.name}/{md_file.stem}"
                    self.documents.append({
                        "id": doc_id,
                        "path": str(md_file),
                        "type": "user_manual",
                        "section": section_dir.name,
                        "title": md_file.stem,
                        "content": content,
                        "tokens": self._tokenize(content),
                        "functions": self._extract_pine_functions(content)
                    })
        
        # 2. Index reference manual
        for cat_dir in sorted(self.reference_path.iterdir()):
            if cat_dir.is_dir() and cat_dir.name != ".obsidian":
                for md_file in sorted(cat_dir.glob("*.md")):
                    content = md_file.read_text(encoding='utf-8', errors='ignore')
                    doc_id = f"reference/{cat_dir.name}/{md_file.stem}"
                    self.documents.append({
                        "id": doc_id,
                        "path": str(md_file),
                        "type": "reference",
                        "section": cat_dir.name,
                        "title": md_file.stem,
                        "content": content,
                        "tokens": self._tokenize(content),
                        "functions": self._extract_pine_functions(content)
                    })
        
        # 3. Index training scripts (.pine + .md pairs)
        for cat_dir in sorted(self.training_path.iterdir()):
            if cat_dir.is_dir() and cat_dir.name != "temp":
                # Index .md files
                for md_file in sorted(cat_dir.glob("*.md")):
                    if md_file.name == "_index.md":
                        continue
                    content = md_file.read_text(encoding='utf-8', errors='ignore')
                    # Also load the paired .pine file
                    pine_file = md_file.with_suffix(".pine")
                    pine_content = ""
                    if pine_file.exists():
                        pine_content = pine_file.read_text(encoding='utf-8', errors='ignore')
                    
                    combined = f"{content}\n\n--- PINE CODE ---\n\n{pine_content}"
                    doc_id = f"training/{cat_dir.name}/{md_file.stem}"
                    self.documents.append({
                        "id": doc_id,
                        "path": str(md_file),
                        "type": "training",
                        "section": cat_dir.name,
                        "title": md_file.stem,
                        "content": combined,
                        "tokens": self._tokenize(combined),
                        "functions": self._extract_pine_functions(combined)
                    })
        
        # Build TF-IDF
        N = len(self.documents)
        print(f"  Indexed {N} documents. Computing TF-IDF...")
        
        # Compute term frequency per document
        tf_per_doc = []
        doc_freq = Counter()
        
        for doc in self.documents:
            tf = Counter(doc["tokens"])
            # Boost function names (they're more important)
            for func in doc["tokens"]:
                if '.' in func:  # Likely a function call
                    tf[func] *= 3.0
            tf_per_doc.append(tf)
            for term in set(doc["tokens"]):
                doc_freq[term] += 1
        
        # Compute IDF
        self.idf = {}
        for term, df in doc_freq.items():
            self.idf[term] = math.log((N + 1) / (df + 1)) + 1  # Smoothed IDF
        
        # Compute TF-IDF vectors
        self.index = {}
        for i, doc in enumerate(self.documents):
            tf = tf_per_doc[i]
            max_tf = max(tf.values()) if tf else 1
            tfidf = {}
            for term, count in tf.items():
                normalized_tf = 0.5 + 0.5 * (count / max_tf)  # Augmented TF
                tfidf[term] = normalized_tf * self.idf.get(term, 0)
            self.index[doc["id"]] = tfidf
        
        self.vocabulary = set(self.idf.keys())
        print(f"  Vocabulary size: {len(self.vocabulary)} terms")
        print(f"  Index complete: {N} documents ready for search")
        
        return self
    
    def search(self, query: str, top_k: int = 5, doc_type: Optional[str] = None) -> List[Dict]:
        """Search documents using cosine similarity."""
        query_tokens = self._tokenize(query)
        
        # Build query TF-IDF vector
        query_tf = Counter(query_tokens)
        max_qf = max(query_tf.values()) if query_tf else 1
        query_vec = {}
        for term, count in query_tf.items():
            if term in self.idf:
                normalized_tf = 0.5 + 0.5 * (count / max_qf)
                query_vec[term] = normalized_tf * self.idf[term]
        
        if not query_vec:
            return []
        
        # Compute cosine similarity with all documents
        query_norm = math.sqrt(sum(v**2 for v in query_vec.values()))
        scores = []
        
        for doc in self.documents:
            if doc_type and doc["type"] != doc_type:
                continue
            
            doc_vec = self.index.get(doc["id"], {})
            if not doc_vec:
                continue
            
            # Dot product
            dot = sum(query_vec.get(term, 0) * doc_vec.get(term, 0) for term in query_vec)
            doc_norm = math.sqrt(sum(v**2 for v in doc_vec.values()))
            
            if doc_norm == 0 or query_norm == 0:
                continue
            
            similarity = dot / (query_norm * doc_norm)
            
            # Boost for function name matches
            query_funcs = set(self._extract_pine_functions(query))
            doc_funcs = set(doc["functions"])
            if query_funcs & doc_funcs:
                similarity *= 1.5
            
            if similarity > 0:
                scores.append((similarity, doc))
        
        # Sort by score descending
        scores.sort(key=lambda x: x[0], reverse=True)
        
        results = []
        for score, doc in scores[:top_k]:
            results.append({
                "score": round(score, 4),
                "id": doc["id"],
                "type": doc["type"],
                "section": doc["section"],
                "title": doc["title"],
                "path": doc["path"],
                "snippet": self._get_snippet(doc["content"], query_tokens)
            })
        
        return results
    
    def _get_snippet(self, content: str, query_tokens: List[str], max_length: int = 300) -> str:
        """Extract a relevant snippet from the document."""
        lines = content.split('\n')
        
        # Score each line by query token overlap
        best_line_idx = 0
        best_score = 0
        
        for i, line in enumerate(lines):
            line_lower = line.lower()
            score = sum(1 for t in query_tokens if t in line_lower)
            if score > best_score:
                best_score = score
                best_line_idx = i
        
        # Return context around best line
        start = max(0, best_line_idx - 2)
        end = min(len(lines), best_line_idx + 8)
        snippet = '\n'.join(lines[start:end]).strip()
        
        if len(snippet) > max_length:
            snippet = snippet[:max_length] + "..."
        
        return snippet
    
    def get_document(self, doc_id: str) -> Optional[str]:
        """Get full document content by ID."""
        for doc in self.documents:
            if doc["id"] == doc_id:
                return doc["content"]
        return None
    
    def save_index(self, path: str = "rag_index.json"):
        """Save the index to disk for fast reloading."""
        data = {
            "documents": [
                {
                    "id": d["id"],
                    "path": d["path"],
                    "type": d["type"],
                    "section": d["section"],
                    "title": d["title"]
                }
                for d in self.documents
            ],
            "tfidf": self.index,
            "idf": self.idf,
            "vocabulary_size": len(self.vocabulary)
        }
        with open(path, 'w') as f:
            json.dump(data, f)
        print(f"Index saved to {path} ({len(self.documents)} docs, {len(self.vocabulary)} terms)")
    
    def get_stats(self) -> Dict:
        """Get index statistics."""
        type_counts = Counter(d["type"] for d in self.documents)
        section_counts = Counter(d["section"] for d in self.documents)
        return {
            "total_documents": len(self.documents),
            "vocabulary_size": len(self.vocabulary),
            "by_type": dict(type_counts),
            "by_section": dict(section_counts.most_common(20))
        }


def main():
    rag = PineScriptRAG()
    rag.build_index()
    
    # Print stats
    stats = rag.get_stats()
    print(f"\n=== RAG Index Statistics ===")
    print(f"Documents: {stats['total_documents']}")
    print(f"Vocabulary: {stats['vocabulary_size']} terms")
    print(f"By type: {stats['by_type']}")
    
    # Test searches
    test_queries = [
        "rsi relative strength index",
        "array manipulation sort",
        "strategy entry exit orders",
        "plotting shapes labels",
        "matrix operations linear algebra",
        "kalman filter",
        "exponential moving average ema",
        "security function multi-timeframe"
    ]
    
    print(f"\n=== Test Searches ===")
    for query in test_queries:
        results = rag.search(query, top_k=3)
        print(f"\n🔍 Query: '{query}'")
        for r in results:
            print(f"  [{r['score']:.3f}] {r['id']}")
            print(f"    {r['snippet'][:120]}...")
    
    # Save index
    rag.save_index("rag_index.json")

if __name__ == "__main__":
    main()
