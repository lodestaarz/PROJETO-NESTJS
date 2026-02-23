import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePostDto extends PartialType(
    PickType(CreatePostDto, ["title", "coverImageUrl", "excerpt", "content"]),
) {
    @IsOptional() // Vai depender da lógica que criarmos no service 
    @IsBoolean({ message: "Campo de publicar post precisa ser boolean" })
    published: boolean;
}
