//Crazcoin


const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAdd,toAdd,amount){
        this.fromAdd=fromAdd;
        this.toAdd=toAdd;
        this.amount=amount;
    }
};


class Block {
    constructor(timestamp, transactions, previousHash = '') {
        // this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = 0;
        // this.difficulty = 4;
    }
    calculateHash() {
        return SHA256( this.timestamp + this.previousHash + this.nounce + JSON.stringify(this.data)).toString();


    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nounce++;
            this.hash = this.calculateHash();

        }
        console.log("Block Mined " + this.hash);
    }
};

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransaction= []
        this.miningRewards=100;

    }
    createGenesisBlock() {
        return new Block('04/04/2020', "Genesis Block", "0");
    }

    getlatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getlatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty);
    //     // newBlock.hash = newBlock.calculateHash();
    //     this.chain.push(newBlock);

    // }

    minePendingTransaction(miningRewardsAddress){
        let block=new Block(Date.now(),this.pendingTransaction);
        block.mineBlock(this.difficulty);

        console.log("block successfully mined");
        this.chain.push(block);

        this.pendingTransaction = [
            new Transaction(null,miningRewardsAddress,this.miningRewards)
        ];
        
    }

    createTransaction(transaction){
        this.pendingTransaction.push(transaction);
    }


    getBalanceOfAddress(address){
        let balance=0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAdd==address){
                    balance-=trans.amount;
                }
                if(trans.toAdd==address){
                    balance+=trans.amount;
                }

            }
        }
        return balance;
    }


    isChainValid() {
        for (let i = 1; i < this.chain.length - 1; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];


            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;

    }
}

let Crazcoin = new Blockchain();

let address1= '100cd';

let address2= '100ab';

// console.log('Is Blockchain valid ' + Crazcoin.isChainValid());

// console.log(JSON.stringify(Crazcoin, null, 4));

Crazcoin.createTransaction(new Transaction(address1,address2,100));

Crazcoin.createTransaction(new Transaction(address2,address1,50));

// Crazcoin.createTransaction(new Transaction(address1,address2,100));


console.log("\nStarting miner");

Crazcoin.minePendingTransaction('xaviers-address');

console.log('\nBalance of xavier is ', Crazcoin.getBalanceOfAddress('xaviers-address'));                
