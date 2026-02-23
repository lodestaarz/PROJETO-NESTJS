import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './upload/upload.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [AuthModule, // Aqui você indica os módulos importados.
    UserModule, 
    PostModule, 
    ConfigModule.forRoot({ // O ConfigModule.forRoot() é para configuração do .env
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({ // Quando coloca o forRootAsync ele deixa permitido utilizar todos módulos. O instrutor quer uma função que retorna as configurações que estava retornando antes, a useFactory  
      useFactory: () => {
        if(process.env.DB_TYPE === "better-sqlite3"){
          return {
            type: "better-sqlite3",
            database: process.env.DB_DATABASE || "./db.sqlite",
            synchronize: process.env.DB_SYNCHRONIZE === "1", // Esse synchronize é perigoso porque se alterar o produção você pode perder dados reais.
            autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === "1", // Outra forma de utilizar isso é informando manualmente as entities com entities: [User, ...],
          };
        }
        
        return {
          type: "postgres",
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || "5432", 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          synchronize: process.env.DB_SYNCHRONIZE === "1",
          autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === "1",
        };
      },
    }),
    UploadModule, 
  ], 
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
  ], // provider = service
})
export class AppModule {}
