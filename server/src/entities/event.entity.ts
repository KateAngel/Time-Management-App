import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm'
import Model from './model.entity'
import { User } from './user.entity'

export enum EventStatus {
    DRAFT = 'Draft',
    PUBLISHED = 'Published',
    CANCELLED = 'Cancelled',
}

@Entity()
export class Event extends Model {
    @Column()
    title: string

    @Column({
        nullable: true,
    })
    description!: string

    @Column()
    startDate?: Date

    @Column()
    endDate?: Date

    @Column({
        default: false,
    })
    allDay: boolean

    @Column({
        type: 'enum',
        enum: EventStatus,
        default: EventStatus.DRAFT,
    })
    status: EventStatus

    @Column({ default: false })
    isDeleted: boolean

    @Column({ default: false })
    isArchived: boolean

    @ManyToOne((_type) => User, (user) => user.events, { eager: false })
    @JoinColumn()
    user: User
}

export default Event
