require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const data = require("../build/contracts/ERC721NFT.json");
const abiArray = data.abi;
const contract_address = "0x8c850114ef64dc4AC0235EC02F6fca146fD13f19";
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
    await nft.methods
      .mintTicket(
        JSON.stringify({
          attributes: [
            {
              recipient: "Address",
              typeID: "UInt64",
              eventID: "UInt64",
              section: "UInt64",
              row: "UInt64",
              seat: "UInt64",
              ticketOwner: "String",
              ticketprice: "UFix64",
              originalTicketOwner: "String",
              trait_type: "Color",
              value: "Pink",
            },
          ],
          description: "Event JSON",
          image:
            "https://ipfs.io/ipfs/QmYhvhwq5HN3pUcDbvJEs3M3TQxPmAahYLtFWigrNykHcW",
          name: "Test NFT",
        })
      )
      .send({ from: accounts[0] });
    console.log("Successfully minted NFT");
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

mintNFT();
