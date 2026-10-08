from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.ai import router as ai_router
from app.api.tickets import router as tickets_router
from app.api.benchmark import router as benchmark_router

app = FastAPI(
    title="JanSetu Rodic AI Engine",
    description="AI-Powered Citizen Access & Grievance Orchestration Platform for Rodic InfraAI 2026",
    version="1.0.0",
)

# Enable CORS for http://localhost:3000 and development origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routers under /api/v1
app.include_router(ai_router, prefix="/api/v1/ai", tags=["AI & Document OCR"])
app.include_router(tickets_router, prefix="/api/v1/tickets", tags=["Tickets & SLA"])
app.include_router(benchmark_router, prefix="/api/v1/benchmark", tags=["Benchmark Dataset"])

@app.get("/")
def root():
    return {
        "service": "JanSetu Rodic AI Engine",
        "version": "1.0.0",
        "status": "OPERATIONAL",
        "endpoints": [
            "/api/v1/ai/process-intent",
            "/api/v1/ai/ocr-extract",
            "/api/v1/tickets",
            "/api/v1/tickets/{id}/action",
            "/api/v1/benchmark/dataset",
            "/api/v1/benchmark/dataset/summary",
            "/docs",
        ],
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
