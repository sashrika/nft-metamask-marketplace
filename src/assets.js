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
import Order from "./order"

export default function Assets({seaport, accountAddress}) {

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

//   const buy = (contract, tokenId) => {
//     alert(`${contract} ${tokenId}`)
//   }

  return (
    <React.Fragment>
        <div>Displaying Assets(Orders)</div>
      <div className="card-deck">
        {orders.map((order, i) => {
          return <Order 
          accountAddress={accountAddress}
          seaport={seaport} 
          key={i} 
          order={order} />;
        })}
      </div>
      {/* {this.renderPagination()} */}
    </React.Fragment>
  );
}
