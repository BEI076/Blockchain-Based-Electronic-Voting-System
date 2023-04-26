const prisma = require("../../config/prismaClient");
module.exports = {
  createAdmin: async ({ username, password }, callBack = () => {}) => {
    try {
      const newAdmin = await prisma.admin.create({
        data: {
          username: username,
          password: password,
        },
      });
      console.log("New admin created:", newAdmin);
      callBack(null, newAdmin);
    } catch (error) {
      console.error(error);
      callBack(error);
    }
  },
  getAdminByUsername: async (username, callBack = () => {}) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: {
          username: username,
        },
      });

      console.log("Admin found:", admin);
      callBack(null, admin);
    } catch (error) {
      console.error("Error while fetching admin by username:", error);
      callBack(error);
    }
  },
  getAdmin: async (callBack = () => {}) => {
    try {
      const admins = await prisma.admin.findMany();
      console.log("All admins:", admins);
      callBack(null, admins);
    } catch (error) {
      console.error("Error while fetching all admins:", error);
      callBack(error);
    }
  },
  deleteAdmin: async (id, callBack = () => {}) => {
    try {
      // Check if the admin exists
      const admin = await prisma.admin.findUnique({
        where: { a_id: id },
      });

      if (!admin) {
        console.error(`Admin with id ${id} not found.`);
        callBack(null, `Admin with id ${id} not found.`);
      }

      // If the admin exists, proceed with the deletion
      const deletedAdmin = await prisma.admin.delete({
        where: { a_id: id },
      });

      console.log("Admin deleted:", deletedAdmin);
      callBack(null, deletedAdmin);
    } catch (error) {
      console.error("Error while deleting admin:", error);
      callBack(error);
    }
  },
};
