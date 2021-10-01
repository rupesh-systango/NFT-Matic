const ERC721NFT = artifacts.require("ERC721NFT");

module.exports = function (deployer) {
  deployer.deploy(ERC721NFT);
};
