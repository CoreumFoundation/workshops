declare class Signer {
    #private;
    sign(): Promise<void>;
    requestConnection(): Promise<any>;
}
export default Signer;
