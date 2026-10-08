from datetime import datetime, timezone, timedelta
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship, create_engine, Session, select
from app.core.config import settings

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    full_name: str
    phone: str
    email: Optional[str] = None
    role: str = Field(default="citizen")  # "citizen" | "officer" | "admin"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Department(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    code: str = Field(index=True, unique=True)  # e.g. "DEPT-PWD", "DEPT-WATER"
    name: str
    contact_officer: str
    contact_phone: str
    sla_hours: int = 48  # Default standard SLA

    tickets: List["Ticket"] = Relationship(back_populates="department")

class TimelineEvent(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ticket_id: int = Field(foreign_key="ticket.id", index=True)
    title: str
    description: str
    status: str
    actor_role: str = "System"  # "Citizen", "AI Triage", "Officer", "Rodic Dispatch"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    ticket: Optional["Ticket"] = Relationship(back_populates="timeline")

class Attachment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ticket_id: int = Field(foreign_key="ticket.id", index=True)
    file_name: str
    file_url: str
    document_type: str = "Evidence"
    ocr_extracted_text: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    ticket: Optional["Ticket"] = Relationship(back_populates="attachments")

class Ticket(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ticket_number: str = Field(index=True, unique=True)
    citizen_id: str = Field(default="demo-citizen-101")
    citizen_name: str = Field(default="Citizen")
    citizen_phone: str = Field(default="+91 9876543210")
    title: str
    description: str
    raw_transcript: Optional[str] = None
    language: str = Field(default="en")  # 'en', 'hi', 'ta'
    category: str
    subcategory: Optional[str] = None
    priority: str = Field(default="MEDIUM")  # 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    status: str = Field(default="SUBMITTED")
    
    department_id: Optional[int] = Field(default=None, foreign_key="department.id")
    department_code: Optional[str] = None
    
    trust_score: float = Field(default=0.94)  # TrustShield confidence score e.g. 0.94
    spam_score: float = Field(default=0.02)
    
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    location_name: Optional[str] = None
    
    rodic_work_order_id: Optional[str] = None
    
    sla_due_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    department: Optional[Department] = Relationship(back_populates="tickets")
    timeline: List[TimelineEvent] = Relationship(back_populates="ticket", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    attachments: List[Attachment] = Relationship(back_populates="ticket", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

# Database Connection
connect_args = {"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
engine = create_engine(settings.DATABASE_URL, echo=False, connect_args=connect_args)

def get_session():
    with Session(engine) as session:
        yield session

def init_db():
    SQLModel.metadata.create_all(engine)
    seed_demo_data()

def seed_demo_data():
    with Session(engine) as session:
        # Check if already seeded
        dept_exists = session.exec(select(Department)).first()
        if not dept_exists:
            departments = [
                Department(code="DEPT-PWD", name="Public Works Department (PWD)", contact_officer="Er. Rajesh Sharma", contact_phone="+91 94150 11223", sla_hours=24),
                Department(code="DEPT-WATER", name="Jal Sansthan (Water & Sewerage)", contact_officer="A. K. Verma", contact_phone="+91 94150 22334", sla_hours=12),
                Department(code="DEPT-ELEC", name="Power Distribution Corp (Discom)", contact_officer="S. Sundaram", contact_phone="+91 94150 33445", sla_hours=8),
                Department(code="DEPT-SAN", name="Municipal Solid Waste & Sanitation", contact_officer="Meena Kumari", contact_phone="+91 94150 44556", sla_hours=16),
                Department(code="DEPT-REV", name="Revenue & Land Administration", contact_officer="V. Murugan", contact_phone="+91 94150 55667", sla_hours=72),
            ]
            session.add_all(departments)
            session.commit()
            
            # Add demo users
            users = [
                User(username="citizen_ramesh", full_name="Ramesh Kumar", phone="+91 98765 43210", role="citizen"),
                User(username="officer_rajesh", full_name="Rajesh Sharma (PWD Executive)", phone="+91 94150 11223", role="officer"),
            ]
            session.add_all(users)
            session.commit()

            # Add demo initial tickets with SLA and timeline
            pwd_dept = session.exec(select(Department).where(Department.code == "DEPT-PWD")).first()
            water_dept = session.exec(select(Department).where(Department.code == "DEPT-WATER")).first()
            
            now = datetime.now(timezone.utc)
            
            t1 = Ticket(
                ticket_number="JS-2026-8821",
                citizen_id="demo-citizen-101",
                citizen_name="Ramesh Kumar",
                citizen_phone="+91 98765 43210",
                title="Severe Main Road Potholes causing traffic hazard near Sector 4",
                description="Heavy monsoon waterlogged potholes on Main Gandhi Road near Metro Pillar 142 causing major traffic congestion and two-wheeler skid accidents.",
                raw_transcript="हमारे सेक्टर 4 मेन रोड पर मेट्रो पिलर 142 के पास बहुत बड़े-बड़े गड्ढे हो गए हैं, जिससे बाइक फिसल रही हैं और भयंकर जाम लग रहा है। कृपया जल्द मरम्मत करें।",
                language="hi",
                category="Roads & Infrastructure",
                subcategory="Pothole Repair",
                priority="HIGH",
                status="RODIC_DISPATCHED",
                department_id=pwd_dept.id if pwd_dept else None,
                department_code="DEPT-PWD",
                trust_score=0.96,
                spam_score=0.01,
                location_name="Gandhi Road, Sector 4 (Metro Pillar 142)",
                latitude=28.6139,
                longitude=77.2090,
                rodic_work_order_id="RODIC-WO-9042",
                sla_due_at=now + timedelta(hours=18),
                created_at=now - timedelta(hours=6),
                updated_at=now - timedelta(hours=1),
            )
            session.add(t1)
            session.commit()
            session.refresh(t1)
            
            events_t1 = [
                TimelineEvent(ticket_id=t1.id, title="Grievance Registered via Voice (Hindi)", description="Citizen audio grievance processed by JanSetu Multilingual AI Voice Engine.", status="SUBMITTED", actor_role="Citizen", created_at=now - timedelta(hours=6)),
                TimelineEvent(ticket_id=t1.id, title="TrustShield Verification Passed", description="Confidence Score: 96% | Duplicate Likelihood: 0% | Spam Risk: Low", status="AI_TRIAGED", actor_role="AI Triage", created_at=now - timedelta(hours=5, minutes=58)),
                TimelineEvent(ticket_id=t1.id, title="Assigned to PWD Engineering Cell", description="Ticket automatically routed to Er. Rajesh Sharma with High Priority SLA (24h).", status="DEPT_ASSIGNED", actor_role="System", created_at=now - timedelta(hours=5, minutes=50)),
                TimelineEvent(ticket_id=t1.id, title="Rodic Enterprise Work Order Issued", description="Work Order #RODIC-WO-9042 dispatched to Rodic Rapid Road Repair Unit.", status="RODIC_DISPATCHED", actor_role="Rodic Dispatch", created_at=now - timedelta(hours=1)),
            ]
            session.add_all(events_t1)
            
            t2 = Ticket(
                ticket_number="JS-2026-8822",
                citizen_id="demo-citizen-102",
                citizen_name="Kavitha Sundaram",
                citizen_phone="+91 98401 23456",
                title="Drinking Water Pipeline Contamination in Ward 12",
                description="Muddy contaminated water supply since yesterday morning. Over 50 households affected in South Street.",
                raw_transcript="நேற்று காலை முதல் வார்டு 12ல் குடிநீர் குழாயில் சேறும் சகதியுமாக வருகிறது. உடனடியாக சரிசெய்யவும்.",
                language="ta",
                category="Water Supply",
                subcategory="Pipeline Contamination",
                priority="CRITICAL",
                status="IN_PROGRESS",
                department_id=water_dept.id if water_dept else None,
                department_code="DEPT-WATER",
                trust_score=0.98,
                spam_score=0.01,
                location_name="Ward 12, South Street, Anna Nagar",
                latitude=13.0827,
                longitude=80.2707,
                rodic_work_order_id="RODIC-WO-9043",
                sla_due_at=now + timedelta(hours=5),
                created_at=now - timedelta(hours=7),
                updated_at=now - timedelta(minutes=30),
            )
            session.add(t2)
            session.commit()
            session.refresh(t2)
            
            events_t2 = [
                TimelineEvent(ticket_id=t2.id, title="Grievance Registered via Voice (Tamil)", description="Citizen submitted voice recording in Tamil; AI extracted critical pipeline contamination.", status="SUBMITTED", actor_role="Citizen", created_at=now - timedelta(hours=7)),
                TimelineEvent(ticket_id=t2.id, title="TrustShield High Severity Alert", description="Confidence Score: 98% | Tagged CRITICAL due to public health impact.", status="AI_TRIAGED", actor_role="AI Triage", created_at=now - timedelta(hours=6, minutes=58)),
                TimelineEvent(ticket_id=t2.id, title="Rodic Jal Task Force Onsite", description="Field engineers mobilized for pipe valve isolation and water quality sample testing.", status="IN_PROGRESS", actor_role="Rodic Dispatch", created_at=now - timedelta(minutes=30)),
            ]
            session.add_all(events_t2)
            session.commit()
