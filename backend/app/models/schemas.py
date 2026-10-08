from datetime import datetime
from typing import Optional, List, Dict, Any, Literal
from pydantic import BaseModel, Field

# --- Multilingual & Priority Types ---
LanguageCode = Literal["en", "hi", "ta"]
PriorityType = Literal["Low", "Medium", "High", "Critical"]
IntentType = Literal["grievance", "benefit_inquiry", "general"]

# --- Blueprint AI Structured Output Contract ---
class LocationData(BaseModel):
    area: Optional[str] = "Anna Nagar"
    city: Optional[str] = "Chennai"
    ward: Optional[str] = "Ward 12, Zone 4"
    lat: Optional[float] = 13.0827
    lng: Optional[float] = 80.2707

class JanSetuExtraction(BaseModel):
    intent: IntentType = Field(description="Either 'grievance', 'benefit_inquiry', or 'general'")
    category: str = Field(description="E.g., Public Infrastructure, Water Supply, Sanitation, Municipal Electrical Services")
    department: str = Field(description="Assigned municipal department e.g. Municipal Electrical Services, Water Board, PWD")
    issue_summary: str = Field(description="Concise description of the problem")
    priority: PriorityType = Field(description="Low, Medium, High, or Critical")
    confidence_score: float = Field(default=0.94, description="TrustShield confidence between 0.0 and 1.0")
    missing_entities: List[str] = Field(default_factory=list, description="List of unmentioned fields")
    location: LocationData = Field(default_factory=LocationData)

# --- AksharDrishti Document OCR Schemas ---
class OCRRequest(BaseModel):
    document_base64: Optional[str] = Field(None, description="Base64 document image or PDF")
    document_type: Optional[str] = Field("Water Bill (Municipal)", description="e.g. Water Bill, Electricity Bill, Ration Card, Property Tax")
    language: Optional[LanguageCode] = Field("ta", description="Target document language")

class AksharDrishtiOCRResult(BaseModel):
    document_type: str = "Water Bill (Municipal)"
    consumer_name: str = "Rajesh Kumar"
    connection_no: str = "CONN-8892-A"
    confidence: float = 0.94
    extracted_text: Optional[str] = None
    billing_period: Optional[str] = "Sept-Oct 2026"
    amount_due: Optional[str] = "₹ 450.00"
    verified_address: Optional[str] = "Flat 4B, Anna Nagar West, Chennai"

# --- Ticket & Timeline Schemas ---
class TimelineItem(BaseModel):
    status: str
    timestamp: str
    desc: str
    actor: Optional[str] = "System"

class TicketItem(BaseModel):
    ticket_id: str
    category: str
    department: str
    issue: str
    priority: PriorityType
    confidence: float
    status: str = "Submitted"
    citizen_name: Optional[str] = "Ramesh Kumar"
    citizen_phone: Optional[str] = "+91 98765 43210"
    assigned_officer: Optional[str] = "Officer Suresh (Executive Engineer)"
    raw_transcript: Optional[str] = None
    translated_text: Optional[str] = None
    language: Optional[str] = "ta-IN"
    trustshield_rationale: Optional[str] = "High entity clarity; verified GPS ward match; zero profanity."
    location: Optional[LocationData] = None
    created_at: str
    sla_deadline: str
    sla_remaining_hours: Optional[float] = 48.0
    timeline: List[TimelineItem] = []

class TicketCreateRequest(BaseModel):
    category: str = "Public Infrastructure"
    department: str = "Municipal Electrical Services"
    issue_summary: str
    priority: PriorityType = "Medium"
    confidence_score: float = 0.94
    raw_transcript: Optional[str] = None
    translated_text: Optional[str] = None
    language: Optional[str] = "ta-IN"
    location: Optional[LocationData] = None
    citizen_name: Optional[str] = "Ramesh Kumar"
    citizen_phone: Optional[str] = "+91 98765 43210"

class TicketActionRequest(BaseModel):
    status: str = "Action Taken"
    note: Optional[str] = "Engineer dispatched to location."
    department: Optional[str] = None
    assigned_officer: Optional[str] = None

# --- Public Welfare Scheme Schemas (Blueprint Track B) ---
class SchemeInquiryRequest(BaseModel):
    income_bracket: str = "Below ₹3,00,000"  # Low, Middle, BPL
    setting: str = "Urban"  # Urban, Rural, Semi-Urban
    category: Optional[str] = "All"  # Energy, Water, Housing, Women Welfare, Agriculture

class PublicScheme(BaseModel):
    scheme_id: str
    name: str
    department: str
    benefit_summary: str
    subsidy_amount: str
    eligibility: str
    application_portal: str
    icon_type: str = "solar"

# --- Rodic Enterprise Mock Schemas ---
class RodicWorkOrderCreate(BaseModel):
    ticket_id: int
    ticket_number: str
    department_code: str
    description: str
    priority: str = "HIGH"
    location: str
    assigned_contractor: Optional[str] = "Rodic Infra Rapid Response Team"

class RodicWorkOrderResponse(BaseModel):
    work_order_id: str
    ticket_id: int
    status: str = "DISPATCHED"
    assigned_crew: str
    estimated_arrival_minutes: int
    dispatch_timestamp: datetime
    gis_coordinates: Dict[str, float]

class RodicDispatchStatus(BaseModel):
    work_order_id: str
    current_status: str
    field_officer_notes: str
    inspection_passed: bool
    completion_proof_url: Optional[str] = None
