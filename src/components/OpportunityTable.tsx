import BaseEmpty from "@/components/base/BaseEmpty";
import type { Opportunity } from "@/types/opportunity";
import { stageBadgeClass } from "@/utils/constants";

type Props = { opportunities: Opportunity[] };

export default function OpportunityTable({ opportunities }: Props) {
  if (!opportunities?.length) {
    return (
      <BaseEmpty
        title="No opportunities yet"
        description="Convert a lead to create an opportunity."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-300 bg-gray-100">
      <table className="min-w-full text-sm text-gray-900">
        <thead className="bg-green-600 text-white text-left text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Stage</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Account</th>
            <th className="px-4 py-3">From Lead</th>
          </tr>
        </thead>

        <tbody>
          {opportunities.map((opportunities) => (
            <tr
              key={opportunities.id}
              className="border-t border-gray-200 even:bg-gray-50 hover:bg-gray-200"
            >
              <td className="px-4 py-3 tabular-nums">{opportunities.id}</td>
              <td className="px-4 py-3 font-semibold">{opportunities.name}</td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${stageBadgeClass(
                    opportunities.stage
                  )}`}
                >
                  {opportunities.stage}
                </span>
              </td>

              <td className="px-4 py-3">
                {opportunities.amount != null
                  ? Intl.NumberFormat(undefined, {
                      style: "currency",
                      currency: "USD",
                    }).format(opportunities.amount)
                  : "—"}
              </td>
              <td className="px-4 py-3">{opportunities.accountName}</td>
              <td className="px-4 py-3">{opportunities.fromLeadId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
