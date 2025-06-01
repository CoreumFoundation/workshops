# Coreum.fun: The No Loss Draft

[![Website](https://img.shields.io/badge/Website-coreum.fun-blue)](https://coreum.fun)
[![X](https://img.shields.io/badge/X-coreumfun-black)](https://x.com/Coreum_dot_fun)
[![Workshop](https://img.shields.io/badge/Workshop-x.com-green)](https://x.com/helwan_mande/status/1924473913179824265)
[![Medium](https://img.shields.io/badge/Medium-article-white)](https://medium.com/@coreumlabs/introducing-coreum-fun-ac28118771a9)

This repository contains the code for the Coreum.fun website and Smart Contract - a simple and easy-to-understand implementation of a No Loss Draft on Coreum, leveraging the Coreum Orderbook DEX and Smart Tokens.

## 📋 Overview

![coreum_fun](./hero_wide.png)

### 🎯 Why We Built This

- Create a simple implementation leveraging Coreum Orderbook DEX (released in v5)
- Build a fun and engaging community application
- Increase exposure to the [Coreum Labs](https://coreum.com/labs) [validator node](https://validator.info/coreum/corevaloper14e0slqpzhgsakm6fwnh5sk6mu2dmdc9ghxhuw5)

### 🎲 What is a No Loss Draft?

A No Loss Draft is a system where user does not lose their principal if they don't win:

- Participants buy tickets at a fixed price
- All participants get their tokens back at the end of the draw
- The yield generated is used to pay winners

### ⚙️ How It Works

1. **Ticket Purchase**

   - Each ticket is a Smart Token
   - Fixed price: 200 COREUM per ticket
   - Limited supply: 500 tickets total

2. **Token Management**

   - COREUM is staked to Coreum Labs validator node
   - Tickets represent claims on the token pool
   - Yield from staking is used for payouts

3. **Trading**

   - Tickets can be traded on Coreum Orderbook DEX
   - Secondary market allows price discovery
   - Tickets can be burned to reclaim COREUM at the end of the draw

4. **Draw Process**
   - Countdown starts when all tickets are sold
   - Random number generation selects winner
   - Participants can burn tickets to reclaim COREUM

## 🔍 Key Concepts

### No Loss Draft

- Inspired by PoolTogether (2017, Ethereum)
- Participants get their tokens back after the draw
- Yield generated through validator staking
- More efficient implementation on Coreum's PoS network

### $TICKET

$TICKET is a smart token that represents ownership of a ticket in the No Loss Draft.
It can be traded on the Coreum Orderbook DEX and has the following properties:

- Minting: to mint token as they are bought by the draft participant
- Burning: to burned to tokens when the principal is returned

Learn more about Smart Tokens in the [Coreum documentation](https://docs.coreum.dev/docs/next/modules/coreum-fungible-token)

### Coreum Orderbook DEX

A permissionless Orderbook built at the protocol level of Coreum blockchain.
[Learn more about Coreum Orderbook DEX](https://github.com/CoreumFoundation/coreum/tree/master/x/dex/spec)

#### Order Attributes

Users can place orders with the following attributes:

- `order_id` - unique order identifier of the order.
- `base_denom` - when you buy, you are buying the `base_denom`, when you sell, you are selling the `base_denom`.
- `quote_denom` - when you buy, you are selling the `quote_denom`, when you sell, you are buying the `quote_denom`.
- `price` - value of one unit of the `base_denom` expressed in terms of the `quote_denom`. It indicates how much of the
  `quote_denom` is needed to buy one unit of the `base_denom`.
- `quantity` - is amount of the `base_denom` being traded.
- `side`
  - `sell` - means that the order is to sell `base_denom` `quantity` with the `price`.
  - `buy` - means that the order is to buy `base_denom` `quantity` with the `price`.
- `time_in_force` - how long an order will remain active before it is executed or expires, based on matching state.
  - `GTC` - Good Til Canceled
  - `IOC` - Immediate Or Cancel
  - `FOK` - Fill or Kill
- `good_til` - how long an order will remain active before it is executed or expires, based height or time.
  - `good_til_block_height` - max block height to execute the order, or it will be canceled.
  - `good_til_block_time` - max block time to execute the order, or it will be canceled.

![trading_pairs](./trading.png)

#### DEX Parameters

In this section we will explain the parameters of the DEX that are relevant to the No Loss Draft. More information about the DEX can be found in the [Coreum Orderbook DEX documentation](https://github.com/CoreumFoundation/coreum/tree/master/x/dex/spec)

- price_tick_size ensures that prices have a fixed minimum increment, preventing arbitrary fractional values.
- quantity_step enforces a minimum step size for base asset quantities, ensuring consistent calculations.
- quote_quantity_step provides a consistent step size for quote amounts, derived from the other two parameters.

See more here: https://docs.coreum.dev/docs/next/modules/coreum-dex/prices-and-limits

- default_unified_ref_amount: 0.000000000000000001
- price_tick_exponent: 18
- quantity_step_exponent: 1
- max_orders_per_denom: 6
- order_reserve: denom: utestcore, amount: 10000000

##### Implication for the $TICKET token

To simplify the maths $TICKET will have the same precision as COREUM (6) to avoid precision loss and to make it easier to trade with. This will be enforced by the smart contract. 
On the UI we will make sure that the user can only buy or sell full tickets.

On the other a ticket is only redeemable for $COREUMs it's a full $TICKET (meaning 1 *10^6 uticket`)

### Trading Pairs Explained

#### Base Token

- The token being bought/sold
- Quantity shown on the left side of orderbook
- Example: "100 TICKET" means trading 100 TICKET

#### Quote Token

- The token used for pricing
- Price shown on the right side of orderbook
- Example: "1.5 COREUM" means price is 1.5 COREUM per TICKET

#### Example: TICKET/COREUM Pair

- Buy TICKET → Pay in COREUM
- Sell TICKET → Receive COREUM
- Price expressed in COREUM per TICKET


## Draft lifecycle

This diagram is a detailed view of the lifecycle of a draft on Coreum.fun governed by the smart contract.

```mermaid
flowchart TD
    Start([Start]) --> State1

    State1[ticket_sell_in_progress]
    State1 --> |"All tickets sold or admin ends sale"| State2

    State2[tickets_sold_out_accumulation_in_progress]
    State2 --> |"Admin selects winner and sends rewards"| State3

    State3[winner_selected_undelegation_in_process]
    State3 --> |"7-day undelegation period completes"| State4

    State4[undelegation_completed_tokens_can_be_burned]
    State4 --> |"All tickets burned"| State5

    State5[draw_finished]
    State5 --> End([End/New Draw])

classDef stateClass fill:#f0f9ff,stroke:#333,stroke-width:2px
class State1,State2,State3,State4,State5 stateClass
```

## Architecture

### Context Diagram

This diagram is a high-level overview of the Coreum.fun application. We wanted to show the relationship between the Coreum.fun application, the Coreum Labs validator node, and the Coreum Orderbook DEX.

```mermaid
graph TD
    %% Network nodes
    TopNode((Node))
    LeftNode((Node))
    RightNode((Node))
    BottomRight((Node))
    BottomSquare[Node]
    Node63((Node))

    %% Main components
    Validator{Coreum Labs Validator}
    CoreumFun[Coreum.fun]
    SmartContract[Smart Contract]
    OrderbookDEX[Orderbook DEX]

    %% Network circular structure
    TopNode --> LeftNode
    LeftNode --> Validator
    Validator --> Node63
    Node63 --> BottomSquare
    BottomSquare --> BottomRight
    BottomRight --> RightNode
    RightNode --> TopNode

    %% Component connections
    CoreumFun -- "Send signed message" -->  Validator
    Validator -- "Buy tickets,<br/>Burn tickets" --> SmartContract
    SmartContract -- "Stake" --> Validator
    Validator -- "Buy/sell" --> OrderbookDEX

    %% Title
    subgraph Coreum Network
    end
```

### Contract

#### Sequence Diagram (Buy Ticket)

The `buy_ticket` function allows users to purchase one or many tickets. This function handles:

1. Verify the $COREUM amount sent
2. Verify that some tickets are left
3. If this was the last ticket set draw_state=tickets_sold_out_accumulation_in_progress
4. Stake the $COREUM to Coreum Labs validator
5. Mint and send the $TICKET smart token to the user
6. Update the contract internal state (map <address, number_of_ticket)
7. Emit an event that will be picked up by the indexer

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant SmartContract
    participant CoreumLabsValidator
    participant SmartTokenModule
    participant ContractState
    participant Indexer

    User->>SmartContract: Send $COREUM (buy_ticket)

    Note over SmartContract: Step 1: Verify $COREUM amount
    SmartContract->>SmartContract: Verify $COREUM amount
    SmartContract->>SmartContract: Verify tickets left > 0

    alt Amount verification failed
        SmartContract-->>User: Return error & funds
    else Amount verification passed
        Note over SmartContract: Step 2: Stake $COREUM
        SmartContract->>CoreumLabsValidator: Stake $COREUM
        CoreumLabsValidator-->>SmartContract: Acknowledge stake

        Note over SmartContract: Step 3: Mint $TICKET tokens
        SmartContract->>SmartTokenModule: Mint $TICKET smart token
        SmartTokenModule-->>User: Return minted tokens

        Note over SmartContract: Step 4: Update contract state
        SmartContract->>ContractState: Update mapping <address, number_of_tickets>
        ContractState-->>SmartContract: Confirm state update

        Note over SmartContract: Step 5: Emit event
        SmartContract->>Indexer: Emit "TicketPurchased" event
        Indexer-->>User: Event acknowledged

        SmartContract-->>User: Return success response
    end
```

#### Sequence Diagram (Select Winner and Send Funds)

The `select_winner_and_send_funds` function receives the winner's address and sends them the funds. It also handles starting the undelegation process for all the tokens:

1. Receive the winner address
2. Set the winner address
3. Send the rewards to the address
4. Start the undelegation process for all the tokens the contract has
5. Set draw_state=winner_selected_undelegation_in_process
6. Calculate the block at which the undelegation will be completed
7. Set undelegation_done_future_block


```mermaid
sequenceDiagram
    autonumber
    participant Admin
    participant SmartContract
    participant ContractState
    participant CoreumLabsValidator
    participant Treasury
    participant Winner
    participant Indexer
    participant BlockchainInfo

    Admin->>SmartContract: select_winner_and_send_funds(winner_address)

    Note over SmartContract: Step 1: Input Validation
    SmartContract->>SmartContract: Verify caller is authorized admin
    SmartContract->>ContractState: Check current draw_state
    ContractState-->>SmartContract: Return current draw_state

    alt Validation Failed
        SmartContract-->>Admin: Return error (unauthorized or invalid state)
    else Validation Passed
        Note over SmartContract: Step 2: Set Winner Address
        SmartContract->>ContractState: Set winner_address = input_address
        ContractState-->>SmartContract: Confirm winner address set

        Note over SmartContract: Step 3: Send Rewards to Winner
        SmartContract->>Treasury: Calculate winner reward amount
        Treasury-->>SmartContract: Return reward amount
        SmartContract->>Winner: Transfer reward funds
        Winner-->>SmartContract: Acknowledge receipt (implicit)

        Note over SmartContract: Step 4: Start Undelegation Process
        SmartContract->>ContractState: Get total staked amount
        ContractState-->>SmartContract: Return total_staked_coreum
        SmartContract->>CoreumLabsValidator: Undelegate all staked $COREUM
        CoreumLabsValidator-->>SmartContract: Acknowledge undelegation request

        Note over SmartContract: Step 5: Update Draw State
        SmartContract->>ContractState: Set draw_state = winner_selected_undelegation_in_process
        ContractState-->>SmartContract: Confirm state update

        Note over SmartContract: Step 6: Calculate Undelegation Completion Block
        SmartContract->>BlockchainInfo: Get current block height
        BlockchainInfo-->>SmartContract: Return current_block_height
        SmartContract->>BlockchainInfo: Get blocks per day
        BlockchainInfo-->>SmartContract: Return blocks_per_day

        Note over SmartContract: Calculation: current_block + (blocks_per_day * 7)

        Note over SmartContract: Step 7: Set Completion Block
        SmartContract->>ContractState: Set undelegation_done_future_block = calculated_block
        ContractState-->>SmartContract: Confirm future block set

        Note over SmartContract: Emit Events
        SmartContract->>Indexer: Emit "WinnerSelected" event
        Note right of Indexer: Include:<br/>- Winner address<br/>- Reward amount<br/>- Total undelegated amount<br/>- Timestamp

        SmartContract->>Indexer: Emit "UndelegationStarted" event
        Note right of Indexer: Include:<br/>- Total amount undelegated<br/>- Current block<br/>- Expected completion block<br/>- Expected completion date

        Indexer-->>SmartContract: Events acknowledged
        SmartContract-->>Admin: Return success response
    end

    Note over SmartContract: Error Handling
    opt Any step fails
        SmartContract->>SmartContract: Revert all changes
        SmartContract->>Admin: Return detailed error
        SmartContract->>Indexer: Emit "WinnerSelectionFailed" event with reason
    end
```

#### Sequence Diagram (Burn Ticket)

The `burn_tickets` function allows users to burn their tickets to get their principal back:

1. Receive the $TICKET
2. Burn the $TICKET
3. Update internal state (<address, number_of_ticket)
4. If all the tickets have been burned, set draw_state=draw_finished
5. Send back the $COREUM to the user

```mermaid
sequenceDiagram
    autonumber
    participant User
    participant SmartContract
    participant SmartTokenModule
    participant ContractState
    participant Vault
    participant Indexer

    User->>SmartContract: burn_tickets(number_of_tickets)

    Note over SmartContract: Step 1: Input Validation
    SmartContract->>SmartTokenModule: Check if user has enough tickets
    SmartTokenModule-->>SmartContract: Return user ticket balance
    SmartContract->>ContractState: Check contract state allows burning
    ContractState-->>SmartContract: Return current draw_state

    alt Validation Failed
        SmartContract-->>User: Return error message
    else Validation Passed
        Note over SmartContract: Step 2: Receive $TICKET
        SmartContract->>SmartTokenModule: Transfer $TICKET from user to contract
        SmartTokenModule-->>SmartContract: Confirm token transfer

        Note over SmartContract: Step 3: Burn $TICKET
        SmartContract->>SmartTokenModule: Burn received $TICKET tokens
        SmartTokenModule-->>SmartContract: Confirm tokens burned

        Note over SmartContract: Step 4: Update Internal State
        SmartContract->>ContractState: Update user_tickets mapping <address, number_of_tickets>
        SmartContract->>ContractState: Update total_tickets_burned counter
        ContractState-->>SmartContract: Confirm state updates

        Note over SmartContract: Step 5: Return $COREUM to User
        SmartContract->>ContractState: Calculate $COREUM amount based on tickets burned
        ContractState-->>SmartContract: Return calculated amount
        SmartContract->>Vault: Request $COREUM transfer to user
        Vault->>User: Transfer $COREUM tokens (principal)
        Vault-->>SmartContract: Confirm transfer completed

        Note over SmartContract: Step 6: Check Draw State
        SmartContract->>ContractState: Check if all tickets are burned
        ContractState-->>SmartContract: Return total remaining tickets

        alt All Tickets Burned
            SmartContract->>ContractState: Set draw_state = draw_finished
            ContractState-->>SmartContract: Confirm draw state update
            SmartContract->>Indexer: Emit "AllTicketsBurned" event
        end

        SmartContract->>Indexer: Emit "TicketsBurned" event
        Note right of Indexer: Include:<br/>- User address<br/>- Number of tickets burned<br/>- $COREUM principal returned<br/>- Vault balance remaining<br/>- Timestamp

        Indexer-->>SmartContract: Event acknowledged
        SmartContract-->>User: Return success response
    end

    Note over SmartContract: Error Handling
    opt Any step fails
        SmartContract->>SmartContract: Revert all changes
        SmartContract->>User: Return detailed error
        SmartContract->>Indexer: Emit "TicketBurnFailed" event with reason
    end
```

## 🚀 Getting Started

### As a user

- Go to the [Coreum.fun website](https://coreum.fun)
- Buy tickets with $COREUM
- Cross fingers and hope to win
- Wait for the draw to finish
- If you won, the your rewards will be sent to your wallet!
- If you didn't win, you can burn your tickets to get your principal 7 days after the draw

### As a developer

#### Frontend Development

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
# Open http://localhost:3000 in your browser
```

#### Smart Contract Development

To work with the smart contract, you can use the provided shell scripts in this repository:

- **Optimize the Contract:**
  - Run `./optimize.sh` to optimize your smart contract before deployment.

- **Instantiate the Contract:**
  - Run `./instantiate.sh` to deploy and instantiate your contract on the blockchain.

- **Interact with the Contract:**
  - Use the following scripts for contract actions:
    - `./buy_ticket.sh` – Buy tickets in the draft.
    - `./burn_ticket.sh` – Burn tickets to reclaim your principal.
    - `./add_bonus_reward.sh` – Add bonus rewards to the contract.
    - `./select_winner_and_delegate.sh` – Select a winner and delegate rewards.
    - `./send_funds.sh` and `./send_funds_to_winner.sh` – Send funds as needed.
    - `./update_state.sh` – Update the contract state.
    - `./migrate_contract.sh` – Migrate the contract if needed.

> **Tip:** Each script is designed for a specific contract action. Open the script files to review any required arguments or environment variables before running them.

---

**The smart contract source code can be found here:**
[@https://github.com/Coreum-Labs/coreum_fun-contract/](https://github.com/Coreum-Labs/coreum_fun-contract/)

## 📄 License

This project is licensed under the GNU General Public License v3.0.
