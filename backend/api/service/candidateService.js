const prisma = require("../../config/prismaClient");

module.exports = {
  createCandidate: async (data, callBack = () => {}) => {
    try {
      const newCandidate = await prisma.candidate.create({
        data: {
          name: data.name,
          address: data.address,
          citizenshipid: data.citizenshipid,
          dob: new Date(data.dob).toISOString(),
          c_id: data.c_id,
          p_id: data.p_id,
          candidate_address: data.candidate_address,
        },
      });
      callBack(null, newCandidate);
    } catch (error) {
      console.log(`error = ${error}`);
      callBack(error);
    }
  },
  getCandidateById: async (id, callBack = () => {}) => {
    try {
      const candidate = await prisma.candidate.findUnique({
        where: { ca_id: id },
      });
      callBack(null, candidate);
    } catch (error) {
      callBack(error);
    }
  },
  getCandidateByCategory: async (data, callBack = () => {}) => {
    try {
      const candidates = await prisma.candidate.findMany({
        where: { c_id: data.c_id },
      });
      callBack(null, candidates);
    } catch (error) {
      callBack(error);
    }
  },
  getCandidate: async (callBack = () => {}) => {
    try {
      const candidates = await prisma.candidate.findMany();
      callBack(null, candidates);
    } catch (error) {
      callBack(error);
    }
  },
  getFullCandidate: async (callBack = () => {}) => {
    try {
      const candidates = await prisma.candidate.findMany({
        select: {
          ca_id: true,
          candidate_address: true,
          name: true,
          address: true,
          citizenshipid: true,
          dob: true,
          category: {
            select: {
              name: true,
            },
          },
          party: {
            select: {
              name: true,
            },
          },
        },
      });

      const candidatesWithCategoryAndParty = candidates.map((candidate) => ({
        ...candidate,
        category_name: candidate.category.name,
        party_name: candidate.party.name,
      }));

      callBack(null, candidatesWithCategoryAndParty);
    } catch (error) {
      callBack(error);
    }
  },
  deleteCandidate: async (data, callBack) => {
    try {
      const deletedCandidate = await prisma.candidate.delete({
        where: { ca_id: data.ca_id },
      });
      callBack(null, deletedCandidate);
    } catch (error) {
      callBack(error);
    }
  },
};
