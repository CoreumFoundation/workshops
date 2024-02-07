import { chainName } from "@/config/defaults";
import { useChain } from "@cosmos-kit/react";
import { StdFee } from "@cosmjs/amino";
import { NFT, convertStringToAny } from "coreum-js";
import { useContext, useState } from "react";
import { CoreumSigner } from "@/contexts/CoreumSigner";

export default function Mint() {
  const [classId, setClassId] = useState("");
  const [nftId, setNftId] = useState("");
  const [uri, setUri] = useState("");
  const [data, setData] = useState("");

  const [response, setResponse] = useState<any>("");
  const [error, setError] = useState<any>("");

  const chainContext = useChain(chainName);
  const walletAddress = chainContext.address ?? "";

  const fee: StdFee = {
    amount: [{ denom: "ucore", amount: "3594" }],
    gas: "115000",
  };

  const coreumSigner = useContext(CoreumSigner);

  async function mintNFT() {
    const formattedData = convertStringToAny(data);

    const mintMsg = NFT.Mint({
      sender: walletAddress,
      classId: classId,
      id: nftId,
      uri: uri,
      uriHash: "uri_hash",
      data: formattedData,
    });

    //@ts-ignore
    coreumSigner
      .signAndBroadcast(walletAddress, [mintMsg], fee)
      .then((response) => {
        setResponse(response);
      })
      .catch((error) => {
        setError(error);
      });
  }

  return (
    <div className="mx-10 rounded-md p-10 text-white ">
      <div className="inline-block">
        <h2 className="text-4xl font-extrabold">
          Mint{" "}
          <a
            href="https://www.coreum.com/smart-tokens"
            className="text-[#25D695] text-md font-bold"
          >
            Smart Tokens
          </a>{" "}
          NFT
        </h2>
        <div className="my-5 text-xl ">
          <p className="mt-2">
            Each Smart Token is unique and inherits Smart Features from its
            parent collection.
          </p>
        </div>
      </div>
      <form className="flex flex-col placeholder-white font-semibold text-xl">
        <input
          onChange={(e) => setClassId(e.target.value)}
          type="text"
          placeholder="Class ID"
          className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
        />
        <input
          onChange={(e) => setNftId(e.target.value)}
          type="text"
          placeholder="NFT ID"
          className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
        />
        <input
          onChange={(e) => setUri(e.target.value)}
          type="text"
          placeholder="URI"
          className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
        />
        <input
          onChange={(e) => setData(e.target.value)}
          type="text"
          placeholder="Data"
          className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
        />
      </form>
      <button
        disabled={!walletAddress}
        onClick={mintNFT}
        className="text-xl md:w-1/4 mt-5 bg-[#25D695]/[.09] hover:bg-emerald-500 hover:font-bold text-white px-10 py-2 rounded-md"
      >
        Mint
      </button>
      <div className="mt-5">
        <p className="text-emerald-500">{response.rawLog}</p>
        <p className="text-red-500">{error.message}</p>
      </div>
    </div>
  );
}
