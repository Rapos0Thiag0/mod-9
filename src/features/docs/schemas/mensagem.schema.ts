export const mensagemSchema = {
    type: "object",
    properties: {
        uid: {
            type: "string",
            format: "uuid",
            summary: "UID da mensagem",
            example: "5e9f8f8f-b8f8-4f8f-8f8f-8f8f8f8f8f8f",
        },

        descricao: {
            type: "string",
            summary: "Descrição da mensagem",
            example: "Mensagem de teste",
        },
        
        detalhamento: {
            type: "string",
            summary: "Detalhamento da mensagem",
            example: "Detalhamento da mensagem de teste",
        },

        userUid: {
            type: "string",            
            format: "uuid",
            summary: "Uid do usuário que enviou a mensagem",
            example: "g6ui58dp-8649-7784-as4g-1f4yy8569d",
        },
    },
};