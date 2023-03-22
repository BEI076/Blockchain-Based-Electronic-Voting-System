const zookeeper = require("node-zookeeper-client");
const os = require("os");
const zkClient = zookeeper.createClient("192.168.1.92:2181");
const lockPath = "/blockchain-lock-" + os.hostname() + "-seq-";
const barrierPath = "/blockchain-barrier";

zkClient.connect();
zkClient.once("connected", () => {
  console.log("Connected to ZooKeeper ensemble");
});

let lockSeq = null;
let lockNodePath = null;

const createLock = () => {
  return new Promise((resolve, reject) => {
    zkClient.create(
      lockPath,
      zookeeper.CreateMode.EPHEMERAL_SEQUENTIAL,
      (error, path) => {
        if (error) {
          reject(error);
        } else {
          console.log("Acquired lock:", path);
          lockNodePath = path;
          lockSeq = parseInt(path.split("-")[3]);
          zkClient.getChildren("/", false, (error, children) => {
            if (error) {
              console.error("Failed to get children:", error);
              return;
            }
            const lockNodes = children.filter((child) =>
              child.startsWith("blockchain-lock")
            );
            lockNodes.sort();
            if (lockNodes.length === 1 || lockSeq === parseInt(lockNodes[0].split("-")[3])) {
              resolve();
            } else {
              const previousLockNode = lockNodes.find(
                (node) => parseInt(node.split("-")[3]) < lockSeq
              );
              if (previousLockNode) {
                zkClient.exists(
                  "/" + previousLockNode,
                  (event) => {
                    console.log("Lock state changed:", event);
                    createLock();
                  },
                  (error, state) => {
                    if (error) {
                      console.error("Failed to set watch on lock node:", error);
                      reject(error);
                    } else {
                      console.log("Watch set on lock node:", state);
                    }
                  }
                );
              }
            }
          });
        }
      }
    );
  });
};

module.exports = {
  acquireLock: async () => {
    await createLock();
    return lockNodePath;
  },
  releaseLock: async (lockNodePath) => {
    zkClient.remove(lockNodePath, -1, (error, path) => {
      if (error) {
        console.error("Failed to release lock:", error);
      } else {
        console.log("Lock released:", path);
      }
    });
  },

};

