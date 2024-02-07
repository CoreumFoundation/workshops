import { chainName } from "@/config/defaults";
import { useChain } from "@cosmos-kit/react";
import { StdFee } from "@cosmjs/amino";
import { NFT } from "coreum-js";
import { useContext, useState } from "react";
import { CoreumSigner } from "@/contexts/CoreumSigner";

export default function Send() {
  const [response, setResponse] = useState<any>("");
  const [error, setError] = useState<any>("");

  const [receiver, setReceiver] = useState("");
  const [classId, setClassId] = useState("");
  const [nftId, setNftId] = useState("");

  const chainContext = useChain(chainName);
  const walletAddress = chainContext.address ?? "";

  const fee: StdFee = {
    amount: [{ denom: "ucore", amount: "3594" }],
    gas: "115000",
  };

  const coreumSigner = useContext(CoreumSigner);

  async function sendNFT() {
    const sendMsg = NFT.Send({
      sender: walletAddress,
      receiver: receiver,
      classId: classId,
      id: nftId,
    });

    //@ts-ignore
    coreumSigner
      .signAndBroadcast(walletAddress ?? "", [sendMsg], fee)
      .then((response) => {
        setResponse(response);
        console.log(response);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }

  return (
    <div className="mx-10 rounded-md p-10 text-white ">
      <div className="inline-block">
        <h2 className="text-4xl font-extrabold">
          Send your{" "}
          <a
            href="https://www.coreum.com/smart-tokens"
            className="text-[#25D695] text-md font-bold"
          >
            Smart Token
          </a>{" "}
          NFT
        </h2>
        <div className="my-5 text-xl ">
          <p className="mt-2">
            Depending of the nature of your Smart Token you can send it to
            another user.
          </p>
          <p className="mt-2">
            Please note, you will not be able to re-claim the assets unless the
            receiver sends it back to you..
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
          onChange={(e) => setReceiver(e.target.value)}
          type="text"
          placeholder="Receiver"
          className="placeholder-white bg-[#25D695]/[.09] rounded-md p-2 my-2 border-0"
        />
      </form>
      <button
        disabled={!walletAddress}
        onClick={sendNFT}
        className="text-xl md:w-1/4 mt-5 bg-[#25D695]/[.09] hover:bg-emerald-500 hover:font-bold text-white px-10 py-2 rounded-md"
      >
        Send
      </button>
      <div className="mt-5">
        <p className="text-emerald-500">{response.rawLog}</p>
        <p className="text-red-500">{error.message}</p>
      </div>
    </div>
  );
}
