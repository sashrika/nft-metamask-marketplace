import React, { useState, useEffect } from "react";
import { OrderSide } from "opensea-js/lib/types";
import moment from "moment";
import SalePrice from "./salePrice";
import AssetMetadata from "./assetMetaData";
import Account from "./account";
import useMetaMaskHandler from "./useMetaMaskHandler";

export default function Order({ order, accountAddress, seaport }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [creatingOrder, setCreatingOrder] = useState(false);

  const metaMaskClientCheck = useMetaMaskHandler();

  const onError = (error) => {
    // Ideally, you'd handle this error at a higher-level component
    // using props or Redux
    setErrorMessage(error.message);
    setTimeout(() => setErrorMessage(null), 3000);
    // throw error;
  };

  const fulfillOrder = async () => {
    if (!accountAddress) {
      metaMaskClientCheck();
      return;
    }
    try {
      setCreatingOrder(true);
      await seaport.fulfillOrder({ order, accountAddress });
    } catch (error) {
      onError(error);
    } finally {
      setCreatingOrder(false);
    }
  };

  const renderBuyButton = (canAccept = true) => {
    const buyAsset = async () => {
      if (accountAddress && !canAccept) {
        setErrorMessage("You already own this asset!");
        return;
      }
      fulfillOrder();
    };
    return (
      <button
        disabled={creatingOrder}
        onClick={buyAsset}
        className="btn btn-primary bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 mx-3 border border-blue-500 hover:border-transparent rounded transition duration-500 "
      >
        Buy{creatingOrder ? "ing" : ""} for <SalePrice order={order} />
      </button>
    );
  };

  const { makerAccount, listingTime, asset, assetBundle } = order;

  const owner = asset ? asset.owner : assetBundle.assets[0].owner;

  const ts = listingTime.toNumber() * 1000;
  const timeLabel = moment(ts).local().fromNow();
  const isOwner =
    accountAddress &&
    accountAddress.toLowerCase() === owner.address.toLowerCase();

  return (
    <div className="  bg-gray-100 flex flex-col justify-end h-full border-2 border-gray-300 rounded">
      {errorMessage ?
        <div className="bg-red-400  py-2 text-lg fixed w-screen top-16 left-0">{errorMessage}</div>
        :
        ''}
      {asset ? <AssetMetadata asset={asset} /> : "Bundles are not supported"}

      <ul className="list-group list-group-flush">
        <li className="list-group-item border-b-2  border-gray-300 mb-3 ">
          Offered by <span> </span>
          <Account account={makerAccount} />
        </li>
        {/* {errorMessage ? (
          <div className="alert alert-warning mb-0" role="alert">
            {errorMessage}
          </div>
        ) : (
          <li className="list-group-item">{renderBuyButton(!isOwner)}</li>
        )} */}

        <li className="list-group-item">{renderBuyButton(!isOwner)}</li>
      </ul>
      <div className="card-footer mt-3 border-t-2  border-gray-300 ">
        <small className="text-muted self-end  ">Posted {timeLabel}</small>
      </div>
    </div>
  );
}
