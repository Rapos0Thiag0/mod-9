import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/Database";
import { UserEntity } from "../../../../../src/core/infra/data/database/entities/user";
import { UserRepository } from "../../../../../src/features/users/infra/repositories/user.repository";
import UserRoutes from "../../../../../src/features/users/presentation/routes/UserRoutes";

describe("POST /signin", () => {
  const database = new Database();
  const server = new App().server;

  beforeEach(async () => {
    await database.openConnection();
    server.use(express.json());
    server.use(new UserRoutes().init());
  });

  afterEach(async () => {
    await UserEntity.clear();
    jest.resetAllMocks();
    await database.closeConnection();
  });

  const makeUser = async (): Promise<UserEntity> => {
    return await UserEntity.create({
      nome: "Qualquer_nome",
      senha: "321321321",
    }).save();
  };

  test("Deve retornar 200 ao logar e retornar o userUid", async () => {
    const user = await makeUser();

    await request(server)
      .post("/signin")
      .send({ nome: "Qualquer_nome", senha: "321321321" })
      .expect(200)
      .expect(async (res) => {
        expect(res.body).toBeTruthy;
        expect(res.body).toEqual(user.uid);
      });
  });

  test("Deve retornar 404 com a mensagem de User Not Found Error", async () => {
    await request(server)
      .post("/signin")
      .send()
      .expect(404, { error: "USER_NOT_FOUND_ERROR" });
  });

  test("Deve retornar 500 com Internal Sever Error", async () => {
    jest
      .spyOn(UserRepository.prototype, "signIn")
      .mockRejectedValue(new Error("Qualquer_error"));

    await request(server)
      .post(`/signin`)
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
