import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Entity, Column, BeforeInsert, Index, OneToMany } from 'typeorm'
import Model from './model.entity'
import { Task } from './task.entity'
import { Project } from './project.entity'
import { Category } from './category.entity'
import { Event } from './event.entity'

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('users')
export class User extends Model {
    @Column({
        nullable: true,
    })
    name!: string

    @Column({
        nullable: true,
    })
    age!: number

    @Index('email_index')
    @Column({
        unique: true,
    })
    email: string

    @Column()
    password: string

    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: RoleEnumType.USER,
    })
    role: RoleEnumType.USER

    @Column({
        default: 'default.png',
    })
    photo: string

    @Column({
        default: false,
    })
    verified: boolean

    @Index('verificationCode_index')
    @Column({
        type: 'text',
        nullable: true,
    })
    verificationCode!: string | null

    @OneToMany((_type) => Category, (category) => category.user, {
        eager: true,
    })
    categories: Category[]

    @OneToMany((_type) => Project, (project) => project.user, {
        eager: true,
    })
    projects: Project[]

    @OneToMany((_type) => Task, (task) => task.user, { eager: true })
    tasks: Task[]

    @OneToMany((_type) => Event, (event) => event.user, { eager: true })
    events: Event[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12)
    }

    // ? Validate password
    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
    ) {
        return await bcrypt.compare(candidatePassword, hashedPassword)
    }

    static createVerificationCode() {
        const verificationCode = crypto.randomBytes(32).toString('hex')

        const hashedVerificationCode = crypto
            .createHash('sha256')
            .update(verificationCode)
            .digest('hex')

        return { verificationCode, hashedVerificationCode }
    }

    toJSON() {
        return {
            ...this,
            password: undefined,
            verified: undefined,
            verificationCode: undefined,
        }
    }
}
