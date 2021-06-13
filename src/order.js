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
        className="btn btn-primary w-100"
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
    <div>
      {asset ? <AssetMetadata asset={asset} /> : "Bundles are not supported"}

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Offered by
          <Account account={makerAccount} />
        </li>
        {errorMessage ? (
          <div className="alert alert-warning mb-0" role="alert">
            {errorMessage}
          </div>
        ) : (
          <li className="list-group-item">{renderBuyButton(!isOwner)}</li>
        )}
      </ul>
      <div className="card-footer">
        <small className="text-muted">Posted {timeLabel}</small>
      </div>
    </div>
  );
}
