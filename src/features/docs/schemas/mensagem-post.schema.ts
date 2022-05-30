export const mensagemPostSchema = {
    type: "object",
    properties: {

        descricao: {
            type: "string",
            summary: "Descrição da mensagem",
            example: "Mensagem nova",
        },
        
        detalhamento: {
            type: "string",
            summary: "Detalhamento da mensagem",
            example: "Detalhamento da mensagem nova",
        },

    },
};