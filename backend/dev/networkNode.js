const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const coin = new Blockchain();
const rp = require("request-promise");
var express = require("express");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { getFullCandidate } = require("../api/service/candidateService");
const { CreateVote } = require("../api/service/voteService");
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
    const trasactionArray = data.transaction;
    const token = data.token;
    const requestPromises = [];
    trasactionArray.forEach((item) => {
      // console.log("-------------------------");
      // console.log(item);
      const newTransaction = coin.createNewTransaction(
        item.name, // name
        item.candidate_address, // candidate unique address
        item.voter_address, // voter (unique address)
        item.party_name, // party name
        item.category_name // category name
      );
      coin.addTransactionToPendingTransactions(newTransaction);

      coin.networkNodes.forEach((networkNodeUrl) => {
        const requestOptions = {
          uri: networkNodeUrl + "/transaction",
          method: "POST",
          body: newTransaction,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      method: "POST",
      body: {
        token: token,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },

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
  mine: (data, callBack = () => {}) => {
    const token = data.token;
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    const newBlock = data.newBlock;
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
  registerBroadcast: (data, callBack = () => {}) => {
    const newNodeUrl = data.newNodeUrl;
    const token = data.token;

    if (coin.networkNodes.indexOf(newNodeUrl) == -1)
      coin.networkNodes.push(newNodeUrl);
    const regNodesPromises = [];
    coin.networkNodes.forEach((networkNodeUrl) => {
      const requestOptions = {
        uri: networkNodeUrl + "/register-node",
        method: "POST",
        body: { newNodeUrl: newNodeUrl },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        json: true,
      };
      regNodesPromises.push(rp(requestOptions));
    });
    Promise.all(regNodesPromises).then((data) => {
      console.log(data);
    });
    return callBack(null, {
      allNetworkNodes: [...coin.networkNodes, coin.currentNodeUrl],
      // const bulkRegisterOptions = {
      //   uri: newNodeUrl + "/register-nodes-bulk",
      //   method: "POST",
      //   body: {
      //     allNetworkNodes: [...coin.networkNodes, coin.currentNodeUrl],
      //   },
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   json: true,
      // };
      // return rp(bulkRegisterOptions);
    });
    // .then((data) => {
    //   // implmementing consensus algorithm
    //   // const nodeConsensusResponse = [];
    //   // coin.networkNodes.forEach((nodeUrl) => {
    //   //   const nodeConsensus = {
    //   //     uri: nodeUrl + "/consensus",
    //   //     method: "get",
    //   //     json: true,
    //   //   };
    //   //   nodeConsensusResponse.push(rp(nodeConsensus));
    //   // });
    //   // Promise.all(nodeConsensusResponse).then((data) => {
    //   //   console.log("");
    //   // });

    //   return callBack(null, {
    //     note: "new node registered in network successfully !",
    //   });
    // });
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
  // return all nodes in the network (network nodes)
  returnNodesUrl: (callBack = () => {}) => {
    const urls = coin.networkNodes;
    // console.log(`urls = ${urls}`);
    return callBack(null, urls);
  },
  // count total votes of each candidte
  countVote: async (callBack = () => {}) => {
    console.log("called");
    // implmementing consensus algorithm
    // const nodeConsensus = {
    //   uri: coin.currentNodeUrl + "/consensus",
    //   method: "get",
    //   json: true,
    // };
    // const nodeConsensusResponse = rp(nodeConsensus);
    // Promise.resolve(nodeConsensusResponse).then((response) => {
    //   console.log(response);
    //   //
    // });

    //count votes
    const voteObject = [];
    getFullCandidate((error, results) => {
      if (error) {
        return null;
      } else {
        const candidates = results;
        candidates.forEach((candidate) => {
          // console.log(candidate.party_name);
          // console.log(candidate.name);

          const vote = coin.voteCount(
            candidate.name,
            candidate.candidate_address,
            candidate.category_name,
            candidate.party_name
          );
          CreateVote(vote);
          // voteObject.push(
          //   coin.voteCount(
          //     candidate.name,
          //     candidate.candidate_address,
          //     candidate.category_name,
          //     candidate.party_name
          //   )
          // );
        });
        // console.log(voteObject);
        // return callBack(null, voteObject);
      }
    });
  },
  boradcast: (data, callBack = () => {}) => {
    const newNodeUrl = data.newNodeUrl;
    const token = data.token;
    console.log(data);
    // register braodcast
    const registerNode = {
      uri: newNodeUrl + "/register-and-broadcast-node",
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: true,
    };
    const registerNodeResponse = rp(registerNode);
    Promise.resolve(registerNodeResponse).then((response) => {
      console.log(response);
      const allNetworkNodes = response.data.allNetworkNodes;
      allNetworkNodes.forEach((networkNodeUrl) => {
        const nodeNotAlreadyPresent =
          coin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = coin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode)
          coin.networkNodes.push(networkNodeUrl);
      });
      //
      //
    });
  },
};
