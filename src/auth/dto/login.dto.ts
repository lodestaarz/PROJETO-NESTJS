// Precisa colocar o comando "npm i class-validator class-transformer" Para fazer as validações (class-validator) e transformar e preparar os dados que vêm da requisição JSON antes de serem usados na aplicação (class-transformer)

import { Type, } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString,  } from "class-validator";

export class LoginDto { // Não é recomendado deixar o DTO sem nenhuma verificação, neste caso esta utilizando decorators do "code-validator"
    @IsEmail({}, {message: "Email inválido"})  // Quando for colocar esse "@IsEmail" vai dar erro, vai ser necessário dar CTRL + C e fazer CTRL + SHIFT + P e colocar o "reload window"
    email: string;

    @IsString({message: "Senha precisa ser uma string"})
    @IsNotEmpty({message: "Senha não pode estar vazia"})
    password: string;

    // Deixei isso abaixo comentado para aprendizado, mas não vai funcionar porque o "transform" da main está como false.
    // @IsNotEmpty() 
    // @Type(() => Number) // Essa linha serve para transformar o objeto JSON em Number, sem ela mesmo que coloque teste: number ele não será transformado. 
    // teste: number;
}