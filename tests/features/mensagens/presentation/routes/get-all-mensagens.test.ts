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

describe("GET /mensagens/uid", () => {
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

  test("Deve retornar 200 com todas as mensagens de um usuário", async () => {
    const user = await makeUser();

    const mensagemMockada1 = await MensagemEntity.create({
      descricao: "Qualquer_descrição_1",
      detalhamento: "Qualquer_detalhamento_1",
      userUid: user.uid,
    }).save();
    const mensagemMockada2 = await MensagemEntity.create({
      descricao: "Qualquer_descrição_2",
      detalhamento: "Qualquer_detalhamento_2",
      userUid: user.uid,
    }).save();
    const mensagemMockada3 = await MensagemEntity.create({
      descricao: "Qualquer_descrição_3",
      detalhamento: "Qualquer_detalhamento_3",
      userUid: user.uid,
    }).save();

    await request(server)
      .get(`/mensagens/${user.uid}/all`)
      .send()
      .expect(200)
      .expect(async (res) => {
        expect(res.body).toHaveLength(3);
        expect(res.body[2]).toEqual({
          uid: mensagemMockada3.uid,
          descricao: mensagemMockada3.descricao,
          detalhamento: mensagemMockada3.detalhamento,
          userUid: mensagemMockada3.userUid,
        });
        expect(res.body[0]).toEqual({
          uid: mensagemMockada1.uid,
          descricao: mensagemMockada1.descricao,
          detalhamento: mensagemMockada1.detalhamento,
          userUid: mensagemMockada1.userUid,
        });
        expect(res.body[1]).toEqual({
          uid: mensagemMockada2.uid,
          descricao: mensagemMockada2.descricao,
          detalhamento: mensagemMockada2.detalhamento,
          userUid: mensagemMockada2.userUid,
        });
        expect(res.body[0]).toHaveProperty("uid");
        expect(res.body[1]).toHaveProperty("uid");
        expect(res.body[2]).toHaveProperty("uid");
        expect(res.body[0].userUid).toEqual(res.body[1].userUid);
        expect(res.body[1].userUid).toEqual(res.body[2].userUid);
      });
  });

  test("Deve retornar 404 com a mensagem Data not found", async () => {
    await request(server)
      .get(`/mensagens/${uuid()}/all`)
      .send()
      .expect(404, { error: "MESSAGES_NOT_FOUND" });
  });

  test("Deve retornar 500 com Internal Sever Error", async () => {
    jest
      .spyOn(MensagemRepository.prototype, "getAllMessages")
      .mockRejectedValue(new Error("Qualquer_error"));

    const userErro500 = await makeUser();

    await request(server)
      .get(`/mensagens/${userErro500}/all`)
      .send()
      .expect(500, {
        error: "INTERNAL_SERVER_ERROR",
        message: "Qualquer_error",
      });
  });
});
