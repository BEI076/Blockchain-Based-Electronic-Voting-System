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

const { adminCheckToken } = require("../auth/adminTokenValidation");
const { userCheckToken } = require("../auth/userTokenValidation");

router.get("/blockchain", getBlockchain);
router.post("/transaction", adminCheckToken, transaction);
router.post("/transaction-broadcast", adminCheckToken, transactionBroadcast);
router.post("/mine", adminCheckToken, userCheckToken, mine);
router.post("/receive-new-block", adminCheckToken, receiveNewBlock);

//nodes synchronization
router.post("/register-and-broadcast-node", registerBroadcast);
router.post("/register-node", registerNode);
router.post("/register-nodes-bulk", registerNodesBulk);

//block verification
router.get("/consensus", adminCheckToken, consensus);

//count vote
router.get("/count-vote", countVote);
module.exports = router;
