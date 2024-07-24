import BigNumber from "bignumber.js";
/**
 * @param ucore ucore to convert to CORE
 * @returns A string representing CORE value of ucore
 */
export const ucoreToCORE = (ucore) => {
    return new BigNumber(ucore).dividedBy(1_000_000).valueOf();
};
/**
 * @param core CORE to convert to ucore
 * @returns A string representing ucore value of CORE
 */
export const coreToUCORE = (core) => {
    return new BigNumber(core).multipliedBy(1_000_000).valueOf();
};
/**
 * @param royalty Float to convert to royalty rate format
 * @returns a string representing the float passed in royalty rate format
 */
export const parseFloatToRoyaltyRate = (royalty) => {
    const float = new BigNumber(royalty);
    return float.dividedBy(100).multipliedBy("1000000000000000000").toString();
};
/**
 *
 * @param subunit Amount of the subunit of the token to parse into full unit
 * @param precision The precision of the token; number of decimals
 * @returns The converted subunit to Unit with the passed precision
 */
export const subunitToUnit = (subunit, precision) => {
    const precisionFactor = new BigNumber(10).exponentiatedBy(precision);
    return new BigNumber(subunit).dividedBy(precisionFactor).toString();
};
/**
 *
 * @param unit Amount of the unit of the token to parse into its subunit
 * @param precision The precision of the token; number of decimals
 * @returns The converted unit to subunit with the passed precision
 */
export const unitToSubunit = (unit, precision) => {
    const precisionFactor = new BigNumber(10).exponentiatedBy(precision);
    return new BigNumber(unit).multipliedBy(precisionFactor).toString();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2NhbGN1bGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSxjQUFjLENBQUM7QUFFckM7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDM0MsT0FBTyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDN0QsQ0FBQyxDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDMUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDL0QsQ0FBQyxDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxPQUF3QixFQUFFLEVBQUU7SUFDbEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFckMsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzdFLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBZSxFQUFFLFNBQWlCLEVBQUUsRUFBRTtJQUNsRSxNQUFNLGVBQWUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckUsT0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEUsQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRSxFQUFFO0lBQy9ELE1BQU0sZUFBZSxHQUFHLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyRSxPQUFPLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN0RSxDQUFDLENBQUMifQ==