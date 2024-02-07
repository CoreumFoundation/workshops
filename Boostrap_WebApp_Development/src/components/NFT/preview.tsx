import { chainName } from "@/config/defaults";
import { useChain } from "@cosmos-kit/react";
import { useEffect, useState } from "react";

export default function Preview() {
  const chainContext = useChain(chainName);
  const walletAddress = chainContext.address;
  const [nfts, setNfts] = useState<any[]>([]);

  async function getNFTs() {
    const response = await fetch(
      `https://full-node.testnet-1.coreum.dev:1317/coreum/nft/v1beta1/nfts?owner=${walletAddress}`
    );
    const data = await response.json();
    console.log(data);
    setNfts(data.nfts);
  }

  useEffect(() => {
    getNFTs();
  }, [walletAddress]);

  return (
    <div className="px-10 pb-10  sm:px-6 lg:px-20">
      <div className="mt-8 flow-root">
        <div className="inline-block text-white">
          <h2 className="text-4xl font-extrabold">
            Preview your{" "}
            <a
              href="https://www.coreum.com/smart-tokens"
              className="text-[#25D695] text-md font-bold"
            >
              Smart Tokens
            </a>{" "}
            NFTs
          </h2>
          <div className="my-5 text-xl ">
            <p className="mt-2">See the Smart Tokens you own.</p>
            <p className="mt-2">
              There are many ways to get on-chain data. Here we simply query a{" "}
              <a
                className="text-blue-300"
                href="https://full-node.testnet-1.coreum.dev:1317/"
              >
                public REST server
              </a>{" "}
              that expose different endoints to query the blockchain
            </p>
          </div>
        </div>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Collection
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Data(Base64)
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">URI</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {nfts != undefined
                    ? nfts.map((nft: any) => (
                        <tr key={nft.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {nft.class_id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {nft.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {nft.data?.Data}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              target="blank"
                              href={nft.uri}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              URI<span className="sr-only">, {nft.uri}</span>
                            </a>
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
