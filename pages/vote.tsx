import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {Coin} from '@cosmjs/amino'
import WalletLoader from 'components/WalletLoader'
import {useSigningClient} from 'contexts/client'
import {convertDenomToMicroDenom, convertFromMicroDenom, convertMicroDenomToDenom,} from 'util/conversion'

const PUBLIC_CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME
const PUBLIC_STAKING_DENOM = process.env.NEXT_PUBLIC_STAKING_DENOM || ''

const Vote: NextPage = () => {
  const {walletAddress, signingClient} = useSigningClient()
  const [balance, setBalance] = useState('')
  const [loadedAt, setLoadedAt] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [sendAmount, setSendAmount] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const [voteId, setVoteId] = useState('')
  const [vote, setVote] = useState('')

  // Existing useEffect for balance fetching...

  // New function to handle vote submission
  const handleVoteSubmit = (e) => {
    e.preventDefault()
    // Logic to handle the vote submission...
    alert(`Vote submitted for proposal ID: ${voteId} with vote: ${vote}`)
    // Reset fields
    setVoteId('')
    setVote('')
  }

  // Mock proposals data
  const proposals = [
  { id: 1, title: "Proposal 1", description: "Description of Proposal 1" },
  { id: 2, title: "Proposal 2", description: "Description of Proposal 2" },
  { id: 3, title: "Proposal 3", description: "Description of Proposal 3" },
  { id: 4, title: "Proposal 3", description: "Cool New Workshop for new awesome contracts" },
  { id: 5, title: "Proposal 3", description: "Description of Proposal 3" },
  { id: 6, title: "Proposal 3", description: "Description of Proposal 3" },
  ]

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    setError('')
    setSuccess('')

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

  const handleSend = () => {
    setError('')
    setSuccess('')
    setLoading(true)
    const amount: Coin[] = [
      {
        amount: convertDenomToMicroDenom(sendAmount),
        denom: PUBLIC_STAKING_DENOM,
      },
    ]

    signingClient
      ?.sendTokens(walletAddress, recipientAddress, amount, 'auto')
      .then(() => {
        const message = `Success! Sent ${sendAmount}  ${convertFromMicroDenom(
          PUBLIC_STAKING_DENOM
        )} to ${recipientAddress}.`

        setLoadedAt(new Date())
        setLoading(false)
        setSendAmount('')
        setSuccess(message)
      })
      .catch((error) => {
        setLoading(false)
        setError(`Error! ${error.message}`)
      })
  }
  return (
    <WalletLoader loading={loading}>
      <p className="text-2xl text-white">Your wallet has {balance}</p>
  
      <h1 className="text-5xl font-bold my-8 text-center text-white">
        Vote On Proposals
      </h1>
  
      {/* Proposals Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Proposals</h2>
        <div className="flex justify-center flex-wrap gap-6">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="bg-gray-200 rounded-lg p-4 shadow-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/6 text-center">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">ID: {proposal.id}</h3>
              <p className="font-semibold text-gray-800">Title: {proposal.title}</p>
              <p className="text-gray-600">{proposal.description}</p>
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
