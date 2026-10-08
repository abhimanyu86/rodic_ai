"""API routers package for JanSetu."""
from fastapi import APIRouter
from app.api.ai import router as ai_router
from app.api.tickets import router as tickets_router
from app.api.mock_rodic import router as mock_rodic_router

api_router = APIRouter()
api_router.include_router(ai_router, prefix="/ai", tags=["AI & Voice Intake"])
api_router.include_router(tickets_router, prefix="/tickets", tags=["Tickets & SLA"])
api_router.include_router(mock_rodic_router, prefix="/mock-rodic", tags=["Rodic Enterprise Simulation"])
