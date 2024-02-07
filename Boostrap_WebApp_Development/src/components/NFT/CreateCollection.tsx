import { Switch } from "@headlessui/react";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "@/config/defaults";

import { NFT } from "coreum-js";
import { StdFee } from "@cosmjs/amino";
import { useContext, useState } from "react";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

import { CoreumSigner } from "@/contexts/CoreumSigner";

export default function CreateCollection() {
  //Toggles
  const [isBurningEnabled, setIsBurningEnabled] = useState(false);
  const [isFreezingEnabled, setIsFreezingEnabled] = useState(false);
  const [isWhitelistingEnabled, setIsWhitelistingEnabled] = useState(false);
  const [isDisableSendingEnabled, setIsDisableSendingEnabled] = useState(false);
  const [isSoulboundEnabled, setIsSoulboundEnabled] = useState(false);

  function createStateArray(
    isFreezingEnable,
    isBurningEnable,
    isWhitelistingEnabled,
    isDisableSendingEnabled,
    isSoulboundEnabled
  ) {
    let stateArray: number[] = [];

    if (isBurningEnable) {
      stateArray.push(0);
    }
    if (isFreezingEnable) {
      stateArray.push(1);
    }
    if (isWhitelistingEnabled) {
      stateArray.push(2);
    }
    if (isDisableSendingEnabled) {
      stateArray.push(3);
    }
    if (isSoulboundEnabled) {
      stateArray.push(4);
    }

    return stateArray;
  }

  //Fields
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [uri, setUri] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");

  const [response, setResponse] = useState<any>("");
  const [error, setError] = useState<any>("");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const chainContext = useChain(chainName);
  const walletAddress = chainContext.address ?? "";

  //https://docs.coreum.dev/modules/deterministicgas.html#formula
  const fee: StdFee = {
    amount: [{ denom: "ucore", amount: "3594" }],
    gas: "115000",
  };

  const newNFTCollection = NFT.IssueClass({
    issuer: chainContext.address ?? "",
    symbol: symbol,
    name: name,
    description: description,
    uri: uri,
    uriHash: "somehash",
    royaltyRate: royalties,
    // burning = 0, freezing = 1,  whitelisting = 2,disable_sending = 3, soulbound = 4
    features: createStateArray(
      isFreezingEnabled,
      isBurningEnabled,
      isWhitelistingEnabled,
      isDisableSendingEnabled,
      isSoulboundEnabled
    ),
  });

  const coreumSigner = useContext(CoreumSigner);

  async function createCollection() {
    //@ts-ignore
    coreumSigner
      .signAndBroadcast(walletAddress ?? "", [newNFTCollection], fee)
      .then((response) => {
        setResponse(response);
        console.log(response);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }

  // function testSend() {

  //     chainContext.signAndBroadcast([

  //         {
  //             typeUrl: "/cosmos.bank.v1beta1.MsgSend",
  //             value: {
  //                 fromAddress: chainContext.address,
  //                 toAddress: "core15nz4ffz9656kw99t3re9pheu5ws53flgw3yv2j",
  //                 amount: [
  //                     { denom: "ucore", amount: "10000" },
  //                 ],
  //             },
  //         },

  //     ],
  //         fee
  //     ).then((response) => {
  //         console.log(response);
  //     }).catch((error) => {
  //         console.log(error);
  //     });
  // }

  return (
    <div className="mx-10 rounded-md p-10 text-white ">
      <div className="inline-block">
        <h2 className="text-4xl font-extrabold">
          Create your{" "}
          <a
            href="https://www.coreum.com/smart-tokens"
            className="text-[#25D695] text-md font-bold"
          >
            Smart Tokens
          </a>{" "}
          Collection
        </h2>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between py-2 text-left text-md font-medium leading-5 ">
                <span>Learn more</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-white`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                <div className="my-5 text-xl text-gray-100">
                  <p>
                    Smart tokens on the Coreum network enable enterprises to set{" "}
                    <a
                      href="https://docs.coreum.dev/modules/assetnft.html#token-features"
                      className="font-semibold text-blue-300"
                    >
                      predetermine behaviours
                    </a>{" "}
                    and{" "}
                    <a
                      className="font-semibold  text-blue-300"
                      href="https://docs.coreum.dev/modules/deterministicgas.html"
                    >
                      deterministic gas fee
                    </a>{" "}
                    for certain tokens, facilitating the execution of
                    contract-like functions directly on the blockchain's
                    storage.
                  </p>
                  <p className="mt-2">
                    Your NFTs will be stored in a collection that defines their
                    behavior.
                  </p>
                  <p>
                    After creating a collection, you can mint NFTs and transfer
                    them to others.
                  </p>
                  <p>
                    Each collection can feature its unique set of rules and
                    functionalities.
                  </p>
                  <p className="mt-2">
                    For instance, you might create a collection permitting
                    user-to-user NFT transfers or another that restricts
                    transfers to a specific address using the Soulbound feature
                  </p>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <form className="flex flex-col placeholder-white font-semibold text-xl">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
        />
        <input
          onChange={(e) => setSymbol(e.target.value)}
          type="text"
          placeholder="Symbol"
          className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
        />
        <input
          onChange={(e) => setUri(e.target.value)}
          type="text"
          placeholder="URI"
          className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Description"
          className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
        />
        <ul className="flex justify-between">
          <li>
            <input
              onChange={(e) => setRoyalties(e.target.value)}
              type="text"
              placeholder="Royalties"
              className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
            />
          </li>
        </ul>
        {/* Toogles */}
        <div className="my-2">
          <Switch.Group as="div" className="flex items-center mt-1">
            <Switch
              checked={isBurningEnabled}
              onChange={setIsBurningEnabled}
              className={classNames(
                isBurningEnabled ? "bg-[#25D695]" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  isBurningEnabled ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3 text-md">
              <span className="font-medium text-white">Burning</span>{" "}
            </Switch.Label>
          </Switch.Group>
          <Switch.Group as="div" className="flex items-center mt-1">
            <Switch
              checked={isFreezingEnabled}
              onChange={setIsFreezingEnabled}
              className={classNames(
                isFreezingEnabled ? "bg-[#25D695]" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  isFreezingEnabled ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3 text-md">
              <span className="font-medium text-white">Freezing</span>{" "}
            </Switch.Label>
          </Switch.Group>
          <Switch.Group as="div" className="flex items-center mt-1">
            <Switch
              checked={isWhitelistingEnabled}
              onChange={setIsWhitelistingEnabled}
              className={classNames(
                isWhitelistingEnabled ? "bg-[#25D695]" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  isWhitelistingEnabled ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3 text-md">
              <span className="font-medium text-white">Whitelisting</span>{" "}
            </Switch.Label>
          </Switch.Group>
          <Switch.Group as="div" className="flex items-center mt-1">
            <Switch
              checked={isDisableSendingEnabled}
              onChange={setIsDisableSendingEnabled}
              className={classNames(
                isDisableSendingEnabled ? "bg-[#25D695]" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  isDisableSendingEnabled ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3 text-md">
              <span className="font-medium text-white">Disable Sending</span>{" "}
            </Switch.Label>
          </Switch.Group>
          <Switch.Group as="div" className="flex items-center mt-1">
            <Switch
              checked={isSoulboundEnabled}
              onChange={setIsSoulboundEnabled}
              className={classNames(
                isSoulboundEnabled ? "bg-[#25D695]" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  isSoulboundEnabled ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-3 text-md">
              <span className="font-medium text-white">Soulbound</span>{" "}
            </Switch.Label>
          </Switch.Group>
        </div>
      </form>
      <button
        disabled={!walletAddress}
        onClick={createCollection}
        className="text-xl md:w-1/4  mt-5 bg-[#25D695]/[.09] hover:bg-emerald-500 hover:font-bold text-white px-10 py-2 rounded-md"
      >
        Deploy
      </button>
      <div className="mt-5">
        <p className="text-emerald-500">{response.rawLog}</p>
        <p className="text-red-500">{error.message}</p>
      </div>
    </div>
  );
}
