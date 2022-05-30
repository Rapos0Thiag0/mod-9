// /signup
export const createdUserPath = {
    tags: ["Users"],
    summary: "Cria um novo usuário",
    title: "Cria um novo usuário",
    description: "Cria um novo usuário",
    parameters: [],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#schemas/userCreated",
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
                        $ref: "#schemas/userCreated",
                    },
                },
            },
        },
        400: {
            description: "Erro",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "INVALID_DATA",
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: "Erro no sistema ao criar usuário",
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
// /signin
export const loginUserPath = {
    tags: ["Users"],
    summary: "Faz login no sistema",
    title: "Faz login no sistema",
    description: "Faz login no sistema",
    parameters: [],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    $ref: "#schemas/userLogin",
                },
            },
        },
    },
    responses: {
        200: {
            description: "Sucesso",
            content: {
                "application/json": {
                    type: "string",
                    format: "uuid",
                    example: "5e9f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f",
                },
            },
        },
        404: {
            description: "Usuário não encontrado",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string",
                                example: "USER_NOT_FOUND_ERROR",
                            },
                        },
                    },
                },
            },
        },
        500: {
            description: "Erro no sistema ao fazer login",
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

