from fastapi import APIRouter, HTTPException
import json
import os
from pathlib import Path

router = APIRouter()

DATASET_PATH = Path(__file__).resolve().parent.parent / "data" / "jansetu_benchmark_dataset.json"

def load_benchmark_data():
    if not DATASET_PATH.exists():
        raise HTTPException(status_code=404, detail="Benchmark dataset file not found")
    with open(DATASET_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@router.get("/dataset")
def get_benchmark_dataset():
    """
    Returns the official JanSetu Enterprise v2.0 Rodic InfraAI Challenge Benchmark Dataset.
    Includes Track A (Grievance Intelligence) and Track B (Benefit Navigator) records with
    TrustShield scores, multilingual raw transcripts, explainability tokens, and auto-BOQ specs.
    """
    return load_benchmark_data()

@router.get("/dataset/summary")
def get_benchmark_summary():
    """
    Returns high-level metadata and statistical summary of the benchmark dataset.
    """
    data = load_benchmark_data()
    records = data.get("benchmark_records", [])
    return {
        "metadata": data.get("project_metadata", {}),
        "total_records": len(records),
        "track_distribution": {
            "Track A - Grievance Intelligence": sum(1 for r in records if "Track A" in r.get("track", "")),
            "Track B - Benefit Navigator": sum(1 for r in records if "Track B" in r.get("track", "")),
        },
        "languages": list(set(r.get("language") for r in records if r.get("language"))),
        "average_trustshield_score": round(
            sum(r.get("trustshield_score", 0) for r in records) / len(records), 3
        ) if records else 0,
    }
