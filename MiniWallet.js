require("dotenv").config();

const Web3 = require("web3");

const apiKey = process.env["apikey"];
const network = "mumbai";

const node = `https://eth.getblock.io/${apiKey}/${network}`;

const web3 = new Web3(node);
// console.log(web3);

const accountTo = web3.eth.accounts.create();
// console.log(accountTo);

const privateKey = process.env["privateKey"];
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);

// console.log(accountFrom); //account address we generated from our private key on the browser metamask

// signing the transaction
const createSignedTx = async (rawTx) => {
  rawTx.gas = await web3.eth.estimateGas(rawTx);
  return await accountFrom.signTransaction(rawTx);
};

//sending the transaction to the ethererum network so that the miner can check and record it
const sendSignedTx = async (signedTx) => {
  web3.eth.sendSignedTransaction(signedTx.rawTx).then(console.log);
};

const amountTo = "0.01";

const rawTx = {
  to: accountTo.address,
  value: web3.utils.toWei(amountTo, "ETH"),
};

createSignedTx(rawTx).then(sendSignedTx);
