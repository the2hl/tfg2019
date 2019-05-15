const LastWillManager = artifacts.require("LastWillManager");

module.exports = function (deployer) {
  deployer.deploy(LastWillManager);
};