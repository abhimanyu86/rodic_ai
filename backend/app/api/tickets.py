from datetime import datetime, timedelta, timezone
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    TicketCreateRequest,
    TicketActionRequest,
    LocationData,
)

router = APIRouter()

# Active in-memory store for PoC demonstration with 6 diverse Chennai ward tickets
TICKETS_STORE: Dict[str, Dict[str, Any]] = {
    "GRV-2026-0001": {
        "ticket_id": "GRV-2026-0001",
        "category": "Public Infrastructure",
        "department": "Municipal Electrical Services",
        "issue": "Streetlight non-functional for 3 days near Main Street causing severe darkness.",
        "priority": "High",
        "confidence": 0.94,
        "status": "In Progress",
        "citizen_name": "Ramesh Kumar",
        "citizen_phone": "+91 98765 43210",
        "assigned_officer": "Officer Suresh (Executive Engineer, Electrical Dept)",
        "raw_transcript": "எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக தெருவிளக்கு வேலை செய்யவில்லை. இரவு நேரத்தில் மிகவும் இருட்டாக உள்ளது.",
        "translated_text": "Streetlight not working for the last 3 days in our area. It is very dark and unsafe at night.",
        "language": "ta-IN",
        "trustshield_rationale": "Confidence: 94%. High entity clarity, zero profanity, automatic department routing threshold exceeded (>85%).",
        "location": {
            "area": "Anna Nagar West",
            "city": "Chennai",
            "ward": "Ward 12, Zone 4",
            "lat": 13.0827,
            "lng": 80.2707,
        },
        "created_at": (datetime.now(timezone.utc) - timedelta(hours=12)).isoformat(),
        "sla_deadline": (datetime.now(timezone.utc) + timedelta(hours=36)).isoformat(),
        "sla_remaining_hours": 36.0,
        "timeline": [
            {
                "status": "In Progress",
                "timestamp": "2 hrs ago",
                "desc": "Rodic Electrical Rapid Crew #04 dispatched with replacement LED fixtures.",
                "actor": "Officer Suresh",
            },
            {
                "status": "AI Classified & Routed",
                "timestamp": "12 hrs ago",
                "desc": "Assigned to Municipal Electrical Services (TrustShield: 94%).",
                "actor": "JanSetu AI",
            },
            {
                "status": "Submitted",
                "timestamp": "12 hrs ago",
                "desc": "Captured via JanSetu Citizen Voice Portal (Tamil Intake).",
                "actor": "Citizen Ramesh",
            },
        ],
    },
    "GRV-2026-0002": {
        "ticket_id": "GRV-2026-0002",
        "category": "Water Supply",
        "department": "Water Board",
        "issue": "Drinking water pipeline contamination on South Usman Road affecting 50+ homes.",
        "priority": "High",
        "confidence": 0.96,
        "status": "Submitted",
        "citizen_name": "Kavitha Sundaram",
        "citizen_phone": "+91 98401 23456",
        "assigned_officer": "Officer Radhakrishnan (Assistant Engineer, Metro Water)",
        "raw_transcript": "தெற்கு உஸ்மான் சாலையில் குடிநீர் குழாயில் சாக்கடை நீர் கலந்து வருகிறது. உடனடியாக சரிசெய்யவும்.",
        "translated_text": "Sewage water is mixing with drinking water pipeline on South Usman Road. Over 50 households affected.",
        "language": "ta-IN",
        "trustshield_rationale": "Confidence: 96%. Public health impact identified. Auto-flagged for priority water testing.",
        "location": {
            "area": "T-Nagar South Usman Rd",
            "city": "Chennai",
            "ward": "Ward 118, Zone 10",
            "lat": 13.0418,
            "lng": 80.2341,
        },
        "created_at": (datetime.now(timezone.utc) - timedelta(hours=3)).isoformat(),
        "sla_deadline": (datetime.now(timezone.utc) + timedelta(hours=45)).isoformat(),
        "sla_remaining_hours": 45.0,
        "timeline": [
            {
                "status": "AI Classified & Routed",
                "timestamp": "3 hrs ago",
                "desc": "Assigned to Water Board with High Urgency SLA.",
                "actor": "JanSetu AI",
            },
            {
                "status": "Submitted",
                "timestamp": "3 hrs ago",
                "desc": "Captured via JanSetu Interface (Tamil Voice).",
                "actor": "Citizen Kavitha",
            },
        ],
    },
    "GRV-2026-0003": {
        "ticket_id": "GRV-2026-0003",
        "category": "Public Infrastructure",
        "department": "Public Works Department (PWD)",
        "issue": "Heavy monsoon rain created 3 dangerous deep potholes on Royapettah High Road.",
        "priority": "High",
        "confidence": 0.95,
        "status": "In Progress",
        "citizen_name": "Vikas Sharma",
        "citizen_phone": "+91 97110 55443",
        "assigned_officer": "Officer Anandan (Zonal PWD Inspector)",
        "raw_transcript": "रॉयपेटा मेन रोड पर भारी बारिश के बाद 3 गहरे गड्ढे हो गए हैं, जिससे दोपहिया वाहन गिर रहे हैं।",
        "translated_text": "Heavy monsoon rain created 3 dangerous deep potholes on Royapettah Main Road causing two-wheeler skid accidents.",
        "language": "hi-IN",
        "trustshield_rationale": "Confidence: 95%. Road safety hazard verified against municipal road ledger.",
        "location": {
            "area": "Royapettah High Road",
            "city": "Chennai",
            "ward": "Ward 114, Zone 9",
            "lat": 13.0524,
            "lng": 80.2612,
        },
        "created_at": (datetime.now(timezone.utc) - timedelta(hours=20)).isoformat(),
        "sla_deadline": (datetime.now(timezone.utc) + timedelta(hours=28)).isoformat(),
        "sla_remaining_hours": 28.0,
        "timeline": [
            {
                "status": "In Progress",
                "timestamp": "5 hrs ago",
                "desc": "Rodic Infra Cold-Mix Bitumen crew dispatched for road surfacing.",
                "actor": "Officer Anandan",
            },
            {
                "status": "AI Classified & Routed",
                "timestamp": "20 hrs ago",
                "desc": "Assigned to Public Works Department (PWD).",
                "actor": "JanSetu AI",
            },
            {
                "status": "Submitted",
                "timestamp": "20 hrs ago",
                "desc": "Captured via JanSetu Hindi Voice Intake.",
                "actor": "Citizen Vikas",
            },
        ],
    },
    "GRV-2026-0004": {
        "ticket_id": "GRV-2026-0004",
        "category": "Municipal Electrical Services",
        "department": "Municipal Electrical Services",
        "issue": "Electrical transformer pole near St. Michael's School sparking dangerously. Fire hazard.",
        "priority": "Critical",
        "confidence": 0.98,
        "status": "Submitted",
        "citizen_name": "Deepa Narayanan",
        "citizen_phone": "+91 94440 12345",
        "assigned_officer": "Officer K. Meenakshi (Discom Rapid Cell)",
        "raw_transcript": "Electrical transformer pole near St. Michael's School sparking dangerously since last night. Immediate fire risk.",
        "translated_text": "Electrical transformer pole near St. Michael's School sparking dangerously since last night. Immediate fire risk.",
        "language": "en-IN",
        "trustshield_rationale": "Confidence: 98%. Critical safety hazard. Escalation Level 2 Triggered (< 12h SLA).",
        "location": {
            "area": "Adyar Gandhi Nagar",
            "city": "Chennai",
            "ward": "Ward 173, Zone 13",
            "lat": 13.0067,
            "lng": 80.2570,
        },
        "created_at": (datetime.now(timezone.utc) - timedelta(hours=43, minutes=30)).isoformat(),
        "sla_deadline": (datetime.now(timezone.utc) + timedelta(hours=4, minutes=30)).isoformat(),
        "sla_remaining_hours": 4.5,
        "timeline": [
            {
                "status": "Escalation Level 2",
                "timestamp": "30 mins ago",
                "desc": "Automated SLA Alert sent to Zonal Superintendent Er. K. Meenakshi.",
                "actor": "SLA Monitor",
            },
            {
                "status": "AI Classified & Routed",
                "timestamp": "43 hrs ago",
                "desc": "Tagged CRITICAL PRIORITY and routed to High Voltage Cell.",
                "actor": "JanSetu AI",
            },
            {
                "status": "Submitted",
                "timestamp": "43 hrs ago",
                "desc": "Captured via Web Portal.",
                "actor": "Citizen Deepa",
            },
        ],
    },
    "GRV-2026-0005": {
        "ticket_id": "GRV-2026-0005",
        "category": "Sanitation",
        "department": "Solid Waste & Storm Drainage",
        "issue": "Storm water drain blocked on Velachery Main Road causing overflowing sewer water.",
        "priority": "Medium",
        "confidence": 0.93,
        "status": "Submitted",
        "citizen_name": "M. Selvaraj",
        "citizen_phone": "+91 98410 77889",
        "assigned_officer": "Officer Selvam (Sanitary Inspector)",
        "raw_transcript": "வேளச்சேரி மெயின் ரோட்டில் மழைநீர் வடிகால் அடைத்து சாக்கடை நீர் தெருவில் ஓடுகிறது.",
        "translated_text": "Storm water drain blocked on Velachery Main Road causing dirty water to overflow on the street.",
        "language": "ta-IN",
        "trustshield_rationale": "Confidence: 93%. Drain de-silting protocol matched for zone.",
        "location": {
            "area": "Velachery Main Road",
            "city": "Chennai",
            "ward": "Ward 178, Zone 14",
            "lat": 12.9815,
            "lng": 80.2180,
        },
        "created_at": (datetime.now(timezone.utc) - timedelta(hours=10)).isoformat(),
        "sla_deadline": (datetime.now(timezone.utc) + timedelta(hours=38)).isoformat(),
        "sla_remaining_hours": 38.0,
        "timeline": [
            {
                "status": "AI Classified & Routed",
                "timestamp": "10 hrs ago",
                "desc": "Assigned to Solid Waste & Storm Drainage.",
                "actor": "JanSetu AI",
            },
            {
                "status": "Submitted",
                "timestamp": "10 hrs ago",
                "desc": "Captured via JanSetu Interface.",
                "actor": "Citizen Selvaraj",
            },
        ],
    },
    "GRV-2026-0006": {
        "ticket_id": "GRV-2026-0006",
        "category": "Revenue Administration",
        "department": "Revenue & Land Administration",
        "issue": "Property tax assessment rebate correction for residential senior citizen property.",
        "priority": "Low",
        "confidence": 0.91,
        "status": "Resolved",
        "citizen_name": "S. Venkatesh",
        "citizen_phone": "+91 94441 99882",
        "assigned_officer": "Officer Venkatesh (Revenue Assessor)",
        "raw_transcript": "Discrepancy in online property tax assessment zone category. Excess rebate not reflected.",
        "translated_text": "Discrepancy in online property tax assessment zone category. Excess rebate not reflected.",
        "language": "en-IN",
        "trustshield_rationale": "Confidence: 91%. Tax assessment revision request verified.",
        "location": {
            "area": "Mylapore Tank Road",
            "city": "Chennai",
            "ward": "Ward 125, Zone 9",
            "lat": 13.0334,
            "lng": 80.2678,
        },
        "created_at": (datetime.now(timezone.utc) - timedelta(hours=48)).isoformat(),
        "sla_deadline": (datetime.now(timezone.utc) - timedelta(hours=12)).isoformat(),
        "sla_remaining_hours": 0.0,
        "timeline": [
            {
                "status": "Resolved",
                "timestamp": "12 hrs ago",
                "desc": "Tax rebate adjusted in municipal ledger. Updated receipt dispatched via SMS.",
                "actor": "Officer Venkatesh",
            },
            {
                "status": "In Progress",
                "timestamp": "24 hrs ago",
                "desc": "Document verified with Property Card #PC-99120.",
                "actor": "Revenue Officer",
            },
            {
                "status": "Submitted",
                "timestamp": "48 hrs ago",
                "desc": "Captured via Online Portal.",
                "actor": "Citizen Venkatesh",
            },
        ],
    },
}

