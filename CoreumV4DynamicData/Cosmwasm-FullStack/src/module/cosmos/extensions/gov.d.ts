import { ProposalStatus } from "../gov/v1beta1/gov";
import { PageRequest } from "../gov/v1beta1/pagination";
import { QueryClient } from "@cosmjs/stargate";
export declare function setupGovExtension(base: QueryClient): {
    gov: {
        params: (parametersType: "deposit" | "tallying" | "voting") => Promise<{
            votingParams: import("../gov/v1beta1/gov").VotingParams;
            depositParams: import("../gov/v1beta1/gov").DepositParams;
            tallyParams: import("../gov/v1beta1/gov").TallyParams;
        }>;
        proposals: (proposalStatus: ProposalStatus, depositor: string, voter: string, pagination?: PageRequest) => Promise<{
            proposals: import("../gov/v1beta1/gov").Proposal[];
            pagination: import("../gov/v1beta1/pagination").PageResponse;
        }>;
        proposal: (proposal_id: number) => Promise<{
            proposal: import("../gov/v1beta1/gov").Proposal;
        }>;
        deposits: (proposal_id: number, pagination?: PageRequest) => Promise<{
            deposits: import("../gov/v1beta1/gov").Deposit[];
            pagination: import("../gov/v1beta1/pagination").PageResponse;
        }>;
        deposit: (proposal_id: number, depositor: string) => Promise<{
            deposit: import("../gov/v1beta1/gov").Deposit;
        }>;
        tally: (proposal_id: number) => Promise<{
            tally: import("../gov/v1beta1/gov").TallyResult;
        }>;
        votes: (proposal_id: number, pagination?: PageRequest) => Promise<{
            votes: import("../gov/v1beta1/gov").Vote[];
            pagination: import("../gov/v1beta1/pagination").PageResponse;
        }>;
        vote: (proposal_id: number, voter: string) => Promise<{
            vote: import("../gov/v1beta1/gov").Vote;
        }>;
    };
};
