const prisma = require("../../config/prismaClient");

module.exports = {
  storeRawSData: async (data, callBack = () => {}) => {
    try {
      const newPrevoter = await prisma.prevoter.create({
        data: {
          name: data.name,
          address: data.address,
          email: data.email,
          password: data.password,
          citizenshipid: data.citizenshipId,
          dob: new Date(data.dob).toISOString(),
          frontImage: data.frontImage,
          backImage: data.backImage,
        },
      });
      callBack(null, newPrevoter);
    } catch (error) {
      callBack(error);
    }
  },
  getRawData: async (callBack = () => {}) => {
    try {
      const rawData = await prisma.prevoter.findMany();
      const results = rawData.map((row) => ({
        ...row,
        imageUrl1: `/uploads/${row.frontImage}`,
        imageUrl2: `/uploads/${row.backImage}`,
      }));
      callBack(null, results);
    } catch (error) {
      callBack(error);
    }
  },
  updateRawData: async (v_id, callBack = () => {}) => {
    try {
      const results = await prisma.prevoter.updateMany({
        where: {
          v_id: v_id,
        },
        data: {
          flag: true,
        },
      });
      callBack(null, results);
    } catch (error) {
      callBack(error);
    }
  },
};
