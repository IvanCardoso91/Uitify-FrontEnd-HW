import { useEffect, useState } from "react";
import LeadTable from "@/components/LeadTable";
import LeadDetailPanel from "@/components/LeadDetailPanel";
import OpportunityTable from "@/components/OpportunityTable";
import type { Lead } from "@/types/lead";
import type { Opportunity } from "@/types/opportunity";
import seedLeads from "@/data/leads.json";
import { simulate } from "@/utils/fakeApi";


export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<Lead | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  // Load leads from local JSON + simulate latency
  async function load() {
    setLoading(true);
    setError(null);
    try {
      await simulate(null, 600, 0); // only latency for the first load
      setLeads((seedLeads as Lead[]) ?? []);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Optimistic update (email/status)
 async function updateLead(patch: {
   id: string;
   email?: string;
   status?: Lead["status"];
 }) {
   const previousLeads = leads;

   setLeads((currentLeads) =>
     currentLeads.map((lead) =>
       lead.id === patch.id ? { ...lead, ...patch } : lead
     )
   );

   try {
     await simulate(true, 600, 0.12); // 12% of fail in "request"
   } catch (error) {
     setLeads(previousLeads); // rollback
     throw error;
   }
 }

  function handleConvert(op: Opportunity) {
    setOpportunities((prev) => [op, ...prev]);
  }

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Lead Triage Console</h1>
          <p className="text-sm text-black">
            Leads: <span className="tabular-nums">{leads.length}</span> •
            Opportunities:{" "}
            <span className="tabular-nums">{opportunities.length}</span>
          </p>
        </div>
        <button
          onClick={() => load()}
          className="text-sm text-white cursor-pointer rounded-lg px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          Reload data
        </button>
      </header>

      <section className="space-y-6">
        <LeadTable
          leads={leads}
          loading={loading}
          error={error}
          onRetry={load}
          onSelect={(lead) => setSelected(lead)}
        />

        <LeadDetailPanel
          lead={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
          onSave={updateLead}
          onConvert={handleConvert}
        />

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Opportunities</h2>
          <OpportunityTable opportunities={opportunities} />
        </div>
      </section>
    </main>
  );
}
