import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { Mensagem } from "../../domain/models/mensagem";
import { MensagemRepository } from "../../infra/repositories/mensagem.repository";

export class GetAllMessagesController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { userUid } = req.params;

      const repository = new MensagemRepository();

      const mensagens = await repository.getAllMessages(userUid);

      if (mensagens.length === 0) return notFound(res, "MESSAGES_NOT_FOUND");

      return sucess(res, mensagens);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
