// /mensagens/:uid
export const getOneMessagePath = {
    tags: ["Mensagens"],
    summary: "Retorna o conteúdo de uma mensagem",
    title: "Informações de uma mensagem pelo UID",
    description: "Retorna as informações de uma mensagem pelo UID",
    parameters: [
        {
            name: "uid",
            in: "path",
            description: "UID da mensagem",
            required: true,    
            schema: {
                type: "string",
                format: "uuid",
            },
        },           
    ],
    responses: {
        200: {
            description: "Sucesso",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#schemas/mensagem",
                    },
                },
            },
        },
        404: {
            description: "Mensagem não encontrada",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "MESSAGE_NOT_FOUND",
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: "Erro no sistema ao buscar mensagem",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "INTERNAL_SERVER_ERROR",
                            },
                        },
                    },
                },
            },
        },
    },
};

// /mensagens/:uid
export const editOneMessagePath = {
    tags: ["Mensagens"],
    summary: "Edita o conteúdo de uma mensagem",
    title: "Informações de uma mensagem pelo UID",
    description: "Edita as informações de uma mensagem pelo UID",
    parameters: [
        {
            name: "uid",
            in: "path",
            description: "UID da mensagem",
            required: true,    
            schema: {
                type: "string",
                format: "uuid",
            },
        },           
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#schemas/mensagem",
                },
            },
        },
    },
    responses: {
        200: {
            description: "Sucesso",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        $ref: "#schemas/mensagem",
                    },
                },
            },
        },
        404: {
            description: "Mensagem não encontrada",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "MESSAGE_NOT_FOUND",
                            },
                        },
                    },
                },
            },
        },        
        500: {
            description: "Erro no sistema ao editar mensagem",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "INTERNAL_SERVER_ERROR",
                            },
                        },
                    },
                },
            },
        },
    },
};

// /mensagens/:uid
export const deleteOneMessagePath = {
    tags: ["Mensagens"],
    summary: "Deleta o conteúdo de uma mensagem",
    title: "Informações de uma mensagem pelo UID",
    description: "Deleta as informações de uma mensagem pelo UID",
    parameters: [
        {
            name: "uid",
            in: "path",
            description: "UID da mensagem",
            required: true,    
            schema: {
                type: "string",
                format: "uuid",
            },
        },           
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#schemas/mensagem",
                },
            },
        },
    },
    responses: {
        200: {
            description: "Sucesso",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        $ref: "#schemas/mensagem",
                    },
                },
            },
        },
        404: {
            description: "Mensagem não encontrada",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "MESSAGE_NOT_FOUND",
                            },
                        },
                    },
                },
            },
        },        
        500: {
            description: "Erro no sistema ao deletar mensagem",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "INTERNAL_SERVER_ERROR",
                            },
                        },
                    },
                },
            },
        },
    },
};

// /mensagens/all
export const getAllMessagesPath = {
    tags: ["Mensagens"],
    summary: "Retorna todas as mensagens",
    title: "Informações de todas as mensagens",
    description: "Retorna as informações de todas as mensagens",
    parameters: [],
    responses: {
        200: {
            description: "Sucesso",
            content: {
                "application/json": {
                    schema: {
                            $ref: "#schemas/mensagem",                        
                    },
                },
            },
        },
        404: {
            description: "Mensagens não encontradas",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "MESSAGES_NOT_FOUND",
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: "Erro no sistema ao buscar mensagens",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "INTERNAL_SERVER_ERROR",
                            },
                        },
                    },
                },
            },
        },
    },
};

// /mensagens
export const createMessagePath = {
    tags: ["Mensagens"],
    summary: "Cria uma mensagem",
    title: "Cria uma mensagem",
    description: "Cria uma mensagem",
    parameters: [],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#schemas/mensagemPost",
                },
            },
        },
    },
    responses: {
        200: {
            description: "Sucesso",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "Mensagem criada com sucesso",
                            },
                        },
                    }, 
                },
            },
        },
        500: {
            description: "Erro no sistema ao criar mensagem",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "INTERNAL_SERVER_ERROR",
                            },
                        },
                    },
                },
            },
        },
    },
};




