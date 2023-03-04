const router = require("express").Router();
const {
  getBlockchain,
  transaction,
  transactionBroadcast,
  mine,
  receiveNewBlock,
  registerBroadcast,
  registerNode,
  registerNodesBulk,
  consensus,
  countVote,
} = require("./controller");

const { checkToken } = require("../auth/tokenValidation");


router.get("/blockchain",checkToken, getBlockchain);
router.post("/transaction", transaction);
router.post("/transaction-broadcast", transactionBroadcast);
router.get("/mine", mine);
router.post("/receive-new-block", receiveNewBlock);

//nodes synchronization
router.post("/register-and-broadcast-node", registerBroadcast);
router.post("/register-node", registerNode);
router.post("/register-nodes-bulk", registerNodesBulk);

//block verification
router.get("/consensus", consensus);

//count vote
router.get("/count-vote", countVote);
module.exports = router;
