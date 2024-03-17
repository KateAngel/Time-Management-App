import { DateTime } from 'luxon'

export interface IUser {
    email: string
    role: string
    id: string
    name: string
    age: number
    created_at: Date
    updated_at: Date
    __v: number
}

export interface IGenericResponse {
    status: string
    message: string
}

export interface ITask {
    id: number
    title: string
    description?: string
    createdDate: Date
    lastModifiedDate?: Date
    dueDate?: Date
    status: string
    projectCategory: string
    projectTitle: string
}

export interface IProject {
    id: number
    projectTitle: string
    description: string
    status: string
    dueDate?: DateTime
    created_at: DateTime
    updated_at: DateTime
    projectCategory: string | null
}

export type IProjectAPI = IProject & {
    dueDate: string
    created_at: string
    updated_at: string
}

export interface ICategory {
    id: number
    projectCategory: string
    description: string
    created_at: Date
    updated_at: Date
}
