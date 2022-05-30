import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/repositories/mensagem.repository";

export class CreateMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const repository = new MensagemRepository();

      const { userUid } = req.params;

      const mensagem = await repository.create({
        userUid: userUid,
        ...req.body,
      });

      return sucess(res, mensagem);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
