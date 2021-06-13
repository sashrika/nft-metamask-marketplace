# A React Starter Project To Buy NFTs on OpenSea using Metamask

Non-fungible tokens (NFTs) allow users to create and trade digital items with differing values.

## All required Metamask methods are used.

In dApps you don't see conventional signup flows and signin flows. Your identity and permissions will b controlled by Metamsk extension. You can find how to handle different Metamask accounts and different etherium chains. 

### `eth_requestAccounts`

Request a etherium address to uniquely identify the user. 


### `event - accountsChanged`

accountsChanged will be emitted whenever the user's exposed account address changes.\
Don't get misunderstood that this gets emit when the user switch between the accounts in Metamask. 


### `event - chainChanged`

The MetaMask provider emits this event when the currently connected chain changes.
This project notifies the user if the user is connected to any network other than main net. 

### `npm run eject`

**Note: This repo uses all the latest etherium RPC methods. This repo doesn't use any deprecated methods like `ethereum.enable()`

## Opensea intergration

This project has intergrated Openseajs. Opensea.js is an open source library developed by Opensea. It provides many useful methods like fetching orders from Opensea and fullfiling orders(on etherium network) without navigating to OpenSea portal

## Love  TailwindCSS + React