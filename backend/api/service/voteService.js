const pool = require("../../config/database");

module.exports = {
  CreateVote: (data, callBack = () => {}) => {
    pool.query(
      `INSERT INTO storevote (name, c_id, category, votes) VALUES (?,?,?,?)`,
      [data.name, data.c_id, data.category, data.votes],
      (error, results, fileds) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  DeleteVote: (callBack = () => {}) => {
    // console.log("trucate called");
    pool.query(`truncate storevote`, [], (error, results, fileds) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  GetVote: (callBack = () => {}) => {
    pool.query(`SELECT * FROM storevote`, [], (error, results, fileds) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
};
