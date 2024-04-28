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
import { Task } from './task.entity'
import { Category } from './category.entity'
import { User } from './user.entity'

export enum ProjectStatus {
    UPCOMING = 'Upcoming',
    IN_PROGRESS = 'In progress',
    ON_HOLD = 'On hold',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
    REOPENED = 'Reopened',
}

@Entity()
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column()
    projectTitle: string

    @Column({
        nullable: true,
    })
    description!: string

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.UPCOMING,
    })
    status: ProjectStatus

    @Column()
    dueDate: Date

    @ManyToOne((_type) => User, (user) => user.projects, { eager: false })
    @JoinColumn()
    user: User

    @ManyToOne((_type) => Category, (category) => category.projects, {
        eager: false,
    })
    @JoinColumn()
    category: Category

    @OneToMany((_type) => Task, (task) => task.project, { eager: true })
    tasks: Task[]
}

export default Project
