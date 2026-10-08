"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, UserCheck, BarChart3, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/citizen", label: "Citizen Portal", icon: Users },
    { href: "/officer", label: "Officer Workspace", icon: UserCheck },
    { href: "/analytics", label: "Executive BI", icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs h-16 w-full">
      <div className="w-full px-6 h-full flex items-center justify-between gap-4">
        {/* Left: Logo & Subtitle */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs group-hover:bg-amber-100 transition-colors">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Jan<span className="text-amber-600">Setu</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                Enterprise v2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-tight">
              Rodic InfraAI Civic Redressal Suite | Autonomous Citizen Access & Grievance Orchestration
            </p>
          </div>
        </Link>

        {/* Center: 3 Segmented Pill Links */}
        <nav className="flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200 gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-all ${
                  isActive
                    ? "bg-amber-50 text-amber-950 border border-amber-300 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-700" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right: GCC Node Status Pill */}
        <div className="hidden lg:flex items-center shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>GCC Chennai Node Active</span>
            <span className="text-slate-300">|</span>
            <span className="text-amber-800 font-semibold">TrustShield 94.2% Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}
