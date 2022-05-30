import { createMessagePath, deleteOneMessagePath, editOneMessagePath, getAllMessagesPath, getOneMessagePath } from "./docs/mensagens.path";
import { createdUserPath, loginUserPath } from "./docs/user.path";
import { mensagemSchema } from "./schemas/mensagem.schema";
import { mensagemPostSchema } from "./schemas/mensagem-post.schema";
import { userCreatedSchema } from "./schemas/user-created.schema";
import { userLoginSchema } from "./schemas/user-login.schema";

export default {
    openapi: "3.0.3",
    info: {
        title: "API de Mensagens",
        description: "Trabalho de conclusão de módulo Growdev - Documentação da Api de mensagens",
        version: "1.0.0",
        contact: {
            name: "Thiago Raposo",
            email: "osopar17@gmail.com",
        },
    },
    servers: [
        {
            url: "https://mod-9-test-swagger.herokuapp.com",
            description: "Servidor de Prod",
        },
        {
            url: "{protocol}://localhost:{port}",
            description: "Servidor de Teste",     
            variables: {
                protocol: {
                    enum: ["http", "https"],
                    default: "https",      
                },
                port: {
                    enum: [8080, 4444],
                    default: 8080,
                },
            },
        },
    ],
    tags: [
        {
            name: "Mensagens",
            description: "Mensagens do sistema da API",
        },
        {
            name: "Users",
            description: "Usuários do sistema da API",
        },
    ],
    paths: {
        "/mensagens/{uid}": {
            get:  getOneMessagePath,
            put: editOneMessagePath,
            delete: deleteOneMessagePath,
        },
        "/mensagens/all": {
            get: getAllMessagesPath,
        },
        "/mensagens": {
            post: createMessagePath,
        },
        "/signup": {
            post: createdUserPath,
        },
        "/signin": {
            post: loginUserPath,
        },

    },
    schemas: {
        mensagem: mensagemSchema,
        mensagemPost: mensagemPostSchema,
        userCreated: userCreatedSchema,
        userLogin: userLoginSchema,
    }, 
};

