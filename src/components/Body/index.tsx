import React, { useContext, useState, useEffect } from 'react';
import { useChain } from "@cosmos-kit/react";
import { StdFee } from "@cosmjs/amino";
import { CoreumSigner } from "@/contexts/CoreumSigner";
import { Switch, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { assets, ibc, chains } from "chain-registry";
import { chainName } from "@/config/defaults";
import { Fragment } from 'react';
import { MsgSendEncodeObject } from "@cosmjs/stargate/build/modules";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";
import { Coin } from "coreum-js/dist/main/cosmos/base/v1beta1/coin";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import Long from "long";
import crypto from 'crypto'; // Import crypto module for SHA256 hashing






function SendFTWithTheme() {
  const [response, setResponse] = useState<any>("");
  const [error, setError] = useState<any>("");

  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [denom, setDenom] = useState("");
  const[IBCDenom, setIBCDenom] = useState("");
  const [hashValue, setHashValue] = useState(""); // State for hash value


  const [isIBCEnable, setIBCEnable] = useState(false);

  const chainContext = useChain(chainName);
  const walletAddress = chainContext.address ?? "";

  const fee: StdFee = {
    amount: [{ denom: "ucore", amount: "6084" }],
    gas: "120000",
  };
  const symbols = ["COREUM", "ATOM", "OSMO", "DYDX", "EVMOS", "KAVA", "SEI"];

  // const dropdownList = symbols.map((symbol) => {
  //   const asset = assets.find(
  //     (assetList) => assetList.assets[0].symbol === symbol
  //   )!.assets[0];

  //   return {
  //     imgSrc:
  //       asset.logo_URIs?.png || asset.logo_URIs?.jpeg || asset.logo_URIs?.svg,
  //     name: asset.name,
  //     symbol: asset.symbol,
  //     denom: asset.base,
  //     available: Number((Math.random() * 100).toFixed(6)),
  //     priceDisplayAmount: Math.floor(Math.random() * 10) + 1,
  //     description: asset.description,
  //     base: asset.base,
  //   };
  // });

  const channels = ibc.filter(
    (channel) => channel.chain_1.chain_name === "coreum"
  );



  const IBCEnableChains = channels.map((channel) => {
    const chain = chains.find(
      (chain) => chain.chain_name === channel.chain_2.chain_name
    );

    return {
      imgSrc: chain?.logo_URIs?.png,
      name: chain?.pretty_name,
      chainId: chain?.chain_id,
      base: chain?.bech32_prefix,
      channel: channel.channels[0].chain_1.channel_id,
      channel2: channel.channels[0].chain_2.channel_id
    };
  });


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [selectedChain, setSelectedChain] = useState(IBCEnableChains[0]);


  const coreumSigner = useContext(CoreumSigner);

  const msgBankSend: MsgSendEncodeObject = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: MsgSend.fromPartial({
      fromAddress: walletAddress,
      toAddress: receiver,
      amount: [
        {
          denom: denom,
          amount: amount.toString(),
        },
      ],
    }),
  };



  // Function to compute SHA256 hash
const hash = (input : any) => {
  return crypto.createHash('sha256').update(input).digest('hex');
};

// Function to handle button click
const handleButtonClick = () => {
  // Construct denom dynamically
  const constructedDenom = `transfer/${selectedChain.channel2}/${denom}`;
  console.log("Constructed Denom:", constructedDenom);

  // Compute the hash value
  const hashedValue = hash(constructedDenom);
  console.log("Computed Hash:", hashedValue);

  // Set the hash value into the state
  setHashValue(hashedValue);
  console.log("Selected Chain Channel2:", selectedChain.channel2);
};

useEffect(() => {
  // Call handleButtonClick when the component mounts
  handleButtonClick();
});

console.log("Selected Chain:", selectedChain);


  async function send() {
    //@ts-ignore
    coreumSigner
      .signAndBroadcast(walletAddress ?? "", [msgBankSend], fee)
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setError(error);
      });
  }



  async function IBCSend() {
    const coin: Coin = {
      denom: denom,
      amount: amount,
    };

    const timeoutHeight: Height = {
      //@ts-ignore 
      revisionNumber: Long.fromString("2706277831000000000"),
      revisionHeight: new Long(1),
    };

  
  
    //@ts-ignore
    coreumSigner
      ?.sendIbcTokens(
        walletAddress,
        receiver,
        coin,
        "transfer",
        /** the channel by which the packet will be sent */
        selectedChain.channel,
        /** the tokens to be transferred */
        /** the sender address */
        /** the recipient address on the destination chain */
        /**
         * Timeout height relative to the current block height.
         * The timeout is disabled when set to 0.
         */
        timeoutHeight,
        /**
         * Timeout timestamp in absolute nanoseconds since unix epoch.
         * The timeout is disabled when set to 0.
         */
        0,
        fee,

        /** optional memo */
        "Coreum IBC Transfer"
      )

      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setError(error);
      });
  }




  return (
 
   

<div className="mx-4 md:mx-12 lg:mx-24 xl:mx-48 2xl:mx-72 my-10 p-8 bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl rounded-2xl text-gray-100 transition-all duration-500 ease-in-out transform hover:scale-105">
  <div className="flex flex-col items-center">
  <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 hover:text-green-300">
      Send Your <a href="https://www.coreum.com/smart-tokens" className="underline decoration-green-400 decoration-4">Smart Tokens</a>
    </h2>
    <p className="text-center mb-6">Depending on the nature of your Smart Token, you can send it to another user. Please note, you will not be able to reclaim the assets unless the receiver sends them back to you.</p>
  </div>

  <div className="flex items-center justify-center mb-4">
    <Switch
      checked={isIBCEnable}
      onChange={setIBCEnable}
      className={`${isIBCEnable ? 'bg-green-500' : 'bg-gray-700'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
    >
      <span className="sr-only">Enable IBC Transfer</span>
      <span
        className={`${isIBCEnable ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
      />
    </Switch>
    <span className="ml-3 text-sm font-medium">IBC Transfer</span>
  </div>

  {isIBCEnable && (
    <div className="relative w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto my-5">
      <Listbox value={selectedChain} onChange={setSelectedChain}>
        {({ open }) => (
          <>
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-gray-700 rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <span className="block truncate">{selectedChain.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              enter="transition-opacity duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options static className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {IBCEnableChains.map((chain, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-green-200 bg-gray-600' : 'text-gray-100'}`
                    }
                    value={chain}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>{chain.name}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-500">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
      <p className="mt-2 text-sm text-gray-400">Message will be sent through {selectedChain.channel}</p>
    </div>
  )}

  <form className="mt-4 space-y-3" autoComplete="off">
    <input
      type="text"
      placeholder="Denom"
      onChange={(e) => setDenom(e.target.value)}
      className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <input
      type="number"
      placeholder="Amount (of subunits)"
      onChange={(e) => setAmount(e.target.value)}
      className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <input
      type="text"
      placeholder={selectedChain.base + "..."}
      onChange={(e) => setReceiver(e.target.value)}
      className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </form>
  <div>
  <p>Preview: IBC/hash(transfer/{selectedChain.channel2}/{denom})</p>
  <p>Result:  {`IBC/${hashValue}`}</p>
  </div>


 <div className="mt-6 flex justify-center">
  {isIBCEnable ? (
    <button
      disabled={!walletAddress}
      onClick={IBCSend}
      className="relative px-6 py-2 font-semibold text-white rounded-lg shadow-lg bg-gradient-to-r from-teal-300 to-cyan-500 hover:from-teal-400 hover:to-cyan-600 disabled:opacity-50 transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105 before:absolute before:inset-0 before:rounded-lg before:bg-white before:bg-opacity-20 before:shadow-inner before:transition-opacity hover:before:bg-opacity-0"
    >
      <span className="relative">
        IBC Send
      </span>
    </button>
  ) : (
    <button
      disabled={!walletAddress}
      onClick={send}
      className="relative px-6 py-2 font-semibold text-white rounded-lg shadow-lg bg-gradient-to-r from-teal-300 to-cyan-500 hover:from-teal-400 hover:to-cyan-600 disabled:opacity-50 transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105 before:absolute before:inset-0 before:rounded-lg before:bg-white before:bg-opacity-20 before:shadow-inner before:transition-opacity hover:before:bg-opacity-0"
    >
      <span className="relative">
        Send
      </span>
    </button>
  )}
</div>
<div className="mt-6 text-center">
    <p className="text-green-400">{response.rawLog}</p>
    <p className="text-red-500">{error.message}</p>
  </div>

  
</div>


  );
}
export default SendFTWithTheme;