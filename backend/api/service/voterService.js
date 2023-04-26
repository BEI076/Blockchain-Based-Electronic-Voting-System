const prisma = require("../../config/prismaClient");

module.exports = {
  createVoter: async (data, callBack = () => {}) => {
    try {
      const newVoter = await prisma.voter.create({
        data: {
          name: data.name,
          address: data.address,
          email: data.email,
          citizenshipid: data.citizenshipid,
          dob: new Date(data.dob).toISOString(),
          password: data.password,
          voter_address: data.voter_address,
          voter_id: data.voter_id,
        },
      });
      callBack(null, newVoter);
    } catch (error) {
      callBack(error);
    }
  },
  updateVoterByVoterAddress: async (data, callBack = () => {}) => {
    try {
      const updatedVoter = await prisma.voter.update({
        where: { voter_address: data.voter_address },
        data: { flag: true },
      });
      callBack(null, updatedVoter);
    } catch (error) {
      callBack(error);
    }
  },
  getVoterByEmail: async (email, callBack = () => {}) => {
    try {
      const voter = await prisma.voter.findUnique({
        where: { email: email },
      });
      callBack(null, voter);
    } catch (error) {
      callBack(error);
    }
  },
  getVoter: async (callBack = () => {}) => {
    try {
      const voters = await prisma.voter.findMany();
      callBack(null, voters);
    } catch (error) {
      callBack(error);
    }
  },
  deleteVoter: async (data, callBack) => {
    try {
      const deletedVoter = await prisma.voter.delete({
        where: { v_id: data.v_id },
      });
      callBack(null, deletedVoter);
    } catch (error) {
      callBack(error);
    }
  },
};
