"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, Shield } from "lucide-react";

interface TrustBadgeProps {
  score: number; // 0.0 to 1.0 or 0 to 100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  score,
  size = "md",
  showLabel = true,
}) => {
  // Normalize score between 0 and 100
  const normalized = score <= 1.0 ? Math.round(score * 100) : Math.round(score);

  let badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
  let ringColor = "text-emerald-600";
  let Icon = ShieldCheck;

  if (normalized < 70) {
    badgeColor = "bg-rose-50 text-rose-800 border-rose-200";
    ringColor = "text-rose-600";
    Icon = ShieldAlert;
  } else if (normalized < 85) {
    badgeColor = "bg-amber-50 text-amber-900 border-amber-200";
    ringColor = "text-amber-600";
    Icon = Shield;
  }

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs gap-1 font-semibold rounded-full",
    md: "px-3 py-1 text-xs gap-1.5 font-semibold rounded-full",
    lg: "px-3.5 py-1.5 text-sm gap-2 font-semibold rounded-full",
  };

  const iconSizes = {
    sm: 13,
    md: 15,
    lg: 17,
  };

  return (
    <div
      className={`inline-flex items-center border shadow-xs ${badgeColor} ${sizeClasses[size]}`}
      title={`TrustShield AI Confidence: ${normalized}%`}
    >
      <Icon size={iconSizes[size]} className={ringColor} />
      <span>{normalized}%</span>
      {showLabel && <span className="font-semibold">TrustShield</span>}
    </div>
  );
};

export default TrustBadge;
