interface SubscriptionEvents {
    [key: string]: string[];
}
/**
 * @param events Subscription events
 * @returns A well-defined object showcasing all the events of a subscription
 */
export declare const parseSubscriptionEvents: (events: SubscriptionEvents) => any;
export {};
