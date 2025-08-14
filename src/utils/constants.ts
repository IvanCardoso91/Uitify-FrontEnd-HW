import type { LeadStatus } from "@/types/lead";
import type { OpportunityStage } from "@/types/opportunity";

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "unqualified",
];

export const LEAD_STATUS_OPTIONS: { label: string; value: "" | LeadStatus }[] =
  [
    { label: "All statuses", value: "" },
    ...LEAD_STATUSES.map((s) => ({ label: s, value: s })),
  ];

export const STAGE_OPTIONS: {
  label: OpportunityStage;
  value: OpportunityStage;
}[] = [
  { label: "New", value: "New" },
  { label: "Qualification", value: "Qualification" },
  { label: "Proposal", value: "Proposal" },
  { label: "Closed Won", value: "Closed Won" },
  { label: "Closed Lost", value: "Closed Lost" },
];

export const statusBadgeClass = (status: LeadStatus) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "contacted":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "qualified":
      return "bg-green-100 text-green-800 border-green-200";
    case "unqualified":
      return "bg-gray-200 text-gray-800 border-gray-300";
  }
};

export const stageBadgeClass = (stage: OpportunityStage) => {
  switch (stage) {
    case "New":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Qualification":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Proposal":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Closed Won":
      return "bg-green-100 text-green-800 border-green-200";
    case "Closed Lost":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
