import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { Task } from './task.entity'
import { ProjectCategory } from './project.category.entity'
import { User } from './user.entity'

export enum ProjectStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

@Entity()
export class ProjectTitle extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    projectTitle: string

    @Column({
        nullable: true,
    })
    description!: string

    @Column({ 
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.OPEN })
    status: ProjectStatus

    @Column()
    dueDate: Date

    @ManyToOne((_type) => User, (user) => user.projects, { eager: false })
    @JoinColumn()
    user: User

    @ManyToOne((_type) => ProjectCategory, (category) => category.projects, {
        eager: false,
    })
    @JoinColumn()
    category: ProjectCategory

    @OneToMany((_type) => Task, (task) => task.project, { eager: true })
    tasks: Task[]
}

export default ProjectTitle