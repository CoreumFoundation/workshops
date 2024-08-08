import { ClassFeature } from "../coreum/asset/nft/v1/nft";
/**
 *
 * @param features An array of NFT Class features
 * @returns An object defining which features are enabled/disabled with a boolean
 */
export function parseClassFeatures(features) {
    return {
        burning: features.includes(ClassFeature["burning"]),
        freezing: features.includes(ClassFeature["freezing"]),
        whitelisting: features.includes(ClassFeature["whitelisting"]),
        disable_sending: features.includes(ClassFeature["disable_sending"]),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmZ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL25mdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFMUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxRQUF3QjtJQUN6RCxPQUFPO1FBQ0wsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxZQUFZLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0QsZUFBZSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDcEUsQ0FBQztBQUNKLENBQUMifQ==