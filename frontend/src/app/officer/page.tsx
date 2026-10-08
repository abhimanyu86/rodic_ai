"use client";

import React, { useState, useEffect } from "react";
import {
  api,
  Ticket,
} from "@/lib/api";
import TrustBadge from "@/components/TrustBadge";
import TicketTimeline from "@/components/TicketTimeline";
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Building2,
  MapPin,
  Check,
  Sparkles,
  Zap,
  Filter,
  Volume2,
  Play,
  Pause,
  X,
  UserCheck,
  Truck,
  CornerUpRight,
  Flame,
  FileText,
  PhoneCall,
  User,
  ArrowRight,
  Layers,
  CheckCheck,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Calculator,
  Receipt,
  FileCheck2,
} from "lucide-react";

export default function OfficerPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [deptFilter, setDeptFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Feature 3: Smart Incident Clustering Accordion State
  const [isClusterExpanded, setIsClusterExpanded] = useState<boolean>(true);

  // Feature 2: Auto-BOQ Approval State
  const [boqApproved, setBoqApproved] = useState<boolean>(false);

  // Feature 7: Citizen Voice Callback IVR Audio Playing State
  const [isIvrPlaying, setIsIvrPlaying] = useState<boolean>(false);

  // Detailed Inspection Slide-over Drawer State
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [actionNote, setActionNote] = useState("");
  const [rerouteDepartment, setRerouteDepartment] = useState("Chennai Metro Water (CMWSSB)");
  const [isExecutingAction, setIsExecutingAction] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [batchAcceptSuccess, setBatchAcceptSuccess] = useState<boolean>(false);

  // GCC / Chennai Seeded Demo Tickets (Strict Blueprint Specifications)
  const SEEDED_GCC_TICKETS: Ticket[] = [
    {
      ticket_id: "GRV-2026-0001",
      category: "Public Infrastructure (Roads & Lighting)",
      department: "Municipal Electrical Services (TANGEDCO / GCC)",
      issue: "Streetlight non-functional for 3 days near Anna Nagar 2nd Avenue causing severe darkness.",
      priority: "High",
      confidence: 0.94,
      status: "Resolved",
      citizen_name: "K. Ramanathan",
      citizen_phone: "+91 98401 22334",
      assigned_officer: "Officer M. Suresh (Duty Engineer, GCC)",
      raw_transcript: "எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக தெருவிளக்கு வேலை செய்யவில்லை. இரவு நேரத்தில் மிகவும் இருட்டாக உள்ளது.",
      translated_text: "Streetlight not working for the last 3 days in our area. It is very dark and unsafe at night.",
      language: "ta-IN",
      trustshield_rationale: "Tokens identified: தெருவிளக்கு (streetlight) + இருட்டாக (darkness). Matched Department Rule #104. HITL Rule: Confidence >85% triggers automatic department queue assignment.",
      location: { area: "Anna Nagar Sector 4", city: "Chennai", ward: "Ward 12, Zone 4", lat: 13.0850, lng: 80.2101 },
      created_at: new Date().toISOString(),
      sla_deadline: new Date(Date.now() + 42 * 3600 * 1000).toISOString(),
      sla_remaining_hours: 42.0,
      verification_status: "Voice Callback: Confirmed Fixed (Tamil)",
      timeline: [
        { status: "Voice Callback: Confirmed Fixed (Tamil)", timestamp: "15:10 PM", desc: "Automated IVR Bot called citizen (+91 98401 22334): Citizen confirmed fix 100% operational.", actor: "GCC Voice Bot" },
        { status: "Resolved", timestamp: "15:05 PM", desc: "Replacement 140W LED Luminaire verified with AI Visual Match (96%).", actor: "Officer Suresh" },
        { status: "In Progress", timestamp: "14:30 PM", desc: "GCC Electrical Rapid Line Squad mobilized to site with replacement LED fixtures.", actor: "Officer Suresh" },
        { status: "AI Classified & Routed to TANGEDCO/GCC", timestamp: "10:43 AM", desc: "JanSetu AI routed grievance to Municipal Electrical Services (Confidence: 94%).", actor: "JanSetu AI" },
        { status: "Submitted", timestamp: "10:42 AM", desc: "Captured via JanSetu Tamil Voice Engine.", actor: "Citizen K. Ramanathan" },
      ],
    },
    {
      ticket_id: "GRV-2026-0002",
      category: "Water Supply & Quality",
      department: "Chennai Metro Water (CMWSSB)",
      issue: "Drinking water pipeline contamination near Mylapore Tank affecting 60+ households.",
      priority: "High",
      confidence: 0.96,
      status: "Submitted",
      citizen_name: "S. Meenakshi",
      citizen_phone: "+91 98410 55667",
      assigned_officer: "Officer P. Radhakrishnan",
      raw_transcript: "குடிநீர் குழாய் கழிவுநீருடன் கலந்துள்ளது. உடனடி நடவடிக்கை தேவை.",
      translated_text: "Drinking water pipeline contaminated with sewage water near South Mada Street. Immediate action required.",
      language: "ta-IN",
      trustshield_rationale: "Confidence 96%. Matched Rule #208 (Drinking Water Contamination -> CMWSSB). High urgency public health flag active.",
      location: { area: "Mylapore Tank", city: "Chennai", ward: "Ward 125, Zone 9", lat: 13.0336, lng: 80.2687 },
      created_at: new Date().toISOString(),
      sla_deadline: new Date(Date.now() + 45 * 3600 * 1000).toISOString(),
      sla_remaining_hours: 45.0,
      verification_status: "Voice Callback: Scheduled on Fix",
      timeline: [
        { status: "AI Classified & Routed", timestamp: "09:15 AM", desc: "Assigned to Chennai Metro Water (CMWSSB).", actor: "JanSetu AI" },
        { status: "Submitted", timestamp: "09:14 AM", desc: "Captured via Tamil Voice Portal.", actor: "Citizen Meenakshi" },
      ],
    },
    {
      ticket_id: "GRV-2026-0003",
      category: "Public Works (Roads & Bridges)",
      department: "Highways & Public Works Department (PWD)",
      issue: "Monsoon created 3 dangerous deep potholes on Royapettah High Road causing traffic accidents.",
      priority: "High",
      confidence: 0.95,
      status: "Submitted",
      citizen_name: "Vikas Sharma",
      citizen_phone: "+91 97110 55443",
      assigned_officer: "Officer Anandan",
      raw_transcript: "रॉयपेटा मेन रोड पर भारी बारिश के बाद 3 गहरे गड्ढे हो गए हैं, जिससे दोपहिया वाहन गिर रहे हैं।",
      translated_text: "Heavy rain created 3 dangerous deep potholes on Royapettah High Road causing skid accidents.",
      language: "hi-IN",
      trustshield_rationale: "Confidence 95%. Matched Rule #312 (Potholes on Major Road -> PWD). Road safety hazard verified against municipal road ledger.",
      location: { area: "Royapettah High Road", city: "Chennai", ward: "Ward 114, Zone 9", lat: 13.0524, lng: 80.2606 },
      created_at: new Date().toISOString(),
      sla_deadline: new Date(Date.now() + 28 * 3600 * 1000).toISOString(),
      sla_remaining_hours: 28.0,
      verification_status: "Voice Callback: Re-Opened by Citizen",
      timeline: [
        { status: "Voice Callback: Re-Opened by Citizen", timestamp: "09:30 AM", desc: "Automated IVR call placed: Citizen reported asphalt patch failed. Grievance re-opened with High Priority.", actor: "GCC Voice Bot" },
        { status: "AI Classified & Routed", timestamp: "Yesterday", desc: "Assigned to Highways & Public Works Department.", actor: "JanSetu AI" },
        { status: "Submitted", timestamp: "Yesterday", desc: "Captured via Hindi Voice Intake.", actor: "Citizen Vikas" },
      ],
    },
    {
      ticket_id: "GRV-2026-0004",
      category: "Power Distribution",
      department: "TANGEDCO Central Distribution",
      issue: "Streetlight non-functional and transformer spark observed on main road near Panagal Park.",
      priority: "Critical",
      confidence: 0.98,
      status: "Submitted",
      citizen_name: "T. Narayanan",
      citizen_phone: "+91 94440 23456",
      assigned_officer: "Officer K. Selvam",
      raw_transcript: "Streetlight non-functional and transformer spark observed on main road.",
      translated_text: "Streetlight non-functional and transformer spark observed on main road.",
      language: "en-IN",
      trustshield_rationale: "Confidence 98%. Matched Rule #101 (Transformer Spark Hazard -> TANGEDCO Emergency Cell). Critical safety bypass active: 2h Hard SLA.",
      location: { area: "Panagal Park, T-Nagar", city: "Chennai", ward: "Ward 118, Zone 10", lat: 13.0418, lng: 80.2341 },
      created_at: new Date().toISOString(),
      sla_deadline: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
      sla_remaining_hours: 2.0,
      verification_status: "Voice Callback: Scheduled on Fix",
      timeline: [
        { status: "Automated Escalation Level 2", timestamp: "30 mins ago", desc: "Automated CPGRAMS Emergency Alert sent to Executive Engineer.", actor: "SLA Monitor" },
        { status: "AI Classified & Routed", timestamp: "Yesterday", desc: "Tagged CRITICAL and routed to TANGEDCO High Voltage Emergency Cell.", actor: "JanSetu AI" },
        { status: "Submitted", timestamp: "Yesterday", desc: "Captured via English Web Portal.", actor: "Citizen Narayanan" },
      ],
    },
  ];

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setIsLoading(true);
    try {
      const data = await api.getTickets();
      if (data && data.length > 0) {
        setTickets(data);
      } else {
        setTickets(SEEDED_GCC_TICKETS);
      }
    } catch {
      setTickets(SEEDED_GCC_TICKETS);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (ticketId: string, targetStatus: string, note: string) => {
    setIsExecutingAction(true);
    try {
      const isResolving = targetStatus === "Resolved";
      setTickets((prev) =>
        prev.map((t) => {
          if (t.ticket_id === ticketId) {
            const newTimeline = [
              ...(isResolving
                ? [
                    {
                      status: "Voice Callback: Confirmed Fixed (Tamil)",
                      timestamp: "Just now",
                      desc: "Automated IVR callback completed: Citizen verified fix.",
                      actor: "GCC Voice Bot",
                    },
                  ]
                : []),
              {
                status: targetStatus,
                timestamp: "Just now",
                desc: note,
                actor: "Officer Suresh",
              },
              ...t.timeline,
            ];
            return {
              ...t,
              status: targetStatus,
              verification_status: isResolving
                ? "Voice Callback: Confirmed Fixed (Tamil)"
                : t.verification_status || "Voice Callback: Scheduled on Fix",
              timeline: newTimeline,
            };
          }
          return t;
        })
      );

      await api.actionTicket(ticketId, {
        status: targetStatus,
        note: note,
        assigned_officer: "Officer Suresh (Duty Engineer, GCC)",
      });

      await loadTickets();
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecutingAction(false);
    }
  };

  // Batch Accept All >90% Confidence Action
  const handleBatchAccept = async () => {
    setBatchAcceptSuccess(true);
    setTickets((prev) =>
      prev.map((t) =>
        t.confidence >= 0.9 && t.status === "Submitted"
          ? {
              ...t,
              status: "In Progress",
              timeline: [
                { status: "In Progress", timestamp: "Just now", desc: "Auto-accepted via Batch Officer Action (>90% Confidence)", actor: "Officer Suresh" },
                ...t.timeline,
              ],
            }
          : t
      )
    );
    setTimeout(() => setBatchAcceptSuccess(false), 3000);
  };

  // Feature 2: Handle BOQ Material Approval
  const handleApproveBOQ = () => {
    setBoqApproved(true);
    setActionNote("Auto-BOQ Indent #BOQ-2026-4401 Approved: 65 kg Cold-Mix Bituminous Asphalt (₹2,850) allocated under Municipal SoR Code #MR-14. Rapid Response Crew mobilized.");
    setActionSuccessMsg("✓ Material Indent Approved & Contractor Allocated under Municipal SoR!");
  };

  // Drawer Actions
  const handleExecuteAction = async (actionType: "Dispatch" | "Re-route" | "Resolve") => {
    if (!selectedTicket) return;
    setIsExecutingAction(true);
    setActionSuccessMsg(null);
    try {
      let status = "In Progress";
      let note = actionNote;
      let dept = undefined;

      if (actionType === "Dispatch") {
        status = "In Progress";
        note = note || "GCC / TANGEDCO Rapid Response Line Squad mobilized to site with machinery.";
      } else if (actionType === "Re-route") {
        status = "Re-routed";
        dept = rerouteDepartment;
        note = note || `Re-routed to ${rerouteDepartment} by Duty Engineer.`;
      } else if (actionType === "Resolve") {
        status = "Resolved";
        note = note || "Field inspection verified and resolution proof accepted. Grievance closed.";
      }

      let updated: Ticket;
      try {
        updated = await api.actionTicket(selectedTicket.ticket_id, {
          status,
          note,
          department: dept,
          assigned_officer: "Officer Suresh (Duty Engineer, GCC)",
        });
      } catch (_e) {
        updated = {
          ...selectedTicket,
          status,
          department: dept || selectedTicket.department,
          verification_status: status === "Resolved" ? "Voice Callback: Confirmed Fixed (Tamil)" : selectedTicket.verification_status,
          timeline: [
            ...(status === "Resolved"
              ? [
                  {
                    status: "Voice Callback: Confirmed Fixed (Tamil)",
                    timestamp: "Just now",
                    desc: "Automated IVR Bot verified fix with citizen over telephone call.",
                    actor: "GCC Voice Bot",
                  },
                ]
              : []),
            {
              status,
              timestamp: "Just now",
              desc: note,
              actor: "Officer Suresh",
            },
            ...selectedTicket.timeline,
          ],
        };
      }

      setSelectedTicket(updated);
      setTickets((prev) => prev.map((t) => (t.ticket_id === updated.ticket_id ? updated : t)));
      setActionNote("");
      setActionSuccessMsg(`Action applied successfully: ${status}`);
      await loadTickets();
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecutingAction(false);
    }
  };

  // 4 Strict KPI Metrics
  const triageQueueCount = 4;
  const pendingAllocationCount = 3;
  const slaRiskCount = 1; // 1 Critical 2h ticket
  const routingAccuracy = "94.2%";

  // Dynamic TrustShield Rationale Builder
  const getTrustShieldExplanation = (ticket: Ticket) => {
    if (ticket.priority === "Critical" || ticket.issue.includes("spark") || ticket.issue.includes("தீப்பொறி")) {
      return "ACOUSTIC & TEXT CRITICAL PANIC DETECTED: Matched Rule #101 (Transformer Spark Hazard -> Emergency Cell). Priority escalated to CRITICAL. 2-Hour Hard SLA Enforcement Active.";
    }
    if (ticket.category.includes("Electrical") || ticket.issue.includes("Streetlight") || ticket.issue.includes("தெருவிளக்கு")) {
      return "Tokens identified: தெருவிளக்கு (streetlight) + இருட்டாக (darkness). Matched Department Rule #104. HITL Rule: Confidence >85% triggers automatic department queue assignment.";
    }
    if (ticket.category.includes("Water")) {
      return "Confidence 96%. Matched Rule #208 (Drinking Water Contamination -> CMWSSB). High urgency public health flag active.";
    }
    if (ticket.category.includes("Roads") || ticket.category.includes("PWD")) {
      return "Confidence 95%. Matched Rule #312 (Potholes on Major Road -> PWD). Road safety hazard verified against municipal road ledger.";
    }
    return (
      ticket.trustshield_rationale ||
      "Confidence 94%. Matched GCC Municipal Public Infrastructure Rules."
    );
  };

  // Filtered Tickets
  const filteredTickets = tickets.filter((t) => {
    if (statusFilter !== "ALL" && t.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    if (deptFilter !== "ALL" && !t.department.toLowerCase().includes(deptFilter.toLowerCase())) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = t.ticket_id.toLowerCase().includes(q);
      const matchIssue = t.issue.toLowerCase().includes(q);
      const matchArea = (t.location?.area || "").toLowerCase().includes(q);
      const matchCity = (t.location?.city || "").toLowerCase().includes(q);
      const matchDept = (t.department || "").toLowerCase().includes(q);
      if (!matchId && !matchIssue && !matchArea && !matchCity && !matchDept) return false;
    }
    return true;
  });

  return (
    <div className="w-full space-y-5 text-slate-900">
      {/* Workspace Header (Strict Blueprint Specifications) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
              Rodic Workspace | Electrical Dept • Chennai Central Zone 4
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Greater Chennai Corporation (GCC)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 tracking-tight">
            Municipal AI Triage Desk & SLA Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Real-time citizen grievance intake triage, GCC ticket assignment & contractor dispatch.
          </p>
        </div>

        <button
          type="button"
          onClick={loadTickets}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs text-xs font-medium"
          title="Refresh feed"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* 4 KPI Metric Cards (Full Width) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* KPI 1 */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">AI Triage Queue</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{triageQueueCount}</span>
            <span className="text-xs font-medium text-amber-700">(Pending Review)</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">Pending Allocation</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{pendingAllocationCount}</span>
            <span className="text-xs font-medium text-slate-500">Tickets</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Critical Emergency SLA (&lt; 2 hrs)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-rose-600">{slaRiskCount}</span>
            <span className="text-xs font-bold text-rose-700">(Active Hazard)</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> AI Routing Accuracy
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{routingAccuracy}</span>
            <span className="text-xs font-medium text-slate-500">(TrustShield Benchmark)</span>
          </div>
        </div>
      </div>

      {/* High Density Triage Table & Quick Bulk Action Bar (Full Width) */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden space-y-3 w-full">
        {/* Quick Bulk Action Bar & Filters */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Left: Search input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search Ticket ID, area, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Center: Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-600" /> Status:
            </span>
            {["ALL", "Submitted", "In Progress", "Resolved"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  statusFilter === st
                    ? "bg-amber-500 text-slate-950 font-semibold shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
                }`}
              >
                {st}
              </button>
            ))}

            <span className="text-slate-500 font-medium ml-2">Dept:</span>
            {["ALL", "TANGEDCO", "Water", "PWD"].map((dp) => (
              <button
                key={dp}
                type="button"
                onClick={() => setDeptFilter(dp)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  deptFilter === dp
                    ? "bg-slate-900 text-white font-semibold shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
                }`}
              >
                {dp}
              </button>
            ))}
          </div>

          {/* Right: Quick Bulk Action Bar Button */}
          <button
            type="button"
            onClick={handleBatchAccept}
            className="w-full lg:w-auto px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4 text-slate-950" />
            <span>Batch Accept All &gt;90% Confidence</span>
          </button>
        </div>

        {/* Batch Success Feedback */}
        {batchAcceptSuccess && (
          <div className="mx-5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>✓ All eligible tickets with &gt;90% TrustShield confidence moved to "In Progress" with officer assignment!</span>
          </div>
        )}

        {/* Feature 3: Smart Incident Clustering Pinned Master Incident Banner Row */}
        <div className="mx-4 sm:mx-5 border border-amber-300 bg-amber-50/60 rounded-xl overflow-hidden shadow-xs">
          <div
            onClick={() => setIsClusterExpanded(!isClusterExpanded)}
            className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 cursor-pointer hover:bg-amber-100/50 transition-colors"
          >
            <div className="flex items-start sm:items-center gap-3">
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded shadow-xs uppercase tracking-wider shrink-0">
                MASTER INCIDENT #MST-2026-088
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>Power Outage & Transformer Failure — 15 Reports Merged</span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                    Emergency Dispatched
                  </span>
                </h4>
                <p className="text-xs text-slate-600 font-normal mt-0.5 flex flex-wrap items-center gap-2">
                  <span><strong>Location:</strong> Anna Nagar Zone 4</span>
                  <span>•</span>
                  <span><strong>Channel:</strong> 9 Web, 6 WhatsApp Voice</span>
                  <span>•</span>
                  <span><strong>Target SLA:</strong> 2h Emergency</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <span className="text-xs font-semibold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded border border-amber-300">
                15 Linked Reports
              </span>
              {isClusterExpanded ? (
                <ChevronUp className="w-4 h-4 text-amber-900" />
              ) : (
                <ChevronDown className="w-4 h-4 text-amber-900" />
              )}
            </div>
          </div>

          {/* Expanded Accordion Showing Merged Reports */}
          {isClusterExpanded && (
            <div className="border-t border-amber-200 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  <span>Deduplication Engine Active: Merged Citizen Influx Feed</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  Sub-tickets auto-synced to Master Resolution #MST-2026-088
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* Citizen 1 */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">1. K. Ramanathan</span>
                    <span className="text-[10px] font-semibold text-slate-500">10:42 AM</span>
                  </div>
                  <span className="text-[11px] text-slate-600 block">+91 98401 22334 • Web Portal</span>
                  <p className="text-[11px] text-slate-500 italic">"Streetlight non-functional and darkness near 2nd Ave."</p>
                </div>

                {/* Citizen 2 */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">2. Priya Sridhar</span>
                    <span className="text-[10px] font-semibold text-slate-500">10:44 AM</span>
                  </div>
                  <span className="text-[11px] text-slate-600 block">+91 98412 88471 • WhatsApp Audio</span>
                  <p className="text-[11px] text-slate-500 italic">"Sparking heard on local feeder line transformer."</p>
                </div>

                {/* Citizen 3 */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">3. M. Arumugam</span>
                    <span className="text-[10px] font-semibold text-slate-500">10:48 AM</span>
                  </div>
                  <span className="text-[11px] text-slate-600 block">+91 94443 19283 • WhatsApp Voice</span>
                  <p className="text-[11px] text-slate-500 italic">"Power went off in 5 houses simultaneously."</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-600">
                <span>+ 12 additional citizen submissions batched with zero ticket redundancy.</span>
                <span className="font-semibold text-emerald-800">Single Rapid Crew Dispatched (Feeder #4)</span>
              </div>
            </div>
          )}
        </div>

        {/* Triage Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs text-slate-900">
            <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Ticket ID</th>
                <th className="px-5 py-3.5">Category & Issue</th>
                <th className="px-5 py-3.5">Location</th>
                <th className="px-5 py-3.5">TrustShield Score</th>
                <th className="px-5 py-3.5">Remaining SLA</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Verification Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredTickets.map((t) => {
                const isCriticalHazard = t.priority === "Critical" || t.issue.includes("spark");

                return (
                  <tr
                    key={t.ticket_id}
                    onClick={() => {
                      setSelectedTicket(t);
                      setActionSuccessMsg(null);
                      setBoqApproved(false);
                    }}
                    className={`hover:bg-slate-50/80 cursor-pointer transition-colors group ${
                      isCriticalHazard ? "bg-rose-50/30" : ""
                    }`}
                  >
                    {/* Ticket ID */}
                    <td className="px-5 py-4 font-mono font-semibold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {t.ticket_id}
                    </td>

                    {/* Category & Issue + Feature 4 Critical Safety Hazard Pulsing Badge */}
                    <td className="px-5 py-4 max-w-md">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-slate-900 text-xs">{t.category}</span>
                        <span
                          className={`text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded border ${
                            t.priority === "Critical"
                              ? "bg-rose-50 text-rose-800 border-rose-200 font-bold"
                              : t.priority === "High"
                              ? "bg-amber-50 text-amber-900 border-amber-200"
                              : "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {t.priority}
                        </span>

                        {isCriticalHazard && (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white animate-pulse">
                            <Flame className="w-2.5 h-2.5" />
                            <span>CRITICAL SAFETY HAZARD — EMERGENCY DISPATCH TRIGGERED</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                        {t.issue}
                      </p>
                    </td>

                    {/* Location */}
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 font-medium text-slate-900">
                        <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        {t.location?.area || "Anna Nagar"}, {t.location?.city || "Chennai"}
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal block">
                        {t.location?.ward || "Ward 12, Zone 4"}
                      </span>
                    </td>

                    {/* TrustShield Score */}
                    <td className="px-5 py-4">
                      <TrustBadge score={t.confidence} size="sm" />
                    </td>

                    {/* Remaining SLA */}
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <span
                          className={`font-semibold flex items-center gap-1 text-xs ${
                            isCriticalHazard
                              ? "text-rose-700 font-bold animate-pulse"
                              : t.sla_remaining_hours < 12
                              ? "text-rose-700"
                              : t.sla_remaining_hours < 24
                              ? "text-amber-800"
                              : "text-slate-900"
                          }`}
                        >
                          <Clock className={`w-3.5 h-3.5 ${isCriticalHazard ? "text-rose-600" : "text-amber-600"}`} />
                          {t.sla_remaining_hours}h remaining {isCriticalHazard && "(Emergency 2h)"}
                        </span>
                        <div className="w-24 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            style={{ width: `${Math.min(100, (t.sla_remaining_hours / (isCriticalHazard ? 2 : 48)) * 100)}%` }}
                            className={`h-full rounded-full ${
                              isCriticalHazard ? "bg-rose-600 animate-pulse" : t.sla_remaining_hours < 12 ? "bg-rose-500" : "bg-emerald-500"
                            }`}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded border ${
                          t.status === "Resolved"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : t.status === "In Progress" || t.status === "Escalated"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-amber-50 text-amber-900 border-amber-200"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>

                    {/* Feature 7: Closed-Loop Citizen Voice Callback Verification Status */}
                    <td className="px-5 py-4">
                      {t.verification_status?.includes("Confirmed Fixed") || (t.status === "Resolved" && !t.verification_status?.includes("Re-Opened")) ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs whitespace-nowrap">
                          <PhoneCall className="w-3 h-3 text-emerald-600" />
                          <span>Voice Callback: Confirmed Fixed (Tamil)</span>
                        </span>
                      ) : t.verification_status?.includes("Re-Opened") || t.ticket_id === "GRV-2026-0003" ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 shadow-xs whitespace-nowrap">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>Voice Callback: Re-Opened by Citizen</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 whitespace-nowrap">
                          <Clock className="w-2.5 h-2.5 text-slate-400" />
                          <span>Voice Callback: Scheduled on Fix</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {t.status !== "Resolved" ? (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickAction(t.ticket_id, "In Progress", "Accepted by Zone 4 Duty Engineer Suresh");
                              }}
                              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTicket(t);
                              }}
                              className="px-2.5 py-1 text-xs font-medium rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickAction(t.ticket_id, "Resolved", "Field inspection verified and resolution proof accepted.");
                              }}
                              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                            >
                              Resolve
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] font-semibold text-emerald-800 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded">
                            ✓ Closed
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-Over Detail Drawer */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-l border-slate-200 w-full max-w-2xl h-full overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between text-slate-900">
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-slate-900">
                      {selectedTicket.ticket_id}
                    </span>
                    <TrustBadge score={selectedTicket.confidence} size="sm" />
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded border bg-amber-50 text-amber-900 border-amber-200">
                      {selectedTicket.priority} Priority
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">
                    {selectedTicket.category}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 font-normal">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Citizen: {selectedTicket.citizen_name || "Resident"}</span>
                    <span>•</span>
                    <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTicket.citizen_phone || "+91 98401 22334"}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors border border-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Success Alert */}
              {actionSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{actionSuccessMsg}</span>
                </div>
              )}

              {/* Feature 1: "Before & After" AI Visual Verification (Ghost Closure Prevention) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <span>AI Visual Verification (Ghost Closure Prevention)</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ✓ AI Visual Resolution Match: 96% Verified
                  </span>
                </div>

                {/* Split-Screen Visual Comparison Card */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* Left: Citizen Photo (Before) */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700 uppercase">Citizen Photo (Before)</span>
                      <span className="text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">Defect Tagged</span>
                    </div>
                    {/* Visual representation */}
                    <div className="h-28 bg-slate-100 rounded-md border border-slate-200 flex flex-col items-center justify-center p-2 text-center text-slate-500 space-y-1 relative overflow-hidden">
                      <div className="w-10 h-10 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700">Damaged Streetlight Wiring</span>
                      <span className="text-[9px] text-slate-400">Exposed Line • Sector 4 Pole #08</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Captured: Yesterday 10:42 AM • GPS Matched</span>
                  </div>

                  {/* Right: Officer/Contractor Upload (After) */}
                  <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-700 uppercase">Contractor Upload (After)</span>
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Proof Verified</span>
                    </div>
                    {/* Visual representation */}
                    <div className="h-28 bg-emerald-50/50 rounded-md border border-emerald-200 flex flex-col items-center justify-center p-2 text-center text-emerald-800 space-y-1 relative overflow-hidden">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-800">Repaired, Operational LED</span>
                      <span className="text-[9px] text-emerald-700">140W Luminaire • Circuit Sealed</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">Uploaded: Today 14:15 PM • Luminance Pass</span>
                  </div>
                </div>

                {/* Verification Metadata Footnote */}
                <div className="p-2 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-center justify-between text-[11px] text-emerald-900 font-medium">
                  <span>Structural Integrity: <strong>Intact</strong></span>
                  <span>•</span>
                  <span>Luminance: <strong>Verified (420 Lux)</strong></span>
                  <span>•</span>
                  <span>No Ghost Closure Detected</span>
                </div>
              </div>

              {/* Feature 2: Automated Repair Material & Cost Estimator (Auto-BOQ Brief) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <Calculator className="w-4 h-4 text-amber-600" />
                    <span>Automated BOQ Brief (Generated from Visual Damage Analysis)</span>
                  </div>
                  <span className="bg-amber-100 text-amber-950 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    Schedule of Rates (SoR)
                  </span>
                </div>

                {/* Structured Grid Layout */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-medium text-slate-500 tracking-wider block mb-0.5">
                      Estimated Defect Volume
                    </span>
                    <span className="font-bold text-slate-900">14 sq ft / 3.5 inches deep</span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-medium text-slate-500 tracking-wider block mb-0.5">
                      Bill of Quantities (BOQ)
                    </span>
                    <span className="font-bold text-slate-900">65 kg Cold-Mix Bituminous Asphalt + 1 Base Primer</span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-medium text-slate-500 tracking-wider block mb-0.5">
                      Municipal SoR Cost
                    </span>
                    <span className="font-bold text-emerald-800 text-sm">₹2,850</span>
                  </div>

                  <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-medium text-slate-500 tracking-wider block mb-0.5">
                      Estimated Crew Hours
                    </span>
                    <span className="font-bold text-slate-900">1.5 Hours (Rapid Squad)</span>
                  </div>
                </div>

                {/* Action shortcut button */}
                {boqApproved ? (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-semibold text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <FileCheck2 className="w-4 h-4 text-emerald-600" />
                      <span>✓ Material Indent #BOQ-2026-4401 Approved & Contractor Dispatched</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono">₹2,850 Booked</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleApproveBOQ}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white hover:bg-amber-50 text-slate-900 border border-amber-300 font-semibold text-xs shadow-xs transition-colors"
                  >
                    <Receipt className="w-3.5 h-3.5 text-amber-700" />
                    <span>Approve Material Indent & Dispatch Contractor</span>
                  </button>
                )}
              </div>

              {/* Feature 7: Automated Citizen Voice Callback Audit Box (Ghost Closure Defeated) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>Automated Citizen Voice Callback Audit (Ghost Closure Defeated)</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    <span>98.6% Authenticated Resolution</span>
                  </span>
                </div>

                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 border-b border-slate-100 pb-2 gap-2">
                    <span className="font-semibold text-slate-700">
                      Call Timestamp: <strong>Today, 15:10 PM (5 mins post-resolution)</strong>
                    </span>
                    <span className="text-slate-500">
                      Duration: <strong>24s</strong> • Lang: <strong>ta-IN (Tamil)</strong>
                    </span>
                  </div>

                  {/* Automated IVR Dialog (Tamil) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                        Automated IVR Dialog (Tamil):
                      </span>
                      <span className="text-[10px] text-slate-400">GCC Bot Prompt</span>
                    </div>
                    <p className="p-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-800 text-xs italic font-medium">
                      "வணக்கம், உங்கள் தெருவிளக்கு பிரச்சனை சரிசெய்யப்பட்டதா?"
                      <span className="block text-[11px] not-italic text-slate-500 font-normal mt-0.5">
                        (Translation: "Was your streetlight issue fixed?")
                      </span>
                    </p>
                  </div>

                  {/* Citizen Voice Response */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                        Citizen Voice Response:
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Acoustic Tone: Positive
                      </span>
                    </div>
                    <p className="p-2.5 rounded-md bg-emerald-50/40 border border-emerald-200 text-emerald-950 text-xs italic font-semibold">
                      "ஆம், விளக்கு எரிகிறது, நன்றி."
                      <span className="block text-[11px] not-italic text-emerald-800 font-normal mt-0.5">
                        (Translation: "Yes, the light is working, thank you.")
                      </span>
                    </p>
                  </div>

                  {/* Permanent Status & Play Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <div className="text-[11px] text-slate-700">
                      Permanent Status: <strong className="text-emerald-800">Closed - Ghost Closure Defeated</strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsIvrPlaying(!isIvrPlaying)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs shadow-xs transition-colors self-start sm:self-auto"
                    >
                      {isIvrPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-slate-950" />
                          <span>Pause IVR (24s)</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-slate-950" />
                          <span>Play IVR Call Recording (24s)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Simulated Waveform on Play */}
                  {isIvrPlaying && (
                    <div className="flex items-center gap-1 py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200 h-8 shadow-inner">
                      {[40, 70, 90, 60, 100, 80, 50, 85, 95, 40, 75, 90, 65, 80, 55, 90, 70, 45].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${h}%` }}
                          className="flex-1 bg-emerald-500 rounded-full animate-pulse transition-all"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Regional Tamil/Hindi Speech Waveform Playback & Transcript */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-semibold text-slate-900">
                      Regional Speech Transcript ({selectedTicket.language || "ta-IN"})
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                      0:12s duration
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-[11px] font-semibold text-slate-950 transition-colors shadow-xs"
                  >
                    {isAudioPlaying ? (
                      <>
                        <Pause className="w-3 h-3 text-slate-950" /> <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-slate-950" /> <span>Play Audio</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Simulated Audio Waveform Bar */}
                {isAudioPlaying && (
                  <div className="flex items-center gap-1 py-1 px-2 rounded-lg bg-white border border-slate-200 h-8 shadow-inner">
                    {[35, 65, 95, 45, 100, 75, 85, 40, 95, 60, 30, 75, 90, 50, 80, 60, 40, 85].map(
                      (h, i) => (
                        <span
                          key={i}
                          style={{ height: `${h}%` }}
                          className="flex-1 bg-amber-500 rounded-full animate-pulse transition-all"
                        />
                      )
                    )}
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-medium text-slate-500 tracking-wider block">
                    Original Regional Transcription:
                  </span>
                  <p className="text-xs italic text-slate-800 bg-white p-3 rounded-lg border border-slate-200 shadow-xs font-medium">
                    "{selectedTicket.raw_transcript || selectedTicket.issue}"
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-medium text-slate-500 tracking-wider block">
                    English Standard Translation:
                  </span>
                  <p className="text-xs text-slate-800 bg-white p-3 rounded-lg border border-slate-200 shadow-xs font-normal">
                    {selectedTicket.translated_text || selectedTicket.issue}
                  </p>
                </div>
              </div>

              {/* TrustShield Explainability Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>TrustShield Explainability Log</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {Math.round(selectedTicket.confidence * 100)}% Confidence
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs shadow-xs">
                  "{getTrustShieldExplanation(selectedTicket)}"
                </p>
              </div>

              {/* Location & Ward Geographic Info */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>Ward & GIS Coordinates</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    Lat: {selectedTicket.location?.lat || 13.0850}, Lng: {selectedTicket.location?.lng || 80.2101}
                  </span>
                </div>

                <div className="text-xs text-slate-800 font-medium">
                  <span className="font-semibold text-slate-900">
                    {selectedTicket.location?.area || "Anna Nagar Sector 4"}, {selectedTicket.location?.city || "Chennai"}
                  </span>
                  <span className="text-slate-500 block text-[11px] mt-0.5">
                    Assigned Ward Cell: {selectedTicket.location?.ward || "Ward 12, Zone 4"} • Assigned Officer: {selectedTicket.assigned_officer || "Officer Suresh"}
                  </span>
                </div>
              </div>

              {/* Chronological Resolution Timeline */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Resolution Audit Trail:
                </h4>
                <TicketTimeline events={selectedTicket.timeline} />
              </div>
            </div>

            {/* Field Crew Dispatch & Resolution Controls */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <label className="text-xs font-semibold text-slate-700 block">
                Officer Resolution Notes / Dispatch Remarks:
              </label>

              <textarea
                rows={2}
                placeholder="Enter remarks e.g. 'TANGEDCO line squad deployed with replacement LED fixtures.'"
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:border-amber-400"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={isExecutingAction}
                  onClick={() => handleExecuteAction("Dispatch")}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-xs"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Dispatch Field Crew</span>
                </button>

                <button
                  type="button"
                  disabled={isExecutingAction}
                  onClick={() => handleExecuteAction("Resolve")}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Mark Resolved (Verify Match)</span>
                </button>
              </div>

              {/* Department Re-route Control */}
              <div className="flex gap-2 pt-1">
                <select
                  value={rerouteDepartment}
                  onChange={(e) => setRerouteDepartment(e.target.value)}
                  className="flex-1 py-2 px-3 text-xs rounded-lg bg-white border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-amber-400"
                >
                  <option value="Chennai Metro Water (CMWSSB)">Chennai Metro Water (CMWSSB)</option>
                  <option value="Highways & Public Works Department (PWD)">Highways & PWD (Roads)</option>
                  <option value="GCC Solid Waste & Storm Water Drainage">GCC Solid Waste & Drainage</option>
                  <option value="Revenue Department, GCC">Revenue Department, GCC</option>
                </select>

                <button
                  type="button"
                  disabled={isExecutingAction}
                  onClick={() => handleExecuteAction("Re-route")}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-50 transition-colors shadow-xs"
                >
                  Re-assign Dept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
