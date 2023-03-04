const { getVoterByEmail } = require("../api/service/voterService");
const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  userLogin: (req, res) => {
    const body = req.body;
    getVoterByEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
          state: false,
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h",
        });
        // console.log(jsontoken);
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          state: true,
          voter_data: results,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
          state: false,
        });
      }
    });
  },
};
