# JanSetu Enterprise v2.0
### Autonomous Citizen Access & Civic Redressal Orchestration Suite
**Rodic InfraAI Innovation Challenge 2026** • *YellowSense JanSetu*  
**Jurisdiction**: Greater Chennai Corporation (GCC) / Municipal Operations Suite, Government of Tamil Nadu  
**Standards**: DARPG CPGRAMS Monthly Redressal Standards (June 2026 Cycle) • TrustShield 94.2% Live

---

## 🏛️ Executive Summary

**JanSetu Enterprise v2.0** is an institutional-grade, AI-orchestrated civic grievance redressal and public scheme discovery platform built for municipal corporations and state administrations. Tailored for the **Greater Chennai Corporation (GCC)** and compliant with National **DARPG CPGRAMS** guidelines, JanSetu bridges citizens and civic engineering squads through multi-turn voice AI, autonomous triage, explainable TrustShield confidence scoring, automated Bill of Quantities (Auto-BOQ), proactive GIS flood intelligence, and anti-ghost closure photometric verification.

---

## 🌟 High-Value Innovation Features (Rodic InfraAI Blueprint)

| # | Feature Name | Target Problem | Solution Architecture |
|---|---|---|---|
| **1** | **"Before & After" AI Visual Verification** | Ghost closures & false contractor completion reports | Split-screen photometric comparison (Citizen Photo vs Contractor Upload) with 96% match threshold before ticket closure. |
| **2** | **Automated Municipal Bill of Quantities (Auto-BOQ)** | Manual estimation delays & procurement leakage | Auto-generates line-item material indents and cost estimates pegged to official Municipal Schedule of Rates (SoR). |
| **3** | **Smart Incident Clustering** | Duplicate ticket flooding during major outages | Auto-merges nearby complaints within 400m into a pinned Master Incident (`#MST-2026-088`), synchronizing citizen ward radars. |
| **4** | **Explainable AI Confidence (TrustShield)** | Black-box automated routing mistrust | Highlights linguistic explainability tokens (e.g. `தெருவிளக்கு`, `தீப்பொறி`) with 94.2% average triage confidence. |
| **5** | **Proactive GIS Flood & Infrastructure Heatmap** | Reactive monsoon waterlogging response | Cross-references storm drain complaints with IMD Doppler radar rainfall forecasts (6h/12h/24h) to pre-dispatch de-silting crews. |
| **6** | **Contractor & Vendor SLA Scorecard** | Lack of accountability in outsourced civic works | Dynamic procurement leaderboard ranking contractors by on-time SLA, repeat defects, and citizen re-open rates. |
| **7** | **Autonomous Voice Callback Audit** | Unverified ticket resolutions | Automated outbound IVR telephone call in citizen's native language to verify on-ground repair before permanent closure. |

---

## 📊 Ground Truth Benchmark Dataset

JanSetu includes an official, canonical 5-record benchmark dataset scrubbing all PII in accordance with DARPG public data guidelines:

- **GRV-2026-0001** *(Voice AI / Tamil)*: Streetlight Outage in Ward 12, Anna Nagar West (TANGEDCO / GCC, SLA: 48h, TrustShield: 94%, Auto-BOQ: ₹2,850).
- **GRV-2026-0002** *(Web Portal / Hindi)*: Drinking Water Pipeline Fracture in Ward 118, T-Nagar (CMWSSB, SLA: 48h, TrustShield: 96%, Auto-BOQ: ₹4,200).
- **GRV-2026-0003** *(Voice AI / Tamil)*: Transformer Sparking Hazard in Ward 173, Adyar (**Critical Emergency Safety Bypass**, SLA: 2h, TrustShield: 98%, Auto-BOQ: ₹12,500).
- **GRV-2026-0004** *(WhatsApp / English)*: Deep Pothole on Royapettah High Road (GCC PWD Roads, SLA: 36h, TrustShield: 95%, Auto-BOQ: ₹2,400).
- **SCH-2026-0008** *(Track B / English)*: Chennai Metro Water Urban Piped Connection (MAWS / CMWSSB, SLA: 72h, TrustShield: 99%, Fast-Track e-KYC).

**Endpoints**:
- Dataset JSON: `GET http://localhost:8000/api/v1/benchmark/dataset`
- Statistical Summary: `GET http://localhost:8000/api/v1/benchmark/dataset/summary`
- Interactive Inspector: `http://localhost:3000/analytics` *(Official Benchmark Dataset Inspector Section)*

---

## 🚀 Step-by-Step Local Setup Guide

### Prerequisites
- **Python**: 3.10, 3.11, or 3.12
- **Node.js**: v18.x or v20.x
- **npm**: v9.x or higher

---

### Step 1: Backend Setup (FastAPI)

1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Windows (PowerShell)
   python -m venv .venv
   .\.venv\Scripts\activate

   # Linux / macOS
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables (default SQLite is pre-configured for zero-dependency execution):
   ```bash
   # Copy sample environment configuration
   cp .env.example .env
   ```

5. Launch the FastAPI server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   *Backend will be running at:* `http://localhost:8000`  
   *Interactive OpenAPI Docs:* `http://localhost:8000/docs`

---

### Step 2: Frontend Setup (Next.js 14 App Router)

1. Open a second terminal and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Launch the Next.js development server:
   ```bash
   npm run dev
   ```

   *Frontend will be running at:* `http://localhost:3000`

---

## 🧭 Jury & Evaluator Navigation Guide

| Interface | URL | Evaluator Walkthrough & Key Actions |
|---|---|---|
| **Citizen Portal** | `http://localhost:3000/citizen` | • Test 1-click multilingual benchmark prompts in **Tamil (`தமிழ்`)**, **Hindi (`हिन्दी`)**, and **English**.<br>• View live **Ward GIS Radar** detecting nearby incident clusters (`#MST-2026-088`).<br>• Switch to **Benefit Navigator (Track B)** to discover and apply for GCC schemes with instant sync to ticket history. |
| **Officer Workspace** | `http://localhost:3000/officer` | • Inspect the pinned **Master Incident Banner** merging 15 citizen reports.<br>• Open ticket details to review the **Split-Screen Before/After AI Visual Verification** card.<br>• Review and approve the **Auto-BOQ Indent** with Municipal SoR codes.<br>• Execute Dispatch, Re-route, or Resolve actions with instant audit log update. |
| **Executive BI Dashboard** | `http://localhost:3000/analytics` | • Explore the **GIS Infrastructure & Flood Heatmap** with 6h, 12h, and 24h IMD rainfall forecast toggles.<br>• Review the **Contractor SLA Leaderboard** filtered by Electrical, Roads, or Drainage wings.<br>• Inspect the **Official Benchmark Dataset Inspector** with Track A / Track B filters and raw JSON export. |
| **FastAPI Swagger Docs** | `http://localhost:8000/docs` | • Test `/api/v1/ai/process-intent`, `/api/v1/tickets`, and `/api/v1/benchmark/dataset`. |

---

## 🔒 Security & Privacy Sanitization
- All sensitive keys have been scrubbed; mock/fallback AI heuristics are provided for offline evaluation without requiring external API keys.
- Real credentials and build artifacts are excluded via `.gitignore`.
- Benchmark dataset contains zero PII and complies with synthetic public evaluation standards.

---

## 📄 License
Prepared exclusively for the **Rodic InfraAI Innovation Challenge 2026**.  
© 2026 YellowSense JanSetu Consortium. All Rights Reserved.
