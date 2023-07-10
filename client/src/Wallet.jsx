import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import { toHex }  from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey)
    const address = toHex(getAddress(secp.getPublicKey(privateKey)));
    setAddress(address);
    console.log(address)
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  function getAddress(publicKey) {
    return keccak256(publicKey.slice(1)).slice(-20);
}

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private key
        <input placeholder="Type an your private address" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="wallet">wallet address <b>{address}</b></div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
