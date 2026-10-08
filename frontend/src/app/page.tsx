"use client";

import Link from "next/link";
import {
  Mic,
  ShieldCheck,
  Zap,
  Truck,
  ArrowRight,
  CheckCircle,
  Building2,
  Sparkles,
  BarChart3,
  Users,
  Compass,
  Cpu,
  Clock,
} from "lucide-react";
import TrustBadge from "@/components/TrustBadge";

export default function HomePage() {
  return (
    <div className="w-full space-y-8 py-4 text-slate-900">
      {/* Hero Section */}
      <div className="text-center max-w-5xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Government of Tamil Nadu • Greater Chennai Corporation (GCC) • Rodic InfraAI 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          JanSetu Enterprise v2.0 |{" "}
          <span className="text-amber-700 underline decoration-amber-400 decoration-3 underline-offset-8">
            Grievance Orchestration
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
          Empowering citizens with native voice intake in <strong>தமிழ் (Tamil)</strong>, <strong>हिन्दी (Hindi)</strong>, and <strong>English</strong>.
          Accelerating municipal response across Greater Chennai Corporation zones with automated <strong>GPT-4o-mini structured triage</strong>, <strong>Ward 12 Anna Nagar incident radar</strong>, and <strong>TANGEDCO / GCC contractor dispatch</strong>.
        </p>

        {/* 3 Core CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Link
            href="/citizen"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs sm:text-sm shadow-xs transition-all hover:scale-[1.02]"
          >
            <Mic className="w-4 h-4 text-slate-950" />
            <span>Citizen Portal (Tamil Voice / Chat)</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>

          <Link
            href="/officer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all hover:scale-[1.02]"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Officer Command Deck</span>
          </Link>

          <Link
            href="/analytics"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-xs sm:text-sm transition-all hover:scale-[1.02] shadow-xs"
          >
            <BarChart3 className="w-4 h-4 text-slate-700" />
            <span>Executive BI Dashboard</span>
          </Link>
        </div>
      </div>

      {/* 3 Core Pillars Grid (Full Width) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4">
        <Link
          href="/citizen"
          className="bg-white p-6 rounded-xl border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-sm transition-all group space-y-3"
        >
          <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
            <Mic className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-base text-slate-900">1. Citizen Multilingual Intake</h3>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            Record voice complaints in Tamil (ta-IN), Hindi (hi-IN), or English. Web Speech API transcribes regional dialects and maps them to GCC and TANGEDCO municipal service codes within seconds.
          </p>
          <div className="pt-2 flex items-center text-xs font-semibold text-amber-800 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Launch Citizen Voice</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
          </div>
        </Link>

        <Link
          href="/officer"
          className="bg-white p-6 rounded-xl border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-sm transition-all group space-y-3"
        >
          <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5 text-amber-700" />
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">2. Officer Command Deck</h3>
            <TrustBadge score={0.96} size="sm" showLabel={false} />
          </div>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            Full-width triage queue with Anna Nagar, T-Nagar, and Mylapore cases, 1-click batch accept, regional speech waveform replay, and GCC municipal dispatch notes.
          </p>
          <div className="pt-2 flex items-center text-xs font-semibold text-amber-800 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Open Triage Deck</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
          </div>
        </Link>

        <Link
          href="/analytics"
          className="bg-white p-6 rounded-xl border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-sm transition-all group space-y-3"
        >
          <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-base text-slate-900">3. Executive GCC Telemetry</h3>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            Live GCC 1913 and DARPG CPGRAMS benchmarks, 95.4% first-time routing accuracy, Chennai ward leaderboards (Anna Nagar, Mylapore, T-Nagar), and SLA compliance.
          </p>
          <div className="pt-2 flex items-center text-xs font-semibold text-amber-800 gap-1 group-hover:translate-x-1 transition-transform">
            <span>View GCC Analytics</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
          </div>
        </Link>
      </div>

      {/* Enterprise Institutional Architecture Specs Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-[11px] uppercase tracking-wider text-slate-700 font-semibold bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
              Rodic InfraAI Innovation Challenge 2026
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Sovereign AI Grievance Orchestration for Municipal Operations
            </h2>
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Designed by YellowSense Technologies for the Rodic InfraAI Challenge. Powered by structured zero-hallucination schemas, automated 48-hour SLA timers, and GIS duplicate ticket conflict detection across Greater Chennai Corporation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs w-full lg:w-auto">
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-slate-400 font-medium block text-[10px] uppercase">AI Model</span>
              <span className="font-semibold text-slate-900">OpenAI GPT-4o-mini</span>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Languages</span>
              <span className="font-semibold text-slate-900">Tamil (தமிழ்), Hindi, English</span>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Confidence Engine</span>
              <span className="font-semibold text-emerald-700">TrustShield 94.2%</span>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
              <span className="text-slate-400 font-medium block text-[10px] uppercase">Jurisdiction</span>
              <span className="font-semibold text-slate-900">Govt of Tamil Nadu (GCC)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
