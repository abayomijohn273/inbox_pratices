const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3')
const {interface, bytecode}  = require('./compile');

const provider = new HDWalletProvider(
    'erupt skill rival radio faint feature glue census amateur game spoon couch',
    'https://rinkeby.infura.io/v3/f6b6962349cd46748f9e3261ec25b99a'
)

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: ['Hello there!']
        })
        .send({
            gas: '1000000',
            from: accounts[0]
        });

        console.log('Contract deployed to', result.options.address)

        // to prevent hanging deployment
        provider.engine.stop()


}

deploy();