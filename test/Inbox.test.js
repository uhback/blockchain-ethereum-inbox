/**
 * Local Test Network (Ganache) Deploy and Test
 */
const assert = require('assert'); // one value is equal to the another value
const ganache = require('ganache-cli') // to serve as our local test network
const Web3 = require('web3'); // constructor function (Capital )

// instance of Web3 - 
// the purpose of multiple instance : to access each network
const web3 = new Web3(ganache.provider()); // put the argument depending on the network
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

// async : instantaneous, still synchronous
beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    // the Contract
    // JSON.pare(interface): interface is ABI
    // .deploy: deploy a new contract with arguments
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        // from : a person or an account is being used to create the contract
        .send({ from: accounts[0], gas: '1000000'})
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // test deploy working correctly
        assert.ok(inbox.options.address);
    });
    it('has a default message', async () => {
        // .call() : attempting send the transaction
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });
    it('can change the message', async () => {
        // define who is paying the gas, money for this in .send
        await inbox.methods.setMessage('Hello World').send({ from: accounts[0] });
        // Check update
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello World');
    })
})


/**
 * Mocha Test
 */

// class Car {
//     park() {
//         return 'stopped';
//     }
//     drive() {
//         return 'vroom';
//     }
// }

// let car;

// // initialize
// beforeEach(() => {
//     car = new Car();
// })

// // 'Car Check' is not a class name. just string to get output
// describe('Car Check', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped'); // Test Pass or Fail 
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     })
// })