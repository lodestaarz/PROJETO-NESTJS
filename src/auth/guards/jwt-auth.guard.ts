// Isso vai extender o @Guard para fechar o acesso das rotas pra usuários que não tenham um JSON Web Token.

import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Any } from "typeorm";

export class JwtAuthGuard extends AuthGuard("jwt") {
    // Se colocar return true; ou return false; ele altera o método como um todo para sempre aceitar ou negar o acesso. 
    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    //     return super.canActivate(context);
    // }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if(!user || info instanceof JsonWebTokenError) {
            throw new UnauthorizedException("Você precisa fazer login!");
        }
        
        return super.handleRequest(err, user, info, context, status); // Só está retornando porque única coisa que queremos é entrar no meio do método 
    }
}