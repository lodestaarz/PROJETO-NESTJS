import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Essa linha serve para remover chaves que não tenham decorações do DTO, é para segurança!
    forbidNonWhitelisted: true, // Essa linha serve para informar o erro ao tentar colocar algo no body que não está decorado no DTO! Sem isso, ele simplesmente remove a propriedade inválida.
    transform: false, // O instrutor disse que nem usa isso porque é um Overhead que afeta a aplicação toda, mas essa linha serve para tentar transformar automaticamente o JSON recebido em uma instância de classe do DTO (no caso desse projeto virará um objeto da classe LoginDto), sem ele o Nest recebe apenas um objeto literal (plain object)
  }),


); // Isso serve para aplicar Pipes de forma global a todos os controladores e métodos da aplicação, eliminando a necessidade de configurar o mesmo Pipe individualmente em cada rota. Ele garante que todas as requisições de entrada passem por uma validação ou transformação consistente antes de atingir o manipulador da rota (controller). OBS: Pipes é uma técnica de comunicação entre processos que permite pegar a saída de um comando ou programa e passá-la diretamente como entrada para outro comando ou programa

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap(); // O eslint está reclamando o uso de promisses sem o "await", então para tirar o erro é só colocar "void" antes da função
