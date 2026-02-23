import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common-module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User]), CommonModule], // Aqui não precisa do forRoot() porque ele só serve para configurar e inicializar o módulo de configuração na raiz da aplicação.
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
}) // Se não tirar o prettier vai dar problema por conta da quebra de linha CRLF, para resolver isso ou remove o eslint & prettier ou roda o comando "npm run lint" depois de finalizar o código para ele arrumar o arquivo
export class UserModule {}
