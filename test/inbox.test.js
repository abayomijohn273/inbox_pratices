const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
// const {interface, bytecode} = require("../compile"); => using 0.4.17
const {abi, evm} = require("../compile");

// Instantiate the Web3 class
const web3 = new Web3(ganache.provider()); //tell instance to connect to local test network on our pc

let accounts;
let inbox;

const INITIAL_STRING = 'Hi There!';

beforeEach(async () => {
    // Get the list of all account
    // NOTE: All web3 function are asynchronous
   accounts =  await web3.eth.getAccounts();

    // Use one of the accounts to deploy the contracts
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: [
                INITIAL_STRING
            ]
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        })
})

describe("Inbox", () => {
    it('deploy a contract',  () => {
        // console.log(inbox);
        assert.ok(inbox.options.address);
    })

    it('has a default message',  async() => {
        const message = await inbox.methods.message().call()

        assert.equal(message, INITIAL_STRING)
    })

    it('can change the message', async() => {
        await inbox.methods.setMessage("Welcome boy!").send({
            from: accounts[0],
            gas: '1000000'
        });

        const message = await inbox.methods.message().call()

        assert.equal(message, 'Welcome boy!')
    })
})




























// Example using mocha
// class Car {
//     park() {
//         return "Parked";
//     }

//     drive (){
//         return "vzoom";
//     }
// }

// let car; 

// beforeEach(() => {
//     car = new Car();
// })

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'Parked');
//     })

//     it('can drive', () => {
//         assert.equal(car.drive(), "vzoom");
//     })
// })
