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



function SendFTWithTheme() {
  const [theme, setTheme] = useState('dark');
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [denom, setDenom] = useState("");
  const [isIBCEnable, setIBCEnable] = useState(false);
  const [selectedChain, setSelectedChain] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [IBCEnableChains, setIBCEnableChains] = useState([]);

  const chainContext = useChain(chainName);
  const walletAddress = chainContext.address ?? "";
  const coreumSigner = useContext(CoreumSigner);

  useEffect(() => {
    const filteredChains = ibc.filter(
      (channel) => channel.chain_1.chain_name === "coreum"
    ).map((channel) => {
      const chain = chains.find(
        (chain) => chain.chain_name === channel.chain_2.chain_name
      );
      return {
        imgSrc: chain?.logo_URIs?.png,
        name: chain?.pretty_name,
        chainId: chain?.chain_id,
        base: chain?.bech32_prefix,
        channel: channel.channels[0].chain_1.channel_id,
      };
    });
    setIBCEnableChains(filteredChains);
    if (filteredChains.length > 0) {
      setSelectedChain(filteredChains[0]);
    }
  }, []);

  const fee: StdFee = {
    amount: [{ denom: "ucore", amount: "3594" }],
    gas: "120000",
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
      revisionNumber: BigInt(2706277831000000000),
      revisionHeight: BigInt(1),
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
        "Coreum Smart Token IBC Transfer"
      )

      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setError(error);
      });
  }

  const  handleStandardSubmit = (e) => {
    e.preventDefault();
    if (isIBCEnable) {
      IBCSend();
    } else {
      send();
    }
  };


  return (
    <div className={`min-h-screen flex flex-col justify-start items-center pt-20 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900 to-gray-900 text-white' : 'bg-gradient-to-br from-yellow-100 to-gray-100 text-gray-900'}`}>
      <div className='w-full max-w-lg mx-auto bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-lg p-6 rounded-3xl shadow-2xl transform transition-all hover:scale-105 duration-500'>
        <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">IBC Token Transfer</h2>
        <form onSubmit={isIBCEnable ? handleIBCSubmit : handleStandardSubmit} className="space-y-6">
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Recipient Address"
            className="w-full p-3 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            value={denom}
            onChange={(e) => setDenom(e.target.value)}
            placeholder="Denomination (e.g., uatom)"
            className="w-full p-3 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full p-3 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            required
          />
          <Switch
            checked={isIBCEnable}
            onChange={setIBCEnable}
            className={`${isIBCEnable ? 'bg-green-400' : 'bg-gray-200'} relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Enable IBC</span>
            <span
              className={`${isIBCEnable ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
          {isIBCEnable && (
            <Listbox value={selectedChain} onChange={setSelectedChain}>
              {({ open }) => (
                <>
                  <Listbox.Button className="w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:border-indigo-500 sm:text-sm">
                    <span className="block truncate">{selectedChain?.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {IBCEnableChains.map((chain, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) => `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'} cursor-default select-none relative py-2 pl-10 pr-4`}
                          value={chain}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>{chain.name}</span>
                              {selected ? (
                                <span className={`${active ? 'text-amber-600' : 'text-amber-600'} absolute inset-y-0 left-0 flex items-center pl-3`}>
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
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            {isIBCEnable ? 'Send via IBC' : 'Send'}
          </button>
        </form>
        <button
          onClick={toggleTheme}
          className="mt-4 p-2 text-sm text-gray-800 bg-white rounded-full shadow cursor-pointer hover:bg-gray-200"
        >
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
        <div className="mt-5">
          {response && <p className="text-emerald-500">{response}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default SendFTWithTheme;
