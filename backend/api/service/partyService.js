const prisma = require("../../config/prismaClient");

module.exports = {
  createParty: async (data, callBack = () => {}) => {
    try {
      const newParty = await prisma.party.create({
        data: {
          name: data.name,
        },
      });
      callBack(null, newParty);
    } catch (error) {
      callBack(error);
    }
  },
  getParty: async (callBack = () => {}) => {
    try {
      const parties = await prisma.party.findMany();
      callBack(null, parties);
    } catch (error) {
      callBack(error);
    }
  },
  deletePartyById: async (data, callBack = () => {}) => {
    try {
      const deletedParty = await prisma.party.delete({
        where: { p_id: data.p_id },
      });
      callBack(null, deletedParty);
    } catch (error) {
      callBack(error);
    }
  },
};
