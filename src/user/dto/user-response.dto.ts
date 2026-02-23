import { User } from "src/user/entities/user.entity";

export class UserResponseDto { // Essa classe é um DTO usado para controlar quais dados são enviados na resposta da API, serve para: Filtrar os dados do usuário antes de enviar para o cliente, evitar expor informações sensíveis e padronizar o formato da resposta da API.
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}