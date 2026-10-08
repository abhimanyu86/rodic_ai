# JanSetu PoC Architectural Rules
- Stack: FastAPI (Python 3.11) backend, Next.js 14+ (App Router, Tailwind CSS, TypeScript) frontend.
- AI Engine: OpenAI/GPT-4o-mini structured outputs via Pydantic v2 schemas.
- DB/ORM: PostgreSQL + SQLModel / SQLAlchemy (pgvector-ready).
- Boundaries: Mock external Rodic enterprise APIs and government verification services using FastAPI fixture endpoints.
- Multilingual Scope: Support Tamil ('ta') and Hindi ('hi') alongside English ('en').
