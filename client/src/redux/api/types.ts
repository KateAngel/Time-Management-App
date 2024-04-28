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
    id: string
    title: string
    description?: string
    status: string
    //isCompleted: boolean
    dueDate?: DateTime
    created_at: DateTime
    updated_at: DateTime
    project: IProject
}

export interface ITaskCreate {
    title: string
    description?: string
    status: string
    dueDate?: DateTime
    projectId: IProject['id']
}
export type ITaskUpdate = ITaskCreate

export type ITaskAPI = ITask & {
    dueDate: string
    created_at: string
    updated_at: string
}

export interface IProject {
    id: number
    projectTitle: string
    description: string
    status: string
    dueDate?: DateTime
    created_at: DateTime
    updated_at: DateTime
    category: ICategory
}

export interface IProjectCreate {
    projectTitle: string
    description?: string
    status: string
    dueDate?: DateTime
    categoryId: ICategory['id']
}
export type IProjectUpdate = IProjectCreate

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
