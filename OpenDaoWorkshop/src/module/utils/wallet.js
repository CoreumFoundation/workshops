import { DirectSecp256k1HdWallet, } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";
import { bech32 } from "bech32";
import { CoreumPrefixes } from "../types/coreum";
import { createMultisigThresholdPubkey, pubkeyToAddress } from "@cosmjs/amino";
/**
 *
 * @param address String representing an address on the Coreum blockchain
 * @returns A boolean defining if the passed address is a valid address on the Coreum Blockchain
 */
export const isValidCoreumAddress = (address) => {
    try {
        const { prefix = null } = bech32.decode(address);
        if (prefix !== CoreumPrefixes.MAINNET &&
            prefix !== CoreumPrefixes.DEVNET &&
            prefix !== CoreumPrefixes.TESTNET)
            return false;
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
};
/**
 *
 * @param mnemonic Mnemonic words of a Cosmos SDK wallet
 * @param prefix The prefix to use - "core" | "testcore" | "devcore"
 * @returns A wallet with the default hdPath for the Coreum Blockchain, and with the selected prefix.
 */
export const generateWalletFromMnemonic = async (mnemonic, prefix) => {
    const hdPath = "m/44'/990'/0'/0/0";
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix,
        hdPaths: [stringToPath(hdPath)],
    });
    return wallet;
};
export const generateMultisigFromPubkeys = (pubkeys, threshold, prefix) => {
    const secpPubkeys = pubkeys.map((p) => {
        return {
            type: "tendermint/PubKeySecp256k1",
            value: p,
        };
    });
    const multisigPubkey = createMultisigThresholdPubkey(secpPubkeys, threshold);
    return {
        pubkey: multisigPubkey,
        address: pubkeyToAddress(multisigPubkey, prefix),
        threshold,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL3dhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEdBRXhCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDaEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0U7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7SUFDdEQsSUFBSTtRQUNGLE1BQU0sRUFBRSxNQUFNLEdBQUcsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxJQUNFLE1BQU0sS0FBSyxjQUFjLENBQUMsT0FBTztZQUNqQyxNQUFNLEtBQUssY0FBYyxDQUFDLE1BQU07WUFDaEMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxPQUFPO1lBRWpDLE9BQU8sS0FBSyxDQUFDO1FBRWYsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUFDLE9BQU8sQ0FBTSxFQUFFO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDLENBQUM7QUFFRjs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHLEtBQUssRUFDN0MsUUFBZ0IsRUFDaEIsTUFBc0IsRUFDUSxFQUFFO0lBQ2hDLE1BQU0sTUFBTSxHQUFHLG1CQUFtQixDQUFDO0lBRW5DLE1BQU0sTUFBTSxHQUFHLE1BQU0sdUJBQXVCLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtRQUNsRSxNQUFNO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2hDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLENBQ3pDLE9BQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLE1BQWMsRUFDRyxFQUFFO0lBQ25CLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNwQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLDRCQUE0QjtZQUNsQyxLQUFLLEVBQUUsQ0FBQztTQUNULENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sY0FBYyxHQUFHLDZCQUE2QixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUU3RSxPQUFPO1FBQ0wsTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFLGVBQWUsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDO1FBQ2hELFNBQVM7S0FDVixDQUFDO0FBQ0osQ0FBQyxDQUFDIn0=