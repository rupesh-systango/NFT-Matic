require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const data = require("../build/contracts/ArtCollectible.json");
const abiArray = data.abi;
const contract_address = "0x259c0bbc8a1ee0f956335b37ed77990424f13455";
const mnemonic = process.env.MNEMONIC;
const clientURL = process.env.CLIENT_URL;
const provider = new HDWalletProvider(
  "already drop blind deliver duty auto giant blade melt gate mesh private",
  "https://rpc-mumbai.maticvigil.com/"
);
const web3 = new Web3(provider);

async function mintNFT() {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log("accounts:", accounts);
    console.log("contract_address", contract_address);
    const artCollectible = new web3.eth.Contract(abiArray, contract_address);
    await artCollectible.methods
      .claimItem(
        "https://ipfs.io/ipfs/QmRGdjwzPuxH3wiCX4GTQa3jvkoGuRLmHRmq6bDqrw2eTD"
      )
      .send({ from: accounts[0] });
    console.log("Successfully minted NFT");
    // https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#IERC721-balanceOf-address-
    // returns number of NFT's in owner's account
    const balance = await artCollectible.methods.balanceOf(accounts[0]).call();
    const owner = await artCollectible.methods.ownerOf(balance).call();
    console.log("balance: ", balance);
    console.log("owner: ", owner);
  } catch (err) {
    console.log("error occured while calling deployed contract:", err);
  }
}

mintNFT();
