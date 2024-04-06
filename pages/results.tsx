import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {sha256} from 'js-sha256'

import WalletLoader from 'components/WalletLoader'
import {useSigningClient} from 'contexts/client'
import { StdFee } from '@cosmjs/amino';


//contract 
const contractAddress = 'testcore15rdlncz75zf2txgue52zcmm4jh6hxr5gejmavnxnr2rxh8a5jyjqgypktm'; 

const fee: StdFee = {
  amount: [{ denom: "utest", amount: "6084" }],
  gas: "1000000",
};

// Mock results data
const proposalResults = [
    { id: 1, yes: 123, no: 45, percentage: 73 },
    { id: 2, yes: 98, no: 76, percentage: 56 },
    { id: 3, yes: 145, no: 35, percentage: 80 },
    { id: 4, yes: 145, no: 35, percentage: 80 },
    { id: 5, yes: 145, no: 35, percentage: 80 },

    // More proposals as needed
  ];
  

const Results: NextPage = () => {
  const {walletAddress, signingClient, coreumQueryClient} = useSigningClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [transferID, setTransferID] = useState("")
  const [recipientAddress, setRecipientAddress] = useState('')



  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    setError('')
    setLoading(false)

  }, [signingClient, walletAddress])

 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Wallet Address:', walletAddress);
  };


  return (
    <WalletLoader loading={loading}>
    {/* ...rest of your components... */}

    {/* Results Section */}
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Proposal Results</h2>
      <div className="flex justify-center flex-wrap gap-6">
        {proposalResults.map((result) => (
          <div key={result.id} className="bg-gray-200 rounded-lg p-4 shadow-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/6 text-center">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Proposal ID: {result.id}</h3>
            <p className="text-gray-800">Yes votes: {result.yes}</p>
            <p className="text-gray-800">No votes: {result.no}</p>
            <p className="font-semibold">Approval: {result.percentage}%</p>
          </div>
        ))}
      </div>
    </div>

    {/* ...rest of your components... */}
  </WalletLoader>
  )
}

export default Results