import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controllers";
import {
  badRequest,
  notFound,
  serverError,
  sucess,
} from "../../../../core/presentation/helpers/http-helper";
import { MensagemRepository } from "../../infra/repositories/mensagem.repository";

export class EditMessageController implements Controller {
  async handle(req: Request, res: Response): Promise<any> {
    const data = req.body;
    console.log(data);

    if (!data.descricao || !data.detalhamento) {
      return badRequest(res, "EMPTY_FIELDS_ERROR");
    }
    try {
      const { uid } = req.params;
      const repository = new MensagemRepository();

      const mensagem = await repository.editMessage({
        uid,
        ...req.body,
      });

      if (!mensagem) return notFound(res, "MESSAGE_NOT_FOUND");

      return sucess(res, mensagem);
    } catch (err: any) {
      return serverError(res, err);
    }
  }
}
