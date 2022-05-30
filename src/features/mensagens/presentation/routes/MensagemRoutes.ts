import { Router } from "express";
import { CreateMessageController } from "../controllers/create-mensagem.controller";
import { DestroyMessageController } from "../controllers/delete-one-mensagem.controller";
import { EditMessageController } from "../controllers/edit-one-mensagem.controller";
import { GetAllMessagesController } from "../controllers/get-all-mensagens.controller";
import { GetByUidMessageController } from "../controllers/get-one-mensagem.controller";

export default class MensagemRoutes {
  public init(): Router {
    const routes = Router();

    routes.post("/mensagens", new CreateMessageController().handle);
    routes.get(
      "/mensagens/all",
      new GetAllMessagesController().handle
    );
    routes.get(
      "/mensagens/:uid",
      new GetByUidMessageController().handle
    );
    routes.put("/mensagens/:uid", new EditMessageController().handle);
    routes.delete(
      "/mensagens/:uid",
      new DestroyMessageController().handle
    );

    return routes;
  }
}
