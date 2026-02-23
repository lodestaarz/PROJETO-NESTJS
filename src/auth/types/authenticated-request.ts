import { Request } from "express"; // Aqui não usa o import type porque o controller força virar import type. Pesquisar depois uma resposta pra isso
import { User } from "src/user/entities/user.entity";


export interface AuthenticatedRequest extends Request {
    user: User;
}