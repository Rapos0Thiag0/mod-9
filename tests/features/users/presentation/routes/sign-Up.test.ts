import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/Database";
import { UserEntity } from "../../../../../src/core/infra/data/database/entities/user";
import { UserRepository } from "../../../../../src/features/users/infra/repositories/user.repository";
import UserRoutes from "../../../../../src/features/users/presentation/routes/UserRoutes";

describe("POST /signup", () => {
  const database = new Database();
  const server = new App().server;

  beforeAll(async () => {
    await database.openConnection();
    server.use(express.json());
    server.use(new UserRoutes().init());
  });

  afterAll(async () => {
    await UserEntity.clear();
    jest.resetAllMocks();
    await database.closeConnection();
  });

  test("Deve retornar 200 após criar um novo usuário", async () => {
    await request(server)
      .post("/signup")
      .send({
        nome: "Qualquer_nome",
        senha: "321321321",
      })
      .expect(200)
      .expect(async (res) => {
        expect(res.body.uid).toBeTruthy;
        expect(res.body.nome).toBeTruthy;
        expect(res.body.mensagens).toBeTruthy;
        expect(res.body.mensagens).toStrictEqual([]);
        expect(res.body.nome).toBe("Qualquer_nome");
        expect(res.body.senha).toBe("321321321");
        expect(Number(res.body.senha)).toBeGreaterThan(99999999);
        expect(Number(res.body.senha)).toBeLessThan(999999999999);
      });
  });
  test("Deve retornar 500 após criar um novo usuário", async () => {
    await request(server)
      .post("/signup")
      .send({
        nome: "Qualquer_nome",
        senha: "321321321",
      })
      .expect(500)
      .expect(async (res) => {
        console.log(res);
        // expect(res.body.uid).toBeTruthy;
        // expect(res.body.nome).toBeTruthy;
        // expect(res.body.mensagens).toBeTruthy;
        // expect(res.body.mensagens).toStrictEqual([]);
        // expect(res.body.nome).toBe("Qualquer_nome");
        // expect(res.body.senha).toBe("321321321");
        // expect(Number(res.body.senha)).toBeGreaterThan(99999999);
        // expect(Number(res.body.senha)).toBeLessThan(999999999999);
      });
  });

  test("Deve retornar 400 com a mensagem de Empty Fields Error", async () => {
    await request(server)
      .post("/signup")
      .send()
      .expect(400, { error: "EMPTY_FIELDS_ERROR" });
  });

  test("Deve retornar 400 com a mensagem de lenght Pass Error", async () => {
    await request(server)
      .post("/signup")
      .send({
        nome: "Qualquer_nome",
        senha: "3213213",
      })
      .expect(400, { error: "LENGHT_PASS_ERROR" });
  });

  test("Deve retornar 500 com Internal Sever Error", async () => {
    jest
      .spyOn(UserRepository.prototype, "signUp")
      .mockRejectedValue(new Error("Qualquer_error"));

    await request(server)
      .post(`/signup`)
      .send({
        nome: "Qualquer_nome",
        senha: "321321321",
      })
      .expect(500, {
        error: "INTERNAL_SERVER_ERROR",
        message: "Qualquer_error",
      });
  });
});
