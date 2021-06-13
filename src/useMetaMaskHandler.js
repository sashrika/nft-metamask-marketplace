import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";

const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const useMetaMaskHandler = () => {
  const history = useHistory();

  const metaMaskClientCheck = () => {
    //Now we check to see if MetaMask is installed
    if (isMetaMaskInstalled()) {
      history.push("sign-in");
    } else {
      history.push("/install-wallet");
    }
  };

  return metaMaskClientCheck;
};

export default useMetaMaskHandler
