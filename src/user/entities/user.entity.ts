import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity() // Decorator do TypeORM que marca a classe como entidade. Além disso, normalmente é necessário informar os atributos das propriedades, como "PRIMARY_KEY" ou "VARCHAR[45]", mas com o TypeORM é só colocar o decorator
export class User { // No TypeORM é necessário informar que esta classe é uma entidade e essa entidade é uma tabela na base de dados. Fazemos isso decorando a classe como Entity
    @PrimaryGeneratedColumn("uuid") // Esse decorator significa que o ID da entidade será gerado automaticamente como um UUID em vez de um número incremental. O UUID significa Universally Unique Identifier (Identificador Universal Único), ele é uma string longa usada como identificador único. EX: 550e8400-e29b-41d4-a716-446655440000
    id: string;

    @Column() // O TypeScript é inteligente o suficiente para atribuir as propriedades nas colunas de acordo com o seu tipo
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    forceLogout: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    // One to Many <- um User tem vários posts    

}


