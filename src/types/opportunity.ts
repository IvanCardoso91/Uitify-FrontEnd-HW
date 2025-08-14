export type OpportunityStage =
  | "New"
  | "Qualification"
  | "Proposal"
  | "Closed Won"
  | "Closed Lost";

export interface Opportunity {
  id: string;
  name: string;
  stage: OpportunityStage;
  amount?: number;
  accountName: string;
  fromLeadId: string;
}
