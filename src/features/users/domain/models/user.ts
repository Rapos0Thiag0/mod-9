import { Mensagem } from "../../../mensagens/domain/models/mensagem";

export interface User {
  uid: string;
  nome: string;
  senha: string;
  mensagens?: Mensagem[];
}
