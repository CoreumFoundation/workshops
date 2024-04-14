import { OfflineDirectSigner } from "@cosmjs/proto-signing";
import { CoreumPrefixes } from "../types/coreum";
import { MultisigAccount } from "../types";
/**
 *
 * @param address String representing an address on the Coreum blockchain
 * @returns A boolean defining if the passed address is a valid address on the Coreum Blockchain
 */
export declare const isValidCoreumAddress: (address: string) => boolean;
/**
 *
 * @param mnemonic Mnemonic words of a Cosmos SDK wallet
 * @param prefix The prefix to use - "core" | "testcore" | "devcore"
 * @returns A wallet with the default hdPath for the Coreum Blockchain, and with the selected prefix.
 */
export declare const generateWalletFromMnemonic: (mnemonic: string, prefix: CoreumPrefixes) => Promise<OfflineDirectSigner>;
export declare const generateMultisigFromPubkeys: (pubkeys: string[], threshold: number, prefix: string) => MultisigAccount;
