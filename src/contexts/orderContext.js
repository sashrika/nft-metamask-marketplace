import React, { useState, useEffect, useContext } from "react";

const OrdersContext = React.createContext({
  orders: [],
  setOrders: () => {},
  page: 1,
  count: undefined,
});

const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  return (
    <OrdersContext.Provider
      value={{ orders, setOrders, page: 1, count: undefined }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;
export { OrderContextProvider };
