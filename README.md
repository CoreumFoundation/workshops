# Coreum Workshops

![Workshop](./assets/workshop.jpeg)

Welcome to the **Coreum Workshops** repository! This repository is your gateway to various hands-on workshops, each designed to enhance your skills in developing applications on the Coreum blockchain.

## Available Workshops

Below is a list of workshops available in this repository. Click on a workshop to access its materials, instructions, and additional resources.

### 1. [Bootstrap Web Development on Coreum](./Boostrap_WebApp_Development/)

In this comprehensive workshop, participants will dive into the world of decentralized application development using the Create Coreum App Npm package. This workshop is tailored for developers looking to streamline their web development process and integrate with the Coreum Blockchain seamlessly.

#### What You Will Learn

- Setting up a full-stack web development environment tailored for Coreum.
- Effective interaction and signing of Coreum custom messages using web-based wallets.
- Step-by-step guidance on creating a IBC transfer and denom construction.
- Hands-on experience with IBC in the browser, including transfering FT token to other chains, denom construction

#### Prerequisites

- Basic knowledge of TypeScript and React.
- One of the following wallets installed: Keplr, Leap, Cosmostation, or Frontier.

## Workshop Recordings and Details

For detailed explanations and recordings of these workshops, visit the [Coreum Workshops](https://www.coreum.com/workshops) page on the Coreum website.

### 2. [IBC Web Development on Coreum](./IBCTransfer_WebApp_Development/)
In this comprehensive workshop, participants will dive into the world of decentralized application development using the Create Coreum App Npm package. This workshop is tailored for developers looking to streamline their web development process and integrate with the Coreum Blockchain seamlessly.

#### What You Will Learn
- Setting up a full-stack web development environment tailored for Coreum.
- Effective interaction and signing of Coreum custom messages using web-based wallets.
- Step-by-step guidance on creating a IBC transfer and denom construction.
- Hands-on experience with IBC  in the browser, including transfering FT token to other chains, denom construction
- Hands-on experience with IBC in the browser, including transfering FT token to other chains, denom construction

#### Prerequisites

- Basic knowledge of TypeScript and React.
- One of the following wallets installed: Keplr, Leap, Cosmostation, or Frontier.

_More workshops will be added as they become available._

## Workshop Recordings and Details

For detailed explanations and recordings of these workshops, visit the [Coreum Workshops](https://www.coreum.com/workshops) page on the Coreum website.

## Contributing

We welcome contributions! If you have suggestions or want to contribute to the workshop materials, please feel free to submit pull requests or raise issues.

### 3. [DAO WEB Development on Coreum](./OpenDaoWorkshop/)

#### What You Will Learn

This workshop is designed to take you through the steps of creating a dao that interacts with the Coreum blockchain. Participants will gain hands-on experience with Create Coreum App, CosmoKit, CosmWasm and CosmJS.

### DAO Platform Explanation

This DAO allows people to propose a workshop and then have that workshop be voted on, using Coreum blockchain. Each vote has a 2 min lifespan before it is finalized. The results of that vote are then displayed.

### Learning Objectives

By the end of this workshop, you will be able to:

### Understand the architecture of a DApp.

Connect a DApp to the Coreum blockchain.
Interact with CosmWasm contracts via a UI frontend.
Understand how a DAO contract works on Coreum Blockchain
Utilize CosmJS handle blockchain transactions.

### 4.  Coreum v4 Update - IBC Hooks and Smart Tokens Extension

[Smart Tokens](https://docs.coreum.dev/docs/modules/coreum-fungible-token) just got smarter! With the latest Coreum v4 update, developers can now create more versatile and powerful Smart Tokens.

Now, every time your tokens are sent or received, custom logic can be triggered using an attached smart contract. This opens up endless possibilities for custom business logic, gamification, and more!

The [IBC hooks module](https://github.com/cosmos/ibc-apps/blob/main/modules/ibc-hooks/README.md), an IBC middleware, enables ICS-20 token transfers to initiate contract calls, allowing cross-chain contract interactions involving token movement. We will use this feature to create a cross-chain DApp that leverages (Secret Network)[https://scrt.network/] [VRF](https://docs.scrt.network/secret-network-documentation/confidential-computing-layer/ibc/cross-chain-randomness-with-secretvrf/secret-vrf-for-ibc-with-ibc-hooks) to generate and process a random number on Coreum.

Discover the latest innovations in Smart Tokens as we guide you through creating a cross-chain “Flip the Coin” DApp. This interactive workshop will demonstrate how to trigger the DApp by sending the FLIP token directly from your wallet.

#### What You Will Learn

- Setting up a full-stack web development environment tailored for Coreum.
- Create a Fungible Smart Token with the new Smart Tokens Extension feature.
- Step-by-step guidance on creating a cross-chain DApp using IBC Hooks.
- Hands-on experience with Cored CLI.
- Generate TypeScript SDKs for your CosmWasm smart contracts

### 5. [FullStack Dynamic Data](./CoreumV4DynamicData/)

#### What You Will Learn
This workshop is designed to take you through the steps of creating a dynamic full-stack application that interacts with the Coreum blockchain. Participants will gain hands-on experience with Create Coreum App, CosmoKit, CosmWasm Contracts, CosmJS, Golang, Building http servers, integration and Next.js.

### Prerequisites:
- Basic understanding of blockchain concepts
- Familiarity with JavaScript/TypeScript, Rust and Golang
- Basic knowledge of React/Next.js
- Installed tools: Golang, Docker, Cosmwasm

### Understand the architecture of a DApp.
- Connect a DApp to the Coreum blockchain.
- Interact with CosmWasm contracts via a UI frontend.
- Understand how a FullstackDynamicData Golang on Coreum Blockchain
- Utilize CosmJS handle blockchain transactions.

### 6. [FullStack TokenClawback Data](./Coreum_v4Clawback/)

### Overview
The FullStack TokenClawback Data project is designed to manage and implement token clawback functionalities in a full-stack application environment. This project aims to provide a robust system for token creation, management, and clawback capabilities within a blockchain ecosystem.

### Features
- Token Creation: Create new tokens with specified parameters such as name, symbol, decimals, supply, image, description, and social links.
- Token Management: Send token.
- Clawback Functionality: Implement clawback mechanisms to revert tokens to the issuer in specific scenarios.

### Understand the architecture of a DApp.
- Connect a DApp to the Coreum blockchain.
- Interact with GO backend Api interaction via a UI frontend.
- Understand how a FullstackTokenClawback Golang on Coreum Blockchain
- Utilize Axios to make different types of HTTP requests such as GET,POST, PUT, DELETE
