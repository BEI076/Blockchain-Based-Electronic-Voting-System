const prisma = require("../../config/prismaClient");

module.exports = {
  createCategory: async (data, callBack = () => {}) => {
    try {
      const newCategory = await prisma.category.create({
        data: {
          name: data.name,
        },
      });
      callBack(null, newCategory);
    } catch (error) {
      callBack(error);
    }
  },
  getCategoryById: async (id, callBack = () => {}) => {
    try {
      const category = await prisma.category.findUnique({
        where: { c_id: id },
      });
      callBack(null, category);
    } catch (error) {
      callBack(error);
    }
  },
  getCategory: async (callBack = () => {}) => {
    try {
      const categories = await prisma.category.findMany();
      callBack(null, categories);
    } catch (error) {
      callBack(error);
    }
  },
  deleteCategory: async (data, callBack) => {
    try {
      const deletedCategory = await prisma.category.delete({
        where: { c_id: data.c_id },
      });
      callBack(null, deletedCategory);
    } catch (error) {
      callBack(error);
    }
  },
};
