import { Feature } from "../coreum/asset/ft/v1/token";
/**
 * @param features An array of Feature.
 * @returns An object defining which features are enabled/disabled with boolean
 */
export const parseTokenFeatures = (features) => {
    return {
        minting: features.includes(Feature["minting"]),
        freezing: features.includes(Feature["freezing"]),
        burning: features.includes(Feature["burning"]),
        whitelisting: features.includes(Feature["whitelisting"]),
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXREOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLENBQUMsUUFBbUIsRUFBRSxFQUFFO0lBQ3hELE9BQU87UUFDTCxPQUFPLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxZQUFZLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDekQsQ0FBQztBQUNKLENBQUMsQ0FBQyJ9