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

const makeMensagem = async (userUid: string): Promise<MensagemEntity> => {
  return await MensagemEntity.create({
    detalhamento: "Qualuqer_detalhamento",
    descricao: "Qualquer_descrição",
    userUid: userUid,
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

  test("DEve retorar 200, ao buscar a mensagem pelo uid", async () => {
    const user = await makeUser();
    const mensagem = await makeMensagem(user.uid);

    await request(server)
      .get(`/mensagens/${mensagem.uid}`)
      .send()
      .expect(200)
      .expect(async (res) => {
        expect(res.body.uid).toBe(mensagem.uid);
        expect(res.body.detalhamento).toBe(mensagem.detalhamento);
        expect(res.body.descricao).toBe(mensagem.descricao);
      });
  });

  test("Deve retornar 404 com a mensagem Data not found", async () => {
    await request(server)
      .get(`/mensagens/${uuid()}`)
      .send()
      .expect(404, { error: "MESSAGE_NOT_FOUND" });
  });

  test("Deve retornar 500 com Internal Sever Error", async () => {
    jest
      .spyOn(MensagemRepository.prototype, "getByUid")
      .mockRejectedValue(new Error("Qualquer_error"));

    const userErro500 = await makeUser();
    const mensagemErro500 = await makeMensagem(userErro500.uid);

    await request(server)
      .get(`/mensagens/${mensagemErro500.uid}`)
      .send()
      .expect(500, {
        error: "INTERNAL_SERVER_ERROR",
        message: "Qualquer_error",
      });
  });
});
