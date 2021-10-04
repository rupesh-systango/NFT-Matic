require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const data = require("../build/contracts/ERC721NFT.json");
const abiArray = data.abi;
const contract_address = "0xE084B63eFb52873bdf57b46268c2aBDBa31162Ec";
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
    const nft = new web3.eth.Contract(abiArray, contract_address);
    const mintData = await nft.methods
      .mintTicket(
        "https://ipfs.io/ipfs/QmUTF7sAqcpySq8VQAeCUxoBwXCkSLEffurzBQLG4VphcP"
      )
      .send({ from: accounts[0] });
    console.log("Successfully minted NFT " + JSON.stringify(mintData));
    // https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#IERC721-balanceOf-address-
    // returns number of NFT's in owner's account
    const balance = await nft.methods.balanceOf(accounts[0]).call();
    const owner = await nft.methods.ownerOf(balance).call();
    console.log("balance: ", balance);
    console.log("owner: ", owner);
  } catch (err) {
    console.log("error occured while calling deployed contract:", err);
  }
}

async function transferToken() {
  try {
    const accounts = await web3.eth.getAccounts();
    const nft = new web3.eth.Contract(abiArray, contract_address);
    await nft.methods
      .transferFrom(
        accounts[0],
        "0x73a28bEbe4efc836D06D252B9428613E81eA60b2",
        1
      )
      .send({ from: accounts[0] });
  } catch (err) {
    console.log("error occured while calling deployed contract:", err);
  }
}

async function balanceOf() {
  try {
    const accounts = await web3.eth.getAccounts();
    const nft = new web3.eth.Contract(abiArray, contract_address);
    const balance = await nft.methods.balanceOf(accounts[1]).call();
    console.log("balance: ", balance);
  } catch (err) {}
}

async function tokenURI(tokenId) {
  try {
    const accounts = await web3.eth.getAccounts();
    const nft = new web3.eth.Contract(abiArray, contract_address);
    const tokenData = await nft.methods.tokenURI(tokenId).call();
    console.log("Token Data: ", tokenData);
  } catch (err) {
    console.log("Error :" + err);
  }
}

//transferToken();
//mintNFT();
//balanceOf();
tokenURI(1);
