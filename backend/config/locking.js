const zookeeper = require("node-zookeeper-client");
const os = require("os");
const zkClient = zookeeper.createClient("192.168.1.92:2181");
const lockPath = "/blockchain-lock-" + os.hostname() + "-seq-";

zkClient.connect();
zkClient.once("connected", () => {
  console.log("Connected to ZooKeeper ensemble");
});

module.exports = {
  acquireLock: async () => {
    return new Promise((resolve, reject) => {
      zkClient.create(
        lockPath,
        zookeeper.CreateMode.EPHEMERAL_SEQUENTIAL,
        (error, path) => {
          if (error) {
            reject(error);
          } else {
            console.log("Acquired lock:", path);
            zkClient.exists(
              path,
              (event) => {
                if (event) {
                  console.log("Lock state changed:", event);
                } else {
                  console.log("Lock node deleted");
                }
              },
              (error, state) => {
                if (error) {
                  console.error("Failed to set watch on lock node:", error);
                } else {
                  console.log("Watch set on lock node:", state);
                }
              }
            );
            resolve(path);
          }
        }
      );
    });
  },
  releaseLock: async () => {
    zkClient.getChildren("/", false, (error, children) => {
      if (error) {
        console.error("Failed to get children:", error);
        return;
      }
      const lockNodes = children.filter((child) => child.startsWith("blockchain-lock"));
      lockNodes.sort();
      if (lockNodes.length > 0) {
        const firstLockNode = lockNodes[0];
        const lockNodePath = "/" + firstLockNode;
        zkClient.remove(lockNodePath, -1, (error, path) => {
          if (error) {
            console.error("Failed to release lock:", error);
          } else {
            console.log("Lock released:", path);
          }
        });
      }
    });
  },
};
