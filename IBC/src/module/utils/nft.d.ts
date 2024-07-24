import { ClassFeature } from "../coreum/asset/nft/v1/nft";
/**
 *
 * @param features An array of NFT Class features
 * @returns An object defining which features are enabled/disabled with a boolean
 */
export declare function parseClassFeatures(features: ClassFeature[]): {
    burning: boolean;
    freezing: boolean;
    whitelisting: boolean;
    disable_sending: boolean;
};
