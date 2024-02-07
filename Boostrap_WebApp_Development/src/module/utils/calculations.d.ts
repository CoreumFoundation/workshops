/**
 * @param ucore ucore to convert to CORE
 * @returns A string representing CORE value of ucore
 */
export declare const ucoreToCORE: (ucore: string) => string;
/**
 * @param core CORE to convert to ucore
 * @returns A string representing ucore value of CORE
 */
export declare const coreToUCORE: (core: string) => string;
/**
 * @param royalty Float to convert to royalty rate format
 * @returns a string representing the float passed in royalty rate format
 */
export declare const parseFloatToRoyaltyRate: (royalty: number | string) => string;
/**
 *
 * @param subunit Amount of the subunit of the token to parse into full unit
 * @param precision The precision of the token; number of decimals
 * @returns The converted subunit to Unit with the passed precision
 */
export declare const subunitToUnit: (subunit: string, precision: number) => string;
/**
 *
 * @param unit Amount of the unit of the token to parse into its subunit
 * @param precision The precision of the token; number of decimals
 * @returns The converted unit to subunit with the passed precision
 */
export declare const unitToSubunit: (unit: string, precision: number) => string;
