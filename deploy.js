/**
 * Public Network Deploy (Rinkeby)
 */
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    // account mnemonic
    'hedgehog three weather move coil shock answer clarify frown title gossip excess',
    // Infura Provided URL (Rinkeby)
    'https://rinkeby.infura.io/pu15vPMRoaCIPvyeo7Vh',
);
// take provider by web3
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account: ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi'] })
        .send({ gas: '1000000', from: accounts[0] });

    // Check address where the contract is deployed
    console.log('Contract deployed to ', result.options.address);
};
deploy()