import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {Coin} from '@cosmjs/amino'
import WalletLoader from 'components/WalletLoader'
import {useSigningClient} from 'contexts/client'
import { StdFee } from '@cosmjs/amino';
import {convertDenomToMicroDenom, convertFromMicroDenom, convertMicroDenomToDenom,} from 'util/conversion'

import { CosmWasmClient, SigningCosmWasmClient, SigningCosmWasmClientOptions} from '@cosmjs/cosmwasm-stargate';
import { Any } from 'coreum/proto-ts/google/protobuf/any'

const PUBLIC_CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME
const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || ''

const contractAddress = 'testcore1rt5khxlnt9yh0wqwdwvdu0y9lfheapx3jh6w6hqav6782fr3xedsyywkxl'; 

const Vote: NextPage = () => {
  const {walletAddress, signingClient} = useSigningClient()
  const [balance, setBalance] = useState('')
  const [loadedAt, setLoadedAt] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [voteId, setVoteId] = useState('')
  const [vote, setVote] = useState('')
  const [queryProposalId, setQueryProposalId] = useState('');

  const [proposal, setProposal] = useState<any[]>([]);


  const [cwClient, setCwClient] = useState<CosmWasmClient | null>(null);

  const rpcEndpoint = 'https://full-node.testnet-1.coreum.dev:26657';

  const fee: StdFee = {
    amount: [{ denom: "utest", amount: "6084" }],
    gas: "1000000",
  };

  const handleVoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!voteId || !vote) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Convert the vote to a boolean value
    const approve = vote === "yes";
  
    // Call the voted function with the proposalId and approve
    await voted(voteId, approve);
  
    setVoteId('');
    setVote('');
    alert(`Vote submitted for proposal ID: ${voteId} with vote: ${vote}`);
  };

  // Mock proposals data
  const proposals = [
  { id: 1, title: "Proposal 1", description: "Description of Proposal 1" },
  ]

  useEffect(() => {

    if (!signingClient || walletAddress.length === 0) {
      return
    }
    const initCosmWasmClient = async () => {
      const client = await CosmWasmClient.connect(rpcEndpoint);
      setCwClient(client);
      console.log('CosmWasm Client:', client);
    };
    setError('')
    setSuccess('')

    initCosmWasmClient();
    queryAllProposals();


    signingClient
      .getBalance(walletAddress, PUBLIC_STAKING_DENOM)
      .then((response: any) => {
        const {amount, denom}: { amount: number; denom: string } = response
        setBalance(
          `${convertMicroDenomToDenom(amount)} ${convertFromMicroDenom(denom)}`
        )
      })
      .catch((error) => {
        setError(`Error! ${error.message}`)
      })
  }, [signingClient, walletAddress, loadedAt])

  useEffect(() => {
    if (cwClient) {
      queryAllProposals();
    }
  }, [cwClient]);

  const queryAllProposals = async () => {
    if (!cwClient) return;
    try {
        const queryMsg = { list_proposals: {} };
        const response = await cwClient.queryContractSmart(contractAddress, queryMsg);
        console.log('Query Response:', response);
  
        if (Array.isArray(response)) {
          // The response is directly an array, so we can use it as is.
          //setProposal(response.); // Storing the whole response in state.
          setProposal(response);

          // Now let's log the details of each proposal.
          response.forEach(proposal => {
            console.log(
              `ID: ${proposal.id}, 
              Title: ${proposal.title}, 
              Description: ${proposal.description}, 
              Amount: ${proposal.amount},
              Votes For: ${proposal.votes_for},
              Votes Against: ${proposal.votes_against}`
            );
          });
        }

    } catch (error) {
        console.error('Error querying contract:', error);
    }
  };

  //query one proposal 
  const queryProposal = async (proposalId: string) => {
    if (!cwClient) return;
    try {
      const queryMsg = { get_proposal: { proposal_id: 0 } };
      const response = await cwClient.queryContractSmart(contractAddress, queryMsg);
      console.log('Query Response:', response);

      //if (response) {
          //setProposal(response);
      //}
    } catch (error) {
      console.error('Error querying contract for a proposal:', error);
    }
  };

  
  const voted = async (proposalId: string, approve: boolean) => {
    // Hardcoded amount, represented as a string to match the Uint128 format expected by the contract
    //const amount = "1"; // This is just a placeholder

    if (!walletAddress) {
      console.error('Wallet address is empty.');
      return;
    }
  
    try {
      const executeMsg = { 
        vote: { 
          proposal_id: parseInt(proposalId, 10),
          approve 
        } 
      };
  
    const response = await signingClient?.execute(walletAddress, contractAddress, executeMsg, fee);
  
      console.log('Execute Response:', response);
    } catch (error) {
      console.error('Error executing contract:', error);
    }
  };

  return (
    <WalletLoader loading={loading}>
      <p className="text-2xl text-white">Your wallet has {balance}</p>
  
      <h1 className="text-5xl font-bold my-8 text-center text-white">
        Vote On Proposals
      </h1>

       {/* On Chain Proposals */}
       {/* On Chain Proposals */}
<div className="container mx-auto px-4">
  <h2 className="text-3xl font-bold mb-6 text-center text-white">Vote On Proposals</h2>
  <div className="flex justify-center flex-wrap gap-6">
    {proposal.map((p) => (
    <div key={p.id} className="bg-white rounded-lg p-6 shadow-lg w-full md:w-1/2 lg:w-1/3 text-center space-y-4">
      <div className="text-xl font-semibold mb-2 text-gray-800">
        <span className="text-gray-500">ID:</span> {p.id}
      </div>
      <div className="font-semibold text-gray-800">
        <span className="text-gray-500">Title:</span> {p.title}
      </div>
      <p className="text-gray-600">{p.description}</p>
      {/* Displaying the vote counts */}
      <div className="flex justify-between items-center text-gray-600">
        <div>
          <span className="font-bold text-green-600">For:</span> {p.votes_for}
        </div>
        <div>
          <span className="font-bold text-red-600">Against:</span> {p.votes_against}
        </div>
      </div>
      <p className="text-gray-600">
        <span className="font-bold">Ends In:</span> {p.voting_end} {/* Consider formatting this time in a human-readable format */}
      </p>
      {/* Interactive voting buttons */}
    </div>
    ))}
  </div>
</div>

  
      {/* Vote Submission Form */}
      <div className="mt-8 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Submit Your Vote</h2>
        <div className="flex justify-center">
          <form onSubmit={handleVoteSubmit} className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="proposal-id" className="block text-sm font-semibold mb-2 text-gray-800">Proposal ID</label>
              <input
                type="number"
                id="proposal-id"
                className="input input-bordered w-full"
                placeholder="Enter Proposal ID"
                value={voteId}
                onChange={(e) => setVoteId(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="vote" className="block text-sm font-semibold mb-2 text-gray-800">Your Vote</label>
              <select
                id="vote"
                className="select select-bordered w-full"
                value={vote}
                onChange={(e) => setVote(e.target.value)}
              >
                <option value="">Select Vote</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full">Submit Vote</button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center mt-8">
      <button
        onClick={queryAllProposals}
        className="btn btn-outline btn-accent"
      >
        Query All Proposals
      </button>
    </div>
    <div className="mt-4 container mx-auto px-4 text-center">
  <input
    type="number"
    className="input input-bordered w-full max-w-xs text-center"
    placeholder="Enter Proposal ID"
    value={queryProposalId}
    onChange={(e) => setQueryProposalId(e.target.value)}
  />
  <button
    onClick={() => queryProposal(queryProposalId)}
    className="btn btn-outline btn-accent mt-4"
  >
    Query Proposal
  </button>
</div>
  
      {/* Success and Error Messages */}
      <div className="mt-4">
        {success.length > 0 && (
          <div className="alert alert-success">
            <div>
              <label className="text-white">{success}</label>
            </div>
          </div>
        )}
        {error.length > 0 && (
          <div className="alert alert-error">
            <div>
              <label className="text-white">{error}</label>
            </div>
          </div>
        )}
      </div>
    </WalletLoader>
  );
  
  
  
}

export default Vote

