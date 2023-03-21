// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
const zookeeper = require("node-zookeeper-client");
const os = require("os");

// Configure body parser to handle JSON data
// app.use(bodyParser.json());

// Configure ZooKeeper connection settings
const zkClient = zookeeper.createClient("192.168.1.92:2181");
const lockPath = "/blockchain-lock-" + os.hostname();

// Connect to ZooKeeper ensemble
zkClient.connect();
zkClient.once("connected", () => {
  console.log("Connected to ZooKeeper ensemble");
});

module.exports = {
  acquireLock: async () => {
    return new Promise((resolve, reject) => {
      zkClient.create(
        lockPath,
        zookeeper.CreateMode.EPHEMERAL,
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
    zkClient.remove(lockPath, -1, (error, path) => {
      if (error) {
        console.error("Failed to release lock:", error);
      } else {
        console.log("Lock released:", path);
      }
    });
  },
};
// Acquire a lock in ZooKeeper
// function acquireLock() {
//   console.log("locked");
// }

// // Release the lock in ZooKeeper
// function releaseLock(lockPath) {
//   zkClient.remove(lockPath, -1, (error, path) => {
//     if (error) {
//       console.error("Failed to release lock:", error);
//     } else {
//       console.log("Lock released:", path);
//     }
//   });
// }

// Add a block to the blockchain
// app.post("/test", async (req, res) => {
//   try {
//     const lockPath = await acquireLock();
//     // Perform critical section of code here
//     console.log("Performing actions");
//     setTimeout(() => {
//       releaseLock(lockPath);
//     }, 5000);
//     res.status(200).json({ message: "Block added to blockchain" });
//   } catch (error) {
//     console.error("Error acquiring lock:", error);
//     res.status(500).json({ error: "Failed to add block to blockchain" });
//   }
// });

// app.get("/api", async (req, res) => {
//   return res.json({
//     message: "Hello World",
//   });
// });

// // Start the ExpressJS server
// app.listen(3002, () => {
//   console.log("ExpressJS server running on port 3002");
// });
