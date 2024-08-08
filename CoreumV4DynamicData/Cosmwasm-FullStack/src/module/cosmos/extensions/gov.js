import { QueryClientImpl } from "../gov/v1beta1/query";
import { createProtobufRpcClient } from "@cosmjs/stargate";
export function setupGovExtension(base) {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        gov: {
            params: async (parametersType) => {
                const response = await queryService.Params({
                    paramsType: parametersType,
                });
                return {
                    ...response,
                };
            },
            proposals: async (proposalStatus, depositor, voter, pagination) => {
                const response = await queryService.Proposals({
                    proposalStatus,
                    depositor,
                    voter,
                    pagination,
                });
                return {
                    ...response,
                };
            },
            proposal: async (proposal_id) => {
                const response = await queryService.Proposal({
                    proposalId: proposal_id,
                });
                return { ...response };
            },
            deposits: async (proposal_id, pagination) => {
                const response = await queryService.Deposits({
                    proposalId: proposal_id,
                    pagination,
                });
                return {
                    ...response,
                };
            },
            deposit: async (proposal_id, depositor) => {
                const response = await queryService.Deposit({
                    proposalId: proposal_id,
                    depositor,
                });
                return { ...response };
            },
            tally: async (proposal_id) => {
                const response = await queryService.TallyResult({
                    proposalId: proposal_id,
                });
                return { ...response };
            },
            votes: async (proposal_id, pagination) => {
                const response = await queryService.Votes({
                    proposalId: proposal_id,
                    pagination,
                });
                return { ...response };
            },
            vote: async (proposal_id, voter) => {
                const response = await queryService.Vote({
                    proposalId: proposal_id,
                    voter,
                });
                return { ...response };
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ292LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nvc21vcy9leHRlbnNpb25zL2dvdi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFlLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFeEUsTUFBTSxVQUFVLGlCQUFpQixDQUFDLElBQWlCO0lBQ2pELE1BQU0sR0FBRyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLE9BQU87UUFDTCxHQUFHLEVBQUU7WUFDSCxNQUFNLEVBQUUsS0FBSyxFQUFFLGNBQWlELEVBQUUsRUFBRTtnQkFDbEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDO29CQUN6QyxVQUFVLEVBQUUsY0FBYztpQkFDM0IsQ0FBQyxDQUFDO2dCQUVILE9BQU87b0JBQ0wsR0FBRyxRQUFRO2lCQUNaLENBQUM7WUFDSixDQUFDO1lBQ0QsU0FBUyxFQUFFLEtBQUssRUFDZCxjQUE4QixFQUM5QixTQUFpQixFQUNqQixLQUFhLEVBQ2IsVUFBd0IsRUFDeEIsRUFBRTtnQkFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLFlBQVksQ0FBQyxTQUFTLENBQUM7b0JBQzVDLGNBQWM7b0JBQ2QsU0FBUztvQkFDVCxLQUFLO29CQUNMLFVBQVU7aUJBQ1gsQ0FBQyxDQUFDO2dCQUVILE9BQU87b0JBQ0wsR0FBRyxRQUFRO2lCQUNaLENBQUM7WUFDSixDQUFDO1lBRUQsUUFBUSxFQUFFLEtBQUssRUFBRSxXQUFtQixFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sUUFBUSxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsQ0FBQztvQkFDM0MsVUFBVSxFQUFFLFdBQVc7aUJBQ3hCLENBQUMsQ0FBQztnQkFFSCxPQUFPLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBRUQsUUFBUSxFQUFFLEtBQUssRUFBRSxXQUFtQixFQUFFLFVBQXdCLEVBQUUsRUFBRTtnQkFDaEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUFDO29CQUMzQyxVQUFVLEVBQUUsV0FBVztvQkFDdkIsVUFBVTtpQkFDWCxDQUFDLENBQUM7Z0JBRUgsT0FBTztvQkFDTCxHQUFHLFFBQVE7aUJBQ1osQ0FBQztZQUNKLENBQUM7WUFFRCxPQUFPLEVBQUUsS0FBSyxFQUFFLFdBQW1CLEVBQUUsU0FBaUIsRUFBRSxFQUFFO2dCQUN4RCxNQUFNLFFBQVEsR0FBRyxNQUFNLFlBQVksQ0FBQyxPQUFPLENBQUM7b0JBQzFDLFVBQVUsRUFBRSxXQUFXO29CQUN2QixTQUFTO2lCQUNWLENBQUMsQ0FBQztnQkFFSCxPQUFPLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBRUQsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFtQixFQUFFLEVBQUU7Z0JBQ25DLE1BQU0sUUFBUSxHQUFHLE1BQU0sWUFBWSxDQUFDLFdBQVcsQ0FBQztvQkFDOUMsVUFBVSxFQUFFLFdBQVc7aUJBQ3hCLENBQUMsQ0FBQztnQkFFSCxPQUFPLEVBQUUsR0FBRyxRQUFRLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBRUQsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFtQixFQUFFLFVBQXdCLEVBQUUsRUFBRTtnQkFDN0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsS0FBSyxDQUFDO29CQUN4QyxVQUFVLEVBQUUsV0FBVztvQkFDdkIsVUFBVTtpQkFDWCxDQUFDLENBQUM7Z0JBRUgsT0FBTyxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFDekIsQ0FBQztZQUVELElBQUksRUFBRSxLQUFLLEVBQUUsV0FBbUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtnQkFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDO29CQUN2QyxVQUFVLEVBQUUsV0FBVztvQkFDdkIsS0FBSztpQkFDTixDQUFDLENBQUM7Z0JBRUgsT0FBTyxFQUFFLEdBQUcsUUFBUSxFQUFFLENBQUM7WUFDekIsQ0FBQztTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMifQ==