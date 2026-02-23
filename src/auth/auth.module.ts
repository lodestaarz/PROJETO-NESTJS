import { InternalServerErrorException, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { CommonModule } from 'src/common/common-module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './types/jwt.strategy';

@Module({
    imports: [
        UserModule, 
        CommonModule, 
        JwtModule.registerAsync({
        useFactory: () => {
            const secret = process.env.JWT_SECRET;

            if(!secret) {
                throw new InternalServerErrorException(
                    "JWT_SECRET not found in .env"
                );
            }
            
            return {
                secret, 
                signOptions: { expiresIn: Number(process.env.JWT_EXPIRATION) || 86400 }, // Se errar essa linha do código a pessoa não vai conseguir logar no sistema.
            }
        },
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [],
}) // A classe module precisa estar decorada com o decorator @Module({}) e ele não pode ficar vazio, então coloca-se um objeto vazio, no caso é o {}

export class AuthModule {}