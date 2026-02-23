import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column("text")
    content: string;

    @Column({ nullable: true }) // Permite que não tenha imagem
    coverImageUrl: string;
    
    @Column({ nullable: true }) // Permite que não tenha imagem
    excerpt: string;

    @Column({ default: false })
    published: boolean;

    @CreateDateColumn()
    createdAt: Date;
    
    @CreateDateColumn()
    updatedAt: Date;

    // Relacionamento Many to One <- authorId. Esse authorId vai ser uma foreignKey pro User.  Muitos posts Para um user
    @ManyToOne(() => User, {onDelete: "CASCADE"})
    author: User;
}
