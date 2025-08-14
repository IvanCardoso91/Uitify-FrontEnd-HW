import { useMemo, useState } from "react";
import BaseInput from "@/components/base/BaseInput";
import BaseSelect from "@/components/base/BaseSelect";
import BaseSpinner from "@/components/base/BaseSpinner";
import BaseEmpty from "@/components/base/BaseEmpty";
import BaseErrorState from "@/components/base/BaseErrorState";
import type { Lead } from "@/types/lead";
import { LEAD_STATUS_OPTIONS, statusBadgeClass } from "@/utils/constants";

type Props = {
  leads: Lead[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onSelect: (lead: Lead) => void;
};

export default function LeadTable({
  leads,
  loading,
  error,
  onRetry,
  onSelect,
}: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const view = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = leads;
    if (q)
      arr = arr.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q)
      );
    if (status) arr = arr.filter((l) => l.status === status);
    return [...arr].sort((a, b) => b.score - a.score); // score desc
  }, [leads, query, status]);

  if (loading)
    return (
      <div className="p-6">
        <BaseSpinner label="Loading leads…" />
      </div>
    );
  if (error)
    return (
      <div className="p-6">
        <BaseErrorState message={error} onRetry={onRetry} />
      </div>
    );
  if (!leads?.length)
    return (
      <div className="p-6">
        <BaseEmpty title="No leads" description="Check your local JSON file." />
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full sm:w-72">
          <BaseInput
            placeholder="Search by name or company…"
            value={query}
            onChange={(eventQuery) => setQuery(eventQuery.target.value)}
            aria-label="Search leads"
          />
        </div>
        <div className="w-44">
          <BaseSelect
            value={status}
            options={LEAD_STATUS_OPTIONS}
            onChangeValue={(statusValue) => setStatus(statusValue)}
          />
        </div>
        <div className="text-xs text-gray-500">Sorted by score (desc)</div>
      </div>

      {view.length === 0 ? (
        <BaseEmpty title="No results" description="Adjust search or filter." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-300 bg-gray-100">
          <table className="min-w-full text-sm text-gray-900">
            <thead className="bg-blue-600 text-white text-left text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {view.map((leads) => (
                <tr
                  key={leads.id}
                  className="cursor-pointer border-t border-gray-200 even:bg-gray-50 hover:bg-gray-200"
                  onClick={() => onSelect(leads)}
                >
                  <td className="px-4 py-3 font-semibold">{leads.name}</td>
                  <td className="px-4 py-3">{leads.company}</td>
                  <td className="px-4 py-3">{leads.email}</td>
                  <td className="px-4 py-3">{leads.source}</td>
                  <td className="px-4 py-3 tabular-nums">{leads.score}</td>
                  <td className="px-3 sm:px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(
                        leads.status
                      )}`}
                    >
                      {leads.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
