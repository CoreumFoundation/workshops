package main

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	// sdkmath "cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/gorilla/mux"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	"github.com/CoreumFoundation/coreum/v4/pkg/client"
	coreumconfig "github.com/CoreumFoundation/coreum/v4/pkg/config"
	"github.com/CoreumFoundation/coreum/v4/pkg/config/constant"
	assetfttypes "github.com/CoreumFoundation/coreum/v4/x/asset/ft/types"
	"github.com/rs/cors"
)

const (
	// Replace it with your own mnemonic
	senderMnemonic    = "your sender mnemonic"
	recipientMnemonic = "your recipient mnemonic"

	chainID       = constant.ChainIDTest
	addressPrefix = constant.AddressPrefixTest
	nodeAddress   = "full-node.testnet-1.coreum.dev:9090"
)

type Response struct {
	Message       string `json:"message"`
	TransactionID string `json:"transaction_id"`
}

type IssueTokenRequest struct {
	Symbol        string `json:"symbol"`
	Subunit       string `json:"subunit"`
	Precision     int    `json:"precision"`
	InitialAmount string `json:"initial_amount"`
	Description   string `json:"description"`
}

type SendTokenRequest struct {
    ToAddress string      `json:"to_address"`
    Amount    json.Number `json:"amount"`
    Denom     string      `json:"denom"`
}


type ClawbackRequest struct {
	ToAddress string `json:"to_address"`
	Amount    json.Number  `json:"amount"`
	Denom     string `json:"denom"`
}

func main() {

	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount(addressPrefix, addressPrefix+"pub")
	config.SetCoinType(constant.CoinType)
	config.Seal()

	r := mux.NewRouter()

	r.HandleFunc("/api/issue-token", issueTokenHandler).Methods("POST")
	r.HandleFunc("/api/send-token", sendTokenHandler).Methods("POST")
	r.HandleFunc("/api/clawback", clawbackHandler).Methods("POST")
	r.HandleFunc("/api/balance", balanceHandler).Methods("GET")

	//cors
	handler := cors.Default().Handler(r)

	fmt.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))

}

func issueTokenHandler(w http.ResponseWriter, r *http.Request) {
	var req IssueTokenRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	clientCtx, txFactory, senderAddress, err := setupClientContext()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println("Error setting up client context:", err)
		return
	}

	initialAmountInt, err := strconv.ParseInt(req.InitialAmount, 10, 64)

	msgIssue := &assetfttypes.MsgIssue{
		Issuer:        senderAddress.String(),
		Symbol:        req.Symbol,
		Subunit:       req.Subunit,
		Precision:     uint32(req.Precision),          // Convert int to uint32
		InitialAmount: sdk.NewInt(initialAmountInt), // Using the converted int64
		Description:   req.Description,
		Features:      []assetfttypes.Feature{assetfttypes.Feature_freezing, assetfttypes.Feature_clawback},
	}

	txResponse, err := client.BroadcastTx(ctx, clientCtx.WithFromAddress(senderAddress), txFactory, msgIssue)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Printf("Error broadcasting transaction: %+v", err)
		return
	}

	json.NewEncoder(w).Encode(Response{
		Message:       "Fungible token issued successfully",
		TransactionID: txResponse.TxHash,
	})
}

func sendTokenHandler(w http.ResponseWriter, r *http.Request) {
	var req SendTokenRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	clientCtx, txFactory, senderAddress, err := setupClientContext()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println("Error setting up client context:", err)
		return
	}

	Amount, err := req.Amount.Int64()


	msgSend := &banktypes.MsgSend{
		FromAddress: senderAddress.String(),
		ToAddress:   req.ToAddress,
		Amount:      sdk.NewCoins(sdk.NewInt64Coin(req.Denom, Amount)),
	}

	txResponse, err := client.BroadcastTx(ctx, clientCtx.WithFromAddress(senderAddress), txFactory, msgSend)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Printf("Error broadcasting transaction: %+v", err)
		return
	}

	json.NewEncoder(w).Encode(Response{
		Message:       "Token sent successfully",
		TransactionID: txResponse.TxHash,
	})
}

