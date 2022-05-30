import { UserEntity } from "../../../../core/infra/data/database/entities/user";
import { User } from "../../domain/models/user";

interface UserParams {
  uid?: string;
  nome: string;
  senha: string;
}

export class UserRepository {
  async signUp(data: UserParams): Promise<User> {
    const verificaNome = await UserEntity.findOne({
      where: { nome: data.nome },
    });

    if (verificaNome) throw new Error("ALREADY_EXIST_USER_ERROR");

    const userEntity = UserEntity.create({
      nome: data.nome,
      senha: data.senha,
    });

    await userEntity.save();

    return this.mapperFromEntityToModel(userEntity);
  }

  async signIn(data: UserParams): Promise<User | undefined> {
    const userEntity = await UserEntity.findOne({
      where: { nome: data.nome },
    });

    if (!userEntity) return undefined;

    return this.mapperFromEntityToModel(userEntity);
  }

  private mapperFromEntityToModel(entity: UserEntity): User {
    return {
      uid: entity.uid,
      nome: entity.nome,
      senha: entity.senha,
      mensagens: [],
    };
  }
}
