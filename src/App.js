import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useContext} from "react"
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


const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

const AdressContext = React.createContext({address:"", setAdress:() => {}});

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

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAdress(accounts[0])
        } else {
          // setWallet("");
          // setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    }
  }

  const getChain = async () => {
    const chain = await window.ethereum.request({ method: 'eth_chainId' })
    setChain(chain)
  }

  useEffect(() => {
    // mobile, this would not be immediately available.
    getCurrentWalletConnected()
    addWalletListener()

    window.ethereum.on('chainChanged', (chainId) => {
      alert("chain changed")
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    });
    
    getChain()
    // alert("refresh")
  },[])

  return (
    <Router>
      <AdressContext.Provider value={[address,setAdress, chain]}>
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
       <button  onClick={onClickInstall}>Install Metamask</button>
    </>
  );
}

function SignIn() {

  const [permissionRequestInProgress, setPermissionRequestInProgress] = useState(false)
  const [address, setAdress] = useContext(AdressContext)

  if(!window.ethereum){
    return <Redirect to="install-wallet"/>
  }

  if(address){
    return <Redirect to=""/>
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
function Home() {

  let history = useHistory();

  const [address, setAdress, chain] = useContext(AdressContext)
  const [isDisabled, setIsDisabled] = useState(false)
  const page = 0;

  //------Inserted Code------\\
  const metaMaskClientCheck = () => {
    //Now we check to see if MetaMask is installed
    if (isMetaMaskInstalled()) {
      history.push("sign-in")
    } else {
      history.push("/install-wallet");
    }
  };

  const handleWalletButton = () => {
    if(!address){
      metaMaskClientCheck()
    }else{
      setAdress("")
    }
  }

  const handleWallet = () => {
    if(!address){
      metaMaskClientCheck()
    }else{
      alert("going to buy asset")
    }
  }

  useEffect(() => {
    // var web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('ws://remotenode.com:8546'));
    const provider = new Web3.providers.WebsocketProvider('wss://eth-mainnet.ws.alchemyapi.io/v2/njrUGAY9Kn4Dw5HkbXrsKnf5B0-NwuQc')
    seaport = new OpenSeaPort(provider, {
      networkName: Network.Main
    })
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <span>{address}</span>
        <button disabled={isDisabled} onClick={handleWalletButton}>
          {address ? "Sign out" : "Connect wallet"}
        </button>
        <span>Your chain is {chain}</span>
        {/* display the chain */}
      </header>
      <div className="App-header-bar"></div>
      <div>
        Content goes here
      </div>      
      {window.ethereum.isConnected() ? "Connected" : "Not connected"}
      {/* <button disabled={isDisabled} onClick={handleWallet}>
          Buy
      </button> */}
      {seaport && <Assets accountAddress={address} seaport={seaport}></Assets>}
    </div>
  );
}

export default App;
