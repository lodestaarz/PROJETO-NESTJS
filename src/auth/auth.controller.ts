import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

// Como o module, o controller precisa estar decorado com o decorator "@Controller()" do NestJS.
@Controller('auth') // Com o 'auth' no parâmetro do decorator, tudo que tiver dentro desse controler e tiver uma rota qualquer vai ser mapeado como /auth, ex: /auth/login
export class AuthController {
    constructor(private readonly authService: AuthService) { 

    }
    
    @Post('login') // Se não colocar nada dentro do () ele vai pegar a raiz do controller, que no caso é o 'auth. Com o 'login' ficou '/auth/login'
    // Esse método pode ter qualquer nome, mas o decorator precisa ser "login"
    
    login(@Body() loginDto: LoginDto) { // Apontanto através do parâmetro que vai chegar o corpo da requisição
        return this.authService.doLogin(loginDto); // Isso só funciona porque o AuthService e o AuthController estão no mesmo módulo. Se colocasse "return this.login" daria um loop porque o método chamaria ele mesmo, como está especificando o login do authService ele da outro retorno.
    }
}