// require('./contracts/Inbox.sol'); --> not work because require function is to interprete JS code. it is not
// From harddrive to read the contents out
const path = require('path');
const fs = require('fs'); // file system
const solc = require('solc'); // solidity compiler


const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//console.log(solc.compile(source, 1));
module.exports = solc.compile(source, 1).contracts[':Inbox']; // access the ':Inbox' object in the contracts
