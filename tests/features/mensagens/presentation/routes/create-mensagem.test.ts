import request from "supertest";
import express from "express";
import App from "../../../../../src/core/presentation/app";
import Database from "../../../../../src/core/infra/data/connections/Database";
import { UserEntity } from "../../../../../src/core/infra/data/database/entities/user";
import { MensagemEntity } from "../../../../../src/core/infra/data/database/entities/mensagem";
import { MensagemRepository } from "../../../../../src/features/mensagens/infra/repositories/mensagem.repository";
import MensagemRoutes from "../../../../../src/features/mensagens/presentation/routes/MensagemRoutes";
import { v4 as uuid } from "uuid";

const makeUser = async (): Promise<UserEntity> => {
  return await UserEntity.create({
    nome: "Qualquer_nome",
    senha: uuid(),
  }).save();
};

describe("POST /mensagens", () => {
  const database = new Database();
  const server = new App().server;

  beforeEach(async () => {
    await database.openConnection();
    server.use(express.json());
    server.use(new MensagemRoutes().init());
  });

  afterEach(async () => {
    await MensagemEntity.clear();
    await UserEntity.clear();
    jest.resetAllMocks();
    await database.closeConnection();
  });

  test("Deve retornar 200 com uma mensagem criada contendo: uid, detalhamento, descrição e userUid", async () => {
    const user = await makeUser();

    await request(server)
      .post(`/mensagens/${user.uid}`)
      .send({
        descricao: "Qualquer_descrição",
        detalhamento: "Qualquer_detalhamento",
        userUid: user.uid,
      })
      .expect(200)
      .expect(async (res) => {
        expect(res.body.uid).toBeTruthy();
        expect(res.body.descricao).toBe("Qualquer_descrição");
        expect(res.body.detalhamento).toBe("Qualquer_detalhamento");
        expect(res.body.userUid).toBe(user.uid);
      });
  });

  test("Deve retornar 500 com Internal Sever Error", async () => {
    jest
      .spyOn(MensagemRepository.prototype, "create")
      .mockRejectedValue(new Error("Qualquer_error"));

    const userErro500 = await makeUser();

    await request(server).post(`/mensagens/${userErro500}`).send().expect(500, {
      error: "INTERNAL_SERVER_ERROR",
      message: "Qualquer_error",
    });
  });
});
