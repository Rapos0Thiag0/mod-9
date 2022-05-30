export const userLoginSchema = {
    type: "object",
    properties: {
        nome: {
            type: "string",
            summary: "Nome do usuário",
            example: "João da Silva",
        },
        senha: {
            type: "string",
            summary: "Senha do usuário",
            example: "321321321",
            minLength: 8,
            maxLength: 12,
        },
    },
};