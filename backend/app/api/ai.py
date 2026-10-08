from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional, List
from app.models.schemas import (
    JanSetuExtraction,
    AksharDrishtiOCRResult,
    OCRRequest,
    PublicScheme,
    SchemeInquiryRequest,
)
from app.services.ai_service import extract_grievance_intent
from app.services.ocr_service import ocr_service

router = APIRouter()

# Blueprint Track B Public Welfare Schemes Knowledge Base
PUBLIC_SCHEMES_DB: List[PublicScheme] = [
    PublicScheme(
        scheme_id="SCHEME-SURYA-01",
        name="PM Surya Ghar: Muft Bijli Yojana (Rooftop Solar Subsidy)",
        department="Ministry of New & Renewable Energy / TANGEDCO",
        benefit_summary="Up to 300 units of free electricity per month through rooftop solar panels with direct DBT subsidy.",
        subsidy_amount="Up to ₹78,000 Direct Subsidy",
        eligibility="Residential households with grid-connected electricity connection & suitable roof space.",
        application_portal="https://pmsuryaghar.gov.in",
        icon_type="solar",
    ),
    PublicScheme(
        scheme_id="SCHEME-JAL-02",
        name="Jal Jeevan Mission (Har Ghar Jal)",
        department="Department of Drinking Water & Sanitation / Metro Water",
        benefit_summary="Assured clean, pressurized tap water supply to every household with water quality sensor tracking.",
        subsidy_amount="100% Free Household Connection",
        eligibility="Unserved & peri-urban/rural households with domestic water requirement.",
        application_portal="https://jaljeevanmission.gov.in",
        icon_type="water",
    ),
    PublicScheme(
        scheme_id="SCHEME-MAGALIR-03",
        name="Kalaignar Magalir Urimai Thittam (Women Basic Income Support)",
        department="Special Programme Implementation Dept, Govt of Tamil Nadu",
        benefit_summary="Monthly direct benefit transfer of ₹1,000 to women heads of eligible households.",
        subsidy_amount="₹ 1,000 / month Direct Bank Transfer",
        eligibility="Women heads of family with annual household income under ₹2.5 Lakhs & electricity consumption < 3600 units/yr.",
        application_portal="https://kmut.tn.gov.in",
        icon_type="women",
    ),
    PublicScheme(
        scheme_id="SCHEME-AWAS-04",
        name="Pradhan Mantri Awas Yojana - Urban (PMAY-U 2.0)",
        department="Ministry of Housing and Urban Affairs / TN Housing Board",
        benefit_summary="Interest subsidy and financial assistance for pucca house construction or affordable apartment allotment.",
        subsidy_amount="Interest Subsidy up to ₹2.67 Lakhs",
        eligibility="EWS / LIG families not owning a pucca house anywhere in India.",
        application_portal="https://pmay-urban.gov.in",
        icon_type="housing",
    ),
    PublicScheme(
        scheme_id="SCHEME-PM-KUSUM-05",
        name="PM-KUSUM Solar Agriculture Pump Scheme",
        department="Agriculture & Farmers Welfare Dept",
        benefit_summary="Subsidized solar-powered irrigation pumps for farmers to reduce dependence on grid power.",
        subsidy_amount="Up to 60% Govt Subsidy",
        eligibility="Individual farmers, water user associations, and farmer producer organizations.",
        application_portal="https://pmkusum.mnre.gov.in",
        icon_type="agriculture",
    ),
]

@router.post("/process-intent", response_model=JanSetuExtraction)
async def process_intent(payload: dict):
    """
    Process multilingual citizen grievance text (Tamil, Hindi, English).
    Returns structured JanSetuExtraction model with TrustShield confidence score.
    """
    text = payload.get("text", "")
    if not text:
        raise HTTPException(status_code=400, detail="Text or audio transcript required")
    return extract_grievance_intent(text)

@router.post("/ocr-extract", response_model=AksharDrishtiOCRResult)
async def ocr_extract(
    payload: Optional[OCRRequest] = None,
    file: Optional[UploadFile] = File(None)
):
    """
    AksharDrishti document extraction endpoint.
    Extracts consumer metadata from municipal utility bills and evidence.
    """
    try:
        return ocr_service.extract_document(payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR extraction failed: {str(e)}")

@router.get("/schemes", response_model=List[PublicScheme])
async def list_schemes():
    """List all public welfare schemes available for citizen discovery."""
    return PUBLIC_SCHEMES_DB

@router.post("/schemes/recommend", response_model=List[PublicScheme])
async def recommend_schemes(request: SchemeInquiryRequest):
    """
    AI Benefit Navigator recommendation engine (Blueprint Solution 2 Track B).
    Recommends eligible schemes based on income bracket, urban/rural setting, and citizen intent.
    """
    results = []
    for s in PUBLIC_SCHEMES_DB:
        if request.setting == "Rural" and s.scheme_id == "SCHEME-AWAS-04":
            continue
        if request.setting == "Urban" and s.scheme_id == "SCHEME-PM-KUSUM-05":
            continue
        results.append(s)
    return results[:3]
