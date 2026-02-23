import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from "./entities/user.entity"
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { updatePasswordDto } from './dto/update-password.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashingService: HashingService,
    ) {}

    async failIfEmailExists(email: string) { // OBS: Esse método já existe no TypeORM, o instrutor disse pra criar ele aqui pra colcoar a própria exception no código.
        const exists = await this.userRepository.existsBy({
            email,
        });

        if(exists) {
            throw new ConflictException("E-mail já existe!");
        }

    }
    
    async findOneByOrFail(userData: Partial<User>) { // OBS: Esse método já existe no TypeORM, o instrutor disse pra criar ele aqui pra colcoar a própria exception no código.
        const user = await this.userRepository.findOneBy(userData);

        if(!user) {
            throw new NotFoundException("Usuário não encontrado!");
        }

        return user;
    }
    
    async create(dto: CreateUserDto) {  // O email precisa ser único pra não ter duas contas com emails iguals, além disso é necessário fazer o hash de senha e salvar as informações no banco de dados.
        await this.failIfEmailExists(dto.email);

        const hashedPassword = await this.hashingService.hash(dto.password);
        const newUser: CreateUserDto = {
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        };

        const created = await this.userRepository.save(newUser);
        return created;
    }

    findByEmail(email: string) {
        return this.userRepository.findOneBy({ email })
    }

    findById(id: string) {
        return this.userRepository.findOneBy({ id })
    }

    async update(id: string, dto: UpdateUserDto) {
        if (!dto.name && !dto.email) {
            throw new BadRequestException("Dados não enviados!");
        }

        const user = await this.findOneByOrFail({ id });

        user.name = dto.name ?? user.name; // o ?? é chamado de operador de coalescência nula (nullish coalescing operator), ele retorna o valor da esquerda somente se ele NÃO for null ou undefined. Caso ele seja null ou undefined, ele retorna o valor da direita.

        if (dto.email && dto.email !== user.email) { // Se ele mandou um email e não for o email dele, então ele quer mudar o email, essa é a lógica pra cair nesse if.
            await this.failIfEmailExists(dto.email);
            user.email = dto.email; // Atualizando os dados do email
            user.forceLogout = true; // Usuário vai ter que fazer login novamente porque o email foi alterado
        }

        return this.save(user);
    }

    save(user: User) {
        return this.userRepository.save(user);
    }

    async updatePassword(id: string, dto: updatePasswordDto) {
        const user = await this.userRepository.findOneByOrFail({ id });
        
        const isCurrentPasswordValid = await this.hashingService.compare(dto.currentPassword, user.password);

        if(!isCurrentPasswordValid) {
            throw new UnauthorizedException("Senha atual inválida!");
        }

        user.password = await this.hashingService.hash(dto.newPassword);
        user.forceLogout = true;

        return this.save(user);
    }

    async remove(id: string) {
        const user = await this.findOneByOrFail({ id });
        await this.userRepository.delete({ id });  // Se usar o remove(user) ele nessa situação ele vai remover apenas o id do usuário e o resto das informações vai continuar lá.
        return user;
    }
}
