import { SecretNetworkClient, Wallet } from "secretjs";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const wallet = new Wallet(process.env.MNEMONIC);
const contract_wasm = fs.readFileSync("../contract.wasm.gz");

const secretjs = new SecretNetworkClient({
  chainId: "secret-4",
  url: "https://lcd.mainnet.secretsaturn.net",
  wallet: wallet,
  walletAddress: wallet.address,
});

// Declare global variables for codeId and contractCodeHash
let codeId;
let contractCodeHash;

let upload_contract = async () => {
  let tx = await secretjs.tx.compute.storeCode(
    {
      sender: wallet.address,
      wasm_byte_code: contract_wasm,
      source: "",
      builder: "",
    },
    {
      gasLimit: 4_000_000,
    }
  );

  codeId = Number(
    tx.arrayLog.find((log) => log.type === "message" && log.key === "code_id")
      .value
  );
  console.log("codeId: ", codeId);

  contractCodeHash = (
    await secretjs.query.compute.codeHashByCodeId({ code_id: codeId })
  ).code_hash;
  console.log(`Contract hash: ${contractCodeHash}`);
};

let instantiate_contract = async () => {
  if (!codeId || !contractCodeHash) {
    throw new Error("codeId or contractCodeHash is not set.");
  }

  let tx = await secretjs.tx.compute.instantiateContract(
    {
      code_id: codeId,
      sender: wallet.address,
      code_hash: contractCodeHash,
      init_msg: {},
      label: "rng" + Math.ceil(Math.random() * 10000),
    },
    {
      gasLimit: 400_000,
    }
  );

  //Find the contract_address in the logs
  const contractAddress = tx.arrayLog.find(
    (log) => log.type === "message" && log.key === "contract_address"
  ).value;

  const response = await secretjs.query.compute.queryContract({
    contract_address: contractAddress,
    query: { get_public_key: {} },
  });
  console.log(response);

  console.log(contractAddress);
};

// Chain the execution using promises
upload_contract()
  .then(() => {
    instantiate_contract();
  })
  .catch((error) => {
    console.error("Error:", error);
  });
