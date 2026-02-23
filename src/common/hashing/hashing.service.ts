// Esse arquivo não é uma implementação, ele é uma interface / classe abstrata

export abstract class HashingService { // Uma classe abstrata é uma classe que não pode ser instanciada diretamente e serve como modelo/base para outras classes. Ela é usada quando quer: 1 - Definir uma estrutura comum / Compartilhar código entre subclasses / 3 - Obrigar classes filhas a implementarem certos métodos. Ela é uma interface com superpodreres (implementação + estado)   
    abstract hash(password: string): Promise<string>;
    abstract compare(password: string, hash: string): Promise<boolean>;
}