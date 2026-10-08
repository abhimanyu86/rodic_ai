export type LanguageCode = "te-IN" | "hi-IN" | "en-IN" | "ta-IN";
export type PriorityType = "Low" | "Medium" | "High" | "Critical";
export type IntentType = "grievance" | "benefit_inquiry" | "general";

export interface LocationData {
  area?: string;
  city?: string;
  ward?: string;
  lat?: number;
  lng?: number;
}

export interface JanSetuExtraction {
  intent: IntentType;
  category: string;
  department: string;
  issue_summary: string;
  priority: PriorityType;
  confidence_score: number;
  missing_entities: string[];
  location: LocationData;
}

export interface TimelineItem {
  status: string;
  timestamp: string;
  desc: string;
  actor?: string;
}

export interface Ticket {
  ticket_id: string;
  category: string;
  department: string;
  issue: string;
  priority: PriorityType;
  confidence: number;
  status: string;
  citizen_name?: string;
  citizen_phone?: string;
  assigned_officer?: string;
  raw_transcript?: string;
  translated_text?: string;
  language?: string;
  trustshield_rationale?: string;
  location?: LocationData;
  created_at: string;
  sla_deadline: string;
  sla_remaining_hours: number;
  timeline: TimelineItem[];
  verification_status?: string;
  voice_callback_audit?: {
    call_timestamp: string;
    ivr_dialog: string;
    citizen_response: string;
    confidence: number;
    permanent_status: string;
    duration?: string;
  };
}

export interface PublicScheme {
  scheme_id: string;
  name: string;
  department: string;
  benefit_summary: string;
  subsidy_amount: string;
  eligibility: string;
  application_portal: string;
  icon_type: string;
}

export interface SchemeInquiryRequest {
  income_bracket: string;
  setting: string;
  category?: string;
}

export interface BenchmarkRecord {
  ticket_id: string;
  track: string;
  intake_channel: string;
  language: string;
  raw_transcript?: string;
  english_translation?: string;
  extracted_category?: string;
  scheme_id?: string;
  scheme_name?: string;
  benefit_type?: string;
  verification_mode?: string;
  department: string;
  ward: string;
  priority?: string;
  sla_hours: number;
  trustshield_score: number;
  explainability_tokens: string[];
  status: string;
  visual_verification_match_pct?: number | null;
  auto_boq?: {
    defect_description: string;
    estimated_cost_inr: number;
    materials: string[];
  } | null;
}

export interface BenchmarkDataset {
  project_metadata: {
    project_name: string;
    challenge: string;
    jurisdiction: string;
    benchmark_standards: string;
    synthetic_data_compliance: string;
    total_records: number;
  };
  benchmark_records: BenchmarkRecord[];
}

export interface BenchmarkSummary {
  metadata: BenchmarkDataset["project_metadata"];
  total_records: number;
  track_distribution: Record<string, number>;
  languages: string[];
  average_trustshield_score: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api/v1";

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`API Error ${res.status}: ${errorBody}`);
  }
  return res.json();
}

export const api = {
  async processIntent(text: string): Promise<JanSetuExtraction> {
    return fetchJson<JanSetuExtraction>("/ai/process-intent", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
  },

  async getSchemes(): Promise<PublicScheme[]> {
    return fetchJson<PublicScheme[]>("/ai/schemes");
  },

  async recommendSchemes(req: SchemeInquiryRequest): Promise<PublicScheme[]> {
    return fetchJson<PublicScheme[]>("/ai/schemes/recommend", {
      method: "POST",
      body: JSON.stringify(req),
    });
  },

  async getTickets(): Promise<Ticket[]> {
    return fetchJson<Ticket[]>("/tickets");
  },

  async getTicket(ticketId: string): Promise<Ticket> {
    return fetchJson<Ticket>(`/tickets/${ticketId}`);
  },

  async createTicket(ticket: {
    category: string;
    department: string;
    issue_summary: string;
    priority: PriorityType;
    confidence_score: number;
    raw_transcript?: string;
    translated_text?: string;
    language?: string;
    location?: LocationData;
    citizen_name?: string;
    citizen_phone?: string;
  }): Promise<Ticket> {
    return fetchJson<Ticket>("/tickets", {
      method: "POST",
      body: JSON.stringify(ticket),
    });
  },

  async actionTicket(
    ticketId: string,
    action: {
      status: string;
      note?: string;
      department?: string;
      assigned_officer?: string;
    }
  ): Promise<Ticket> {
    return fetchJson<Ticket>(`/tickets/${ticketId}/action`, {
      method: "PATCH",
      body: JSON.stringify(action),
    });
  },

  async getBenchmarkDataset(): Promise<BenchmarkDataset> {
    return fetchJson<BenchmarkDataset>("/benchmark/dataset");
  },

  async getBenchmarkSummary(): Promise<BenchmarkSummary> {
    return fetchJson<BenchmarkSummary>("/benchmark/dataset/summary");
  },
};
