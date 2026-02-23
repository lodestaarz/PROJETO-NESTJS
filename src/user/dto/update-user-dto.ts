import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user-dto";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ["password"])) { // Esse PartialType deixa as propriedades do objeto como opcionais. O OmitType é pra mascarar a senha. O instrutor deu exemplos como: Partial<Tipo> / Omit<Tipo, key> / Pick<Tipo, key>
    // Se quisesse criar novas chaves no Update é só colocar assim:
    // @IsNotEmpty()
    // @IsOptional() Se tirar o decorator, tem que tirar o "?" também.
    // newKey?: string;
}

