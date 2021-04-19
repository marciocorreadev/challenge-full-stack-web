import { Column, CreateDateColumn, Entity, PrimaryColumn, Unique, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('students')
@Unique(["ra"])
export default class Student {
    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    cpf: string

    @Column()
    ra: string

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    constructor() {
        if (!this.id) this.id = uuid()
    }
}