export const userCreatedSchema = {
    type: "object",
    properties: {
        uid: {
            type: "string",
            format: "uuid",
            summary: "UID do usuário",
            example: "g6ui58dp-8649-7784-as4g-1f4yy8569d",
        },
        nome: {
            type: "string",
            summary: "Nome do usuário", 
            example: "João da Silva",
        },
        senha1: {
            type: "string",
            summary: "Senha do usuário",
            example: "321321321",
            minLength: 8,
            maxLength: 12,
        },
        senha2: {
            type: "string",
            summary: "Repetir Senha do usuário",
            example: "321321321",
            minLength: 8,
            maxLength: 12,
        },
    },
};
