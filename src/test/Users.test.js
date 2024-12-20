// import mongoose from "mongoose";
// import User from "../dao/Users.dao.js";
// import assert from "assert";

// mongoose.connect(
//   "mongodb+srv://joseperu2503:kOtUcaPllftnCVim@cluster0.95r6x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// );

// describe("Testing Users DTO", () => {
//   before(function () {
//     this.usersDAO = new User();
//   });

//   it("Deveria devolver los usuarios de la DB", async function () {
//     this.timeout(5000);
//     try {
//       const result = await this.usersDAO.get();
//       assert.strictEqual(Array.isArray(result) && result.length >= 0, true);
//     } catch (error) {
//       console.error("Error durante el test", error);
//       assert.fail("El test falló con un error");
//     }
//   });

//   afterEach(async function () {
//     this.timeout(5000);
//     try {
//       await mongoose.connection.collection("users").drop();
//     } catch (error) {
//       console.warn("La colección no existe o no pudo ser eliminada");
//     }
//   });
// });
