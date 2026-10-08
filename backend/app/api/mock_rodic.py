import random
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from app.models.db_models import Ticket, TimelineEvent, get_session
from app.models.schemas import (
    RodicWorkOrderCreate,
    RodicWorkOrderResponse,
    RodicDispatchStatus,
)

router = APIRouter()

# In-memory Rodic ERP state for PoC simulation
RODIC_WORK_ORDERS: Dict[str, Dict[str, Any]] = {
    "RODIC-WO-9042": {
        "work_order_id": "RODIC-WO-9042",
        "ticket_id": 1,
        "status": "DISPATCHED",
        "assigned_crew": "Rodic Road Repair Unit - North 02",
        "contractor_name": "Rodic Infra Municipal Maintenance",
        "estimated_arrival_minutes": 35,
        "dispatch_timestamp": (datetime.now(timezone.utc) - timedelta(hours=1)).isoformat(),
        "gis_coordinates": {"lat": 28.6145, "lng": 77.2105},
        "field_notes": "Crew en route with road repair equipment and rapid bitumen mix.",
        "inspection_passed": False,
    },
    "RODIC-WO-9043": {
        "work_order_id": "RODIC-WO-9043",
        "ticket_id": 2,
        "status": "IN_PROGRESS",
        "assigned_crew": "Rodic Jal Task Force #09",
        "contractor_name": "Rodic Clean Water Engineering",
        "estimated_arrival_minutes": 0,
        "dispatch_timestamp": (datetime.now(timezone.utc) - timedelta(hours=3)).isoformat(),
        "gis_coordinates": {"lat": 13.0830, "lng": 80.2710},
        "field_notes": "Main pipeline isolating valve closed. Flushing and bacterial test underway.",
        "inspection_passed": True,
    }
}

@router.get("/crews")
def get_rodic_crews():
    """Returns list of active Rodic Municipal rapid response field crews."""
    return [
        {
            "crew_id": "RODIC-CREW-ROAD-01",
            "name": "Rodic Road Repair Unit - North 02",
            "specialization": "Pothole Patching & Asphalt Resurfacing",
            "status": "ON_FIELD",
            "active_orders": 1,
            "current_location": "Delhi Zone 4"
        },
        {
            "crew_id": "RODIC-CREW-WATER-09",
            "name": "Rodic Jal Task Force #09",
            "specialization": "Pipeline Leakage & Quality Remediation",
            "status": "ON_FIELD",
            "active_orders": 1,
            "current_location": "Chennai Anna Nagar"
        },
        {
            "crew_id": "RODIC-CREW-ELEC-04",
            "name": "Rodic High-Tension Quick Response",
            "specialization": "Transformer & High Voltage Repair",
            "status": "STANDBY",
            "active_orders": 0,
            "current_location": "Central Grid Hub"
        },
        {
            "crew_id": "RODIC-CREW-SAN-07",
            "name": "Rodic Eco-Waste Compactor Squad",
            "specialization": "Solid Waste & Drain De-silting",
            "status": "STANDBY",
            "active_orders": 0,
            "current_location": "Zonal Depot"
        }
    ]

@router.post("/work-orders", response_model=RodicWorkOrderResponse)
def dispatch_rodic_work_order(
    order_in: RodicWorkOrderCreate,
    session: Session = Depends(get_session)
):
    """
    Simulated Rodic Enterprise API: Generates an ERP work order,
    dispatches a municipal field contractor crew, and updates ticket status.
    """
    ticket = session.get(Ticket, order_in.ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Associated ticket not found")

    wo_id = f"RODIC-WO-{random.randint(9050, 9999)}"
    now = datetime.now(timezone.utc)
    arrival_mins = random.choice([25, 40, 50, 60])
    
    # Store in Rodic simulation registry
    RODIC_WORK_ORDERS[wo_id] = {
        "work_order_id": wo_id,
        "ticket_id": ticket.id,
        "status": "DISPATCHED",
        "assigned_crew": order_in.assigned_contractor or "Rodic Rapid Response Team",
        "contractor_name": "Rodic Enterprise Services",
        "estimated_arrival_minutes": arrival_mins,
        "dispatch_timestamp": now.isoformat(),
        "gis_coordinates": {
            "lat": ticket.latitude or 28.6139 + random.uniform(-0.01, 0.01),
            "lng": ticket.longitude or 77.2090 + random.uniform(-0.01, 0.01)
        },
        "field_notes": f"Field team dispatched for {ticket.category} complaint.",
        "inspection_passed": False
    }

    # Update Ticket
    ticket.rodic_work_order_id = wo_id
    ticket.status = "RODIC_DISPATCHED"
    ticket.updated_at = now
    
    event = TimelineEvent(
        ticket_id=ticket.id,
        title="Rodic Enterprise Work Order Dispatched",
        description=f"Work Order #{wo_id} generated. Dispatched crew '{RODIC_WORK_ORDERS[wo_id]['assigned_crew']}' (ETA: {arrival_mins} mins).",
        status="RODIC_DISPATCHED",
        actor_role="Rodic Dispatch",
        created_at=now
    )
    session.add(ticket)
    session.add(event)
    session.commit()

    return RodicWorkOrderResponse(
        work_order_id=wo_id,
        ticket_id=ticket.id,
        status="DISPATCHED",
        assigned_crew=RODIC_WORK_ORDERS[wo_id]["assigned_crew"],
        estimated_arrival_minutes=arrival_mins,
        dispatch_timestamp=now,
        gis_coordinates=RODIC_WORK_ORDERS[wo_id]["gis_coordinates"]
    )

@router.get("/work-orders/{work_order_id}")
def get_rodic_work_order(work_order_id: str):
    """Retrieve simulated Rodic enterprise work order status and GPS tracking."""
    if work_order_id not in RODIC_WORK_ORDERS:
        raise HTTPException(status_code=404, detail="Rodic work order not found")
    return RODIC_WORK_ORDERS[work_order_id]

@router.post("/work-orders/{work_order_id}/complete")
def complete_rodic_work_order(
    work_order_id: str,
    resolution_notes: Optional[str] = "Field repair completed and verified by Rodic Quality Inspector.",
    session: Session = Depends(get_session)
):
    """
    Simulated Rodic Enterprise API: Marks work order completed with inspection proof,
    and transitions JanSetu ticket to RESOLVED.
    """
    if work_order_id not in RODIC_WORK_ORDERS:
        raise HTTPException(status_code=404, detail="Rodic work order not found")

    wo = RODIC_WORK_ORDERS[work_order_id]
    wo["status"] = "COMPLETED"
    wo["inspection_passed"] = True
    wo["field_notes"] = resolution_notes
    wo["completion_timestamp"] = datetime.now(timezone.utc).isoformat()

    ticket_id = wo.get("ticket_id")
    if ticket_id:
        ticket = session.get(Ticket, ticket_id)
        if ticket:
            now = datetime.now(timezone.utc)
            ticket.status = "RESOLVED"
            ticket.updated_at = now
            event = TimelineEvent(
                ticket_id=ticket.id,
                title="Grievance Resolved via Rodic Field Action",
                description=f"Work Order #{work_order_id} completed successfully. {resolution_notes}",
                status="RESOLVED",
                actor_role="Rodic Dispatch",
                created_at=now
            )
            session.add(ticket)
            session.add(event)
            session.commit()

    return {
        "success": True,
        "work_order_id": work_order_id,
        "status": "COMPLETED",
        "ticket_status": "RESOLVED",
        "message": "Rodic field resolution synced with JanSetu Redressal Board."
    }
