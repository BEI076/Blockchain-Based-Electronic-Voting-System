const prisma = require("../../config/prismaClient");

module.exports = {
  createVote: async (data, callBack = () => {}) => {
    try {
      const newVote = await prisma.result.create({
        data: {
          candidate_name: data.candidate_name,
          candidate_address: data.candidate_address,
          party_name: data.party_name,
          category_name: data.category_name,
          votes: data.votes,
        },
      });
      callBack(null, newVote);
    } catch (error) {
      callBack(error);
    }
  },
  deleteVote: async (callBack = () => {}) => {
    try {
      const deletedVotes = await prisma.result.deleteMany();
      callBack(null, deletedVotes);
    } catch (error) {
      callBack(error);
    }
  },
  getVote: async (callBack = () => {}) => {
    try {
      const votes = await prisma.result.findMany({
        orderBy: { votes: "desc" },
      });
      const votesAsString = votes.map((data) => ({
        ...data,
        votes: data.votes.toString(),
      }));

      callBack(null, votesAsString);
    } catch (error) {
      callBack(error);
    }
  },
};
