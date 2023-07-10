import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";


function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);

  const balances = {
    "68c5e48f154bc312491cc09dd6a5b86c70a627b47ee77c0700e1102981a8616a": 100,
    "4ea04e6e98872f1694f578eba09b194c6e60b3fbf5622571d2b4556c2dd26efd": 50,
    "b8d0317a62aed1ef5ff7980cbf6bbc764375e6d7ada822e3acd7023ac9ca325b": 75,
  };
  
  return (
        <div className="app">
          <Wallet
            balance={balance}
            setBalance={setBalance}
            address={address}
            setAddress={setAddress}
            privateKey={privateKey}
            setPrivateKey={setPrivateKey}
          />
          <Transfer setBalance={setBalance} address={address} privateKey={privateKey} />
      </div>
  );
}

export default App;
