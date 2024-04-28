import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { User } from './user.entity'
import { Project } from './project.entity'

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    projectCategory: string

    @Column({
        nullable: true,
    })
    description!: string

    @ManyToOne((_type) => User, (user) => user.categories, { eager: false })
    @JoinColumn()
    user: User

    @OneToMany((_type) => Project, (project) => project.category, {
        eager: true,
    })
    projects: Project[]

    // @OneToMany((_type) => Task, (task) => task.category, { eager: true })
    // tasks: Task[]
}

export interface Dcategory {
    id: number
    projectCategory: string
    description: string
    user: User
    projects: Project[]
}
