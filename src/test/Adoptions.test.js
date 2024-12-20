import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:3000");

describe("Testing Adoptions API", () => {
  describe("GET /api/adoptions", () => {
    it("Debe obtener todas las adopciones", async () => {
      const { statusCode, body } = await requester.get("/api/adoptions");

      expect(statusCode).to.equal(200);

      expect(body.status).to.equal("success");
      expect(body.payload).to.be.an("array");
    });
  });

  describe("GET /api/adoptions/:aid", () => {
    it("Debe obtener una adopción específica por ID", async () => {
      const adoptionId = "6764ffda5908115ed125671c";

      const { statusCode, body } = await requester.get(
        `/api/adoptions/${adoptionId}`
      );

      // Validar código de estado
      expect(statusCode).to.equal(200);

      expect(body.status).to.equal("success");
      expect(body.payload).to.have.property("_id", adoptionId);
    });

    it("Debe devolver error si la adopción no existe", async () => {
      const adoptionId = "6764ffda5908115ed125671d";

      const { statusCode, body } = await requester.get(
        `/api/adoptions/${adoptionId}`
      );

      expect(statusCode).to.equal(404);

      expect(body.status).to.equal("error");
      expect(body.error).to.equal("Adoption not found");
    });
  });

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("Debe crear una adopción correctamente", async () => {
      const userId = "6764ffa25908115ed12566b1";
      const petId = "6736c7d9ad4c9990688923dc";

      const { statusCode, body } = await requester.post(
        `/api/adoptions/${userId}/${petId}`
      );

      expect(statusCode).to.equal(200);

      expect(body.status).to.equal("success");
      expect(body.message).to.equal("Pet adopted");
    });

    it("Debe devolver error si el usuario no existe", async () => {
      const userId = "6764ffa25908115ed12566b0";
      const petId = "6736be95c5b2fffcaca242e2";

      const { statusCode, body } = await requester.post(
        `/api/adoptions/${userId}/${petId}`
      );

      expect(statusCode).to.equal(404);

      expect(body.status).to.equal("error");
      expect(body.error).to.equal("user Not found");
    });

    it("Debe devolver error si la mascota no existe", async () => {
      const userId = "6764ffa25908115ed12566b1";
      const petId = "6736be95c5b2fffcaca242e3";

      const { statusCode, body } = await requester.post(
        `/api/adoptions/${userId}/${petId}`
      );

      expect(statusCode).to.equal(404);

      expect(body.status).to.equal("error");
      expect(body.error).to.equal("Pet not found");
    });

    it("Debe devolver error si la mascota ya está adoptada", async () => {
      const userId = "6764ffa25908115ed12566b1";
      const petId = "6736be95c5b2fffcaca242e2";

      const { statusCode, body } = await requester.post(
        `/api/adoptions/${userId}/${petId}`
      );

      expect(statusCode).to.equal(400);

      expect(body.status).to.equal("error");
      expect(body.error).to.equal("Pet is already adopted");
    });
  });
});
