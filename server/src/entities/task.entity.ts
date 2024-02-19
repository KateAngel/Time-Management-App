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
import { ProjectCategory } from './project.category.entity'
import { ProjectTitle } from './project.entity'

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

@Entity()
export class Task extends Model {

    @Column()
    title: string

    @Column({
        nullable: true,
    })
    description!: string

    @Column({ default: TaskStatus.OPEN })
    status: TaskStatus

    @Column()
    dueDate: Date

    @Column()
    isCompleted!: boolean

    @Column({ default: false })
    isDeleted: boolean

    @ManyToOne((_type) => ProjectCategory, (project) => project.tasks, { eager: false })
    @JoinColumn()
    category: ProjectCategory

    @ManyToOne((_type) => ProjectTitle, (project) => project.tasks, {
        eager: false,
    })
    @JoinColumn()
    project: ProjectTitle

    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
    @JoinColumn()
    user: User
}

export default Task
