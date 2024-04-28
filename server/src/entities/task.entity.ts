import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm'
import Model from './model.entity'
import { User } from './user.entity'
import { Category } from './category.entity'
import { Project } from './project.entity'

export enum TaskStatus {
    UPCOMING = 'Upcoming',
    IN_PROGRESS = 'In progress',
    ON_HOLD = 'On hold',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
    REOPENED = 'Reopened',
}

@Entity()
export class Task extends Model {
    @Column()
    title: string

    @Column({
        nullable: true,
    })
    description!: string

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.UPCOMING,
    })
    status: TaskStatus

    @Column()
    dueDate?: Date

    @Column({ default: false })
    isCompleted!: boolean

    @Column({ default: false })
    isDeleted: boolean

    // @ManyToOne((_type) => Category, (project) => project.tasks, { eager: false })
    // @JoinColumn()
    // category: Category

    @ManyToOne((_type) => Project, (project) => project.tasks, {
        eager: false,
    })
    @JoinColumn()
    project: Project

    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
    @JoinColumn()
    user: User
}

export default Task
