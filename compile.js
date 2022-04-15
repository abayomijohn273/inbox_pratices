const path = require("path");
const fs = require('fs');
const solc = require("solc");

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

const input = {
    language: "Solidity",
    sources: {
        'inbox.sol': {
            content: source,
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            }
        }
    }
}

// console.log(solc.compile(source, 1));
// On Version 0.4.17, we use this
// module.exports = solc.compile(source, 1).contracts[":Inbox"];

// Now on 0.8+, we use
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts["inbox.sol"].Inbox;