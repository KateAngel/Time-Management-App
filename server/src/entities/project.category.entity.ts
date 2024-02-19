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
import { ProjectTitle } from './project.entity'
import { Task } from './task.entity'

@Entity()
export class ProjectCategory extends BaseEntity {
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

    @OneToMany((_type) => ProjectTitle, (project) => project.category, {
        eager: true,
    })
    projects: ProjectTitle[]

    @OneToMany((_type) => Task, (task) => task.category, { eager: true })
    tasks: Task[]
}

export interface Dprojectcategory {
    id: number
    projectCategory: string
    description: string
    user: User
    projects: ProjectTitle[]
    tasks: Task[]
}
