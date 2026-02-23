import { BadRequestException, Controller, Get, Param, ParseIntPipe, Post, Body, UseGuards, Req, Patch, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomParseIntPipe } from 'src/common/pipes/custom-parse-int-pipe.pipe';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request'; // Aqui precisa do import type igual precisou no Request from express.
import { UpdateUserDto } from './dto/update-user-dto';
import { UserResponseDto } from './dto/user-response.dto';
import { updatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {

    constructor(private readonly configService: ConfigService, private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard) // Esse decorator fecha a rota para acessos que não tenham o JSON Web token. Outra forma de fazer isso é com middlewares
    @Get("me") 
    async findOne(@Req() req: AuthenticatedRequest) { // Mesmo com o Pipe passando o "id" para number e mesmo que o tipo da variável seja Number, o TypeScript ainda reconhece ela como string porque ela foi tipada assim e só é transformada em Number no runtime. 
        const user = await this.userService.findOneByOrFail({ id: req.user.id });
        return new UserResponseDto(user);
    }

    @Post()
    async create(@Body() dto: CreateUserDto ) {
        const user = await this.userService.create(dto);
        return new UserResponseDto(user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("me")
    async update(@Req() req: AuthenticatedRequest, @Body() dto: UpdateUserDto) {
        const user = await this.userService.update(req.user.id , dto);
        return new UserResponseDto(user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch("me/password")
    async updatePassword(@Req() req: AuthenticatedRequest, @Body() dto: updatePasswordDto) {
        const user = await this.userService.updatePassword(req.user.id , dto);
        return new UserResponseDto(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("me")
    async remove(@Req() req: AuthenticatedRequest) {
        const user = await this.userService.remove(req.user.id);
        return  new UserResponseDto(user);
    }
    
}
