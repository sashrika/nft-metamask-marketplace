import logo from './logo.svg';
import './App.css';
import AppBar from './AppBar'
import React, { useState, useEffect, useContext } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";
import MetaMaskOnboarding from '@metamask/onboarding'
import { OpenSeaPort, Network } from 'opensea-js';
import * as Web3 from 'web3'
import Assets from './assets';
import useMetaMaskHandler from './useMetaMaskHandler'
import { OrderContextProvider } from "./contexts/orderContext"


const AdressContext = React.createContext({ address: "", setAdress: () => { } });

function App() {

  const [address, setAdress] = useState("")
  const [chain, setChain] = useState("")

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          setAdress(addressArray[0])
          // return {
          //   address: addressArray[0],
          //   status: "👆🏽 Write a message in the text-field above.",
          // };
        }
      } catch (error) {
        alert(error.code + error.message);
        // return {
        //   address: "",
        //   status: "😥 " + err.message,
        // };
      }
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAdress(accounts[0]);
        } else {
          setAdress("");
          // setWallet("");
          // setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    }
  }, []);

  const getChain = async () => {
    const chain = await window.ethereum.request({ method: 'eth_chainId' })
    setChain(chain)
  }

  useEffect(() => {
    // mobile, this would not be immediately available.
    getCurrentWalletConnected()
    window.ethereum.on('chainChanged', (chainId) => {
      alert("chain changed")
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    });

    getChain()
    // alert("refresh")
  }, [])

  return (
    <Router>
      <AdressContext.Provider value={[address, setAdress, chain]}>
        <OrderContextProvider>
          <Switch>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/install-wallet">
              <InstallWallet />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </OrderContextProvider>
      </AdressContext.Provider>
    </Router>
  );
}
//after installation it should automatically ask to login?

function InstallWallet() {

  const onClickInstall = () => {
    const onboarding = new MetaMaskOnboarding();
    onboarding.startOnboarding();
  }

  return (
    <>
      <button onClick={onClickInstall}>Install Metamask</button>
    </>
  );
}

function SignIn() {

  const [permissionRequestInProgress, setPermissionRequestInProgress] = useState(false)
  const [address, setAdress] = useContext(AdressContext)

  if (!window.ethereum) {
    return <Redirect to="install-wallet" />
  }

  if (address) {
    return <Redirect to="" />
  }

  // redirect if already logged in
  const onClickConnect = async () => {
    setPermissionRequestInProgress(true)
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) {
        const acc = accounts[0];
        setAdress(acc)
      } else {
        alert("Not able to get accounts");
        setPermissionRequestInProgress(false)
      }
    } catch (error) {
      console.error(error);
      alert(error.code + error.message);
      setPermissionRequestInProgress(false)
    }
  };

  return (
    <>
      <button disabled={permissionRequestInProgress} onClick={onClickConnect}>Sign in</button>
    </>
  );
}

var seaport;
const Home = () => {

  const [address, setAdress, chain] = useContext(AdressContext)
  const [isDisabled, setIsDisabled] = useState(false)
  const page = 0;

  const metaMaskClientCheck = useMetaMaskHandler()

  const handleWalletButton = () => {
    if (!address) {
      metaMaskClientCheck()
    } else {
      setAdress("")
    }
  }

  const handleWallet = () => {
    if (!address) {
      metaMaskClientCheck()
    } else {
      alert("going to buy asset")
    }
  }

  useEffect(() => {
    // var web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://remotenode.com:8546'));
    const provider = new Web3.providers.WebsocketProvider('wss://eth-mainnet.ws.alchemyapi.io/v2/njrUGAY9Kn4Dw5HkbXrsKnf5B0-NwuQc')
    seaport = new OpenSeaPort(provider, {
      networkName: Network.Main
    })
  }, [])

  return (
    <div className="App">

      <header className="App-header sticky top-0">
        <AppBar address={address} handleWalletButton={handleWalletButton} isDisabled={isDisabled} />
        {/* <span>{address}</span>
        <button className="transition duration-500 ease-in-out  bg-gradient-to-r p-5 border-4 border-gray-700 rounded-full m-7 from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600  transform hover:-translate-y-1 hover:scale-110 text-2xl font-bold "  disabled={isDisabled} onClick={handleWalletButton}>
          {address ? "Sign out" : "Connect wallet"}
        </button> */}

      </header>

      <div className="text-xl mt-4">Your chain is {chain}</div>
      {/* display the chain */}
      <div text-xl>
        This app is currently connected to Rinkeby network.
      </div>
      {/* {window.ethereum.isConnected() ? "Connected" : "Not connected"} */}
      {/* <button disabled={isDisabled} onClick={handleWallet}>
          Buy
      </button> */}
      {seaport && <Assets accountAddress={address} seaport={seaport}></Assets>}
    </div>
  );
}

export default App;
