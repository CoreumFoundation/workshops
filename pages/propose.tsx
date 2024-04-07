import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import {sha256} from 'js-sha256'

import WalletLoader from 'components/WalletLoader'
import {useSigningClient} from 'contexts/client'
import {QueryNFTsResponse} from "../coreum/proto-ts/coreum/nft/v1beta1/query";
import {AssetNFT as AssetNFTTx, NFT as NFTTx} from "../coreum/tx";
import {EncodeObject} from "@cosmjs/proto-signing";
import { StdFee } from '@cosmjs/amino';

//contract testcore1td6j5a99pnu2zezcrckjfnwcmhmwfmcu35svxpphv3qx59n8sf0q4et20n
const contractAddress = 'testcore16xyl4nnjf907md4a6jh45qdauzgfm57l66fnngayrg8m4t3y9peshvrj3s'; 

const fee: StdFee = {
  amount: [{ denom: "utest", amount: "6084" }],
  gas: "1000000",
};

const Propose: NextPage = () => {
  const {walletAddress, signingClient, coreumQueryClient} = useSigningClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [classCreated, setClassCreated] = useState(false)
  const [nftClassDescription, setNFTClassDescription] = useState('')
  const [nfts, setNfts] = useState<{ classId: string; id: string, uri: string, uriHash: string, owner: string }[]>([])
  const [transferID, setTransferID] = useState("")
  const [recipientAddress, setRecipientAddress] = useState('')

  useEffect(() => {
    if (!signingClient || walletAddress.length === 0) {
      return
    }
    setError('')
    //setLoading(true)
    

  }, [signingClient, walletAddress])

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    propose(title, description);
    console.log('Submitting Proposal:', { title, description });
    console.log('Wallet Address:', walletAddress);
  };

  const propose = async (title, description) => {
    // Hardcoded amount, represented as a string to match the Uint128 format expected by the contract
    //const amount = "1"; // This is just a placeholder

    const title1 = "Your Proposal Title";
    const description1 = "Your detailed proposal description";
    const recipient = "testcore1xhvglxz55w0uy73t5lxhypt8leud9wsd92ccjq"; // Optional recipient address
    const amount = "123456789"; // Optional amount as string to match Uint128 format
  
    if (!walletAddress) {
      console.error('Wallet address is empty.');
      return;
    }
  
    try {
      const executeMsg = {
        propose: {
          title,
          description,
          recipient: recipient ? recipient : undefined, // Include only if recipient is provided
          amount: amount ? { amount, denom: "utest" } : undefined,
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
      {error.length > 0 && (
        <div className="alert alert-error">
          <label className="flex-grow break-all">{error}</label>
        </div>
      )}
      {transferID == "" && !classCreated && (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-0">
        <h1 className="text-4xl font-bold my-8 text-center">
          Propose Workshop
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-4xl gap-6">
          <input
            type="text"
            id="title"
            className="input input-bordered focus:input-primary input-lg w-full rounded-lg font-mono text-lg p-4"
            placeholder="Workshop title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <textarea
            id="description"
            className="textarea textarea-bordered focus:textarea-primary h-36 text-lg font-mono w-full rounded-lg p-4"
            placeholder="Workshop description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary btn-lg font-semibold hover:text-base-100 text-xl rounded-lg py-3 px-6"
          >
            Submit Proposal
          </button>
        </form>
      </div>

      )}
   
            


    </WalletLoader>
  )
}

export default Propose
