"""
Pre-submission archive generator for JanSetu PoC.
Packages repository into a clean, lightweight jansetu-poc-submission.zip
strictly excluding node_modules, .next, venv, .venv, caches, live .env secrets, and git metadata.
"""

import os
import zipfile
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent
OUTPUT_ZIP = REPO_ROOT / "jansetu-poc-submission.zip"

EXCLUDE_DIRS = {
    "node_modules",
    ".next",
    "venv",
    ".venv",
    "__pycache__",
    ".pytest_cache",
    ".git",
    "out",
    "dist",
    "coverage",
    ".idea",
    ".vscode",
}

EXCLUDE_EXTENSIONS = {
    ".pyc",
    ".pyo",
    ".pyd",
    ".zip",
    ".tar",
    ".gz",
}

EXCLUDE_FILES = {
    ".DS_Store",
    "Thumbs.db",
    "create_submission_zip.py",
}

def is_excluded(path: Path) -> bool:
    # Check directory components
    for part in path.parts:
        if part in EXCLUDE_DIRS:
            return True

    # Check file name
    name = path.name
    if name in EXCLUDE_FILES:
        return True

    # Check extensions
    if path.suffix in EXCLUDE_EXTENSIONS:
        return True

    # Secret environment files check:
    # Exclude any .env or .env.local or .env.production, EXCEPT .env.example
    if name.startswith(".env") and not name.endswith(".example"):
        return True

    # Exclude jansetu.db sqlite file
    if name in {"jansetu.db", "jansetu.sqlite"}:
        return True

    return False

def create_archive():
    print(f"Creating submission ZIP: {OUTPUT_ZIP.name}")
    print(f"Source Directory: {REPO_ROOT}")
    
    if OUTPUT_ZIP.exists():
        OUTPUT_ZIP.unlink()

    included_files = []
    
    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as zip_out:
        for root, dirs, files in os.walk(REPO_ROOT):
            root_path = Path(root)
            
            # Prune excluded directories in-place to avoid descending
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

            for file_name in files:
                file_path = root_path / file_name
                rel_path = file_path.relative_to(REPO_ROOT)

                if is_excluded(rel_path):
                    continue

                zip_out.write(file_path, arcname=str(rel_path))
                included_files.append(rel_path)

    zip_size_bytes = OUTPUT_ZIP.stat().st_size
    zip_size_mb = zip_size_bytes / (1024 * 1024)

    print("\n--- ARCHIVE SUMMARY ---")
    print(f"Total Files Included: {len(included_files)}")
    print(f"Archive Size: {zip_size_mb:.2f} MB ({zip_size_bytes:,} bytes)")
    print(f"Output Location: {OUTPUT_ZIP}")

    print("\nSample Key Included Files:")
    for f in included_files[:20]:
        print(f"  + {f}")
    if len(included_files) > 20:
        print(f"  ... and {len(included_files) - 20} more files.")

if __name__ == "__main__":
    create_archive()
