import { Switch } from "@headlessui/react";
import { useChain } from '@cosmos-kit/react';
import { chainName } from '@/config/defaults';

import { NFT } from "coreum-js"
import { StdFee } from "@cosmjs/amino";
import { useState } from "react";

export default function CreateCollection() {

    const [isBurningEnabled, setIsBurningEnabled] = useState(false);
    const [isFreezingEnabled, setIsFreezingEnabled] = useState(false);
    const [isWhitelistingEnabled, setIsWhitelistingEnabled] = useState(false);
    const [isDisableSendingEnabled, setIsDisableSendingEnabled] = useState(false);
    const [isSoulboundEnabled, setIsSoulboundEnabled] = useState(false);


    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const chainContext = useChain(chainName);


    //https://docs.coreum.dev/modules/deterministicgas.html#formula
    const fee: StdFee = {
        amount: [{ denom: 'ucore', amount: '0' }],
        gas: '16000',
    };

    const newNFTCollection = NFT.IssueClass({
        issuer: chainContext.address ?? '',
        symbol: "TEST123",
        name: "Workshop collection",
        description: "a new collection of NFTs",
        uri: "http://test.com/",
        uriHash: "somehash",
        royaltyRate: "0",
        // burning = 0, freezing = 1,  whitelisting = 2,disable_sending = 3
        features: [2]
    });


    async function mintNFT() {

        chainContext.signAndBroadcast([

            newNFTCollection

        ],
            fee

        )
    }

    return (

        <div className="mx-60 rounded-md p-10 text-white ">
            <div className='inline-block'>
                <h2 className='text-3xl'>Issue your <a href='https://www.coreum.com/smart-tokens' className='text-[#25D695] text-md font-bold'>Smart Tokens</a> collection</h2>
                <div className="my-5 text-xl text-gray-100">
                    <p>Smart tokens allow enterprises utilising the Coreum network to <a href="https://docs.coreum.dev/modules/assetnft.html#token-features" className='font-bold text-[#f1c34e]'>predetermine behaviours</a> and <a className='font-bold  text-[#f1c34e]' href='https://docs.coreum.dev/modules/deterministicgas.html'>deterministic gas fee</a> of specific tokens in order to execute specific and contract-like functions independently while operating on the chain's storage.</p>
                    <p className='mt-2'>The collection will hold your NFTs and will determine their behavior.</p>
                    <p>Once you have created a collection, you can mint NFTs and send them to other users.</p>
                    <p>Each collection can have its own set of rules and features.</p>
                    <p className='mt-2'>For example, you can create a collection that allows NFTs to be transferred between users, or a collection that only allows NFTs to be transferred to a specific address with the Soulbound feature.</p>
                </div>

            </div>
            <form className="flex flex-col placeholder-white font-semibold text-xl">
                <input type="text" placeholder="Name" className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0" />
                <input type="text" placeholder="Symbol" className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0" />

                <input type="text" placeholder="URI" className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0" />
                <input type="text" placeholder="Description" className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0" />
                <ul className="flex justify-between">
                    <li><input type="text" placeholder="Royalties" className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0" /></li>
                </ul>
                {/* Toogles */}
                <div className="">
                    <Switch.Group as="div" className="flex items-center mt-1">
                        <Switch
                            checked={isBurningEnabled}
                            onChange={setIsBurningEnabled}
                            className={classNames(
                                isBurningEnabled ? 'bg-[#25D695]' : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    isBurningEnabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                )}
                            />
                        </Switch>
                        <Switch.Label as="span" className="ml-3 text-md">
                            <span className="font-medium text-white">Burning</span>{' '}
                        </Switch.Label>
                    </Switch.Group>
                    <Switch.Group as="div" className="flex items-center mt-1">
                        <Switch
                            checked={isFreezingEnabled}
                            onChange={setIsFreezingEnabled}
                            className={classNames(
                                isFreezingEnabled ? 'bg-[#25D695]' : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    isFreezingEnabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                )}
                            />
                        </Switch>
                        <Switch.Label as="span" className="ml-3 text-md">
                            <span className="font-medium text-white">Freezing</span>{' '}
                        </Switch.Label>
                    </Switch.Group>
                    <Switch.Group as="div" className="flex items-center mt-1">
                        <Switch
                            checked={isWhitelistingEnabled}
                            onChange={setIsWhitelistingEnabled}
                            className={classNames(
                                isWhitelistingEnabled ? 'bg-[#25D695]' : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    isWhitelistingEnabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                )}
                            />
                        </Switch>
                        <Switch.Label as="span" className="ml-3 text-md">
                            <span className="font-medium text-white">Whitelisting</span>{' '}
                        </Switch.Label>
                    </Switch.Group>
                    <Switch.Group as="div" className="flex items-center mt-1">
                        <Switch
                            checked={isDisableSendingEnabled}
                            onChange={setIsDisableSendingEnabled}
                            className={classNames(
                                isDisableSendingEnabled ? 'bg-[#25D695]' : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    isDisableSendingEnabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                )}
                            />
                        </Switch>
                        <Switch.Label as="span" className="ml-3 text-md">
                            <span className="font-medium text-white">Disable Sending</span>{' '}
                        </Switch.Label>
                    </Switch.Group>
                    <Switch.Group as="div" className="flex items-center mt-1">
                        <Switch
                            checked={isSoulboundEnabled}
                            onChange={setIsSoulboundEnabled}
                            className={classNames(
                                isSoulboundEnabled ? 'bg-[#25D695]' : 'bg-gray-200',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={classNames(
                                    isSoulboundEnabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                )}
                            />
                        </Switch>
                        <Switch.Label as="span" className="ml-3 text-md">
                            <span className="font-medium text-white">Soulbound</span>{' '}
                        </Switch.Label>
                    </Switch.Group>
                </div>

                <button onClick={mintNFT} className="w-1/4 mt-5 bg-[#25D695]/[.09] hover:bg-emerald-700 text-white px-10 py-2 rounded-md">Deploy</button>


            </form>
        </div>

    );

}
