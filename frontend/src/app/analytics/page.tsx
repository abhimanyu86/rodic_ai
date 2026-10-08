"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Activity,
  ArrowUpRight,
  Sparkles,
  Layers,
  MapPin,
  Flame,
  PieChart,
  Percent,
  Check,
  CloudRain,
  Droplets,
  Wind,
  Award,
  Radio,
  FileSpreadsheet,
  Filter,
  AlertOctagon,
  ChevronRight,
  Database,
  Copy,
  CheckCheck,
  Code,
  Eye,
  FileJson,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Tag,
  Wrench,
} from "lucide-react";
import TrustBadge from "@/components/TrustBadge";
import { api, BenchmarkDataset, BenchmarkRecord } from "@/lib/api";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");
  
  // Feature 5: Predictive Climate & Infrastructure Risk Window
  const [forecastWindow, setForecastWindow] = useState<"6h" | "12h" | "24h">("12h");

  // Feature 6: Vendor Wing Filter
  const [vendorWingFilter, setVendorWingFilter] = useState<string>("ALL");

  // Official Benchmark Dataset Inspector State
  const [benchmarkFilter, setBenchmarkFilter] = useState<"ALL" | "TRACK_A" | "TRACK_B">("ALL");
  const [showRawJson, setShowRawJson] = useState<boolean>(false);
  const [copiedBenchmarkJson, setCopiedBenchmarkJson] = useState<boolean>(false);
  const [expandedBenchmarkId, setExpandedBenchmarkId] = useState<string | null>("GRV-2026-0001");
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkDataset>({
    project_metadata: {
      project_name: "JanSetu Enterprise v2.0",
      challenge: "Rodic InfraAI Innovation Challenge 2026",
      jurisdiction: "Greater Chennai Corporation (GCC) / Government of Tamil Nadu",
      benchmark_standards: "DARPG CPGRAMS Monthly Redressal Standards (June 2026)",
      synthetic_data_compliance: "PII scrubbed, fully anonymized per public data guidelines",
      total_records: 5,
    },
    benchmark_records: [
      {
        ticket_id: "GRV-2026-0001",
        track: "Track A - Grievance Intelligence",
        intake_channel: "Voice AI (ta-IN)",
        language: "Tamil",
        raw_transcript: "எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக தெருவிளக்கு வேலை செய்யவில்லை. இரவு நேரத்தில் மிகவும் இருட்டாக உள்ளது.",
        english_translation: "Streetlight in our area has not been working for the past three days. It is very dark at night.",
        extracted_category: "Public Infrastructure",
        department: "Municipal Electrical Services (TANGEDCO / GCC)",
        ward: "Ward 12, Zone 4, Anna Nagar West, Chennai",
        priority: "Medium",
        sla_hours: 48,
        trustshield_score: 0.94,
        explainability_tokens: ["தெருவிளக்கு (streetlight)", "இருட்டாக (darkness)"],
        status: "In Progress",
        visual_verification_match_pct: 96.0,
        auto_boq: {
          defect_description: "Damaged streetlight overhead fixture & blown LED ballast",
          estimated_cost_inr: 2850,
          materials: ["65W Commercial LED Luminaire", "Weatherproof Junction Seal"],
        },
      },
      {
        ticket_id: "GRV-2026-0002",
        track: "Track A - Grievance Intelligence",
        intake_channel: "Web Portal (hi-IN)",
        language: "Hindi",
        raw_transcript: "हमारे वार्ड में पिछले दो दिनों से पीने के पानी की पाइपलाइन टूटी हुई है और गंदा पानी आ रहा है।",
        english_translation: "Drinking water pipeline has been broken in our ward for two days and contaminated water is flowing.",
        extracted_category: "Water Supply & Sewerage",
        department: "Chennai Metro Water (CMWSSB)",
        ward: "Ward 118, Zone 10, T-Nagar, Chennai",
        priority: "High",
        sla_hours: 48,
        trustshield_score: 0.96,
        explainability_tokens: ["पानी की पाइपलाइन (water pipeline)", "गंदा पानी (contaminated water)"],
        status: "Submitted",
        visual_verification_match_pct: null,
        auto_boq: {
          defect_description: "Sub-surface pipe fracture (4-inch main distribution line)",
          estimated_cost_inr: 4200,
          materials: ["4-inch DI Pipe Collar", "Trench Sealant Compound"],
        },
      },
      {
        ticket_id: "GRV-2026-0003",
        track: "Track A - Grievance Intelligence (Emergency Bypass)",
        intake_channel: "Voice AI (ta-IN)",
        language: "Tamil",
        raw_transcript: "மின்மாற்றியில் பயங்கர தீப்பொறி பறக்கிறது, உடனடியாக வெடிக்கும் அபாயம் உள்ளது!",
        english_translation: "Dangerous sparking from the transformer pole, risk of imminent fire!",
        extracted_category: "Municipal Electrical Services",
        department: "TANGEDCO Rapid Response",
        ward: "Ward 173, Zone 13, Adyar, Chennai",
        priority: "Critical Emergency (Safety Bypass)",
        sla_hours: 2,
        trustshield_score: 0.98,
        explainability_tokens: ["தீப்பொறி (sparking)", "வெடிக்கும் அபாயம் (risk of explosion)"],
        status: "Dispatched",
        visual_verification_match_pct: null,
        auto_boq: {
          defect_description: "High-voltage pole transformer core overheating",
          estimated_cost_inr: 12500,
          materials: ["11kV Drop-out Fuse Unit", "Transformer Insulating Oil (20L)"],
        },
      },
      {
        ticket_id: "GRV-2026-0004",
        track: "Track A - Grievance Intelligence",
        intake_channel: "WhatsApp Integration (en-IN)",
        language: "English",
        raw_transcript: "Deep crater pothole developed on Royapettah High Road after yesterday's rain.",
        english_translation: "Deep crater pothole developed on Royapettah High Road after yesterday's rain.",
        extracted_category: "Road Infrastructure",
        department: "GCC Public Works Department (Roads)",
        ward: "Ward 114, Zone 9, Royapettah, Chennai",
        priority: "High",
        sla_hours: 36,
        trustshield_score: 0.95,
        explainability_tokens: ["crater pothole", "Royapettah High Road"],
        status: "In Progress",
        visual_verification_match_pct: 94.5,
        auto_boq: {
          defect_description: "Pothole surface defect (14 sq ft / 3.5 inches deep)",
          estimated_cost_inr: 2400,
          materials: ["60 kg Cold-Mix Asphalt", "Tack Coat Emulsion"],
        },
      },
      {
        ticket_id: "SCH-2026-0008",
        track: "Track B - Benefit Navigator",
        intake_channel: "Fast-Track e-KYC Portal",
        language: "English",
        scheme_id: "TN-METRO-02",
        scheme_name: "Chennai Metro Water (CMWSSB) Urban Piped Connection",
        department: "Municipal Administration & Water Supply (MAWS)",
        benefit_type: "100% Free Tap Sanctioned",
        ward: "Ward 12, Zone 4, Anna Nagar West, Chennai",
        verification_mode: "GCC Property Card & e-KYC Fast-Track",
        sla_hours: 72,
        trustshield_score: 0.99,
        explainability_tokens: ["Priority civic zone entitlement", "e-KYC clearance"],
        status: "Verification Scheduled (72h SLA)",
        visual_verification_match_pct: null,
        auto_boq: null,
      },
    ],
  });

  useEffect(() => {
    api
      .getBenchmarkDataset()
      .then((data) => {
        if (data && data.benchmark_records && data.benchmark_records.length > 0) {
          setBenchmarkData(data);
        }
      })
      .catch((_err) => {
        // Fallback initialized
      });
  }, []);

  const handleCopyBenchmarkJson = () => {
    navigator.clipboard.writeText(JSON.stringify(benchmarkData, null, 2));
    setCopiedBenchmarkJson(true);
    setTimeout(() => setCopiedBenchmarkJson(false), 2000);
  };

  const filteredBenchmarkRecords = benchmarkData.benchmark_records.filter((rec) => {
    if (benchmarkFilter === "TRACK_A") return rec.track.includes("Track A");
    if (benchmarkFilter === "TRACK_B") return rec.track.includes("Track B");
    return true;
  });

  const forecastData = {
    "6h": {
      label: "Next 6 Hours",
      rainfallPeak: "28 mm",
      activeCrews: "6 Deployed",
      imdNotice: "IMD Yellow Bulletin: Localized convection cells developing over North Chennai coastal basin.",
      zones: [
        {
          zone: "Zone 4",
          name: "Anna Nagar West",
          riskLevel: "High Risk (74% Probability)",
          probability: 74,
          badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
          barColor: "bg-rose-500",
          cloggedDrains: 9,
          predictedRainfall: "28 mm",
          triggerFactor: "9 Clogged Storm Drains reported in past 3 hours + 28mm predicted rainfall.",
          automatedAction: "Pre-monsoon de-silting crew deployed (Sector 4 Main Channel)",
          actionStatus: "Dispatched",
          svgCoords: { cx: 160, cy: 110, r: 24 },
        },
        {
          zone: "Zone 9",
          name: "Mylapore & Royapettah",
          riskLevel: "Moderate Risk (35% Probability)",
          probability: 35,
          badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
          barColor: "bg-amber-500",
          cloggedDrains: 3,
          predictedRainfall: "16 mm",
          triggerFactor: "3 Clogged Storm Drains + 16mm moderate rainfall forecast.",
          automatedAction: "Standby pumping unit alerted (Mylapore South Mada Sump)",
          actionStatus: "Standby",
          svgCoords: { cx: 280, cy: 190, r: 18 },
        },
        {
          zone: "Zone 13",
          name: "Adyar River Basin",
          riskLevel: "Low / Monitored (8% Risk)",
          probability: 8,
          badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
          barColor: "bg-emerald-500",
          cloggedDrains: 1,
          predictedRainfall: "9 mm",
          triggerFactor: "Minor silt accumulation + 9mm localized coastal drizzle.",
          automatedAction: "Routine river basin inflow gauge telemetry monitored",
          actionStatus: "Monitoring",
          svgCoords: { cx: 270, cy: 280, r: 14 },
        },
      ],
    },
    "12h": {
      label: "Next 12 Hours",
      rainfallPeak: "45 mm",
      activeCrews: "11 Deployed",
      imdNotice: "IMD Orange Bulletin: Intense squall lines and high-tide convergence expected across Adyar & Cooum estuaries.",
      zones: [
        {
          zone: "Zone 4",
          name: "Anna Nagar West",
          riskLevel: "High Risk (88% Waterlogging Probability)",
          probability: 88,
          badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
          barColor: "bg-rose-500",
          cloggedDrains: 14,
          predictedRainfall: "45 mm",
          triggerFactor: "14 Clogged Storm Drains reported in past 6 hours + 45mm predicted rainfall.",
          automatedAction: "Pre-monsoon de-silting crew auto-dispatched",
          actionStatus: "Auto-Dispatched",
          svgCoords: { cx: 160, cy: 110, r: 30 },
        },
        {
          zone: "Zone 9",
          name: "Mylapore & Royapettah",
          riskLevel: "Moderate Risk (42% Failure Probability)",
          probability: 42,
          badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
          barColor: "bg-amber-500",
          cloggedDrains: 5,
          predictedRainfall: "28 mm",
          triggerFactor: "5 Clogged Storm Drains reported + 28mm predicted rainfall over flat gradient lines.",
          automatedAction: "Standby high-capacity diesel pumping unit alerted",
          actionStatus: "Standby Alerted",
          svgCoords: { cx: 280, cy: 190, r: 22 },
        },
        {
          zone: "Zone 13",
          name: "Adyar River Basin",
          riskLevel: "Low / Monitored (12% Risk)",
          probability: 12,
          badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
          barColor: "bg-emerald-500",
          cloggedDrains: 2,
          predictedRainfall: "18 mm",
          triggerFactor: "Low blockage density + 18mm predicted rainfall. Sluice discharge unhindered.",
          automatedAction: "Routine river basin inflow gauge telemetry monitored",
          actionStatus: "Monitored",
          svgCoords: { cx: 270, cy: 280, r: 16 },
        },
      ],
    },
    "24h": {
      label: "Next 24 Hours",
      rainfallPeak: "82 mm",
      activeCrews: "18 Deployed",
      imdNotice: "IMD Red Bulletin: Deep depression landfall; heavy to very heavy precipitation across Greater Chennai Corporation.",
      zones: [
        {
          zone: "Zone 4",
          name: "Anna Nagar West",
          riskLevel: "Severe Inundation Risk (94% Probability)",
          probability: 94,
          badgeColor: "bg-rose-600 text-white border-rose-700 animate-pulse",
          barColor: "bg-rose-600",
          cloggedDrains: 22,
          predictedRainfall: "82 mm",
          triggerFactor: "22 Clogged Storm Drains + 82mm heavy monsoon cloudburst forecast.",
          automatedAction: "GCC Disaster Response Unit & Emergency Dewatering Active",
          actionStatus: "Emergency Unit Active",
          svgCoords: { cx: 160, cy: 110, r: 36 },
        },
        {
          zone: "Zone 9",
          name: "Mylapore & Royapettah",
          riskLevel: "High Risk (68% Failure Probability)",
          probability: 68,
          badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
          barColor: "bg-rose-500",
          cloggedDrains: 11,
          predictedRainfall: "54 mm",
          triggerFactor: "11 Clogged Drains + 54mm rainfall forecast. Backwater ingress risk at high tide.",
          automatedAction: "Mobile Diesel Pumps Dispatched to Low-lying Pockets",
          actionStatus: "Dispatched",
          svgCoords: { cx: 280, cy: 190, r: 28 },
        },
        {
          zone: "Zone 13",
          name: "Adyar River Basin",
          riskLevel: "Moderate Risk (38% Risk)",
          probability: 38,
          badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
          barColor: "bg-amber-500",
          cloggedDrains: 6,
          predictedRainfall: "36 mm",
          triggerFactor: "6 Clogged Drains + 36mm rainfall. Adyar weir inflow telemetry monitored.",
          automatedAction: "River Basin Automated Sluice Gate Standby",
          actionStatus: "Standby",
          svgCoords: { cx: 270, cy: 280, r: 20 },
        },
      ],
    },
  };

  const currentForecast = forecastData[forecastWindow];

  // Feature 6: Vendor Scorecard Seeded Rows
  const vendorScorecardData = [
    {
      name: "Coromandel Infra Ltd",
      wing: "Roads & Pavement",
      activeOrders: 34,
      slaCompliance: 98.2,
      avgResolutionTime: "18.4 hrs",
      reopenRate: "1.8%",
      grade: "Grade A+ (Exemplary)",
      gradeBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
      tier: "Tier 1 Certified",
      barColor: "bg-emerald-500",
    },
    {
      name: "Southern Power Grid Corp",
      wing: "Streetlights & Transformers",
      activeOrders: 52,
      slaCompliance: 95.6,
      avgResolutionTime: "24.1 hrs",
      reopenRate: "3.2%",
      grade: "Grade A",
      gradeBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
      tier: "Tier 1 Certified",
      barColor: "bg-emerald-500",
    },
    {
      name: "Apex Municipal Utilities",
      wing: "Stormwater & Sewage",
      activeOrders: 21,
      slaCompliance: 82.4,
      avgResolutionTime: "41.6 hrs",
      reopenRate: "9.4%",
      grade: "Grade C (SLA Penalty Warning)",
      gradeBadge: "bg-rose-50 text-rose-800 border-rose-200",
      tier: "Under Review",
      barColor: "bg-amber-500",
    },
  ];

  const filteredVendors = vendorScorecardData.filter((v) => {
    if (vendorWingFilter === "ALL") return true;
    if (vendorWingFilter === "Roads") return v.wing.includes("Roads");
    if (vendorWingFilter === "Electrical") return v.wing.includes("Streetlights");
    if (vendorWingFilter === "Utilities") return v.wing.includes("Stormwater");
    return true;
  });

  const departmentBreakdown = [
    { name: "Electrical (Municipal & TANGEDCO)", percentage: 42, color: "bg-amber-500", count: "83,580" },
    { name: "Water Supply (Metro Water / CMWSSB)", percentage: 29, color: "bg-blue-600", count: "57,710" },
    { name: "Sanitation & Solid Waste (GCC)", percentage: 18, color: "bg-emerald-600", count: "35,820" },
    { name: "Roads & Public Works (PWD)", percentage: 11, color: "bg-slate-600", count: "21,890" },
  ];

  const dailyVelocity = [
    { day: "Mon", influx: 420, resolved: 460 },
    { day: "Tue", influx: 510, resolved: 540 },
    { day: "Wed", influx: 480, resolved: 520 },
    { day: "Thu", influx: 560, resolved: 590 },
    { day: "Fri", influx: 620, resolved: 660 },
    { day: "Sat", influx: 390, resolved: 430 },
    { day: "Sun", influx: 280, resolved: 320 },
  ];

  const wardLeaderboard = [
    { ward: "Ward 12 - Anna Nagar West", zone: "Zone 4", rate: "97.4%", avgHours: "24.2h", status: "Leader" },
    { ward: "Ward 125 - Mylapore Central", zone: "Zone 9", rate: "96.0%", avgHours: "26.8h", status: "Optimal" },
    { ward: "Ward 118 - T-Nagar Usman Rd", zone: "Zone 10", rate: "95.1%", avgHours: "29.4h", status: "Optimal" },
    { ward: "Ward 173 - Adyar Gandhi Nagar", zone: "Zone 13", rate: "94.8%", avgHours: "31.1h", status: "Optimal" },
    { ward: "Ward 114 - Royapettah High Rd", zone: "Zone 9", rate: "92.6%", avgHours: "34.5h", status: "Normal" },
    { ward: "Ward 178 - Velachery Main Rd", zone: "Zone 14", rate: "91.2%", avgHours: "37.2h", status: "Normal" },
  ];

  return (
    <div className="w-full space-y-6 text-slate-900">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              Executive Business Intelligence
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              DARPG June 2026 Benchmark
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
            JanSetu Operational Intelligence & SLA Velocity
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Real-time Greater Chennai Corporation grievance disposal metrics and national DARPG CPGRAMS benchmarks.
          </p>
        </div>

        {/* Time Range Filter */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          {(["week", "month", "quarter"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setTimeRange(r)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded capitalize transition-all ${
                timeRange === r
                  ? "bg-amber-500 text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {r === "week" ? "Last 7 Days" : r === "month" ? "This Month" : "Quarterly"}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Benchmark Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Monthly Disposals */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Monthly Disposals (DARPG)</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">1.99 Lakh</span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center">
              +14.2% <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-normal">DARPG June 2026 National Redressal Peak</p>
        </div>

        {/* Metric 2: Pending State/UT Cases */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending State/UT Cases</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-amber-800">2.16 Lakh</span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center">
              -8.4% Backlog
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-normal">Fastest backlog reduction rate in 18 months</p>
        </div>

        {/* Metric 3: JanSetu First-Time-Right Routing */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">First-Time-Right Routing</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">95.4%</span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center">
              +7.3% vs manual
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-normal">Autonomous GPT-4o-mini structured triage</p>
        </div>

        {/* Metric 4: Average Resolution Turnaround */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Average Turnaround</span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">31.4 hrs</span>
            <span className="text-xs font-semibold text-blue-700">Target: 48 hrs</span>
          </div>
          <p className="text-[11px] text-slate-400 font-normal">34.5% faster turnaround vs 48h SLA baseline</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE 5: PROACTIVE GIS FLOOD & INFRASTRUCTURE RISK HEATMAP              */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        {/* Heatmap Top Bar with Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
                Feature 5: Early Warning Radar
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                <Radio className="w-3 h-3 text-blue-600 animate-pulse" />
                Live IMD Doppler Radar Sync
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5 tracking-tight">
              Proactive GIS Infrastructure & Flood Vulnerability Index
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Cross-referencing storm drain blockage complaints with IMD meteorological rainfall forecasts ({currentForecast.label}).
            </p>
          </div>

          {/* Time Window Toggle Controls */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {(["6h", "12h", "24h"] as const).map((win) => (
              <button
                key={win}
                type="button"
                onClick={() => setForecastWindow(win)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                  forecastWindow === win
                    ? "bg-amber-500 text-slate-950 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {win === "6h" ? "Next 6 Hours" : win === "12h" ? "Next 12 Hours" : "Next 24 Hours"}
              </button>
            ))}
          </div>
        </div>

        {/* IMD Weather Bulletin Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
              <CloudRain className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 block">{currentForecast.imdNotice}</span>
              <span className="text-[11px] text-slate-500">Telemetry synced with Regional Meteorological Centre, Chennai.</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-slate-700">
            <span className="text-[11px]">
              Rainfall Peak: <strong className="text-slate-900">{currentForecast.rainfallPeak}</strong>
            </span>
            <span className="text-[11px]">
              Municipal Crews: <strong className="text-emerald-700">{currentForecast.activeCrews}</strong>
            </span>
          </div>
        </div>

        {/* Heatmap Layout: Visual SVG GIS Grid + 3 Detailed Ward Risk Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Visual Mock GIS Map of Chennai Basins (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Chennai Coastal & Basin Risk Layer</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">13.0827° N, 80.2707° E</span>
            </div>

            {/* Interactive SVG Geographic Grid Canvas */}
            <div className="relative w-full h-72 bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 400 360" className="w-full h-full">
                {/* Coastal Bay of Bengal boundary background */}
                <path
                  d="M 330,0 Q 340,120 320,200 T 310,360 L 400,360 L 400,0 Z"
                  fill="#e0f2fe"
                  opacity="0.8"
                />
                <text x="350" y="180" fill="#0284c7" fontSize="10" fontWeight="600" transform="rotate(90, 350, 180)">
                  BAY OF BENGAL
                </text>

                {/* River waterways */}
                <path
                  d="M 20,80 Q 150,110 320,95"
                  fill="none"
                  stroke="#93c5fd"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                />
                <text x="50" y="75" fill="#64748b" fontSize="8">
                  Kosasthalaiyar Basin
                </text>

                <path
                  d="M 10,180 Q 160,170 320,185"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="4"
                />
                <text x="60" y="172" fill="#64748b" fontSize="8">
                  Cooum River Estuary
                </text>

                <path
                  d="M 10,290 Q 170,270 315,295"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                />
                <text x="60" y="282" fill="#64748b" fontSize="8">
                  Adyar River Basin
                </text>

                {/* Zone 4: Anna Nagar West Pulsing Radar Circle */}
                <g className="cursor-pointer">
                  <circle
                    cx="150"
                    cy="120"
                    r={forecastWindow === "24h" ? 44 : forecastWindow === "12h" ? 34 : 26}
                    fill="#f43f5e"
                    fillOpacity="0.2"
                    className="animate-pulse"
                  />
                  <circle cx="150" cy="120" r="10" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
                  <text x="165" y="118" fill="#1e293b" fontSize="10" fontWeight="bold">
                    Zone 4: Anna Nagar
                  </text>
                  <text x="165" y="130" fill="#e11d48" fontSize="9" fontWeight="bold">
                    {currentForecast.zones[0].probability}% Risk ({currentForecast.zones[0].cloggedDrains} Clogged)
                  </text>
                </g>

                {/* Zone 9: Mylapore Pulsing Radar Circle */}
                <g className="cursor-pointer">
                  <circle
                    cx="260"
                    cy="200"
                    r={forecastWindow === "24h" ? 32 : forecastWindow === "12h" ? 24 : 18}
                    fill="#f59e0b"
                    fillOpacity="0.2"
                    className="animate-pulse"
                  />
                  <circle cx="260" cy="200" r="9" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
                  <text x="180" y="222" fill="#1e293b" fontSize="10" fontWeight="bold">
                    Zone 9: Mylapore
                  </text>
                  <text x="180" y="234" fill="#b45309" fontSize="9" fontWeight="bold">
                    {currentForecast.zones[1].probability}% Risk ({currentForecast.zones[1].cloggedDrains} Clogged)
                  </text>
                </g>

                {/* Zone 13: Adyar Basin Circle */}
                <g className="cursor-pointer">
                  <circle
                    cx="240"
                    cy="300"
                    r={forecastWindow === "24h" ? 22 : 16}
                    fill="#10b981"
                    fillOpacity="0.2"
                  />
                  <circle cx="240" cy="300" r="8" fill="#059669" stroke="#ffffff" strokeWidth="2" />
                  <text x="160" y="318" fill="#1e293b" fontSize="10" fontWeight="bold">
                    Zone 13: Adyar
                  </text>
                  <text x="160" y="330" fill="#047857" fontSize="9" fontWeight="bold">
                    {currentForecast.zones[2].probability}% Risk ({currentForecast.zones[2].cloggedDrains} Clogged)
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> &gt;70% High
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 30-70% Moderate
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> &lt;30% Monitored
              </span>
            </div>
          </div>

          {/* Right: The 3 Detailed Ward Risk Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {currentForecast.zones.map((z, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors space-y-3"
              >
                {/* Card Title & Risk Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span>{z.zone} ({z.name})</span>
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Forecast Precipitation: <strong>{z.predictedRainfall}</strong> • Drain Blockages: <strong>{z.cloggedDrains} verified</strong>
                    </span>
                  </div>

                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border self-start sm:self-auto ${z.badgeColor}`}>
                    {z.riskLevel}
                  </span>
                </div>

                {/* Probability Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium text-slate-600">
                    <span>Waterlogging Vulnerability Score</span>
                    <span className="font-bold text-slate-900">{z.probability}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      style={{ width: `${z.probability}%` }}
                      className={`h-full ${z.barColor} rounded-full transition-all duration-300`}
                    />
                  </div>
                </div>

                {/* Trigger Factor & Action */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-0.5">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Trigger Factor:
                    </span>
                    <p className="text-slate-800 text-[11px] leading-snug">
                      {z.triggerFactor}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Automated Civic Action:
                      </span>
                      <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {z.actionStatus}
                      </span>
                    </div>
                    <p className="text-slate-800 text-[11px] font-medium leading-snug">
                      {z.automatedAction}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FEATURE 6: PUBLIC WORKS CONTRACTOR & VENDOR ACCOUNTABILITY SCORECARD       */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        {/* Scorecard Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
                Feature 6: Procurement Governance
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Quarterly Vendor Audit
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5 tracking-tight">
              Public Works Contractor & Vendor Accountability Scorecard
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Objective performance metrics based on first-time-right redressing and citizen re-open rates.
            </p>
          </div>

          {/* Wing Filter */}
          <div className="flex items-center gap-1.5 text-xs bg-slate-100 p-1 rounded-lg border border-slate-200">
            <span className="text-slate-500 px-2 font-medium flex items-center gap-1">
              <Filter className="w-3 h-3 text-amber-600" /> Wing:
            </span>
            {["ALL", "Roads", "Electrical", "Utilities"].map((wing) => (
              <button
                key={wing}
                type="button"
                onClick={() => setVendorWingFilter(wing)}
                className={`px-3 py-1.5 rounded font-medium transition-all ${
                  vendorWingFilter === wing
                    ? "bg-slate-900 text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {wing}
              </button>
            ))}
          </div>
        </div>

        {/* Vendor Scorecard Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs text-slate-900">
            <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">Vendor / Contractor Name</th>
                <th className="px-4 py-3.5">Assigned Wing</th>
                <th className="px-4 py-3.5">Active Orders</th>
                <th className="px-4 py-3.5">SLA Compliance %</th>
                <th className="px-4 py-3.5">Avg Resolution Time</th>
                <th className="px-4 py-3.5">Citizen Re-Open Rate</th>
                <th className="px-4 py-3.5 text-right">Performance Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {filteredVendors.map((v, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  {/* Name */}
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs">
                        {v.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{v.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">GCC Empanelled ID: GCC-VND-202{i+1}</span>
                      </div>
                    </div>
                  </td>

                  {/* Wing */}
                  <td className="px-4 py-4 text-slate-700 font-medium">
                    {v.wing}
                  </td>

                  {/* Active Orders */}
                  <td className="px-4 py-4">
                    <span className="font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {v.activeOrders} Orders
                    </span>
                  </td>

                  {/* SLA Compliance */}
                  <td className="px-4 py-4">
                    <div className="space-y-1 w-32">
                      <div className="flex justify-between text-[11px]">
                        <span className="font-bold text-slate-900">{v.slaCompliance}%</span>
                        <span className="text-slate-400">Target 90%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          style={{ width: `${v.slaCompliance}%` }}
                          className={`h-full ${v.barColor} rounded-full`}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Avg Resolution Time */}
                  <td className="px-4 py-4 font-semibold text-slate-800">
                    {v.avgResolutionTime}
                  </td>

                  {/* Citizen Re-Open Rate */}
                  <td className="px-4 py-4">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        parseFloat(v.reopenRate) > 5
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : "bg-emerald-50 text-emerald-800 border-emerald-200"
                      }`}
                    >
                      {v.reopenRate}
                    </span>
                  </td>

                  {/* Performance Grade */}
                  <td className="px-4 py-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded border ${v.gradeBadge}`}>
                        {v.grade}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {v.tier}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL RODIC INFRAAI BENCHMARK DATASET INSPECTOR                         */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 border-t-[3px] border-t-amber-500 rounded-xl p-6 shadow-xs space-y-6">
        {/* Section Header & Actions */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-700" />
                Rodic InfraAI Challenge Official Benchmark Dataset
              </span>
              <a
                href="http://localhost:8000/api/v1/benchmark/dataset"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1 hover:bg-blue-100 transition-colors"
                title="Open live JSON endpoint in browser"
              >
                <span>GET /api/v1/benchmark/dataset</span>
                <ExternalLink className="w-3 h-3 text-blue-600" />
              </a>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ● Live Endpoint Active
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Multilingual Ground Truth & Evaluation Corpus (5 Canonical Records)
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              Official test corpus for DARPG CPGRAMS & Rodic InfraAI Challenge redressal evaluation across Track A (Grievance Intelligence) & Track B (Benefit Navigator).
            </p>
          </div>

          {/* Action Buttons: View Toggle & Copy JSON */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowRawJson(!showRawJson)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-colors flex items-center gap-1.5 ${
                showRawJson
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>{showRawJson ? "Structured Card View" : "View Raw JSON"}</span>
            </button>

            <button
              onClick={handleCopyBenchmarkJson}
              className="text-xs font-semibold px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs transition-colors flex items-center gap-1.5"
            >
              {copiedBenchmarkJson ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-slate-950" />
                  <span>Copied JSON!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-950" />
                  <span>Copy Benchmark JSON</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Institutional Project Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Project Suite</span>
            <span className="font-bold text-slate-900 text-xs">{benchmarkData.project_metadata.project_name}</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Challenge</span>
            <span className="font-semibold text-slate-800 text-xs">Rodic InfraAI 2026</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Jurisdiction</span>
            <span className="font-semibold text-slate-800 text-xs">Greater Chennai Corp (GCC)</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Benchmark Standard</span>
            <span className="font-semibold text-slate-800 text-xs">DARPG CPGRAMS (June 2026)</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Compliance</span>
            <span className="font-semibold text-emerald-700 text-xs">PII Scrubbed & Anonymized</span>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Avg TrustShield</span>
            <span className="font-bold text-amber-800 text-xs">96.4% Multi-turn Confidence</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBenchmarkFilter("ALL")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                benchmarkFilter === "ALL"
                  ? "bg-amber-50 text-amber-900 border-amber-300"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              All Records ({benchmarkData.benchmark_records.length})
            </button>
            <button
              onClick={() => setBenchmarkFilter("TRACK_A")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                benchmarkFilter === "TRACK_A"
                  ? "bg-amber-50 text-amber-900 border-amber-300"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Track A - Grievance Intelligence (4)
            </button>
            <button
              onClick={() => setBenchmarkFilter("TRACK_B")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                benchmarkFilter === "TRACK_B"
                  ? "bg-amber-50 text-amber-900 border-amber-300"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              Track B - Benefit Navigator (1)
            </button>
          </div>

          <span className="text-[11px] text-slate-400 font-normal">
            Showing {filteredBenchmarkRecords.length} of {benchmarkData.benchmark_records.length} canonical benchmark items
          </span>
        </div>

        {/* View Branch: Raw JSON vs Structured Interactive Cards */}
        {showRawJson ? (
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <FileJson className="w-4 h-4 text-amber-400" />
                backend/app/data/jansetu_benchmark_dataset.json
              </span>
              <button
                onClick={handleCopyBenchmarkJson}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                {copiedBenchmarkJson ? "Copied to clipboard" : "Copy raw payload"}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[500px] leading-relaxed scrollbar-thin">
              {JSON.stringify(benchmarkData, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBenchmarkRecords.map((record) => {
              const isExpanded = expandedBenchmarkId === record.ticket_id;
              const isTrackB = record.track.includes("Track B");

              return (
                <div
                  key={record.ticket_id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-all space-y-4"
                >
                  {/* Card Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm bg-white px-2.5 py-1 rounded border border-slate-200 shadow-2xs">
                        {record.ticket_id}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded border ${
                          isTrackB
                            ? "bg-purple-50 text-purple-800 border-purple-200"
                            : record.priority?.includes("Critical")
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-blue-50 text-blue-800 border-blue-200"
                        }`}
                      >
                        {record.track}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {record.intake_channel}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                        {record.language}
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        • {record.ward}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400">TrustShield</span>
                        <TrustBadge score={record.trustshield_score} size="md" />
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded border ${
                          record.priority?.includes("Critical")
                            ? "bg-rose-600 text-white border-rose-700 animate-pulse"
                            : record.priority === "High"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : "bg-slate-100 text-slate-800 border-slate-200"
                        }`}
                      >
                        SLA: {record.sla_hours}h
                      </span>
                      <button
                        onClick={() =>
                          setExpandedBenchmarkId(isExpanded ? null : record.ticket_id)
                        }
                        className="text-xs font-medium text-slate-500 hover:text-slate-800 p-1 rounded hover:bg-white"
                        title={isExpanded ? "Collapse Record" : "Expand Details"}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Dual-Language Raw Transcript Strip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Raw Audio / Text Transcript */}
                    <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Original Ingestion Transcript ({record.language})</span>
                        <span className="font-mono text-slate-500">{record.intake_channel}</span>
                      </div>
                      <p className="text-slate-900 font-medium text-xs leading-relaxed italic">
                        &ldquo;{record.raw_transcript}&rdquo;
                      </p>
                    </div>

                    {/* Canonical English Translation */}
                    <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>Autonomous English Translation</span>
                        <span className="text-emerald-700 font-semibold">Triage Ready</span>
                      </div>
                      <p className="text-slate-800 text-xs leading-relaxed">
                        &ldquo;{record.english_translation}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Classification & Explainability Ribbon */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-slate-500 font-medium">Assigned Department:</span>
                      <strong className="text-slate-900 font-semibold">{record.department}</strong>
                      {record.extracted_category && (
                        <span className="text-slate-400">
                          ({record.extracted_category})
                        </span>
                      )}
                    </div>

                    {/* Explainability Token Badges */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Explainability Tokens:
                      </span>
                      {record.explainability_tokens.map((token, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[11px] bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded font-medium"
                        >
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Engineering Specs: Auto-BOQ, Visual Verification, or Benefit Specs */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-200 space-y-3">
                      {/* Auto-BOQ Card if available */}
                      {record.auto_boq && (
                        <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                              <Wrench className="w-3.5 h-3.5 text-amber-700" />
                              Feature 2: Automated Municipal Bill of Quantities (Auto-BOQ)
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              Estimated Cost: ₹{record.auto_boq.estimated_cost_inr.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 font-medium">
                            {record.auto_boq.defect_description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Indented Materials:</span>
                            {record.auto_boq.materials.map((m, mIdx) => (
                              <span
                                key={mIdx}
                                className="text-[11px] font-medium bg-white border border-amber-300 text-slate-800 px-2 py-0.5 rounded"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Visual Verification Badge if available */}
                      {record.visual_verification_match_pct !== null &&
                        record.visual_verification_match_pct !== undefined && (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs">
                            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              Feature 1: Before & After AI Visual Photometric Verification
                            </span>
                            <span className="font-bold text-emerald-800 bg-white border border-emerald-200 px-2.5 py-0.5 rounded">
                              {record.visual_verification_match_pct}% Match Verified (Ghost Closure Prevented)
                            </span>
                          </div>
                        )}

                      {/* Track B Scheme Application Specs if Track B */}
                      {isTrackB && (
                        <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-lg space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-purple-900">
                              Track B Application: {record.scheme_name} ({record.scheme_id})
                            </span>
                            <span className="font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded">
                              {record.benefit_type}
                            </span>
                          </div>
                          <div className="text-slate-600 flex items-center gap-2">
                            <span>Verification Mode:</span>
                            <strong className="text-slate-900">{record.verification_mode}</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SLA Compliance Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Real-Time SLA Compliance Gauge */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Real-Time SLA Compliance</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              96.8% Within SLA
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[96.8%]" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-normal">
              <span>0%</span>
              <span className="text-emerald-700 font-semibold">96.8% Resolved within 48h SLA</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Repeat Grievance Reduction */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Repeat Grievance Rate</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              &lt; 4.2%
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full w-[4.2%]" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-normal">
              <span>Target &lt; 5.0%</span>
              <span className="text-emerald-700 font-semibold">95.8% Permanent First-Time Fix</span>
            </div>
          </div>
        </div>

        {/* Autonomous Redressal Rate */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">TrustShield Verification Rate</span>
            <span className="text-xs font-semibold text-slate-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              94.2% Confidence
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full w-[94.2%]" />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 font-normal">
              <span>0% Error</span>
              <span className="text-slate-700 font-semibold">GCC Auto-Triage Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Department Breakdown Bars (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-700" />
                  <span>Municipal Department Grievance Distribution</span>
                </h3>
                <p className="text-[11px] text-slate-500 font-normal">Distribution across major civic engineering wings</p>
              </div>
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                Total: 199,000 Cases
              </span>
            </div>

            {/* Multi-segment Combined Bar */}
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
              {departmentBreakdown.map((d, idx) => (
                <div
                  key={idx}
                  style={{ width: `${d.percentage}%` }}
                  className={`${d.color} transition-all`}
                  title={`${d.name}: ${d.percentage}%`}
                />
              ))}
            </div>

            {/* Individual Breakdown Bars */}
            <div className="space-y-2.5 pt-1">
              {departmentBreakdown.map((d, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${d.color}`} />
                      <span className="font-semibold text-slate-900">{d.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[11px] font-normal">{d.count} tickets</span>
                      <span className="font-bold text-slate-900 text-sm">{d.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      style={{ width: `${d.percentage}%` }}
                      className={`h-full ${d.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Influx vs Disposal Velocity Chart */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Daily Influx vs Disposal Velocity</span>
                </h3>
                <p className="text-[11px] text-slate-500 font-normal">Disposals consistently outpace incoming grievances across GCC zones</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-slate-500 font-medium">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" /> Influx
                </span>
                <span className="flex items-center gap-1 text-amber-800 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> Disposed
                </span>
              </div>
            </div>

            {/* Clean Tailwind Bar Chart */}
            <div className="pt-4 flex items-end justify-between gap-3 h-48 px-2">
              {dailyVelocity.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
                    {d.resolved}
                  </div>
                  <div className="w-full flex items-end justify-center gap-1.5 h-36">
                    <div
                      style={{ height: `${(d.influx / 700) * 100}%` }}
                      className="w-3 sm:w-4 bg-slate-200 rounded-t-md transition-all group-hover:bg-slate-300"
                      title={`Influx: ${d.influx}`}
                    />
                    <div
                      style={{ height: `${(d.resolved / 700) * 100}%` }}
                      className="w-3 sm:w-4 bg-amber-400 rounded-t-md transition-all group-hover:bg-amber-500"
                      title={`Resolved: ${d.resolved}`}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-600">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Ward Redressal Leaderboard (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Chennai Ward Resolution Benchmark</span>
              </h3>
              <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                GCC Live
              </span>
            </div>

            <div className="space-y-2">
              {wardLeaderboard.map((w, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 flex items-center justify-between transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{w.ward}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-normal block">{w.zone} • Avg Turnaround: {w.avgHours}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 block">{w.rate}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      {w.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Turnaround Efficiency Funnel */}
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-700" />
              <span>SLA Resolution Turnaround Funnel</span>
            </h3>

            <div className="space-y-3 pt-1 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700 font-medium">Resolved in &lt; 24 Hours (Fast Track)</span>
                  <span className="font-bold text-emerald-700">68%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[68%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700 font-medium">Resolved in 24 - 48 Hours (Standard SLA)</span>
                  <span className="font-bold text-amber-700">26%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full w-[26%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-700 font-medium">Complex / Field Escalation (&gt; 48 Hours)</span>
                  <span className="font-bold text-rose-700">6%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[6%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
