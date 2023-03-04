const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const coin = new Blockchain();
const rp = require("request-promise");
const { response } = require("express");
var express = require("express");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//creating blockchain endpoint

module.exports = {
  // return entire  blockchain data
  getBlockchain: (callBack = () => {}) => {
    return callBack(null, coin);
  },

  // create transaction and add transaction to pendingTransactions
  transaction: (data, callBack = () => {}) => {
    const newTransaction = data;
    const blockIndex = coin.addTransactionToPendingTransactions(newTransaction);
    return callBack(null, {
      note: `Transaction will be added in block ${blockIndex}`,
    });
  },

  // broadcast transaction to all over the network
  transactionBroadcast: (data, callBack = () => {}) => {
    const requestPromises = [];
    data.forEach((item) => {
      // console.log("-------------------------");
      // console.log(item);
      const newTransaction = coin.createNewTransaction(
        item.name, // name
        item.category, // category
        item.c_id, // candidate (unique address)
        item.v_id // voter (unique address)
      );
      coin.addTransactionToPendingTransactions(newTransaction);

      coin.networkNodes.forEach((networkNodeUrl) => {
        const requestOptions = {
          uri: networkNodeUrl + "/transaction",
          method: "POST",
          body: newTransaction,
          json: true,
        };
        requestPromises.push(rp(requestOptions));
      });
    });

    // mining
    // http://localhost:3001/mine
    const mineRequestPromises = [];
    const mineRequestOption = {
      uri: coin.currentNodeUrl + "/mine",
      method: "GET",
      json: true,
    };

    mineRequestPromises.push(rp(mineRequestOption));
    Promise.all(mineRequestPromises).then((data) => console.log(data));

    Promise.all(requestPromises).then((data) => {
      // return;
      return callBack(null, {
        note: "Transaction created and broadcasted successfully!",
      });
    });
  },

  // mine a block
  mine: (callBack = () => {}) => {
    const lastBlock = coin.getLastBlock();
    const previousBlockHash = lastBlock["hash"];
    const currentBlockData = {
      index: lastBlock["index"] + 1,
      transactions: coin.pendingTransactions,
    };

    const nonce = coin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = coin.hashBlock(
      previousBlockHash,
      currentBlockData,
      nonce
    );
    const newBlock = coin.createNewBlock(nonce, previousBlockHash, blockHash);

    const requestPromises = [];
    coin.networkNodes.forEach((networkNodeUrl) => {
      const requestOptions = {
        uri: networkNodeUrl + "/receive-new-block",
        method: "POST",
        body: { newBlock: newBlock },
        json: true,
      };
      requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises).then((data) => {
      return callBack(null, {
        note: "New Block Mined  and broadcast Successfully!",
        block: newBlock,
      });
    });
  },

  // the nodes present in the network recieve newblock and push into their chain
  receiveNewBlock: (data, callBack = () => {}) => {
    const newBlock = data;
    const lastBlock = coin.getLastBlock();
    const correctHash = lastBlock.hash === newBlock.previousBlockHash;
    const correctIndex = lastBlock["index"] + 1 === newBlock["index"];
    if (correctHash && correctIndex) {
      coin.chain.push(newBlock);
      coin.pendingTransactions = [];
      return callBack(null, {
        note: "New Block received and accepted",
        newBlock: newBlock,
      });
    } else {
      console.log("block rejected");
      return callBack(null, {
        note: "New Block Rejected",
      });
    }
  },

  // the current node recieve new node, register it and broadcast to all the nodes of the network
  registerBroadcast: (newNodeUrl, callBack = () => {}) => {
    if (coin.networkNodes.indexOf(newNodeUrl) == -1)
      coin.networkNodes.push(newNodeUrl);
    const regNodesPromises = [];
    coin.networkNodes.forEach((networkNodeUrl) => {
      const requestOptions = {
        uri: networkNodeUrl + "/register-node",
        method: "POST",
        body: { newNodeUrl: newNodeUrl },
        json: true,
      };
      regNodesPromises.push(rp(requestOptions));
    });
    Promise.all(regNodesPromises)
      .then((data) => {
        const bulkRegisterOptions = {
          uri: newNodeUrl + "/register-nodes-bulk",
          method: "POST",
          body: {
            allNetworkNodes: [...coin.networkNodes, coin.currentNodeUrl],
          },
          json: true,
        };
        return rp(bulkRegisterOptions);
      })
      .then((data) => {
        return callBack(null, {
          note: "new node registered in network successfully !",
        });
      });
  },

  // all the nodes of the network receive new node, register it and return their details
  registerNode: (newNodeUrl, callBack = () => {}) => {
    const nodeNotAlreadyPresent = coin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = coin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode)
      coin.networkNodes.push(newNodeUrl);
    return callBack(null, {
      note: "new node registered successfully",
    });
  },

  // the new node register all the nodes of the network into it
  registerNodesBulk: (allNetworkNodes, callBack = () => {}) => {
    allNetworkNodes.forEach((networkNodeUrl) => {
      const nodeNotAlreadyPresent =
        coin.networkNodes.indexOf(networkNodeUrl) == -1;
      const notCurrentNode = coin.currentNodeUrl !== networkNodeUrl;
      if (nodeNotAlreadyPresent && notCurrentNode)
        coin.networkNodes.push(networkNodeUrl);
    });
    return callBack(null, {
      note: "Bulk registration of nodes successful!",
    });
  },

  // implement consensus algorithm (longest chain rule)
  consensus: (callBack = () => {}) => {
    const requestPromises = [];
    coin.networkNodes.forEach((networkNodeUrl) => {
      const requestOptions = {
        uri: networkNodeUrl + "/blockchain",
        method: "GET",
        json: true,
      };
      requestPromises.push(rp(requestOptions));
    });
    Promise.all(requestPromises).then((blockchains) => {
      const currentChainLength = coin.chain.length;
      let maxChainLength = currentChainLength;
      let newLongestChain = null;
      let newPendingTransactions = null;
      blockchains.forEach((blockchain) => {
        if (blockchain.chain.length > maxChainLength) {
          maxChainLength = blockchain.chain.length;
          newLongestChain = blockchain.chain;
          newPendingTransactions = blockchain.pendingTransactions;
          // console.log( coin.chainIsValid(newLongestChain));
          // newLongestChain.forEach(longeshchain =>{
          //     console.log(longeshchain);
          // })
          // console.log( newLongestChain && coin.chainIsValid(newLongestChain));
        }
      });

      if (
        !newLongestChain ||
        (newLongestChain && !coin.chainIsValid(newLongestChain))
      ) {
        return callBack(null, {
          note: "current chain has not been replaced",
          chain: coin.chain,
        });
      } else if (newLongestChain && coin.chainIsValid(newLongestChain)) {
        coin.chain = newLongestChain;
        coin.newPendingTransactions = newPendingTransactions;
        return callBack(null, {
          note: "this chain hass been replaced",
          chain: coin.chain,
        });
      }
    });
  },

  // count total votes of each candidte
  countVote: async (callBack = () => {}) => {
    // implmementing consensus algorithm
    const nodeConsensus = {
      uri: coin.currentNodeUrl + "/consensus",
      method: "get",
      json: true,
    };
    const nodeConsensusResponse = rp(nodeConsensus);
    Promise.resolve(nodeConsensusResponse).then((response) => {
      console.log(response);
      //
    });

    const voteObject = [];
    //fetching candidates
    let candidates = [];
    const candidateRequestOption = {
      uri: coin.currentNodeUrl + "/get-candidate",
      method: "GET",
      json: true,
    };
    const candidatePromise = rp(candidateRequestOption);
    await Promise.resolve(candidatePromise).then((data) => {
      candidates.push(...data.data);
    });

    candidates.forEach((candidate) => {
      voteObject.push(
        coin.voteCount(candidate.name, candidate.c_id, candidate.category)
      );
    });
    // console.log(voteObject);
    return callBack(null, voteObject);
  },
};
