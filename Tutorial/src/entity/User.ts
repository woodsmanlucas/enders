import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    email: string

    @Column("text")
    password: string
}
