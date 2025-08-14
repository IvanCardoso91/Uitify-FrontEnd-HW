import { useEffect, useMemo, useState } from "react";
import BaseSlideOver from "@/components/base/BaseSlideOver";
import BaseInput from "@/components/base/BaseInput";
import BaseSelect from "@/components/base/BaseSelect";
import BaseButton from "@/components/base/BaseButton";
import BaseErrorState from "@/components/base/BaseErrorState";
import type { Lead, LeadStatus } from "@/types/lead";
import type { Opportunity, OpportunityStage } from "@/types/opportunity";
import { LEAD_STATUS_OPTIONS, STAGE_OPTIONS } from "@/utils/constants";
import { isValidEmail } from '@/utils/email'

type Props = {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  onSave: (patch: {
    id: string;
    email: string;
    status: LeadStatus;
  }) => Promise<void> | void;
  onConvert: (opportunity: Opportunity) => void;
};

export default function LeadDetailPanel({
  lead,
  open,
  onClose,
  onSave,
  onConvert,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<LeadStatus>("new");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Opportunity form
  const [stage, setStage] = useState<OpportunityStage>("New");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    if (lead) {
      setEmail(lead.email);
      setStatus(lead.status);
      setStage("New");
      setAmount("");
      setError(null);
      setSaving(false);
    }
  }, [lead, open]);

  const disabled = useMemo(() => !lead || !isValidEmail(email), [lead, email]);

  async function handleSave() {
    if (!lead) return;
    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave({ id: lead.id, email, status });
      onClose();
    } catch (e: any) {
      setError(e?.message ?? "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  function handleConvert() {
    if (!lead) return;
    const amt = amount.trim() === "" ? undefined : Number(amount);
    const opportunity: Opportunity = {
      id: `O-${Date.now()}`,
      name: lead.name,
      stage,
      amount: Number.isFinite(amt!) ? amt : undefined,
      accountName: lead.company,
      fromLeadId: lead.id,
    };
    onConvert(opportunity);
  }

  return (
    <BaseSlideOver
      open={open}
      onClose={onClose}
      title={lead ? `${lead.name}` : "Lead Details"}
    >
      {!lead ? (
        <BaseErrorState message="Select a lead from the table." />
      ) : (
        <div className="space-y-6">
          <section className="space-y-2">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">ID:</span> {lead.id}
              </div>
              <div>
                <span className="text-gray-500">Company:</span> {lead.company}
              </div>
              <div>
                <span className="text-gray-500">Source:</span> {lead.source}
              </div>
              <div>
                <span className="text-gray-500">Score:</span> {lead.score}
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <label className="block text-xs font-medium">Email</label>
            <BaseInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
            {!isValidEmail(email) && (
              <p className="text-xs text-red-600">Invalid email format</p>
            )}
          </section>

          <section className="space-y-3">
            <label className="block text-xs font-medium">Status</label>
            <BaseSelect
              value={status}
              options={
                LEAD_STATUS_OPTIONS.filter(
                  (optionStatus) => optionStatus.value !== ""
                ) as any
              }
              onChangeValue={(statusValue) => setStatus(statusValue as any)}
            />
          </section>

          {error && <BaseErrorState message={error} />}

          <div className="flex items-center gap-3">
            <BaseButton
              onClick={handleSave}
              disabled={disabled || saving}
              className="bg-green-600 hover:bg-green-700"
            >
              {saving ? "Saving…" : "Save"}
            </BaseButton>

            <BaseButton
              onClick={onClose}
              className="bg-yellow-400 text-black hover:bg-yellow-500"
            >
              Cancel
            </BaseButton>
          </div>

          <hr className="border-gray-300" />

          <section className="space-y-3">
            <div className="text-sm font-semibold">Convert to Opportunity</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium">Stage</label>
                <BaseSelect
                  value={stage}
                  options={STAGE_OPTIONS}
                  onChangeValue={(stageValue) => setStage(stageValue as any)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium">
                  Amount (optional)
                </label>
                <BaseInput
                  type="number"
                  inputMode="decimal"
                  min={0}
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <BaseButton onClick={handleConvert}>Convert Lead</BaseButton>
          </section>
        </div>
      )}
    </BaseSlideOver>
  );
}
