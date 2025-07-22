import { Token } from "../shared/types";
import coreumLogo from "../../public/coreum.svg";
import ticketLogo from "../../public/ticket.svg";

export const COREUM_TOKEN_TESTNET: Token = {
  denom: "ucore",
  symbol: "Coreum",
  subunit: "ucore",
  precision: 6,
  logo: coreumLogo,
};

export const TICKET_TOKEN_TESTNET: Token = {
  denom:
    "uticket-core1pkdpdj05g5xjvq98qxlyt6faz2p7d7vhughrnrqelu6ue3eakeaseux75g",
  symbol: "Ticket",
  subunit: "ticket",
  precision: 6,
  logo: ticketLogo,
};

export const CHAIN_ID = "coreum-mainnet-1";

export const COREUM_DOT_FUN_CONTRACT_ADDRESS =
  "core1pkdpdj05g5xjvq98qxlyt6faz2p7d7vhughrnrqelu6ue3eakeaseux75g";

export const COREUM_DOT_FUN_TICKET_PRICE = "200000000";

// {
// 	"uri": "",
// 	"@type": "/coreum.asset.ft.v1.MsgIssue",
// 	"issuer": "testcore1ghqt9ckdrvklrlcmumzqneetk0k7yplresy98s",
// 	"symbol": "TICKET",
// 	"subunit": "ticket",
// 	"features": [
// 		"burning",
// 		"minting"
// 	],
// 	"uri_hash": "",
// 	"burn_rate": "0.000000000000000000",
// 	"precision": 0,
// 	"description": "TICKET from coreum.fun",
// 	"dex_settings": null,
// 	"initial_amount": "10",
// 	"extension_settings": null,
// 	"send_commission_rate": "0.000000000000000000"
// }
