import { useState } from "react";
import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import hashMessage from './hashMessage';


function Transfer({ address, setBalance, privateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function signMessage(msg, privateKey) {
    const msgHash = hashMessage(msg);
    return secp.sign(msgHash, privateKey, { recovered: true });
  }

  async function transfer(evt) {
    evt.preventDefault();
    const amount = parseInt(sendAmount);
    const signature = await signMessage(amount.toString(), privateKey);
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: amount,
        signature: signature[0].toString(),
        recoveryBit: parseInt(signature[1]),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
