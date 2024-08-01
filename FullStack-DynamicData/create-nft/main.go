package main

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/cosmos/cosmos-sdk/client/flags"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/nft"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"

	"github.com/CoreumFoundation/coreum/v4/pkg/client"
	coreumconfig "github.com/CoreumFoundation/coreum/v4/pkg/config"
	"github.com/CoreumFoundation/coreum/v4/pkg/config/constant"
	assetnfttypes "github.com/CoreumFoundation/coreum/v4/x/asset/nft/types"
)

const (
	senderMnemonic = "rough olympic update gloom play squirrel license pride cup hazard onion effort"
	chainID        = constant.ChainIDTest
	addressPrefix  = constant.AddressPrefixTest
	nodeAddress    = "full-node.testnet-1.coreum.dev:9090"
)

type Response struct {
	Message       string `json:"message"`
	TransactionID string `json:"transaction_id"`
}

type CreateNFTClassRequest struct {
	ClassSymbol      string `json:"classSymbol"`
	ClassName        string `json:"className"`
	ClassDescription string `json:"classDescription"`
}

type MintNFTRequest struct {
	ClassSymbol string `json:"classSymbol"`
	NFTID       string `json:"nftID"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type UpdateNFTDataRequest struct {
	ClassID     string `json:"classID"`
	NFTID       string `json:"nftID"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func main() {
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount(addressPrefix, addressPrefix+"pub")
	config.SetCoinType(constant.CoinType)
	config.Seal()

	r := mux.NewRouter()

	r.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
		response := Response{Message: "Hello from Go!"}
		json.NewEncoder(w).Encode(response)
	}).Methods("GET")

	r.HandleFunc("/api/create-class", createNFTClassHandler).Methods("POST")
	r.HandleFunc("/api/mint", mintNFTHandler).Methods("POST")
	r.HandleFunc("/api/update", updateNFTDataHandler).Methods("POST")

	handler := cors.Default().Handler(r)

	fmt.Println("Server started at :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func createNFTClassHandler(w http.ResponseWriter, r *http.Request) {
	var req CreateNFTClassRequest
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

	msgIssueClass := &assetnfttypes.MsgIssueClass{
		Issuer:      senderAddress.String(),
		Symbol:      req.ClassSymbol,
		Name:        req.ClassName,
		Description: req.ClassDescription,
		Features:    []assetnfttypes.ClassFeature{assetnfttypes.ClassFeature_freezing},
	}

	txResponse, err := client.BroadcastTx(ctx, clientCtx.WithFromAddress(senderAddress), txFactory, msgIssueClass)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Println("Error broadcasting transaction:", err)
		return
	}

	json.NewEncoder(w).Encode(Response{
		Message:       "NFT class created successfully",
		TransactionID: txResponse.TxHash,
	})
}

func mintNFTHandler(w http.ResponseWriter, r *http.Request) {
	var req MintNFTRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	clientCtx, txFactory, senderAddress, err := setupClientContext()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonData := []byte(fmt.Sprintf(`{"name": "%s", "description": "%s"}`, req.Name, req.Description))
	dataDynamic := assetnfttypes.DataDynamic{
		Items: []assetnfttypes.DataDynamicItem{
			{
				Editors: []assetnfttypes.DataEditor{assetnfttypes.DataEditor_owner},
				Data:    jsonData,
			},
		},
	}
	anyData, err := codectypes.NewAnyWithValue(&dataDynamic)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	classID := assetnfttypes.BuildClassID(req.ClassSymbol, senderAddress)
	msgMint := &assetnfttypes.MsgMint{
		Sender:  senderAddress.String(),
		ClassID: classID,
		ID:      req.NFTID,
		Data:    anyData,
	}

	txResponse, err := client.BroadcastTx(ctx, clientCtx.WithFromAddress(senderAddress), txFactory, msgMint)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	nftClient := nft.NewQueryClient(clientCtx)
	resp, err := nftClient.Owner(ctx, &nft.QueryOwnerRequest{
		ClassId: classID,
		Id:      req.NFTID,
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(Response{
		Message:       fmt.Sprintf("NFT minted successfully. Owner: %s", resp.Owner),
		TransactionID: txResponse.TxHash,
	})
}

func updateNFTDataHandler(w http.ResponseWriter, r *http.Request) {
	var req UpdateNFTDataRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	clientCtx, txFactory, senderAddress, err := setupClientContext()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonData := []byte(fmt.Sprintf(`{"name": "%s", "description": "%s"}`, req.Name, req.Description))
	dataDynamic := assetnfttypes.DataDynamic{
		Items: []assetnfttypes.DataDynamicItem{
			{
				Editors: []assetnfttypes.DataEditor{assetnfttypes.DataEditor_owner},
				Data:    jsonData,
			},
		},
	}
	anyData, err := codectypes.NewAnyWithValue(&dataDynamic)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	msgUpdateData := &assetnfttypes.MsgUpdateData{
		Sender:  senderAddress.String(),
		ClassID: req.ClassID,
		ID:      req.NFTID,
		Items: []assetnfttypes.DataDynamicIndexedItem{
			{
				Index: 0,
				Data:  anyData.Value,
			},
		},
	}

	txResponse, err := client.BroadcastTx(ctx, clientCtx.WithFromAddress(senderAddress), txFactory, msgUpdateData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(Response{
		Message:       "NFT data updated successfully",
		TransactionID: txResponse.TxHash,
	})
}

func setupClientContext() (client.Context, client.Factory, sdk.AccAddress, error) {
	modules := module.NewBasicManager(
		auth.AppModuleBasic{},
	)

	grpcClient, err := grpc.Dial(
		nodeAddress,
		grpc.WithTransportCredentials(credentials.NewTLS(&tls.Config{MinVersion: tls.VersionTLS12})),
		grpc.WithDefaultCallOptions(grpc.MaxCallRecvMsgSize(1024*1024*20)), // Increase max message size to 20MB
	)
	if err != nil {
		return client.Context{}, client.Factory{}, nil, err
	}

	encodingConfig := coreumconfig.NewEncodingConfig(modules)

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
		return client.Context{}, client.Factory{}, nil, err
	}

	senderAddress, err := senderInfo.GetAddress()
	if err != nil {
		return client.Context{}, client.Factory{}, nil, err
	}

	return clientCtx, txFactory, senderAddress, nil
}

