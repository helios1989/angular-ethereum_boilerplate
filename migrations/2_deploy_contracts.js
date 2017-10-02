var ParcelRegister = artifacts.require("./ParcelRegister.sol");

module.exports = function(deployer) {
  deployer.deploy(ParcelRegister);
};
