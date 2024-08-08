import { useEffect, useState } from "react";
import { useChain } from "@cosmos-kit/react";
import { chainName } from "../config/defaults";
import { MyProjectClient } from "@/contract/ts/MyProject.client";
import { StdFee } from "@cosmjs/amino";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import { Header } from "@/components/Header";

const CONTRACT_ADDRESS = "testcore1nspjcp490zmwt8fdxfm77l35dqdzjyycql3mpejljmsj84s52sjqj4v5h6";

function App() {
  const chainContext = useChain(chainName);
  const walletAddress = chainContext.address ?? "";

  const [client, setClient] = useState<MyProjectClient | null>(null);
  const [mintNftId, setMintNftId] = useState("");
  const [mintNftData, setMintNftData] = useState("");
  const [mintNftUri, setMintNftUri] = useState("");
  const [mintNftUriHash, setMintNftUriHash] = useState("");
  const [modifyNftId, setModifyNftId] = useState("");
  const [modifyNftData, setModifyNftData] = useState("");
  const [isMintMode, setIsMintMode] = useState(true); // State to manage form toggle

  useEffect(() => {
    if (walletAddress) {
      (async () => {
        const signingClient = await chainContext.getSigningCosmWasmClient();
        setClient(new MyProjectClient(signingClient, walletAddress, CONTRACT_ADDRESS));
      })();
    }
  }, [walletAddress, chainContext]);

  const getAccountDetails = async () => {
    const signingClient = await chainContext.getSigningCosmWasmClient();
    const account = await signingClient.getAccount(walletAddress);
    return account;
  };

  const mintNFT = async () => {
    if (!client) return;

    const fee: StdFee = {
      amount: [{ denom: "ucore", amount: "2000" }],
      gas: "200000",
    };

    // Properly base64 encode the data
    const data = btoa(mintNftData);  // Binary data in base64 format

    try {
      const account = await getAccountDetails();
      const sequence = account ? account.sequence : undefined;

      const result = await client.mintMutable({
        id: mintNftId,
        recipient: walletAddress,
        data,
        uri: mintNftUri,
        uriHash: mintNftUriHash,
      }, fee, "Mint NFT", []);
      toast.success(`NFT minted with transaction hash: ${result.transactionHash}`);
    } catch (error) {
      toast.error(`Failed to mint NFT: ${error.message}`);
    }
  };

  const modifyNFTData = async () => {
    if (!client) return;

    const fee: StdFee = {
      amount: [{ denom: "ucore", amount: "2000" }],
      gas: "200000",
    };

    // Properly base64 encode the data
    const data = btoa(modifyNftData);  // Binary data in base64 format

    try {
      const account = await getAccountDetails();
      const sequence = account ? account.sequence : undefined;

      const result = await client.modifyData({
        id: modifyNftId,
        data,
      }, fee, "Modify NFT Data", []);
      toast.success(`NFT data modified with transaction hash: ${result.transactionHash}`);
    } catch (error) {
      toast.error(`Failed to modify NFT data: ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
          <div className="flex justify-between mb-4">
            <button
              className={`px-4 py-2 font-bold ${isMintMode ? "text-white bg-blue-500" : "text-blue-500 bg-white"} rounded hover:bg-blue-700`}
              onClick={() => setIsMintMode(true)}
            >
              Mint NFT
            </button>
            <button
              className={`px-4 py-2 font-bold ${!isMintMode ? "text-white bg-blue-500" : "text-blue-500 bg-white"} rounded hover:bg-blue-700`}
              onClick={() => setIsMintMode(false)}
            >
              Modify NFT Data
            </button>
          </div>
          {isMintMode ? (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="NFT ID"
                value={mintNftId}
                onChange={(e) => setMintNftId(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="NFT Data"
                value={mintNftData}
                onChange={(e) => setMintNftData(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="NFT URI"
                value={mintNftUri}
                onChange={(e) => setMintNftUri(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="NFT URI Hash"
                value={mintNftUriHash}
                onChange={(e) => setMintNftUriHash(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <button
                className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
                onClick={mintNFT}
              >
                Mint NFT
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="NFT ID"
                value={modifyNftId}
                onChange={(e) => setModifyNftId(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="NFT Data"
                value={modifyNftData}
                onChange={(e) => setModifyNftData(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
              <button
                className="w-full px-4 py-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700"
                onClick={modifyNFTData}
              >
                Modify NFT Data
              </button>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;

