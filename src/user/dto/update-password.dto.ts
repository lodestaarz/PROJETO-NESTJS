import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class updatePasswordDto { // O instrutor disse que para ele deve aplicar as regras da senha ao criar uma nova, isso para não dar dicas sobre as regras da senha para alguém tentar ficar advinhando. Além disso, ele também mencionou o decorator @IsStrongPassword({}) que tem propriedades para validar a senha.
    
    @IsString({ message: "Senha precisa ser uma string"})
    @IsNotEmpty()
    currentPassword: string;
    
    @IsString({ message: "Nova Senha precisa ser uma string"})
    @IsNotEmpty({ message: "Nova Senha não pode estar vazia"})
    @MinLength(6, { message: "Nova senha deve ter um mínimo de 6 caracteres" })
    newPassword: string;
}