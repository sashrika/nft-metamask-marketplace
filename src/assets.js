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
import Order from "./order";
import OrdersContext from "./contexts/orderContext";

export default function Assets({ seaport, accountAddress }) {

  const { orders, setOrders, page, count } = useContext(OrdersContext);

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
    setOrders(orders);
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
      <div className="card-deck flex flex-wrap ">

        {orders.map((order, i) => {
          return (
            <div className=" w-full sm:w-1/2  md:w-1/3 lg:w-1/4  flex justify-center mt-4 mb-8 ">
              <div className="  p-4  flex-grow-0  text-center w-80  ">
                <Order

                  accountAddress={accountAddress}
                  seaport={seaport}
                  key={i}
                  order={order}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* {this.renderPagination()} */}
    </React.Fragment>
  );
}
