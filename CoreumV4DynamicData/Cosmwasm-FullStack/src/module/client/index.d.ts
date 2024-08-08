import { CoreumNetworkConfig } from "../types/coreum";
import { EncodeObject, Registry } from "@cosmjs/proto-signing";
import { ExtensionWallets, FeeCalculation, ClientQueryClient } from "../types";
import { DeliverTxResponse, StargateClient } from "@cosmjs/stargate";
import EventEmitter from "eventemitter3";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
interface WithExtensionOptions {
    withWS?: boolean;
}
interface WithMnemonicOptions {
    withWS?: boolean;
}
interface ClientProps {
    network?: string;
    custom_ws_endpoint?: string;
}
export declare class Client {
    private _tmClient;
    private _queryClient;
    private _offlineSigner;
    private _wsClient;
    private _client;
    private _address;
    private _feeModel;
    private _eventSequence;
    private _custom_ws_endpoint;
    config: CoreumNetworkConfig;
    get queryClients(): ClientQueryClient;
    constructor(props?: ClientProps);
    disconnect(): void;
    /**
     * Accessor to get the address of the current connected wallet
     * @returns A string that represents the address or undefined, if no wallet is connected.
     */
    get address(): string | undefined;
    /**
     * Accessor to get the Stargate Client
     * @returns A Stargate client or undefined if the connection hasn't been created
     */
    get stargate(): SigningCosmWasmClient | StargateClient | undefined;
    /**
     * Initializes the connection to the Chain, without a signer. Just for querying purposes
     *
     * @param options Defines the options for the connection
     *
     * If `withWS` is passed on the options object, a Websocket Connection will be created alongside the RPC client
     */
    connect(options?: {
        withWS?: boolean;
    }): Promise<void>;
    /**
     * Initializes the connection to the Chain, with the selected extension wallet as signer.
     *
     * @param extension Defines which wallet extension to use to initialize the client.
     * @param options Defines the options
     *
     * If `withWS` is passed on the options object, a WS Connection will be created alongside the RPC client
     */
    connectWithExtension(extension?: ExtensionWallets, options?: WithExtensionOptions): Promise<void>;
    /**
     * Initializes the connection to the Chain, using the Mnemonic words to create the Signer.
     *
     * @param mnemonic Defines the Mnemonic words to use to create the signer
     * @param options Defines the options
     *
     * If `withWS` is passed on the options object, a WS Connection will be created alongside the RPC client
     */
    connectWithMnemonic(mnemonic: string, options?: WithMnemonicOptions): Promise<void>;
    /**
     * Simulates the Transaction and returns the estimated gas for the transaction plus the gas price.
     *
     * @param msgs An array of messages for the transaction
     * @returns An Object that includes the following properties
     *  - fee: StdFee
     *  - gas_wanted: number
     */
    getTxFee(msgs: readonly EncodeObject[]): Promise<FeeCalculation>;
    /**
     *
     * @param transaction Transaction to be submitted
     * @returns The response of the chain
     */
    broadcastTx(transaction: Uint8Array, options?: {
        timeoutMs?: number;
        pollIntervalMs?: number;
    }): Promise<DeliverTxResponse>;
    /**
     *
     * @param msgs An array of messages for the Transaction
     * @param memo An arbitrary string to add as Memo for the transaction
     * @returns Response Object from the blockchain
     */
    sendTx(msgs: readonly EncodeObject[], memo?: string): Promise<DeliverTxResponse>;
    /**
     *
     * @param msgs An array of messages for the Transaction
     * @param memo An arbitrary string to add as Memo for the transaction
     * @returns TxRaw object to be submitted to the chain
     */
    signTx(msgs: readonly EncodeObject[], memo?: string): Promise<Uint8Array>;
    /**
     *
     * @param event String describing the event to subscribe to.
     * @returns A susbcription object with the next properties
     *  - events: EventEmitter
     *  - unsubscribe: Method to kill the subscription to the blockchain
     */
    subscribeToEvent(event: string): Promise<{
        events: EventEmitter<string | symbol, any>;
        unsubscribe: () => void;
    }>;
    /**
     *
     * @param addresses An array of addresses that should be added to the Multisig Account
     * @param threshold The minimum amount of signatures required for the transaction to be valid
     * @returns A MultisigAccount object
     */
    createMultisigAccount(addresses: string[], threshold?: number): Promise<import("../types").MultisigAccount>;
    private _getGasPrice;
    private _isSigningClientInit;
    private _initTendermintClient;
    private _initQueryClient;
    private _initFeeModel;
    private _initWsClient;
    private _createClient;
    private _connectWithKplr;
    private _connectWithCosmostation;
    private _connectWithLeap;
    /**
     *
     * @returns A Registry of the Cosmos + Coreum Custom Messages.
     */
    static getRegistry(): Registry;
}
export {};
