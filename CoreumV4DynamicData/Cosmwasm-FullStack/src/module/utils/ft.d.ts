import { Feature } from "../coreum/asset/ft/v1/token";
/**
 * @param features An array of Feature.
 * @returns An object defining which features are enabled/disabled with boolean
 */
export declare const parseTokenFeatures: (features: Feature[]) => {
    minting: boolean;
    freezing: boolean;
    burning: boolean;
    whitelisting: boolean;
};
