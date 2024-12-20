import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest("http://localhost:3000");

describe("Testing Pets API", () => {
  describe("Test de mascotas", () => {
    it("El endpoint /api/pets crea una mascota", async () => {
      const petMock = {
        name: "Patitas",
        specie: "Pez",
        birthDate: "10-10-2022",
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/pets")
        .send(petMock);

      // Validar código de estado
      expect(statusCode).to.equal(200);
      expect(ok).to.be.true;

      // Validar payload
      expect(_body.payload).to.have.property("_id");
      expect(_body.payload.name).to.equal(petMock.name);
      expect(_body.payload.specie).to.equal(petMock.specie);
    });
  });
});
