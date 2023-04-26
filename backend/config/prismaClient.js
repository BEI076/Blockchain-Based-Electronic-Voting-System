// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;

// async function createProduct() {
//   const newProduct = await prisma.product.create({
//     data: {
//       name: "Sample Product",
//       description: "This is a sample product description.",
//       price: 19.99,
//     },
//   });

//   console.log("New product created:", newProduct);
//   return newProduct;
// }
