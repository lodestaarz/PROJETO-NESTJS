import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayLoad } from "./jwt-payload.type";
import { UserService } from "src/user/user.service";

@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy){
    // Primeiro é preciso checar a secret para não verificar tokens com chaves vazias.
    constructor(private readonly userService: UserService) {
        const secret = process.env.JWT_SECRET;

        if(!secret) {
            throw new InternalServerErrorException("JWT_SECRET not found in .env");
        }

        super({ // O super é uma palavra-chave do JS/TS usada para acessar a classe pai ( a classe que está sendo herdada com extends ). Ele basicamente serve para chamar o construtor da classe pai e acessar os métodos da classe pai
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payLoad: JwtPayLoad) {
        const user = await this.userService.findById(payLoad.sub);

        if(!user || user.forceLogout) {
            throw new UnauthorizedException("Você precisa fazer login!");
        }

        return user;
    }
}