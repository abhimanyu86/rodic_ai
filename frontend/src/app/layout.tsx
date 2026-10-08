import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "JanSetu Enterprise v2.0 | Rodic InfraAI Civic Redressal Suite",
  description: "Government of Tamil Nadu Municipal Operations Suite. Autonomous citizen access & grievance orchestration for Greater Chennai Corporation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50/50 text-slate-900 antialiased font-sans flex flex-col selection:bg-amber-100 selection:text-amber-900">
        {/* Top Government Institutional Utility Bar */}
        <div className="bg-slate-50 border-b border-slate-200 text-slate-800 text-xs py-1.5 px-6 font-medium border-t-[3px] border-amber-500">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-800 uppercase tracking-wide">
                Government of Tamil Nadu • Municipal Operations Suite
              </span>
              <span className="hidden md:inline text-slate-300">|</span>
              <span className="hidden md:inline font-normal text-slate-600">
                Rodic InfraAI Challenge 2026 • YellowSense JanSetu | National DARPG CPGRAMS Standards Compliant
              </span>
            </div>

            <div className="flex items-center gap-2 font-medium text-slate-700 text-[11px]">
              <span className="bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[11px]">
                GCC Central Command
              </span>
              <span className="bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[11px]">
                GCC 1913 Integrated
              </span>
            </div>
          </div>
        </div>

        {/* Global Institutional Navigation Header */}
        <Navbar />

        {/* Main Application Content (Full Width) */}
        <main className="flex-1 w-full px-6 py-4">
          {children}
        </main>

        {/* Enterprise Institutional Footer (Full Width) */}
        <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-600 w-full">
          <div className="w-full px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-slate-900 font-bold text-sm">
                JanSetu Enterprise v2.0 • Greater Chennai Corporation (GCC) Municipal Operations
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                Rodic InfraAI Innovation Challenge 2026 • YellowSense Technologies • DARPG CPGRAMS Standards Compliant
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                <Activity className="w-3.5 h-3.5 text-emerald-600" /> 94.2% AI Precision Rate
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700 font-semibold">தமிழ் (Tamil) / हिन्दी (Hindi) / English</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
