import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import MetaMaskOnboarding from "@metamask/onboarding";
import { OpenSeaPort, Network } from "opensea-js";
import * as Web3 from "web3";
import SalePrice from "./salePrice";

export default function Assets({seaport}) {

  const [orders, setOrders] = useState([])

  const fetchData = async () => {
    const { orders, count } = await seaport.api.getOrders(
      {
        maker: undefined,
        owner: undefined,
        side: 1,
        bundled: undefined,
        // Possible query options:
        // 'asset_contract_address'
        // 'taker'
        // 'token_id'
        // 'token_ids'
        // 'sale_kind'
      },
      1
    );
    setOrders(orders)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const buy = (contract, tokenId) => {
    alert(`${contract} ${tokenId}`)
  }

  return (
    <div>
      Displaying assetslllllllllll
      {
          orders.map((order) => {
              console.log(order)
              return (
                  <div key={order.hash}>
                      <a href="order.asset.openseaLink">
                      {order.asset.name}
                      </a>
                      <span>{"  - "}Price is 29</span>
                      <SalePrice order={order}/>
                      <button onClick={() => buy(order.asset.tokenAddress,order.asset.tokenId)}>Buy now</button>
                  </div>
              )
          })
      }
    </div>);
}
