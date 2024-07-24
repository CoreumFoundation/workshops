import { coreumRegistry } from "../coreum";
import { cosmwasmRegistry } from "../wasm/v1";
import { setupFTExtension } from "../coreum/extensions/ft";
import { setupNFTExtension } from "../coreum/extensions/nft";
import { setupNFTBetaExtension } from "../coreum/extensions/nftbeta";
import { connectKeplr, connectCosmostation, getCosmosOfflineSigner, connectLeap, getLeapOfflineSigner, } from "../services";
import { COREUM_CONFIG } from "../types/coreum";
import { QueryClientImpl as FeeModelClient } from "../coreum/feemodel/v1/query";
import { Registry, } from "@cosmjs/proto-signing";
import { Tendermint34Client, WebsocketClient } from "@cosmjs/tendermint-rpc";
import { TxRaw } from "../cosmos";
import { ExtensionWallets } from "../types";
import { generateWalletFromMnemonic, generateMultisigFromPubkeys, } from "../utils";
import { GasPrice, QueryClient, StargateClient, calculateFee, createProtobufRpcClient, decodeCosmosSdkDecFromProto, defaultRegistryTypes, setupAuthExtension, setupFeegrantExtension, setupIbcExtension, setupMintExtension, setupStakingExtension, setupTxExtension, } from "@cosmjs/stargate";
import { setupBankExtension, setupGovExtension, setupDistributionExtension, } from "../cosmos/extensions";
import EventEmitter from "eventemitter3";
import { parseSubscriptionEvents } from "../utils/event";
import { cosmos } from "@cosmostation/extension-client";
import { SigningCosmWasmClient, setupWasmExtension, } from "@cosmjs/cosmwasm-stargate";
import BigNumber from "bignumber.js";
function isSigningClient(object) {
    return "signAndBroadcast" in object;
}
export class Client {
    _tmClient;
    _queryClient;
    _offlineSigner;
    _wsClient;
    _client;
    _address;
    _feeModel;
    _eventSequence = 0;
    _custom_ws_endpoint;
    config;
    get queryClients() {
        return this._queryClient;
    }
    constructor(props) {
        this.config = props?.network
            ? COREUM_CONFIG[props.network]
            : COREUM_CONFIG.mainnet;
        this._custom_ws_endpoint = props?.custom_ws_endpoint || undefined;
    }
    disconnect() {
        this._client.disconnect();
        this._client = undefined;
        this._tmClient.disconnect();
        this._tmClient = undefined;
        this._address = undefined;
        this._queryClient = undefined;
        this._eventSequence = 0;
        this._feeModel = undefined;
    }
    /**
     * Accessor to get the address of the current connected wallet
     * @returns A string that represents the address or undefined, if no wallet is connected.
     */
    get address() {
        return this._address;
    }
    /**
     * Accessor to get the Stargate Client
     * @returns A Stargate client or undefined if the connection hasn't been created
     */
    get stargate() {
        return this._client;
    }
    /**
     * Initializes the connection to the Chain, without a signer. Just for querying purposes
     *
     * @param options Defines the options for the connection
     *
     * If `withWS` is passed on the options object, a Websocket Connection will be created alongside the RPC client
     */
    async connect(options) {
        await this._initTendermintClient(this.config.chain_rpc_endpoint);
        await this._createClient();
        this._initQueryClient();
        this._initFeeModel();
        if (options?.withWS) {
            await this._initWsClient(this._custom_ws_endpoint || this.config.chain_ws_endpoint);
        }
    }
    /**
     * Initializes the connection to the Chain, with the selected extension wallet as signer.
     *
     * @param extension Defines which wallet extension to use to initialize the client.
     * @param options Defines the options
     *
     * If `withWS` is passed on the options object, a WS Connection will be created alongside the RPC client
     */
    async connectWithExtension(extension = ExtensionWallets.KEPLR, options) {
        switch (extension) {
            case ExtensionWallets.COSMOSTATION:
                await this._connectWithCosmostation();
                break;
            case ExtensionWallets.LEAP:
                await this._connectWithLeap();
                break;
            default:
                await this._connectWithKplr();
        }
        await this._initTendermintClient(this.config.chain_rpc_endpoint);
        this._initQueryClient();
        this._initFeeModel();
        if (options?.withWS) {
            await this._initWsClient(this.config.chain_ws_endpoint);
        }
    }
    /**
     * Initializes the connection to the Chain, using the Mnemonic words to create the Signer.
     *
     * @param mnemonic Defines the Mnemonic words to use to create the signer
     * @param options Defines the options
     *
     * If `withWS` is passed on the options object, a WS Connection will be created alongside the RPC client
     */
    async connectWithMnemonic(mnemonic, options) {
        try {
            const offlineSigner = await generateWalletFromMnemonic(mnemonic, this.config.chain_bech32_prefix);
            await this._initTendermintClient(this.config.chain_rpc_endpoint);
            this._initQueryClient();
            this._initFeeModel();
            await this._createClient(offlineSigner);
            if (options?.withWS) {
                await this._initWsClient(this.config.chain_ws_endpoint);
            }
        }
        catch (e) {
            throw {
                thrower: e.thrower || "connectWithMnemonic",
                error: e,
            };
        }
    }
    /**
     * Simulates the Transaction and returns the estimated gas for the transaction plus the gas price.
     *
     * @param msgs An array of messages for the transaction
     * @returns An Object that includes the following properties
     *  - fee: StdFee
     *  - gas_wanted: number
     */
    async getTxFee(msgs) {
        this._isSigningClientInit();
        const signer = this._client;
        const gasPrice = await this._getGasPrice();
        const gas_wanted = await signer.simulate(this._address, msgs, "");
        const total_gas_wanted = new BigNumber(gas_wanted)
            .multipliedBy(1.2)
            .integerValue()
            .toNumber();
        return {
            gas_wanted: total_gas_wanted,
            fee: calculateFee(total_gas_wanted, gasPrice),
        };
    }
    /**
     *
     * @param transaction Transaction to be submitted
     * @returns The response of the chain
     */
    async broadcastTx(transaction, options) {
        try {
            return await this._client.broadcastTx(transaction, options?.timeoutMs || undefined, options?.pollIntervalMs || undefined);
        }
        catch (e) {
            throw {
                thrower: e.thrower || "broadcastTx",
                error: e.error || e,
            };
        }
    }
    /**
     *
     * @param msgs An array of messages for the Transaction
     * @param memo An arbitrary string to add as Memo for the transaction
     * @returns Response Object from the blockchain
     */
    async sendTx(msgs, memo) {
        try {
            this._isSigningClientInit();
            const { fee } = await this.getTxFee(msgs);
            return await this._client.signAndBroadcast(this._address, msgs, fee, memo || "");
        }
        catch (e) {
            throw {
                thrower: "sendTx",
                error: e,
            };
        }
    }
    /**
     *
     * @param msgs An array of messages for the Transaction
     * @param memo An arbitrary string to add as Memo for the transaction
     * @returns TxRaw object to be submitted to the chain
     */
    async signTx(msgs, memo) {
        try {
            this._isSigningClientInit();
            const signingClient = this._client;
            const { accountNumber, sequence } = await this._client.getAccount(this.address);
            const { fee } = await this.getTxFee(msgs);
            const signerData = {
                accountNumber,
                sequence,
                chainId: this.config.chain_id,
            };
            const signed = await signingClient.sign(this.address, msgs, fee, memo || "", signerData);
            return TxRaw.encode(signed).finish();
        }
        catch (e) {
            throw {
                thrower: e.thrower || "addSignature",
                error: e.error || e,
            };
        }
    }
    /**
     *
     * @param event String describing the event to subscribe to.
     * @returns A susbcription object with the next properties
     *  - events: EventEmitter
     *  - unsubscribe: Method to kill the subscription to the blockchain
     */
    async subscribeToEvent(event) {
        try {
            if (this._wsClient === undefined)
                throw new Error("No Websocket client initialized");
            const emitter = new EventEmitter();
            const stream = this._wsClient.listen({
                jsonrpc: "2.0",
                method: "subscribe",
                id: this._eventSequence,
                params: { query: event },
            });
            const listener = {
                next(x) {
                    emitter.emit(event, {
                        data: x.data,
                        events: x.events ? parseSubscriptionEvents(x.events) : x,
                    });
                },
                error(err) {
                    emitter.emit("subscription-error", err);
                },
                complete() {
                    emitter.emit("subscription-complete", {
                        event,
                    });
                },
            };
            const subscription = stream.subscribe(listener);
            this._eventSequence++;
            return {
                events: emitter,
                unsubscribe: subscription.unsubscribe,
            };
        }
        catch (e) {
            throw {
                thrower: e.thrower || "subscribeToEvent",
                error: e,
            };
        }
    }
    /**
     *
     * @param addresses An array of addresses that should be added to the Multisig Account
     * @param threshold The minimum amount of signatures required for the transaction to be valid
     * @returns A MultisigAccount object
     */
    async createMultisigAccount(addresses, threshold = 2) {
        try {
            if (addresses.length < 2)
                throw {
                    thrower: "createMultisigAccount",
                    error: new Error("addresses param must be at least of length: 2"),
                };
            const pubkeys = [];
            for (var i = 0; i < addresses.length; i++) {
                const account = await this._client.getAccount(addresses[i]);
                console.log(addresses[i] + " data => ", account);
                if (!account || !account.pubkey)
                    throw {
                        thrower: "createMultisigAccount",
                        error: new Error(addresses[i] +
                            " has no pubkey on chain, this address will need to send a transaction to appear on chain."),
                    };
                pubkeys.push(account.pubkey.value);
            }
            return generateMultisigFromPubkeys(pubkeys, threshold, this.config.chain_bech32_prefix);
        }
        catch (e) {
            throw {
                thrower: e.thrower || "createMultisigAccount",
                error: e.error || e,
            };
        }
    }
    async _getGasPrice() {
        const gasPriceMultiplier = 1.1;
        // the param can be change via governance
        const feemodelParams = await this._feeModel.Params({});
        const minGasPriceRes = await this._feeModel.MinGasPrice({});
        const minGasPrice = decodeCosmosSdkDecFromProto(minGasPriceRes.minGasPrice?.amount || "");
        let gasPrice = minGasPrice.toFloatApproximation() * gasPriceMultiplier;
        const initialGasPrice = decodeCosmosSdkDecFromProto(feemodelParams.params?.model?.initialGasPrice || "").toFloatApproximation();
        if (gasPrice > initialGasPrice) {
            gasPrice = initialGasPrice;
        }
        return GasPrice.fromString(`${gasPrice}${minGasPriceRes.minGasPrice?.denom || ""}`);
    }
    _isSigningClientInit() {
        if (!this._client || !isSigningClient(this._client))
            throw new Error("Signing Client is not initialized");
    }
    async _initTendermintClient(rpcEndpoint) {
        this._tmClient = await Tendermint34Client.connect(rpcEndpoint);
    }
    _initQueryClient() {
        this._queryClient = QueryClient.withExtensions(this._tmClient, setupFTExtension, setupNFTExtension, setupNFTBetaExtension, setupStakingExtension, setupBankExtension, setupDistributionExtension, setupTxExtension, setupAuthExtension, setupMintExtension, setupFeegrantExtension, setupGovExtension, setupIbcExtension, setupWasmExtension);
    }
    _initFeeModel() {
        const rpcClient = createProtobufRpcClient(this._queryClient);
        this._feeModel = new FeeModelClient(rpcClient);
    }
    async _initWsClient(wsEndpoint) {
        this._wsClient = new WebsocketClient(wsEndpoint);
        this.subscribeToEvent("tm.event='NewBlock'");
    }
    async _createClient(offlineSigner) {
        try {
            if (!offlineSigner) {
                this._client = await StargateClient.create(this._tmClient);
                return;
            }
            const [{ address }] = await offlineSigner.getAccounts();
            this._address = address;
            const registry = Client.getRegistry();
            // OfflineSigner
            this._offlineSigner = offlineSigner;
            // signing client
            this._client = await SigningCosmWasmClient.connectWithSigner(this.config.chain_rpc_endpoint, offlineSigner, {
                registry: registry,
                gasPrice: GasPrice.fromString(this.config.gas_price),
            });
        }
        catch (e) {
            throw {
                thrower: e.thrower || "_createClient",
                error: e,
            };
        }
    }
    async _connectWithKplr() {
        try {
            await connectKeplr(this.config);
            await window.keplr.enable(this.config.chain_id);
            // get offline signer for signing txs
            const offlineSigner = await window.getOfflineSigner(this.config.chain_id);
            await this._createClient(offlineSigner);
        }
        catch (e) {
            throw {
                thrower: "_connectWithKplr",
                error: e,
            };
        }
    }
    async _connectWithCosmostation() {
        try {
            await connectCosmostation(this.config);
            const provider = await cosmos();
            await provider.requestAccount(this.config.chain_name);
            const offlineSigner = await getCosmosOfflineSigner(this.config.chain_id);
            await this._createClient(offlineSigner);
        }
        catch (e) {
            throw {
                thrower: e.thrower || "_connectWithCosmosation",
                error: e,
            };
        }
    }
    async _connectWithLeap() {
        // throw new Error("Leap extension connected not yet implemented");
        try {
            await connectLeap(this.config);
            const offlineSigner = await getLeapOfflineSigner(this.config.chain_id);
            await this._createClient(offlineSigner);
        }
        catch (e) {
            throw {
                thrower: e.thrower || "_connectWithLeap",
                error: e,
            };
        }
    }
    /**
     *
     * @returns A Registry of the Cosmos + Coreum Custom Messages.
     */
    static getRegistry() {
        // register default and custom messages
        let registryTypes = [
            ...defaultRegistryTypes,
            ...coreumRegistry,
            ...cosmwasmRegistry,
        ];
        return new Registry(registryTypes);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2xpZW50L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3JFLE9BQU8sRUFDTCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN0QixXQUFXLEVBQ1gsb0JBQW9CLEdBQ3JCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxhQUFhLEVBQXVCLE1BQU0saUJBQWlCLENBQUM7QUFDckUsT0FBTyxFQUFFLGVBQWUsSUFBSSxjQUFjLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRixPQUFPLEVBSUwsUUFBUSxHQUNULE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFFLGdCQUFnQixFQUFxQyxNQUFNLFVBQVUsQ0FBQztBQUMvRSxPQUFPLEVBQ0wsMEJBQTBCLEVBQzFCLDJCQUEyQixHQUM1QixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBRUwsUUFBUSxFQUNSLFdBQVcsRUFDWCxjQUFjLEVBQ2QsWUFBWSxFQUNaLHVCQUF1QixFQUN2QiwyQkFBMkIsRUFDM0Isb0JBQW9CLEVBQ3BCLGtCQUFrQixFQUNsQixzQkFBc0IsRUFDdEIsaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsZ0JBQWdCLEdBQ2pCLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixpQkFBaUIsRUFDakIsMEJBQTBCLEdBQzNCLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxZQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4RCxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLGtCQUFrQixHQUNuQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sU0FBUyxNQUFNLGNBQWMsQ0FBQztBQUlyQyxTQUFTLGVBQWUsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sa0JBQWtCLElBQUksTUFBTSxDQUFDO0FBQ3RDLENBQUM7QUFlRCxNQUFNLE9BQU8sTUFBTTtJQUNULFNBQVMsQ0FBaUM7SUFDMUMsWUFBWSxDQUFnQztJQUM1QyxjQUFjLENBQTRCO0lBQzFDLFNBQVMsQ0FBOEI7SUFDdkMsT0FBTyxDQUFxRDtJQUM1RCxRQUFRLENBQXFCO0lBQzdCLFNBQVMsQ0FBNkI7SUFDdEMsY0FBYyxHQUFXLENBQUMsQ0FBQztJQUMzQixtQkFBbUIsQ0FBUztJQUVwQyxNQUFNLENBQXNCO0lBRTVCLElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsWUFBWSxLQUFtQjtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRSxPQUFPO1lBQzFCLENBQUMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUM5QixDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUUxQixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxFQUFFLGtCQUFrQixJQUFJLFNBQVMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBOEI7UUFDMUMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLE9BQU8sRUFBRSxNQUFNLEVBQUU7WUFDbkIsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUN0QixJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FDMUQsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQ3hCLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQ2xDLE9BQThCO1FBRTlCLFFBQVEsU0FBUyxFQUFFO1lBQ2pCLEtBQUssZ0JBQWdCLENBQUMsWUFBWTtnQkFDaEMsTUFBTSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFDdEMsTUFBTTtZQUNSLEtBQUssZ0JBQWdCLENBQUMsSUFBSTtnQkFDeEIsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDOUIsTUFBTTtZQUNSO2dCQUNFLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDakM7UUFFRCxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLElBQUksT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUNuQixNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsbUJBQW1CLENBQUMsUUFBZ0IsRUFBRSxPQUE2QjtRQUN2RSxJQUFJO1lBQ0YsTUFBTSxhQUFhLEdBQUcsTUFBTSwwQkFBMEIsQ0FDcEQsUUFBUSxFQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQ2hDLENBQUM7WUFFRixNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV4QyxJQUFJLE9BQU8sRUFBRSxNQUFNLEVBQUU7Z0JBQ25CLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7YUFDekQ7U0FDRjtRQUFDLE9BQU8sQ0FBTSxFQUFFO1lBQ2YsTUFBTTtnQkFDSixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxxQkFBcUI7Z0JBQzNDLEtBQUssRUFBRSxDQUFDO2FBQ1QsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLElBQTZCO1FBQzFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFnQyxDQUFDO1FBRXJELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTNDLE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVsRSxNQUFNLGdCQUFnQixHQUFHLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQzthQUMvQyxZQUFZLENBQUMsR0FBRyxDQUFDO2FBQ2pCLFlBQVksRUFBRTthQUNkLFFBQVEsRUFBRSxDQUFDO1FBRWQsT0FBTztZQUNMLFVBQVUsRUFBRSxnQkFBZ0I7WUFDNUIsR0FBRyxFQUFFLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUM7U0FDOUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FDZixXQUF1QixFQUN2QixPQUF5RDtRQUV6RCxJQUFJO1lBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUNuQyxXQUFXLEVBQ1gsT0FBTyxFQUFFLFNBQVMsSUFBSSxTQUFTLEVBQy9CLE9BQU8sRUFBRSxjQUFjLElBQUksU0FBUyxDQUNyQyxDQUFDO1NBQ0g7UUFBQyxPQUFPLENBQU0sRUFBRTtZQUNmLE1BQU07Z0JBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksYUFBYTtnQkFDbkMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQzthQUNwQixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUNWLElBQTZCLEVBQzdCLElBQWE7UUFFYixJQUFJO1lBQ0YsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFFNUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxQyxPQUFPLE1BQU8sSUFBSSxDQUFDLE9BQWlDLENBQUMsZ0JBQWdCLENBQ25FLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxFQUNKLEdBQUcsRUFDSCxJQUFJLElBQUksRUFBRSxDQUNYLENBQUM7U0FDSDtRQUFDLE9BQU8sQ0FBTSxFQUFFO1lBQ2YsTUFBTTtnQkFDSixPQUFPLEVBQUUsUUFBUTtnQkFDakIsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQTZCLEVBQUUsSUFBYTtRQUN2RCxJQUFJO1lBQ0YsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFFNUIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQWdDLENBQUM7WUFFNUQsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUMvRCxJQUFJLENBQUMsT0FBTyxDQUNiLENBQUM7WUFDRixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFDLE1BQU0sVUFBVSxHQUFHO2dCQUNqQixhQUFhO2dCQUNiLFFBQVE7Z0JBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTthQUM5QixDQUFDO1lBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUNyQyxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksRUFDSixHQUFHLEVBQ0gsSUFBSSxJQUFJLEVBQUUsRUFDVixVQUFVLENBQ1gsQ0FBQztZQUVGLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0QztRQUFDLE9BQU8sQ0FBTSxFQUFFO1lBQ2YsTUFBTTtnQkFDSixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxjQUFjO2dCQUNwQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDO2FBQ3BCLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsS0FBYTtRQUNsQyxJQUFJO1lBQ0YsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVM7Z0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUVyRCxNQUFNLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBRW5DLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsS0FBSztnQkFDZCxNQUFNLEVBQUUsV0FBVztnQkFDbkIsRUFBRSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUN2QixNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2FBQ3pCLENBQUMsQ0FBQztZQUVILE1BQU0sUUFBUSxHQUFHO2dCQUNmLElBQUksQ0FBQyxDQUFNO29CQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNsQixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7d0JBQ1osTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDekQsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsS0FBSyxDQUFDLEdBQVE7b0JBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztnQkFDRCxRQUFRO29CQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7d0JBQ3BDLEtBQUs7cUJBQ04sQ0FBQyxDQUFDO2dCQUNMLENBQUM7YUFDRixDQUFDO1lBRUYsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFdEIsT0FBTztnQkFDTCxNQUFNLEVBQUUsT0FBTztnQkFDZixXQUFXLEVBQUUsWUFBWSxDQUFDLFdBQVc7YUFDdEMsQ0FBQztTQUNIO1FBQUMsT0FBTyxDQUFNLEVBQUU7WUFDZixNQUFNO2dCQUNKLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLGtCQUFrQjtnQkFDeEMsS0FBSyxFQUFFLENBQUM7YUFDVCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMscUJBQXFCLENBQUMsU0FBbUIsRUFBRSxTQUFTLEdBQUcsQ0FBQztRQUM1RCxJQUFJO1lBQ0YsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ3RCLE1BQU07b0JBQ0osT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDO2lCQUNsRSxDQUFDO1lBRUosTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRW5CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6QyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RCxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRWpELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtvQkFDN0IsTUFBTTt3QkFDSixPQUFPLEVBQUUsdUJBQXVCO3dCQUNoQyxLQUFLLEVBQUUsSUFBSSxLQUFLLENBQ2QsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFDViwyRkFBMkYsQ0FDOUY7cUJBQ0YsQ0FBQztnQkFFSixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEM7WUFFRCxPQUFPLDJCQUEyQixDQUNoQyxPQUFPLEVBQ1AsU0FBUyxFQUNULElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQ2hDLENBQUM7U0FDSDtRQUFDLE9BQU8sQ0FBTSxFQUFFO1lBQ2YsTUFBTTtnQkFDSixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSx1QkFBdUI7Z0JBQzdDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7YUFDcEIsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVPLEtBQUssQ0FBQyxZQUFZO1FBQ3hCLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1FBQy9CLHlDQUF5QztRQUN6QyxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUQsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLENBQzdDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsTUFBTSxJQUFJLEVBQUUsQ0FDekMsQ0FBQztRQUNGLElBQUksUUFBUSxHQUFHLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLGtCQUFrQixDQUFDO1FBRXZFLE1BQU0sZUFBZSxHQUFHLDJCQUEyQixDQUNqRCxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxlQUFlLElBQUksRUFBRSxDQUNwRCxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDekIsSUFBSSxRQUFRLEdBQUcsZUFBZSxFQUFFO1lBQzlCLFFBQVEsR0FBRyxlQUFlLENBQUM7U0FDNUI7UUFFRCxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQ3hCLEdBQUcsUUFBUSxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLEVBQUUsRUFBRSxDQUN4RCxDQUFDO0lBQ0osQ0FBQztJQUVPLG9CQUFvQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRU8sS0FBSyxDQUFDLHFCQUFxQixDQUFDLFdBQW1CO1FBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxjQUFjLENBQzVDLElBQUksQ0FBQyxTQUFTLEVBQ2QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixxQkFBcUIsRUFDckIscUJBQXFCLEVBQ3JCLGtCQUFrQixFQUNsQiwwQkFBMEIsRUFDMUIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsa0JBQWtCLENBQ25CLENBQUM7SUFDSixDQUFDO0lBRU8sYUFBYTtRQUNuQixNQUFNLFNBQVMsR0FBRyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxVQUFrQjtRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQTZCO1FBQ3ZELElBQUk7WUFDRixJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNELE9BQU87YUFDUjtZQUVELE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsTUFBTSxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFFeEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRXRDLGdCQUFnQjtZQUNoQixJQUFJLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUNwQyxpQkFBaUI7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLHFCQUFxQixDQUFDLGlCQUFpQixDQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUM5QixhQUFhLEVBQ2I7Z0JBQ0UsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCLFFBQVEsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQ3JELENBQ0YsQ0FBQztTQUNIO1FBQUMsT0FBTyxDQUFNLEVBQUU7WUFDZixNQUFNO2dCQUNKLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLGVBQWU7Z0JBQ3JDLEtBQUssRUFBRSxDQUFDO2FBQ1QsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVPLEtBQUssQ0FBQyxnQkFBZ0I7UUFDNUIsSUFBSTtZQUNGLE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVoQyxNQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEQscUNBQXFDO1lBQ3JDLE1BQU0sYUFBYSxHQUFHLE1BQU8sTUFBYyxDQUFDLGdCQUFnQixDQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDckIsQ0FBQztZQUVGLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN6QztRQUFDLE9BQU8sQ0FBTSxFQUFFO1lBQ2YsTUFBTTtnQkFDSixPQUFPLEVBQUUsa0JBQWtCO2dCQUMzQixLQUFLLEVBQUUsQ0FBQzthQUNULENBQUM7U0FDSDtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsd0JBQXdCO1FBQ3BDLElBQUk7WUFDRixNQUFNLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sRUFBRSxDQUFDO1lBQ2hDLE1BQU0sUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXRELE1BQU0sYUFBYSxHQUFHLE1BQU0sc0JBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV6RSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDekM7UUFBQyxPQUFPLENBQU0sRUFBRTtZQUNmLE1BQU07Z0JBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUkseUJBQXlCO2dCQUMvQyxLQUFLLEVBQUUsQ0FBQzthQUNULENBQUM7U0FDSDtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsZ0JBQWdCO1FBQzVCLG1FQUFtRTtRQUNuRSxJQUFJO1lBQ0YsTUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRS9CLE1BQU0sYUFBYSxHQUFHLE1BQU0sb0JBQW9CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV2RSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDekM7UUFBQyxPQUFPLENBQU0sRUFBRTtZQUNmLE1BQU07Z0JBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksa0JBQWtCO2dCQUN4QyxLQUFLLEVBQUUsQ0FBQzthQUNULENBQUM7U0FDSDtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsV0FBVztRQUNoQix1Q0FBdUM7UUFDdkMsSUFBSSxhQUFhLEdBQTJDO1lBQzFELEdBQUcsb0JBQW9CO1lBQ3ZCLEdBQUcsY0FBYztZQUNqQixHQUFHLGdCQUFnQjtTQUNwQixDQUFDO1FBQ0YsT0FBTyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0YifQ==