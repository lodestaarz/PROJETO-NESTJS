// Esse é o provider, mas comumente se coloca o nome do arquivo como "service"

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/user/user.service";
import { HashingService } from "src/common/hashing/hashing.service";
import { JwtService } from "@nestjs/jwt";
import { JwtPayLoad } from "./types/jwt-payload.type";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService, 
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService
    )  {}
    
    async doLogin(loginDto: LoginDto) { // Por conta da tipagem DTO, é necessário inserir email e password para realizar login
        // Check de email user: E-mail -> Repositório | UserService <- UserModule
        const user = await this.userService.findByEmail(loginDto.email);

        if(!user) {
            throw new UnauthorizedException("Usuário ou senha inválidos!");
        }

        // Comparar senha com hash -> HashingService <- CommonModule
        const isPasswordValid = await this.hashingService.compare(
            loginDto.password, 
            user.password
        );
        
        if(!isPasswordValid) {
            throw new UnauthorizedException("Usuário ou senha inválidos!");
        }

        // JwtService para assinar o JWT <- JwtModule
        const JwtPayLoad: JwtPayLoad = {
            sub: user.id,
            email: user.email,
        }   

        const acessToken = await this.jwtService.signAsync(JwtPayLoad);

        user.forceLogout = false;
        await this.userService.save(user);

        return { acessToken };
    }
}

