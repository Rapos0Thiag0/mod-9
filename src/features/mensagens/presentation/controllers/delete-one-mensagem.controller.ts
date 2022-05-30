import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/repositories/mensagem.repository";

export class DestroyMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { uid, userUid } = req.params;

      const repository = new MensagemRepository();
      const mensagem = await repository.destroy(uid, userUid);

      if (!mensagem) return notFound(res, "MESSAGE_NOT_FOUND");

      return sucess(res, mensagem);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
