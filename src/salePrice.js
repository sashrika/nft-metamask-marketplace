

import BigNumber from 'bignumber.js'

const DEFAULT_DECIMALS = 18;

export function toUnitAmount(baseAmount, tokenContract = null) {
  const decimals =
    tokenContract && tokenContract.decimals != null
      ? tokenContract.decimals
      : DEFAULT_DECIMALS;

  const amountBN = new BigNumber(baseAmount.toString());
  return amountBN.div(new BigNumber(10).pow(decimals));
}

export default function SalePrice({ order }) {

  const { currentPrice, paymentTokenContract } = order;
  const price = toUnitAmount(currentPrice, paymentTokenContract);
  const priceLabel = parseFloat(price).toLocaleString(undefined, {
    minimumSignificantDigits: 1,
  });
  const isETH = paymentTokenContract.symbol === "ETH";

  return (
    <span>
      {isETH ? "Ξ" : null}
      {priceLabel} {isETH ? null : paymentTokenContract.symbol}
    </span>
  );
}
