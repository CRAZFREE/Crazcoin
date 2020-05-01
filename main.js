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
        return SHA256(this.index + this.timestamp + this.previousHash + this.nounce + JSON.stringify(this.data)).toString();


    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nounce++;
            this.hash = this.calculateHash();

        }
        console.log("Block Mined " + this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;

    }
    createGenesisBlock() {
        return new Block('04/04/2020', "Genesis Block", "0");
    }

    getlatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getlatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        // newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);

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

// console.log('Is Blockchain valid ' + Crazcoin.isChainValid());

// console.log(JSON.stringify(Crazcoin, null, 4));