const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const {
  createVoter,
  getVoterById,
  getVoter,
  deleteVoter,
  updateVoterById,
} = require("../service/voterService");

module.exports = {
  createVoter: (req, res) => {
    const salt = genSaltSync(10);
    req.body.voter_address = uuidv4().split("-").join(salt).split(".").join("");
    req.body.voter_id = Math.floor(Math.random() * 900000) + 100000;
    req.body.password = hashSync(req.body.password, salt);
    createVoter(req.body, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection failed",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Voter Created sucessfully",
      });
    });
  },
  updateVoterById: (req, res) => {
    // console.log(`voter id = ${req.body.id}`);
    updateVoterById(req.body, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection failed",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getVoterById: (req, res) => {
    const id = req.params.id;
    getVoterById(id, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection failed",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getVoter: (req, res) => {
    getVoter((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  deleteVoter: (req, res) => {
    deleteVoter(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
};