def update_sla(ticket: dict) -> dict:
    try:
        deadline = datetime.fromisoformat(ticket["sla_deadline"])
        now = datetime.now(timezone.utc)
        if deadline.tzinfo is None:
            deadline = deadline.replace(tzinfo=timezone.utc)
        diff = deadline - now
        ticket["sla_remaining_hours"] = round(max(0.0, diff.total_seconds() / 3600.0), 1)
    except Exception:
        ticket["sla_remaining_hours"] = 48.0
    return ticket

@router.get("", response_model=List[dict])
async def list_tickets():
    """List all active grievance tickets with updated SLA countdowns."""
    return [update_sla(t) for t in TICKETS_STORE.values()]

@router.get("/{ticket_id}", response_model=dict)
async def get_ticket(ticket_id: str):
    """Get single ticket with complete timeline milestones."""
    if ticket_id not in TICKETS_STORE:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return update_sla(TICKETS_STORE[ticket_id])

@router.post("", response_model=dict)
async def create_ticket(data: TicketCreateRequest):
    """Create a new citizen grievance ticket."""
    ticket_id = f"GRV-2026-{len(TICKETS_STORE) + 1:04d}"
    now = datetime.now(timezone.utc)
    sla_deadline = now + timedelta(hours=48)

    loc = data.location.model_dump() if data.location else {
        "area": "Anna Nagar",
        "city": "Chennai",
        "ward": "Ward 12, Zone 4",
        "lat": 13.0827,
        "lng": 80.2707,
    }

    ticket = {
        "ticket_id": ticket_id,
        "category": data.category,
        "department": data.department,
        "issue": data.issue_summary,
        "priority": data.priority,
        "confidence": data.confidence_score,
        "status": "Submitted",
        "citizen_name": data.citizen_name or "Citizen",
        "citizen_phone": data.citizen_phone or "+91 98765 43210",
        "assigned_officer": f"Officer Desk - {data.department}",
        "raw_transcript": data.raw_transcript or data.issue_summary,
        "translated_text": data.translated_text or data.issue_summary,
        "language": data.language or "ta-IN",
        "trustshield_rationale": f"TrustShield Confidence: {int(data.confidence_score * 100)}%. Automatic routing to {data.department}.",
        "location": loc,
        "created_at": now.isoformat(),
        "sla_deadline": sla_deadline.isoformat(),
        "sla_remaining_hours": 48.0,
        "timeline": [
            {
                "status": "AI Classified & Routed",
                "timestamp": "Just now",
                "desc": f"Assigned to {data.department} with {data.priority} Priority.",
                "actor": "JanSetu AI",
            },
            {
                "status": "Submitted",
                "timestamp": "Just now",
                "desc": f"Captured via JanSetu Multilingual Interface ({data.language or 'ta-IN'}).",
                "actor": data.citizen_name or "Citizen",
            },
        ],
    }
    TICKETS_STORE[ticket_id] = ticket
    return ticket

@router.patch("/{ticket_id}/action", response_model=dict)
async def action_ticket(ticket_id: str, payload: TicketActionRequest):
    """
    Officer action execution endpoint:
    - Dispatch Engineer / Accept
    - Re-route to another department
    - Mark Resolved
    """
    if ticket_id not in TICKETS_STORE:
        raise HTTPException(status_code=404, detail="Ticket not found")

    status = payload.status or "Action Taken"
    note = payload.note or f"Officer executed action: {status}"
    actor = payload.assigned_officer or "Duty Officer"

    ticket = TICKETS_STORE[ticket_id]
    ticket["status"] = status

    if payload.department:
        ticket["department"] = payload.department
        note = f"Re-routed to {payload.department}. {note}"

    if payload.assigned_officer:
        ticket["assigned_officer"] = payload.assigned_officer

    ticket["timeline"].insert(
        0,
        {
            "status": status,
            "timestamp": "Just now",
            "desc": note,
            "actor": actor,
        },
    )
    return update_sla(ticket)
