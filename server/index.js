const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const hashMessage = require('./hashMessage');

app.use(cors());
app.use(express.json());

const balances = {
  "e7687d9365c2cf913bee94da5aaadc4238288553": 100,
  "5fa8eccd70f3616699f6e9255c3959143e7683ed": 50,
  "91beb423f4e84015b6e363112da12b621ee5f038": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit } = req.body;
  const publicKey = secp.recoverPublicKey(hashMessage(
    amount.toString()), 
    new Uint8Array(signature.split(",")), 
    recoveryBit);

  const address = toHex(getAddress(publicKey));
  if (address != sender) {
    res.status(401).send({ message: "unauthorized transaction" });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}



function getAddress(publicKey) {
    return keccak256(publicKey.slice(1)).slice(-20);
}
