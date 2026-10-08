"use client";

import React from "react";
import { TimelineItem } from "@/lib/api";
import { CheckCircle2, Clock, Cpu, Truck, UserCheck, FileCheck2 } from "lucide-react";

interface TicketTimelineProps {
  events: TimelineItem[];
  currentStatus?: string;
}

export const TicketTimeline: React.FC<TicketTimelineProps> = ({
  events = [],
  currentStatus = "Submitted",
}) => {
  if (!events || events.length === 0) {
    return (
      <div className="py-4 text-center text-slate-400 text-xs">
        No timeline events recorded yet.
      </div>
    );
  }

  return (
    <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
      {events.map((ev, index) => {
        const isLatest = index === 0;
        return (
          <div key={index} className="relative group text-xs">
            <div
              className={`absolute -left-6 top-0.5 flex items-center justify-center w-5 h-5 rounded-full border-2 bg-white shadow-sm transition-all ${
                isLatest
                  ? "border-emerald-500 ring-4 ring-emerald-50 scale-110"
                  : "border-slate-300"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>

            <div
              className={`p-3 rounded-2xl border transition-all ${
                isLatest
                  ? "bg-emerald-50/50 border-emerald-200 shadow-sm"
                  : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-bold text-slate-900">{ev.status}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {ev.timestamp}
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">{ev.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketTimeline;
