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
import { ProjectCategory } from './project.category.entity'
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
export class ProjectTitle extends BaseEntity {
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
        default: ProjectStatus.UPCOMING, })
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