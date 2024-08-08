import { AuthExtension, MintExtension, QueryClient, StakingExtension, TxExtension } from "@cosmjs/stargate";
import { setupFTExtension } from "../coreum/extensions/ft";
import { setupNFTExtension } from "../coreum/extensions/nft";
import { setupNFTBetaExtension } from "../coreum/extensions/nftbeta";
import { FeegrantExtension, IbcExtension } from "@cosmjs/stargate/build/modules";
import { WasmExtension } from "@cosmjs/cosmwasm-stargate";
import { setupBankExtension, setupGovExtension, setupDistributionExtension } from "../cosmos/extensions";
/** @internal */
export declare enum CoreumTypeUrl {
    NFT = "/coreum.asset.nft.v1.",
    FT = "/coreum.asset.ft.v1.",
    NFTBeta = "/coreum.nft.v1beta1."
}
export interface ClientQueryClient extends QueryClient {
    ft: ReturnType<typeof setupFTExtension>["ft"];
    nft: ReturnType<typeof setupNFTExtension>["nft"];
    nftbeta: ReturnType<typeof setupNFTBetaExtension>["nftbeta"];
    bank: ReturnType<typeof setupBankExtension>["bank"];
    gov: ReturnType<typeof setupGovExtension>["gov"];
    distribution: ReturnType<typeof setupDistributionExtension>["distribution"];
    staking: StakingExtension["staking"];
    auth: AuthExtension["auth"];
    mint: MintExtension["mint"];
    feegrant: FeegrantExtension["feegrant"];
    ibc: IbcExtension["ibc"];
    wasm: WasmExtension["wasm"];
    tx: TxExtension["tx"];
}
