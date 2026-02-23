import { Module } from "@nestjs/common"
import { HashingService } from "./hashing/hashing.service";
import { BcryptHashingService } from "./hashing/bcrypt-hashing.service";

@Module({
    providers: [
        {
            provide: HashingService, // Isso não deve ser usado porque é uma classe abstrata, mas é possível usar um valor para criar o valor que quer usar.
            useClass: BcryptHashingService // Com isso vai dar pra pegar os métodos dessa interface, mas na hora que o next for injetar o valor ele injetará o valor do useClass. 
        },
    ],
    exports: [HashingService],
})

export class CommonModule {}