// header is a key-value pair sent by the client to the server
// or by the server to the client
func clawbackHandler(w http.ResponseWriter, r *http.Request) {
	var req ClawbackRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	clientCtx, txFactory, senderAddress, err := setupClientContext()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println("Error setting up client context:", err)
		return
	}
	Amount, err := req.Amount.Int64()


	clawbackMsg := &assetfttypes.MsgClawback{
		Sender:  senderAddress.String(),
		Account: req.ToAddress,
		Coin:    sdk.NewCoin(req.Denom, sdk.NewInt(Amount)),
	}

	txResponse, err := client.BroadcastTx(ctx, clientCtx.WithFromAddress(senderAddress), txFactory, clawbackMsg)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Printf("Error broadcasting transaction: %+v", err)
		return
	}

	json.NewEncoder(w).Encode(Response{
		Message:       "Clawback transaction broadcasted successfully",
		TransactionID: txResponse.TxHash,
	})
}

func balanceHandler(w http.ResponseWriter, r *http.Request) {
	address := r.URL.Query().Get("address")
	denom := r.URL.Query().Get("denom")

	ctx := context.Background()
	clientCtx, _, _, err := setupClientContext()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println("Error setting up client context:", err)
		return
	}

	bankClient := banktypes.NewQueryClient(clientCtx)
	resp, err := bankClient.Balance(ctx, &banktypes.QueryBalanceRequest{
		Address: address,
		Denom:   denom,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Printf("Error querying balance: %+v", err)
		return
	}

	json.NewEncoder(w).Encode(resp.Balance)
}

func setupClientContext() (client.Context, client.Factory, sdk.AccAddress, error) {
	modules := module.NewBasicManager(
		auth.AppModuleBasic{},
	)

	grpcClient, err := grpc.Dial(
		nodeAddress,
		grpc.WithTransportCredentials(credentials.NewTLS(&tls.Config{MinVersion: tls.VersionTLS12})),
		grpc.WithDefaultCallOptions(
			grpc.MaxCallRecvMsgSize(1024*1024*100), // Increase max receive message size to 100MB
			grpc.MaxCallSendMsgSize(1024*1024*100), // Increase max send message size to 100MB
		),
	)
	if err != nil {
		return client.Context{}, client.Factory{}, nil, fmt.Errorf("failed to dial gRPC server: %w", err)
	}

	encodingConfig := coreumconfig.NewEncodingConfig(modules)

	//Sets up an in-memory keyring for managing keys.
	//encodingConfig.Codec is used to encode and decode the keys.

	clientCtx := client.NewContext(client.DefaultContextConfig(), modules).
		WithChainID(string(chainID)).
		WithGRPCClient(grpcClient).
		WithKeyring(keyring.NewInMemory(encodingConfig.Codec)).
		WithBroadcastMode(flags.BroadcastSync).
		WithAwaitTx(true)

	txFactory := client.Factory{}.
		WithKeybase(clientCtx.Keyring()).
		WithChainID(clientCtx.ChainID()).
		WithTxConfig(clientCtx.TxConfig()).
		WithSimulateAndExecute(true)

	senderInfo, err := clientCtx.Keyring().NewAccount(
		"key-name",
		senderMnemonic,
		"",
		sdk.GetConfig().GetFullBIP44Path(),
		hd.Secp256k1,
	)
	if err != nil {
		return client.Context{}, client.Factory{}, nil, fmt.Errorf("failed to create new account: %w", err)
	}

	senderAddress, err := senderInfo.GetAddress()
	if err != nil {
		return client.Context{}, client.Factory{}, nil, fmt.Errorf("failed to get sender address: %w", err)
	}

	return clientCtx, txFactory, senderAddress, nil
}
